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
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
    StyledContent,
} from './style'

import DoCardButton from '../../../components/Button/DoCardButton'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import BackTabBar from '../../../components/Groceries/BackTabBar'
import Agenda from '../Agenda'
import Info from '../Info'
import Course from '../Course'

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


    render(): ReactElement<any> {

        // const params = this.props.navigation.state.params
        // const {iUse,iCard} = params

        // const { iCard } = this.props


        return (
            <StyledContent forceInset={{ top: 'never' }}>
                <ScrollableTabView
                    renderTabBar={() => (
                        <BackTabBar
                            onBackPress={this.props.navigation.goBack}/>
                    )}
                    prerenderingSiblingsNumber={0}
                    tabBarInactiveTextColor={theme.mainColor}
                    tabBarActiveTextColor={theme.mainColor}
                    tabBarUnderlineStyle={{ backgroundColor: theme.mainColor }}
                    // tabBarPosition ='bottom'
                >
                    <Course {...this.props} tabLabel='课程'/>
                    <Agenda {...this.props} tabLabel="记录"/>
                    <Info {...this.props} tabLabel="设置"/>
                </ScrollableTabView>
                <DoCardButton {...this.props} />
            </StyledContent>
        );
    }
}

