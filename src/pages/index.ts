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

export const otherRoute = {
  web: {screen: WebView,options:WebView.navigationOptions},
  search: {screen: Search,options:Search.navigationOptions},
  tool: {screen: Tool},
  FlagRecord: {screen: FlagRecord,options:FlagRecord.navigationOptions},
  earnings: {screen: Earnings,options:Earnings.navigationOptions},
  remind: {screen: Remind,options:Remind.navigationOptions},
  cash: {screen: Cash,options:Cash.navigationOptions},
  recordDetail: {screen: RecordDetail,options:RecordDetail.navigationOptions},
  cardSetting: {screen: CardSetting,options:CardSetting.navigationOptions},
  followee: {screen: Followee,options:Followee.navigationOptions, path: 'combo/:Followee'},
  follower: {screen: Follower,options:Follower.navigationOptions},
  follow: {screen: Follow,options:Follow.navigationOptions},
  following: {screen: Following,options:Following.navigationOptions},
  creat: {screen: Creat,options:Creat.navigationOptions, path: 'combo/:Creat'},
  newCard: {screen: NewCard,options:NewCard.navigationOptions},
  record: {screen: Record,options:Record.navigationOptions},
  cardConfig: {screen: CardConfig,options:CardConfig.navigationOptions},
  account: {screen: Account},
  feedback: {screen: Feedback,options:Feedback.navigationOptions},
  publishing: {screen: Publishing,options:Publishing.navigationOptions},
  cardInfo: {screen: CardInfo,options:CardInfo.navigationOptions},
  rcomment: {screen: RComment,options:RComment.navigationOptions},
  card: {screen: Card,options:Card.navigationOptions},
  cardUse: {screen: CardUse,options:CardUse.navigationOptions},
  more: {screen: More,options:More.navigationOptions},
  login: {screen: LoginView,options:LoginView.navigationOptions},
  flagDetail: {screen: FlagDetail,options:FlagDetail.navigationOptions},
  FRDetail: {screen: FRDetail,options:FRDetail.navigationOptions},
  cirlcleSetting: {screen: CirlcleSetting,options:CirlcleSetting.navigationOptions},
  // pptDescribe: { screen: PPTDescribe },
};

export const punchRoute = {
  punch: {screen: Punch,options:Punch.navigationOptions},
  ...otherRoute,
};

export const habitRoute = {
  habit: {screen: Habit,options:Habit.navigationOptions},
  ...otherRoute,
};

export const flagRoute = {
  flag: {screen: Flag,options:Flag.navigationOptions},
  ...otherRoute,
};

export const settingRoute = {
  ...otherRoute,
};

export const route = {
  // login: { screen: LoginView },
};
