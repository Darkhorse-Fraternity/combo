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
import { connect } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import FlipButton from '../../../components/Button/FlipButton';
import {
  selfUser,
  iCardPoint,
  FlagPoint,
  userPoint,
} from '../../../request/LCModle';

import PayForm from '../../../components/Form/Pay';
import { easyPay } from '../../../redux/module/pay';
import Modal from 'react-native-modal';
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
// import { list, entitys } from '../../../redux/scemes';
import { fbJoin } from '../../../request/LCCloudFuncs';
import { req } from '../../../redux/actions/req';
import { DeviceEventEmitterKey } from '@configure/enum';
import { UserType } from 'src/data/data-context/interface';
import {
  GetClassesFlagIdResponse,
  useGetClassesFlagId,
  useGetClassesFlagRecord,
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
  selfUse: UserType;
  iCard: NonNullable<GetClassesFlagIdResponse['iCard']>;
  isTourist: boolean;
  flag: GetClassesFlagIdResponse;
  flip: boolean;
}

@connect(
  (state, props) => ({}),
  (dispatch, props) => ({
    pay: (description, amount, iCardId, flagId) =>
      dispatch(
        easyPay(amount, description, 'fb', undefined, { iCardId, flagId }),
      ),

    join: async (icardId, flagId, description, flag, tradeId) => {
      const { cost, endDate, startDate, joinNum, totalBonus } = flag;
      // 缴费。

      // 添加记录。会返回一个iUse
      const param = {
        // notifyTime:option&&option.notifyTime||"20.00",
        ...dispatch(selfUser()),
        iCard: iCardPoint(icardId),
        Flag: FlagPoint(flagId),
        title: description,
        amount: cost,
        startDate,
        endDate,
        tradeId,
        // include: 'avatar'
      };
      // const entity = {
      //   ...param,
      // };
      const fbParam = fbJoin(param);
      // console.log('fbParam', fbParam);

      const fbRes = await dispatch(req(fbParam));
      // console.log('fbRes', fbRes);
      if (fbRes) {
        // fbRes.result.iUse && dispatch(addListNormalizrEntity(IUSE, fbRes.result.iUse));
        // dispatch(addNormalizrEntity(FLAGRECORD, entity));

        //TODO: 新版本改为直接操作。
        // await dispatch(
        //   addNormalizrEntity(FLAG, {
        //     objectId: flagId,
        //     joinNum: joinNum + 1,
        //     totalBonus: totalBonus + cost,
        //   }),
        // );

        DeviceEventEmitter.emit(DeviceEventEmitterKey.iUse_reload, {});
      }
      return fbRes;
    },
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

  _renderHeader = () => {
    const { flag } = this.props;
    return (
      <StyledHeader>
        <StyledHeaderTitle>{flag.title}</StyledHeaderTitle>
      </StyledHeader>
    );
  };

  _renderTaskDes = () => {
    const { flag } = this.props;
    const startDate = flag.startDate;
    const iCard = this.props.iCard;
    const { limitTimes } = iCard;
    console.log('limitTimes', limitTimes);

    const time = moment(startDate.iso).calendar().split('00:00')[0];
    return (
      <StyledFlagView>
        <StyledTitle>副本说明</StyledTitle>
        {limitTimes && (
          <StyledDiscrib>
            {`${time} ${limitTimes[0]} - ${limitTimes[1]} 内点击首页 副本卡片 - ${iCard.title} 完成打卡`}
          </StyledDiscrib>
        )}
        {flag.reward === 'money' && (
          <StyledDiscrib>奖金池: {flag.totalBonus?.toFixed(1)}元</StyledDiscrib>
        )}
        <StyledDiscrib>参与人数: {flag.joinNum}人</StyledDiscrib>
      </StyledFlagView>
    );
  };

  _renderTaskDesMore = () => {
    const iCardM = this.props.iCard;
    // eslint-disable-next-line react/destructuring-assignment
    const flagM = this.props.flag;
    const { limitTimes } = iCardM;
    const { cost, startDate, endDate } = flagM;

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

  _renderReward = () => {
    const { flag } = this.props;
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

  _renderAudit = () => (
    <StyledFlagView>
      <StyledTitle>关于审核</StyledTitle>
      <StyledDiscrib>
        此副本采取机器审核加人工抽样检查，我们保留有对所有打卡记录的审核情况的修改权利。
      </StyledDiscrib>
    </StyledFlagView>
  );

  _renderAppeal = () => (
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
              this.props.navigation.navigate('web', {
                url: 'https://www.weibo.com/u/6861885697',
                title: '小改变的微博',
              });
            }
          });
        }}>
        <StyledComplaintText>「 点击申诉 」</StyledComplaintText>
      </TouchableOpacity>
    </StyledFlagView>
  );

  __payAndJoin = async () => {
    const { iCardId, flagId } = this.props.route.params;
    const { join, flag, isTourist } = this.props;
    const flagModel = flag;
    const cost = flag.cost;
    const endDate = flag.endDate;

    // console.log('endDate:', endDate);

    if (moment().isAfter(moment(endDate.iso))) {
      return;
    }
    if (isTourist) {
      Toast.show('参加副本需要先登录~!');
      return this.props.navigation.navigate('login', {
        transition: 'forVertical',
      });
    }
    const title = this.props.iCard.title;
    const description = `副本_${title}的加入费用`;
    if (cost > 0) {
      this.setState({ showPay: true });
    } else {
      try {
        this.setState({ load: true });
        const res = await join(iCardId, flagId, description, flagModel);
        this.setState({ load: false, flip: !!res });
      } catch (e) {
        console.log('e:', e.message);
        this.setState({ load: false });
      }
    }
  };

  render() {
    // const { iCard, flag } = this.props
    const title = this.props.iCard.title;
    const description = `副本_${title}的加入费用`;
    const { iCardId, flagId } = this.props.route.params;
    const { selfUse, join, flag, isTourist, pay } = this.props;
    const flagModel = flag;
    const endDate = flag.endDate;
    const cover = flag.cover;
    const cost = flag.cost;
    const overdue = moment().isAfter(moment(endDate.iso));

    return (
      <StyledSafeAreaView>
        <StyledContent>
          <Modal
            animationIn={'fadeInUp'}
            style={{
              justifyContent: 'flex-end',
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            useNativeDriver
            animationOut={'fadeOutDown'}
            isVisible={this.state.showPay}>
            <PayForm
              onSubmit={async () => {
                try {
                  this.setState({ load: true });
                  const payRes = await pay(description, cost, iCardId, flagId);
                  const { data, statu } = payRes.payload;
                  statu === 'suc' && this.setState({ showPay: false });
                  const res =
                    statu === 'suc' &&
                    (await join(
                      iCardId,
                      flagId,
                      description,
                      flagModel,
                      data.out_trade_no,
                    ));
                  this.setState({ load: false, flip: !!res });
                } catch (e) {
                  console.log('e:', e.message);
                  this.setState({ load: false });
                }
              }}
              onClose={() => {
                this.setState({ showPay: false });
              }}
              balance={selfUse.balance || 0}
              price={cost}
            />
          </Modal>
          {this._renderHeader()}
          <StyledCover source={{ uri: cover.url }} />
          {this._renderTaskDes()}
          {this._renderTaskDesMore()}
          {this._renderReward()}
          {cost > 0 && <RenderBonus />}
          {cost > 0 && this._renderAudit()}
          {cost > 0 && this._renderAppeal()}
          <View style={{ height: 100 }} />
        </StyledContent>
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
      </StyledSafeAreaView>
    );
  }
}

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
  const { data } = useGetClassesFlagId({ id: flagId, include: 'iCard' });
  const { user } = useGetInfoOfMe();
  const { setParams } = useNavigation();
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

  if (!data || !record) {
    return <LoadAnimation />;
  }

  return (
    <FlagDetailClass
      {...props}
      flag={data}
      selfUse={user}
      isTourist={user.isTourist}
      iCard={data.iCard!}
      flip={!!record?.count}
    />
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
