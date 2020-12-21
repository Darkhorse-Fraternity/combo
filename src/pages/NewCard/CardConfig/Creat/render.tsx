/**
 * Created by lintong on 2017/7/11.
 * @flow
 */

import React, { FC, forwardRef, useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  // TextInput,
  BackHandler,
  DeviceEventEmitter,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import { iCardPoint, userPoint } from '../../../../request/LCModle';
import Main from '../Main';

import {
  StyledSubTitleView,
  StyledSubTitle,
  StyledInnerView,
  StyledHeader,
  StyledTitle,
  StyledHeaderInner,
  StyledHeaderBtn,
  StyledInnerScrollView,
  StyledTitleInput,
  StyledContent,
} from './style';
// static displayName = Creat
import { DeviceEventEmitterKey } from '../../../../configure/enum';

import IconAndColor from './IconAndColor';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import {
  CardFormData,
  CardIconAndColor,
  CardLimitDayAndTimes,
  CardNotifyText,
  CardNotifyTimes,
  CardRecord,
  CardSound,
  CardTitle,
  cardValidationSchema,
} from '../card_interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { postClassesICard, postClassesIUse } from 'src/hooks/interface';
import { useGetUserInfo } from 'src/data/data-context';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';

const RenderIconAndColor: FC<{
  value?: { name: string; color: string };
  onChange?: (data: { name: string; color: string }) => void;
}> = forwardRef(({ value, onChange }, _) => {
  const { name = '', color = '' } = value || {};
  return (
    <IconAndColor
      // ref={ref as nev/er}
      icon={name}
      color={color}
      onChange={onChange}
    />
  );
});

const RenderName: FC<{
  value?: string;
  onChange?: (value: string) => void;
}> = forwardRef(({ value, onChange }, ref) => (
  <View>
    <StyledSubTitleView>
      <StyledSubTitle>习惯标题：</StyledSubTitle>
    </StyledSubTitleView>
    <StyledTitleInput
      value={value}
      ref={ref as never}
      onChange={(e) => onChange?.call(undefined, e.nativeEvent.text)}
      placeholderTextColor="rgba(180,180,180,1)"
      // selectionColor={mainColor}
      returnKeyType="next"
      maxLength={50}
      // keyboardType={boardType}
      style={styles.textInputStyle}
      underlineColorAndroid="transparent"
      placeholder="例如跑步、早睡等"
      clearButtonMode="while-editing"
      enablesReturnKeyAutomatically
    />
  </View>
));

const Render: FC<{}> = () => {
  const [step, setStep] = useState(0);
  const user = useGetUserInfo();
  const { habit } = useNavigationAllParamsWithType<RouteKey.creat>() || {};
  const { goBack, dispatch } = useNavigation();
  const [loading, setLoading] = useState(false);
  const { getValues, handleSubmit, control } = useForm<CardFormData>({
    resolver: yupResolver(cardValidationSchema),
    defaultValues: {
      [CardTitle]: habit?.title || '',
      [CardNotifyTimes]: [],
      [CardLimitDayAndTimes]: {
        time: ['00:00', '24:00'],
        day: [1, 2, 3, 4, 5, 6, 7],
      },
      [CardIconAndColor]: {
        name: habit?.icon || 'sun',
        color: habit?.color || '#f6f7f9',
      },
      [CardNotifyText]: '时不我待！',
      [CardRecord]: [],
      [CardSound]: {
        open: true,
        item: { title: 'bell', type: 'normal', key: 'bell', source: '' },
      },
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  const onSubmit = async ({
    title,
    record,
    limitTimes,
    iconAndColor,
    notifyText,
    notifyTimes,
    sound,
  }: CardFormData) => {
    delete sound.item.source;
    setLoading(true);
    const { objectId: iCardId } = await postClassesICard({
      title,
      record,
      recordDay: limitTimes.day,
      limitTimes: limitTimes.time,
      iconAndColor: iconAndColor,
      notifyText,
      notifyTimes,
      sound,
      user: userPoint(user.objectId),
    });

    if (!iCardId) {
      return;
    }
    const { objectId } = await postClassesIUse({
      iCard: iCardPoint(iCardId),
      user: userPoint(user.objectId),
    });

    if (objectId) {
      DeviceEventEmitter.emit(DeviceEventEmitterKey.iUse_reload);
      dispatch(StackActions.popToTop());
    }
  };

  const nextStep = (sumit: boolean = false) => {
    const title = getValues('title');
    if (step === 0) {
      if (title.length !== 0) {
        setStep((s) => s + 1);
      } else {
        Toast.show('标题不可为空');
      }
    } else if (step === 1) {
      // setStep((s) => s + 1);
      if (sumit) {
        handleSubmit(onSubmit)();
      } else {
        setStep((s) => s + 1);
      }
    }
  };
  const backStep = useCallback(() => {
    if (step === 0) {
      goBack();
    } else {
      setStep((data) => data - 1);
      // update iUse
    }
    return null;
  }, [goBack, step]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backStep);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backStep);
    };
  }, [step, backStep]);

  return (
    <StyledContent>
      <StyledHeader>
        <StyledTitle>新建习惯</StyledTitle>
        <StyledHeaderInner>
          <StyledHeaderBtn
            // load={false}
            // disabled={false}
            backgroundColor={step < 2 ? '#bfc2c7' : undefined}
            hitSlop={{
              top: 15,
              left: 10,
              bottom: 15,
              right: 10,
            }}
            onPress={backStep}
            title={step < 2 ? '取消' : '返回'}
          />
          {step < 2 && (
            <StyledHeaderBtn
              load={loading}
              // disabled={false}
              // backgroundColor={color}
              hitSlop={{
                top: 15,
                left: 10,
                bottom: 15,
                right: 10,
              }}
              onPress={nextStep.bind(undefined, true)}
              title={step === 0 ? '下一步' : '提交'}
            />
          )}
        </StyledHeaderInner>
      </StyledHeader>
      {step === 0 && (
        <StyledInnerScrollView>
          <Controller name={CardTitle} control={control} as={RenderName} />
          {/* <Controller name={CardTitle} control={control} as={RenderName} /> */}
          <Controller
            name={CardIconAndColor}
            control={control}
            as={RenderIconAndColor}
          />
        </StyledInnerScrollView>
      )}

      <StyledInnerView>
        {step >= 1 && (
          <Main
            control={control}
            step={step - 1}
            nextStep={nextStep}
            // step={this.state.step - 1}
            // nextStep={this.__nextStep}
            // onSelect={onSelect}
          />
        )}
      </StyledInnerView>
    </StyledContent>
  );
};
export default Render;
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },

  textInputStyle: {
    height: 50,
    textAlign: 'left',
    // fontSize: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 15,
  },
});
