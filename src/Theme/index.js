import {Theme as FormTheme} from 'react-native-clean-form'
import {StyleSheet,Dimensions} from 'react-native'
const width = Dimensions.get('window').width
const height =Dimensions.get('window').height
export default {
    ...FormTheme,
    hairlineWidth:StyleSheet.hairlineWidth,
    hairlineColor:'rgb(200,200,200)',
    contentColor: 'white',
    mainColor: '#fdd83c',
    mainLightColor: '#fdd83c',
    textinputbackgroundColor:'#f6f7f9',

    titleBackViewColor:'#f6f7f9',
    buttonItem:'#e7eced',
    showItem:'#f5f8f6',
    disabledColor:'#bfc2c7',
    sureColor:'#66bb6a',
    headerButtonColor:'#31d930',
    lightBlue:'#afd2ef',
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
        selectedDayBackgroundColor:'#fdd83c',
        todayTextColor:'#51c332',
        agendaTodayColor:'#51c332',
    }

}


