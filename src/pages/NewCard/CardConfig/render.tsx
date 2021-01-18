/**
 * Created by lintong on 2017/8/4.
 * @flow
 */

// import * as immutable from 'immutable';
import React, { FC, useEffect, useState } from 'react';
import { BackHandler, Platform } from 'react-native';

import { StyledContent } from './style';
import Main from './Main';

import {
  StyledHeader,
  StyledTitle,
  StyledHeaderInner,
  StyledHeaderBtn,
  StyledInnerView,
} from './Creat/style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CardFormData,
  CardIconAndColor,
  // CardLimitdayTimes,
  CardLimitDayAndTimes,
  CardNotifyText,
  CardNotifyTimes,
  CardRecord,
  CardSound,
  CardState,
  CardTitle,
  cardValidationSchema,
} from './card_interface';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import {
  putClassesICardId,
  PutClassesICardIdRequest,
} from 'src/hooks/interface';
import { LoadAnimation } from '@components/Load';
import { useMutateICardData } from 'src/data/data-context/core';
import { CircleState } from '@configure/enum';

const CardConfig: FC<{}> = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { goBack } = useNavigation();
  const { iCardId } = useNavigationAllParamsWithType<RouteKey.cardConfig>();

  // 获取已经有的icard 数据
  // const { data } = useGetClassesICardId({ id: iCardId });
  const { data } = useMutateICardData(iCardId);
  const { update } = useMutateICardData();
  const { setValue, handleSubmit, control } = useForm<CardFormData>({
    resolver: yupResolver(cardValidationSchema),
    defaultValues: {
      [CardTitle]: '',
      [CardNotifyTimes]: [],
      [CardLimitDayAndTimes]: { time: [], day: [] },
      [CardIconAndColor]: { name: '', color: '' },
      [CardNotifyText]: '',
      [CardRecord]: [],
      [CardSound]: {},
      [CardState]: CircleState.close,
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });
  // console.log('data', data);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (data) {
      const {
        notifyTimes,
        limitTimes,
        title,
        iconAndColor,
        recordDay,
        notifyText,
        record,
        sound,
        state,
      } = data;
      setValue(CardNotifyTimes, notifyTimes);
      setValue(CardLimitDayAndTimes, { day: recordDay, time: limitTimes });
      setValue(CardTitle, title);
      setValue(CardIconAndColor, iconAndColor);
      setValue(CardNotifyText, notifyText || '');
      setValue(CardRecord, record || []);
      setValue(CardSound, sound as never);
      setValue(CardState, state);
      setShow(true);
    }
  }, [data, setValue]);

  const onSubmit = async ({
    title,
    record,
    limitTimes,
    iconAndColor,
    notifyText,
    notifyTimes,
    sound,
    cardState,
  }: CardFormData) => {
    delete sound.item.source;
    setLoading(true);
    const params: Omit<PutClassesICardIdRequest, 'id'> = {
      title,
      record,
      recordDay: limitTimes.day,
      limitTimes: limitTimes.time,
      iconAndColor: iconAndColor,
      notifyText,
      notifyTimes,
      sound,
      circleState: cardState,
      state: cardState,
    };
    const { objectId } = await putClassesICardId({
      id: iCardId,
      ...params,
    });
    if (objectId) {
      update({ objectId, ...params });
    }
    setLoading(false);
  };

  const nextStep = () => {
    step === 0 && setStep((s) => s + 1);
  };
  const backStep = () => {
    if (step === 0) {
      goBack();
    } else {
      setStep((data1) => data1 - 1);
      // update iUse
      handleSubmit(onSubmit)();
    }
  };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backStep);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', backStep);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [step]);

  const { setOptions } = useNavigation();
  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (step === 0) {
        setOptions({ gestureEnabled: true });
      } else {
        setOptions({ gestureEnabled: false });
      }
    }
  }, [setOptions, step]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (step === 0) {
          goBack();
        } else {
          setStep((s) => s - 1);
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      //   lastTimesRef.current = 0;
    }, [goBack, step]),
  );

  const color = data?.iconAndColor.color || '';

  return (
    <StyledContent>
      <StyledHeader>
        <StyledTitle>习惯设置</StyledTitle>
        <StyledHeaderInner>
          {step === 0 && (
            <StyledHeaderBtn
              load={false}
              // disabled={false}
              backgroundColor="#bfc2c7"
              hitSlop={{
                top: 15,
                left: 10,
                bottom: 15,
                right: 10,
              }}
              onPress={backStep}
              title={step === 0 ? '取消' : '返回'}
            />
          )}
          {step >= 1 && (
            <StyledHeaderBtn
              load={loading}
              // disabled={false}
              backgroundColor={color}
              hitSlop={{
                top: 15,
                left: 10,
                bottom: 15,
                right: 10,
              }}
              onPress={async () => {
                // await this.props.refresh();
                // 准备提交
                backStep();
              }}
              title="保存"
            />
          )}
        </StyledHeaderInner>
      </StyledHeader>

      <StyledInnerView>
        {!show && <LoadAnimation top={120} />}
        {show && <Main control={control} step={step} nextStep={nextStep} />}
      </StyledInnerView>
    </StyledContent>
  );
};

export default CardConfig;
