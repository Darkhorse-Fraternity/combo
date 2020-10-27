import React, { useState, PureComponent, useEffect } from 'react';
import { StyleModalOutView, StyleCance, StyledIcon } from './style';
import Modal, { ModalProps } from 'react-native-modal';
import { ViewProps } from 'react-native';

export interface CModalPropsType extends ViewProps {
  show?: boolean;
  onClose?: () => void;
  modalProps?: ModalProps;
  children?: React.ReactElement<ViewProps>;
}

const CModal = ({
  show = false,
  modalProps,
  children,
  onClose,
  ...other
}: CModalPropsType) => {
  return (
    <Modal
      avoidKeyboard
      useNativeDriver
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      isVisible={show}
      {...modalProps}>
      <StyleModalOutView {...other}>
        <StyleCance onPress={onClose}>
          <StyledIcon name="close" size={20} />
        </StyleCance>
        {children}
      </StyleModalOutView>
    </Modal>
  );
};

export default CModal;
