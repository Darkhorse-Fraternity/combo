import React, {
  PureComponent,
  Suspense,
  LazyExoticComponent,
  ReactElement
} from "react";
import { loadGif } from "../Load";
import { Platform } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
// interface RHType {
//   readonly navigationOptions: Function;
//   readonly render: LazyExoticComponent<() => ReactElement>;
// }

//react-navigation 不支持用function 这里做一个转换

export const lazyRender = (
  RD: LazyExoticComponent<() => ReactElement>,
  showBar: boolean,
  props?: object
) => () => {
  return (
    <Suspense fallback={loadGif(showBar)}>
      <RD {...props} />
    </Suspense>
  );
};

export const toLazyExoticComponent = (
  Render: Function,
  navigationOptions?: Function
) => {
  // const {navigationOptions, render} = rh;
  return class cmp extends PureComponent<NavigationStackScreenProps<any, any>> {
    static navigationOptions = navigationOptions;

    render() {
      const header =
        navigationOptions &&
        typeof navigationOptions === "function" &&
        (navigationOptions().header as null);
      return lazyRender(
        Render as LazyExoticComponent<() => ReactElement>,
        header !== null,
        this.props
      )();
    }
  };
};

export const toComponent = <T extends {}>(
  Render: (props: T) => ReactElement
) => {
  return class cmp extends PureComponent<T> {
    render() {
      return <Render {...this.props} />;
    }
  };
};

interface ToNetWorkComponetProps<T extends {}> {
  data: T;
}

export const toNetWorkComponet = <T extends {}>(
  Render: (props: T) => ReactElement
  // testData?: T,
  // ableNoData?: boolean
) => {
  // if (ableNoData == undefined) {
  //   ableNoData = true;
  // }
  return class cmp extends PureComponent<ToNetWorkComponetProps<T>> {
    render() {
      const { data } = this.props;
      let newData = data;
      if (data && Platform.OS !== "ios" && typeof data === "string") {
        newData = JSON.parse(data as string);
      }
      // if (newData && newData.test === 'test') {
      //   newData = testData || ({} as T);
      // }

      // networkConfig && setConfigNative({networkConfig});

      // if (!ableNoData && Object.keys(newData).length == 0) {
      //   return null;
      // }
      return <Render {...newData} />;
    }
  };
};
