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
    ViewPagerAndroid,
    ActivityIndicator,
    Platform,
    ScrollView
} from 'react-native'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
let { width } = Dimensions.get('window');
import DateBoard from './DateBoard'
import Pop from '../Pop'

export default class Calendar extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
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
        this.monthDay = [31, 28 + this.isLeap(this.state.year),
            31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.move()

    };
    

    isLeap(year) {
        return ((year % 100 === 0) ?
            (year % 400 === 0 ? 1 : 0) :
            (year % 4 === 0) ? 1 : 0);
    };

    selectDay(d) {
        this.setState({
            date: d
        })
        // this.fetchData()
    };


    myScroll(event) {
        if (Platform.OS === 'ios') {
            let scrollX = event.nativeEvent.contentOffset.x;
            if (scrollX > width) {
                this.nextMonth()
            } else if (scrollX < width) {
                this.prev()
            } else {

            }
            this.refs.trueScroll.scrollTo({ x: width, y: 0, animated: false })

        } else {
            if (event.nativeEvent.position === 2) {
                this.nextMonth()
            }
            if (event.nativeEvent.position === 0) {
                this.prev()
            }
            this.refs.trueViewPager.setPageWithoutAnimation(1)
        }

    };


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
        if (this.state.month == 0) {
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
            this.setState({
                month: this.state.month - 1,
            }, this.move)
        }
    }


    fetchData() {

    };

    goTo = (direction) => {
        var that = this;
        if (direction === 'left') {
            that.refs.trueViewPager.setPage(0)
            this.prev()

        } else {
            that.refs.trueViewPager.setPage(2)
            this.nextMonth()
        }

        this.timer = setTimeout(() =>
                that.refs.trueViewPager.setPageWithoutAnimation(1),
            1000);
        // that.refs.trueViewPager.setPageWithoutAnimation(1)
    }

    move = () => {
        const year = this.state.year + ""
        let month = this.state.month + 1
        month = month < 10 ? '0' + month : '' + month
        const firstDay = `${year}-${month}-01`
        const lastDay = `${year}-${month}-${this.monthDay[this.state.month]}`
        this.props.move && this.props.move(firstDay, lastDay)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer2)
    }


    renderDateBorad = (month) => {
        return (
            <DateBoard
                key={month}
                year={this.state.year}
                month={month}
                date={this.state.date}
                selectDay={this.selectDay.bind(this)}
                isLeap={this.isLeap}
                fetchData={this.props.fetchData}
                busyDay={this.props.busyDay}/>
        )
    }

    renderMain = () => {
        const pageMonth = [this.state.month - 1, this.state.month, this.state.month + 1]

        if (Platform.OS === 'ios') {
            return (
                <ScrollView horizontal={true}
                            style={{ paddingHorizontal: 10 }}
                            contentOffset={{ x: width, y: 0 }}
                            bounces={false}
                            onMomentumScrollEnd={event => this.myScroll(event)}
                            ref="trueScroll"
                            showsHorizontalScrollIndicator={false} pagingEnabled={true}>
                    {pageMonth.map(mouth => this.renderDateBorad(mouth))}
                </ScrollView>
            )
        } else {
            return (
                <ViewPagerAndroid style={{ height: 280, width: width, }}
                                  initialPage={1}
                                  onPageSelected={event => this.myScroll(event)}
                                  ref="trueViewPager">
                    <View  style={{paddingHorizontal: 10}}>
                        {this.renderDateBorad(pageMonth[0])}
                    </View>
                    <View  style={{paddingHorizontal: 10}}>
                        {this.renderDateBorad(pageMonth[1])}
                    </View>
                    <View  style={{paddingHorizontal: 10}}>
                        {this.renderDateBorad(pageMonth[2])}
                    </View>
                </ViewPagerAndroid>
            )
        }
    }


    render() {
        const month = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
        const dateTitle = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']


        return (
            <View style={[this.props.style, styles.wrap]}>
                <View style={styles.dayTitle}>
                    <View style={styles.dayTimeTouch}>
                        {/*<TouchableOpacity onPress={()=>this.goTo('left')}>*/}
                        {/*<View style={styles.leftBtn}/>*/}
                        {/*</TouchableOpacity>*/}
                        <Text style={styles.t1}>
                            {(month[this.state.month]) + '月' + ' ' + this.state.year}
                        </Text>
                        <ActivityIndicator style={{ marginLeft: 10 }} animating={this.props.load}/>
                        {/*<TouchableOpacity onPress={()=>this.goTo('right')}>*/}
                        {/*<View style={styles.rightBtn}/>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </View>
                <View style={styles.dateTitle}>
                    {dateTitle.map(title =>
                        (<Text key={title}
                               style={styles.dateTitleText}>
                            {title}
                        </Text>))}

                </View>

                {this.renderMain()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrap: {},
    dayTitle: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateTitle: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10,
        // paddingBottom: 10,
        // borderBottomWidth: .5,
        // borderColor: '#ddd',
    },
    dateTitleText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15,
        color: 'rgb(100,100,100)',
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
        // backgroundColor: '#e9eef4'
    }
})