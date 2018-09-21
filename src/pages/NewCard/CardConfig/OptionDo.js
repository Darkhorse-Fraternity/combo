/**
 * Created by lintong on 2017/8/4.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
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

import { AutoGrowingInput, TextInput } from '../../../components/Form/Cunstom/index'
import { Radio, Multiple } from '../../../components/Form/Select/index'
import Toast from 'react-native-simple-toast'
import { mainColor } from '../../../Theme/index'
import {
  StyledTitleView,
  StyledTitleText,
  StyledSubTitle
} from './style'


export const StaticOption = {
  notifyTimes: [],
  period: '7',
  notifyText: '',
  record: [],
  recordDay: [1, 2, 3, 4, 5, 6, 7],
}

import {
  formValues,
} from 'redux-form/immutable'
import Button from '../../../components/Button/index'
import NotifyTimePicker from './NotifyTimePicker'

@formValues('title', 'notifyTimes', 'notifyText', 'period', 'record', 'recordDay')

export default class OptionDo extends Component {
  constructor(props: Object) {
    super(props);

    this.state = {
      option: 0,
      type: 'notifyTime'
    }
  }

  static propTypes = {
    goBack: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
    load: PropTypes.bool
  };
  static defaultProps = {
    load: false
  };


  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
  }

  __backStep = () => {

    if (!this.props.title || this.props.title.length === 0) {

      Toast.show('卡片名称不可为空~')
      return;
    }

    if (this.state.option !== 0) {
      this.setState({ option: 0 })
    } else {
      this.props.goBack && this.props.goBack()
    }
  }

  __remderBack = () => {
    return (
      <Animatable.View animation="fadeInLeft"
                       delay={Math.random() * 300}
      >
        <Button
          onPress={this.__backStep}
          style={[styles.item, styles.shadow]}>
          <Text>{this.state.option !== 0 ? "保存" : "返回"}</Text>
        </Button>
      </Animatable.View>
    )
  }

  __renderDone = () => {
    return (
      <Animatable.View animation="fadeInRight"
                       delay={Math.random() * 300}
      >
        <Button
          disabled={this.props.load}
          onPress={this.props.done}
          style={[styles.done, styles.shadow,
          ]}>
          {this.props.load ? <ActivityIndicator
              style={{ marginVertical: -3 }}/>
            : <Text>提交</Text>}
        </Button>

      </Animatable.View>
    )

  }

  __renderItem = (props) => {
    return (
      <Animatable.View animation="fadeInLeft"
                       delay={Math.random() * 300}
      >
        <Button
          onPress={() => {
            this.setState({ option: props.index, type: props.type })
          }}
          style={[styles.item, styles.shadow]}>
          <Text
            style={{}}
            numberOfLines={1}>
            {props.title}
          </Text>
        </Button>
      </Animatable.View>
    )
  }


  __renderTitle = () => {

    return (
      <Animatable.View animation="fadeInLeft">
        <View
          style={[styles.showItem, {
            backgroundColor: 'white',
            paddingHorizontal: 10
          }]}>
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
        </View>
      </Animatable.View>
    )


  }

  __renderperiod = () => {
    const items = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

    const __renderRadioItem = (item, selItem) => {
      return (
        <View
          style={[styles.notifyTimeItem,
            { backgroundColor: selItem === item ? '#31d930' : 'transparent' }]}
          key={item}>
          <Text
            style={{ color: selItem === item ? 'white' : 'black' }}>{item}</Text>
        </View>)
    }

    return (
      <Animatable.View animation="fadeInLeft">
        <Radio
          style={[styles.showItem, styles.notifyTimeView]}
          name='period'
          //keyName='ItemId'
          options={items}
          renderItem={__renderRadioItem}/>
      </Animatable.View>
    )
  }

  __renderNotifyTime = () => {

    return (
      <Animatable.View animation="fadeInLeft"
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
      <Animatable.View animation="fadeInLeft">
        <StyledSubTitle>
          给自己的激励
        </StyledSubTitle>
        <View
          style={[ {
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 5,
            marginHorizontal:10
          }]}>
          <TextInput
            name='notifyText'
            defaultValue={this.state.notifyText}
            placeholderTextColor="rgba(180,180,180,1)"
            selectionColor={mainColor}
            returnKeyType='done'
            autoFocus={true}
            maxLength={100}
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
        <View
          style={[styles.notifyTimeItem,
            { backgroundColor: contain ? '#31d930' : 'transparent' }]}
          key={item}>
          <Text style={{ color: contain ? 'white' : 'black' }}>{item}</Text>
        </View>)
    }


    return (
      <Animatable.View animation="fadeInLeft"
                       delay={Math.random() * 300}
      >
        <Multiple
          style={[styles.notifyTimeView, styles.showItem]}
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
        <View
          style={[styles.notifyTimeItem,
            { backgroundColor: contain ? '#31d930' : 'transparent' }]}
          key={names[item]}>
          <Text style={{ color: contain ? 'white' : 'black' }}>{names[item - 1]}</Text>
        </View>)
    }

    return (
      <Animatable.View animation="fadeInLeft"
                       delay={Math.random() * 300}
      >
        <Multiple
          style={[styles.notifyTimeView, styles.showItem,]}
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
      return '休息日'
    } else if (days.length === 5 && days[4] === 5) {
      return '工作日'
    } else {
      const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      return days.map(day => names[day - 1]).toString()
    }
  }

  render(): ReactElement<any> {
    const revise = this.props.revise
    const notifyText = this.props.notifyText && this.props.notifyText.length > 0
      ? this.props.notifyText : '无'
    // console.log('test:', this.props.record);
    let { record, notifyTimes } = this.props
    record = (record.length === 0 || record.size === 0)
      ? '无' : record.join('+')

    // console.log('record:', notifyTimes);
    notifyTimes = notifyTimes.size === 0 ? '无' :
      notifyTimes.join("、")

    // console.log('notifyTimes:', notifyTimes);

    const recordDay = this.__renderDayText(this.props.recordDay)


    return (
      <ScrollView
        // onStartShouldSetResponder={() => true}
        // onResponderGrant={() => {
        //     Keyboard.dismiss()
        // }}
        style={[styles.wrap, this.props.style]}>
        <View style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          justifyContent: 'space-between'
        }}>
          {this.__remderBack()}
          {this.state.option === 0 && this.__renderDone()}
        </View>

        {/*{this.state.option !== 0 && <Animatable.View animation="fadeIn">*/}
        {/*<StyledTitleView>*/}
        {/*<StyledTitleText>*/}
        {/*返回自动保存*/}
        {/*</StyledTitleText>*/}
        {/*</StyledTitleView>*/}
        {/*</Animatable.View>}*/}


        {this.state.option === 0 && (<View>

          <Animatable.View animation="fadeIn">
            <StyledTitleView>
              <StyledTitleText>
                必填项
              </StyledTitleText>
            </StyledTitleView>
          </Animatable.View>
          {(<this.__renderItem
            title={"卡片名称:   " + this.props.title}
            type="title"
            index={1}/>)}

          <Animatable.View animation="fadeIn">
            <StyledTitleView>
              <StyledTitleText>
                选填项
              </StyledTitleText>
            </StyledTitleView>
          </Animatable.View>


          <this.__renderItem
            title={"记录方式:   " + record}
            type="record"
            index={1}/>
          <this.__renderItem
            title={"提醒时间:   " + notifyTimes}
            type="notifyTimes"
            index={1}/>
          <this.__renderItem
            title={"我的激励:   " + notifyText}
            type="notifyText"
            index={1}/>
          <this.__renderItem
            title={"提醒日:   " + recordDay}
            type="recordDay"
            index={1}/>
          <this.__renderItem
            title={"打卡周期:   " + this.props.period + '天'}
            type="period"
            index={1}/>


        </View>)}


        {this.state.option === 1 &&
        this.state.type === 'title' &&
        this.__renderTitle()}

        {this.state.option === 1 &&
        this.state.type === 'notifyTimes' &&
        this.__renderNotifyTime()}

        {this.state.option === 1 &&
        this.state.type === 'period' &&
        this.__renderperiod()}

        {this.state.option === 1 &&
        this.state.type === 'notifyText' &&
        this.__remderNotifyText()}

        {this.state.option === 1 &&
        this.state.type === 'recordDay' &&
        this.__renderRecordDay()}

        {this.state.option === 1 &&
        this.state.type === 'record' &&
        this.__remderRecord()}

        <View style={{ height: 300 }}/>
      </ScrollView>
    );
  }
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 80,
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
    padding: 15,
    alignSelf: 'flex-end',
    marginBottom: 7.5,
    marginLeft: 5,
  },

  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 5,
    elevation: 3
  },

  notifyTimeItem: {
    width: (width - 20 - 40) / 4,
    height: 35,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 8,
  },
  notifyTimeView: {

    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  showItem: {
    marginTop: 20,
  },

  textInputTitle: {
    height: 50,
    textAlign: 'left',
    fontSize: 15,
    color: 'black',
  },

  textInputStyle: {
    // width:200,
    // marginLeft: 0,
    height: 168,
    fontSize: 17,
    textAlignVertical: 'top',


  },
  line: {
    backgroundColor: 'rgb(150,150,150)',
    height: StyleSheet.hairlineWidth,
    margin: 5,
  }
})
