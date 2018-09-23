/**
 * Created by lintong on 2018/9/18.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Multiple } from '../../../components/Form/Select/index'
import { FieldArray, Field } from 'redux-form/immutable'
import {} from './style'
import { Map } from 'immutable';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import {
  StyledNotifyButton,
  StyledMaterialIcons,
  StyledIonicons,
  StyledSubTitle,
  StyledInner,
  StyledNotifyTime,
  StyledSubTitleView,
  StyledControl,
  StyledShowDelete,
  StyledNotifyButtonInner,
  StyledRound,
  StyledLine
} from './style'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast'
import * as Animatable from 'react-native-animatable';


function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

@connect(
  state => ({}),
  dispatch => ({})
)


export default class NotifyTimePicker extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      isDateTimePickerVisible: false,
      isDelete: false,
    }
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.any.isRequired,
  };
  static defaultProps = {};

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  handleViewRef = {}
  item = []
  renderComponent = ({ fields, meta: { error, submitFailed } }) => {


    return [

      <StyledNotifyButton
        key={'button'}
        onPress={async () => {
          if (fields.length >= 10) {
            Toast.show('单个卡片提醒数量不可超过10个哦~')
            return
          }
          this.setState({ isDateTimePickerVisible: true ,isDelete:false})
          const self = this
          this.onChange = async (time) => {
            const { options }  = this.props
            const position = options.findIndex(item => item === time);

            if (position === -1) {
              await fields.insert(fields.length, time)
              // self.handleViewRef[fields.length] &&
              // self.handleViewRef[fields.length].bounceIn()
            } else {
              this.timer && clearTimeout(this.timer);
              this.timer = setTimeout(() => {
                Toast.show('已经存在啦！')
              }, 500)
            }

          }
        }}>
        <StyledMaterialIcons size={30} name={'alarm-add'}/>
      </StyledNotifyButton>
      ,
      ...fields.map((item, index) => (
        <Field name={`${item}`}
               key={`${item}`}
               component={props => (
                 <Animatable.View
                   useNativeDriver
                   easing="ease-in-out"
                   // animation="bounceIn"
                   ref={ref => this.handleViewRef[index] = ref}
                 >
                   <StyledNotifyButton
                     key={'button'}
                     onPress={async () => {
                       if(this.state.isDelete){
                         if(this.props.options.size === 1){
                           this.setState({isDelete:false})
                         }
                         // await  this.handleViewRef[index].bounceOut()
                         fields.remove(index)
                         return
                       }


                       this.onChange = async (time) => {
                         const { options }  = this.props
                         const position = options.findIndex(item => item === time);
                         const self = this
                         if (position === -1) {
                           await props.input.onChange(time)
                           self.handleViewRef[index] &&
                           self.handleViewRef[index].bounceIn()
                         } else if (position !== index) {
                           this.timer && clearTimeout(this.timer);
                           this.timer = setTimeout(() => {
                             Toast.show('已经存在啦！')
                           }, 500)

                           // fields.move(position,index)
                         }

                       }
                       this.setState({ isDateTimePickerVisible: true })
                     }}>
                     <StyledNotifyButtonInner>
                       <StyledMaterialIcons
                         size={30}
                         name={'alarm'}/>
                       { this.state.isDelete && <StyledRound>
                         <StyledLine/>
                       </StyledRound>}
                     </StyledNotifyButtonInner>
                     <StyledNotifyTime>{props.input.value} </StyledNotifyTime>
                   </StyledNotifyButton>
                 </Animatable.View>
               )}/>
      ))
    ]
  }


  onChange = null;
  dataArray = [];
  _handleDatePicked = (date) => {
    this.setState({ isDateTimePickerVisible: false })
    const hours = PrefixInteger(date.getHours(), 2)
    const minutes = PrefixInteger(date.getMinutes(), 2)
    const time = `${hours}:${minutes}`
    this.onChange(time)

    this.onChange = null
  }

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  render(): ReactElement<any> {

    const { name, options } = this.props


    return (
      <View>
        <StyledSubTitleView>
          <StyledSubTitle>
            选择提醒时间
          </StyledSubTitle>
          {options.size > 0 && <StyledControl
            onPress={() => {
              this.setState({ isDelete: !this.state.isDelete })
              LayoutAnimation.spring();
            }}>
            <StyledShowDelete>
              {!this.state.isDelete ? '删除' : '取消删除'}
            </StyledShowDelete>
          </StyledControl>}
        </StyledSubTitleView>
        <StyledInner>
          <FieldArray
            key={name}
            name={name}
            isDelete = {this.state.isDelete}
            component={this.renderComponent}/>
        </StyledInner>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode={'time'}
          cancelTextIOS={'取消'}
          titleIOS={'选择提醒时间'}
          confirmTextIOS={'确定'}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}


