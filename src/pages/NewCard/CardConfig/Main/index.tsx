/**
 * Created by lintong on 2017/8/4.
 * @flow
 */

import React, { FC, forwardRef, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {
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
  StyledTitleInputBg,
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
  CardState,
  CardTitle,
} from '../card_interface';
import { Control, Controller } from 'react-hook-form';
import Multiple from './Multiple';
import { CircleState } from '@configure/enum';
import { RenderCardState } from './team';

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

const RenderItem: FC<RenderItemProps> = forwardRef(
  ({ title, discrib, ...other }, _) => (
    <StyledCellButton {...other}>
      <StyledCellInner>
        <StyledCellTitle numberOfLines={1}>{title}</StyledCellTitle>
        <StyledCellDiscrib>{discrib}</StyledCellDiscrib>
      </StyledCellInner>
      <StyledArrow />
    </StyledCellButton>
  ),
);

const RemderNotifyText: FC<{
  value: string;
  onChange: (value: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}> = forwardRef(({ value, onChange }, _) => (
  <>
    <StyledSubTitleView>
      <StyledSubTitle>给自己的激励</StyledSubTitle>
    </StyledSubTitleView>
    <StyledTitleInputBg>
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
    </StyledTitleInputBg>
  </>
));

const RenderRecordDay: FC<{
  onChange?: (options: { day: number[]; time: string[] }) => void;
  value?: { day: number[]; time: string[] };
}> = forwardRef(({ onChange, value }, _) => {
  const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const sels = [1, 2, 3, 4, 5, 6, 7];
  const [state, setstate] = useState(value!);
  const firstRef = useRef(true);
  useEffect(() => {
    if (state && onChange && !firstRef.current) {
      onChange(state);
    }
    firstRef.current = false;
  }, [onChange, state]);

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
});

const RemderRecord: FC<{
  value: string[];
  onChange?: (records: string[]) => void;
}> = forwardRef(({ value, onChange }, _) => {
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
          <StyledSubTitle>打卡填写要求</StyledSubTitle>
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
});

const RenderTitle: FC<{
  value?: string;
  onChange?: (title: string) => void;
}> = forwardRef(({ value, onChange }, _) => {
  return (
    <>
      <StyledSubTitleView>
        <StyledSubTitle>习惯标题</StyledSubTitle>
      </StyledSubTitleView>

      <StyledTitleInput
        // name="title"
        value={value}
        placeholderTextColor="rgba(180,180,180,1)"
        returnKeyType="done"
        autoFocus={false}
        maxLength={50}
        onChange={(e) => onChange?.call(undefined, e.nativeEvent.text)}
        // keyboardType={boardType}
        style={styles.textInputTitle}
        underlineColorAndroid="transparent"
        placeholder="例如跑步、早睡等"
        // clearButtonMode='while-editing'
        enablesReturnKeyAutomatically
      />
    </>
  );
});

const RenderIconAndColor: FC<{
  value?: { name: string; color: string };
  onChange?: (data: { name: string; color: string }) => void;
}> = forwardRef(({ value, onChange }, _) => {
  const { name = '', color = '' } = value || {};
  return <IconAndColor icon={name} color={color} onChange={onChange} />;
});

const RenderNotifyTimePicker: FC<{
  value?: string[];
  onChange?: (options: string[]) => void;
}> = forwardRef(({ value = [], onChange }, _) => {
  return (
    <NotifyTimePicker
      // name="notifyTimes"
      onChange={onChange}
      // keyName='ItemId'
      options={value}
    />
  );
});

const RemderComboNotifyText: FC<{
  value?: string;
  onChange?: (options: string) => void;
}> = forwardRef(({ value = '', onChange }, _) => {
  // console.log('value', value);

  return (
    <RemderNotifyText
      value={value}
      onChange={(e) => {
        onChange && onChange(e.nativeEvent.text);
      }}
    />
  );
});

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

const RenderLimitTimesPicker: FC<{
  value?: { day: number[]; time: string[] };
  onChange?: (options: { day: number[]; time: string[] }) => void;
}> = forwardRef(({ value, onChange }, _) => {
  return (
    <RenderRecordDay
      // name="notifyTimes"
      onChange={onChange}
      // keyName='ItemId'
      value={value}
    />
  );
});

const RenderComboRecord: FC<{
  value?: string[];
  onChange?: (records: string[]) => void;
}> = forwardRef(({ value = [], onChange }, _) => {
  return <RemderRecord onChange={onChange} value={value} />;
});

const RenderComboSounds: FC<{
  value?: CardFormData['sound'];
  onChange?: (records: CardFormData['sound']) => void;
}> = forwardRef(({ value, onChange }, _) => {
  return (
    <RenderSounds
      color={'green'}
      value={value!}
      onChange={(item) => {
        onChange && onChange(item);
      }}
    />
  );
});

const LauchDisplay: FC<{
  control: Control<CardFormData>;
  onPress: (value: CardProps) => void;
}> = ({ onPress, control }) => {
  const data = control.getValues();
  const {
    iconAndColor,
    title,
    notifyTimes = ['00:00', '24:00'],
    limitTimes,
    notifyText,
    record = [],
    sound,
    cardState,
  } = data || {};
  const { color, name } = iconAndColor || {};
  const { day, time } = limitTimes || {};

  return (
    <Animatable.View useNativeDriver animation="fadeInUp">
      <StyledTopButton onPress={onPress.bind(undefined, CardIconAndColor)}>
        <StyledIconBG color={color || '#afd2ef'}>
          <StyledIconImage
            resizeMode="contain"
            size={40}
            source={svgs[name || 'sun']}
          />
        </StyledIconBG>
      </StyledTopButton>
      <StyledTopButton top={-10} onPress={onPress.bind(undefined, CardTitle)}>
        {/* <StyledIconBG color={color || '#afd2ef'}>
              <StyledIconImage
                resizeMode="contain"
                size={40}
                source={svgs[icon || 'sun']}
              />
            </StyledIconBG> */}
        <StyledTitleView>
          <StyledTitle>{title}</StyledTitle>
          <StyledIcon size={15} name="edit" />
        </StyledTitleView>
      </StyledTopButton>

      <RenderItem
        title={'提醒时间'}
        onPress={onPress.bind(undefined, CardNotifyTimes)}
        discrib={notifyTimes.length > 0 ? notifyTimes.toString() : '无'}
      />

      <RenderItem
        title={'时间限制'}
        onPress={onPress.bind(undefined, CardLimitDayAndTimes)}
        discrib={
          day?.length! > 0 ? dayText(day || []) + ':' + time?.join('~') : '无'
        }
      />
      <RenderItem
        title={'我的激励'}
        onPress={onPress.bind(undefined, CardNotifyText)}
        discrib={notifyText}
      />

      <RenderItem
        title={'打卡要求'}
        onPress={onPress.bind(undefined, CardRecord)}
        discrib={record.length > 0 ? record.toString() : '无'}
      />

      <RenderItem
        title={'打卡音效'}
        onPress={onPress.bind(undefined, CardSound)}
        discrib={sound?.open ? sound?.item.title : '无'}
      />

      <RenderItem
        title={'小组配置'}
        onPress={onPress.bind(undefined, CardState)}
        discrib={cardState === CircleState.close ? '关闭' : '开启'}
      />
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
    <ScrollView style={styles.wrap}>
      {step === 0 && <LauchDisplay control={control} onPress={onPress} />}

      {step === 1 && (
        <Animatable.View animation="fadeInUp" useNativeDriver>
          {(type === CardTitle || type === CardIconAndColor) && (
            <Controller
              // defaultValue=''
              name={CardTitle}
              control={control}
              as={RenderTitle}
            />
          )}
          {(type === CardTitle || type === CardIconAndColor) && (
            <Controller
              name={CardIconAndColor}
              control={control}
              as={RenderIconAndColor}
            />
          )}

          {type === CardNotifyTimes && (
            <Controller
              name={CardNotifyTimes}
              control={control}
              as={RenderNotifyTimePicker}
            />
          )}
          {type === CardLimitDayAndTimes && (
            <Controller
              name={CardLimitDayAndTimes}
              control={control}
              as={RenderLimitTimesPicker}
            />
          )}
          {type === CardNotifyText && (
            <Controller
              name={CardNotifyText}
              control={control}
              as={RemderComboNotifyText}
            />
          )}
          {type === CardRecord && (
            <Controller
              name={CardRecord}
              control={control}
              as={RenderComboRecord}
            />
          )}

          {type === CardSound && (
            <Controller
              name={CardSound}
              control={control}
              as={RenderComboSounds}
            />
          )}
          {type === CardState && (
            <Controller
              color="green"
              name={CardState}
              control={control}
              as={RenderCardState}
            />
          )}
        </Animatable.View>
      )}
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
