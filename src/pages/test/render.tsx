import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  // BottomSheetHandle,
} from '@gorhom/bottom-sheet';
import { Button } from 'react-native';

import PrivatePickerModal from '@components/modal/private-picker-modal';

const items = [
  { label: '不对外开放', id: '0' },
  { label: '仅对卡片拥有者开放', id: '1' },
  { label: '对外开放', id: '2' },
];

const App = () => {
  // ref

  const [selectId, setselectId] = useState<string>('0');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  // renders
  return (
    <View style={styles.container}>
      <Button
        onPress={handlePresentModalPress}
        title="Present Modal"
        color="black"
      />
      <PrivatePickerModal
        ref={bottomSheetModalRef}
        items={items}
        selectId={selectId}
        onChange={(id) => {
          setselectId(id);
          bottomSheetModalRef.current?.close();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default App;
