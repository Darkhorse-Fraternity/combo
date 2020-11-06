/**
 * Created by lintong on 2017/8/4.
 * @flow
 */

import React, { FC, PureComponent, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import { TextInput } from '../../../../components/Form/Cunstom/index';
// import { Radio, Multiple } from '../../../../components/Form/Select/index';
// import { Field, formValues } from 'redux-form/immutable';
import {
  StyledTitleText,
  StyledSubView,
  StyledSubTitle,
  StyledSubTitleView,
  StyledItemText,
  StyledItemView,
  StyledTopButton,
  StyledIconBG,
  StyledIconImage,
  StyledTitle,
  StyledCellButton,
  StyledCellTitle,
  StyledCellDiscrib,
  StyledCellInner,
  StyledArrow,
  StyledTitleView,
  StyledIcon,
  StyledTitleInput,
} from './style';
import IconAndColor from '../Creat/IconAndColor';
import svgs from '../../../../../source/icons';
import LimitTimePicker from './LimitTimePicker';

import NotifyTimePicker from './NotifyTimePicker';
import { RenderSounds } from './sound';
import { ButtonType } from '@components/Button';
import {
  CardFormData,
  CardIconAndColor,
  CardLimitDayAndTimes,
  CardNotifyText,
  CardNotifyTimes,
  CardProps,
  CardRecord,
  CardSound,
  CardTitle,
} from '../card_interface';
import { Control, Controller } from 'react-hook-form';
import Multiple from '@components/Form/Select/Multiple';

interface OptionDoProps {
  step: number;
  // onSelect: (field: string, value: string | Object | undefined) => void;
  nextStep: () => void;
  control: Control<CardFormData>;
}

interface RenderItemProps extends ButtonType {
  discrib: string;
  title: string;
  index?: number;
}

const RenderItem: FC<RenderItemProps> = ({ title, discrib, ...other }) => (
  <StyledCellButton {...other}>
    <StyledCellInner>
      <StyledCellTitle numberOfLines={1}>{title}</StyledCellTitle>
      <StyledCellDiscrib>{discrib}</StyledCellDiscrib>
    </StyledCellInner>
    <StyledArrow />
  </StyledCellButton>
);

// const Renderperiod = () => {
//   const items = ['5', '6', '7', '8', '9', '10', '14', '21', '30'];

//   const __renderRadioItem = (item: string, selItem: string) => (
//     <StyledItemView contain={selItem === item} style={{ width: 75 }} key={item}>
//       <StyledItemText contain={selItem === item}>{item}组</StyledItemText>
//     </StyledItemView>
//   );

//   return (
//     <>
//       <StyledSubTitleView>
//         <StyledSubTitle>习惯周期</StyledSubTitle>
//       </StyledSubTitleView>
//       <Radio
//         style={[styles.notifyTimeView]}
//         name="period"
//         // keyName='ItemId'
//         options={items}
//         renderItem={__renderRadioItem}
//       />
//     </>
//   );
// };

const RemderNotifyText: FC<{
  value: string;
  onChange: (value: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}> = ({ value, onChange }) => (
  <>
    <StyledSubTitleView>
      <StyledSubTitle>给自己的激励</StyledSubTitle>
    </StyledSubTitleView>
    <View
      style={[
        {
          backgroundColor: '#f6f7f9',
          padding: 5,
          paddingHorizontal: 10,
          borderRadius: 5,
          marginHorizontal: 20,
        },
      ]}>
      <StyledTitleInput
        value={value}
        onChange={onChange}
        placeholderTextColor="rgba(180,180,180,1)"
        returnKeyType="done"
        autoFocus
        maxLength={300}
        // keyboardType={boardType}
        style={styles.textInputStyle}
        multiline
        underlineColorAndroid="transparent"
        placeholder="时不我待!"
        clearButtonMode="while-editing"
        enablesReturnKeyAutomatically
      />
    </View>
  </>
);

const RenderRecordDay: FC<{
  onChange?: (options: { day: number[]; time: string[] }) => void;
  value?: { day: number[]; time: string[] };
}> = ({ onChange, value }) => {
  const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const sels = [1, 2, 3, 4, 5, 6, 7];
  const [state, setstate] = useState(value!);
  const firstRef = useRef(true);
  useEffect(() => {
    if (state && onChange && !firstRef.current) {
      onChange(state);
    }
    firstRef.current = false;
  }, [state]);

  const { day, time } = value || {};
  const __renderRadioItem = (item: number, contain: boolean) => (
    <StyledItemView contain={contain} key={names[item]}>
      <StyledItemText contain={contain}>{names[item - 1]}</StyledItemText>
    </StyledItemView>
  );

  // console.log('day', day);

  return (
    <StyledSubView>
      <StyledSubTitleView>
        <StyledSubTitle>每周打卡限制</StyledSubTitle>
      </StyledSubTitleView>
      <Multiple<number>
        style={[styles.notifyTimeView]}
        // keyName='ItemId'
        value={day || []}
        onValueChange={(data) => {
          // onChange && onChange({ day: data, time: [] });
          setstate((res) => ({ ...res, day: data }));
        }}
        options={sels}
        renderItem={__renderRadioItem}
      />
      <Animatable.View animation="fadeInUp" delay={300}>
        <StyledSubTitleView>
          <StyledSubTitle>时间段限制</StyledSubTitle>
        </StyledSubTitleView>
        <LimitTimePicker
          options={time || ['00:00', '24:00']}
          onChange={(data) => {
            setstate((res) => ({ ...res, time: data }));
          }}
        />
      </Animatable.View>
    </StyledSubView>
  );
};

const RemderRecord: FC<{
  value: string[];
  onChange?: (records: string[]) => void;
}> = ({ value, onChange }) => {
  const items = ['文字', '图片'];

  const __renderRadioItem = (item: string, contain: boolean) => (
    <StyledItemView contain={contain} key={item}>
      <StyledItemText contain={contain}>{item}</StyledItemText>
    </StyledItemView>
  );

  return (
    <StyledSubView>
      <Animatable.View animation="fadeInUp" delay={300 + Math.random() * 300}>
        <StyledSubTitleView>
          <StyledSubTitle>打卡必填</StyledSubTitle>
        </StyledSubTitleView>

        <Multiple<string>
          style={[styles.notifyTimeView]}
          // keyName='ItemId'
          options={items}
          renderItem={__renderRadioItem}
          value={value || []}
          onValueChange={(data) => {
            onChange && onChange([...data]);
          }}
        />
      </Animatable.View>
    </StyledSubView>
  );
};

interface StepAndTypeProps {
  step: number;
  type: CardProps;
}

const RenderTitle: FC<
  ButtonType &
    StepAndTypeProps & {
      value?: string;
      onChange?: (title: string) => void;
    }
> = ({ step, value, onPress, type }) => {
  // const { title, icon } = value;

  const ref = useRef<Animatable.View>(null);
  const firstRef = useRef(true);
  useEffect(() => {
    if (step === 0 && !firstRef.current) {
      ref.current?.fadeInUp?.call(undefined);
    }
    if (step === 1) {
      ref.current?.fadeInUp?.call(100);
    }
    firstRef.current = false;
  }, [step]);

  return (
    <Animatable.View ref={ref as never} useNativeDriver animation="fadeInUp">
      {step === 0 && (
        <>
          <StyledTopButton top={0} onPress={onPress}>
            {/* <StyledIconBG color={color || '#afd2ef'}>
              <StyledIconImage
                resizeMode="contain"
                size={40}
                source={svgs[icon || 'sun']}
              />
            </StyledIconBG> */}
            <StyledTitleView>
              <StyledTitle>{value}</StyledTitle>
              <StyledIcon size={15} name="edit" />
            </StyledTitleView>
          </StyledTopButton>
        </>
      )}
      {step === 1 && (type === CardTitle || type === CardIconAndColor) && (
        <>
          <StyledSubTitleView>
            <StyledSubTitle>习惯标题</StyledSubTitle>
          </StyledSubTitleView>

          <StyledTitleInput
            // name="title"
            placeholderTextColor="rgba(180,180,180,1)"
            returnKeyType="done"
            autoFocus={false}
            maxLength={50}
            // keyboardType={boardType}
            style={[styles.textInputTitle]}
            underlineColorAndroid="transparent"
            placeholder="例如跑步、早睡等"
            // clearButtonMode='while-editing'
            enablesReturnKeyAutomatically
          />
          {/* <Animatable.View key="IconAndColor" animation="fadeInUp" delay={500}> */}
          {/* <IconAndColor /> */}
          {/* </Animatable.View> */}
        </>
      )}
    </Animatable.View>
  );
};

const RenderIconAndColor: FC<
  ButtonType &
    StepAndTypeProps & {
      value?: { name: string; color: string };
      onChange?: (data: { name: string; color: string }) => void;
    }
> = ({ step, value, onPress, onChange, type }) => {
  const { name = '', color = '' } = value || {};

  const ref = useRef<Animatable.View>(null);
  const firstRef = useRef(true);
  useEffect(() => {
    if (step === 0 && !firstRef.current) {
      ref.current?.fadeInUp?.call(undefined);
    }
    if (step === 1) {
      ref.current?.fadeInUp?.call(100);
    }
    firstRef.current = false;
  }, [step]);

  return (
    <Animatable.View ref={ref as never} useNativeDriver animation="fadeInUp">
      {step === 0 && (
        <>
          <StyledTopButton onPress={onPress}>
            <StyledIconBG color={color || '#afd2ef'}>
              <StyledIconImage
                resizeMode="contain"
                size={40}
                source={svgs[name || 'sun']}
              />
            </StyledIconBG>
          </StyledTopButton>
        </>
      )}
      {step === 1 && (type === CardTitle || type === CardIconAndColor) && (
        <IconAndColor icon={name} color={color} onChange={onChange} />
      )}
    </Animatable.View>
  );
};

const RenderNotifyTimePicker: FC<
  Omit<RenderItemProps, 'discrib'> &
    StepAndTypeProps & {
      value?: string[];
      onChange?: (options: string[]) => void;
    }
> = ({ step, type, index = 1, value = [], onChange, ...other }) => {
  const ref = useRef<Animatable.View>(null);
  const firstRef = useRef(true);
  useEffect(() => {
    if (step === 0 && !firstRef.current) {
      ref.current?.fadeInUp?.call(index * 100);
    }
    if (step === 1) {
      ref.current?.fadeInUp?.call(100);
    }
    firstRef.current = false;
  }, [step]);

  // console.log('value', value);

  return (
    <Animatable.View
      animation="fadeInUp"
      ref={ref as never}
      useNativeDriver
      delay={index * 100}>
      {step === 0 && (
        <RenderItem
          {...other}
          discrib={value.length > 0 ? value.toString() : '无'}
        />
      )}
      {step === 1 && type === CardNotifyTimes && (
        <NotifyTimePicker
          // name="notifyTimes"
          onChange={onChange}
          // keyName='ItemId'
          options={value}
        />
      )}
    </Animatable.View>
  );
};

const RemderComboNotifyText: FC<
  Omit<RenderItemProps, 'discrib'> &
    StepAndTypeProps & {
      value?: string;
      onChange?: (options: string) => void;
    }
> = ({ value = '', onChange, index = 0, type, step, ...other }) => {
  const ref = useRef<Animatable.View>(null);
  const firstRef = useRef(true);
  useEffect(() => {
    if (step === 0 && !firstRef.current) {
      ref.current?.fadeInUp?.call(index * 100);
    }
    if (step === 1) {
      ref.current?.fadeInUp?.call(100);
    }
    firstRef.current = false;
  }, [step]);

  // console.log('value', value);

  return (
    <Animatable.View
      animation="fadeInUp"
      ref={ref as never}
      useNativeDriver
      delay={index * 100}>
      {step === 0 && <RenderItem {...other} discrib={value} />}
      {step === 1 && type === CardNotifyText && (
        <RemderNotifyText
          value={value}
          onChange={(e) => {
            onChange && onChange(e.nativeEvent.text);
          }}
        />
      )}
    </Animatable.View>
  );
};

const dayText = (recordDay: number[]) => {
  const days = recordDay.sort();

  // console.log('days:', days);

  if (days.length === 0) {
    return '无';
  }
  if (days.length === 7) {
    return '每天';
  }
  if (days.length === 2 && days[0] === 6) {
    return '周六与周日';
  }
  if (days.length === 5 && days[4] === 5) {
    return '周一至周五';
  }
  const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return days.map((day) => names[day - 1]).toString();
};

const RenderLimitTimesPicker: FC<
  Omit<RenderItemProps, 'discrib'> &
    StepAndTypeProps & {
      value?: { day: number[]; time: string[] };
      onChange?: (options: { day: number[]; time: string[] }) => void;
    }
> = ({ step, type, index = 1, value, onChange, ...other }) => {
  const ref = useRef<Animatable.View>(null);
  const firstRef = useRef(true);
  useEffect(() => {
    if (step === 0 && !firstRef.current) {
      ref.current?.fadeInUp?.call(index * 100);
    }
    if (step === 1) {
      ref.current?.fadeInUp?.call(100);
    }
    firstRef.current = false;
  }, [step]);

  const { day, time } = value || {};

  return (
    <Animatable.View
      animation="fadeInUp"
      ref={ref as never}
      useNativeDriver
      delay={index * 100}>
      {step === 0 && (
        <RenderItem
          {...other}
          discrib={
            day?.length! > 0 ? dayText(day || []) + ':' + time?.join('~') : '无'
          }
        />
      )}
      {step === 1 && type === CardLimitDayAndTimes && (
        <RenderRecordDay
          // name="notifyTimes"
          onChange={onChange}
          // keyName='ItemId'
          value={value}
        />
      )}
    </Animatable.View>
  );
};

const RenderComboRecord: FC<
  Omit<RenderItemProps, 'discrib'> &
    StepAndTypeProps & {
      value?: string[];
      onChange?: (records: string[]) => void;
    }
> = ({ step, type, index = 1, value = [], onChange, ...other }) => {
  const ref = useRef<Animatable.View>(null);
  const firstRef = useRef(true);
  useEffect(() => {
    if (step === 0 && !firstRef.current) {
      ref.current?.fadeInUp?.call(index * 100);
    }
    if (step === 1) {
      ref.current?.fadeInUp?.call(100);
    }
    firstRef.current = false;
  }, [step]);

  return (
    <Animatable.View
      animation="fadeInUp"
      ref={ref as never}
      useNativeDriver
      delay={index * 100}>
      {step === 0 && <RenderItem {...other} discrib={value.toString()} />}
      {step === 1 && type === CardRecord && (
        <RemderRecord onChange={onChange} value={value} />
      )}
    </Animatable.View>
  );
};

const RenderComboSounds: FC<
  Omit<RenderItemProps, 'discrib'> &
    StepAndTypeProps & {
      value?: CardFormData['sound'];
      onChange?: (records: CardFormData['sound']) => void;
      // color: string;
    }
> = ({ step, type, index = 1, value, onChange, ...other }) => {
  const ref = useRef<Animatable.View>(null);
  const firstRef = useRef(true);
  useEffect(() => {
    if (step === 0 && !firstRef.current) {
      ref.current?.fadeInUp?.call(index * 100);
    }
    if (step === 1) {
      ref.current?.fadeInUp?.call(100);
    }
    firstRef.current = false;
  }, [step]);

  return (
    <Animatable.View
      animation="fadeInUp"
      ref={ref as never}
      useNativeDriver
      delay={index * 100}>
      {step === 0 && (
        <RenderItem
          {...other}
          discrib={value?.open ? value?.item.title : '无'}
        />
      )}
      {step === 1 && type === CardSound && (
        <RenderSounds
          color={'green'}
          value={value!}
          onChange={(item) => {
            // onSelect('sound', item);
            //   console.log('key', item?.key);
            onChange && onChange(item);
          }}
        />
      )}
    </Animatable.View>
  );
};

const OptionDo: FC<OptionDoProps> = ({ step, nextStep, control }) => {
  const [type, setType] = useState<CardProps>('menu');
  const onPress = (value: CardProps) => {
    setType(value);
    nextStep();
  };
  return (
    <ScrollView style={[styles.wrap]}>
      <Controller
        // defaultValue=''
        step={step}
        type={type}
        name={CardIconAndColor}
        control={control}
        onPress={onPress.bind(undefined, CardIconAndColor)}
        // onChangeText={text => setval}
        as={RenderIconAndColor}
      />
      <Controller
        // defaultValue=''
        step={step}
        type={type}
        name={CardTitle}
        control={control}
        onPress={onPress.bind(undefined, CardTitle)}
        // onChangeText={text => setval}
        as={RenderTitle}
      />
      <Controller
        // defaultValue=''
        step={step}
        type={type}
        name={CardNotifyTimes}
        control={control}
        index={1}
        title="提醒时间"
        // discrib={''}
        onPress={onPress.bind(undefined, CardNotifyTimes)}
        // onChangeText={text => setval}
        as={RenderNotifyTimePicker}
      />
      <Controller
        // defaultValue=''
        step={step}
        type={type}
        name={CardLimitDayAndTimes}
        control={control}
        index={2}
        title="时间限制"
        // discrib={''}
        onPress={onPress.bind(undefined, CardLimitDayAndTimes)}
        // onChangeText={text => setval}
        as={RenderLimitTimesPicker}
      />
      <Controller
        // defaultValue=''
        step={step}
        type={type}
        name={CardNotifyText}
        control={control}
        index={3}
        title="我的激励"
        // discrib={''}
        onPress={onPress.bind(undefined, CardNotifyText)}
        // onChangeText={text => setval}
        as={RemderComboNotifyText}
      />
      <Controller
        // defaultValue=''
        step={step}
        type={type}
        name={CardRecord}
        control={control}
        index={4}
        title="打卡要求"
        // discrib={''}
        onPress={onPress.bind(undefined, CardRecord)}
        // onChangeText={text => setval}
        as={RenderComboRecord}
      />
      <Controller
        // defaultValue=''
        step={step}
        // color={color}
        type={type}
        name={CardSound}
        control={control}
        index={5}
        title="打卡音效"
        // discrib={''}
        onPress={onPress.bind(undefined, CardSound)}
        // onChangeText={text => setval}
        as={RenderComboSounds}
      />
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default OptionDo;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },

  notifyTimeView: {
    paddingHorizontal: 13,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  textInputTitle: {
    height: 50,
    textAlign: 'left',
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 15,
  },

  textInputStyle: {
    // width:200,
    // marginLeft: 0,
    backgroundColor: 'transparent',
    height: 168,
    fontSize: 17,
    textAlignVertical: 'top',
  },
});
