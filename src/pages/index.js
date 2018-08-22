import {Platform} from 'react-native'


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

export const otherRoute = {
    Earnings:{screen:Earnings},
    Cash:{screen:Cash},
    RecordDetail:{screen:RecordDetail},
    CardSetting:{screen:CardSetting},
    CourseChoose:{screen: CourseChoose},
    CourseCreat:{screen: CourseCreat},
    CourseRelease:{screen: CourseRelease},
    Followee:{screen: Followee,path:'combo/:Followee'},
    Follower:{screen: Follower},
    Following:{screen: Following},
    Creat: {screen: Creat,path:'combo/:Creat'},
    NewCard: {screen: NewCard},
    Record: {screen: Record},
    OptionView: {screen: OptionView},
    Publish: {screen: Publish},
    PublishDetail: {screen: PublishDetail},
    Serve: {screen: Serve},
    PersonInfo: {screen: PersonInfo},
    Feedback: {screen: Feedback},
    Publishing: {screen: Publishing},
    CardInfo: {screen: CardInfo},
    RComment: {screen: RComment},
    CardDetail: {screen: CardDetail},
    CardUse: {screen: CardUse},
    PersonCenter: {screen: PersonCenter},
    PPTDescribe: {screen:PPTDescribe}
}

export const homeRoute = {
    Home: {screen: Home},
    ...otherRoute
}

export const settingRoute = {
    ...otherRoute
}


export const route = {
    Login: {screen: LoginView},
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


export const navigationOptions = {
    headerStyle:{
        backgroundColor:'white',
        shadowColor: 'red',
        shadowOpacity: 0.1,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
        },
        borderBottomColor:'#F5FCFF',
        elevation:0,
        paddingTop: (Platform.OS === "ios"  ||  Platform.Version < 20)  ? 0 : 25,
        //headerBackTitle:' '
    },
    headerTintColor:'black',
    headerTitleStyle:{
        color: 'black',
        alignItems:'center',
        fontSize:13,
    },
    headerBackTitle:null,
    gesturesEnabled:true,
}