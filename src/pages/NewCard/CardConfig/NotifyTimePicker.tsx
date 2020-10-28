/**
 * Created by lintong on 2018/9/18.
 * @flow
 */

import React, { PureComponent } from 'react';
import { View, LayoutAnimation, Platform } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FieldArray, Field } from 'redux-form/immutable';
import { StyleNoticeText } from './style';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import * as Animatable from 'react-native-animatable';
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
  StyledLine,
} from './style';
import { Multiple } from '../../../components/Form/Select/index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useLocalRemindConfig } from '@configure/app';

function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

@connect((state) => ({}), (dispatch) => ({}))
export default class NotifyTimePicker extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      isDelete: false,
    };
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.any.isRequired,
  };

  static defaultProps = {};

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  handleViewRef = {};

  item = [];

  renderComponent = ({ fields, meta: { error, submitFailed } }) => [
    <StyledNotifyButton
      key="button"
      onPress={async () => {
        if (fields.length >= 10) {
          Toast.show('单个卡片提醒数量不可超过10个哦~');
          return;
        }
        this.setState({ isDateTimePickerVisible: true, isDelete: false });
        const self = this;
        this.onChange = async (time) => {
          const { options } = this.props;
          const position = options.findIndex((item) => item === time);

          if (position === -1) {
            await fields.insert(fields.length, time);
            self.handleViewRef[fields.length] &&
              self.handleViewRef[fields.length].bounceIn();
          } else {
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              Toast.show('已经存在啦！');
            }, 500);
          }
        };
      }}>
      <StyledNotifyButtonInner>
        <StyledMaterialIcons size={30} name="alarm-add" />
      </StyledNotifyButtonInner>
    </StyledNotifyButton>,
    ...fields.map((item, index) => (
      <Field
        name={`${item}`}
        key={`${item}`}
        component={(props) => (
          <Animatable.View
            useNativeDriver
            easing="ease-in-out"
            // animation="bounceIn"
            ref={(ref) => (this.handleViewRef[index] = ref)}>
            <StyledNotifyButton
              key="button"
              onPress={async () => {
                if (this.state.isDelete) {
                  if (this.props.options.size === 1) {
                    this.setState({ isDelete: false });
                  }
                  // await  this.handleViewRef[index].bounceOut()
                  fields.remove(index);
                  return;
                }

                this.onChange = async (time) => {
                  const { options } = this.props;
                  const position = options.findIndex((item) => item === time);
                  const self = this;
                  if (position === -1) {
                    await props.input.onChange(time);
                    self.handleViewRef[index] &&
                      self.handleViewRef[index].bounceIn();
                  } else if (position !== index) {
                    this.timer && clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                      Toast.show('已经存在啦！');
                    }, 500);

                    // fields.move(position,index)
                  }
                };
                this.setState({ isDateTimePickerVisible: true });
              }}>
              {this.state.isDelete && (
                <StyledRound>
                  <StyledLine />
                </StyledRound>
              )}
              <StyledNotifyButtonInner>
                <StyledMaterialIcons size={30} name="alarm" />
                <StyledNotifyTime>{props.input.value} </StyledNotifyTime>
              </StyledNotifyButtonInner>
            </StyledNotifyButton>
          </Animatable.View>
        )}
      />
    )),
  ];

  onChange = null;

  dataArray = [];

  _handleDatePicked = (date) => {
    this.setState({ isDateTimePickerVisible: false });
    const hours = PrefixInteger(date.getHours(), 2);
    const minutes = PrefixInteger(date.getMinutes(), 2);
    const time = `${hours}:${minutes}`;
    this.onChange && this.onChange(time);

    this.onChange = null;
  };

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  render(): ReactElement<any> {
    const { name, options } = this.props;

    return (
      <View>
        <StyledSubTitleView>
          <StyledSubTitle>选择提醒时间</StyledSubTitle>
          {options.size > 0 && (
            <StyledControl
              onPress={() => {
                this.setState({ isDelete: !this.state.isDelete });
                LayoutAnimation.spring();
              }}>
              <StyledShowDelete>
                {!this.state.isDelete ? '删除' : '取消删除'}
              </StyledShowDelete>
            </StyledControl>
          )}
        </StyledSubTitleView>
        <StyledInner>
          <FieldArray
            key={name}
            name={name}
            isDelete={this.state.isDelete}
            component={this.renderComponent}
          />
        </StyledInner>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode="time"
          cancelTextIOS="取消"
          headerTextIOS="选择提醒时间"
          // isDarkModeEnabled={true}
          confirmTextIOS="确定"
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        <NoticeTip />
      </View>
    );
  }
}

const NoticeTip = () => {
  const { navigate } = useNavigation();
  const state = useLocalRemindConfig();

  if (state) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigate('remind');
      }}>
      <StyleNoticeText>
        {' '}
        点击开启{Platform.OS === 'ios' ? '习惯' : '日历'}提醒权限!{' '}
      </StyleNoticeText>
    </TouchableOpacity>
  );
};
