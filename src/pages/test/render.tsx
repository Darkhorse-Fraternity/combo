import React, { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

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
  const [show, setShow] = useState(false);
  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    // bottomSheetModalRef.current?.present();
    setShow(true);
  }, []);
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  // renders
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={handlePresentModalPress}
        title="Present Modal"
        color="black"
      />
      <PrivatePickerModal
        // ref={bottomSheetModalRef}
        isVisible={show}
        onClose={() => {
          setShow(false);
        }}
        items={items}
        selectId={selectId}
        onChange={(id) => {
          setselectId(id);
          setShow(false);
          // bottomSheetModalRef.current?.close();
        }}
      />
    </SafeAreaView>
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
