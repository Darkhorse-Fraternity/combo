/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    DeviceEventEmitter
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
    StyledContent,
    StyledIcon
} from './style'
import ShareView from '../../../components/Share/ShareView'
import Pop from '../../../components/Pop'
import DoCardButton from '../../../components/Button/DoCardButton'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import BackTabBar from '../../../components/Groceries/BackTabBar'
import Agenda from '../Agenda'
import Info from '../Settings'
import Course from '../Course'
import Button from '../../../components/Button'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import theme from '../../../Theme'


@connect(
    (state, props) => ({
        iCard: state.normalizr.get('iCard').get(props.navigation.state.params.iCardId),
        iUse: state.normalizr.get('iUse').get(props.navigation.state.params.iUseId)
    }),
    (dispatch, props) => ({})
)


export default class CardDetail extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {
        const { navigation } = props;
        const { state } = navigation;
        const { params } = state;
        return {
            // title: params.iCard.title,
            header: null,
        }
    };


    _afterDone = (key) => {
        DeviceEventEmitter.emit(key);
    }

    __renderRightView = () => {

        const { navigation } = this.props;
        const { state } = navigation;
        const { params } = state;
        const { iCardId, iUseId } = params
        const iCard = this.props.iCard.toJS()
        const iUse = this.props.iUse.toJS()
        return [
            <Button key={'icon1'} onPress={() => {
                Pop.show(<ShareView iCard={iCard} iUse={iUse}/>, {
                    animationType: 'slide-up',
                    wrapStyle: {
                        justifyContent: 'flex-end',
                    }
                })
            }}>
                <StyledIcon
                    color={'black'}
                    size={25}
                    name={'md-share'}/>
            </Button>,
            <Button key={'icon2'} onPress={() => {
                this.props.navigation.navigate('cardSetting', {
                    iCardId, iUseId
                })
            }}>
                <StyledIcon
                    color={'black'}
                    style={{ marginRight: 10 }}
                    size={25}
                    name={'md-settings'}/>
            </Button>,
        ]
    }


    render(): ReactElement<any> {

        // const params = this.props.navigation.state.params
        // const {iUse,iCard} = params

        const { iCard } = this.props

        const useNum = iCard.get('useNum')
        const title = iCard.get('title')

        return (
            <StyledContent>
                <ScrollableTabView
                    ref={'ScrollableTabView'}
                    locked={useNum <= 1}
                    renderTabBar={() => (
                        <BackTabBar
                            rightView={this.__renderRightView}
                            onBackPress={this.props.navigation.goBack}/>
                    )}
                    prerenderingSiblingsNumber={0}
                    tabBarInactiveTextColor={theme.mainColor}
                    tabBarActiveTextColor={theme.mainColor}
                    tabBarUnderlineStyle={{ backgroundColor: theme.mainColor }}
                    // tabBarPosition ='bottom'
                >
                    {useNum > 1 &&
                    <Course {...this.props}
                            tabLabel='课程'/>}
                    <Agenda
                        ref={'agenda'}
                        {...this.props}
                        tabLabel={useNum <= 1 ? title : "统计"}/>
                    {/*<Info {...this.props} tabLabel="设置"/>*/}
                </ScrollableTabView>

                <DoCardButton
                    afterDone={()=>this._afterDone('done_'+ iCard.get('objectId'))}
                    {...this.props} />
            </StyledContent>
        );
    }
}

