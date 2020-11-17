import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  ScaledSize,
} from 'react-native';
import { isLandscapeSync, isTablet } from 'react-native-device-info';
import Orientation from 'react-native-orientation';
type OrientationType =
  | 'LANDSCAPE'
  | 'PORTRAIT'
  | 'UNKNOWN'
  | 'PORTRAITUPSIDEDOWN';
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>(
    isLandscapeSync() ? 'LANDSCAPE' : 'PORTRAIT',
  );
  const orientationDidChange = (ori: OrientationType) => {
    setOrientation(ori);
  };

  useEffect(() => {
    if (isTablet()) {
      Orientation.addOrientationListener(orientationDidChange);
      return () => {
        Orientation.removeOrientationListener(orientationDidChange);
      };
    }
  }, []);
  return orientation;
};

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });
  const handle = ({
    window,
    screen,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handle);
    return () => {
      Dimensions.removeEventListener('change', handle);
    };
  }, []);
  return dimensions;
};

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
