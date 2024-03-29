/**
 * Created by lintong on 2018/1/16.
 * @flow
 */

import PageList from '@components/Base/PageList';
// import NavBar from '../..../components/Nav/bar/NavBar';
import KeyboardSpacer from '@components/KeyboardSpacer';
import { LoadAnimation } from '@components/Load';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { DeviceEventEmitterKey } from '@configure/enum';
import { RouteKey } from '@pages/interface';
import { BlurView } from '@react-native-community/blur';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  // Alert,
  DeviceEventEmitter,
  Keyboard,
  Platform,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Alert from '@components/modal/alert';
import * as Animatable from 'react-native-animatable';
// @ts-ignore: Unreachable code error
import { KeyboardAccessoryView } from 'react-native-keyboard-input';
import Toast from 'react-native-simple-toast';
import { useGetUserInfo } from 'src/data/data-context';
import {
  getClassesIComment,
  GetClassesICommentResponse,
  GetClassesIDoIdResponse,
  useDeleteClassesICommentId,
  useGetClassesIDoId,
  usePostClassesIComment,
  usePutClassesIDoId,
} from 'src/hooks/interface';
// static displayName = RComment
import { AvatarAuto } from '../../../components/Avatar/avatar-fc';
import Button from '../../../components/Button';
import Dialog from '../../../components/Dialog';
import { iDoPoint, userPoint } from '../../../request/LCModle';
import RecordRow from '../RecordRow';
import {
  Form,
  StyleAutoGrowingChatTextInput,
  StyledContent,
  StyledContentText,
  StyledDate,
  StyledHeader,
  StyledIcon,
  StyledNickText,
  StyledRightView,
  StyledRow,
  StyledRowLeft,
  StyledRowRight,
  StyledSumbitBtn,
  StyledSumbitBtnText,
} from './style';

type ItemType = NonNullable<GetClassesICommentResponse['results']>[number];

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;
// const Name = 'text';

const RenderHeader: FC<{ iDoId: string }> = ({ iDoId }) => {
  const { data, run } = useGetClassesIDoId({ id: iDoId });
  const [isVisiable, setisVisiable] = useState(false);

  const {
    run: deleteRun,
    loading: deleteLoading,
    data: deleteData,
  } = usePutClassesIDoId({ id: iDoId, state: -1 }, { manual: true });
  const { setOptions, goBack } = useNavigation();

  useEffect(() => {
    if (deleteData) {
      DeviceEventEmitter.emit(DeviceEventEmitterKey.iDO_reload, {});
      DeviceEventEmitter.emit(DeviceEventEmitterKey.iUse_reload, {}); // 简单做，不在远程更新了。
      goBack();
    }
  }, [deleteData, goBack]);

  const first = useRef(true);
  useEffect(() => {
    if (data && first.current) {
      setOptions({
        headerRight: (p: { tintColor?: string }) => (
          <RenderRightView
            iDo={data}
            color={p.tintColor}
            load={deleteLoading}
            onDelete={() => {
              // Alert.alert('确定删除?', '删除后不可恢复~！', [
              //   { text: '取消' },
              //   {
              //     text: '确定',
              //     onPress: () => deleteRun(),
              //   },
              // ]);
              setisVisiable(true);
            }}
          />
        ),
      });
      first.current = false;
    }
    return () => {
      Keyboard.dismiss();
    };
  }, [data, deleteLoading, deleteRun, setOptions]);

  useEffect(() => {
    const deEmitter = DeviceEventEmitter.addListener(
      DeviceEventEmitterKey.iDO_reload,
      () => {
        run();
      },
    );
    return () => {
      deEmitter.remove();
    };
  }, [run]);

  if (!data) {
    return <LoadAnimation />;
  }
  return (
    <>
      <StyledHeader>{data && <RecordRow item={data as never} />}</StyledHeader>
      <Alert
        isVisiable={isVisiable}
        title={'确定删除?'}
        message={'删除后将无法恢复。'}
        onSuccess={() => {
          deleteRun();
          setisVisiable(false);
        }}
        onClose={() => {
          setisVisiable(false);
        }}
      />
    </>
  );
};

const RenderRightView: FC<{
  iDo: GetClassesIDoIdResponse;
  load: boolean;
  onDelete: () => void;
  color?: string;
}> = ({ iDo, load, onDelete, color }) => {
  const { navigate } = useNavigation();
  const user = useGetUserInfo();

  // console.log('user?.objectId !== iDo.user.objectId', user?.objectId);
  // console.log('user?.objectId !== iDo.user.objectId', iDo);

  if (user?.objectId !== iDo?.user.objectId) {
    return null;
  }

  return (
    <StyledRightView>
      <Button
        disabled={load}
        background={
          TouchableNativeFeedback.SelectableBackgroundBorderless &&
          TouchableNativeFeedback.SelectableBackgroundBorderless()
        }
        onPress={() => {
          // reEdit(iDoData.toJS());
          navigate(RouteKey.clockIn, {
            iUseId: iDo.iUse.objectId,
            iDoId: iDo.objectId,
          });
        }}
        style={{ paddingHorizontal: 10 }}>
        <StyledIcon size={20} color={color} name="edit" />
      </Button>
      <Button
        loading={load}
        background={
          TouchableNativeFeedback.SelectableBackgroundBorderless &&
          TouchableNativeFeedback.SelectableBackgroundBorderless()
        }
        onPress={onDelete}
        style={{ paddingHorizontal: 10 }}>
        {load ? (
          <ActivityIndicator />
        ) : (
          <StyledIcon size={20} color={color} name="close" />
        )}
      </Button>
    </StyledRightView>
  );
};

const RenderRow: FC<{
  item: ItemType;
  listRef?: React.RefObject<PageList<ItemType>>;
}> = ({ item, listRef }) => {
  const { objectId } = item;
  const user = useGetUserInfo();
  const { navigate } = useNavigation();
  // const {user} = this.props;
  const date = moment(item.createdAt).format('MM/DD HH:mm');

  const { run } = useDeleteClassesICommentId(
    { id: objectId },
    { manual: true },
  );

  return (
    <StyledRow
      onPress={async () => {
        const items = [{ label: '复制', id: 'copy' }];
        if (item.user.objectId === user?.objectId) {
          items.push({ label: '删除', id: 'delete' });
        }
        const { selectedItem } = await Dialog.showPicker('请选择', null, {
          items,
        });
        if (selectedItem) {
          const { id } = selectedItem;
          // console.log('You selected item:', selectedItem);
          // this.props[id] && this.props[id](item);

          if (id === 'copy') {
            Clipboard.setString(item.text);
            Toast.show('已复制评论!');
          }
          if (id === 'delete') {
            // Todo 删除评论
            try {
              await run();
              listRef?.current?.reload();
            } catch (error) {}
          }
        }
      }}>
      <StyledRowLeft>
        <TouchableOpacity
          onPress={() => {
            navigate(RouteKey.following, {
              userId: item.user.objectId,
            });
          }}>
          <AvatarAuto
            // radius={40}
            headimgurl={item.user.headimgurl || ''}
            avatarUrl={item.user.avatar?.url || ''}
          />
        </TouchableOpacity>
      </StyledRowLeft>
      <StyledRowRight>
        <StyledNickText>{item.user.nickname || '路人甲'}</StyledNickText>
        <StyledContentText>{item.text}</StyledContentText>
        {/* <StyleBottom> */}
        <StyledDate>{date}</StyledDate>
        {/* </StyleBottom> */}
      </StyledRowRight>
    </StyledRow>
  );
};

const onKeyboardResigned = () => {};

interface KeyboardAccessoryViewContentProps {
  // disabled: boolean,
  // onSubmit: () => void;
  // load: boolean;
  inputRef?: React.MutableRefObject<TextInput | undefined>;
  listRef?: React.RefObject<PageList<ItemType>>;
  iDoId: string;
}

const KeyboardAccessoryViewContent: FC<KeyboardAccessoryViewContentProps> = ({
  // disabled,
  // onSubmit,
  // load,
  inputRef,
  listRef,
  iDoId,
}) => {
  const user = useGetUserInfo();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const colorRest = isDarkMode
    ? { placeholderTextColor: 'rgb(100,100,100)' }
    : {};
  const [state, setState] = useState('');
  const { loading, run } = usePostClassesIComment(
    {
      text: state,
      user: userPoint(user?.objectId!),
      iDo: iDoPoint(iDoId),
    },
    { manual: true },
  );

  const InnerContainerComponent = (IsIOS && BlurView
    ? BlurView
    : View) as typeof BlurView;

  const onSubmit = async () => {
    const res = await run();
    if (res.objectId) {
      setState('');
      listRef?.current?.reload();
      Keyboard.dismiss();
    }
    // refresh();
  };

  return (
    <Animatable.View useNativeDriver animation="fadeInUp">
      <InnerContainerComponent blurType="xlight">
        <Form>
          {/* <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/> */}

          <StyleAutoGrowingChatTextInput
            ref={inputRef}
            maxHeight={200}
            maxLength={5000}
            placeholder="请输入评论"
            // placeholderTextColor={'red'}
            value={state}
            // onFocus={() => this.resetKeyboardView()}
            onChangeText={(text: string) => setState(text)}
            onSubmit={onSubmit}
            underlineColorAndroid="transparent"
            {...colorRest}
          />
          <StyledSumbitBtn
            disabled={state.length === 0}
            loading={loading}
            style={{ width: 41, paddingHorizontal: 5 }}
            hitSlop={{
              top: 10,
              left: 0,
              bottom: 10,
              right: 0,
            }}
            onPress={onSubmit}>
            <StyledSumbitBtnText disabled={state.length === 0}>
              发送
            </StyledSumbitBtnText>
          </StyledSumbitBtn>
        </Form>
      </InnerContainerComponent>
    </Animatable.View>
  );
};

interface RCommentProps {}

const RComment: FC<RCommentProps> = () => {
  const { iDoID } = useNavigationAllParamsWithType<RouteKey.rcomment>();

  const ref = useRef<PageList<ItemType>>(null);

  const kbInputRef = useRef<TextInput>();

  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      iDo: iDoPoint(iDoID),
    };
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      include: 'user',
      order: '-createdAt',
      where: JSON.stringify(where),
    };
    return getClassesIComment(param).then((res) => {
      const { results } = res;
      return results;
    });
  };

  return (
    <>
      <StyledContent>
        <PageList<ItemType>
          ref={ref}
          ListHeaderComponent={<RenderHeader iDoId={iDoID} />}
          loadPage={loadPage}
          keyId={'objectId'}
          // promptImage={require('@img/LiveManagement/live_video_nodata.webp')}
          // prompIamgeStyle={{ height: 79, width: 113, marginTop: -120 }}
          noDataPrompt="还没有评论~"
          footerStyle={{ paddingBottom: 60 }}
          renderItem={(props) => <RenderRow {...props} listRef={ref} />}
          numColumns={1}
        />
      </StyledContent>
      {Platform.OS === 'ios' && (
        <KeyboardAccessoryView
          iOSScrollBehavior={1}
          renderContent={() => (
            <KeyboardAccessoryViewContent
              iDoId={iDoID}
              listRef={ref}
              inputRef={kbInputRef}
            />
          )}
          trackInteractive={TrackInteractive}
          kbInputRef={kbInputRef.current}
          onKeyboardResigned={onKeyboardResigned}
          revealKeyboardInteractive
        />
      )}

      {Platform.OS !== 'ios' && (
        <KeyboardAccessoryViewContent listRef={ref} iDoId={iDoID} />
      )}
      {Platform.OS !== 'ios' && <KeyboardSpacer topSpacing={48} />}
    </>
  );
};

export default RComment;
