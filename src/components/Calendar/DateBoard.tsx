import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

// const { width } = Dimensions.get('window');
import React, { PropsWithChildren } from 'react';
import Button from '../Button';
import moment from 'moment';
import styled from 'styled-components/native';

export const isLeap = (year: number) => {
  return year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : year % 4 === 0 ? 1 : 0;
};

const getNowDay = (year: number, month: number, day: number) => {
  // month = month - 1;
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${monthStr}-${dayStr}`;
};

export interface DateBoardProps<ItemT> {
  year: number;
  month: number;
  doneDay: (item: string) => void;
  date: Date;
  busyDay?: Record<string, ItemT>;
  canceDay: (item: ItemT) => void;
  color: string;
  width: number;
}

// interface DateBoardState {
//   year: number;
//   month: number;
//   busyDay: { number: { number: [number] } };
// }

// class DateBoardClass<ItemT> extends PureComponent<
//   DateBoardProps<ItemT>
//   // DateBoardState
// > {
const RenderMain = <ItemT extends unknown>(
  props: PropsWithChildren<DateBoardProps<ItemT>>,
) => {
  let myMonth;
  let myYear;
  let lastMonth = 0;

  const {
    month = 0,
    year = 2018,
    busyDay = {
      '2018': {},
    },
    date,
    color,
    doneDay,
    canceDay,
    width,
  } = props;

  if (month === 12) {
    myMonth = 0;
    myYear = year + 1;
  } else if (month === -1) {
    myMonth = 11;
    myYear = year - 1;
  } else {
    myMonth = month;
    myYear = year;
  }

  lastMonth = myMonth === 0 ? 11 : myMonth - 1;

  const fd = new Date(myYear, myMonth, 1);
  const firstDay = fd.getDay();
  const monthDay = [
    31,
    28 + isLeap(year),
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
      <StyledDateBox key={-i} width={width}>
        <Text style={styles.dateText2}>{`${
          monthDay[lastMonth] - firstDay + i + 1
        }`}</Text>
      </StyledDateBox>,
    );
  }

  const background =
    TouchableNativeFeedback.SelectableBackgroundBorderless &&
    TouchableNativeFeedback.SelectableBackgroundBorderless();

  for (let i = 1; i < monthDay[myMonth] + 1; i++) {
    const now = getNowDay(myYear, myMonth + 1, i);
    const today = moment(date).format('YYYY-MM-DD');

    // console.log('today', today);
    // console.log('test:', i);
    if (busyDay[now]) {
      // const d = i;
      arr.push(
        <StyledDateBoxBtn
          width={width}
          background={background}
          onPress={() => {
            // this.props.selectDay(now)
            canceDay && canceDay(busyDay[now]);
          }}
          key={i}>
          <View
            style={[
              styles.selected,
              {
                backgroundColor: color || 'grey',
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
        </StyledDateBoxBtn>,
      );
    } else if (today === now) {
      arr.push(
        <StyledDateBoxBtn
          width={width}
          background={background}
          onPress={doneDay.bind(this, now)}
          key={i}>
          <View style={[styles.selected]}>
            <Text style={[styles.dateText1]}>今</Text>
          </View>
        </StyledDateBoxBtn>,
      );
    } else {
      arr.push(
        <StyledDateBoxBtn
          width={width}
          background={background}
          onPress={doneDay.bind(this, now)}
          key={i}>
          <View style={[styles.selected]}>
            <Text style={[styles.dateText]}>{`${i}`}</Text>
          </View>
        </StyledDateBoxBtn>,
      );
    }
  }
  const lastDay = 43 - firstDay - monthDay[myMonth];
  for (let i = 1; i < lastDay; i++) {
    arr.push(
      <StyledDateBox key={i + 100} width={width}>
        <Text style={styles.dateText2}>{i}</Text>
      </StyledDateBox>,
    );
  }

  return <>{arr}</>;
};
// }

const DateBoard = <ItemT extends unknown>({
  width,
  ...rest
}: PropsWithChildren<DateBoardProps<ItemT>>) => {
  return (
    <StyleddateBoard width={width}>
      <RenderMain<ItemT> {...rest} width={width} />
    </StyleddateBoard>
  );
};

export default DateBoard;

export const StyledDateBox = styled.View<{ width: number }>`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: ${(props) => (props.width - 25) / 7};
`;

export const StyledDateBoxBtn = styled(Button)<{ width: number }>`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: ${(props) => (props.width - 25) / 7};
`;

export const StyleddateBoard = styled.View<{ width: number }>`
  margin-top: 8px;
  width: ${(props) => props.width};
  padding: 0px 12px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const styles = StyleSheet.create({
  // dateBox: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: (width1 - 24 - 1) / 7,
  //   height: 40,
  // },
  dateText: {
    fontSize: 15,
    minWidth: 20,
    textAlign: 'center',
    color: 'rgb(100,100,100)',
  },
  dateText1: {
    fontSize: 14,
    minWidth: 20,
    // color: 'green',
    color: 'rgb(100,100,100)',
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
