/* eslint-disable @typescript-eslint/no-explicit-any */
import {StackNavigationOptions} from '@react-navigation/stack';
import {
  NavigationHelpers,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {Record} from 'immutable';
import { WebViewProp } from '@components/WebView/interface';

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
  cardInfo = 'cardInfo',
  rcomment = 'rcomment',
  card = 'card',
  cardUse = 'cardUse',
  more = 'more',
  login = 'login',
  flagDetail = 'flagDetail',
  FRDetail = 'FRDetail',
  cirlcleSetting = 'cirlcleSetting',
  clockIn = 'clockIn',
  log = 'log',

  //tabs
  punch = 'punch',
  habit = 'habit',
  flag = 'flag',
  test = 'test',
}

type RecordType = '文字'|'图片';

export type RootStackParamList = {
  [RouteKey.web]: {
    title?: string;
    headerShown?: boolean;
  } & WebViewProp;
  [RouteKey.test]: undefined;
  [RouteKey.search]: undefined;
  [RouteKey.tool]: undefined;
  [RouteKey.FlagRecord]: undefined;
  [RouteKey.earnings]: undefined;
  [RouteKey.remind]: undefined;
  [RouteKey.cash]: undefined;
  [RouteKey.recordDetail]: undefined;
  [RouteKey.cardSetting]: {iCardID: string};
  [RouteKey.followee]: undefined;
  [RouteKey.follower]: undefined;
  [RouteKey.follow]: undefined;
  [RouteKey.following]: undefined;
  [RouteKey.creat]: undefined;
  [RouteKey.newCard]: undefined;
  [RouteKey.record]: undefined;
  [RouteKey.cardConfig]: undefined;
  [RouteKey.account]: undefined;
  // [RouteKey.feedback]: undefined;
  [RouteKey.cardInfo]: undefined;
  [RouteKey.rcomment]: undefined;
  [RouteKey.card]: undefined;
  [RouteKey.cardUse]: undefined;
  [RouteKey.more]: undefined;
  [RouteKey.login]: undefined;
  [RouteKey.flagDetail]: undefined;
  [RouteKey.FRDetail]: undefined;
  [RouteKey.cirlcleSetting]: {iCardID:string};
  [RouteKey.clockIn]:{iDoId?:string,iUseId:string,iCardId:string,record:RecordType[],type?:number,doneDateIso?:string}; 
  //tabs
  [RouteKey.punch]: undefined;
  [RouteKey.habit]: undefined;
  [RouteKey.flag]: undefined;
  [RouteKey.log]:{iUseId:string,iCardId:string,color:string};
};

// type KeyType = keyof typeof RouteKey;
export type RouteNameType = keyof RootStackParamList;

type NavigationType<T extends RouteKey> = NavigationHelpers<
  RootStackParamList
> &
  Partial<NavigationProp<RootStackParamList, T, any, any, any>>;

export type NavigationOptionsType<T extends RouteKey> =
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, T>;
      navigation: NavigationType<T>;
    }) => StackNavigationOptions);

export interface ToLazyExoticComponentReturnType {
  component: React.ComponentType<any>;
  options?: NavigationOptionsType<any>;
  initialParams?: object;
}

export type RouteType = Record<RouteNameType, ToLazyExoticComponentReturnType>;

export interface StackPropsType {
  initialRouteName: RouteNameType;
  route: RouteType;
}
