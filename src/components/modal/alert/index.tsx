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
} from './style';
// import Modal from 'react-native-modal';
import Button from '@components/Button';
import { View } from 'react-native-animatable';
import { Modal } from 'react-native';

export interface PickViewProps extends InnerViewProps {
  isVisiable?: boolean;
}

export interface InnerViewProps {
  onSuccess: () => void;
  onClose?: () => void;
}

const InnerView = (props: InnerViewProps) => {
  const { onSuccess, onClose } = props;

  return (
    <ContentView>
      <StyledLogoView>
        <StyledLogo
          resizeMode={'contain'}
          source={require('@img/my/icon-60.png')}
        />
      </StyledLogoView>
      <StyledButtonView>
        <Button onPress={onSuccess}>
          <StyledSubmit>
            <CommitBtn color={'#848494'}>取消</CommitBtn>
          </StyledSubmit>
        </Button>
        <View style={{ width: 80 }} />
        <StyledSplitView />
        <Button onPress={onClose}>
          <StyledSubmit>
            <CommitBtn color={'#848494'}>确定</CommitBtn>
          </StyledSubmit>
        </Button>
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
