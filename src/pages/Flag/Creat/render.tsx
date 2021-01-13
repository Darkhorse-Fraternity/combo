/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import React, { FC, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
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
} from './style';
// @ts-ignore: Unreachable code error
// import { useNavigationAllParamsWithType } from '@components/Nav/hook';
// import { RouteKey } from '@pages/interface';

const CoverPicher: FC<{}> = () => {
  return (
    <StyledCoverPickcerBg>
      <StyledLogo source={require('@img/my/logo.png')} />
      <StyledCoverPickerBtn>
        <StyledCoverPickerBtnText>选择封面</StyledCoverPickerBtnText>
      </StyledCoverPickerBtn>
    </StyledCoverPickcerBg>
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
      <KeyboardAvoidingView
        enabled={Platform.OS === 'ios'}
        style={{ flex: 1 }}
        behavior="padding">
        <StyledContent
          onStartShouldSetResponder={() => true}
          onResponderGrant={Keyboard.dismiss}
          // enabled={!isTablet()}
          // contentContainerStyle={{ justifyContent: 'space-between', flex: 1 }}
          // keyboardVerticalOffset={800 - height}
        >
          <CoverPicher />
          <StyledTitle>
            副本标题 <StyledTitleTip>(0/14)</StyledTitleTip>
          </StyledTitle>
          <StyledTitleInput placeholder="请输入副本标题" maxLength={40} />
          <StyledLine />
          <StyledTitle>
            副本说明 <StyledTitleTip>(0/60)</StyledTitleTip>
          </StyledTitle>

          <StyledDiscribInputBg>
            <StyledDiscribInput
              placeholder="请输入副本说明"
              multiline
              maxLength={100}
              textAlignVertical="top"
            />
          </StyledDiscribInputBg>
          {/* {Platform.OS !== 'ios' && <KeyboardSpacer />} */}
        </StyledContent>
        <StyledNextBtn>
          <StyledNextBtnText>下一步，设置副本规则</StyledNextBtnText>
        </StyledNextBtn>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default FlagCreat;
