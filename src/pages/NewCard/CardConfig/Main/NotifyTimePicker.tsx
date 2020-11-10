/**
 * Created by lintong on 2018/9/18.
 * @flow
 */

import React, { FC, useRef, useState } from 'react';
import { View, LayoutAnimation, Platform } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import * as Animatable from 'react-native-animatable';
import {
  StyledNotifyButton,
  StyledMaterialIcons,
  StyledSubTitle,
  StyledInner,
  StyledNotifyTime,
  StyledSubTitleView,
  StyledControl,
  StyledShowDelete,
  StyledNotifyButtonInner,
  StyledRound,
  StyledLine,
  StyleNoticeText,
} from '../style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useLocalRemindConfig } from '@configure/app';
import SimpleToast from 'react-native-simple-toast';

function PrefixInteger(num: number, length: number) {
  return (Array(length).join('0') + num).slice(-length);
}

interface NotifyTimePickerProps {
  options: string[];
  onChange?: (options: string[]) => void;
}

// class NotifyTimePickerClass extends PureComponent<NotifyTimePickerProps> {
//   constructor(props: NotifyTimePickerProps) {
//     super(props);
//     this.state = {
//       isDateTimePickerVisible: false,
//       isDelete: false,
//     };
//   }

//   componentWillUnmount() {
//     this.timer && clearTimeout(this.timer);
//   }

//   handleViewRef = {};

//   onChange = null;

//   dataArray = [];

//   _handleDatePicked = (date) => {
//     this.setState({ isDateTimePickerVisible: false });
//     const hours = PrefixInteger(date.getHours(), 2);
//     const minutes = PrefixInteger(date.getMinutes(), 2);
//     const time = `${hours}:${minutes}`;
//     this.onChange && this.onChange(time);

//     this.onChange = null;
//   };

//   _hideDateTimePicker = () => {
//     this.setState({ isDateTimePickerVisible: false });
//   };

//   render() {
//     return (
//       <DateTimePicker
//         isVisible={this.state.isDateTimePickerVisible}
//         mode="time"
//         display="spinner"
//         cancelTextIOS="取消"
//         headerTextIOS="选择提醒时间"
//         // isDarkModeEnabled={true}
//         confirmTextIOS="确定"
//         onConfirm={this._handleDatePicked}
//         onCancel={this._hideDateTimePicker}
//       />
//     );
//   }
// }

const NoticeTip = () => {
  const { navigate } = useNavigation();
  const state = useLocalRemindConfig();

  if (state) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigate('remind');
      }}>
      <StyleNoticeText>
        {' '}
        点击开启{Platform.OS === 'ios' ? '习惯' : '日历'}提醒权限!{' '}
      </StyleNoticeText>
    </TouchableOpacity>
  );
};

interface RenderComponentProps extends NotifyTimePickerProps {
  isDelete: boolean;
  onPress: (index: number, ref?: React.RefObject<Animatable.View>) => void;
}

const AnimationButton: FC<
  Omit<RenderComponentProps, 'options'> & { item: string; index: number }
> = ({ isDelete, onPress, item, index }) => {
  const ref = useRef<Animatable.View>(null);
  return (
    <Animatable.View
      key={item}
      useNativeDriver
      easing="ease-in-out"
      ref={ref as never}
      animation="bounceIn">
      <StyledNotifyButton
        // key="button"
        onPress={async () => {
          onPress(index + 1, ref);
        }}>
        {isDelete && (
          <StyledRound>
            <StyledLine />
          </StyledRound>
        )}
        <StyledNotifyButtonInner>
          <StyledMaterialIcons size={30} name="alarm" />
          <StyledNotifyTime>{item} </StyledNotifyTime>
        </StyledNotifyButtonInner>
      </StyledNotifyButton>
    </Animatable.View>
  );
};

const RenderComponent: FC<RenderComponentProps> = ({
  isDelete,
  options,
  onPress,
}) => (
  <StyledInner>
    <StyledNotifyButton
      onPress={() => {
        onPress(0);
      }}>
      <StyledNotifyButtonInner>
        <StyledMaterialIcons size={30} name="alarm-add" />
      </StyledNotifyButtonInner>
    </StyledNotifyButton>
    {options.map((item, index) => (
      <AnimationButton
        key={item}
        item={item}
        index={index}
        isDelete={isDelete}
        onPress={onPress}
      />
    ))}
  </StyledInner>
);

const NotifyTimePicker: FC<NotifyTimePickerProps> = (props) => {
  const { options, onChange } = props;
  const [isDelete, setIsDelete] = useState(false);
  const [index, setIndex] = useState(-1);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const onConfirm = (date: Date) => {
    setIsDateTimePickerVisible(false);
    setIndex(-1);
    const hours = PrefixInteger(date.getHours(), 2);
    const minutes = PrefixInteger(date.getMinutes(), 2);
    const time = `${hours}:${minutes}`;
    const position = options.findIndex((item) => item === time);
    if (position === -1 && onChange) {
      if (index === 0) {
        onChange([...options, time]);
      } else {
        //  options
        options.splice(index - 1, 1, time);
        onChange(options);
      }
    } else {
      Toast.showWithGravity(
        '这个时间点已经存在啦！',
        SimpleToast.SHORT,
        SimpleToast.CENTER,
        ['RCTModalHostViewController'],
      );
    }
    // onChange([]);
  };
  // console.log('options', options);

  return (
    <>
      <StyledSubTitleView>
        <StyledSubTitle>选择提醒时间</StyledSubTitle>
        {options.length > 0 && (
          <StyledControl
            onPress={() => {
              // this.setState({ isDelete: !this.state.isDelete });
              setIsDelete((res) => !res);
              LayoutAnimation.spring();
            }}>
            <StyledShowDelete>
              {!isDelete ? '删除' : '取消删除'}
            </StyledShowDelete>
          </StyledControl>
        )}
      </StyledSubTitleView>
      {/* <FieldArray
            key={name}
            name={name}
            isDelete={this.state.isDelete}
            component={this.renderComponent}
          /> */}
      <RenderComponent
        isDelete={isDelete}
        {...props}
        onPress={async (index, ref) => {
          if (index !== 0 && isDelete) {
            const fn = await ref?.current?.bounceOut?.call(undefined);
            console.log(fn);
            if (fn && fn.finished && onChange) {
              // const numb = index - 1;
              const data = options.splice(index);
              console.log('data', data);
              onChange(data);
            }
          } else {
            if (isDelete) {
              return setIsDelete(false);
            }
            if (options.length >= 10) {
              return Toast.show('单个卡片提醒数量不可超过10个哦~');
            }
            setIndex(index);
            setIsDateTimePickerVisible(true);
          }
        }}
      />
      {/* <NotifyTimePickerClass {...props} /> */}

      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        mode="time"
        display="spinner"
        cancelTextIOS="取消"
        headerTextIOS="选择提醒时间"
        // isDarkModeEnabled={true}
        confirmTextIOS="确定"
        onConfirm={onConfirm}
        onCancel={setIsDateTimePickerVisible.bind(undefined, false)}
      />
      <NoticeTip />
    </>
  );
};

export default NotifyTimePicker;
