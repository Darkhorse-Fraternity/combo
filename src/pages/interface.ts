import {StackNavigationOptions} from '@react-navigation/stack';
import {
  NavigationHelpers,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';

export enum RouteKey {
  web = 'web',
  search = 'search',
  tool = 'tool',
  FlagRecord = 'FlagRecord',
  earnings = 'earnings',
  remind = 'remind',
  cash = 'cash',
  recordDetail = 'recordDetail',
  cardSetting = 'cardSetting',
  followee = 'followee',
  follower = 'follower',
  follow = 'follow',
  following = 'following',
  creat = 'creat',
  newCard = 'newCard',
  record = 'record',
  cardConfig = 'cardConfig',
  account = 'account',
  feedback = 'feedback',
  publishing = 'publishing',
  cardInfo = 'cardInfo',
  rcomment = 'rcomment',
  card = 'card',
  cardUse = 'cardUse',
  more = 'more',
  login = 'login',
  flagDetail = 'flagDetail',
  FRDetail = 'FRDetail',
  cirlcleSetting = 'cirlcleSetting',

  //tabs
  punch = 'punch',
  habit = 'habit',
  flag = 'flag',
}

export type RootStackParamList = {
  [RouteKey.web]: {};
  [RouteKey.search]: undefined;
  [RouteKey.tool]: undefined;
  [RouteKey.FlagRecord]: undefined;
  [RouteKey.earnings]: undefined;
  [RouteKey.remind]: undefined;
  [RouteKey.cash]: undefined;
  [RouteKey.recordDetail]: undefined;
  [RouteKey.cardSetting]: undefined;
  [RouteKey.followee]: undefined;
  [RouteKey.follower]: undefined;
  [RouteKey.follow]: undefined;
  [RouteKey.following]: undefined;
  [RouteKey.creat]: undefined;
  [RouteKey.newCard]: undefined;
  [RouteKey.record]: undefined;
  [RouteKey.cardConfig]: undefined;
  [RouteKey.account]: undefined;
  [RouteKey.feedback]: undefined;
  [RouteKey.publishing]: undefined;
  [RouteKey.cardInfo]: undefined;
  [RouteKey.rcomment]: undefined;
  [RouteKey.card]: undefined;
  [RouteKey.cardUse]: undefined;
  [RouteKey.more]: undefined;
  [RouteKey.login]: undefined;
  [RouteKey.flagDetail]: undefined;
  [RouteKey.FRDetail]: undefined;
  [RouteKey.cirlcleSetting]: undefined;

  //tabs
  [RouteKey.punch]: undefined;
  [RouteKey.habit]: undefined;
  [RouteKey.flag]: undefined;
};

type NavigationType<T extends keyof RootStackParamList> = NavigationHelpers<
  RootStackParamList
> &
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

export type RouteNameType = keyof RootStackParamList;

export type RouteType = Record<
  RouteNameType,
  {
    component: React.ComponentType<any>;
    options?: NavigationOptionsType<keyof RootStackParamList>;
  }
>;

export interface StackPropsType {
  initialRouteName: RouteNameType;
  route: RouteType;
}
