/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-20 16:16:45
 * @FilePath: /Combo/src/components/modal/alert/index.tsx
 */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, memo } from 'react';
// import Button from 'components/Button';
import {
  ContentView,
  CommitBtn,
  StyledSubmit,
  StyledSplitView,
  StyledButtonView,
  StyledLogo,
  StyledLogoView,
  StyledBG,
  StyledTitle,
  StyledMessage,
} from './style';
// import Modal from 'react-native-modal';
import { ButtonOpacity } from '@components/Button';
import { GestureResponderEvent, Modal } from 'react-native';

export interface PickViewProps extends InnerViewProps {
  isVisiable?: boolean;
}

export interface InnerViewProps {
  onSuccess: (event: GestureResponderEvent) => void;
  onClose?: (event: GestureResponderEvent) => void;
  title: string;
  message?: string;
}

const InnerView = (props: InnerViewProps) => {
  const { onSuccess, onClose, title, message } = props;
  // const colorScheme = useColorScheme();
  return (
    <ContentView>
      <StyledLogoView>
        <StyledLogo
          resizeMode={'contain'}
          source={require('@img/my/icon-60.png')}
        />
      </StyledLogoView>
      <StyledTitle>{title}</StyledTitle>
      {!!message && <StyledMessage>{message}</StyledMessage>}
      <StyledButtonView>
        <ButtonOpacity style={{ flex: 1 }} onPress={onClose}>
          <StyledSubmit>
            <CommitBtn color={'#848494'}>取消</CommitBtn>
          </StyledSubmit>
        </ButtonOpacity>
        {/* <View style={{ width: 80 }} /> */}
        <StyledSplitView />
        <ButtonOpacity style={{ flex: 1 }} onPress={onSuccess}>
          <StyledSubmit>
            <CommitBtn color={'green'}>确定</CommitBtn>
          </StyledSubmit>
        </ButtonOpacity>
      </StyledButtonView>
    </ContentView>
  );
};
const Render: FC<PickViewProps> = (props) => {
  const { isVisiable = false, onClose, ...other } = props;

  return (
    <Modal
      animationType="fade"
      animated
      transparent
      // animationIn={'fadeIn'}
      // animationOut={'fadeOut'}
      // onBackButtonPress={onClose}
      // onBackdropPress={onClose}
      // useNativeDriver
      // style={{
      //   // justifyContent: 'flex-end',
      //   marginLeft: 0,
      //   marginRight: 0,
      //   marginBottom: 0,
      // }}
      visible={isVisiable}>
      <StyledBG>
        <InnerView onClose={onClose} {...other} />
      </StyledBG>
    </Modal>
  );
};

const Alert = memo(Render);
export default Alert;
