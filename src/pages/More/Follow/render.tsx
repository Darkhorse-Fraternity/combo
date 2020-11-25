/**
 * Created by lintong on 2018/9/29.
 * @flow
 */
'use strict';

import React, { FC, useRef } from 'react';
import { Animated } from 'react-native';

import { StyledContent } from './style';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TitleTabBar from '../../../components/Groceries/TitleTabBar';

import { Followee } from './Followee';
import { Follower } from './Follower';

const Follow: FC<{}> = (props) => {
  const ref = useRef(new Animated.Value(0));

  return (
    <StyledContent>
      <ScrollableTabView
        onScroll={(x) => {
          x = x <= 0 ? 0 : x;
          x = x >= 1 ? 1 : x;
          ref.current.setValue(x);
        }}
        // onChangeTab={() => {
        //   // this.props.navigation.setParams({gestureEnabled: i === 0});
        // }}
        renderTabBar={() => (
          <TitleTabBar
            // tabUnderlineWidth={35}
            scrollValueWithOutNative={ref.current}
          />
        )}
        // tabBarInactiveTextColor={theme.mainColor}
        // tabBarActiveTextColor={theme.mainColor}
        // tabBarUnderlineStyle={{ backgroundColor: theme.mainColor }}
        // tabBarPosition ='bottom'
      >
        <Followee tabLabel="关注" {...props} />
        <Follower tabLabel="被关注" {...props} />
      </ScrollableTabView>
    </StyledContent>
  );
};

export default Follow;
