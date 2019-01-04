import { Platform } from 'react-native'

import Habit from './Habit'
import Creat from './NewCard/CardConfig/Creat'
import NewCard from './NewCard'
import Record from './Record'
import CardConfig from './NewCard/CardConfig'
import LoginView from './More/Login/LoginView'
import More from './More'
import Account from './More/Account'
import RecordDetail from './Record/Detail'
import Feedback from './More/Feedback/Feedback'
import Publishing from './Publish/Publishing'
import CardInfo from './NewCard/CardInfo'
import RComment from './Record/RComment'
import Card from './Card'
import Followee from './More/Follow/Followee'
import Follower from './More/Follow/Follower'
import Follow from './More/Follow'
import Following from './More/Follow/Following'
import CardUse from './NewCard/CardUse'
import CourseChoose from './Course/Choose'
import CourseCreat from './Course/Creat'
import CourseRelease from './Course/Release'
// import PPTDescribe from '../components/Form/Course/ppt/PPTDescribe'
import CardSetting from './Card/Settings'
import Earnings from './Order/Earnings'
import Cash from './Order/Cash'
import Remind from './More/Remind'
import Punch from './Punch'
import WebView from '../components/Base/BaseWebView'
import Flag from './Flag'
import FlagDetail from './Flag/Detail'
export const otherRoute = {
  web: { screen: WebView },
  earnings: { screen: Earnings },
  remind: { screen: Remind },
  cash: { screen: Cash },
  recordDetail: { screen: RecordDetail },
  cardSetting: { screen: CardSetting },
  courseChoose: { screen: CourseChoose },
  courseCreat: { screen: CourseCreat },
  courseRelease: { screen: CourseRelease },
  followee: { screen: Followee, path: 'combo/:Followee' },
  follower: { screen: Follower },
  follow: { screen: Follow },
  following: { screen: Following },
  creat: { screen: Creat, path: 'combo/:Creat' },
  newCard: { screen: NewCard },
  record: { screen: Record },
  cardConfig: { screen: CardConfig },
  account: { screen: Account },
  feedback: { screen: Feedback },
  publishing: { screen: Publishing },
  cardInfo: { screen: CardInfo },
  rcomment: { screen: RComment },
  card: { screen: Card },
  cardUse: { screen: CardUse },
  more: { screen: More },
  login: { screen: LoginView },
  flagDetail:{screen: FlagDetail }
  // pptDescribe: { screen: PPTDescribe },
}

export const punchRoute = {
  punch: { screen: Punch },
  ...otherRoute
}

export const habitRoute = {
  habit: { screen: Habit },
  ...otherRoute
}

export const flagRoute = {
  flag: { screen: Flag },
  ...otherRoute
}

export const settingRoute = {
  ...otherRoute
}


export const route = {
  // login: { screen: LoginView },
}






