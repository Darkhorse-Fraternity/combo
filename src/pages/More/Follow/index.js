/**
 * Created by lintong on 2018/9/29.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  Animated,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import {
  StyledContent,
} from './style'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import BackTabBar from '../../../components/Groceries/BackTabBar'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import Followee from './Followee'
import Follower from './Follower'


@connect(
  state => ({}),
  dispatch => ({})
)


export default class Follow extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      scrollValue: new Animated.Value(0)
    }
  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      header:null,
    }
  };


  render(): ReactElement<any> {


    return (
      <StyledContent >
        <ScrollableTabView
          ref={'ScrollableTabView'}
           onScroll={(x) => {
             const containerWidthAnimatedValue = new Animated.Value(x);
             this.setState({ scrollValue: containerWidthAnimatedValue });
           }}
          renderTabBar={() => (
            <BackTabBar
              tabUnderlineWidth={35}
              scrollValueWithOutNative={this.state.scrollValue}
              onBackPress={this.props.navigation.goBack}/>
          )}
          // tabBarInactiveTextColor={theme.mainColor}
          // tabBarActiveTextColor={theme.mainColor}
          // tabBarUnderlineStyle={{ backgroundColor: theme.mainColor }}
          // tabBarPosition ='bottom'
        >
          <Followee tabLabel='关注' {...this.props}/>
          <Follower tabLabel= "被关注"  {...this.props}/>
        </ScrollableTabView>

      </StyledContent>
    );
  }
}


