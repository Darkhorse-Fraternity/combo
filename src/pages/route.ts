import { RouteKey } from './interface';

import Habit from './Habit';
import Creat from './NewCard/CardConfig/Creat';
import NewCard from './NewCard';
import Record from './Record';
import CardConfig from './NewCard/CardConfig';
import LoginView from './More/Login';
import More from './More';
import Account from './More/Account';
import RecordDetail from './Record/Detail';
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
import web from './WebViewPage';
import Flag from './Flag';
import FlagDetail from './Flag/Detail';
import FRDetail from './Flag/FRDetail';
import Tool from './More/Tool';
import Search from './NewCard/Search';
import { AndroidBackHandleHOCComponent } from '../configure/androidBackHandle';
import ClockIn from '../pages/clock-in';
import Test from './test';
import log from './Card/Log';

export const otherRoute = {
  [RouteKey.web]: web,
  [RouteKey.log]: log,
  [RouteKey.clockIn]: ClockIn,
  [RouteKey.test]: Test,
  [RouteKey.search]: Search,
  [RouteKey.tool]: Tool,
  [RouteKey.flagRecord]: FlagRecord,
  [RouteKey.earnings]: Earnings,
  [RouteKey.remind]: Remind,
  [RouteKey.cash]: Cash,
  [RouteKey.recordDetail]: RecordDetail,
  [RouteKey.cardSetting]: CardSetting,
  [RouteKey.followee]: Followee,
  [RouteKey.follower]: Follower,
  [RouteKey.follow]: Follow,
  [RouteKey.following]: Following,
  [RouteKey.creat]: Creat,
  [RouteKey.newCard]: NewCard,
  [RouteKey.record]: Record,
  [RouteKey.cardConfig]: CardConfig,
  [RouteKey.account]: Account,
  [RouteKey.cardInfo]: CardInfo,
  [RouteKey.rcomment]: RComment,
  [RouteKey.card]: Card,
  [RouteKey.cardUse]: CardUse,
  [RouteKey.login]: LoginView,
  [RouteKey.flagDetail]: FlagDetail,
  [RouteKey.FRDetail]: FRDetail,
  [RouteKey.cirlcleSetting]: CirlcleSetting,
  // pptDescribe: { screen: PPTDescribe },
};

export const punchRoute = {
  ...otherRoute,
  [RouteKey.punch]: {
    component: AndroidBackHandleHOCComponent(Punch.component),
    // component: AndroidBackHandleHOCComponent(Test.component),
    options: Punch.options,
  },
};

export const habitRoute = {
  ...otherRoute,
  [RouteKey.habit]: {
    component: AndroidBackHandleHOCComponent(Habit.component),
    options: Habit.options,
  },
};

export const flagRoute = {
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
