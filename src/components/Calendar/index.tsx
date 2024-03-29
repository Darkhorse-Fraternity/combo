/**
 * Created by lintong on 2017/5/27.
 * @flow
 */

import React, { PropsWithChildren, PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from 'react-native';
import ViewPagerAndroid, {
  ViewPagerOnPageSelectedEventData,
} from '@react-native-community/viewpager';
import DateBoard, { DateBoardProps, isLeap } from './DateBoard';
import { StyledTitle } from './style';

export interface CalendarProps<ItemT>
  extends Omit<DateBoardProps<ItemT>, 'year' | 'month' | 'width'> {
  load: boolean;
  fetch: (first: string, last: string) => void; // 加载当前月
}

interface CalendarState {
  year: number;
  month: number;
  staticYear: number;
  staticMonth: number;
  staticDate: number;
  nextMonthYear: number;
  nextMonth: number;
  date: number; //月份
}
export class CalendarClass<ItemT> extends PureComponent<
  CalendarProps<ItemT> & { width: number },
  CalendarState
> {
  timer: number | undefined;
  trueScroll: ScrollView | null | undefined;
  trueViewPager: ViewPagerAndroid | null | undefined;
  constructor(props: CalendarProps<ItemT> & { width: number }) {
    super(props);
    this.state = {
      year: this.props.date.getFullYear(),
      month: this.props.date.getMonth(),
      date: 0,
      staticYear: this.props.date.getFullYear(),
      staticMonth: this.props.date.getMonth(),
      staticDate: this.props.date.getDate(),
      nextMonthYear: this.props.date.getFullYear(),
      nextMonth: this.props.date.getMonth(),
    };
  }

  // state: {};

  // static propTypes = {};

  // static defaultProps = {};
  monthDay: number[] = [
    31,
    28 + isLeap(this.props.date.getFullYear()),
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

  componentDidMount() {
    // this.move()
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
    const { width } = this.props;
    if (Platform.OS === 'ios') {
      const nativeEvent = event.nativeEvent as NativeScrollEvent;
      const scrollX = nativeEvent.contentOffset.x;
      if (scrollX > width) {
        this.nextMonth();
      } else if (scrollX < width) {
        this.prev();
      } else {
      }
      this.trueScroll?.scrollTo({ x: width, y: 0, animated: false });
    } else {
      const nativeEvent = event.nativeEvent as ViewPagerOnPageSelectedEventData;
      if (nativeEvent.position === 2) {
        this.nextMonth();
      }
      if (nativeEvent.position === 0) {
        this.prev();
      }
      if (nativeEvent.position !== 1) {
        this.trueViewPager?.setPageWithoutAnimation(1);
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

  goTo = (direction: 'left' | 'right') => {
    const that = this;
    if (direction === 'left') {
      that.trueViewPager?.setPage(0);
      this.prev();
    } else {
      that.trueViewPager?.setPage(2);
      this.nextMonth();
    }

    this.timer = setTimeout(
      () => that.trueViewPager?.setPageWithoutAnimation(1),
      1000,
    );
    // that.refs.trueViewPager.setPageWithoutAnimation(1)
  };

  move = () => {
    const year = `${this.state.year}`;
    const month = this.state.month + 1;
    const monthString = month < 10 ? `0${month}` : `${month}`;
    const firstDay = `${year}-${monthString}-01`;
    const lastDay = `${year}-${monthString}-${this.monthDay[this.state.month]}`;
    this.props.fetch && this.props.fetch(firstDay, lastDay);
  };

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  renderMain = () => {
    const { month, year } = this.state;
    const { width } = this.props;

    const pageMonth = [month - 1, month, month + 1];

    if (Platform.OS === 'ios') {
      return (
        <ScrollView
          horizontal
          contentOffset={{ x: width, y: 0 }}
          bounces={false}
          onMomentumScrollEnd={(event) => this.myScroll(event)}
          ref={(ref) => (this.trueScroll = ref)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {pageMonth.map((item) => (
            <DateBoard<ItemT>
              key={item}
              month={item}
              {...this.props}
              year={year}
            />
          ))}
        </ScrollView>
      );
    }
    return (
      <ViewPagerAndroid
        style={{ height: 250, width }}
        initialPage={1}
        onPageSelected={(event) => this.myScroll(event)}
        ref={(ref) => (this.trueViewPager = ref)}>
        {pageMonth.map((item, index) => (
          <View key={index}>
            <DateBoard<ItemT> month={item} {...this.props} year={year} />
          </View>
        ))}
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
      <>
        <View style={styles.dayTitle}>
          {/* <TouchableOpacity onPress={()=>this.goTo('left')}> */}
          {/* <View style={styles.leftBtn}/> */}
          {/* </TouchableOpacity> */}
          <StyledTitle>
            {`${this.state.year} ${month[this.state.month]}月  `}
          </StyledTitle>
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
          {dateTitle.map((title) => (
            <Text key={title} style={styles.dateTitleText}>
              {title}
            </Text>
          ))}
        </View>

        {this.renderMain()}
      </>
    );
  }
}

const Calendar = <ItemT extends unknown>({
  calendarRef,
  ...rest
}: PropsWithChildren<
  CalendarProps<ItemT> & {
    calendarRef?: React.RefObject<CalendarClass<ItemT>>;
  }
>) => {
  const { width } = useWindowDimensions();

  return <CalendarClass {...rest} width={width} ref={calendarRef} />;
};

export default Calendar;

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
