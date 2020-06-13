/**
 * Created by lintong on 2018/1/16.
 * @flow
 */

import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Clipboard,
  TouchableOpacity,
  Alert,
  TouchableNativeFeedback,
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import {
  KeyboardAccessoryView,
  // KeyboardUtils
} from 'react-native-keyboard-input';
import moment from 'moment';
import {formValueSelector} from 'redux-form/immutable';
import {reset} from 'redux-form';
import Toast from 'react-native-simple-toast';
import * as Animatable from 'react-native-animatable';
import RecordRow from '../RecordRow';
// import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import LCList from '../../../components/Base/LCList';

import {ICOMMENT, IDO, IDOCALENDAR, IUSE} from '../../../redux/reqKeys';
import {
  add,
  remove,
  update,
  updateByID,
  findByID,
} from '../../../redux/module/leancloud';
import {selfUser, iDo} from '../../../request/LCModle';
import {add as listAdd, claerByID} from '../../../redux/actions/list';
import {addNormalizrEntity} from '../../../redux/module/normalizr';
import {reqChangeData} from '../../../redux/actions/req';
import ChatSendForm, {FormID} from '../../../components/Form/ChatSendForm';
import {
  StyledHeader,
  StyledContent,
  StyledRow,
  StyledRowLeft,
  StyledRowRight,
  StyledNickText,
  StyledContentText,
  StyledDate,
  StyledIcon,
  StyledRightView,
} from './style';
import Dialog from '../../../components/Dialog';
import Button from '../../../components/Button';
// static displayName = RComment
import Avatar from '../../../components/Avatar/Avatar2';
// import NavBar from '../../../components/Nav/bar/NavBar';

import Pop from '../../../components/Pop';
import DoWithLoad from '../../../components/DoCard/Do/DoWithLoad';
import {dataStorage, uploadImages} from '../../../redux/actions/util';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;
const Name = 'text';

@connect(
  (state, props) => ({
    // data:state.req.get()
    user: state.user.data,
    iDoData: state.normalizr.get(IDO).get(props.route.params.iDoID),
    iDoLoad: state.req.get(IDO).get('load'),
  }),
  (dispatch, props) => ({
    find: () => {
      const id = props.route.params.iDoID;
      // console.log('id:', id);
      dispatch(findByID(IDO, id));
    },
    send: () =>
      dispatch(async (dispatch, getState) => {
        const state = getState();
        const {iDoID} = props.route.params;
        let iDoData = state.normalizr.get(IDO).get(props.route.params.iDoID);
        iDoData = iDoData && iDoData.toJS();

        const selector = formValueSelector(FormID); // <-- same as form name
        // KeyboardUtils.dismiss()
        Keyboard.dismiss();

        const text = selector(state, Name);
        const param = {
          text,
          ...dispatch(selfUser()),
          ...iDo(iDoID),
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
          user: state.user.data,
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
      Alert.alert('删除日记?', '删除后不可恢复', [
        {text: '取消'},
        {
          text: '确定',
          onPress: async () => {
            const {iDoID, iUseId, iCardId} = props.route.params;
            // console.log('iCardId:', iCardId);
            const param = {state: -1};
            const res = await dispatch(updateByID(IDO, iDoID, param));
            const entity = {
              ...param,
              ...res,
            };
            dispatch(addNormalizrEntity(IDO, entity));
            iUseId && (await dispatch(claerByID(IDO + iUseId, iDoID)));
            iCardId && (await dispatch(claerByID(IDO + iCardId, iDoID)));

            dispatch((dispatch, getState) => {
              const state = getState();
              const iDoMap = state.normalizr.get(IDO).get(iDoID);
              // console.log('iDoMap:', iDoMap);
              const createdAt = iDoMap.get('createdAt');
              const doneDate = iDoMap.get('doneDate');
              const time = doneDate ? doneDate.get('iso') : createdAt;
              const date = moment(time).format('YYYY-MM-DD');
              dispatch(
                reqChangeData(IDOCALENDAR, {
                  [date]: null,
                }),
              );

              if (iDoMap.get('type') === 1) {
                return;
              }

              // TODO 如果卡片是今天，那么就将今天的iUSE.doneDate 改到昨天
              if (!iUseId) {
                return;
              }

              const iUse = state.normalizr.get(IUSE).get(iUseId);
              const paramiUSE = {time: iUse.get('time') - 1};
              const before = moment(0, 'HH');
              const after = moment(24, 'HH');

              const momentIn = moment(time).isBetween(before, after);
              if (momentIn) {
                paramiUSE.doneDate = {
                  __type: 'Date',
                  iso: moment(time)
                    .subtract(1, 'day')
                    .toISOString(),
                };
              }
              const entityiUse = {
                ...paramiUSE,
                objectId: iUse.get('objectId'),
              };
              dispatch(addNormalizrEntity(IUSE, entityiUse));
            });

            props.navigation.goBack();
          },
        },
      ]);
    },
    delete: async item => {
      const {iDoID} = props.route.params;
      await dispatch(remove(item.objectId, ICOMMENT));
      dispatch(claerByID(ICOMMENT + iDoID, item.objectId));
    },
    copy: item => {
      Clipboard.setString(item.text);
      Toast.show('已复制评论!');
    },
    refresh: () => {
      dispatch(async (dispatch, getState) => {
        const state = getState();
        const user = state.user.data;
        let iDoData = state.normalizr.get(IDO).get(props.route.params.iDoID);
        iDoData = iDoData && iDoData.toJS();
        const {iDoID} = props.route.params;
        if (iDoData && iDoData.commentNew && iDoData.user === user.objectId) {
          const params = {
            commentNew: false,
          };
          const res = await dispatch(update(iDoID, params, IDO));

          iDoData = {
            ...iDoData,
            ...res,
            ...params,
          };

          dispatch(addNormalizrEntity(IDO, iDoData));
        }
      });
    },
    reEdit: ({objectId, imgs, recordText}) => {
      // record, load, done, type, iUse
      dispatch(async (_, getState) => {
        const imgObjects = imgs.map(item => ({uri: item}));
        dispatch(
          dataStorage(`DoCardForm${objectId}`, {recordText, imgs: imgObjects}),
        );
        // const { iDoID } = props.rout.parames;
        Pop.show(
          <DoWithLoad
            record={['文字', '图片']}
            localSaveID={objectId}
            type={1}
            done={async () => {
              const state = getState();
              const selector = formValueSelector('DoCardForm');
              const recordTextN = selector(state, 'recordText') || '';
              let imgs1 = selector(state, 'imgs');
              if (imgs1) {
                imgs1 = imgs1.toJS();
                const imagUploads = [];
                const imagIndexs = [];
                // eslint-disable-next-line no-plusplus
                for (let index = 0; index < imgs1.length; index++) {
                  const element = imgs1[index];
                  const {uri} = element;
                  // eslint-disable-next-line no-empty
                  if (uri.startsWith('file://')) {
                    imagUploads.push(uri);
                    imagIndexs.push(index);
                  }
                }
                // 上传图片
                if (imagUploads.length > 0) {
                  const imgLoadData = await dispatch(
                    uploadImages(imagUploads, 'iDoULImage'),
                  );
                  console.log('imgLoadData', imgLoadData);

                  imgLoadData.payload.forEach((item, index) => {
                    const imagIndex = imagIndexs[index];
                    imgs1[imagIndex] = {uri: item.attributes.url};
                  });
                }
              }
              dispatch(
                updateByID(IDO, objectId, {
                  recordText: recordTextN,
                  imgs: imgs1 && imgs1.map(img => img.uri),
                }),
              );
              Pop.hide();
            }}
          />,
          {
            wrapStyle: {justifyContent: 'flex-start'},
            maskStyle: {
              backgroundColor: 'transparent',
            },
          },
        );
      });
    },
  }),
)
export default class RComment extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  // static navigationOptions = props =>
  //   // const { params } = props.navigation.state;
  //   // const { iDoLoad, iDoDelete, isSelf } = params;
  //   ({
  //     // title: '',
  //     headerShown: false,
  //     // headerRight: (
  //     //   isSelf && (
  //     //   <Button
  //     //     disabled={iDoLoad}
  //     //     background={TouchableNativeFeedback.SelectableBackgroundBorderless
  //     //     && TouchableNativeFeedback.SelectableBackgroundBorderless()}
  //     //     onPress={iDoDelete}
  //     //     style={{ paddingHorizontal: 15 }}
  //     //   >
  //     //     {iDoLoad ? <ActivityIndicator /> : (
  //     //       <StyledIcon
  //     //         size={25}
  //     //         color="black"
  //     //         name="close"
  //     //       />
  //     //     )}
  //     //   </Button>
  //     //   )
  //     // ),
  //   });

  constructor(props: Object) {
    super(props);
    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(
      this,
    );
    this.onKeyboardResigned = this.onKeyboardResigned.bind(this);
    this.state = {
      text: '',
      showIn: true,
    };
  }

  componentDidMount() {
    const {iDoData, find, refresh} = this.props;
    // const isSelf = user.objectId === iDoData.get('user');
    // navigation.setParams({ iDoDelete, iDoLoad, isSelf });

    if (!iDoData) {
      find();
    } else {
      refresh();
    }
    // InteractionManager.runAfterInteractions(async () => {
    //     this.setState({showIn:true})
    // })
    this.props.navigation.setOptions({headerRight: this.renderRightView});
  }

  componentWillReceiveProps() {
    this.props.navigation.setOptions({headerRight: this.renderRightView});
  }

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  renderRightView = () => {
    const {iDoLoad, iDoDelete, iDoData, user, reEdit} = this.props;
    const isSelf = user.objectId === iDoData.get('user');

    if (!isSelf) {
      return null;
    }

    return (
      <StyledRightView>
        <Button
          disabled={iDoLoad}
          background={
            TouchableNativeFeedback.SelectableBackgroundBorderless &&
            TouchableNativeFeedback.SelectableBackgroundBorderless()
          }
          onPress={() => {
            reEdit(iDoData.toJS());
          }}
          style={{paddingHorizontal: 10}}>
          <StyledIcon size={20} color="black" name="edit" />
        </Button>
        <Button
          disabled={iDoLoad}
          background={
            TouchableNativeFeedback.SelectableBackgroundBorderless &&
            TouchableNativeFeedback.SelectableBackgroundBorderless()
          }
          onPress={iDoDelete}
          style={{paddingHorizontal: 10}}>
          {iDoLoad ? (
            <ActivityIndicator />
          ) : (
            <StyledIcon size={20} color="black" name="close" />
          )}
        </Button>
      </StyledRightView>
    );
  };

  _renderHeader = () => {
    let {iDoData} = this.props;
    iDoData = iDoData && iDoData.toJS();
    return (
      <StyledHeader>{iDoData && <RecordRow item={iDoData} />}</StyledHeader>
    );
  };

  onKeyboardResigned() {}

  keyboardAccessoryViewContent() {
    const {iDoID} = this.props.route.params;
    const InnerContainerComponent = IsIOS && BlurView ? BlurView : View;

    return (
      <Animatable.View useNativeDriver animation="fadeInUp">
        <InnerContainerComponent blurType="xlight" style={styles.blurContainer}>
          {/* <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/> */}
          <ChatSendForm
            maxHeight={200}
            ref={r => {
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

  renderRow({item}: Object): ReactElement<any> {
    const date = moment(item.createdAt).format('MM/DD HH:mm');
    return (
      <StyledRow
        onPress={async () => {
          const {user} = this.props;

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

          const items = [{label: '复制', id: 'copy'}];
          if (item.user.objectId === user.objectId) {
            items.push({label: '删除', id: 'delete'});
          }
          const {selectedItem} = await Dialog.showPicker('请选择', null, {
            items,
          });
          if (selectedItem) {
            const {id} = selectedItem;
            // console.log('You selected item:', selectedItem);
            this.props[id] && this.props[id](item);
          }
        }}>
        <StyledRowLeft>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('following', {
                userId: item.user.objectId,
              });
            }}>
            <Avatar radius={15} user={item.user} />
          </TouchableOpacity>
        </StyledRowLeft>
        <StyledRowRight>
          <StyledNickText>{item.user.nickname || '路人甲'}</StyledNickText>
          <StyledContentText>{item.text}</StyledContentText>
          <StyledDate>{date}</StyledDate>
        </StyledRowRight>
      </StyledRow>
    );
  }

  render(): ReactElement<any> {
    const {navigation, route} = this.props;
    const {goBack} = navigation;
    const {iDoID} = route.params;

    const params = {
      where: {
        ...iDo(iDoID),
      },
      include: 'user',
    };
    // {Platform.OS === 'ios' && this._renderHeader()}
    return (
      <>
        {/* <NavBar onBackPress={goBack} rightView={this.renderRightView} /> */}
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
        {/* {this.keyboardAccessoryViewContent()} */}
      </>
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
    flex: 1,
  },
});
