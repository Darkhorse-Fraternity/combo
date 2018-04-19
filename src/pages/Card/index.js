/**
 * Created by lintong on 2017/7/3.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
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
import { connect } from 'react-redux'
// import {logout} from '../../redux/actions/user'
import { ICARD, IDO, IUSE } from '../../redux/reqKeys'
import { add, search, update, batch } from '../../redux/module/leancloud'
import { req, load } from '../../redux/actions/req'

import { classUpdate, classCreatNewOne } from '../../request/leanCloud'
import { selfUser, iCard, iUse } from '../../request/LCModle'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import SliderEntry from './Cell/SliderEntry'
import { clear } from '../../redux/actions/list'
import Pop from '../../components/Pop'
import Do from './Do'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'

import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './Cell/SliderEntry.style';


import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Button from '../../components/Button'

// import TinderCard from '../../components/Card/TinderCard'

// function makeScaleInTranslation(translationType, value) {
//     return {
//         from: {
//             [translationType]: 0,
//         },
//         to: {
//             [translationType]: value,
//         },
//     };
// }
//
// const cloudMoveLeft = makeScaleInTranslation('translateX', -500);
// Animatable.initializeRegistryWithDefinitions({ cloudMoveLeft })
// import
//static displayName = Home
//data:state.req.get()
@connect(
    state => ({
        data: state.list.get(IUSE),
        iUse: state.normalizr.get(IUSE),
        iCard: state.normalizr.get(ICARD),
        load: state.req.get(IDO).get("load"),
        refreshLoad: state.req.get(IUSE).get("load")
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
                include: ICARD+',iCard.user'
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
                    doneDate: { "__type": "Date", "iso": moment() },
                    time: time,
                    //cycle,
                    statu: time === data.period ? "stop" : "start"
                }


                if (iCardM.record.length > 0) {
                    Pop.show(<Do data={data}/>, { maskStyle: { backgroundColor: 'transparent' } })
                    return
                }

                // const IUseP = classUpdate(IUSE, id, param)
                const iDoP = classCreatNewOne(IDO, {
                    ...selfUser(),
                    ...iUse(id),
                    ...iCard(iCardM.objectId)
                })


                const res2 = await load(iDoP, IDO)

                if (res2.error) {
                    Toast.show(res2.error)
                    return
                }


                const entity = {
                    ...param,
                    // ...(res3)
                    objectId: id
                }

                dispatch(addNormalizrEntity(IUSE, entity))

            })
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
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};


    // shouldComponentUpdate(nextProps: Object) {
    //     return !immutable.is(this.props, nextProps)
    // }

    componentWillReceiveProps(nextProps: Objec) {
        // const size1 = nextProps.data.get('listData').size
        // const size2 = this.props.data.get('listData').size
        //
        // if (size1 > size2 && size2 !== 0) {
        //     this.refs.list &&
        //     this.refs.list.scrollToOffset({ x: 0, y: 0, animated: false })
        // }
    }


    componentDidMount() {
        this.props.search()
        // console.log('this.refs.list:', this.refs.list.scrollToOffset);
    }



    __renderItem = ({ item, index }) => {
        const data = this.props.iUse.get(item).toJS()

        // console.log('data:', data);
        const iCardId = data[ICARD]
        let iCard = this.props.iCard.get(iCardId)
        const done =  moment(2, "HH").isBefore(data.doneDate.iso)
        const over = data.time === Number(iCard.get("period"))


        return <SliderEntry
            over={over}
            done={done}
            refreshLoad={this.props.refreshLoad}
            onLongPress={()=>{
               !this.props.load &&
               !done &&
               this.props.done(data)

            }}
            onPress={() => {
                this.props.navigation.navigate('CardDetail', {
                    iUse: data,
                    iCard: iCard.toJS()
                })
            }}
            onRefresh = {()=>{
                !this.props.refreshLoad && over
                && this.props.refresh(data)
            }}
            carouselRef={this._carousel}
            parallax={true}
            data={data}
            iCard={iCard.toJS()}
            even={false}
        />;
    }


    __renderNoData = () => {
        return (
            <View style={styles.noDataView}>
                <Button
                    style={styles.noDataBc}
                    onPress={() => {
                        this.props.navigation.navigate('Creat')
                    }}>
                    <Icon name="md-add" color="white" size={50}/>
                </Button>
                <Text style={{ marginTop: 10 }}>给自己添加个习惯卡片吧~</Text>
            </View>

        )

    }

    render(): ReactElement<any> {

        // const navigation = this.props.navigation
        // console.log('test:',typeof View())


        const statu = this.props.data.get('loadStatu')

        const data = this.props.data.toJS().listData

        if ((statu === 'LIST_NO_DATA' || statu === 'LIST_LOAD_NO_MORE') && data.length === 0) {
            return this.__renderNoData()
        }
        //
        // <FlatList
        //     onScroll={this.props.onScroll}
        //     ref="list"
        //     animation="slideInRight"
        //     style={styles.container}
        //     data={data}
        //     horizontal={true}
        //     // removeClippedSubviews={true}
        //     // pagingEnabled={true}
        //     showsHorizontalScrollIndicator={false}
        //     renderItem={this.__renderItem}
        //     keyExtractor={this._keyExtractor}
        // />


        return (
            <View>

                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={data}
                    renderItem={this.__renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    removeClippedSubviews={false}
                    // layout='stack'
                    // loop={true}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                />
            </View>
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
    slider: {
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 0 // for custom animation
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
        marginTop: 10,
        paddingTop: 50,
        width: width - 50,
        height: width - 50,
        backgroundColor: "#F0C98B",
        // borderRadius: 12,

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
        fontSize: 35,
        marginBottom: 20,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center'
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
        justifyContent: 'center',
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
        height: 25,
        width: 25,
        backgroundColor: 'rgba(200,200,200,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 5,
    },
    quotation: {
        alignSelf: 'center',
        width: 82,
        height: 50,
        position: 'absolute',
        zIndex: 10,
    },
    settingView: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    noDataView: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 100,
        justifyContent: 'center'
    }
})
