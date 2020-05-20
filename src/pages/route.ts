import { RouteType } from './interface';

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
import Publishing from './Publish/Publishing';
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
import WebView from '../components/Base/BaseWebView';
import Flag from './Flag';
import FlagDetail from './Flag/Detail';
import FRDetail from './Flag/FRDetail';
import Tool from './More/Tool';
import Search from './NewCard/Search';


export const otherRoute:RouteType = {
  web: {component: WebView,options:WebView.navigationOptions},
  search: {component: Search,options:Search.navigationOptions},
  tool: {component: Tool},
  FlagRecord: {component: FlagRecord,options:FlagRecord.navigationOptions},
  earnings: {component: Earnings,options:Earnings.navigationOptions},
  remind: {component: Remind,options:Remind.navigationOptions},
  cash: {component: Cash,options:Cash.navigationOptions},
  recordDetail: {component: RecordDetail,options:RecordDetail.navigationOptions},
  cardSetting: {component: CardSetting,options:CardSetting.navigationOptions},
  followee: {component: Followee,options:Followee.navigationOptions},
  follower: {component: Follower,options:Follower.navigationOptions},
  follow: {component: Follow,options:Follow.navigationOptions},
  following: {component: Following,options:Following.navigationOptions},
  creat: {component: Creat,options:Creat.navigationOptions},
  newCard: {component: NewCard,options:NewCard.navigationOptions},
  record: {component: Record,options:Record.navigationOptions},
  cardConfig: {component: CardConfig,options:CardConfig.navigationOptions},
  account: {component: Account},
  feedback: {component: Feedback,options:Feedback.navigationOptions},
  publishing: {component: Publishing,options:Publishing.navigationOptions},
  cardInfo: {component: CardInfo,options:CardInfo.navigationOptions},
  rcomment: {component: RComment,options:RComment.navigationOptions},
  card: {component: Card,options:Card.navigationOptions},
  cardUse: {component: CardUse,options:CardUse.navigationOptions},
  more: {component: More,options:More.navigationOptions},
  login: {component: LoginView,options:LoginView.navigationOptions},
  flagDetail: {component: FlagDetail,options:FlagDetail.navigationOptions},
  FRDetail: {component: FRDetail,options:FRDetail.navigationOptions},
  cirlcleSetting: CirlcleSetting,
  // pptDescribe: { screen: PPTDescribe },
};

export const punchRoute:RouteType = {
  ...otherRoute,
  punch: {component: Punch,options:Punch.navigationOptions},
};

export const habitRoute:RouteType  = {
  ...otherRoute,
  habit: {component: Habit,options:Habit.navigationOptions},
};

export const flagRoute:RouteType  = {
  ...otherRoute,
  flag: {component: Flag,options:Flag.navigationOptions},
};

export const settingRoute = {
  ...otherRoute,
};

export const route = {
  // login: { screen: LoginView },
};
