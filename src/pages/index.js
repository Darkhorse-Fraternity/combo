import Setting from './Setting'
import Home from './Home'
import Creat from './NewCard/Creat'
import NewCard from './NewCard'
import Record from './Record'
import OptionView from './NewCard/OptionView'
import RecordDetail from './Record/Detail'
import Publish from './Publish/index'
import PublishDetail from './Publish/Detail'
import Serve from './Publish/Serve'
import LoginView from './Setting/LoginView'
import PersonCenter from './PersonInfo/PersonCenter'
import PersonInfo from './PersonInfo'
import NickName from './PersonInfo/NickName'
import Feedback from './Setting/Feedback'
import Publishing from './Publish/Publishing'
import CardInfo from './NewCard/CardInfo'
import RComment from './Record/RComment'

export const route = {
    Login: {screen: LoginView},
    Home: {screen: Home},
    Setting: {screen: Setting},
    Creat: {screen: Creat},
    NewCard: {screen: NewCard},
    Record: {screen: Record},
    OptionView: {screen: OptionView},
    RecordDetail: {screen: RecordDetail},
    Publish: {screen: Publish},
    PublishDetail: {screen: PublishDetail},
    Serve: {screen: Serve},
    PersonCenter: {screen: PersonCenter},
    PersonInfo: {screen: PersonInfo},
    NickName: {screen: NickName},
    Feedback: {screen: Feedback},
    Publishing: {screen: Publishing},
    CardInfo: {screen: CardInfo},
    RComment: {screen: RComment}
}

export const tabRoute = {
    Home: {
        screen: Home,
        path: '',
    },
    PersonCenter: {
        screen: PersonCenter,
        path: '',
    },
}

export const initialRouteName = {
    initialRouteName: 'Home',
}

export const tabiCon = {
    Home: {
        label: "Home",
        color: '#F3AC41',
        activityColor: '#F0C98B',
        icon: 'md-sunny'
    },
    PersonCenter: {
        label: "Setting",
        color: '#F3AC41',
        activityColor: '#F0C98B',
        icon: "ios-happy"
    },

}