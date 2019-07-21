/**
 * Created by lintong on 2019/1/2.
 * @flow
 */


import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import FlipButton from '../../../components/Button/FlipButton';
import {
  FLAG,
  ICARD,
  FLAGRECORD,
  IUSE
} from '../../../redux/reqKeys';
import { selfUser, iCard, Flag } from '../../../request/LCModle';
import { add, find, update } from '../../../redux/module/leancloud';
import { addNormalizrEntity, addNormalizrEntities } from '../../../redux/module/normalizr';
import PayForm, { FormID } from '../../../components/Form/Pay';
import { easyPay } from '../../../redux/module/pay';

import {
  StyledSafeAreaView,
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledCover,
  StyledFlagView,
  StyledTitle,
  StyledDiscrib,
  StyledBtn,
  StyledHeaderBtnText,
  StyledComplaintText
} from './style';
import Pop from '../../../components/Pop';
import { listReq } from '../../../redux/actions/list';
// import { list, entitys } from '../../../redux/scemes';
import { fbJoin } from '../../../request/LCCloudFuncs';
import { req } from '../../../redux/actions/req';
import { iUseList as iUseListParams } from '../../../request/leanCloud';


@connect(
  (state, props) => ({
    iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCardId),
    flag: state.normalizr.get(FLAG).get(props.navigation.state.params.flagId),
    selfUse: state.user.data,
    isTourist: state.user.isTourist
  }),
  (dispatch, props) => ({
    pay: (description, amount, iCardId, flagId) => dispatch(easyPay(amount, description, 'fb', undefined, { iCardId, flagId })),

    join: async (icardId, flagId, description, flag, tradeId) => {
      const {
        cost, endDate, startDate, joinNum, totalBonus
      } = flag;
      // 缴费。

      // 添加记录。会返回一个iUse
      const param = {
        // notifyTime:option&&option.notifyTime||"20.00",
        ...dispatch(selfUser()),
        ...iCard(icardId),
        ...Flag(flagId),
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
        await dispatch(addNormalizrEntity(FLAG, {
          objectId: flagId,
          joinNum: joinNum + 1,
          totalBonus: totalBonus + cost
        }));


        // 刷新首页
        dispatch(listReq(IUSE, iUseListParams(), false, {
          dataMap: (data) => {
            const { iUseList } = data.result;
            // 添加副本
            // console.log('fbList', fbList);

            // dispatch(addNormalizrEntities(FLAGRECORD, { results: fbList }));

            // 通过本地时间验证,判断今日是否已经打卡
            const newIUseList = iUseList.sort((a, b) => {
              const aDone = moment(0, 'HH').isBefore(a.doneDate.iso);
              const bDone = moment(0, 'HH').isBefore(b.doneDate.iso);
              if (aDone && bDone) {
                return false;
              }
              return aDone;
            });
            return { results: newIUseList };
          }
        }));
      }

      return fbRes;
    },
    exist: async (icardId, flagId) => {
      const params = {
        where: {
          ...iCard(icardId),
          ...dispatch(selfUser()),
          ...Flag(flagId),
        },
      };
      return dispatch(find(FLAGRECORD, params));
    },
  })
)


export default class FlagDetail extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      load: false,
      flip: false
    };
  }

  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = props => ({
    title: '',
    headerRight: (<StyledBtn
      hitSlop={{
        top: 5, left: 15, bottom: 5, right: 15
      }}
      onPress={() => {
        props.navigation.navigate('FlagRecord',
          { iCardId: props.navigation.state.params.iCardId });
      }}
    >
      <StyledHeaderBtnText>
          副本记录
      </StyledHeaderBtnText>
                  </StyledBtn>),
  })
  ;

  async componentDidMount() {
    const { iCardId, flagId } = this.props.navigation.state.params;
    this.setState({ load: true });
    const res = await this.props.exist(iCardId, flagId);
    this.setState({ load: false, flip: res.results.length > 0 });
  }

  _renderHeader = () => {
    const { flag } = this.props;
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          {flag.get('title')}
        </StyledHeaderTitle>
      </StyledHeader>
    );
  }


  _renderTaskDes = () => {
    const { flag } = this.props;
    const startDate = flag.get('startDate');
    const iCard = this.props.iCard.toJS();
    const { limitTimes } = iCard;
    console.log('limitTimes', limitTimes);

    const time = moment(startDate.get('iso')).calendar().split('00:00')[0];
    return (
      <StyledFlagView>
        <StyledTitle>
          副本说明
        </StyledTitle>
        {limitTimes && (
        <StyledDiscrib>
          {`${time} ${limitTimes[0]} - ${limitTimes[1]} 内点击首页 副本卡片 - ${iCard.title} 完成打卡`}
        </StyledDiscrib>
        )}
        {flag.get('reward') === 'money' && (
        <StyledDiscrib>
          奖金池:
          {' '}
          {flag.get('totalBonus').toFixed(1)}
          元
        </StyledDiscrib>
        )}
        <StyledDiscrib>
          参与人数:
          {' '}
          {flag.get('joinNum')}
          人
        </StyledDiscrib>
      </StyledFlagView>
    );
  }

  _renderTaskDesMore = () => {
    const iCardM = this.props.iCard.toJS();
    // eslint-disable-next-line react/destructuring-assignment
    const flagM = this.props.flag.toJS();
    const { limitTimes } = iCardM;
    const {
      cost,
      startDate,
      endDate
    } = flagM;

    // const limitEndDate = moment(limitTimes[1], 'HH');
    // const limitEndHour = limitEndDate.hours();

    return (
      <StyledFlagView>
        <StyledTitle>
          具体要求
        </StyledTitle>
        <StyledDiscrib>
          活动时间：
          {moment(startDate.iso).format('MM月DD日')}
          {' '}
-
          {' '}
          {moment(endDate.iso).format('MM月DD日')}
        </StyledDiscrib>
        <StyledDiscrib>
          打卡时段：
          {limitTimes
            && (
            <Text style={{ color: '#f5943f' }}>
              {limitTimes[0]}
              {' '}
              -
              {' '}
              {limitTimes[1]}
              {' '}
              (北京时间)
            </Text>
            )}
        </StyledDiscrib>
        <StyledDiscrib>
          押金：
          {' '}
          <Text style={{ color: '#f5943f' }}>
            {cost > 0 ? `${cost}元` : '无'}
            {' '}
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
  }

  _renderReward = () => {
    const { flag } = this.props;
    // const cost = flag.get('cost');
    const reward = flag.get('reward');
    const rewardConfig = flag.get('rewardConfig');
    const rewardView = () => {
      if (reward === 'money') {
        return (
          <StyledDiscrib>
            奖金：
            <Text style={{ color: '#f5943f' }}>
              押金+结算奖金
            </Text>
          </StyledDiscrib>
        );
      }
      return (
        <StyledDiscrib>
            补签卡：
          <Text style={{ color: '#f5943f' }}>
            {rewardConfig && rewardConfig.get('redo')}
张
          </Text>
        </StyledDiscrib>
      );
    };


    return (
      <StyledFlagView>
        <StyledTitle>
          完成奖励
        </StyledTitle>
        {rewardView()}
      </StyledFlagView>
    );
  }

  _renderBonus = () => (
    <StyledFlagView>
      <StyledTitle>
          关于押金
      </StyledTitle>
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
  )

  _renderAudit = () => (
    <StyledFlagView>
      <StyledTitle>
          关于审核
      </StyledTitle>
      <StyledDiscrib>
          此副本采取机器审核加人工抽样检查，我们保留有对所有打卡记录的审核情况的修改权利。
      </StyledDiscrib>
    </StyledFlagView>
  )

  _renderAppeal = () => (
    <StyledFlagView>
      <StyledTitle>
          关于申诉
      </StyledTitle>
      <StyledDiscrib>
          为保障用户财产不受侵害,当用户因小改变app问题没有正常完成副本任务,
          用户可以通过我们的微博号进行申诉:
      </StyledDiscrib>
      <TouchableOpacity onPress={() => {
        Linking.canOpenURL('sinaweibo://').then((supported) => { // weixin://  alipay://
          if (supported) {
            Linking.openURL('sinaweibo://messagelist?uid=6861885697');
          } else {
            this.props.navigation.navigate('web', {
              url: 'https://www.weibo.com/u/6861885697',
              title: '小改变的微博'
            });
          }
        });
      }}
      >
        <StyledComplaintText>
        「 点击申诉 」
        </StyledComplaintText>
      </TouchableOpacity>
    </StyledFlagView>
  )


  __payAndJoin = async () => {
    const { iCardId, flagId } = this.props.navigation.state.params;
    const {
      selfUse, join, flag, isTourist, pay
    } = this.props;
    const flagModel = flag.toJS();
    const cost = flag.get('cost');
    const endDate = flag.get('endDate').toJS();

    // console.log('endDate:', endDate);

    if (moment().isAfter(moment(endDate.iso))) {
      return;
    }
    if (isTourist) {
      Toast.show('参加副本需要先登录~!');
      return this.props.navigation.navigate('login', { transition: 'forVertical' });
    }
    const title = this.props.iCard.get('title');
    const description = `副本_${title}的加入费用`;
    if (cost > 0) {
      Pop.show(<PayForm
        onSubmit={async () => {
          try {
            this.setState({ load: true });
            const payRes = await pay(description, cost, iCardId, flagId);
            const { data, statu } = payRes.payload;
            statu === 'suc' && Pop.hide();
            const res = statu === 'suc'
              && await join(iCardId, flagId, description, flagModel, data.out_trade_no);
            this.setState({ load: false, flip: !!res });
          } catch (e) {
            console.log('e:', e.message);
            this.setState({ load: false });
          }
        }}
        balance={selfUse.balance || 0}
        price={cost}
      />, {
        animationType: 'slide-up',
        wrapStyle: {
          justifyContent: 'flex-end',
        }
      });
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
  }

  render(): ReactElement<any> {
    // const { iCard, flag } = this.props
    const { flag, } = this.props;
    const endDate = flag.get('endDate').toJS();
    const cover = flag.get('cover');
    const cost = flag.get('cost');
    const overdue = moment().isAfter(moment(endDate.iso));

    return (
      <StyledSafeAreaView forceInset={{ top: 'never' }}>
        <StyledContent>
          {this._renderHeader()}
          <StyledCover
            source={{ uri: cover.get('url') }}
          />
          {this._renderTaskDes()}
          {this._renderTaskDesMore()}
          {this._renderReward()}
          {cost > 0 && this._renderBonus()}
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
  }

});
