/**
 * Created by lintong on 2018/8/17.
 * @flow
 */

import React, { FC, PureComponent, useEffect } from 'react';
import { Animated } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledHeaderCash,
  StyledHeaderBottom,
  StyledHeaderBtn,
} from './style';
import EarningRecord from '../Record/EarningsRecord';
import CostRecord from '../Record/CostRecord';
import CashRecord from '../Record/CashRecord';
import EZTabBar from '../../../components/Groceries/EZTabBar';
import { useGetInfoOfMe, useUpdateMe } from 'src/data/data-context/user';
import { UserType } from 'src/data/data-context/interface';
import { useNavigation } from '@react-navigation/native';

class EarningsClass extends PureComponent<{}> {
  scrollValue = new Animated.Value(0);

  render() {
    return (
      <ScrollableTabView
        onScroll={(x) => {
          x = x <= 0 ? 0 : x;
          x = x >= 2 ? 2 : x;
          this.scrollValue.setValue(x);
        }}
        onChangeTab={({ i }) => {
          this.props.navigation.setParams({ gestureEnabled: i === 0 });
        }}
        renderTabBar={() => (
          <EZTabBar
            scrollValueWithOutNative={this.scrollValue}
            style={{ marginLeft: 15 }}
          />
        )}>
        <EarningRecord tabLabel="收益记录" />
        <CostRecord tabLabel="消费记录" />
        <CashRecord tabLabel="取现记录" />
      </ScrollableTabView>
    );
  }
}

const RenderHeader: FC<{ user: UserType }> = (props) => {
  const cash = props.user.balance;
  const { navigate } = useNavigation();
  return (
    <StyledHeader>
      <StyledHeaderTitle>我的收益</StyledHeaderTitle>
      <StyledHeaderBottom>
        <StyledHeaderCash>￥{(cash / 100).toFixed(2)}</StyledHeaderCash>
        <StyledHeaderBtn
          hitSlop={{
            top: 5,
            left: 50,
            bottom: 5,
            right: 5,
          }}
          onPress={() => {
            navigate('cash');
          }}
          title="取现"
        />
      </StyledHeaderBottom>
      {/* <StyledTitleView> */}
      {/* <StyledTitleText> */}
      {/* 收益记录 */}
      {/* </StyledTitleText> */}
      {/* </StyledTitleView> */}
    </StyledHeader>
  );
};

const Earnings: FC<{}> = (props) => {
  const { user } = useGetInfoOfMe();
  const { run } = useUpdateMe();

  useEffect(() => {
    run();
  }, [run]);

  return (
    <StyledContent>
      <RenderHeader user={user} />
      <EarningsClass {...props} user={user} />
    </StyledContent>
  );
};

export default Earnings;
