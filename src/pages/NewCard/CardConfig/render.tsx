/**
 * Created by lintong on 2017/8/4.
 * @flow
 */

// import * as immutable from 'immutable';
import React, { FC, useEffect, useState } from 'react';
import { BackHandler, DeviceEventEmitter } from 'react-native';

import { StyledContent } from './style';
import Main from './Main';

import {
  StyledHeader,
  StyledTitle,
  StyledHeaderInner,
  StyledHeaderBtn,
  StyledInnerView,
} from './Creat/style';
import { useNavigation } from '@react-navigation/native';
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
  CardTitle,
  cardValidationSchema,
} from './card_interface';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import {
  putClassesICardId,
  PutClassesICardIdRequest,
  useGetClassesICardId,
} from 'src/hooks/interface';
import { LoadAnimation } from '@components/Load';
import { DeviceEventEmitterKey } from '@configure/enum';
import { useMutateICardData } from 'src/data/data-context/core';

const CardConfig: FC<{}> = (props) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { goBack } = useNavigation();
  const { iCardId } = useNavigationAllParamsWithType<RouteKey.cardConfig>();

  // 获取已经有的icard 数据
  const { data } = useGetClassesICardId({ id: iCardId });
  const { update } = useMutateICardData();
  const { setValue, handleSubmit, errors, control } = useForm<CardFormData>({
    resolver: yupResolver(cardValidationSchema),
    defaultValues: {
      [CardTitle]: '',
      [CardNotifyTimes]: [],
      [CardLimitDayAndTimes]: { time: [], day: [] },
      [CardIconAndColor]: { name: '', color: '' },
      [CardNotifyText]: '',
      [CardRecord]: [],
      [CardSound]: {},
    },
    mode: 'onSubmit',
  });
  // console.log('data', data);

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
      } = data;
      setValue(CardNotifyTimes, notifyTimes);
      setValue(CardLimitDayAndTimes, { day: recordDay, time: limitTimes });
      setValue(CardTitle, title);
      setValue(CardIconAndColor, iconAndColor);
      setValue(CardNotifyText, notifyText || '');
      setValue(CardRecord, record || []);
      setValue(CardSound, sound as never);
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
      setStep((data) => data - 1);
      // update iUse
      handleSubmit(onSubmit)();
    }
    return null;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backStep);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backStep);
    };
  }, [step]);

  const color = data?.iconAndColor.color || '';

  return (
    <StyledContent>
      <StyledHeader>
        <StyledTitle>习惯设置</StyledTitle>
        <StyledHeaderInner>
          {step === 0 && (
            <StyledHeaderBtn
              // load={false}
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
        {!data && <LoadAnimation top={120} />}
        {data && <Main control={control} step={step} nextStep={nextStep} />}
      </StyledInnerView>
    </StyledContent>
  );
};

export default CardConfig;
