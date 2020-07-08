import React, {useEffect, useRef, memo} from 'react';

import {NativeModules, requireNativeComponent, ViewProps} from 'react-native';

const {RNGDTNativeUnifiedAD} = NativeModules;

interface InfoType {
  appId: string;
  placementId: string;
}

let isInstall = false;

if (!isInstall) {
  isInstall = true;
}

export function loadWithObjectInfo(info?: InfoType): Promise<number> {
  return RNGDTNativeUnifiedAD.loadWithObjectInfo(info);
}

interface NativeUnifiedADViewType extends ViewProps {
  index: number;
}

const NativeUnifiedADView = requireNativeComponent<NativeUnifiedADViewType>(
  'RNGDTNativeUnifiedADView',
);

// let countPool = [];

const NativeUnifiedAutoDataADView = (props: {count: number}) => {
  const ref = useRef(-1);
  useEffect(() => {
    ref.current = Math.random() * props.count;
  }, []);

  if (ref.current < 0) {
    return null;
  }

  return <NativeUnifiedADView index={ref.current} {...props} />;
};

export default memo(NativeUnifiedAutoDataADView);
