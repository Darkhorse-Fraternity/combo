import {Platform} from 'react-native'


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
import CardDetail from './Card/Detail'
import Followee from './PersonInfo/Follow/Followee'
import Follower from './PersonInfo/Follow/Follower'
import Following from './PersonInfo/Follow/Following'
import CardUse from './NewCard/CardUse'

export const otherRoute = {
    Setting: {screen: Setting},
    Followee:{screen: Followee},
    Follower:{screen: Follower},
    Following:{screen: Following},
    Creat: {screen: Creat},
    NewCard: {screen: NewCard},
    Record: {screen: Record},
    OptionView: {screen: OptionView},
    RecordDetail: {screen: RecordDetail},
    Publish: {screen: Publish},
    PublishDetail: {screen: PublishDetail},
    Serve: {screen: Serve},
    PersonInfo: {screen: PersonInfo},
    NickName: {screen: NickName},
    Feedback: {screen: Feedback},
    Publishing: {screen: Publishing},
    CardInfo: {screen: CardInfo},
    RComment: {screen: RComment},
    CardDetail: {screen: CardDetail},
    CardUse: {screen: CardUse},
    PersonCenter: {screen: PersonCenter},
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
    ...homeRoute,
    ...settingRoute,
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
}