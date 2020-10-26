/**
 * Created by lintong on 2017/5/27.
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import ViewPagerAndroid, {
  ViewPagerOnPageSelectedEventData,
} from '@react-native-community/viewpager';
import DateBoard from './DateBoard';

const { width } = Dimensions.get('window');

interface CalendarProps<ItemT> {
  load: boolean;
  doneDay: (item: ItemT) => void; // 点击打卡
  color: string;
  date: Date;
  canceDay: (item: ItemT) => void; // 取消打卡
  busyDay?: ItemT[]
  move: (first: string, last: string) => void;  // 加载当前月
}

export default class Calendar<ItemT> extends PureComponent<CalendarProps<ItemT>> {
  constructor(props: any) {
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
    };
  }

  state: {};

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    this.monthDay = [
      31,
      28 + this.isLeap(this.state.year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    // this.move()
  }

  isLeap(year) {
    return year % 100 === 0
      ? year % 400 === 0
        ? 1
        : 0
      : year % 4 === 0
        ? 1
        : 0;
  }

  // selectDay(d) {
  //   // this.setState({
  //   //   date: d
  //   // })
  //   // this.fetchData()
  //   this.props.selectDay(d);
  // }

  myScroll(
    event: NativeSyntheticEvent<
      ViewPagerOnPageSelectedEventData | NativeScrollEvent
    >,
  ) {
    if (Platform.OS === 'ios') {
      const scrollX = event.nativeEvent.contentOffset.x;
      if (scrollX > width) {
        this.nextMonth();
      } else if (scrollX < width) {
        this.prev();
      } else {
      }
      this.refs.trueScroll.scrollTo({ x: width, y: 0, animated: false });
    } else {
      // console.log('event', event);
      const nativeEvent = event.nativeEvent as ViewPagerOnPageSelectedEventData;
      if (nativeEvent.position === 2) {
        this.nextMonth();
      }
      if (nativeEvent.position === 0) {
        this.prev();
      }
      if (nativeEvent.position !== 1) {
        this.refs.trueViewPager.setPageWithoutAnimation(1);
      }
    }
  }

  nextMonth() {
    // let monthDay = [31, 28 + this.isLeap(this.state.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (this.state.month === 11) {
      if (this.state.date > this.monthDay[0]) {
        this.setState({
          date: this.monthDay[0],
        });
      }
      this.setState(
        {
          year: this.state.year + 1,
          month: 0,
        },
        this.move,
      );
    } else {
      if (this.state.date > this.monthDay[this.state.month + 1]) {
        this.setState({
          date: this.monthDay[this.state.month + 1],
        });
      }
      this.setState(
        {
          month: this.state.month + 1,
        },
        this.move,
      );
    }
  }

  prev() {
    const monthDay = [
      31,
      28 + this.isLeap(this.state.year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    if (this.state.month === 0) {
      if (this.state.date > this.monthDay[11]) {
        this.setState({
          date: this.monthDay[11],
        });
      }
      this.setState(
        {
          year: this.state.year - 1,
          month: 11,
        },
        this.move,
      );
    } else {
      if (this.state.date > this.monthDay[this.state.month - 1]) {
        this.setState({
          date: this.monthDay[this.state.month - 1],
        });
      }
      this.setState(
        {
          month: this.state.month - 1,
        },
        this.move,
      );
    }
  }


  goTo = direction => {
    const that = this;
    if (direction === 'left') {
      that.refs.trueViewPager.setPage(0);
      this.prev();
    } else {
      that.refs.trueViewPager.setPage(2);
      this.nextMonth();
    }

    this.timer = setTimeout(
      () => that.refs.trueViewPager.setPageWithoutAnimation(1),
      1000,
    );
    // that.refs.trueViewPager.setPageWithoutAnimation(1)
  };

  move = () => {
    const year = `${this.state.year}`;
    let month = this.state.month + 1;
    month = month < 10 ? `0${month}` : `${month}`;
    const firstDay = `${year}-${month}-01`;
    const lastDay = `${year}-${month}-${this.monthDay[this.state.month]}`;
    this.props.move && this.props.move(firstDay, lastDay);
  };

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  renderDateBorad = month => (
    <DateBoard
      color={this.props.color}
      key={month}
      year={this.state.year}
      month={month}
      date={this.state.date}
      selectDay={this.props.doneDay}
      isLeap={this.isLeap}
      fetchData={this.props.canceDay}
      busyDay={this.props.busyDay}
    />
  );

  renderMain = () => {
    const pageMonth = [
      this.state.month - 1,
      this.state.month,
      this.state.month + 1,
    ];

    if (Platform.OS === 'ios') {
      return (
        <ScrollView
          horizontal
          contentOffset={{ x: width, y: 0 }}
          bounces={false}
          onMomentumScrollEnd={event => this.myScroll(event)}
          ref="trueScroll"
          showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {pageMonth.map(mouth => this.renderDateBorad(mouth))}
        </ScrollView>
      );
    }
    return (
      <ViewPagerAndroid
        style={{ height: 250, width }}
        initialPage={1}
        onPageSelected={event => this.myScroll(event)}
        ref="trueViewPager">
        <View key="1">{this.renderDateBorad(pageMonth[0])}</View>
        <View key="2">{this.renderDateBorad(pageMonth[1])}</View>
        <View key="3">{this.renderDateBorad(pageMonth[2])}</View>
      </ViewPagerAndroid>
    );
  };

  render() {
    const month = [
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十',
      '十一',
      '十二',
    ];
    const dateTitle = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    // console.log('this.syaye', this.state);

    return (
      <View style={[this.props.style]}>
        <View style={styles.dayTitle}>
          {/* <TouchableOpacity onPress={()=>this.goTo('left')}> */}
          {/* <View style={styles.leftBtn}/> */}
          {/* </TouchableOpacity> */}
          <Text style={styles.t1}>
            {`${this.state.year} ${month[this.state.month]}月  `}
          </Text>
          <ActivityIndicator
            style={{ marginLeft: 0 }}
            color={'gray'}
            animating={this.props.load}
          />
          {/* <TouchableOpacity onPress={()=>this.goTo('right')}> */}
          {/* <View style={styles.rightBtn}/> */}
          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.dateTitle}>
          {dateTitle.map(title => (
            <Text key={title} style={styles.dateTitleText}>
              {title}
            </Text>
          ))}
        </View>

        {this.renderMain()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dayTitle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTitle: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 12,
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
    alignItems: 'center',
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
    fontSize: 17,
  },
  closeBtn: {},
  closeText: {
    marginHorizontal: 20,
    fontSize: 18,
    marginTop: 15,
    color: '#007ddd',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: '#e9eef4'
  },
});
