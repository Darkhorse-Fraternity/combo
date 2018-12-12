/**
 * Created by lintong on 2018/1/16.
 * @flow
 */


'use strict';

import * as immutable from 'immutable';
import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  PixelRatio,
  Clipboard,
  Keyboard,
  TouchableOpacity,
  InteractionManager,
  Alert,
  TouchableNativeFeedback,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import RecordRow from '../RecordRow'
import { BlurView } from 'react-native-blur';
// import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import LCList from '../../../components/Base/LCList'

import { KeyboardAccessoryView, KeyboardUtils } from 'react-native-keyboard-input';

import {
  ICOMMENT,
  IDO,
  IDOCALENDAR
} from '../../../redux/reqKeys'
import { add, remove, update, updateByID } from '../../../redux/module/leancloud'
import { selfUser, iDo } from '../../../request/LCModle'
import { add as listAdd, claerByID } from '../../../redux/actions/list'
import { addNormalizrEntity, } from '../../../redux/module/normalizr'
import {reqChangeData} from '../../../redux/actions/req'
import ChatSendForm, { FormID } from '../../../components/Form/ChatSendForm'
import {
  StyledHeader,
  StyledContent,
  StyledRow,
  StyledRowLeft,
  StyledAvatar,
  StyledRowRight,
  StyledNickText,
  StyledContentText,
  StyledDate,
  StyledIcon
} from './style'
import moment from 'moment'
import { formValueSelector } from 'redux-form/immutable'
import { reset } from 'redux-form'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import Dialog from '../../../components/Dialog'
import { RectButton } from 'react-native-gesture-handler';
import Button from '../../../components/Button'

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;
//static displayName = RComment
import Toast from 'react-native-simple-toast'
import Avatar from '../../../components/Avatar/Avatar2'
import * as Animatable from 'react-native-animatable';

const Name = 'text'

import { findByID } from "../../../redux/module/leancloud";

@connect(
  (state, props) => ({
    //data:state.req.get()
    user: state.user.data,
    iDoData: state.normalizr.get(IDO).get(props.navigation.state.params.iDoID),
    iDoLoad: state.req.get(IDO).get('load')
  }),
  (dispatch, props) => ({
    find: () => {
      const id = props.navigation.state.params.iDoID
      // console.log('id:', id);
      dispatch(findByID(IDO, id))

    },
    send: () => dispatch(async (dispatch, getState) => {
      const state = getState()
      const iDoID = props.navigation.state.params.iDoID
      let iDoData = state.normalizr.get(IDO).get(props.navigation.state.params.iDoID)
      iDoData = iDoData && iDoData.toJS()

      const selector = formValueSelector(FormID) // <-- same as form name
      // KeyboardUtils.dismiss()
      KeyboardUtils.dismiss()


      const text = selector(state, Name)
      const param = {
        text,
        ...dispatch(selfUser()),
        ...iDo(iDoID)
      }
      // const res = await add(param, ICOMMENT)


      const res = await dispatch(add(param, ICOMMENT)) //

      // console.log('res:', res);

      if (!res) {
        return
      }

      const entity = {
        ...param,
        ...res,
        user: state.user.data
      }
      // dispatch(addListNormalizrEntity(ICOMMENT, entity))


      dispatch(addNormalizrEntity(ICOMMENT, entity))
      if (iDoData) {
        iDoData.commentNum++
        dispatch(addNormalizrEntity(IDO, iDoData))
      }

      // // dispatch(addNormalizrEntities(key,data))
      dispatch(listAdd(ICOMMENT + iDoID, entity.objectId))

      dispatch(reset(FormID))
    }),
    iDoDelete: () => {
      Alert.alert(
        '删除日记?',
        '删除后不可恢复',
        [{ text: '取消' }, {
          text: '确定', onPress: async () => {
            const iDoID = props.navigation.state.params.iDoID
            const iUseId = props.navigation.state.params.iUseId
            const iCardId = props.navigation.state.params.iCardId
            // console.log('iCardId:', iCardId);
            const param = { state: -1 }
            const res = await dispatch(updateByID(IDO, iDoID, param))
            const entity = {
              ...param,
              ...res,
            }
            dispatch(addNormalizrEntity(IDO, entity))
            await dispatch(claerByID( IDO+iUseId, iDoID))
            await dispatch(claerByID( IDO+iCardId, iDoID))


            dispatch((dispatch,getState)=>{
              const state = getState()
              const iDoMap = state.normalizr.get(IDO).get(iDoID)
              // console.log('iDoMap:', iDoMap);
              const date = moment(iDoMap.get('createdAt')).format("YYYY-MM-DD")
              dispatch(reqChangeData(IDOCALENDAR, {
                [date]: null
              }))
            })

            props.navigation.goBack()
          }
        }]
      )

    },
    delete: async (item) => {
      const iDoID = props.navigation.state.params.iDoID
      await dispatch(remove(item.objectId, ICOMMENT))
      dispatch(claerByID(ICOMMENT + iDoID, item.objectId))
    },
    copy: (item) => {
      Clipboard.setString(item.text)
      Toast.show('已复制评论!')
    },
    refresh: () => {
      dispatch(async (dispatch, getState) => {
        const state = getState()
        const user = state.user.data
        let iDoData = state.normalizr.get(IDO).get(props.navigation.state.params.iDoID)
        iDoData = iDoData && iDoData.toJS()
        let iDoID = props.navigation.state.params.iDoID
        if (iDoData && iDoData.commentNew &&
          iDoData.user === user.objectId) {

          const params = {
            commentNew: false
          }
          const res = await dispatch(update(iDoID, params, IDO))

          iDoData = {
            ...iDoData,
            ...res,
            ...params
          }

          dispatch(addNormalizrEntity(IDO, iDoData))

        }

      })

    }
  })
)


export default class RComment extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
    this.onKeyboardResigned = this.onKeyboardResigned.bind(this);

    this.state = {
      text: '',
      showIn: true,
    };

  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {
    const params = props.navigation.state.params
    const { iDoLoad ,iDoDelete,isSelf } = params
    return {
      title: '',
      headerRight: (
        isSelf && <Button
          disabled={iDoLoad}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless &&
          TouchableNativeFeedback.SelectableBackgroundBorderless()}
          onPress={iDoDelete}
          style={{ paddingHorizontal: 15 }}>
          {iDoLoad?<ActivityIndicator/>:<StyledIcon
            size={25}
            color={'black'}
            name={'delete'}/>}
        </Button>
      ),
    }
  };

  componentDidMount() {
    const { iDoLoad, iDoDelete, iDoData, user } = this.props
    const isSelf = user.objectId === iDoData.get('user')
    this.props.navigation.setParams({ iDoDelete, iDoLoad,isSelf })
    if (!iDoData) {
      this.props.find()
    } else {
      this.props.refresh()
    }
    // InteractionManager.runAfterInteractions(async () => {
    //     this.setState({showIn:true})
    // })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.iDoLoad !== this.props.iDoLoad) {
      this.props.navigation.setParams({ iDoLoad: nextProps.iDoLoad })
    }
  }

  componentWillUnmount() {
    KeyboardUtils.dismiss()
  }

  _renderHeader = () => {
    let iDoData = this.props.iDoData
    iDoData = iDoData && iDoData.toJS()
    return (
      <StyledHeader>
        {iDoData && <RecordRow item={iDoData}/>}
      </StyledHeader>
    )
  }


  onKeyboardResigned() {
  }

  keyboardAccessoryViewContent() {
    const iDoID = this.props.navigation.state.params.iDoID
    const InnerContainerComponent = (IsIOS && BlurView) ? BlurView : View;

    return (
      <Animatable.View
        useNativeDriver
        animation="fadeInUp"
      >
        <InnerContainerComponent blurType="xlight" style={styles.blurContainer}>
          {/*<View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>*/}
          <ChatSendForm
            maxHeight={200}
            ref={(r) => {
              this.textInputRef = r;
            }}
            name={Name}
            maxLength={5000}
            placeholder='请输入评论'
            //onFocus={() => this.resetKeyboardView()}
            // onChangeText={text => this.setState({text})}
            testID='input'
            localSaveID={iDoID}
            key=''
            localSaveEnable
            onSubmit={this.props.send}
          />
        </InnerContainerComponent>
      </Animatable.View>
    );
  }


  renderRow({ item }: Object): ReactElement<any> {
    const date = moment(item.createdAt).format("MM/DD HH:mm")
    return (<StyledRow onPress={async () => {
      const { user } = this.props

      // if (item.user.objectId === user.objectId) {
      //     showSelector(['删除', '复制'], (index) => {
      //         if (index === 0) {
      //             this.props.delete(item)
      //         } else if (index === 1) {
      //             this.props.copy(item)
      //         }
      //     })
      // } else {
      //     showSelector(['复制'], (index) => {
      //         if (index === 0) {
      //             this.props.copy(item)
      //         }
      //     })
      // }

      const items = [{ label: '复制', id: 'copy' }]
      if (item.user.objectId === user.objectId) {
        items.push({ label: '删除', id: 'delete' })
      }
      const { selectedItem } = await Dialog.showPicker('请选择', null, { items });
      if (selectedItem) {
        const { id } = selectedItem
        // console.log('You selected item:', selectedItem);
        this.props[id] && this.props[id](item)
      }


    }}>
      <StyledRowLeft>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('following', { user: item.user })
        }}>
          <Avatar radius={15} user={item.user}/>
        </TouchableOpacity>
      </StyledRowLeft>
      <StyledRowRight>
        <StyledNickText>
          {item.user.nickname || '路人甲'}
        </StyledNickText>
        <StyledContentText>
          {item.text}
        </StyledContentText>
        <StyledDate>
          {date}
        </StyledDate>
      </StyledRowRight>
    </StyledRow>)
  }


  render(): ReactElement<any> {

    const iDoID = this.props.navigation.state.params.iDoID

    const params = {
      where: {
        ...iDo(iDoID),

      },
      include: 'user'
    }

    return (
      <StyledContent forceInset={{ top: 'never' }}>
        {this._renderHeader()}
        <LCList
          keyboardDismissMode='interactive'
          // ListHeaderComponent={this._renderHeader}
          style={[styles.list]}
          reqKey={ICOMMENT}
          sKey={ICOMMENT + iDoID}
          renderItem={this.renderRow.bind(this)}
          reqParam={params}
          noDataPrompt='还没有评论~'
        />

        {this.state.showIn && <KeyboardAccessoryView
          renderContent={this.keyboardAccessoryViewContent}
          trackInteractive={TrackInteractive}
          kbInputRef={this.textInputRef}
          onKeyboardResigned={this.onKeyboardResigned}
          revealKeyboardInteractive
        />}
      </StyledContent>
    );
  }
}

const styles = StyleSheet.create({
  blurContainer: {
    // ...Platform.select({
    //   ios: {
    //     flex: 1,
    //   },
    // }),
    // backgroundColor: 'white',
    // borderTopColor: 'rgb(200,200,200)',
    // borderTopWidth: StyleSheet.hairlineWidth,
  },
  list: {
    // marginBottom: 50
    // flex: 1
  }
})
