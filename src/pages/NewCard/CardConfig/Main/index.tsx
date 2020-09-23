/**
 * Created by lintong on 2017/8/4.
 * @flow
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInput } from '../../../../components/Form/Cunstom/index';
import { Radio, Multiple } from '../../../../components/Form/Select/index';
import { mainColor } from '../../../../Theme/index';
import { Field, formValues } from 'redux-form/immutable';
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
} from './style';
import IconAndColor from '../Creat/IconAndColor';
import svgs from '../../../../../source/icons';
import LimitTimePicker from '../LimitTimePicker';

import NotifyTimePicker from '../NotifyTimePicker';
import { RenderSounds } from './sound';

@formValues(
  'title',
  'notifyTimes',
  'notifyText',
  'period',
  'record',
  'recordDay',
  'icon',
  'color',
  'limitTimes',
  'sound',
)
export default class OptionDo extends PureComponent<
{
  step: number;
  onSelect: (field: string, value: string | Object | undefined) => void;
},
{ type: string }
> {
  constructor(props: Object) {
    super(props);

    this.state = {
      type: 'menu',
    };
  }

  static propTypes = {
    step: PropTypes.number,
    nextStep: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  __renderItem = (props) => (
    <Animatable.View animation="fadeInUp" delay={props.index * 100}>
      <StyledCellButton
        onPress={() => {
          if (props.type === 'notifyTimes') {


          }
          this.setState({ type: props.type });
          this.props.nextStep();
        }}>
        <StyledCellInner>
          <StyledCellTitle numberOfLines={1}>{props.title}</StyledCellTitle>
          <StyledCellDiscrib>{props.discrib}</StyledCellDiscrib>
        </StyledCellInner>
        <StyledArrow />
      </StyledCellButton>
    </Animatable.View>
  );

  __renderTitle = () => {
    const { icon, color, onChange } = this.props;
    return (
      <>
        <StyledSubTitleView>
          <StyledSubTitle>习惯标题</StyledSubTitle>
        </StyledSubTitleView>

        <TextInput
          name="title"
          placeholderTextColor="rgba(180,180,180,1)"
          selectionColor={mainColor}
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
        <Animatable.View key="IconAndColor" animation="fadeInUp" delay={500}>
          <IconAndColor />
        </Animatable.View>
      </>
    );
  };

  __renderperiod = () => {
    const items = ['5', '6', '7', '8', '9', '10', '14', '21', '30'];

    const __renderRadioItem = (item, selItem) => (
      <StyledItemView contain={selItem === item} style={{ width: 75 }} key={item}>
        <StyledItemText contain={selItem === item}>{item}组</StyledItemText>
      </StyledItemView>
    );

    return (
      <>
        <StyledSubTitleView>
          <StyledSubTitle>习惯周期</StyledSubTitle>
        </StyledSubTitleView>
        <Radio
          style={[styles.notifyTimeView]}
          name="period"
          // keyName='ItemId'
          options={items}
          renderItem={__renderRadioItem}
        />
      </>
    );
  };

  __renderNotifyTime = () => (
    <>
      <NotifyTimePicker
        name="notifyTimes"
        // keyName='ItemId'
        options={this.props.notifyTimes}
      />
    </>
  );

  __remderNotifyText = () => (
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
        <TextInput
          name="notifyText"
          defaultValue={this.state.notifyText}
          placeholderTextColor="rgba(180,180,180,1)"
          selectionColor={mainColor}
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

  __remderRecord = () => {
    const items = ['文字', '图片'];

    const __renderRadioItem = (item, contain) => (
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

          <Multiple
            style={[styles.notifyTimeView]}
            name="record"
            // keyName='ItemId'
            options={items}
            renderItem={__renderRadioItem}
          />
        </Animatable.View>
      </StyledSubView>
    );
  };

  __renderRecordDay = () => {
    const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const sels = [1, 2, 3, 4, 5, 6, 7];

    const __renderRadioItem = (item, contain) => (
      <StyledItemView contain={contain} key={names[item]}>
        <StyledItemText contain={contain}>{names[item - 1]}</StyledItemText>
      </StyledItemView>
    );

    return (
      <StyledSubView>
        <StyledSubTitleView>
          <StyledSubTitle>打卡日限制</StyledSubTitle>
        </StyledSubTitleView>
        <Multiple
          style={[styles.notifyTimeView]}
          name="recordDay"
          // keyName='ItemId'
          options={sels}
          renderItem={__renderRadioItem}
        />
        <Animatable.View animation="fadeInUp" delay={300}>
          <StyledSubTitleView>
            <StyledSubTitle>时间段限制</StyledSubTitle>
          </StyledSubTitleView>
          <LimitTimePicker name="limitTimes" />
        </Animatable.View>
      </StyledSubView>
    );
  };

  __renderDayText = (recordDay) => {
    const days = recordDay.toJS().sort();

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

  render(): ReactElement<any> {
    let { icon, color, title, sound, onSelect } = this.props;
    sound = sound && sound.toJS && sound.toJS();
    const notifyText =
      this.props.notifyText && this.props.notifyText.length > 0
        ? this.props.notifyText
        : '无';
    // console.log('test:', this.props.record);
    let { record, notifyTimes } = this.props;
    record =
      record.length === 0 || record.size === 0 ? '默认点击' : record.join('+');

    // console.log('record:', notifyTimes);
    notifyTimes = notifyTimes.size === 0 ? '无' : notifyTimes.join('、');

    // console.log('notifyTimes:', notifyTimes);

    const recordDay = this.__renderDayText(this.props.recordDay);
    let { limitTimes } = this.props;
    limitTimes = (limitTimes && limitTimes.toJS().join('~')) || '';
    limitTimes = limitTimes === '00:00~24:00' ? '' : `，${limitTimes}`;
    // const { modify } = this.props

    // console.log('this.state.option:', this.state.option);

    // const NextStep = this.props.step ? <View /> : <View />;

    return (
      // modify && <StyledLogoImage
      //   source={require('../../../../source/img/my/icon-60.png')}
      //   key={'logo'}/>,
      <ScrollView style={[styles.wrap]}>
        {this.props.step === 0 && (
          <View style={{ flex: 1 }}>
            <Animatable.View animation="fadeInUp">
              <StyledTopButton
                onPress={() => {
                  this.setState({ type: 'title' });
                  this.props.nextStep();
                }}>
                <StyledIconBG color={color || '#afd2ef'}>
                  <StyledIconImage
                    resizeMode="contain"
                    size={40}
                    source={svgs[icon || 'sun']}
                  />
                </StyledIconBG>
                <StyledTitleView>
                  <StyledTitle>{title}</StyledTitle>
                  <StyledIcon size={15} name="edit" />
                </StyledTitleView>
              </StyledTopButton>
            </Animatable.View>
            <this.__renderItem
              index={1}
              title="提醒时间"
              discrib={notifyTimes}
              type="notifyTimes"
            />

            <this.__renderItem
              index={2}
              title="时间限制"
              discrib={recordDay + limitTimes}
              type="recordDay"
            />

            <this.__renderItem
              index={3}
              title="我的激励"
              discrib={notifyText}
              type="notifyText"
            />
            <this.__renderItem
              index={4}
              title="打卡要求"
              discrib={record}
              type="record"
            />

            <this.__renderItem
              index={5}
              title="打卡音效"
              discrib={
                sound?.open === false ? '无' : sound?.item?.title ?? 'bell'
              }
              type="sound"
            />
            {/* <this.__renderItem
            index={5}
            title="习惯周期"
            discrib={`${this.props.period}组`}
            type="period"
          /> */}
          </View>
        )}

        {this.props.step === 1 && (
          <Animatable.View animation="fadeInUp">
            {this.state.type === 'title' && this.__renderTitle()}

            {this.state.type === 'notifyTimes' && this.__renderNotifyTime()}

            {this.state.type === 'period' && this.__renderperiod()}

            {this.state.type === 'notifyText' && this.__remderNotifyText()}

            {this.state.type === 'recordDay' && this.__renderRecordDay()}

            {this.state.type === 'record' && this.__remderRecord()}

            {this.state.type === 'sound' && (
              <RenderSounds
                color={color}
                value={sound}
                onChange={(item) => {
                  onSelect('sound', item);
                  //   console.log('key', item?.key);
                }}
              />
            )}
            {/* {this.state.type === 'sound' && (
              <Field
                name="sound"
                component={RenderSounds}
                sound={sound}
                color={color}
              />
            )} */}
          </Animatable.View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    );
  }
}

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
