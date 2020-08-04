import React, {ComponentType, FC, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler, ToastAndroid} from 'react-native';

// const AndroidBackHandleHOCComponentIn = (props: any) => {
//   const lastTimesRef = useRef(0);
//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         const times = Date.now();
//         if (times - lastTimesRef.current <= 2500) {
//           BackHandler.exitApp();
//         } else {
//           lastTimesRef.current = times;
//           ToastAndroid.show('再按一次退出应用', 0);
//         }
//         return true;
//       };

//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () =>
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       //   lastTimesRef.current = 0;
//     }, []),
//   );

//   return <ComposedComponent {...props} />;
// };

export const AndroidBackHandleHOCComponent = <
  ComposedComponentProps extends {}
>(
  ComposedComponent: ComponentType<ComposedComponentProps>,
) => {
  const Render: FC<ComposedComponentProps> = (props) => {
    const lastTimesRef = useRef(0);
    useFocusEffect(
      React.useCallback(() => {
        const onBackPress = () => {
          const times = Date.now();
          if (times - lastTimesRef.current <= 2500) {
            BackHandler.exitApp();
          } else {
            lastTimesRef.current = times;
            ToastAndroid.show('再按一次退出应用', 0);
          }
          return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () =>
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        //   lastTimesRef.current = 0;
      }, []),
    );

    return <ComposedComponent {...props} />;
  };
  return Render;
};
