/* eslint-disable react-native/no-inline-styles */
import React, { useState, memo, useRef, useCallback } from 'react';
// import Button from 'components/Button';
import {
  ContentView,
  CommitBtn,
  StyledSubmit,
  StyledCellTopLine,
  StyledSplitView,
} from './style';
import Modal from 'react-native-modal';
import Button from '@components/Button';
export interface PickViewProps extends InnerViewProps {
  isVisiable?: boolean;
}

export interface InnerViewProps {
  onSuccess: (index: number) => void;
  onClose: () => void;
}

const InnerView = (props: InnerViewProps) => {
  const { onSuccess, onClose } = props;

  return (
    <ContentView>
      <Button
        onPress={() => {
          onSuccess(0);
        }}>
        <StyledSubmit>
          <CommitBtn>拍照</CommitBtn>
        </StyledSubmit>
      </Button>
      <StyledCellTopLine />
      <Button
        onPress={() => {
          onSuccess(1);
        }}>
        <StyledSubmit>
          <CommitBtn>从相册中选择</CommitBtn>
        </StyledSubmit>
      </Button>
      <StyledSplitView />
      <Button
        onPress={() => {
          onClose();
        }}>
        <StyledSubmit>
          <CommitBtn color={'#848494'}>取消</CommitBtn>
        </StyledSubmit>
      </Button>
    </ContentView>
  );
};
const Render = (props: PickViewProps) => {
  const { isVisiable = false, onSuccess, onClose } = props;

  return (
    <Modal
      onBackButtonPress={() => {
        onClose();
      }}
      useNativeDriver
      style={{
        justifyContent: 'flex-end',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
      isVisible={isVisiable}
      onBackdropPress={() => {
        onClose();
      }}>
      <InnerView onSuccess={onSuccess} onClose={onClose} />
    </Modal>
  );
};

export default memo(Render);
