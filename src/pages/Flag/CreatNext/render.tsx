/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import React, { FC, useState } from 'react';

// @ts-ignore: Unreachable code error
import {
  StyledMenuItem,
  StyledMenuItemDiscrib,
  StyledMenuItemTitle,
  StyledNextBtn,
  StyledNextBtnText,
  StyledSafeAreaView,
  StyledLine,
  StyledSpace,
  StyledRightView,
  StyledMenuItemArrow,
  StyledMenuItemDiscribPlacehold,
} from './style';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ButtonType } from '@components/Button';

// @ts-ignore: Unreachable code error
// import { useNavigationAllParamsWithType } from '@components/Nav/hook';
// import { RouteKey } from '@pages/interface';

interface MenuItemType extends ButtonType {
  title: string;
  discrib: string;
  discribPlacehold: string;
  isImportant?: boolean;
}

const MenuItem: FC<MenuItemType> = ({
  title,
  isImportant,
  discrib,
  discribPlacehold,
  ...other
}) => {
  return (
    <>
      <StyledMenuItem {...other}>
        <StyledMenuItemTitle>{title}</StyledMenuItemTitle>
        <StyledRightView>
          {!discrib && (
            <StyledMenuItemDiscribPlacehold>
              {discribPlacehold}
            </StyledMenuItemDiscribPlacehold>
          )}
          {!!discrib && (
            <StyledMenuItemDiscrib isImportant={isImportant}>
              {discrib}
            </StyledMenuItemDiscrib>
          )}
          <StyledMenuItemArrow />
        </StyledRightView>
      </StyledMenuItem>
      <StyledLine />
    </>
  );
};

const ActivityDateStart: FC<{}> = () => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const onConfirm = () => {
    setIsDateTimePickerVisible(false);
  };

  // console.log('isDateTimePickerVisible', isDateTimePickerVisible);

  return (
    <>
      <MenuItem
        onPress={setIsDateTimePickerVisible.bind(undefined, true)}
        title="开始时间"
        discrib="07月28日"
        discribPlacehold="请选择活动时间"
      />
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        mode="datetime"
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

const ActivityDateEnd: FC<{}> = () => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const onConfirm = () => {
    setIsDateTimePickerVisible(false);
  };

  // console.log('isDateTimePickerVisible', isDateTimePickerVisible);

  return (
    <>
      <MenuItem
        onPress={setIsDateTimePickerVisible.bind(undefined, true)}
        title="结束时间"
        discrib="08月30日"
        discribPlacehold="请选择活动时间"
      />
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        mode="datetime"
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

const FlagCreatNext: FC<{}> = () => {
  // const { iCardId } = useNavigationAllParamsWithType<RouteKey.flagDetail>();

  // const { height } = useWindowDimensions();
  // const [state, setstate] = useState(false);

  const onSubmit = () => {};

  const disabled = false;

  return (
    <StyledSafeAreaView>
      <ActivityDateStart />
      <ActivityDateEnd />
      <StyledSpace />
      <StyledNextBtn onPress={onSubmit} disabled={disabled}>
        <StyledNextBtnText disabled={disabled}>
          创建并发布副本
        </StyledNextBtnText>
      </StyledNextBtn>
    </StyledSafeAreaView>
  );
};

export default FlagCreatNext;
