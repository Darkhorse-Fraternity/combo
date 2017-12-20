/**
 * Created by lintong on 2017/7/3.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native'
import {connect} from 'react-redux'
// import {logout} from '../../redux/actions/user'
import {ICARD, IDO, IUSE} from '../../redux/reqKeys'
import {add, search, update, batch} from '../../redux/module/leancloud'
import {req} from '../../redux/actions/req'

import {classUpdate, classCreatNewOne} from '../../request/leanCloud'
import {selfUser, iCard, iUse} from '../../request/LCModle'
import {addNormalizrEntity} from '../../redux/module/normalizr'
import {clear} from '../../redux/actions/list'
import Pop from '../../components/Pop'
import Do from './Do'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import BounceBtn from '../../components/Button/BounceBtn'
import SmallDoneBtn from '../../components/Button/SmallDoneBtn'
import * as Animatable from 'react-native-animatable';

const List = Animatable.createAnimatableComponent(FlatList);

// import TinderCard from '../../components/Card/TinderCard'

function makeScaleInTranslation(translationType, value) {
    return {
        from: {
            [translationType]: 0,
        },
        to: {
            [translationType]: value,
        },
    };
}

const cloudMoveLeft = makeScaleInTranslation('translateX', -500);
Animatable.initializeRegistryWithDefinitions({cloudMoveLeft})
// import
//static displayName = Home
//data:state.req.get()
@connect(
    state => ({
        data: state.list.get(IUSE),
        normalizrData: state.normalizr.get(IUSE),
        iCard: state.normalizr.get(ICARD),
        user: state.user.data,
        load: state.req.get(IDO).get('load')
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        // logout: () => dispatch(logout()),

        search: () => {
            dispatch(search(false, {
                where: {
                    ...selfUser(),
                    statu: 'start'
                },
                order: 'doneDate',
                include: ICARD
            }, IUSE))
        },
        done: (data) => {
            dispatch(async (dispatch, getState) => {
                const state = getState()
                const iCardM = state.normalizr.get(ICARD).get(data[ICARD]).toJS()

                //在这边添加新的判断
                const id = data.objectId
                const time = data.time + 1
                const param = {
                    doneDate: {"__type": "Date", "iso": moment()},
                    time: time,
                    //cycle,
                    statu: time == data.period ? "stop" : "start"
                }


                if (iCardM.record.length > 0) {
                    Pop.show(<Do data={data}/>, {maskStyle: {backgroundColor: 'transparent'}})
                    return
                }

                // const IUseP = classUpdate(IUSE, id, param)
                const iDoP = classCreatNewOne(IDO, {
                    ...selfUser(),
                    ...iUse(id),
                    ...iCard(iCardM.objectId)
                })


                const res2 = await req(iDoP, IDO, {'normalizr':true})

                if(res2.error){
                    Toast.show(res2.error)
                    return
                }


                // const res3 = await req(IUseP)
                //
                // if(res3.error){
                //     Toast.show(res3.error)
                //     return
                // }

                // const res = await batch([iCardP, iDoP])
                // if(res[0].error ){
                //     Toast.show(res[0].error)
                //     return
                // }
                //

                const entity = {
                    ...param,
                    // ...(res3)
                    objectId:id
                }

                // const res = await batch([IUseP, iDoP])
                // // const res = await update(id, param, ICARD)
                //
                // if(res[0].error ){
                //     Toast.show(res[0].error)
                //     return
                // }
                // if(res[1].error){
                //     Toast.show(res[1].error)
                //     return
                // }
                //
                //
                // const entity = {
                //     ...param,
                //     ...(res[0].success)
                // }

                // dispatch(addEntities({
                //     [IUSE]: {
                //         [entity.objectId]: entity
                //     }
                // }))
                dispatch(addNormalizrEntity(IUSE, entity))

            })
        },

        setting: (entity, setting) => {
            entity.setting = setting
            // dispatch(addEntities({
            //     [IUSE]: {
            //         [entity.objectId]: entity
            //     }
            // }))
            dispatch(addNormalizrEntity(IUSE, entity))
        },
        stop: async (data, index, callBack) => {
            const id = data.objectId
            const param = {
                statu: 'stop',
                //cycle,
            }
            const res = await update(id, param, IUSE)
            const entity = {
                ...param,
                ...res,
                setting: false,
            }

            dispatch(addNormalizrEntity(IUSE, entity))
            dispatch(clear(IUSE, index))
            callBack && callBack()
        },
        refresh: async (data) => {
            const id = data.objectId
            const param = {
                time: 0,
                statu: 'start',
                cycle: data.cycle + 1,
            }

            const res = await  await update(id, param, IUSE)

            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(IUSE, entity))
        },

    })
)
export default class Home extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentWillReceiveProps(nextProps: Objec) {
        const size1 = nextProps.data.get('listData').size
        const size2 = this.props.data.get('listData').size

        if (size1 > size2 && size2 != 0) {
            this.refs.list &&
            this.refs.list.scrollToOffset({x: 0, y: 0, animated: false})
        }
    }


    componentDidMount() {
        this.props.search()
        // console.log('this.refs.list:', this.refs.list.scrollToOffset);
    }


    _keyExtractor = (item, index) => {
        const key = item.id || index;
        return key + '';
    }


    __settingView = ({item, index}, data) => {
        const self = this
        const iCardId = data[ICARD]
        const iCard = this.props.iCard.get(iCardId).toJS()
        const isSelf = iCard.user == this.props.user.objectId
        return (<View style={styles.settingView}>
            {isSelf && (<BounceBtn
                color="#rgb(136,175,160)"
                radius={60}
                moveColor="#rgba(136,175,160,0.4)"
                onPress={() => {
                    this.props.navigation.navigate('OptionView', {opData: iCard})
                }}
                title="修改配置"/>)}
            {isSelf && (<View style={{height: 20}}/>)}
            <BounceBtn
                radius={60}
                color="#rgb(156,175,170)"
                moveColor="#rgba(156,175,170,0.4)"
                onPress={async () => {
                    const last = self.props.data.get('listData').size - 1 == index
                    const itemView = this.rows[index]
                    ///因为view 是根据key 复用的，所以最后需要还原，否则会出错
                    const endState = await itemView.fadeOutDownBig(500)
                    endState.finished && this.props.stop(data, index, () => {
                        !last && itemView.fadeInRight(500)
                    })

                }}
                title="暂停打卡"/>
        </View>)
    }

    __doneView = (data) => {
        return (
            <View>
                <Text style={styles.done}>{'恭喜,已完成'}</Text>
                <BounceBtn
                    color="#rgb(236,175,160)"
                    radius={60}
                    moveColor="#rgba(236,175,160,0.4)"
                    onPress={() => {
                        this.props.refresh(data)
                    }}
                    title="再来一组"/>
            </View>
        )
    }

    __flagView = ({item, index}, data, flag) => {
        const iCardId = data[ICARD]
        const iCard = this.props.iCard.get(iCardId)
        let FlagView = (
            <View style={{height: 150, justifyContent: 'center'}}>
                <Animatable.Text
                    animation="zoomInUp"
                    style={styles.num}>
                    {data.time}
                </Animatable.Text>
                <Text
                    style={styles.notifyText}>
                    {iCard.get('title')}
                </Text>
            </View>)
        if (data.time === Number(iCard.get("period"))) {
            FlagView = this.__doneView(data)
        } else if (data.doneDate) {
            if (flag) {
                FlagView = (
                    <View style={{height: 150, justifyContent: 'center'}}>
                        <Text
                            numberOfLines={0}
                            style={styles.notifyText}>
                            {iCard.get('notifyText') || iCard.get('title')}
                        </Text>
                    </View>)
            }
        }
        return FlagView
    }


    rows = []
    __renderItem = ({item, index}) => {
        const data = this.props.normalizrData.get(item).toJS()

        const iCardId = data[ICARD]
        const iCard = this.props.iCard.get(iCardId)
        // const isSelf = iCard.get('user') == this.props.user.objectId
        // data[ICARD] = iCard.toJS()
        //计算上次完成时间和当前完成时间， 只有大于24个小时，才能再次打卡。

        //flag 为true 的时候说明离上次打卡已经有24小时了
        const doneDate = data.doneDate.iso
        const lastMoment = moment(doneDate)
        const done = moment.min(lastMoment, moment(2, "HH")) === lastMoment
        const inView = () => {
            if (!data.setting) {
                return this.__flagView({item, index}, data, done)
            } else {
                return this.__settingView({item, index}, data)
            }
        }
        return (
            <Animatable.View
                ref={(row) => this.rows[index] = row}
                style={styles.item}>
                <Image
                    style={styles.quotation}
                    source={require('../../../source/img/op/quotation.png')}/>
                <View style={styles.card}>
                    {inView()}
                    <View style={styles.footer}>
                        {/*<Text style={[styles.title]}>{iCard.get('title')}</Text>*/}
                        <TouchableOpacity
                            onPress={() => {
                                {/*this.__delete(index,data.objectId)*/
                                }
                                this.props.setting(data, !data.setting)
                            }}
                            hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
                            style={styles.setting}>
                            <Icon
                                color='white'
                                name={!data.setting ? "ios-settings" : 'md-close'}
                                size={15}/>
                        </TouchableOpacity>
                        {done ? ( <SmallDoneBtn
                                load={this.props.load}
                                onPress={() => this.props.done(data)}/>) :
                            ( <View style={styles.setting}>
                                <Icon
                                    color='white'
                                    name={'md-checkmark'}
                                    size={15}/>
                            </View>)}

                    </View>
                </View>
            </Animatable.View>
        )
    }


    render(): ReactElement<any> {

        // const navigation = this.props.navigation
        // console.log('test:',typeof View());
        const statu = this.props.data.get('loadStatu')

        const data = this.props.data.toJS().listData

        if ((statu === 'LIST_NO_DATA' || statu == 'LIST_LOAD_NO_MORE') && data.length == 0) {
            return (
                <View style={{flex: 1, alignItems: 'center',paddingBottom:100, justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={styles.noDataBc}
                        onPress={() => {
                            this.props.navigation.navigate('Creat')
                        }}>
                        <Icon name="md-add" color="white" size={50}/>
                    </TouchableOpacity>
                    <Text style={{marginTop: 10}}>给自己添加个习惯卡片吧~</Text>
                </View>
            )
        }

        return (

            <FlatList
                onScroll={this.props.onScroll}
                ref="list"
                animation="slideInRight"
                style={styles.container}
                data={data}
                horizontal={true}
                // removeClippedSubviews={true}
                // pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                renderItem={this.__renderItem}
                keyExtractor={this._keyExtractor}
            />
        );
    }
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    bc: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 44,
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        width: width,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    list: {},
    item: {
        padding: 10,
    },
    card: {
        marginTop: 15,
        paddingTop: 80,
        width: width - 50,
        height: width - 50,
        backgroundColor: "#F0C98B",
        // borderRadius: 12,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.3,
        },
        justifyContent: 'space-between',
        // elevation:10,
    },
    title: {
        fontSize: 17,
        marginTop: 10,
        textAlign: 'center',
    },
    headerBtn: {
        padding: 20,
        paddingHorizontal: 15,
    },
    num: {
        fontSize: 100,
        color: 'white',
        textAlign: 'center',
    },
    notifyText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
    },

    done: {
        fontSize: 17,
        marginBottom: 20,
        color: 'white',
        alignSelf:'center',
        textAlign:'center'
    },
    toper: {
        width: width - 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footer: {
        width: width - 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 50,
        marginBottom: 30,
    },
    noDataBc: {
        backgroundColor: '#fabc46',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,

    },
    setting: {
        height: 20,
        width: 20,
        backgroundColor: 'rgba(200,200,200,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    quotation: {
        alignSelf: 'center',
        width: 82,
        height: 50,
        position: 'absolute',
        zIndex: 10,
    },
    settingView:{
        flexDirection:'row',
        alignSelf:'center',
        justifyContent: 'space-between',
        padding: 10
    }
})
