/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import { useNavigationWithType } from '@components/Nav/hook';
import { DeviceEventEmitterKey } from '@configure/enum';
import { RouteKey } from '@pages/interface';
import React, { FC, useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// @ts-ignore: Unreachable code error
import KeyboardManager from 'react-native-keyboard-manager';
import {
  StyledCoverPickcerBg,
  StyledCoverPickerBtn,
  StyledCoverPickerBtnText,
  StyledLogo,
  StyledSafeAreaView,
  StyledTitle,
  StyledTitleInput,
  StyledDiscribInput,
  StyledTitleTip,
  StyledDiscribInputBg,
  StyledLine,
  StyledNextBtn,
  StyledNextBtnText,
  StyledContent,
  StyledDeleteBtn,
  StyledCloseImage,
} from './style';
import Button from '@components/Button';
// @ts-ignore: Unreachable code error
// import { useNavigationAllParamsWithType } from '@components/Nav/hook';
// import { RouteKey } from '@pages/interface';

interface ImagePikerType {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const CoverPicher: FC<ImagePikerType> = ({ value, setValue }) => {
  const { navigate } = useNavigationWithType();
  const onPicker = () => {
    navigate(RouteKey.flagCoverPicker, { url: value });
  };

  useEffect(() => {
    const deEmitter = DeviceEventEmitter.addListener(
      DeviceEventEmitterKey.flag_cover_picker,
      (data) => {
        setValue(data);
        console.log('data', data);
      },
    );
    return () => {
      deEmitter.remove();
    };
  }, [setValue]);

  return (
    <Button disabled={!value} onPress={onPicker}>
      {value && (
        <StyledDeleteBtn
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          onPress={() => {
            setValue(undefined);
          }}>
          <StyledCloseImage source={require('@img/flag/icon_close.png')} />
        </StyledDeleteBtn>
      )}
      <StyledCoverPickcerBg borderRadius={20} source={{ uri: value }}>
        {!value && (
          <>
            <StyledLogo source={require('@img/my/logo.png')} />
            <StyledCoverPickerBtn onPress={onPicker}>
              <StyledCoverPickerBtnText>选择封面</StyledCoverPickerBtnText>
            </StyledCoverPickerBtn>
          </>
        )}
      </StyledCoverPickcerBg>
    </Button>
  );
};

const titleMax = 14;
const discribMax = 60;

const CreatStepOn: FC<{}> = () => {
  const [cover, setCover] = useState<string>();
  const [title, setTitle] = useState('');
  const [discrib, setDiscrib] = useState('');
  const { navigate } = useNavigationWithType();

  const disabled = !cover || title.length === 0 || discrib.length === 0;

  const onNext = () => {
    if (cover) {
      navigate(RouteKey.flagCreatNext, { cover: cover, title, discrib });
    }
  };

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      style={{ flex: 1 }}
      behavior="padding">
      <StyledContent
      // onStartShouldSetResponder={() => true}
      // onResponderGrant={Keyboard.dismiss}
      // enabled={!isTablet()}
      // contentContainerStyle={{ justifyContent: 'space-between', flex: 1 }}
      // keyboardVerticalOffset={800 - height}
      >
        <CoverPicher value={cover} setValue={setCover} />
        <StyledTitle>
          副本标题{' '}
          <StyledTitleTip>
            ({title.length}/{titleMax})
          </StyledTitleTip>
        </StyledTitle>
        <StyledTitleInput
          value={title}
          onChangeText={setTitle}
          placeholder="请输入副本标题"
          maxLength={titleMax}
        />
        <StyledLine />
        <StyledTitle>
          副本说明{' '}
          <StyledTitleTip>
            ({discrib.length}/{discribMax})
          </StyledTitleTip>
        </StyledTitle>

        <StyledDiscribInputBg>
          <StyledDiscribInput
            placeholder="请输入副本说明"
            multiline
            maxLength={discribMax}
            value={discrib}
            onChangeText={setDiscrib}
            textAlignVertical="top"
          />
        </StyledDiscribInputBg>
        {/* {Platform.OS !== 'ios' && <KeyboardSpacer />} */}
      </StyledContent>
      <StyledNextBtn disabled={disabled} onPress={onNext}>
        <StyledNextBtnText disabled={disabled}>
          下一步，设置副本规则
        </StyledNextBtnText>
      </StyledNextBtn>
    </KeyboardAvoidingView>
  );
};

const FlagCreat: FC<{}> = () => {
  // const { iCardId } = useNavigationAllParamsWithType<RouteKey.flagDetail>();

  // const { height } = useWindowDimensions();
  // const [state, setstate] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
    }
    return () => {
      if (Platform.OS === 'ios') {
        KeyboardManager.setEnable(false);
      }
    };
  }, []);

  return (
    <StyledSafeAreaView>
      <CreatStepOn />
    </StyledSafeAreaView>
  );
};

export default FlagCreat;
