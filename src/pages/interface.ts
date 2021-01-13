import { StackNavigationOptions } from '@react-navigation/stack';
import {
  EventMapBase,
  NavigationContainerProps,
  NavigationHelpers,
  NavigationProp,
  NavigationState,
  RouteProp,
} from '@react-navigation/native';
import { WebViewProp } from '@components/WebView/interface';

export enum RouteKey {
  web = 'web',
  search = 'search',
  tool = 'tool',
  flagRecord = 'flagRecord',
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
  recordPrivate = 'recordPrivate',
  cardConfig = 'cardConfig',
  account = 'account',
  cardInfo = 'cardInfo',
  rcomment = 'rcomment',
  card = 'card',

  cardUse = 'cardUse',
  more = 'more',
  login = 'login',
  flagDetail = 'flagDetail',
  flagCreat = 'flagCreat',
  flagCoverPicker = 'flagCoverPicker',
  frDetail = 'frDetail',
  cirlcleSetting = 'cirlcleSetting',
  clockIn = 'clockIn',
  log = 'log',
  feedback = 'feedback',

  //tabs
  punch = 'punch',
  habit = 'habit',
  flag = 'flag',
  test = 'test',
}

export interface CardItemType {
  title: string;
  icon: string;
  color: string;
}

// type RecordType = '文字' | '图片';

export type RootStackParamList = {
  [RouteKey.web]: {
    title?: string;
    headerShown?: boolean;
  } & WebViewProp;
  [RouteKey.test]: undefined;
  [RouteKey.feedback]: undefined;
  [RouteKey.search]: undefined;
  [RouteKey.tool]: undefined;
  [RouteKey.flagRecord]: { iCardId: string; title: string };
  [RouteKey.earnings]: undefined;
  [RouteKey.remind]: undefined;
  [RouteKey.cash]: undefined;
  [RouteKey.recordDetail]: { iUseId: string };
  [RouteKey.cardSetting]: { iCardId: string; iUseId: string };
  [RouteKey.followee]: { userId: string };
  [RouteKey.follower]: { userId: string };
  [RouteKey.follow]: undefined;
  [RouteKey.following]: { userId: string };
  [RouteKey.creat]: { habit: CardItemType } | undefined;
  [RouteKey.newCard]: undefined;
  [RouteKey.record]: undefined;
  [RouteKey.cardConfig]: { iCardId: string };
  [RouteKey.account]: undefined;
  // [RouteKey.feedback]: undefined;
  [RouteKey.cardInfo]: { iCardId: string };
  [RouteKey.rcomment]: { iDoID: string };
  [RouteKey.card]: { iUseId: string };
  [RouteKey.recordPrivate]: { iUseId: string };
  [RouteKey.cardUse]: { iCardId: string };
  [RouteKey.more]: undefined;
  [RouteKey.login]: undefined;
  [RouteKey.flagDetail]: { iCardId: string; flagId: string; title?: string };
  [RouteKey.frDetail]: { flagId: string };
  [RouteKey.cirlcleSetting]: { iCardId: string };
  [RouteKey.clockIn]: { iUseId: string; doneDateIso?: string; iDoId?: string };
  //tabs
  [RouteKey.punch]: undefined;
  [RouteKey.habit]: undefined;
  [RouteKey.flag]: undefined;
  [RouteKey.log]: { iUseId: string; color: string };
  [RouteKey.flagCreat]: { iCardId: string };
  [RouteKey.flagCoverPicker]: undefined;
};

// type KeyType = keyof typeof RouteKey;
export type RouteNameType = keyof RootStackParamList;

type NavigationType<T extends RouteKey> = NavigationHelpers<
  RootStackParamList
> &
  Partial<
    NavigationProp<RootStackParamList, T, NavigationState, {}, EventMapBase>
  >;

export type NavigationOptionsType<T extends RouteKey> =
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootStackParamList, T>;
      navigation: NavigationType<T>;
    }) => StackNavigationOptions);

export interface ToLazyExoticComponentReturnType {
  component: React.ComponentType<NavigationContainerProps>;
  options?: NavigationOptionsType<RouteKey>;
  initialParams?: object;
}

export type RouteType = Record<RouteNameType, ToLazyExoticComponentReturnType>;

export interface StackPropsType {
  initialRouteName: RouteNameType;
  route: RouteType;
}
