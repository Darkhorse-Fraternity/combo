/**
 * Created by lintong on 2018/8/17.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import LCList from '../../../components/Base/LCList';
import {
    StyledContent,
    StyledHeader,
    StyledHeaderTitle,
    StyledHeaderCash,
    StyledHeaderBottom,
    StyledHeaderBtn,
    StyledTitleView,
    StyledTitleText,
    StyledRow,
    StyledRowTitle,
    StyledRowInner,
    StyledRowDate,
    StyledRowAmount,
    StyledRowStatu
} from './style'
import moment from 'moment'
import { ORDER } from '../../../redux/reqKeys'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { pointModel } from '../../../request/LCModle'

const listKey = ORDER

@connect(
    state => ({
        user: state.user.data
    }),
    dispatch => ({})
)


export default class Earnings extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: '',
        }
    };


    _renderHeader = () => {
        const cash = this.props.user.amount
        return (
            <StyledHeader>
                <StyledHeaderTitle>
                    我的收益
                </StyledHeaderTitle>
                <StyledHeaderBottom>
                    <StyledHeaderCash>
                        ￥{(cash/100).toFixed(1)}
                    </StyledHeaderCash>
                    <StyledHeaderBtn
                        hitSlop={{ top: 5, left: 50, bottom: 5, right: 5 }}
                        onPress={() => {
                            this.props.navigation.navigate('Cash')
                        }}
                        title={'取现'}/>
                </StyledHeaderBottom>
                <StyledTitleView>
                    <StyledTitleText>
                        收益记录
                    </StyledTitleText>
                </StyledTitleView>
            </StyledHeader>
        )
    }

    renderRow = ({ item, index }: Object) => {
        console.log('item:', item);
        return (
            <StyledRow>
                <StyledRowInner>
                    <StyledRowTitle>
                        申请单号：{item.tradeId}
                    </StyledRowTitle>
                    <StyledRowStatu>
                        {item.description}
                    </StyledRowStatu>

                </StyledRowInner>
                <StyledRowInner style={{alignItems:'flex-end'}}>
                    <StyledRowAmount>
                        ￥{item.amount/100}
                    </StyledRowAmount>
                    <StyledRowDate>
                        {moment(item.createdAt).format("YYYY-MM-DD")}
                    </StyledRowDate>
                </StyledRowInner>
            </StyledRow>
        )
    }


    render(): ReactElement<any> {

        const { user } = this.props

        const param = {
            'where': {
                ...pointModel('beneficiary', user.objectId)
            },
            include: 'iCard',
        }

        return (
            <StyledContent>
                {this._renderHeader()}
                <LCList
                    ref={'list'}
                    reqKey={listKey}
                    style={{ flex: 1 }}
                    renderItem={this.renderRow.bind(this)}
                    noDataPrompt={'还没有记录'}
                    //dataMap={(data)=>{
                    //   return {[OPENHISTORYLIST]:data.list}
                    //}}
                    reqParam={param}
                />
            </StyledContent>
        );
    }
}


