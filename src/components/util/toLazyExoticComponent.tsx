import React, {Suspense, FC} from 'react';
import {loadGif} from '../Load';
import {
  RouteProp,
  NavigationHelpers,
  NavigationProp,
} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {
  RootStackParamList,
  NavigationOptionsType,
  ToLazyExoticComponentReturnType,
} from '@pages/interface';
// interface RHType {
//   readonly navigationOptions: Function;
//   readonly render: LazyExoticComponent<() => ReactElement>;
// }

//react-navigation 不支持用function 这里做一个转换

interface LazyRenderT {
  showBar: boolean;
}

export const LazyRender: FC<LazyRenderT> = ({showBar, ...props}) => {
  return <Suspense fallback={loadGif(showBar)} {...props} />;
};

export const toLazyExoticComponent = (
  Render: React.ComponentType<any>,
  navigationOptions?: NavigationOptionsType<any>,
): ToLazyExoticComponentReturnType => {
  let option = navigationOptions || ({} as StackNavigationOptions);
  if (typeof navigationOptions === 'function') {
    option = navigationOptions({route: {}, navigation: {}} as any);
  }
  const {
    headerShown = true,
    headerTransparent = false,
    headerBackground,
  } = option as StackNavigationOptions;

  const showBar = headerShown && !headerTransparent && !headerBackground;

  const LazyRenderIn = (props: any) => {
    return (
      <LazyRender showBar={showBar} {...props}>
        <Render />
      </LazyRender>
    );
  };

  // LazyRenderIn.navigationOptions = navigationOptionsIn;
  return {component: LazyRenderIn, options: option};
};