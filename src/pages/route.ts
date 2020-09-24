import {RouteType, RouteKey} from './interface';

import Habit from './Habit';
import Creat from './NewCard/CardConfig/Creat';
import NewCard from './NewCard';
import Record from './Record';
import CardConfig from './NewCard/CardConfig';
import LoginView from './More/Login/LoginView';
import More from './More';
import Account from './More/Account';
import RecordDetail from './Record/Detail';
import Feedback from './More/Feedback/Feedback';
import CirlcleSetting from './Publish/CirlcleSetting';
import CardInfo from './NewCard/CardInfo';
import RComment from './Record/RComment';
import Card from './Card';
import Followee from './More/Follow/Followee';
import Follower from './More/Follow/Follower';
import Follow from './More/Follow';
import Following from './More/Follow/Following';
import CardUse from './NewCard/CardUse';
import FlagRecord from './Flag/Record';
// import PPTDescribe from '../components/Form/Course/ppt/PPTDescribe'
import CardSetting from './Card/Settings';
import Earnings from './Order/Earnings';
import Cash from './Order/Cash';
import Remind from './More/Remind';
import Punch from './Punch';
import WebView from '@components/Base/BaseWebView';
import Flag from './Flag';
import FlagDetail from './Flag/Detail';
import FRDetail from './Flag/FRDetail';
import Tool from './More/Tool';
import Search from './NewCard/Search';
import {AndroidBackHandleHOCComponent} from '../configure/androidBackHandle';
import Test from './test';

export const otherRoute: RouteType = {
  [RouteKey.web]: {component: WebView, options: WebView.navigationOptions},
  [RouteKey.test]: Test,
  [RouteKey.search]: {component: Search, options: Search.navigationOptions},
  [RouteKey.tool]: {component: Tool},
  [RouteKey.FlagRecord]: FlagRecord,
  [RouteKey.earnings]: {
    component: Earnings,
    options: Earnings.navigationOptions,
  },
  [RouteKey.remind]: {component: Remind, options: Remind.navigationOptions},
  [RouteKey.cash]: {component: Cash, options: Cash.navigationOptions},
  [RouteKey.recordDetail]: RecordDetail,
  [RouteKey.cardSetting]: {
    component: CardSetting,
    options: CardSetting.navigationOptions,
  },
  [RouteKey.followee]: {
    component: Followee,
    options: Followee.navigationOptions,
  },
  [RouteKey.follower]: {
    component: Follower,
    options: Follower.navigationOptions,
  },
  [RouteKey.follow]: {component: Follow, options: Follow.navigationOptions},
  [RouteKey.following]: {
    component: Following,
    options: Following.navigationOptions,
  },
  [RouteKey.creat]: {component: Creat, options: Creat.navigationOptions},
  [RouteKey.newCard]: NewCard,
  [RouteKey.record]: {component: Record, options: Record.navigationOptions},
  [RouteKey.cardConfig]: {
    component: CardConfig,
    options: CardConfig.navigationOptions,
  },
  [RouteKey.account]: {component: Account},
  [RouteKey.feedback]: {
    component: Feedback,
    options: Feedback.navigationOptions,
  },
  
  [RouteKey.cardInfo]: {
    component: CardInfo,
    options: CardInfo.navigationOptions,
  },
  [RouteKey.rcomment]: RComment,
  [RouteKey.card]: Card,
  [RouteKey.cardUse]: {component: CardUse, options: CardUse.navigationOptions},

  [RouteKey.login]: {
    component: LoginView,
    options: LoginView.navigationOptions,
  },
  [RouteKey.flagDetail]: {
    component: FlagDetail,
    options: FlagDetail.navigationOptions,
  },
  [RouteKey.FRDetail]: {
    component: FRDetail,
    options: FRDetail.navigationOptions,
  },
  [RouteKey.cirlcleSetting]: CirlcleSetting,
  // pptDescribe: { screen: PPTDescribe },
};

export const punchRoute: RouteType = {
  ...otherRoute,
  [RouteKey.punch]: {
    component: AndroidBackHandleHOCComponent(Punch.component),
    // component: AndroidBackHandleHOCComponent(Test.component),
    options: Punch.options,
  },
};

export const habitRoute: RouteType = {
  ...otherRoute,
  [RouteKey.habit]: {
    component: AndroidBackHandleHOCComponent(Habit.component),
    options: Habit.options,
  },
};

export const flagRoute: RouteType = {
  ...otherRoute,
  [RouteKey.flag]: {
    component: AndroidBackHandleHOCComponent(Flag.component),
    options: Flag.options,
  },
};

export const settingRoute = {
  ...otherRoute,
  more: {
    component: AndroidBackHandleHOCComponent(More.component),
    options: More.options,
  },
};

export const route = {
  // login: { screen: LoginView },
};
