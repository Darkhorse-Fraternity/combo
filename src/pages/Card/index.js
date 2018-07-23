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
    Image,

} from 'react-native'
import { connect } from 'react-redux'
import { ICARD, IDO, IUSE } from '../../redux/reqKeys'
import { search, update, } from '../../redux/module/leancloud'
import { classSearch } from '../../request/leanCloud'
import { req } from '../../redux/actions/req'

import { selfUser, iCard, iUse } from '../../request/LCModle'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import SliderEntry from './Cell/SliderEntry'

import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'

import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './Cell/style';
import StopCell from './Cell/StopCell'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Button from '../../components/Button'
import { doCardWithNone } from '../../components/Button/DoCardButton/DoCard'
import ExceptionView, { ExceptionType } from '../../components/Base/ExceptionView'
import {claerByID} from '../../redux/actions/list'

@connect(
    state => ({
        data: state.list.get(IUSE),
        iUse: state.normalizr.get(IUSE),
        iCard: state.normalizr.get(ICARD),
        load: state.req.get(IDO).get("load"),
        refreshLoad: state.req.get(IUSE).get("load"),
        stopIUSEexist: state.req.get('StopIUSEexist')
    }),
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        // logout: () => dispatch(logout()),

        search: () => {

            //cloude 中加入',iCard.course' 反而完全没有信息了，很奇怪

            dispatch(search(false, {
                where: {
                    ...selfUser(),
                    statu: 'start'
                },
                order: 'doneDate',
                include: ICARD + ',iCard.user'
            }, IUSE))
        },
        done: (data) => {
            dispatch(doCardWithNone(data))
        },

        refresh: async (data) => {



            const id = data.objectId
            const param = {
                statu: 'stop',
            }

            const res = await  await update(id, param, IUSE)

            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(IUSE, entity))
            dispatch(claerByID(IUSE,id))
        },
        exist: async () => {
            const params = classSearch(IUSE, {
                where: {
                    ...selfUser(),
                    statu: 'stop',
                },
                limit: 0,
                count: 1,
            })
            req(params, 'StopIUSEexist')
        }

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
        this.props.exist()
        // console.log('this.refs.list:', this.refs.list.scrollToOffset);
    }


    __renderItem = ({ item, index }) => {

        if (item === -1) {
            return <StopCell title='查看已完成的打卡'
                             des='重新打卡点这里'
                             onPress={() => {
                                 this.props.navigation.navigate('Record',
                                     { statu: 'stop' })
                             }}/>
        }

        const data = this.props.iUse.get(item).toJS()

        // console.log('data:', data);
        const iCardId = data[ICARD]
        let iCard = this.props.iCard.get(iCardId)
        const done = moment(2, "HH").isBefore(data.doneDate.iso)
        const over = data.time !== 0 && data.time % Number(iCard.get("period")) === 0


        return <SliderEntry
            over={over}
            done={done}
            refreshLoad={this.props.refreshLoad}
            onLongPress={() => {
                !this.props.load &&
                !done &&
                this.props.done(data)

            }}
            onPress={() => {
                const iCardM = iCard.toJS()
                this.props.navigation.navigate('CardDetail', {
                    iUseId: data.objectId,
                    iCardId: iCardM.objectId
                })
            }}
            onRefresh={() => {


                Alert.alert(
                    '再来一组?',
                    '放弃打卡不会删除卡片',
                    [{text: '放弃打卡',onPress: () => {
                        !this.props.refreshLoad && over
                        && this.props.refresh(data)
                    }}, {
                        text: '点击打卡', onPress: () => {
                            !this.props.load &&
                            !done &&
                            this.props.done(data)
                        }
                    }]
                )


            }}
            carouselRef={this._carousel}
            parallax={true}
            data={data}
            iCard={iCard.toJS()}
            even={false}
        />;
    }


    __renderNoData = () => {

        const { refreshLoad } = this.props

        return (
            <ExceptionView
                style={{ height: Dimensions.get('window').height / 2 }}
                exceptionType={refreshLoad?
                    ExceptionType.Loading:ExceptionType.NoData}
                tipBtnText={'添加卡片'}
                prompt={refreshLoad?'正在加载':'空空如也~'}
                onRefresh={() => {
                    this.props.navigation.navigate('NewCard')
                }}/>
        )
    }

    _keyExtractor = (item, index) => {
        const key = item.id || index;
        return key + '';
    }


    render(): ReactElement<any> {

        // const navigation = this.props.navigation
        // console.log('test:',typeof View())

        const statu = this.props.data.get('loadStatu')

        let data = this.props.data.toJS().listData

        if ((statu === 'LIST_NORMAL' || statu === 'LIST_LOAD_NO_MORE') && data.length === 0) {
            return this.__renderNoData()
        }

        let stopIUSEexist = this.props.stopIUSEexist && this.props.stopIUSEexist.get('data')
        stopIUSEexist = !stopIUSEexist ? false : stopIUSEexist.get('count') > 0


        if (stopIUSEexist && statu !== 'LIST_FIRST_JOIN'
            && statu !== 'LIST_LOAD_DATA') {
            data = [...data, -1];
        }


        return (

            (

                <FlatList
                    refreshing={false}
                    onRefresh={()=>{
                        this.props.search()
                    }}
                    style={styles.container}
                    data={data}
                    numColumns={2}
                    columnWrapperStyle={{ padding: 5 }}
                    // removeClippedSubviews={true}
                    // pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.__renderItem}
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={this.props.header}
                />
            )
        )


        // return (
        //
        //     <Carousel
        //         ref={(c) => {
        //             this._carousel = c;
        //         }}
        //         data={data}
        //         renderItem={this.__renderItem}
        //         sliderWidth={sliderWidth}
        //         itemWidth={itemWidth}
        //         removeClippedSubviews={false}
        //         // layout='stack'
        //         // loop={true}
        //         containerCustomStyle={styles.slider}
        //         contentContainerCustomStyle={styles.sliderContentContainer}
        //     />
        // );
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

})
