import {Theme as FormTheme} from 'react-native-clean-form'
import {StyleSheet} from 'react-native'
export default {
    ...FormTheme,
    hairlineWidth:StyleSheet.hairlineWidth,
    hairlineColor:'rgb(200,200,200)',
    contentColor: 'white',
    mainColor: '#F3AC41',
    mainLightColor: '#F0C98B',
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