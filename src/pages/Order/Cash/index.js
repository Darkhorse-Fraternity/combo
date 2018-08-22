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
    StyledHeaderTop
} from './style'

import { ENCH } from '../../../redux/reqKeys'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { selfUser } from '../../../request/LCModle'
import CashForm, { FormID } from '../../../components/Form/Cash'

const listKey = ENCH

@connect(
    state => ({
        user: state.user.data
    }),
    dispatch => ({})
)


export default class Cash extends Component {
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
        return (
            <StyledHeader>
                <StyledHeaderTop>
                    <StyledHeaderTitle>
                        支付宝取现
                    </StyledHeaderTitle>
                    <StyledHeaderBtn
                        hitSlop={{ top: 5, left: 50, bottom: 5, right: 5 }}
                        onPress={() => {
                        }}
                        title={'提现'}/>
                </StyledHeaderTop>
                <CashForm/>
                <StyledTitleView>
                    <StyledTitleText>
                        取现记录
                    </StyledTitleText>
                </StyledTitleView>
            </StyledHeader>
        )
    }

    renderRow = ({ item, index }: Object) => {
        console.log('item:', item);
        return (
            <StyledRow>
                <StyledRowTitle>
                    {item.objectId}
                </StyledRowTitle>
            </StyledRow>
        )
    }


    render(): ReactElement<any> {


        const param = {
            'where': {
                ...selfUser()
            }
        }

        return (
            <StyledContent>
                <LCList
                    ListHeaderComponent={() => this._renderHeader()}
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


