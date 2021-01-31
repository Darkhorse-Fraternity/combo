/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import React, { FC, forwardRef, useState } from 'react';

// @ts-ignore: Unreachable code error
import {
  StyledMenuItem,
  StyledMenuItemDiscrib,
  StyledMenuItemTitle,
  StyledNextBtn,
  StyledNextBtnText,
  StyledSafeAreaView,
  StyledLine,
  StyledRightView,
  StyledMenuItemArrow,
  StyledMenuItemDiscribPlacehold,
  StyledTop,
  StyledTopButton,
  StyledIconBG,
  StyledIconImage,
  StyledTitle,
  StyledTopInfo,
  StyledTopInfoItem,
  StyledTopInfoItemTitle,
  StyledTopInfoItemDiscrib,
  StyledContent,
  StyledTip,
  StyledErrorsView,
  StyledTopTipText,
  StyledTopTip,
} from './style';
import DateTimePicker, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import Button, { ButtonType } from '@components/Button';
import {
  useNavigationAllParamsWithType,
  useNavigationWithType,
} from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { useMutateICardData } from 'src/data/data-context/core';
import { postFb } from 'src/hooks/interface';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import svgs from '../../../../source/icons';
import { dayText } from '@helps/util';
import PrivatePickerModal from '@components/modal/private-picker-modal';
import { RHFError } from '@components/Form';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';
import { View } from 'react-native-animatable';
// @ts-ignore: Unreachable code error
// import { useNavigationAllParamsWithType } from '@components/Nav/hook';
// import { RouteKey } from '@pages/interface';

export type FlagFormData = {
  startTime: Date;
  endTime: Date;
  joinTime: Date;
  close_at: Date; // 结算时间
  cost: number;
};

export const flagValidationSchema = yup.object().shape({
  startTime: yup.date().label('开始时间').required(),
  endTime: yup.date().label('结束时间').required(),
  joinTime: yup.date().label('加入截止时间').required(),
  close_at: yup.date().label('结算时间').required(),
  cost: yup.number().label('副本押金').required(),
});

interface MenuItemType extends ButtonType {
  title: string;
  discrib?: string;
  discribPlacehold?: string;
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

interface RenderDateSelectType {
  value?: Date;
  onChange?: (data: Date) => void;
  mode?: DateTimePickerProps['mode'];
}

const RenderDateSelect: FC<
  RenderDateSelectType & Omit<MenuItemType, 'discrib'>
> = ({ value, onChange, mode = 'datetime', ...others }) => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  return (
    <>
      <MenuItem
        onPress={setIsDateTimePickerVisible.bind(undefined, true)}
        {...others}
        discrib={moment(value).format('MM月DD日 HH:mm')}
      />
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        mode={mode}
        display="spinner"
        cancelTextIOS="取消"
        headerTextIOS="选择提醒时间"
        confirmTextIOS="确定"
        minimumDate={new Date()}
        maximumDate={moment().add(30, 'day').toDate()}
        onConfirm={(date) => {
          onChange && onChange(date);
          setIsDateTimePickerVisible(false);
        }}
        onCancel={setIsDateTimePickerVisible.bind(undefined, false)}
      />
    </>
  );
};

const ActivityDateStart: FC<RenderDateSelectType> = (props) => {
  return (
    <RenderDateSelect
      title="开始时间"
      // discrib="07月28日"
      discribPlacehold="请选择活动开始时间"
      {...props}
    />
  );
};

const ActivityDateEnd: FC<RenderDateSelectType> = (props) => {
  return (
    <RenderDateSelect
      title="结束时间"
      discribPlacehold="请选择活动结束时间"
      {...props}
    />
  );
};

const JoinDateEnd: FC<RenderDateSelectType> = (props) => {
  return (
    <RenderDateSelect
      title="报名截止"
      discribPlacehold="请选择截止时间"
      {...props}
    />
  );
};

const ClearingDateEnd: FC<RenderDateSelectType> = (props) => {
  // console.log('isDateTimePickerVisible', isDateTimePickerVisible);
  return (
    <RenderDateSelect
      title="结算时间"
      discribPlacehold="请选择活动结算时间"
      {...props}
    />
  );
};

const RenderICardInfoItem: FC<{ title: string; discirb: string }> = ({
  title,
  discirb,
}) => {
  return (
    <StyledTopInfoItem>
      <StyledTopInfoItemTitle>{title}</StyledTopInfoItemTitle>
      <StyledTopInfoItemDiscrib>{discirb}</StyledTopInfoItemDiscrib>
    </StyledTopInfoItem>
  );
};

const RenderICardInfo: FC<{ iCardId: string }> = ({ iCardId }) => {
  const { data } = useMutateICardData(iCardId);
  const { navigate } = useNavigationWithType();
  const {
    objectId,
    title,
    iconAndColor,
    notifyTimes = ['00:00', '24:00'],
    limitTimes,
    recordDay,
    record = [],
  } = data;
  const { color, name } = iconAndColor;
  // navigate(RouteKey.cardConfig, { iCardId: objectId });
  return (
    <>
      <StyledTopButton>
        <StyledTop>
          <StyledIconBG color={color || '#afd2ef'}>
            <StyledIconImage
              resizeMode="contain"
              size={40}
              source={svgs[name || 'sun']}
            />
          </StyledIconBG>
          <StyledTitle>{title}</StyledTitle>
        </StyledTop>
        <StyledTopInfo />
        <RenderICardInfoItem
          title={'提醒时间'}
          discirb={notifyTimes.length > 0 ? notifyTimes.toString() : '无'}
        />
        <RenderICardInfoItem
          title={'打卡时间限制'}
          discirb={
            recordDay?.length! > 0
              ? dayText(recordDay || []) + ':' + limitTimes?.join('~')
              : '无'
          }
        />
        <RenderICardInfoItem
          title={'打卡要求'}
          discirb={record.length > 0 ? record.toString() : '无'}
        />
      </StyledTopButton>
      <StyledTopTip>
        <View />
        <Button
          onPress={() => {
            navigate(RouteKey.cardConfig, { iCardId: objectId });
          }}>
          <StyledTopTipText>去更新</StyledTopTipText>
        </Button>
      </StyledTopTip>
    </>
  );
};

const items = [
  { label: '5元', value: 5, id: '0' },
  { label: '10元', value: 10, id: '1' },
  { label: '20元', value: 20, id: '2' },
];

const RenderPay: FC<{
  value?: number;
  onChange?: (data: number) => void;
}> = forwardRef(({ value = 5, onChange }, _) => {
  const [show, setShow] = useState(false);
  const [selectId, setSelectId] = useState('0');
  return (
    <>
      <MenuItem
        onPress={setShow.bind(undefined, true)}
        title="副本押金 "
        discrib={`¥${value}`}
      />
      <PrivatePickerModal
        isVisible={show}
        onClose={() => {
          setShow(false);
        }}
        items={items}
        selectId={selectId}
        onChange={async (id, index) => {
          // setselectId(id);
          setSelectId(id);
          onChange && onChange(items[index].value);
          setShow(false);
        }}
      />
    </>
  );
});

// 打卡期间内 和 打卡时间限制是否有交集

const recordDayIntersection = (
  start: Date,
  end: Date,
  recordDay: number[] = [1, 2, 3, 4, 5, 6, 7],
): boolean => {
  if (moment(start).isBefore(moment(end))) {
    for (let index = 0; index < recordDay.length; index++) {
      const day = recordDay[index];
      console.log('moment(start).weeks()', moment(start).weeks());

      if (moment(start).weeks() === day) {
        return true;
      }
    }
    return recordDayIntersection(
      moment(start).add(1, 'day').toDate(),
      end,
      recordDay,
    );
  }

  return false;
};

const FlagCreatNext: FC<{}> = () => {
  // const { iCardId } = useNavigationAllParamsWithType<RouteKey.flagDetail>();

  // const [state, setstate] = useState(false);
  const { navigate } = useNavigation();
  const { iCardId, title, discrib, cover } = useNavigationAllParamsWithType<
    RouteKey.flagCreatNext
  >();
  const { user } = useGetInfoOfMe();
  const { data: iCard } = useMutateICardData(iCardId);
  const { limitTimes, recordDay } = iCard;

  const { handleSubmit, control, errors } = useForm<FlagFormData>({
    resolver: yupResolver(flagValidationSchema),
    defaultValues: {
      cost: 5,
      startTime: moment().add(1, 'days'),
      endTime: moment().add(2, 'days'),
      joinTime: moment().add(1, 'days'),
      close_at: moment().add(2.1, 'days'),
    },
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(
    async ({ cost, startTime, endTime, joinTime, close_at }: FlagFormData) => {
      if (moment(joinTime).isBefore(startTime)) {
        return SimpleToast.show('报名截止时间需要在活动开始之前～!');
      }

      if (moment(joinTime).isBefore(startTime)) {
        return SimpleToast.show('报名截止时间需要在活动开始之前～!');
      }
      if (moment(startTime).add(1, 'day').isBefore(endTime)) {
        return SimpleToast.show('活动开始必须要在活动结束前一天设置～！');
      }
      if (moment(endTime).isBefore(close_at)) {
        return SimpleToast.show('活动结束时间必须要在结算前设置～!');
      }

      if (moment(close_at).subtract(1, 'day').isAfter(endTime)) {
        return SimpleToast.show('活动结束后需要在一天内完成结算～！');
      }

      //打卡期间内 和 打卡时间限制是否有交集，如果没有，则报警
      if (!recordDayIntersection(startTime, endTime, recordDay)) {
        return SimpleToast.show('打卡期间内和打卡时间限制之间没有交集～！');
      }

      try {
        const res = await postFb({
          userID: user.objectId,
          cost: cost,
          coverUrl: cover,
          titleConfig: {
            title,
            introduction: discrib,
          },
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          joinTime: joinTime.toISOString(),
          limitTime: {
            start_at: limitTimes[0],
            end_at: limitTimes[1],
          },
          rewardConfig: {
            type: 'money',
          },
          close_at: close_at.toISOString(),
          sort: 0,
        });
        if (res) {
          navigate(RouteKey.card);
        }
      } catch (error) {
        console.log('error', error.message);
      }
    },
  );

  const disabled = false;

  return (
    <StyledSafeAreaView>
      <StyledContent>
        <RenderICardInfo iCardId={iCardId} />
        <Controller
          // defaultValue=''
          name={'joinTime'}
          control={control}
          as={JoinDateEnd}
        />
        <Controller
          // defaultValue=''
          name={'startTime'}
          control={control}
          as={ActivityDateStart}
        />
        <Controller
          // defaultValue=''
          name={'endTime'}
          control={control}
          as={ActivityDateEnd}
        />

        <Controller
          // defaultValue=''
          name={'close_at'}
          control={control}
          as={ClearingDateEnd}
        />
        <Controller
          // defaultValue=''
          name={'cost'}
          control={control}
          as={RenderPay}
        />
      </StyledContent>
      <StyledTip>活动期间将无法修改习惯卡片配置</StyledTip>
      <StyledNextBtn onPress={onSubmit} disabled={disabled}>
        <StyledNextBtnText disabled={disabled}>
          创建并发布副本
        </StyledNextBtnText>
      </StyledNextBtn>
      <StyledErrorsView>
        <RHFError<FlagFormData> errors={errors} name={'startTime'} />
      </StyledErrorsView>
    </StyledSafeAreaView>
  );
};

export default FlagCreatNext;
