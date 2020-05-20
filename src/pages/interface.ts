import { StackNavigationOptions } from '@react-navigation/stack';
import { NavigationHelpers, NavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    web: {},
    search: undefined,
    tool: undefined,
    FlagRecord: undefined,
    earnings: undefined,
    remind:undefined,
    cash: undefined,
    recordDetail: undefined,
    cardSetting: undefined,
    followee: undefined,
    follower: undefined,
    follow: undefined,
    following: undefined,
    creat: undefined,
    newCard: undefined,
    record: undefined,
    cardConfig: undefined,
    account: undefined,
    feedback: undefined,
    publishing: undefined,
    cardInfo: undefined,
    rcomment: undefined,
    card: undefined,
    cardUse: undefined,
    more: undefined,
    login: undefined,
    flagDetail: undefined,
    FRDetail: undefined,
    cirlcleSetting: undefined,


    //tabs
    punch:undefined,
    habit:undefined,
    flag:undefined,

};


type NavigationType<T  extends keyof RootStackParamList> = NavigationHelpers<RootStackParamList> &
  Partial<NavigationProp<RootStackParamList, T, any, any, any>>;

export type NavigationOptionsType<T extends keyof RootStackParamList> =
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, T>;
      navigation: NavigationType<T>;
    }) => StackNavigationOptions);

export interface ToLazyExoticComponentReturnType {
  component: React.ComponentType<any>;
  options: NavigationOptionsType<keyof RootStackParamList>;
  initialParams?: object;
}


export type RouteNameType =  keyof RootStackParamList;

export type  RouteType =  Record<
    RouteNameType,{
        component: React.ComponentType<any>;
        options?: NavigationOptionsType<keyof RootStackParamList>;
    }
>;

export interface StackPropsType {
    initialRouteName: RouteNameType;
    route: RouteType
  }
