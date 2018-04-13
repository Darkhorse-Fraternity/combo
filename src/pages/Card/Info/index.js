/**
 * Created by lintong on 2018/4/13.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types';


import {
    StyledContent,
    StyledBottomMenu,
    StyledBottomMenuText,
    StyledIcon,
    StyledRow,
    StyledRowText,
    StyledRowDes,
    StyledArrow,
    StyledRowInner,
    StyledRowTouch,
    StyledBottomMenuButton,
    StyledTitleView,
    StyledTitleText
} from './style'


import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import ShareView from '../../../components/Share/ShareView'
import Pop from '../../../components/Pop'


@connect(
    (state, props) => ({
        user: state.user.data,
        iCardUser: state.normalizr.get('user').get(props.navigation.state.params.iCard.user)
    }),
    dispatch => ({})
)


export default class Info extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};


    _renderBottomMenu = (params) => {

        const { iCard, iUse } = params
        const { navigation } = this.props;


        return (
            <StyledBottomMenu>
                <StyledBottomMenuButton
                    hitSlop={{ top: 10, left: 10, bottom: 10, right: 20 }}
                    onPress={() => {
                        Pop.show(<ShareView iCard={iCard} iUse={iUse}/>, {
                            animationType: 'slide-up',
                            wrapStyle: {
                                justifyContent: 'flex-end',
                            }
                        })
                    }}>
                    <StyledIcon name={'md-share'} size={30} />
                    <StyledBottomMenuText>
                        点击分享
                    </StyledBottomMenuText>
                </StyledBottomMenuButton>
                {iCard.user === this.props.user.objectId && iUse.statu !== 'del' &&
                (<StyledBottomMenuButton
                    hitSlop={{ top: 10, left: 20, bottom: 10, right: 20 }}
                    onPress={() => {
                        navigation.navigate('PublishDetail',
                            { iCardID: iCard.objectId, data: iCard })
                    }}>
                    <StyledIcon name={'md-settings'} size={30} />
                    <StyledBottomMenuText>
                        卡片设置
                    </StyledBottomMenuText>
                </StyledBottomMenuButton>)}
                <StyledBottomMenuButton
                    hitSlop={{ top: 10, left: 20, bottom: 10, right: 10 }}
                    onPress={this.props.stop}>
                    <StyledIcon name={'md-trash'} size={30} />
                    <StyledBottomMenuText>
                        放弃打卡
                    </StyledBottomMenuText>
                </StyledBottomMenuButton>
            </StyledBottomMenu>
        )

    }


    row = (title, des) => (
        <StyledRow>
            <StyledRowText>
                {title}
            </StyledRowText>
            <StyledRowDes>
                {des}
            </StyledRowDes>
        </StyledRow>
    )

    rowTouch = (title, des, onPress) => (
        <StyledRowTouch onPress={onPress}>

            <StyledRowText>
                {title}
            </StyledRowText>
            <StyledRowInner>
                <StyledRowDes>
                    {des}
                </StyledRowDes>
                <StyledArrow/>
            </StyledRowInner>
        </StyledRowTouch>

    )

    render(): ReactElement<any> {

        const { navigation, iCardUser, user } = this.props;
        const { state } = navigation;
        const { params } = state;
        const { iCard, iUse } = params

        const iCardUserData = iCardUser && iCardUser.toJS()


        return (
            <StyledContent>
                {this.row('卡片名称:', iCard.title)}
                {this.row('卡片周期:', iCard.period + '次')}
                {this.row('记录模式:', iCard.record.join("+") || '无')}
                {/*{this.row('关键字:', iCard.keys.join("+"))}*/}
                {this.row('提醒时间:', iCard.notifyTime)}
                {this.row('使用人数:', iCard.useNum + '人')}
                {iCardUserData.objectId !== user.objectId &&
                this.rowTouch('拥有人:', iCardUserData.username + '', () => {
                    console.log('iCardUserData:', iCardUserData);
                    this.props.navigation.navigate('Following', { user: iCardUserData })
                })}

                <StyledTitleView>
                    <StyledTitleText>
                        卡片功能
                    </StyledTitleText>
                </StyledTitleView>
                {this._renderBottomMenu(params)}
            </StyledContent>
        );
    }
}


