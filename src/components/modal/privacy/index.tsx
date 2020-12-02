import {
  StyleModalView,
  StyledTitle,
  StyledDiscrib,
  StyledDiscribIn,
  StyledLine1,
  StyledBottom,
  StyleCance,
  StyledLine2,
  StyleAgree,
} from './style';
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { appChannel, app_channel } from '@helps/util';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { RouteKey } from '@pages/interface';

interface PrivacyModal {}

export const PrivacyModal = (props: PrivacyModal) => {
  const [state, setState] = useState(false);
  const { setItem, getItem } = useAsyncStorage('PrivacyModal_Show');
  const navgaition = useNavigation();

  const check = async () => {
    await app_channel();
    if (appChannel === 'tencent') {
      getItem((_, res) => {
        if (res !== 'agree') {
          setState(true);
        }
      });
    }
  };
  const isFoucse = useIsFocused();

  useEffect(() => {
    if (isFoucse) {
      check();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFoucse]);
  return (
    <Modal
      useNativeDriver
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      {...props}
      isVisible={state}>
      <StyleModalView>
        <StyledTitle>小改变隐私政策</StyledTitle>
        <StyledDiscrib>
          请你务必申请阅读，充分理解"小改变用户协议"与"隐私政策"各条款，包括但不限于：为了向你提供日常提醒，习惯养成等服务，我们需要收集你的设备信息，操作日志等个人信息,你可以在“设置”中查看、变更、
          删除个人信息并管理你的授权。{'\n'}
          你可阅读
          <StyledDiscribIn
            onPress={() => {
              setState(false);
              navgaition.navigate(RouteKey.web, {
                url: 'https://icourage.cn/userAgreement',
              });
            }}>
            《用户协议》
          </StyledDiscribIn>
          与
          <StyledDiscribIn
            onPress={() => {
              setState(false);
              navgaition.navigate(RouteKey.web, {
                url: 'https://icourage.cn/privacyAgreement',
              });
            }}>
            《隐私政策》
          </StyledDiscribIn>
          了解详细信息。如你同意，请点击”同意“ 开始接受我们的服务。
        </StyledDiscrib>
        <StyledLine1 />
        <StyledBottom>
          <StyleCance
            textColor={'gray'}
            onPress={() => {
              if (BackHandler && BackHandler.exitApp) {
                BackHandler.exitApp();
              } else {
                setState(false);
              }
            }}>
            暂不使用
          </StyleCance>
          <StyledLine2 />
          <StyleAgree
            onPress={() => {
              setState(false);
              setItem('agree');
            }}>
            同意
          </StyleAgree>
        </StyledBottom>
      </StyleModalView>
    </Modal>
  );
};
