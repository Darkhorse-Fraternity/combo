/**
 * Created by lintong on 2017/8/4.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component,PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Keyboard,
  ActivityIndicator
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import {icons,colors} from '../Creat/IconAndColorData'
import { TextInput } from '../../../../components/Form/Cunstom/index'
import { Radio, Multiple } from '../../../../components/Form/Select/index'
import Toast from 'react-native-simple-toast'
import { mainColor } from '../../../../Theme/index'
import {
  StyledTitleView,
  StyledTitleText,
  StyledSubTitle,
  StyledSubTitleView,
  StyledItemText,
  StyledLogoImage,
  StyledItemView
} from './style'
import IconAndColor from '../Creat/IconAndColor'

export const StaticOption = {
  notifyTimes: [],
  period: '7',
  notifyText: '',
  record: [],
  recordDay: [1, 2, 3, 4, 5, 6, 7],
  icon:'sun',
  color:colors[0],
}

import {
  formValues,
} from 'redux-form/immutable'
import Button from '../../../../components/Button/index'
import NotifyTimePicker from '../NotifyTimePicker'

@formValues('title',
  'notifyTimes',
  'notifyText',
  'period',
  'record',
  'recordDay',
  'icon',
  'color',
  )

export default class OptionDo extends PureComponent {
  constructor(props: Object) {
    super(props);

    this.state = {
      type: 'menu'
    }
  }

  static propTypes = {
    step: PropTypes.number,
    nextStep: PropTypes.func.isRequired,
  };
  static defaultProps = {
  };




  __renderItem = (props) => {
    return (
      <Animatable.View animation="fadeInLeft"
                       delay={Math.random() * 300}
      >
        <Button
          onPress={() => {
            this.setState({ type: props.type })
            this.props.nextStep()
          }}
          style={[styles.item, styles.shadow]}>
          <Text
            numberOfLines={1}>
            {props.title}
          </Text>
        </Button>
      </Animatable.View>
    )
  }


  __renderTitle = () => {

    return (
      <Animatable.View animation="fadeInUp">

        <StyledSubTitleView>
          <StyledSubTitle>
            习惯标题
          </StyledSubTitle>
        </StyledSubTitleView>

        <TextInput
          name='title'
          placeholderTextColor="rgba(180,180,180,1)"
          selectionColor={mainColor}
          returnKeyType='done'
          autoFocus={true}
          maxLength={50}
          //keyboardType={boardType}
          style={[styles.textInputTitle]}
          underlineColorAndroid='transparent'
          placeholder={"例如跑步、早睡等"}
          // clearButtonMode='while-editing'
          enablesReturnKeyAutomatically={true}
        />
      </Animatable.View>
    )


  }

  __renderperiod = () => {
    const items = ['5', '6', '7', '8',
      '9', '10', '11', '12', '13', '14'];

    const __renderRadioItem = (item, selItem) => {
      return (
        <StyledItemView
          contain={selItem === item}
          style={{width: 60 }}
          key={item}>
          <StyledItemText
            contain={selItem === item}>
            {item}组
          </StyledItemText>
        </StyledItemView>)
    }

    return (
      <Animatable.View animation="fadeInUp">
        <StyledSubTitleView>
          <StyledSubTitle>
            卡片周期
          </StyledSubTitle>
        </StyledSubTitleView>
        <Radio
          style={[styles.notifyTimeView]}
          name='period'
          //keyName='ItemId'
          options={items}
          renderItem={__renderRadioItem}/>
      </Animatable.View>
    )
  }

  __renderNotifyTime = () => {

    return (
      <Animatable.View animation="fadeInUp"
      >
        <NotifyTimePicker
          name='notifyTimes'
          //keyName='ItemId'
          options={this.props.notifyTimes}/>
      </Animatable.View>
    )
  }

  __remderNotifyText = () => {

    return (
      <Animatable.View animation="fadeInUp">
        <StyledSubTitleView>
          <StyledSubTitle>
            给自己的激励
          </StyledSubTitle>
        </StyledSubTitleView>
        <View
          style={[{
            backgroundColor: '#f6f7f9',
            padding: 5,
            borderRadius: 5,
            marginHorizontal: 15
          }]}>
          <TextInput
            name='notifyText'
            defaultValue={this.state.notifyText}
            placeholderTextColor="rgba(180,180,180,1)"
            selectionColor={mainColor}
            returnKeyType='done'
            autoFocus={true}
            maxLength={300}
            //keyboardType={boardType}
            style={styles.textInputStyle}
            multiline={true}
            underlineColorAndroid='transparent'
            placeholder={"时不我待!"}
            clearButtonMode='while-editing'
            enablesReturnKeyAutomatically={true}
          />
        </View>
      </Animatable.View>
    )

  }


  __remderRecord = () => {

    const items = ['文字', '图片']

    const __renderRadioItem = (item, contain) => {
      return (
        <StyledItemView
          contain={contain}
          key={item}>
          <StyledItemText contain={contain}>
            {item}
          </StyledItemText>
        </StyledItemView>)
    }


    return (
      <Animatable.View animation="fadeInUp"
                       delay={Math.random() * 300}
      >
        <StyledSubTitleView>
          <StyledSubTitle>
            打卡方式
          </StyledSubTitle>
        </StyledSubTitleView>

        <Multiple
          style={[styles.notifyTimeView]}
          name='record'
          //keyName='ItemId'
          options={items}
          renderItem={__renderRadioItem}/>
      </Animatable.View>
    )

  }

  __renderRecordDay = () => {

    const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const sels = [1, 2, 3, 4, 5, 6, 7]

    const __renderRadioItem = (item, contain) => {
      return (
        <StyledItemView
          contain={contain}
          key={names[item]}>
          <StyledItemText contain={contain}>
            {names[item - 1]}
          </StyledItemText>
        </StyledItemView>)
    }

    return (
      <Animatable.View animation="fadeInUp"
                       delay={Math.random() * 300}
      >
        <StyledSubTitleView>
          <StyledSubTitle>
            打卡日
          </StyledSubTitle>
        </StyledSubTitleView>
        <Multiple
          style={[styles.notifyTimeView]}
          name='recordDay'
          //keyName='ItemId'
          options={sels}
          renderItem={__renderRadioItem}/>
      </Animatable.View>
    )
  }


  __renderDayText = (recordDay) => {
    const days = recordDay.toJS().sort();

    // console.log('days:', days);

    if (days.length === 0) {
      return "无"
    } else if (days.length === 7) {
      return "每天"
    } else if (days.length === 2 && days[0] === 6) {
      return '周六与周日'
    } else if (days.length === 5 && days[4] === 5) {
      return '周一至周五'
    } else {
      const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      return days.map(day => names[day - 1]).toString()
    }
  }


  __renderIconAndColor = () => {



    return (
      <Animatable.View animation="fadeInUp"
                       delay={Math.random() * 300}
      >
        <IconAndColor/>
      </Animatable.View>
    )
  }


  render(): ReactElement<any> {
    const revise = this.props.revise
    const notifyText = this.props.notifyText && this.props.notifyText.length > 0
      ? this.props.notifyText : '无'
    // console.log('test:', this.props.record);
    let { record, notifyTimes } = this.props
    record = (record.length === 0 || record.size === 0)
      ? '无要求' : record.join('+')

    // console.log('record:', notifyTimes);
    notifyTimes = notifyTimes.size === 0 ? '无' :
      notifyTimes.join("、")

    // console.log('notifyTimes:', notifyTimes);

    const recordDay = this.__renderDayText(this.props.recordDay)

    // const { modify } = this.props


    // console.log('this.state.option:', this.state.option);

    return (
      // modify && <StyledLogoImage
      //   source={require('../../../../source/img/my/icon-60.png')}
      //   key={'logo'}/>,
      <ScrollView
        key={'bc'}
        style={[styles.wrap, this.props.style]}>

        {this.props.step === 0  && (<View style={{flex:1}}>

          <Animatable.View animation="fadeIn">
            <StyledTitleView>
              <StyledTitleText>
                必填项
              </StyledTitleText>
            </StyledTitleView>
          </Animatable.View>
          <this.__renderItem
            title={"习惯标题:   " + this.props.title}
            type="title"
          />
          <this.__renderItem
            title={"卡片图标与颜色"}
            type="iconAndColor"
          />

          <Animatable.View animation="fadeIn">
            <StyledTitleView>
              <StyledTitleText>
                选填项
              </StyledTitleText>
            </StyledTitleView>
          </Animatable.View>

          <this.__renderItem
            title={"提醒日:   " + recordDay}
            type="recordDay"
          />
          <this.__renderItem
            title={"提醒时间:   " + notifyTimes}
            type="notifyTimes"
            />
          <this.__renderItem
            title={"我的激励:   " + notifyText}
            type="notifyText"
            />
          <this.__renderItem
            title={"日记要求:   " + record}
            type="record"
            />
          <this.__renderItem
            title={"卡片周期:   " + this.props.period + '组'}
            type="period"
           />

        </View>)}


        {this.props.step === 1 &&
        this.state.type === 'title' &&
        this.__renderTitle()}

        {this.props.step === 1 &&
        this.state.type === 'iconAndColor' &&
        this.__renderIconAndColor()}


        {this.props.step === 1 &&
        this.state.type === 'notifyTimes' &&
        this.__renderNotifyTime()}

        {this.props.step === 1 &&
        this.state.type === 'period' &&
        this.__renderperiod()}

        {this.props.step === 1 &&
        this.state.type === 'notifyText' &&
        this.__remderNotifyText()}

        {this.props.step === 1 &&
        this.state.type === 'recordDay' &&
        this.__renderRecordDay()}

        {this.props.step === 1 &&
        this.state.type === 'record' &&
        this.__remderRecord()}

        <View style={{ height: 100 }}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  item: {
    marginTop: 7.5,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    alignSelf: 'flex-start',
    marginBottom: 7.,
    marginRight: 55,
  },
  done: {
    marginTop: 7.5,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    alignSelf: 'flex-end',
    marginBottom: 7.5,
    marginLeft: 5,
  },

  shadow: {
    shadowColor: '#979797',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 5,
    elevation: 3
  },

  notifyTimeView: {

    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
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
    backgroundColor:'transparent',
    height: 168,
    fontSize: 17,
    textAlignVertical: 'top',


  },
})
