import {Theme as FormTheme} from 'react-native-clean-form'
import {StyleSheet,Dimensions} from 'react-native'
const width = Dimensions.get('window').width
const height =Dimensions.get('window').height
export default {
    ...FormTheme,
    hairlineWidth:StyleSheet.hairlineWidth,
    hairlineColor:'rgb(200,200,200)',
    contentColor: 'white',
    mainColor: '#F3AC41',
    mainLightColor: '#F0C98B',
    width:width,
    height:height,
    normalBtn:{
        color:'black',
        disabledColor:'rgb(150,150,150)',
        fontSize:15,
        activityIndicatorColor:'grey'
    },
    calendar: {
        dotColor:'#51c332',
        selectedDayBackgroundColor:'#F3AC41',
        todayTextColor:'#51c332',
        agendaTodayColor:'#51c332',
    }

}


