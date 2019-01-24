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
import { formValueSelector } from 'redux-form/immutable'
import { ORDER } from '../../../redux/reqKeys'
import { pay } from '../../../redux/module/pay'

const selector = formValueSelector(FormID) // <-- same as form name
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
import { addListNormalizrEntity } from '../../../redux/actions/list'
import { list, entitys } from '../../../redux/scemes'

@connect(
  (state, props) => ({
    iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCardId),
    flag: state.normalizr.get(FLAG).get(props.navigation.state.params.flagId),
    selfUse: state.user.data,
  }),
  dispatch => ({
    join: (icardId, flagId, title, amount, endDate) => {
      return dispatch(async (dispatch, getState) => {
        const state = getState()
        //缴费。

        let radio = selector(state, 'PayRadio')
        radio = radio && radio.toJS && radio.toJS()

        if (!radio) {
          return
        }
        const ItemId = radio.ItemId
        const types = {
          "alipay": 'alipay_app',
          'wechat': 'weixin_app',
          'cash': 'cash',
        }

        const Atanisi = Math.floor(Math.random() * 999999);
        const tradeId = new Date().getTime() + Atanisi + ''
        const description = "副本_" + title + '的加入费用'
        // //添加订单
        await dispatch(add({
          description,
          amount,
          // ...pointModel('beneficiary', userId, '_User'),
          payType: types[ItemId],
          tradeId: Number(tradeId),
          ...dispatch(selfUser()),
          ...iCard(icardId),
        }, ORDER))

        //添加支付
        const payRes = await dispatch(
          pay(types[ItemId],
            tradeId,
            amount,
            "",
            description))

        Pop.hide()
        console.log('payRes:', payRes);
        if (payRes.payload.statu !== 'suc') {
          return
        }
        //添加卡片iUse。
        //如果为空则添加卡片。如果在已归档中则修改卡片。
        //在iUse中做一个记录。以便在UI中做保护，在iDo中做给予截断并作出flagRecord done完成记录

        const iUseRef = await dispatch(find(IUSE, {
          where: {
            ...dispatch(selfUser()),
            ...iCard(icardId),
            statu: { "$ne": 'del' }
          }
        }))
        const iUseModal = iUseRef.results[0]

        if (iUseModal && iUseModal.state === 'stop') {
          //进行update。
          const iUseRes = await dispatch(update(iUseModal.objectId, {
            statu: 'start'
          }, IUSE))


          const iUseEntity = {
            ...iUseRes,
            ...iUseModal,
          }

          dispatch(addListNormalizrEntity(IUSE, iUseEntity))
        } else if(!iUseModal) {
          //创建一个、
          dispatch(async (dispatch, getState) => {
            const state = getState()
            const addParam = {
              ...dispatch(selfUser()),
              ...iCard(icardId),
              privacy: 2,
              time: 0,
              statu: 'start',
              doneDate: { "__type": "Date", "iso": moment('2017-03-20').toISOString() },
            }
            const addRes = await  dispatch(add(addParam, IUSE))
            const addEntity = {
              ...addParam,
              ...addRes,
              user: {
                objectId: state.user.data.objectId
              },
              iCard: {
                objectId: icardId,
              },
            }
            dispatch(addListNormalizrEntity(IUSE, addEntity))
          })

        }


        //添加记录。
        const param = {
          // notifyTime:option&&option.notifyTime||"20.00",
          ...dispatch(selfUser()),
          ...iCard(icardId),
          ...Flag(flagId),
          title: description,
          amount: amount,
          endDate: endDate
          // include: 'avatar'
        }
        const res = await dispatch(add(param, FLAGRECORD))
        const entity = {
          ...param,
          ...res
        }

        return dispatch(addNormalizrEntity(FLAGRECORD, entity))
      })

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
    const { iCard } = this.props
    const limitTimes = iCard.get("limitTimes")
    return (
      <StyledFlagView>
        <StyledTitle>
          副本任务
        </StyledTitle>
        <StyledDiscrib>
          {`每天 ${limitTimes.get(0)} - ${limitTimes.get(1)} 内点击首页 副本卡片-早起 完成打卡`}
        </StyledDiscrib>
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
          <Text style={{ color: '#f5943f' }}>{limitTimes[0]} - {limitTimes[1]} (北京时间)</Text>
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
          奖金结算：活动结束后,次日由平台审核并发送至【我的收益】
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


  render(): ReactElement<any> {

    // const { iCard, flag } = this.props

    const { iCardId, flagId } = this.props.navigation.state.params
    const { selfUse, join, flag, iCard } = this.props
    const title = flag.get('title')
    const cost = flag.get('cost')
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
          onPress={async () => {
            //如果时间超过报名时间，则这边拒绝掉。
            if (moment().isAfter(moment(endDate.iso))) {
              return
            }

            Pop.show(<PayForm
              onSubmit={async () => {
                try {
                  this.setState({ load: true })
                  const res =  await join(iCardId, flagId, iCard.get('title'), cost, endDate)
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
          }}
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