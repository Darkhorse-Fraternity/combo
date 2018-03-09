import CalendarIOS from './index.android'
import CalendarAndroid from './index.android'
import {Platform} from 'react-native'

export default Platform.OS == 'ios' ?CalendarIOS:CalendarAndroid