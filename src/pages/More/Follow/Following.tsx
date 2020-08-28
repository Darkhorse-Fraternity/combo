
/**
 * Created by lintong on 2018/4/10.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import Button from '../../../components/Button'
import PropTypes from 'prop-types';
import {
  FOLLOWRECORD,
  ICARD,
  IUSE,
  USER
} from '../../../redux/reqKeys'
import { Privacy ,CircleState} from '../../../configure/enum'
import {
  StyleFolllow,
  StyleFollowText,
  StyleFollowDevide,
} from '../style'

import {
  StyledContent,
  StyleHeader,
  StyleHeaderInner,
  StyleHeaderInnerLeft,
  StyleHeaderInnerRight,
  StyledAvatar,
  StyledHeaderTop,
  StyledHeaderBottom,
  StyledHeaderName,
  StyledZoomImage,
  StyleFollowTipText,
  StyledBottomTitle
} from './style'
// import CardRow from '../../NewCard/CardRow'
import Cell from '../../Habit/Cell'

import { user as userModel } from '../../../request/LCModle'

import HeaderBtn from '../../../components/Button/HeaderBtn'
import LCList from '../../../components/Base/LCList';

import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import {
  friendExist,
  friendshipAdd,
  friendshipDelete,
  friendNum,
} from '../../../request/leanCloud'

import { req, reqChangeData } from '../../../redux/actions/req'
import {
  FRIENDNUM,
  FRIENDEXIST,
  FOLLOWING
} from '../../../redux/reqKeys'
import Avatar from '../../../components/Avatar/Avatar2'
import { isTablet } from 'react-native-device-info';


@connect(
  (state, props) => ({
    data: state.list.get(FOLLOWRECORD + props.route.params.userId),
    iCard: state.normalizr.get(ICARD),
    selfUser: state.user.data,
    user:state.normalizr.get(USER).get(props.route.params.userId),
    friendNum: state.req.get(FRIENDNUM + props.route.params.userId),
    friendeExist: state.req.get(FRIENDEXIST + props.route.params.userId),
    followLoad: state.req.get(FOLLOWING).get('load')
  }),
  (dispatch, props) => ({
    loadFriendNum: (userId) => {
      // const userId = props.route.params.userId
      const param = friendNum(userId)
      // console.log('test000:', userId);
      dispatch(req(param, FRIENDNUM + userId))
    },
    loadfriendExist: (beFollowedUserId) => {
      dispatch((dispatch, getState) => {
        // const beFollowedUserId = props.route.params.userId
        const state = getState()
        const userId = state.user.data.objectId

        const param = friendExist(userId, beFollowedUserId)
        dispatch(req(param, FRIENDEXIST + beFollowedUserId))
      })
    },
    follow: (isExist, num) => {
      dispatch((dispatch, getState) => {
        const beFollowedUserId = props.route.params.userId
        const state = getState()
        const userId = state.user.data.objectId

        let selfNum = state.req.get(FRIENDNUM + userId)
        if (selfNum) {
          selfNum = selfNum.get('data').get('followees_count')
        }
        // const selfNum = state.req.get(FRIENDNUM + userId).get('data').get('followees_count')

        if (isExist) {
          const param = friendshipDelete(userId, beFollowedUserId)
          dispatch(req(param, FOLLOWING))
          //取消关注，friendeExist 数据变更。
          //friendNum 数据-1
          dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId, { count: 0 }))
          dispatch(reqChangeData(
            FRIENDNUM + beFollowedUserId,
            { followers_count: num - 1 }))
          //自己
          selfNum > 0 && dispatch(reqChangeData(
            FRIENDNUM + userId,
            { followees_count: selfNum - 1 }))

        } else {
          const param = friendshipAdd(userId, beFollowedUserId)
          dispatch(req(param, FOLLOWING))
          dispatch(reqChangeData(FRIENDEXIST + beFollowedUserId, { count: 1 }))
          dispatch(reqChangeData(
            FRIENDNUM + beFollowedUserId,
            { followers_count: num + 1 }))
          //自己
          selfNum !== undefined && dispatch(reqChangeData(
            FRIENDNUM + userId,
            { followees_count: selfNum + 1 }))

        }


      })
    }
  })
)


export default class Following extends PureComponent {
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

  componentDidMount() {
    this.props.loadFriendNum(this.props.route.params.userId)
    this.props.loadfriendExist(this.props.route.params.userId)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.route.params.userId !== nextProps.route.params.userId){
      this.props.loadFriendNum(nextProps.route.params.userId)
      this.props.loadfriendExist(nextProps.route.params.userId)
    }
  }



  _renderHeader = ()=> {

    if(!this.props.user){
      return null
    }

    const data  = this.props.user.toJS()

    const name = data.nickname || '路人甲'
    const avatar = data.avatar
    const avatarUrl = avatar ? avatar.url : data.headimgurl

    const isSelf = this.props.selfUser.objectId === data.objectId

    const { friendNum } = this.props
    const friendeExist = this.props.friendeExist && this.props.friendeExist.toJS()
    let isFollow = true
    let load = true
    if (friendeExist) {
      isFollow = friendeExist.data && friendeExist.data.count !== 0
      load = friendeExist.load
    }

    let followers_count = 0, followees_count = 0
    const friendNumData = friendNum && friendNum.toJS()

    if (friendNumData && friendNumData.data) {

      followers_count = friendNumData.data.followers_count
      followees_count = friendNumData.data.followees_count
    }




    return (
      <StyleHeader>
        <StyleHeaderInner>
          <StyleHeaderInnerLeft>
            <StyledHeaderName>
              {name}
            </StyledHeaderName>
            {this._renderFollow(
              data,
              followees_count,
              followers_count)}
          </StyleHeaderInnerLeft>
          <StyleHeaderInnerRight>
            <View
              style={{ borderBottomLeftRadius: 25, borderTopRightRadius: 25, overflow: 'hidden' }}>
              {!avatarUrl ? <Avatar radius={45} style={{ borderRadius: 0 }} user={data}/> :
                <StyledZoomImage
                  imageUrls={[{ url: avatarUrl }]}/>
              }
            </View>
          </StyleHeaderInnerRight>
        </StyleHeaderInner>
        <StyledHeaderBottom>
          {!isSelf && (<HeaderBtn
            load={load || this.props.followLoad}
            title={isFollow ? "取消关注" : "关注"}
            style={{
              width: isFollow ? 90 : 90,
              alignSelf: 'flex-end',
              borderRadius: 0,
              height: 30,
              alignItems: 'center'
            }}
            hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
            onPress={() => {
              this.props.follow(isFollow, followers_count)
            }}/>)}
        </StyledHeaderBottom>
        <StyledBottomTitle>
          习惯列表
        </StyledBottomTitle>
      </StyleHeader>
    );
  }

  _renderFollow = (data: Object,
                   followees_count: number,
                   followers_count: number) => {
    const { navigation } = this.props


    return (
      <StyleFolllow>
        <Button innerView onPress={() => {
          navigation.navigate('followee', { userId: data.objectId });
        }}>
          <StyleFollowText>
            {followees_count}
          </StyleFollowText>
          <StyleFollowTipText>
            关注
          </StyleFollowTipText>
        </Button>
        <Button style={{ marginLeft: 50 }} innerView onPress={() => {
          navigation.navigate('follower', { userId: data.objectId });
        }}>
          <StyleFollowText>
            {followers_count}
          </StyleFollowText>
          <StyleFollowTipText>
            被关注
          </StyleFollowTipText>
        </Button>
      </StyleFolllow>
    )
  }


  renderRow({ item, index }: Object) {
    const iCardId = item[ICARD]
    const card = this.props.iCard.get(iCardId)
    const iCard = card && card.toJS()

    if (!iCard) {
      console.log('iCardId:', iCardId, iCard);
      return <View/>
    }
    return (
      <Cell
        iCard={iCard}
        data={item}
        // img={img}
        onPress={() => {
          this.props.navigation.navigate('recordDetail', {
            iUseId: item.objectId,
            iCardId: iCard.objectId,
          })
        }}/>
    )

  }

  render(): ReactElement<any> {
    const { navigation,route } = this.props;

    const { params } = route;
    const { userId } = params


    const param = {
      where: {
        ...userModel(userId),
        statu: { "$ne": 'del' },
        privacy: Privacy.open
      },
      include: ICARD,
    }

    return (
      <StyledContent forceInset={{ top: 'never' }}>
        <LCList
          numColumns={isTablet()?2:1}
          ListHeaderComponent={this._renderHeader}
          style={{ flex: 1 }}
          reqKey={IUSE}
          sKey={FOLLOWRECORD + userId}
          // numColumns={2}
          // columnWrapperStyle={{ padding: 10 }}
          renderItem={this.renderRow.bind(this)}
          dataMap={(data)=>{
            const results = data.results.filter(item => item.iCard.state >= CircleState.open)
            return {results}
          }}
          reqParam={param}
        />
      </StyledContent>
    );
  }
}

