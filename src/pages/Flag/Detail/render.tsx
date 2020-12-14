/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import React, { FC, PureComponent, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  DeviceEventEmitter,
} from 'react-native';
// @ts-ignore: Unreachable code error
import { connect } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import FlipButton from '../../../components/Button/FlipButton';
import { iCardPoint, FlagPoint, userPoint } from '../../../request/LCModle';

import PayForm from '../../../components/modal/pay';
import { pay } from '../../../redux/module/pay';

import {
  StyledSafeAreaView,
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledCover,
  StyledFlagView,
  StyledTitle,
  StyledDiscrib,
  StyledComplaintText,
} from './style';

import { DeviceEventEmitterKey } from '@configure/enum';
import { UserType } from 'src/data/data-context/interface';
import {
  GetClassesFlagIdResponse,
  PostCallFbJoinResponse,
  useGetClassesFlagId,
  useGetClassesFlagRecord,
  usePostCallFbJoin,
} from 'src/hooks/interface';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { LoadAnimation } from '@components/Load';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { useNavigation } from '@react-navigation/native';

interface StateType {
  showPay: boolean;
  load: boolean;
  flip: boolean;
}

interface FDProps {
  selfUser: UserType;
  iCard: NonNullable<GetClassesFlagIdResponse['iCard']>;
  isTourist: boolean;
  flag: GetClassesFlagIdResponse;
  flip: boolean;
  join: (tradeId?: string) => Promise<PostCallFbJoinResponse>;
}

@connect(
  () => ({}),
  // @ts-ignore: Unreachable code error
  (dispatch, props) => ({
    // @ts-ignore: Unreachable code error
    pay: (type, description, amount, iCardId, flagId) =>
      dispatch(
        pay(
          type,
          amount,
          description,
          'fb',
          props.selfUser.objectId,
          undefined,
          {
            iCardId,
            flagId,
          },
        ),
      ),
  }),
)
class FlagDetailClass extends PureComponent<FDProps, StateType> {
  constructor(props: FDProps) {
    super(props);
    this.state = {
      showPay: false,
      load: false,
      flip: props.flip,
    };
  }

  __payAndJoin = async () => {
    const { join, flag, isTourist } = this.props;
    const cost = flag.cost;
    const endDate = flag.endDate;

    // console.log('endDate:', endDate);

    if (moment().isAfter(moment(endDate.iso))) {
      return;
    }
    if (isTourist) {
      Toast.show('参加副本需要先登录~!');
      // @ts-ignore: Unreachable code error
      return this.props.navigation.navigate(RouteKey.login, {
        transition: 'forVertical',
      });
    }
    if (cost > 0) {
      this.setState({ showPay: true });
    } else {
      console.log('???');

      try {
        this.setState({ load: true });
        const res = await join();
        this.setState({ load: false, flip: !!res });
      } catch (e) {
        console.log('e:', e.message);
        this.setState({ load: false });
      }
    }
  };

  onSubmit = async (type: string) => {
    const { title } = this.props.iCard;
    const description = `副本_${title}的加入费用`;
    // @ts-ignore: Unreachable code error
    const { iCardId, flagId } = this.props.route.params;
    // @ts-ignore: Unreachable code error
    const { join, flag, pay } = this.props;
    const cost = flag.cost;
    try {
      this.setState({ load: true });
      const payRes = await pay(type, description, cost, iCardId, flagId);
      const { data, statu } = payRes.payload;
      statu === 'suc' && this.setState({ showPay: false });
      const res = statu === 'suc' && (await join(data.out_trade_no));
      this.setState({ load: false, flip: !!res });
    } catch (e) {
      console.log('e:', e.message);
      this.setState({ load: false });
    }
  };

  render() {
    const { selfUser, flag } = this.props;
    const { endDate, cost } = flag;
    const overdue = moment().isAfter(moment(endDate.iso));

    return (
      <>
        <FlipButton
          disabled={this.state.flip || overdue}
          faceText={'马上\n参与'}
          backText={overdue ? '已过期' : '已参与'}
          load={this.state.load}
          flip={this.state.flip}
          // animation={Platform.OS === 'ios' ? 'bounceIn' : 'bounceInRight'}
          onPress={this.__payAndJoin}
          containStyle={styles.containStyle}
          style={styles.flip}
        />
        <PayForm
          load={this.state.load}
          isVisible={this.state.showPay}
          onSubmit={this.onSubmit}
          onClose={() => {
            this.setState({ showPay: false });
          }}
          balance={selfUser.balance || 0}
          price={cost}
        />
      </>
    );
  }
}

const RenderHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <StyledHeader>
      <StyledHeaderTitle>{title}</StyledHeaderTitle>
    </StyledHeader>
  );
};

const RenderTaskDesMore: FC<GetClassesFlagIdResponse> = (props) => {
  const { cost, startDate, endDate, iCard } = props;
  const { limitTimes = ['00:00', '24:00'] } = iCard || {};

  // const limitEndDate = moment(limitTimes[1], 'HH');
  // const limitEndHour = limitEndDate.hours();

  return (
    <StyledFlagView>
      <StyledTitle>具体要求</StyledTitle>
      <StyledDiscrib>
        活动时间：
        {moment(startDate?.iso).format('MM月DD日')} -{' '}
        {moment(endDate?.iso).format('MM月DD日')}
      </StyledDiscrib>
      <StyledDiscrib>
        打卡时段：
        {limitTimes && (
          <Text style={{ color: '#f5943f' }}>
            {limitTimes[0]} - {limitTimes[1]} (北京时间)
          </Text>
        )}
      </StyledDiscrib>
      <StyledDiscrib>
        押金：{' '}
        <Text style={{ color: '#f5943f' }}>
          {cost > 0 ? `${cost}元` : '无'}{' '}
        </Text>
      </StyledDiscrib>
      <StyledDiscrib>
        报名截止：
        {moment(startDate.iso).format('MM-DD HH:mm')}
      </StyledDiscrib>
      <StyledDiscrib>
        结算时间：
        {moment(endDate.iso).add(300, 'seconds').format('MM-DD HH:mm')}
      </StyledDiscrib>
    </StyledFlagView>
  );
};

const RenderTaskDes: FC<GetClassesFlagIdResponse> = (flag) => {
  const { startDate, totalBonus, joinNum, reward, iCard } = flag;
  const { limitTimes = ['00:00', '24:00'], title = '' } = iCard || {};

  const time = moment(startDate.iso).calendar().split('00:00')[0];
  return (
    <StyledFlagView>
      <StyledTitle>副本说明</StyledTitle>
      {limitTimes && (
        <StyledDiscrib>
          {`${time} ${limitTimes[0]} - ${limitTimes[1]} 内点击首页 副本卡片 - ${title} 完成打卡`}
        </StyledDiscrib>
      )}
      {reward === 'money' && (
        <StyledDiscrib>奖金池: {totalBonus?.toFixed(1)}元</StyledDiscrib>
      )}
      <StyledDiscrib>参与人数: {joinNum}人</StyledDiscrib>
    </StyledFlagView>
  );
};

const RenderReward: FC<GetClassesFlagIdResponse> = (flag) => {
  // const cost = flag.get('cost');
  const reward = flag.reward;
  const rewardConfig = flag.rewardConfig;
  const rewardView = () => {
    if (reward === 'money') {
      return (
        <StyledDiscrib>
          奖金：
          <Text style={{ color: '#f5943f' }}>押金+结算奖金</Text>
        </StyledDiscrib>
      );
    }
    return (
      <StyledDiscrib>
        补签卡：
        <Text style={{ color: '#f5943f' }}>
          {rewardConfig && rewardConfig.redo}张
        </Text>
      </StyledDiscrib>
    );
  };

  return (
    <StyledFlagView>
      <StyledTitle>完成奖励</StyledTitle>
      {rewardView()}
    </StyledFlagView>
  );
};

const RenderAppeal = () => {
  const { navigate } = useNavigation();
  return (
    <StyledFlagView>
      <StyledTitle>关于申诉</StyledTitle>
      <StyledDiscrib>
        为保障用户财产不受侵害,当用户因小改变app问题没有正常完成副本任务,
        用户可以通过我们的微博号进行申诉:
      </StyledDiscrib>
      <TouchableOpacity
        onPress={() => {
          Linking.canOpenURL('sinaweibo://').then((supported) => {
            // weixin://  alipay://
            if (supported) {
              Linking.openURL('sinaweibo://messagelist?uid=6861885697');
            } else {
              navigate(RouteKey.web, {
                url: 'https://www.weibo.com/u/6861885697',
                // title: '小改变的微博',
              });
            }
          });
        }}>
        <StyledComplaintText>「 点击申诉 」</StyledComplaintText>
      </TouchableOpacity>
    </StyledFlagView>
  );
};

const RenderAudit = () => (
  <StyledFlagView>
    <StyledTitle>关于审核</StyledTitle>
    <StyledDiscrib>
      此副本采取机器审核加人工抽样检查，我们保留有对所有打卡记录的审核情况的修改权利。
    </StyledDiscrib>
  </StyledFlagView>
);

const RenderBonus = () => (
  <StyledFlagView>
    <StyledTitle>关于押金</StyledTitle>
    <StyledDiscrib>
      为了用户更好的完成副本任务，本副本需要交纳押金
    </StyledDiscrib>
    <StyledDiscrib>
      奖金结算：活动结束后,次日由平台审核并发送至【我的钱包】
    </StyledDiscrib>
    <StyledDiscrib>
      挑战失败：未能在规定时间内完成打卡的用户
      押金将扣除，一半用来奖励完成任务的用户，一半作为监督人的管理和用于服务器的维护。
    </StyledDiscrib>
  </StyledFlagView>
);

const FlagDetail: FC<{}> = (props) => {
  const { flagId, iCardId } = useNavigationAllParamsWithType<
    RouteKey.flagDetail
  >();
  const { data } = useGetClassesFlagId(
    { id: flagId, include: 'iCard' },
    { cacheKey: 'GetClassesFlagId' + flagId },
  );
  const { user } = useGetInfoOfMe();
  const { setParams } = useNavigation();
  const where = {
    // ...iCard(icardId),
    iCard: iCardPoint(iCardId),
    user: userPoint(user.objectId),
    Flag: FlagPoint(flagId),
  };
  const { data: record } = useGetClassesFlagRecord(
    {
      count: '1',
      limit: '0',
      where: JSON.stringify(where),
    },
    { cacheKey: 'GetClassesFlagRecord' + flagId + iCardId },
  );

  useEffect(() => {
    if (data?.iCard?.title) {
      setParams({ title: data.iCard?.title, flagId, iCardId });
    }
  }, [data?.iCard?.title, flagId, iCardId, setParams]);

  const { run } = usePostCallFbJoin((res) => res, {
    manual: true,
    onSuccess: () => {
      // const { iUse } = data.result; // 返回值没有包含icard 完整信息所以用全刷新
      // if (iUse) {
      // }
      DeviceEventEmitter.emit(DeviceEventEmitterKey.iUse_reload, {});
    },
  });

  if (!data || !record) {
    return <LoadAnimation />;
  }

  const { cover, cost, title } = data;

  const join = (tradeId?: string) => {
    return run({
      tradeId,
      user: userPoint(user.objectId),
      iCard: iCardPoint(iCardId),
      Flag: FlagPoint(flagId),
      title: `副本_${data?.iCard?.title}的加入费用`,
      amount: data?.cost || 0,
      startDate: data?.startDate!,
      endDate: data?.endDate!,
    });
  };

  return (
    <StyledSafeAreaView>
      <StyledContent>
        <RenderHeader title={title} />
        <StyledCover source={{ uri: cover.url }} />
        <RenderTaskDes {...data} />
        <RenderTaskDesMore {...data} />
        <RenderReward {...data} />
        {cost > 0 && <RenderBonus />}
        {cost > 0 && <RenderAudit />}
        {cost > 0 && <RenderAppeal />}
        <View style={{ height: 100 }} />
      </StyledContent>
      <FlagDetailClass
        {...props}
        flag={data}
        selfUser={user}
        isTourist={user.isTourist}
        iCard={data.iCard!}
        flip={!!record?.count}
        join={join}
      />
    </StyledSafeAreaView>
  );
};

export default FlagDetail;

const styles = StyleSheet.create({
  flip: {
    position: 'absolute',
    zIndex: 100,
    bottom: 100,
    right: 15,
  },
  containStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
