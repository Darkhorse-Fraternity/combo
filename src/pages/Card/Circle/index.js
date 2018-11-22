/**
 * Created by lintong on 2018/7/12.
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  DeviceEventEmitter
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import LCList from '../../../components/Base/LCList';
import { Privacy } from '../../../configure/enum'
import RecordRow from '../../Record/RecordRow'
import Header from '../../Record/RecordRow/Header'
import { IDO, IUSE } from '../../../redux/reqKeys'
import { recordDiary } from '../Do/Diary'
import ShareView from '../../../components/Share/ShareView'
import Pop from '../../../components/Pop'
import Dialog from '../../../components/Dialog'
import { classUpdate } from '../../../request/leanCloud'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { req } from '../../../redux/actions/req'
const listKey = IDO


import {
  StyledHeader,
  StyledTitleView,
  StyledTitleText,
  StyledHeaderButton,
  StyledHeaderImage,
  StyledHeaderText
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import { selfUser, iCard } from '../../../request/LCModle'
import { required } from "../../../request/validation";

@connect(
  (state, props) => ({
    user: state.user.data,

  }),
  (dispatch, props) => ({
    tipTap: recordDiary,
    updatePrivacy: async (data, privacy) => {
      const id = data.objectId
      const param = {
        privacy,
      }
      // const res = await update(id, param, IUSE)
      const lParams = classUpdate(IUSE, id, param)
      const res = await dispatch(req(lParams, 'updatePrivacy'))
      const entity = {
        ...param,
        ...res,
      }
      dispatch(addNormalizrEntity(IUSE, entity))
    },
    pickPrivacy: async (iUse, isSelf) => {


      const items = isSelf ? [
        { label: '不对外开放', id: '0' },
        { label: '对外开放', id: '2' }
      ] : [
        { label: '不对外开放', id: '0' },
        { label: '仅对卡片拥有者开放', id: '1' },
        { label: '对外开放', id: '2' }
      ]

      const selectedId = iUse.privacy === 1 && isSelf ? 0 : iUse.privacy

      return Dialog.showPicker('隐私设置', null, {
        negativeText: '取消',
        type: Dialog.listRadio,
        selectedId: selectedId + "",
        items: items
      });
    }
  })
)


export default class Circle extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {};
  static defaultProps = {};


  componentDidMount() {
    // const key = 'done_' + this.props.iCard.get('objectId')
    // this.subscription =
    //     DeviceEventEmitter.addListener(key, this.refresh);
  }

  componentWillUnmount() {
    // this.subscription.remove();
  }


  __renderHeader = () => {
    const iCard = this.props.iCard.toJS()
    const iUse = this.props.iUse.toJS()
    const { user } = this.props
    return (
      <StyledHeader>
        {/*<StyledTitleText>*/}
        {/*圈子日记*/}
        {/*</StyledTitleText>*/}
        <StyledHeaderButton
          hitSlop={{ top: 5, left: 10, bottom: 5, right: 10 }}
          onPress={() => this.props.tipTap(this.props.iUse.toJS())}
        >
          <StyledHeaderImage source={require('../../../../source/img/circle/write.png')}/>
          <StyledHeaderText>
            添加日记
          </StyledHeaderText>
        </StyledHeaderButton>

        <StyledHeaderButton
          hitSlop={{ top: 5, left: 10, bottom: 5, right: 10 }}
          onPress={async () => {
            const userId = user.objectId
            const beUserId = iCard.user
            const isSelf = userId === beUserId
            const { selectedItem } = await this.props.pickPrivacy(iUse, isSelf)
            if (selectedItem) {
              const { id } = selectedItem;
              iUse.privacy !== Number(id) &&
              this.props.updatePrivacy(iUse, Number(id))
            }
          }}
        >
          <StyledHeaderImage source={
            iUse.privacy ===
            Privacy.open ?
              require('../../../../source/img/circle/privacy_open.png') :
              require('../../../../source/img/circle/privacy_close.png')}/>
          <StyledHeaderText>
            隐私设置
          </StyledHeaderText>
        </StyledHeaderButton>

        <StyledHeaderButton
          hitSlop={{ top: 5, left: 10, bottom: 5, right: 10 }}
          onPress={() => {
            Pop.show(<ShareView iCard={iCard} iUse={iUse}/>, {
              animationType: 'slide-up',
              wrapStyle: {
                justifyContent: 'flex-end',
              }
            })
          }}
        >
          <StyledHeaderImage source={require('../../../../source/img/circle/invitation.png')}/>
          <StyledHeaderText>
            邀请好友
          </StyledHeaderText>
        </StyledHeaderButton>

      </StyledHeader>

    )

  }

  renderRow({ item, index }: Object) {
    return (
      <View>
        <Header
          userId={item.user}
          onPress={(user) => {
            this.props.navigation.navigate('following',
              { user })
          }}/>
        <RecordRow style={styles.row} item={item} navigation={this.props.navigation}/>
      </View>
    )
  }


  render(): ReactElement<any> {

    const iCardId = this.props.iCard.get('objectId')

    const privacy = this.props.iCard.get('user') === this.props.user.objectId ?
      Privacy.openToCoach : Privacy.open
    const param = {
      'where': {
        ...iCard(iCardId),
        $or: [
          { imgs: { $exists: true } },
          { recordText: { $exists: true } }
        ],
      },
      include: 'user',
      privacy: { "$gte": privacy },//为0的时候只有自己可以查看
    }
    return (
      <LCList
        ref={'list'}
        noDataPrompt={'写一个日记吧~！'}
        ListHeaderComponent={this.__renderHeader}
        style={[this.props.style, styles.list]}
        reqKey={listKey}
        sKey={listKey + iCardId}
        renderItem={this.renderRow.bind(this)}
        tipBtnText={'添加日记'}
        tipTap={() => this.props.tipTap(this.props.iUse.toJS())}
        //dataMap={(data)=>{
        //   return {[OPENHISTORYLIST]:data.list}
        //}}
        reqParam={param}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  row: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e4e4e4',
  },


})

