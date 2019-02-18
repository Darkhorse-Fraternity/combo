/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

'use strict';

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import FlipButton from '../../../components/Button/FlipButton'
import {
  FLAG,
  ICARD,
  FLAGRECORD,
  IUSE
} from '../../../redux/reqKeys'
import moment from 'moment'
import { selfUser, iCard, Flag } from '../../../request/LCModle'
import { add, find, update } from '../../../redux/module/leancloud'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import PayForm, { FormID } from '../../../components/Form/Pay'
import { easyPay } from '../../../redux/module/pay'

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
  StyledHeaderBtnText
} from './style'
import Pop from '../../../components/Pop'
import Toast from 'react-native-simple-toast'
import { addListNormalizrEntity } from '../../../redux/actions/list'
import { list, entitys } from '../../../redux/scemes'
import { fbJoin } from "../../../request/LCCloudFuncs";
import { req } from '../../../redux/actions/req'

@connect(
  (state, props) => ({
    iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCardId),
    flag: state.normalizr.get(FLAG).get(props.navigation.state.params.flagId),
    selfUse: state.user.data,
    isTourist: state.user.isTourist
  }),
  (dispatch, props) => ({
    pay: (description, amount) => {
      return dispatch(easyPay(amount, description, "fb",))
    },

    join: async (icardId, flagId, description, flag) => {

      const { cost, endDate, startDate } = flag
      //缴费。

      //添加记录。会返回一个iUse
      const param = {
        // notifyTime:option&&option.notifyTime||"20.00",
        ...dispatch(selfUser()),
        ...iCard(icardId),
        ...Flag(flagId),
        title: description,
        amount: cost,
        endDate: endDate,
        startDate: startDate,
        // include: 'avatar'
      }
      const entity = {
        ...param,
      }
      const fbParam = fbJoin(param)
      const fbRes = await dispatch(req(fbParam))
      fbRes.result.iUse && dispatch(addListNormalizrEntity(IUSE, fbRes.result.iUse))
      dispatch(addNormalizrEntity(FLAGRECORD, entity))
      return fbRes

    },
    exist: async (icardId, flagId) => {
      const params = {
        where: {
          ...iCard(icardId),
          ...dispatch(selfUser()),
          ...Flag(flagId),
        },
      }
      return dispatch(find(FLAGRECORD, params))
    },
  })
)


export default class FlagDetail extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      load: false,
      flip: false
    }
  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      title: '',
      headerRight: (<StyledBtn
        hitSlop={{ top: 5, left: 15, bottom: 5, right: 15 }}
        onPress={() => {
          props.navigation.navigate('FlagRecord',
            { iCardId: props.navigation.state.params.iCardId })
        }}>
        <StyledHeaderBtnText>
          副本记录
        </StyledHeaderBtnText>
      </StyledBtn>),
    }
  };

  async componentDidMount() {
    const { iCardId, flagId } = this.props.navigation.state.params
    this.setState({ load: true })
    const res = await this.props.exist(iCardId, flagId)
    this.setState({ load: false, flip: res.results.length > 0 })
  }

  _renderHeader = () => {
    const flag = this.props.flag
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          {flag.get('title')}
        </StyledHeaderTitle>
      </StyledHeader>
    )
  }


  _renderTaskDes = () => {
    const iCard = this.props.iCard.toJS()
    const { limitTimes } = iCard
    return (
      <StyledFlagView>
        <StyledTitle>
          副本任务
        </StyledTitle>
        {limitTimes && <StyledDiscrib>
          {`每天 ${limitTimes[0]} - ${limitTimes[1]} 内点击首页 副本卡片-早起 完成打卡`}
        </StyledDiscrib>}
      </StyledFlagView>
    )
  }
  _renderTaskDesMore = () => {

    const iCard = this.props.iCard.toJS()
    const flag = this.props.flag.toJS()
    const { limitTimes } = iCard
    const {
      cost,
      startDate,
      endDate
    } = flag
    return (
      <StyledFlagView>
        <StyledTitle>
          具体要求
        </StyledTitle>
        <StyledDiscrib>
          活动时间：{moment(startDate.iso).format('MM月DD日')} - {moment(startDate.iso).format('MM月DD日')}
        </StyledDiscrib>
        <StyledDiscrib>
          打卡时段：
          {limitTimes && 
            <Text style={{ color: '#f5943f' }}>
             {limitTimes[0]} - {limitTimes[1]} (北京时间)
            </Text>}
        </StyledDiscrib>
        <StyledDiscrib>
          押金： <Text style={{ color: '#f5943f' }}>{cost}元 </Text>
        </StyledDiscrib>
        <StyledDiscrib>
          报名截止：{moment(startDate.iso).subtract(1, 'seconds').format('MM月DD日 h:mm')}
        </StyledDiscrib>
      </StyledFlagView>
    )
  }

  _renderBonus = () => {
    return (
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
          挑战失败：未能在规定时间内完成打卡的"赖床专业户"，
          押金将扣除，一半用来奖励完成任务的用户，一半作为监督人的管理和用于服务器的维护。
        </StyledDiscrib>
      </StyledFlagView>
    )
  }

  _renderAudit = () => {
    return (
      <StyledFlagView>
        <StyledTitle>
          关于审核
        </StyledTitle>
        <StyledDiscrib>
          此副本采取机器审核加人工抽样检查，我们保留有对所有打卡记录的审核情况的修改权利。
        </StyledDiscrib>
      </StyledFlagView>
    )
  }

  _renderAppeal = () => {
    return (
      <StyledFlagView>
        <StyledTitle>
          关于申诉
        </StyledTitle>
        <StyledDiscrib>
          为保障用户财产不受侵害,当用户因小改变app问题没有正常完成副本任务,用户可以进行申诉。
        </StyledDiscrib>
      </StyledFlagView>
    )
  }


  __payAndJoin = async () => {

    const { iCardId, flagId } = this.props.navigation.state.params
    const { selfUse, join, flag, iCard, isTourist, pay } = this.props
    const flagModel = flag.toJS()
    const cost = flag.get('cost')
    const endDate = flag.get('endDate').toJS()

    // console.log('endDate:', endDate);

    if (moment().isAfter(moment(endDate.iso))) {
      return
    }
    if (isTourist) {
      Toast.show('参加副本需要先登录~!')
      return this.props.navigation.navigate('login', { transition: 'forVertical' });
    }
    const title = iCard.get('title')
    const description = "副本_" + title + '的加入费用'
    if (cost > 0) {
      Pop.show(<PayForm
        onSubmit={async () => {
          try {
            this.setState({ load: true })
            const payRes = await pay(description, cost)
            payRes.payload.statu === 'suc' && Pop.hide()
            const res = payRes.payload.statu === 'suc' &&
              await join(iCardId, flagId, description, flagModel)
            this.setState({ load: false, flip: !!res })
          } catch (e) {
            console.log('e:', e.message);
            this.setState({ load: false })
          }

        }}
        balance={selfUse.balance || 0}
        price={cost}/>, {
        animationType: 'slide-up',
        wrapStyle: {
          justifyContent: 'flex-end',
        }
      })
    } else {
      try {
        this.setState({ load: true })
        const res = await join(iCardId, flagId, description, flagModel)
        this.setState({ load: false, flip: !!res })
      } catch (e) {
        console.log('e:', e.message);
        this.setState({ load: false })
      }
    }


  }

  render(): ReactElement<any> {

    // const { iCard, flag } = this.props
    const { flag, } = this.props
    const endDate = flag.get('endDate').toJS()

    // console.log('endDate:', endDate);
    const overdue = moment().isAfter(moment(endDate.iso))

    return (
      <StyledSafeAreaView forceInset={{ top: 'never' }}>
        <StyledContent>
          {this._renderHeader()}
          <StyledCover source={require('../../../../source/img/flag/flag_up.jpeg')}/>
          {this._renderTaskDes()}
          {this._renderTaskDesMore()}
          {this._renderBonus()}
          {this._renderAudit()}
          {this._renderAppeal()}
          <View style={{ height: 100 }}/>
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
          style={styles.flip}/>
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

})