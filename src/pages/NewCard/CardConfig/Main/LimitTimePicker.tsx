/**
 * Created by lintong on 2018/12/25.
 * @flow
 */

import React, { FC, useState } from 'react';

import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

import {
  StyledLimitTimeContent,
  StyledNotifyButton,
  StyledMaterialIcons,
  StyledNotifyTime,
  StyledNotifyButtonInner,
} from '../style';

function PrefixInteger(num: number, length: number) {
  return (Array(length).join('0') + num).slice(-length);
}

interface NotifyTimePickerProps {
  options: string[];
  onChange?: (options: string[]) => void;
}

const RenderComponent: FC<{
  options: string[];
  onPress: (index: number) => void;
}> = ({ options, onPress }) => (
  <StyledLimitTimeContent>
    <StyledNotifyTime>开始时间:</StyledNotifyTime>
    <StyledNotifyButton
      onPress={() => {
        onPress(0);
        // const self = this;
        // this.setState({ isDateTimePickerVisible: true });
        // this.onChange = async (time) => {
        //   // fields.
        //   const before = moment(time, 'HH:mm');
        //   const after = moment(fields.get(1), 'HH:mm');
        //   const flag = before.isBefore(after);
        //   if (flag) {
        //     props.input.onChange && props.input.onChange(time);
        //     self.setState({ isDateTimePickerVisible: false });
        //   } else {
        //     Toast.showWithGravity(
        //       '开始时间要小于结束时间,建议至少有一小时间隔。',
        //       Toast.SHORT,
        //       Toast.TOP,
        //     );
        //   }
        // };
      }}>
      <StyledNotifyButtonInner>
        <StyledMaterialIcons size={30} name="alarm" />
        <StyledNotifyTime style={{ fontSize: 12 }}>
          {options[0]}{' '}
        </StyledNotifyTime>
      </StyledNotifyButtonInner>
    </StyledNotifyButton>
    <StyledNotifyTime style={{ fontSize: 25 }}> ~ </StyledNotifyTime>
    <StyledNotifyTime style={{ marginLeft: 20 }}>结束时间:</StyledNotifyTime>
    <StyledNotifyButton
      onPress={() => {
        onPress(1);
        // const self = this;
        // this.setState({ isDateTimePickerVisible: true });
        // this.onChange = async (time) => {
        //   // fields.
        //   const before = moment(fields.get(0), 'HH:mm');
        //   const after = moment(time, 'HH:mm');
        //   const flag = before.isBefore(after);
        //   if (flag) {
        //     props.input.onChange && props.input.onChange(time);
        //     self.setState({ isDateTimePickerVisible: false });
        //   } else {
        //     Toast.showWithGravity(
        //       '开始时间要小于结束时间,建议至少有一小时间隔',
        //       Toast.SHORT,
        //       Toast.TOP,
        //     );
        //   }
        // };
      }}>
      <StyledNotifyButtonInner>
        <StyledMaterialIcons size={30} name="alarm" />
        <StyledNotifyTime style={{ fontSize: 12 }}>
          {options[1]}{' '}
        </StyledNotifyTime>
      </StyledNotifyButtonInner>
    </StyledNotifyButton>
  </StyledLimitTimeContent>
);

const LimitTimePicker: FC<NotifyTimePickerProps> = (props) => {
  const { options, onChange } = props;
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const onConfirm = (date: Date) => {
    const hours = PrefixInteger(date.getHours(), 2);
    const minutes = PrefixInteger(date.getMinutes(), 2);
    const time = `${hours}:${minutes}`;
    const data = [...options];
    data[index] = time;
    // console.log('time', time, index);
    // console.log('data', data[index]);
    // console.log('data', data);
    const before = moment(data[0], 'HH:mm');
    const after = moment(data[1], 'HH:mm');
    const flag = before.isBefore(after);
    if (flag) {
      console.log('????');
      setIsDateTimePickerVisible(false);
      onChange && onChange(data);
      //
      // setIndex(0);
    } else {
      Toast.showWithGravity(
        '开始时间要小于结束时间,建议至少有一小时间隔',
        Toast.SHORT,
        Toast.CENTER,
      );
    }
  };
  return (
    <>
      {/* <LimitTimePickerClass /> */}
      <RenderComponent
        options={options}
        onPress={(num) => {
          setIndex(num);
          setIsDateTimePickerVisible(true);
        }}
      />
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        mode="time"
        date={moment(options[index], 'HH:mm').toDate()}
        display="spinner"
        cancelTextIOS="取消"
        headerTextIOS="选择提醒时间"
        confirmTextIOS="确定"
        onConfirm={onConfirm}
        onCancel={setIsDateTimePickerVisible.bind(undefined, false)}
      />
    </>
  );
};

export default LimitTimePicker;
