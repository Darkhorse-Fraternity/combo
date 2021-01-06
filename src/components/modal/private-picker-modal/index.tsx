import React, { FC, memo, Ref } from 'react';

import {
  StyledContent,
  StyledItem,
  StyledMaterialIcons,
  StyledText,
} from './style';
// import BottomSheetHandle from '@components/modal/bottom-sheet-handle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';

interface ItemType {
  id: string;
  label: string;
}

interface PrivatePickerModalType {
  items: ItemType[];
  onChange: (id: string) => void;
  selectId: string;
  isVisible: boolean;
  onClose: () => void;
}

const PrivatePickerModalRef: FC<
  PrivatePickerModalType & { forwardRef: Ref<Modal> }
> = ({ items, onChange, selectId, forwardRef, isVisible, onClose }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      animationOutTiming={200}
      useNativeDriver
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      // onSwipeMove
      style={styles.modal}
      ref={forwardRef}
      // index={0}
      // backdropComponent={BottomSheetBackdrop}
      // handleComponent={BottomSheetHandle}
    >
      <StyledContent paddingBottom={bottom}>
        {items.map(({ label, id }) => (
          <StyledItem
            // activeOpacity={1}
            key={id}
            onPress={() => {
              onChange(id);
              // console.log('id', id);

              // bottomSheetModalRef.current?.close();
            }}>
            <StyledText>{label}</StyledText>
            {selectId === id && <StyledMaterialIcons name="done" size={20} />}
          </StyledItem>
        ))}
      </StyledContent>
    </Modal>
  );
};

const PrivatePickerModal = memo(
  React.forwardRef<Modal, PrivatePickerModalType>((props, ref) => (
    <PrivatePickerModalRef forwardRef={ref} {...props} />
  )),
);

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});

export default PrivatePickerModal;
