import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';

const { width } = Dimensions.get('window');
import React, { PureComponent } from 'react';
import { theme } from '../../Theme';
import Button from '../Button';
import moment from 'moment';

export const isLeap = (year: number) => {
  return year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : year % 4 === 0 ? 1 : 0;
};

export interface DateBoardProps<ItemT> {
  year: number;
  month: number;
  doneDay: (item: ItemT) => void;
  date: Date;
  busyDay?: Record<string, ItemT>;
  canceDay: (item: ItemT) => void;
  color: string;
}

// interface DateBoardState {
//   year: number;
//   month: number;
//   busyDay: { number: { number: [number] } };
// }

export default class DateBoard<ItemT> extends PureComponent<
  DateBoardProps<ItemT>
  // DateBoardState
> {
  static defaultProps = {
    year: 2018,
    month: 0,
    busyDay: {
      '2018': {
        // 3: [1, 22],
        // 2: [3, 22],
        // 6: [4, 22],
      },
    },
  };

  getNowDay(year: number, month: number, day: number) {
    // month = month - 1;
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    return `${year}-${monthStr}-${dayStr}`;
  }

  renderDate() {
    let myMonth;
    let myYear;
    let lastMonth = 0;
    if (this.props.month === 12) {
      myMonth = 0;
      myYear = this.props.year + 1;
    } else if (this.props.month === -1) {
      myMonth = 11;
      myYear = this.props.year - 1;
    } else {
      myMonth = this.props.month;
      myYear = this.props.year;
    }

    const { busyDay = {} } = this.props;

    lastMonth = myMonth === 0 ? 11 : myMonth - 1;

    const fd = new Date(myYear, myMonth, 1);
    const firstDay = fd.getDay();
    const monthDay = [
      31,
      28 + isLeap(this.props.year),
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
    const arr = [];
    for (let i = 0; i < firstDay; i++) {
      arr.push(
        <View key={-i} style={styles.dateBox}>
          <Text style={styles.dateText2}>{`${
            monthDay[lastMonth] - firstDay + i + 1
          }`}</Text>
        </View>,
      );
    }

    const background =
      TouchableNativeFeedback.SelectableBackgroundBorderless &&
      TouchableNativeFeedback.SelectableBackgroundBorderless();

    for (let i = 1; i < monthDay[myMonth] + 1; i++) {
      const now = this.getNowDay(myYear, myMonth + 1, i);
      const today = moment(this.props.date).format('YYYY-MM-DD');

      // console.log('today', today);
      // console.log('test:', i);
      if (busyDay[now]) {
        // const d = i;
        arr.push(
          <Button
            background={background}
            onPress={() => {
              // this.props.selectDay(now)
              this.props.canceDay && this.props.canceDay(busyDay[now]);
            }}
            key={i}
            style={styles.dateBox}>
            <View
              style={[
                styles.selected,
                {
                  backgroundColor: this.props.color || theme.mainLightColor,
                  borderRadius: 17,
                },
              ]}>
              <Text
                style={[
                  styles.dateText,
                  {
                    color: 'white',
                  },
                ]}>
                {i + ''}
              </Text>
            </View>
          </Button>,
        );
      } else if (today === now) {
        arr.push(
          <Button
            background={background}
            onPress={() => {
              // this.props.selectDay(now)
              busyDay &&
                busyDay[now] &&
                this.props.canceDay &&
                this.props.canceDay(busyDay[now]);
            }}
            key={i}
            style={styles.dateBox}>
            <View style={[styles.selected]}>
              <Text style={[styles.dateText]}>{i + ''}</Text>
            </View>
          </Button>,
        );
      } else {
        arr.push(
          <Button
            background={background}
            onPress={this.props.doneDay.bind(this, busyDay[now])}
            key={i}
            style={styles.dateBox}>
            <View style={[styles.selected]}>
              <Text style={[styles.dateText]}>{`${i}`}</Text>
            </View>
          </Button>,
        );
      }
    }
    const lastDay = 43 - firstDay - monthDay[myMonth];
    for (let i = 1; i < lastDay; i++) {
      arr.push(
        <View key={i + 100} style={styles.dateBox}>
          <Text style={styles.dateText2}>{i}</Text>
        </View>,
      );
    }

    return arr;
  }

  render() {
    return <View style={styles.dateBoard}>{this.renderDate()}</View>;
  }
}

const styles = StyleSheet.create({
  dateBoard: {
    marginTop: 8,
    width,
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (width - 24 - 1) / 7,
    height: 40,
  },
  dateText: {
    fontSize: 13,
    minWidth: 20,
    textAlign: 'center',
  },
  dateText2: {
    fontSize: 11,
    minWidth: 20,
    color: 'rgb(150,150,150)',
    textAlign: 'center',
  },

  selected: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
  },
  addBtn: {
    width,
    height: 60,
  },
  point: {
    position: 'absolute',
    left: 19,
    top: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    // backgroundColor: '#f00'
  },
});
