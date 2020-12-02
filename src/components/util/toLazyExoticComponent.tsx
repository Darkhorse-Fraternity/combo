import React, { Suspense, FC } from 'react';
import { loadGif } from '../Load';

import { StackNavigationOptions } from '@react-navigation/stack';
import { ToLazyExoticComponentReturnType } from '@pages/interface';
import { NavigationContainerProps } from '@react-navigation/native';
// interface RHType {
//   readonly navigationOptions: Function;
//   readonly render: LazyExoticComponent<() => ReactElement>;
// }

//react-navigation 不支持用function 这里做一个转换

interface LazyRenderT {
  showBar: boolean;
}

export const LazyRender: FC<LazyRenderT> = ({ showBar, ...props }) => {
  return <Suspense fallback={loadGif(showBar)} {...props} />;
};

export const toLazyExoticComponent = (
  Render: React.ComponentType<NavigationContainerProps>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigationOptions?: any,
): ToLazyExoticComponentReturnType => {
  let option = navigationOptions || {};
  if (typeof navigationOptions === 'function') {
    option = navigationOptions({
      route: { params: {} },
      navigation: {},
    });
  }
  const {
    headerShown = true,
    headerTransparent = false,
    headerBackground,
  } = option as StackNavigationOptions;

  const showBar = headerShown && !headerTransparent && !headerBackground;

  const LazyRenderIn = (props: NavigationContainerProps) => {
    // useTrackView();
    return (
      <LazyRender showBar={showBar}>
        <Render {...props} />
      </LazyRender>
    );
  };

  // LazyRenderIn.navigationOptions = navigationOptionsIn;
  return { component: LazyRenderIn, options: navigationOptions };
};
