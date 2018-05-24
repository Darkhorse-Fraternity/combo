'use strict';

import {
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    PixelRatio,
    Image,
    TouchableNativeFeedback,
    Platform
} from 'react-native';


let { width } = Dimensions.get('window');
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import theme from '../../Theme'
import Button from '../../components/Button'

export default class DateBoard extends React.Component {
    static defaultProps = {
        year: 2018,
        month: 0,
        busyDay: {
            "2018": {
                "3": [1, 22],
                "2": [3, 22],
                "6": [4, 22],
            }
        }
    };
    static propTypes = {
        year: PropTypes.number,
        month: PropTypes.number,
        selectDay: PropTypes.func,
        isLeap: PropTypes.func,
        date: PropTypes.string,
        busyDay: PropTypes.object,
        fetchData: PropTypes.func,
    };

    constructor(props) {
        super(props);
        // this.props.selectDay = this.props.selectDay.bind(this)
    };

    isLeap(year) {
        let res;
        return ((year % 100 == 0) ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0) ? 1 : 0);
    };

    getNowDay(year,month,day){
        const monthStr = month < 10 ? '0' + month : '' + month
        const dayStr = day < 10 ? '0' + day : '' + day
        return ''+ year +'-'+ monthStr +'-'+dayStr


    }


    renderDate() {

        let myMonth, myYear, lastMonth = 0;
        if (this.props.month === 12) {
            myMonth = 0;
            myYear = this.props.year + 1;
        } else if (this.props.month === -1) {
            myMonth = 11;
            myYear = this.props.year - 1;
        } else {
            myMonth = this.props.month;
            myYear = this.props.year
        }

        const busyDay = this.props.busyDay

        lastMonth = myMonth == 0 ? 11 : myMonth - 1;

        let fd = new Date(myYear, myMonth, 1);
        let firstDay = fd.getDay();
        let monthDay = [31, 28 + this.props.isLeap(this.props.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let arr = [];
        for (let i = 0; i < firstDay; i++) {
            arr.push(<View key={-i} style={styles.dateBox}>
                <Text style={styles.dateText2}>{monthDay[lastMonth] - firstDay + i + 1 + ''}</Text>
            </View>)
        }


        const background = TouchableNativeFeedback.SelectableBackgroundBorderless &&
            TouchableNativeFeedback.SelectableBackgroundBorderless()

        for (var i = 1; i < monthDay[myMonth] + 1; i++) {

            const now  = this.getNowDay(myYear,myMonth+1,i)

            // console.log('test:', i);
            if (this.props.date === now) {
                arr.push(
                    <Button
                        background={ background}
                        onPress={()=>{
                        this.props.selectDay(now)
                        busyDay[now] &&
                        this.props.fetchData && this.props.fetchData(busyDay[now])
                    }}
                                      key={i}
                                      style={styles.dateBox}>
                        <View style={[styles.selected, { backgroundColor: theme.mainColor }]}>
                            <Text style={[styles.dateText, {
                                color: '#fff',
                                fontWeight: 'bold'
                            }]}>{i + ""}</Text>
                        </View>
                    </Button>
                )
            } else if (busyDay[now]) {
                const d = i
                arr.push(
                    <Button
                        background={background}
                        onPress={() => {
                        this.props.selectDay(now)
                        this.props.fetchData && this.props.fetchData(busyDay[now])
                    }}
                                      key={i}
                                      style={styles.dateBox}>
                        <View style={[styles.selected, { backgroundColor: theme.mainLightColor }]}>
                            <Text style={[styles.dateText, {
                                color: 'white',
                                fontWeight: 'bold'
                            }]}>{i + ""}</Text>
                        </View>
                    </Button>
                )
            } else {
                arr.push(
                    <Button
                        background={background}
                        onPress={this.props.selectDay.bind(this, now)}
                                      key={i}
                                      style={styles.dateBox}>
                        <View style={[styles.selected]}>
                            <Text style={[styles.dateText]}>{i + ""}</Text>
                        </View>
                    </Button>
                )
            }
        }
        const lastDay = 43 - firstDay - monthDay[myMonth]
        for (let i = 1; i < lastDay; i++) {
            arr.push(<View key={i + 100} style={styles.dateBox}>
                <Text style={styles.dateText2}>{i}</Text>
            </View>)
        }

        return arr;
    };

    render() {
        return (

            <View style={styles.dateBoard}>
                {this.renderDate()}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    dateBoard: {
        marginTop:10,
        width: width,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dateBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 7 - 1,
        height: 45,
    },
    dateText: {
        fontSize: 17,
    },
    dateText2: {
        fontSize: 17,
        color: 'rgb(150,150,150)'
    },

    selected: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    addBtn: {
        width: width,
        height: 60,
    },
    point: {
        position: 'absolute',
        left: 19,
        top: 3,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#f00'
    }
})
