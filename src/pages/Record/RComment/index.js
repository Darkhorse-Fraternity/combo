/**
 * Created by lintong on 2018/1/16.
 * @flow
 */


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
} from 'react-native';
import { connect } from 'react-redux';
import { BlurView } from 'react-native-blur';
import { KeyboardAccessoryView, KeyboardUtils } from 'react-native-keyboard-input';
import moment from 'moment';
import { formValueSelector } from 'redux-form/immutable';
import { reset } from 'redux-form';
import Toast from 'react-native-simple-toast';
import * as Animatable from 'react-native-animatable';
import RecordRow from '../RecordRow';
// import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import LCList from '../../../components/Base/LCList';


import {
  ICOMMENT,
  IDO,
  IDOCALENDAR,
  IUSE
} from '../../../redux/reqKeys';
import {
  add, remove, update, updateByID
} from '../../../redux/module/leancloud';
import { selfUser, iDo } from '../../../request/LCModle';
import { add as listAdd, claerByID } from '../../../redux/actions/list';
import { addNormalizrEntity, } from '../../../redux/module/normalizr';
import { reqChangeData } from '../../../redux/actions/req';
import ChatSendForm, { FormID } from '../../../components/Form/ChatSendForm';
import {
  StyledHeader,
  StyledContent,
  StyledRow,
  StyledRowLeft,
  StyledRowRight,
  StyledNickText,
  StyledContentText,
  StyledDate,
  StyledIcon
} from './style';
import Dialog from '../../../components/Dialog';
import Button from '../../../components/Button';
// static displayName = RComment
import Avatar from '../../../components/Avatar/Avatar2';

import { findByID } from '../../../redux/module/leancloud';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;
const Name = 'text';

@connect(
  (state, props) => ({
    // data:state.req.get()
    user: state.user.data,
    iDoData: state.normalizr.get(IDO).get(props.navigation.state.params.iDoID),
    iDoLoad: state.req.get(IDO).get('load')
  }),
  (dispatch, props) => ({
    find: () => {
      const id = props.navigation.state.params.iDoID;
      // console.log('id:', id);
      dispatch(findByID(IDO, id));
    },
    send: () => dispatch(async (dispatch, getState) => {
      const state = getState();
      const { iDoID } = props.navigation.state.params;
      let iDoData = state.normalizr.get(IDO).get(props.navigation.state.params.iDoID);
      iDoData = iDoData && iDoData.toJS();

      const selector = formValueSelector(FormID); // <-- same as form name
      // KeyboardUtils.dismiss()
      KeyboardUtils.dismiss();


      const text = selector(state, Name);
      const param = {
        text,
        ...dispatch(selfUser()),
        ...iDo(iDoID)
      };
      // const res = await add(param, ICOMMENT)


      const res = await dispatch(add(param, ICOMMENT)); //

      // console.log('res:', res);

      if (!res) {
        return;
      }

      const entity = {
        ...param,
        ...res,
        user: state.user.data
      };
      // dispatch(addListNormalizrEntity(ICOMMENT, entity))


      dispatch(addNormalizrEntity(ICOMMENT, entity));
      if (iDoData) {
        iDoData.commentNum++;
        dispatch(addNormalizrEntity(IDO, iDoData));
      }

      // // dispatch(addNormalizrEntities(key,data))
      dispatch(listAdd(ICOMMENT + iDoID, entity.objectId));

      dispatch(reset(FormID));
    }),
    iDoDelete: () => {
      Alert.alert(
        '删除日记?',
        '删除后不可恢复',
        [{ text: '取消' }, {
          text: '确定',
          onPress: async () => {
            const { iDoID } = props.navigation.state.params;
            const { iUseId } = props.navigation.state.params;
            const { iCardId } = props.navigation.state.params;
            // console.log('iCardId:', iCardId);
            const param = { state: -1 };
            const res = await dispatch(updateByID(IDO, iDoID, param));
            const entity = {
              ...param,
              ...res,
            };
            dispatch(addNormalizrEntity(IDO, entity));
            iUseId && await dispatch(claerByID(IDO + iUseId, iDoID));
            iCardId && await dispatch(claerByID(IDO + iCardId, iDoID));


            dispatch((dispatch, getState) => {
              const state = getState();
              const iDoMap = state.normalizr.get(IDO).get(iDoID);
              // console.log('iDoMap:', iDoMap);
              const createdAt = iDoMap.get('createdAt');
              const doneDate = iDoMap.get('doneDate');
              const time = doneDate ? doneDate.get('iso') : createdAt;
              const date = moment(time).format('YYYY-MM-DD');
              dispatch(reqChangeData(IDOCALENDAR, {
                [date]: null
              }));


              if (iDoMap.get('type') === 1) {
                return;
              }

              // TODO 如果卡片是今天，那么就将今天的iUSE.doneDate 改到昨天
              if (!iUseId) {
                return;
              }

              const iUse = state.normalizr.get(IUSE).get(iUseId);
              const paramiUSE = { time: iUse.get('time') - 1 };
              const before = moment(0, 'HH');
              const after = moment(24, 'HH');

              const momentIn = moment(time).isBetween(before, after);
              if (momentIn) {
                paramiUSE.doneDate = {
                  __type: 'Date',
                  iso:
                  moment(time).subtract(1, 'day').toISOString()
                };
              }
              const entityiUse = {
                ...paramiUSE,
                objectId: iUse.get('objectId')
              };
              dispatch(addNormalizrEntity(IUSE, entityiUse));
            });

            props.navigation.goBack();
          }
        }]
      );
    },
    delete: async (item) => {
      const { iDoID } = props.navigation.state.params;
      await dispatch(remove(item.objectId, ICOMMENT));
      dispatch(claerByID(ICOMMENT + iDoID, item.objectId));
    },
    copy: (item) => {
      Clipboard.setString(item.text);
      Toast.show('已复制评论!');
    },
    refresh: () => {
      dispatch(async (dispatch, getState) => {
        const state = getState();
        const user = state.user.data;
        let iDoData = state.normalizr.get(IDO).get(props.navigation.state.params.iDoID);
        iDoData = iDoData && iDoData.toJS();
        const { iDoID } = props.navigation.state.params;
        if (iDoData && iDoData.commentNew
          && iDoData.user === user.objectId) {
          const params = {
            commentNew: false
          };
          const res = await dispatch(update(iDoID, params, IDO));

          iDoData = {
            ...iDoData,
            ...res,
            ...params
          };

          dispatch(addNormalizrEntity(IDO, iDoData));
        }
      });
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

  static navigationOptions = (props) => {
    const { params } = props.navigation.state;
    const { iDoLoad, iDoDelete, isSelf } = params;
    return {
      title: '',
      headerRight: (
        isSelf && (
        <Button
          disabled={iDoLoad}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless
          && TouchableNativeFeedback.SelectableBackgroundBorderless()}
          onPress={iDoDelete}
          style={{ paddingHorizontal: 15 }}
        >
          {iDoLoad ? <ActivityIndicator /> : (
            <StyledIcon
              size={25}
              color="black"
              name="delete"
            />
          )}
        </Button>
        )
      ),
    };
  };

  componentDidMount() {
    const {
      iDoLoad, iDoDelete, iDoData, user
    } = this.props;
    const isSelf = user.objectId === iDoData.get('user');
    this.props.navigation.setParams({ iDoDelete, iDoLoad, isSelf });
    if (!iDoData) {
      this.props.find();
    } else {
      this.props.refresh();
    }
    // InteractionManager.runAfterInteractions(async () => {
    //     this.setState({showIn:true})
    // })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.iDoLoad !== this.props.iDoLoad) {
      this.props.navigation.setParams({ iDoLoad: nextProps.iDoLoad });
    }
  }

  componentWillUnmount() {
    KeyboardUtils.dismiss();
  }

  _renderHeader = () => {
    let { iDoData } = this.props;
    iDoData = iDoData && iDoData.toJS();
    return (
      <StyledHeader>
        {iDoData && <RecordRow item={iDoData} />}
      </StyledHeader>
    );
  }


  onKeyboardResigned() {
  }

  keyboardAccessoryViewContent() {
    const { iDoID } = this.props.navigation.state.params;
    const InnerContainerComponent = (IsIOS && BlurView) ? BlurView : View;

    return (
      <Animatable.View
        useNativeDriver
        animation="fadeInUp"
      >
        <InnerContainerComponent blurType="xlight" style={styles.blurContainer}>
          {/* <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/> */}
          <ChatSendForm
            maxHeight={200}
            ref={(r) => {
              this.textInputRef = r;
            }}
            name={Name}
            maxLength={5000}
            placeholder="请输入评论"
            // onFocus={() => this.resetKeyboardView()}
            // onChangeText={text => this.setState({text})}
            testID="input"
            localSaveID={iDoID}
            key=""
            localSaveEnable
            onSubmit={this.props.send}
          />
        </InnerContainerComponent>
      </Animatable.View>
    );
  }


  renderRow({ item }: Object): ReactElement<any> {
    const date = moment(item.createdAt).format('MM/DD HH:mm');
    return (
      <StyledRow onPress={async () => {
        const { user } = this.props;

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

        const items = [{ label: '复制', id: 'copy' }];
        if (item.user.objectId === user.objectId) {
          items.push({ label: '删除', id: 'delete' });
        }
        const { selectedItem } = await Dialog.showPicker('请选择', null, { items });
        if (selectedItem) {
          const { id } = selectedItem;
          // console.log('You selected item:', selectedItem);
          this.props[id] && this.props[id](item);
        }
      }}
      >
        <StyledRowLeft>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('following', { userId: item.user.objectId });
          }}
          >
            <Avatar radius={15} user={item.user} />
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
      </StyledRow>
    );
  }


  render(): ReactElement<any> {
    const { iDoID } = this.props.navigation.state.params;

    const params = {
      where: {
        ...iDo(iDoID),

      },
      include: 'user'
    };
    // {Platform.OS === 'ios' && this._renderHeader()}
    return (
      <StyledContent forceInset={{ top: 'never' }}>

        <LCList
          keyboardDismissMode="interactive"
          ListHeaderComponent={this._renderHeader}
          style={[styles.list]}
          reqKey={ICOMMENT}
          sKey={ICOMMENT + iDoID}
          renderItem={this.renderRow.bind(this)}
          reqParam={params}
          noDataPrompt="还没有评论~"
        />

        {this.state.showIn && (
        <KeyboardAccessoryView
          iOSScrollBehavior={1}
          renderContent={this.keyboardAccessoryViewContent}
          trackInteractive={TrackInteractive}
          kbInputRef={this.textInputRef}
          onKeyboardResigned={this.onKeyboardResigned}
          revealKeyboardInteractive
        />
        )}
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
});
