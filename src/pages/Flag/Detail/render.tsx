/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import React, { FC, PureComponent, useEffect } from 'react';
import { View, Text, Linking, DeviceEventEmitter } from 'react-native';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { iCardPoint, FlagPoint, userPoint } from '../../../request/LCModle';
//@ts-expect-error
import { Provider as ReduxProvider, connect } from 'react-redux';
import PayForm from '../../../components/modal/pay';
import { pay } from '../../../redux/module/pay';

import {
  StyledSafeAreaView,
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledCover,
  StyledFlagView,
  StyledMemberView,
  StyledTitle,
  StyledDiscrib,
  StyledComplaintText,
  StyledHeaderDiecrib,
  StyledHeaderDiecribView,
  StyledTaskView,
  StyledItemView,
  StyledTaskDiscrib,
  StyledTaskDiscrib2,
  StyledTaskLine,
  // StyledMemberTitle,
  StyledAvatarView,
  StyledMoreBg,
  StyledMoreText,
  StyledComplaintBtn,
  StyledBottomView,
  StyledSubmitText,
  StyledSubmitBtn,
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
import { store } from '@redux/store';
import Avatar from '@components/Avatar/Avatar2';
import { useGetIuseData } from 'src/data/data-context/core';
import { isTablet } from 'react-native-device-info';
import { isEmpty } from 'lodash';

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
  onGo: () => void;
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
          'fb',
          description,
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
    const { join, flag, isTourist, selfUser } = this.props;
    const cost = flag.cost;
    const endDate = flag.endDate;

    // console.log('endDate:', endDate);

    if (moment().isAfter(moment(endDate.iso))) {
      return;
    }
    if (isTourist) {
      Toast.show('参加副本需要先登录~!');
      // @ts-ignore: Unreachable code error
      return this.props.navigation.navigate(RouteKey.login);
    }

    const avatarObj = selfUser.avatar || selfUser.headimgurl;
    if (isEmpty(avatarObj) || isEmpty(selfUser.nickname)) {
      Toast.show('参与副本前,头像和昵称不能为空哦～');
      // @ts-ignore: Unreachable code error
      return this.props.navigation.navigate(RouteKey.account);
    }

    if (cost > 0) {
      this.setState({ showPay: true });
    } else {
      // console.log('???');

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

      Toast.showWithGravity(
        '已经参与，记得及时打卡哦～！',
        Toast.SHORT,
        Toast.CENTER,
      );

      this.setState({ load: false, flip: !!res });
    } catch (e) {
      Toast.showWithGravity(e.message, Toast.SHORT, Toast.CENTER);
      console.log('e:', e.message);
      this.setState({ load: false });
    }
  };

  render() {
    const { selfUser, flag, onGo } = this.props;
    const { endDate, cost } = flag;
    const overdue = moment().isAfter(moment(endDate.iso));

    const text = !this.state.flip
      ? '马上参与'
      : overdue
      ? '已过期'
      : '已参与,去打卡';
    const onPress = !this.state.flip ? this.__payAndJoin : onGo;
    return (
      <>
        {/* <FlipButton
          disabled={this.state.flip || overdue}
          faceText={'马上\n参与'}
          backText={overdue ? '已过期' : '已参与'}
          load={this.state.load}
          flip={this.state.flip}
          // animation={Platform.OS === 'ios' ? 'bounceIn' : 'bounceInRight'}
          onPress={this.__payAndJoin}
          containStyle={styles.containStyle}
          style={styles.flip}
        /> */}
        {/* <RenderBottom /> */}
        <StyledBottomView>
          <StyledSubmitBtn
            loading={this.state.load}
            onPress={onPress}
            disabled={overdue}>
            <StyledSubmitText>{text}</StyledSubmitText>
          </StyledSubmitBtn>
        </StyledBottomView>
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

const RenderHeader: FC<{ title: string; cost?: number }> = ({
  title,
  cost = 0,
}) => {
  return (
    <StyledHeader>
      <StyledHeaderTitle>{title}</StyledHeaderTitle>
      {cost > 0 && (
        <StyledHeaderDiecribView>
          <StyledHeaderDiecrib>押金:{'  '}</StyledHeaderDiecrib>
          <StyledHeaderDiecrib fontSize={20}>¥{cost}</StyledHeaderDiecrib>
        </StyledHeaderDiecribView>
      )}
    </StyledHeader>
  );
};

const RenderTaskDesMore: FC<GetClassesFlagIdResponse> = (props) => {
  const { startDate, endDate, iCard } = props;
  const { limitTimes = ['00:00', '24:00'] } = iCard || {};

  // const limitEndDate = moment(limitTimes[1], 'HH');
  // const limitEndHour = limitEndDate.hours();

  return (
    <StyledTaskView>
      {/* <StyledTitle>具体要求</StyledTitle> */}
      <StyledItemView>
        <StyledTaskDiscrib>活动时间</StyledTaskDiscrib>
        <StyledTaskDiscrib2
          numberOfLines={1}
          adjustsFontSizeToFit
          fontSize={12}>
          {moment(startDate?.iso).format('MM.DD')}~
          {moment(endDate?.iso).format('MM.DD')}
        </StyledTaskDiscrib2>
      </StyledItemView>
      <StyledTaskLine />
      <StyledItemView>
        <StyledTaskDiscrib>打卡时段</StyledTaskDiscrib>
        <StyledTaskDiscrib2
          numberOfLines={1}
          adjustsFontSizeToFit
          fontSize={12}>
          {limitTimes[0]}~{limitTimes[1]}
        </StyledTaskDiscrib2>
      </StyledItemView>
      <StyledTaskLine />
      <StyledItemView>
        <StyledTaskDiscrib>报名截止</StyledTaskDiscrib>
        <StyledTaskDiscrib2
          numberOfLines={1}
          adjustsFontSizeToFit
          fontSize={12}
          style={{ color: '#f5943f' }}>
          {moment(startDate.iso).format('MM-DD HH:mm')}
        </StyledTaskDiscrib2>
      </StyledItemView>
      <StyledTaskLine />
      <StyledItemView>
        <StyledTaskDiscrib>结算时间</StyledTaskDiscrib>
        <StyledTaskDiscrib2
          numberOfLines={1}
          adjustsFontSizeToFit
          fontSize={12}
          style={{ color: '#f5943f' }}>
          {moment(endDate.iso).add(300, 'seconds').format('MM-DD HH:mm')}
        </StyledTaskDiscrib2>
      </StyledItemView>
    </StyledTaskView>
  );
};

const RendeMember: FC<GetClassesFlagIdResponse> = (flag) => {
  const { navigate } = useNavigation();
  const { joinNum, objectId = '' } = flag;
  // const { limitTimes = ['00:00', '24:00'], title = '' } = iCard || {};

  const where = {
    Flag: FlagPoint(objectId),
  };
  const param = {
    limit: '20',
    skip: '0',
    order: '-doneState,doneDate',
    include: 'user',
    where: JSON.stringify(where),
  };
  const { data } = useGetClassesFlagRecord(param, {
    cacheKey: 'GetClassesFlagRecord' + objectId,
  });
  const { results } = data || {};

  if (!results || results.length === 0) {
    return null;
  }

  const limit = isTablet() ? 20 : 10;

  if (results.length > limit) {
    results.length = limit;
  }

  return (
    <StyledMemberView>
      <StyledTitle>
        <StyledTitle color={'#65BB6A'}>{joinNum}</StyledTitle> 人次参与
      </StyledTitle>

      <StyledAvatarView
        onPress={() => {
          navigate(RouteKey.frDetail, { flagId: objectId });
        }}>
        {results.map(({ user }) => {
          const user1 = user as UserType;
          return (
            <Avatar
              style={{ marginLeft: -5 }}
              key={user.objectId}
              user={user1}
              radius={16}
            />
          );
        })}
        {results.length === limit && (
          <StyledMoreBg>
            <StyledMoreText>···</StyledMoreText>
          </StyledMoreBg>
        )}
      </StyledAvatarView>
    </StyledMemberView>
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
      <StyledComplaintBtn
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
        <StyledComplaintText>点击申诉</StyledComplaintText>
      </StyledComplaintBtn>
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

// const RenderBottom: FC<{}> = () => {
//   return (
//     <StyledBottomView>
//       <StyledSubmitBtn>
//         <StyledSubmitText>马上参与</StyledSubmitText>
//       </StyledSubmitBtn>
//     </StyledBottomView>
//   );
// };

const FlagDetail: FC<{}> = (props) => {
  const { flagId, iCardId } = useNavigationAllParamsWithType<
    RouteKey.flagDetail
  >();
  const { data } = useGetClassesFlagId(
    { id: flagId, include: 'iCard' },
    { cacheKey: 'GetClassesFlagId' + flagId },
  );
  const { user } = useGetInfoOfMe();
  const { setParams, navigate } = useNavigation();
  const { data: iUses } = useGetIuseData();
  const where = {
    // ...iCard(icardId),
    iCard: iCardPoint(iCardId),
    user: userPoint(user.objectId),
    Flag: FlagPoint(flagId),
  };
  const { data: record } = useGetClassesFlagRecord({
    count: '1',
    limit: '0',
    where: JSON.stringify(where),
  });

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

  const goClockIn = () => {
    const iCardId1 = data.iCard?.objectId;
    if (iCardId1 && iUses) {
      iUses.forEach((item) => {
        if (item.iCard.objectId === iCardId) {
          console.log('iCardId', iCardId);
          console.log('iUseId', item.objectId);
          navigate(RouteKey.card, {
            iUseId: item.objectId,
            iCardId,
          });
        }
      });
    }
  };

  return (
    <StyledSafeAreaView>
      <StyledContent>
        <StyledCover source={{ uri: cover.url }} />
        <RenderHeader title={title} cost={cost} />

        <RenderTaskDesMore {...data} />
        <RendeMember {...data} />
        <RenderReward {...data} />
        {cost > 0 && <RenderBonus />}
        {cost > 0 && <RenderAudit />}
        <RenderAppeal />
        <View style={{ height: 100 }} />
      </StyledContent>
      <ReduxProvider store={store}>
        <FlagDetailClass
          {...props}
          flag={data}
          selfUser={user}
          isTourist={user.isTourist}
          iCard={data.iCard!}
          flip={!!record?.count}
          join={join}
          onGo={goClockIn}
        />
      </ReduxProvider>
    </StyledSafeAreaView>
  );
};

export default FlagDetail;
