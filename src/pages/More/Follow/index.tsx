/**
 * Created by lintong on 2018/9/29.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

import { StyledContent } from './style';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TitleTabBar from '../../../components/Groceries/TitleTabBar';

import Followee from './Followee';
import Follower from './Follower';

export default class Follow extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      scrollValue: new Animated.Value(0),
    };
  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = (props) => {
    const { route } = props;
    // const {state} = navigation;
    // const {params} = route || {};
    // const {gestureEnabled} = params || {gestureEnabled: true};
    return {
      // header:null,
      gestureEnabled: true,
    };
  };

  render() {
    return (
      <StyledContent>
        <ScrollableTabView
          onScroll={(x) => {
            x = x <= 0 ? 0 : x;
            x = x >= 1 ? 1 : x;
            const containerWidthAnimatedValue = new Animated.Value(x);
            this.setState({ scrollValue: containerWidthAnimatedValue });
          }}
          onChangeTab={({ i }) => {
            // this.props.navigation.setParams({gestureEnabled: i === 0});
          }}
          renderTabBar={() => (
            <TitleTabBar
              tabUnderlineWidth={35}
              scrollValueWithOutNative={this.state.scrollValue}
            />
          )}
          // tabBarInactiveTextColor={theme.mainColor}
          // tabBarActiveTextColor={theme.mainColor}
          // tabBarUnderlineStyle={{ backgroundColor: theme.mainColor }}
          // tabBarPosition ='bottom'
        >
          <Followee tabLabel="关注" {...this.props} />
          <Follower tabLabel="被关注" {...this.props} />
        </ScrollableTabView>
      </StyledContent>
    );
  }
}
