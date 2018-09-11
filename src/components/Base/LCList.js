/**
 * Created by lintong on 2017/6/14.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import * as immutable from 'immutable';
import BaseSectionView from './BaseSectionView'
import { bindActionCreators } from 'redux';
import { listReq } from '../../redux/actions/list'
//static displayName = ReqListView
import { listDefouteKey, schemas } from '../../redux/scemes'
import { search } from '../../redux/module/leancloud'
import { denormalize } from 'normalizr'

@connect(
    (state, props) => ({
        data: state.list.get(props.sKey || props.reqKey),
        normalizrData: state.normalizr.get(props.reqKey)
    }),
    (dispatch, props) => {
        const mSearch = props.search || search
        const {
            reqKey,
            sKey,
            dataMap,
            callPath,
            reqParam
        } = props


        return {
            //...bindActionCreators({},dispatch),
            loadData: (more = false) => dispatch(mSearch(more,
                reqParam,
                reqKey, {
                    sKey,
                    dataMap
                },
                callPath)),
        }
    }
)

export default class LCList extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        reqParam: PropTypes.object.isRequired,
        reqKey: PropTypes.string.isRequired,
        sKey: PropTypes.string,
        callPath: PropTypes.string, //不为空则表示走leancloud 的云函数
        search: PropTypes.func
    };

    static defaultProps = {
        data: immutable.fromJS({
            listData: [],
            //loadStatu: 'LIST_NORMAL',
        }),
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentWillReceiveProps(nextProps: Object) {

        //只进行值比较
        if (JSON.stringify(nextProps.reqParam)
            !== JSON.stringify(this.props.reqParam)) {
            this.props.loadData()
        }

    }


    __renderItem({ item, index }: { item: Item, index: number }): ReactElement<any> {
        const data = typeof item === 'object' ? item :
            this.props.normalizrData.get(item + '').toJS()
        return this.props.renderItem({ item: data, index })
    }


    render(): ReactElement<any> {
        // if (!reqKey) {
        //     console.error('ReqListView传入的reqKey 不能为空~');
        // }


        // if (!reqParam) {
        //     return (<BaseSectionView
        //         {...this.props}
        //         loadData={() => {
        //         }}
        //         renderHeader={this.props.ListHeaderComponent}
        //     />)
        // }

        const {
            data,
            loadData
        } = this.props

        const modal = data && data.toJS() || {}
        const { loadStatu, listData } = modal
        const afterDataMap = this.props.afterDataMap &&
            this.props.afterDataMap(listData) || listData



        return (
            <BaseSectionView
                {...this.props}
                loadData={loadData}
                loadMore={() => loadData(true)}
                data={afterDataMap}
                loadStatu={loadStatu}
                renderItem={this.__renderItem.bind(this)}
            />

        );
    }
}


