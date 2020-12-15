import { useNavigation } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from 'react-native';

export const useOrientation = () => {
  const { width, height } = useWindowDimensions();
  return width > height ? 'LANDSCAPE' : 'PORTRAIT';
};

// export const useDimensions = () => {
//   const [dimensions, setDimensions] = useState({
//     window: Dimensions.get('window'),
//     screen: Dimensions.get('screen'),
//   });
//   const handle = ({
//     window,
//     screen,
//   }: {
//     window: ScaledSize;
//     screen: ScaledSize;
//   }) => {
//     setDimensions({ window, screen });
//   };

//   useEffect(() => {
//     Dimensions.addEventListener('change', handle);
//     return () => {
//       Dimensions.removeEventListener('change', handle);
//     };
//   }, []);
//   return dimensions;
// };

export const useScrollTitle = (title: string, offsetY: number = 35) => {
  const openSmallTitleRef = useRef(false);
  const { setOptions } = useNavigation();
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    if (!openSmallTitleRef.current && y > offsetY) {
      openSmallTitleRef.current = true;
      setOptions({ title: title });
    }
    if (openSmallTitleRef.current && y < offsetY) {
      openSmallTitleRef.current = false;
      setOptions({ title: '' });
    }
  };

  return useCallback(onScroll, [offsetY, setOptions, title]);
};

// export const use;
