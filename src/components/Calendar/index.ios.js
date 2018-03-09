/**
 * Created by lintong on 2017/5/27.
 * @flow
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    ListView,
    ScrollView
} from 'react-native'

let { width } = Dimensions.get('window');
import DateBoard from './DateBoard'

export default class Calendar extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            year: this.props.date.getFullYear(),
            month: this.props.date.getMonth(),
            date: '',
            staticYear: this.props.date.getFullYear(),
            staticMonth: this.props.date.getMonth(),
            staticDate: this.props.date.getDate(),
            nextMonthYear: this.props.date.getFullYear(),
            nextMonth: this.props.date.getMonth(),
        }
    }

    state: {};
    static propTypes = {};
    static defaultProps = {};


    componentDidMount() {
        this.move()
    };



    componentWillMount() {
        this.monthDay = [31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    };


    isLeap(year) {
        return ((year % 100 === 0) ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0) ? 1 : 0);
    };

    selectDay = (d) => {
        this.setState({
            date: d
        })
        // this.fetchData()
    };


    myScroll(event) {
        let scrollX = event.nativeEvent.contentOffset.x;
        if (scrollX > width) {
            this.nextMonth()
        } else if (scrollX < width) {
            this.prev()
        } else {

        }
        this.refs.trueScroll.scrollTo({ x: width, y: 0, animated: false })
        // this.fetchData()

    };


    move = () => {
        const year = this.state.year
        let month = this.state.month + 1

        const nextMonth = month === 12 ? 1:month +1
        const nextYear  = month === 12 ? year+1 :year

            month = month < 10 ? '0' + month : '' + month
        const firstDay = `${year}-${month}-01`
        const lastDay = `${nextYear}-${nextMonth}-01`
        this.props.move && this.props.move(firstDay,lastDay)
    }

    nextMonth() {
        //let monthDay = [31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (this.state.month === 11) {
            if (this.state.date > this.monthDay[0]) {
                this.setState({
                    date: this.monthDay[0]
                })
            }
            this.setState({
                year: this.state.year + 1,
                month: 0,
            }, this.move)
        } else {
            if (this.state.date > this.monthDay[this.state.month + 1]) {
                this.setState({
                    date: this.monthDay[this.state.month + 1]
                })
            }
            this.setState({
                month: this.state.month + 1,
            }, this.move)
        }
    };

    prev() {
        let monthDay = [31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (this.state.month === 0) {
            if (this.state.date > this.monthDay[11]) {
                this.setState({
                    date: this.monthDay[11]
                })
            }
            this.setState({
                year: this.state.year - 1,
                month: 11,
            }, this.move)
        } else {
            if (this.state.date > this.monthDay[this.state.month - 1]) {
                this.setState({
                    date: this.monthDay[this.state.month - 1]
                })
            }

            const month = this.state.month - 1
            this.setState({
                month: month
            }, this.move)

        }
    }


    goTo = (direction) => {
        if (direction == 'left') {
            this.refs.trueScroll.scrollTo({ x: 0, y: 0, animated: true })

        } else {
            this.refs.trueScroll.scrollTo({
                x: 2 * Dimensions.get('window').width,
                y: 0,
                animated: true
            })
        }
    }

    render() {
        return (
            <View style={[this.props.style, styles.wrap]}>
                <View style={styles.dayTitle}>
                    <View style={styles.dayTimeTouch}>
                        <TouchableOpacity onPress={() => this.goTo('left')}>
                            <View style={styles.leftBtn}/>
                        </TouchableOpacity>
                        <Text style={styles.t1}>
                            {this.state.year + '年' + (this.state.month + 1) + '月'}
                        </Text>
                        <TouchableOpacity onPress={() => this.goTo('right')}>
                            <View style={styles.rightBtn}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.dateTitle}>
                    <Text style={styles.dateTitleText}>日</Text>
                    <Text style={styles.dateTitleText}>一</Text>
                    <Text style={styles.dateTitleText}>二</Text>
                    <Text style={styles.dateTitleText}>三</Text>
                    <Text style={styles.dateTitleText}>四</Text>
                    <Text style={styles.dateTitleText}>五</Text>
                    <Text style={styles.dateTitleText}>六</Text>
                </View>
                <ScrollView horizontal={true} contentOffset={{ x: width, y: 0 }}
                            bounces={false} onMomentumScrollEnd={event => this.myScroll(event)}
                            ref="trueScroll"
                            showsHorizontalScrollIndicator={false} pagingEnabled={true}>
                    <DateBoard year={this.state.year} month={this.state.month - 1}
                               date={this.state.date}
                               selectDay={this.selectDay.bind(this)} isLeap={this.isLeap}
                               fetchData={this.props.fetchData} busyDay={this.props.busyDay}/>
                    <DateBoard year={this.state.year} month={this.state.month}
                               date={this.state.date}
                               selectDay={this.selectDay.bind(this)} isLeap={this.isLeap}
                               fetchData={this.props.fetchData} busyDay={this.props.busyDay}/>
                    <DateBoard year={this.state.year} month={this.state.month + 1}
                               date={this.state.date}
                               selectDay={this.selectDay.bind(this)} isLeap={this.isLeap}
                               fetchData={this.props.fetchData} busyDay={this.props.busyDay}/>

                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrap: {
        backgroundColor: 'white',
    },
    dayTitle: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e9eef4',
    },
    dateTitle: {
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomWidth: .5,
        borderColor: '#ddd',
        // backgroundColor: '#ecedee'
    },
    dateTitleText: {
        width: width / 7 - 1,
        textAlign: 'center',
        fontSize: 17,
    },
    dayTimeTouch: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftBtn: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#007ddd',
        transform: [{ rotate: '135deg' }],
        width: 10,
        height: 10,
        marginHorizontal: 40,
        marginVertical: 10,

    },
    rightBtn: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderRightWidth: StyleSheet.hairlineWidth * 2,
        borderColor: '#007ddd',
        transform: [{ rotate: '315deg' }],
        width: 10,
        height: 10,
        marginHorizontal: 40,
        marginVertical: 10,
    },
    t1: {
        fontSize: 17
    },
    closeBtn: {},
    closeText: {
        marginHorizontal: 20,
        fontSize: 18,
        marginTop: 15,
        color: '#007ddd'
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#e9eef4'
    }
})