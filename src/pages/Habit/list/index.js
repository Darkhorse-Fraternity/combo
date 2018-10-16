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
import { ICARD, IDO, IUSE } from '../../../redux/reqKeys'
import { search, update, } from '../../../redux/module/leancloud'
import { classSearch } from '../../../request/leanCloud'
import { req } from '../../../redux/actions/req'

import { selfUser, iCard, iUse } from '../../../request/LCModle'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import Cell from '../Cell'

import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'

import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../../Card/Cell/style';

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Button from '../../../components/Button/index'
import { doCardWithNone } from '../../../components/Button/DoCardButton/doCardWithNone'
import ExceptionView, { ExceptionType } from '../../../components/Base/ExceptionView/index'
import {claerByID} from '../../../redux/actions/list'

@connect(
    state => ({
        data: state.list.get(IUSE),
        iUse: state.normalizr.get(IUSE),
        iCard: state.normalizr.get(ICARD),

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
                    ...dispatch(selfUser()),
                    statu: 'start'
                },
                order: 'doneDate',
                include: ICARD + ',iCard.user'
            }, IUSE))
        },
        done: (data) => {
            dispatch(doCardWithNone(data))
        },

        // refresh: async (data) => {
        //     const id = data.objectId
        //     const param = {
        //         statu: 'stop',
        //     }
        //
        //     const res = await  dispatch(update(id, param, IUSE))
        //
        //     const entity = {
        //         ...param,
        //         ...res
        //     }
        //     dispatch(addNormalizrEntity(IUSE, entity))
        //     dispatch(claerByID(IUSE,id))
        // },
        // exist: async () => {
        //     const params = classSearch(IUSE, {
        //         where: {
        //           ...dispatch(selfUser()),
        //             statu: 'stop',
        //         },
        //         limit: 0,
        //         count: 1,
        //     })
        //   dispatch(req(params, 'StopIUSEexist'))
        // }

    })
)
export default class Habit extends Component {
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
        // this.props.search()
        // this.props.exist()
        // console.log('this.refs.list:', this.refs.list.scrollToOffset);
    }


    __renderItem = ({ item, index }) => {

        // if (item === -1) {
        //     return <StopCell title='查看已归档的卡片'
        //                      des='重新打卡点这里'
        //                      onPress={() => {
        //                          this.props.navigation.navigate('Record',
        //                              { statu: 'stop' })
        //                      }}/>
        // }

        const data = this.props.iUse.get(item).toJS()

        // console.log('data:', data);
        const iCardId = data[ICARD]
        let iCard = this.props.iCard.get(iCardId)
        const done = moment(2, "HH").isBefore(data.doneDate.iso)
        const over = data.time !== 0 && data.time % Number(iCard.get("period")) === 0


        return <Cell
            over={over}
            done={done}
            // refreshLoad={this.props.refreshLoad}
            // onLongPress={() => {
            //     !this.props.load &&
            //     !done &&
            //     this.props.done(data)
            //
            // }}
            onPress={() => {
                // const iCardM = iCard.toJS()
                this.props.navigation.navigate('card', {
                    iUseId: data.objectId,
                    iCardId: iCard.get('objectId')
                })
            }}
            carouselRef={this._carousel}
            parallax={true}
            data={data}
            iCard={iCard.toJS()}
            even={false}
        />;
    }


    __renderNoData = (statu) => {


        const  refreshLoad = statu === 'LIST_FIRST_JOIN' || statu === 'LIST_LOAD_DATA'
        return (
            <ExceptionView
                style={{ height: Dimensions.get('window').height / 2 }}
                exceptionType={refreshLoad?
                    ExceptionType.Loading:ExceptionType.NoData}
                tipBtnText={'添加卡片'}
                refresh = {refreshLoad}
                prompt={refreshLoad?'正在加载':'空空如也~'}
                onRefresh={() => {
                    this.props.navigation.navigate('newCard')
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
                    columnWrapperStyle={{ padding: 10 }}
                    // removeClippedSubviews={true}
                    // pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.__renderItem}
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={this.props.header}
                    ListEmptyComponent={()=>this.__renderNoData(statu)}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow:'hidden',
    },
})
