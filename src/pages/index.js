import { Platform } from 'react-native'

import Home from './Home'
import Creat from './NewCard/CardConfig/Creat'
import NewCard from './NewCard'
import Record from './Record'
import OptionView from './NewCard/CardConfig/OptionView'
import Publish from './Publish/index'
import PublishDetail from './Publish/Detail'
import Serve from './Publish/Serve'
import LoginView from './PersonInfo/Login/LoginView'
import PersonCenter from './PersonInfo/PersonCenter'
import PersonInfo from './PersonInfo'
import RecordDetail from './Record/Detail'
import Feedback from './PersonInfo/Feedback'
import Publishing from './Publish/Publishing'
import CardInfo from './NewCard/CardInfo'
import RComment from './Record/RComment'
import CardDetail from './Card/Detail'
import Followee from './PersonInfo/Follow/Followee'
import Follower from './PersonInfo/Follow/Follower'
import Following from './PersonInfo/Follow/Following'
import CardUse from './NewCard/CardUse'
import CourseChoose from './Course/Choose'
import CourseCreat from './Course/Creat'
import CourseRelease from './Course/Release'
import PPTDescribe from '../components/Form/Course/ppt/PPTDescribe'
import CardSetting from './Card/Settings'
import Earnings from './Order/Earnings'
import Cash from './Order/Cash'
import Remind from './PersonInfo/Remind'


export const otherRoute = {
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
  following: { screen: Following },
  creat: { screen: Creat, path: 'combo/:Creat' },
  newCard: { screen: NewCard },
  record: { screen: Record },
  optionView: { screen: OptionView },
  publish: { screen: Publish },
  publishDetail: { screen: PublishDetail },
  serve: { screen: Serve },
  personInfo: { screen: PersonInfo },
  feedback: { screen: Feedback },
  publishing: { screen: Publishing },
  cardInfo: { screen: CardInfo },
  rcomment: { screen: RComment },
  cardDetail: { screen: CardDetail },
  cardUse: { screen: CardUse },
  personCenter: { screen: PersonCenter },
  pptDescribe: { screen: PPTDescribe }
}

export const homeRoute = {
  home: { screen: Home },
  ...otherRoute
}

export const settingRoute = {
  ...otherRoute
}


export const route = {
  login: { screen: LoginView },
}


export const tabRoute = {
  home: {
    screen: Home,
    path: '',
  },
  personCenter: {
    screen: PersonCenter,
    path: '',
  },
}

export const initialRouteName = {
  initialRouteName: 'home',
}

export const tabiCon = {
  Home: {
    label: "Home",
    color: '#F0C98B',
    activityColor: '#F0C98B',
    icon: 'md-sunny'
  },
  PersonCenter: {
    label: "Setting",
    color: '#F0C98B',
    activityColor: '#F0C98B',
    icon: "ios-happy"
  },

}


