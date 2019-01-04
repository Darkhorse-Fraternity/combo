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
  StyledSafeAreaView,
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledCover,
  StyledFlagView,
  StyledTitle,
  StyledDiscrib
} from './style'


@connect(
  state => ({}),
  dispatch => ({})
)


export default class FlagDetail extends PureComponent {
  constructor(props: Object) {
    super(props);

  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      title: '',
    }
  };
  _renderHeader = () => {
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          早起副本
        </StyledHeaderTitle>
      </StyledHeader>
    )
  }


  _renderTaskDes = () => {
    return (
      <StyledFlagView>
        <StyledTitle>
          副本任务
        </StyledTitle>
        <StyledDiscrib>
          每天5:00-7:00内点击首页 活动卡片-早起 完成打卡
        </StyledDiscrib>
      </StyledFlagView>
    )
  }
  _renderTaskDesMore = () => {
    return (
      <StyledFlagView>
        <StyledTitle>
          具体要求
        </StyledTitle>
        <StyledDiscrib>
          活动时间：1月4日 - 1月4日
        </StyledDiscrib>
        <StyledDiscrib>
          打卡时段：
          <Text style={{ color: '#f5943f' }}> 5:00 - 7:00 (北京时间)</Text>
        </StyledDiscrib>
        <StyledDiscrib>
          押金： <Text style={{ color: '#f5943f' }}>5元 </Text>
        </StyledDiscrib>
        <StyledDiscrib>
          报名截止：1月3日 23:59
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

    return (
      <StyledSafeAreaView>
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
          faceText={'马上\n参与'}
          backText={'已参与'}
          load={false}
          flip={false}
          animation={Platform.OS === 'ios' ? 'bounceIn' : 'bounceInRight'}
          onPress={() => {

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