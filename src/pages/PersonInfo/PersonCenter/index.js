/* @flow */
'use strict';

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  Platform,
  Alert
} from 'react-native'
import Button from '../../../components/Button'

import { connect } from 'react-redux'
import {
  StyledContent,
  StyleFolllow,
  StyleFollowText,
  StyleFollowDevide,
  StyleHeader,
  StyledHeaderTop,
  StyledHeaderName,
  StyledHeaderSubText,
  StyledAvatar,
  StyledAvatarView,
  StyledIcon,
  StyledFollowTextView,
  StyleFollowTextNum,
  StyledFuncView,
  StyledIncome,
  StyledEntypoIcon
} from './style'
import { req, } from '../../../redux/actions/req'
import {
  FRIENDNUM,
} from '../../../redux/reqKeys'
import {
  friendNum,
} from '../../../request/leanCloud'
import Rate, { AndroidMarket } from 'react-native-rate'
import DeviceInfo from 'react-native-device-info'
import { logout } from '../../../redux/actions/user'

@connect(
  state => ({
    avatar: state.util.get('loadAvatar').toObject(),
    user: state.user,
    friendNum: state.req.get(FRIENDNUM + state.user.data.objectId),
  }),
  dispatch => ({
    loadFriendNum: () => {
      dispatch((dispatch, getState) => {
        const userId = getState().user.data.objectId
        const param = friendNum(userId)
        req(param, FRIENDNUM + userId)
      })
    },
    logout: () => {

      Alert.alert(
        '确定退出吗?',
        null,
        [{
          text: '取消', onPress: () => {
          },
        }, {
          text: '确定', onPress: () => {
            dispatch(logout());
          },
        }]
      )

    },

    rate: () => {
      let url = ''
      const IOS_APP_ID = '1332546993'
      if (Platform.OS === 'ios') {

        url = `itms-apps://itunes.apple.com/app/${IOS_APP_ID}?action=write-review`
      } else {
        url = 'market://details?id=' + DeviceInfo.getBundleId()
      }
      // Linking.openURL(url)


      let options = {
        AppleAppID: IOS_APP_ID,
        preferredAndroidMarket: AndroidMarket.Other,
        OtherAndroidURL: url,
        openAppStoreIfInAppFails: true,
        fallbackPlatformURL: "https://icard.leanapp.cn/",
      }
      Rate.rate(options, (success) => {
        if (success) {
          console.log('Rate success');
          // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
          // this.setState({rated:true})
        }
      })
    }
  })
)

export default class PersonCenter extends Component {


  constructor(props: Object) {
    super(props);

  }

  static navigationOptions = props => {
    const { navigation } = props;
    const { state } = navigation;
    const { params } = state;
    const isLogin = params ? params.isLogin : false
    // console.log('test:', params,localLoad);
    return {
      // header: isLogin ? undefined : ()=>(<View style={{height:64,backgroundColor:'#F5FCFF'}}/>),
      gesturesEnabled: false,
      header: null

    }
  };

  componentDidMount() {
    this.props.loadFriendNum()
  }

  _renderHeadRow() {
    // let {grade_str,connect_phone} = data;
    // console.log('test111:',data.avatar.url)

    const { data } = this.props.user

    const name = data.nickname || '陌生人'
    const { avatar, headimgurl, } = data
    const avatarUrl = avatar ? avatar.url : headimgurl
    const avatarSource = avatarUrl ? { uri: avatarUrl } :
      require('../../../../source/img/my/icon-60.png')


    return (
      <StyleHeader>
        <StyledHeaderTop onPress={() => {
          this.props.navigation.navigate('personInfo')
        }}>
          <View>
            <StyledHeaderName>
              {name}
            </StyledHeaderName>
            {this._renderFollow()}
          </View>
          <StyledAvatarView>
            <StyledAvatar source={avatarSource}/>
            <View style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <StyledIcon
                color={"#c1c1c1"}
                size={13}
                name={'edit'}/>
              <StyledHeaderSubText>编辑</StyledHeaderSubText>
            </View>
          </StyledAvatarView>
        </StyledHeaderTop>

        {/*{this._renderFunction()}*/}

      </StyleHeader>
    );
  }


  _renderFunction = () => {
    return (
      <Button onPress={() => {
        this.props.navigation.navigate('earnings')
      }}>
        <StyledFuncView>

          <StyledIncome>
            我的收益
          </StyledIncome>

          <StyledEntypoIcon
            color={"#c1c1c1"}
            size={20}
            name={'triangle-right'}
          />
        </StyledFuncView>
      </Button>
    )
  }

  _renderFollow = () => {

    const { friendNum, navigation } = this.props
    let followers_count = 0, followees_count = 0
    const friendNumData = friendNum && friendNum.toJS()

    if (friendNumData && friendNumData.data) {

      followers_count = friendNumData.data.followers_count
      followees_count = friendNumData.data.followees_count
    }

    // if (followers_count + followees_count === 0) {
    //     return null;
    // }

    return (
      <StyleFolllow>
        {followees_count > 0 && <Button
          style={{ alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('followee', { userId: this.props.user.data.objectId });
          }}>

          <StyleFollowText>
            关注：{followees_count}
          </StyleFollowText>
        </Button>}
        {followers_count > 0 && <StyleFollowDevide/>}
        {followers_count > 0 && <Button
          style={{ alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('follower', { userId: this.props.user.data.objectId });
          }}>
          <StyleFollowText>
            被关注： {followers_count}
          </StyleFollowText>
        </Button>}
      </StyleFolllow>
    )
  }


  __renderLoginRow() {
    const navigation = this.props.navigation
    return (
      <View style={{ marginTop: 0 }}>


        {this._renderRow('我的收益', true, () => {
          navigation.navigate('earnings')
        })}

        {this._renderRow('归档卡片', true, () => {
          navigation.navigate('record', { statu: 'stop' });
        })}


        {this._renderRow('圈子管理', true, () => {
          navigation.navigate('publish');
        })}


        {/*{this._renderRow('我的收藏', styles.group, true, () => {*/}
        {/*navigation.navigate('iCollect');*/}
        {/*})}*/}
        <View style={{ height: 25 }}/>
        {/*{this._renderRow('设置', true, () => {*/}
        {/*navigation.navigate('Setting');*/}
        {/*})}*/}

        {this._renderRow('意见反馈', false, () => {
          // NavigationManager.goToPage("Feedback");
          navigation.navigate("feedback");
        })}

        {this._renderRow('给个评价', false, this.props.rate)}


        {this._renderRow('退出登录', false, this.props.logout)}
        <View style={{ height: 25 }}/>
      </View>
    )
  }

  render() {
    return (
      <StyledContent>
        {this._renderHeadRow()}

        {this.__renderLoginRow()}

      </StyledContent>
    );
  }


  _renderRow(title: string, isArraw: bool = false, onPress: Function = () => {
  }, description: any = null) {
    return (
      <Button onPress={onPress} style={[styles.row]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          {/*<Image
                         resizeMode='contain'
                         source={source}
                         style={styles.imageNail}
                         />*/}
          <Text style={styles.rowText}>
            {title}
          </Text>
        </View>
        <View style={styles.row2}>
          {description ? <Text style={styles.description}>{description}</Text> : null}
          {/*{isArraw ? <View style={styles.arrowView}/> : null}*/}
        </View>
      </Button>
    );
  }


}

const styles = StyleSheet.create({


  head: {
    marginBottom: 7,
    flexDirection: 'row',
    height: 170,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  emptyPageText: {
    margin: 10,
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e4e4e4',
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageNail: {
    // marginTop: 13,
    // marginBottom: 13,
    marginLeft: 10,
    width: 20,
    height: 20,
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowNote: {
    fontSize: 17,
  },
  rowText: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '600',
    // color: '#333333',
  },
  arrowView: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderRightWidth: StyleSheet.hairlineWidth * 2,
    borderColor: '#8c8c85',
    transform: [{ rotate: '315deg' }],
    marginRight: 5,
    width: 10,
    height: 10,
  },

  headerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  description: {
    marginRight: 12,
    fontSize: 13,
    color: '#333333'
  },


  headViewText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headViewSubText: {
    marginTop: 10,
    fontSize: 13,
  },
});



