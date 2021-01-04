import React, { FC, memo, Ref, useMemo } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  // BottomSheetHandle,
} from '@gorhom/bottom-sheet';
import {
  StyledContentContainer,
  StyledItem,
  StyledMaterialIcons,
  StyledText,
} from './style';
import BottomSheetHandle from '@components/modal/bottom-sheet-handle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ItemType {
  id: string;
  label: string;
}

interface PrivatePickerModalType {
  items: ItemType[];
  onChange: (id: string) => void;
  selectId: string;
}

const PrivatePickerModalRef: FC<
  PrivatePickerModalType & { forwardRef: Ref<BottomSheetModal> }
> = ({ items, onChange, selectId, forwardRef }) => {
  // ref

  // const [selectId, setselectId] = useState<string>();
  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables

  const { bottom } = useSafeAreaInsets();

  const snapPoints = useMemo(() => [150 + bottom], [bottom]);

  // callbacks

  // renders
  return (
    <BottomSheetModal
      ref={forwardRef}
      index={0}
      backdropComponent={BottomSheetBackdrop}
      handleComponent={BottomSheetHandle}
      snapPoints={snapPoints}>
      <StyledContentContainer>
        {/* <StyledTitleView>
            <StyledTitle>修改隐私策略</StyledTitle>
            <StyledImage source={require('@img/circle/privacy_open.png')} />
          </StyledTitleView> */}
        {items.map(({ label, id }) => (
          <StyledItem
            activeOpacity={1}
            key={id}
            onPress={() => {
              onChange(id);
              // bottomSheetModalRef.current?.close();
            }}>
            <StyledText>{label}</StyledText>
            {selectId === id && <StyledMaterialIcons name="done" size={20} />}
          </StyledItem>
        ))}
      </StyledContentContainer>
    </BottomSheetModal>
  );
};

const PrivatePickerModal = memo(
  React.forwardRef<BottomSheetModal, PrivatePickerModalType>((props, ref) => (
    <PrivatePickerModalRef forwardRef={ref} {...props} />
  )),
);

export default PrivatePickerModal;
