/**
 * Created by lintong on 2018/12/25.
 * @flow
 */

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import { FieldArray, Field } from 'redux-form/immutable';

import {
  StyledLimitTimeContent,
  StyledNotifyButton,
  StyledMaterialIcons,
  StyledNotifyTime,
  StyledNotifyButtonInner,
} from './style';

function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

@connect((state) => ({}), (dispatch) => ({}))
export default class LimitTimePicker extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
    };
  }

  static propTypes = { name: PropTypes.string.isRequired };

  static defaultProps = {};

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  _handleDatePicked = (date) => {
    const hours = PrefixInteger(date.getHours(), 2);
    const minutes = PrefixInteger(date.getMinutes(), 2);
    const time = `${hours}:${minutes}`;
    this.onChange(time);
  };

  renderComponent = ({ fields, meta: { error, submitFailed } }) => (
    <StyledLimitTimeContent>
      <StyledNotifyTime>开始时间:</StyledNotifyTime>
      <Field
        name="limitTimes[0]"
        component={(props) => (
          <StyledNotifyButton
            onPress={() => {
              const self = this;
              this.setState({ isDateTimePickerVisible: true });
              this.onChange = async (time) => {
                // fields.
                const before = moment(time, 'HH:mm');
                const after = moment(fields.get(1), 'HH:mm');
                const flag = before.isBefore(after);
                if (flag) {
                  props.input.onChange && props.input.onChange(time);
                  self.setState({ isDateTimePickerVisible: false });
                } else {
                  Toast.showWithGravity(
                    '开始时间要小于结束时间,建议至少有一小时间隔。',
                    Toast.SHORT,
                    Toast.TOP,
                  );
                }
              };
            }}>
            <StyledNotifyButtonInner>
              <StyledMaterialIcons size={30} name="alarm" />
              <StyledNotifyTime>{props.input.value} </StyledNotifyTime>
            </StyledNotifyButtonInner>
          </StyledNotifyButton>
        )}
      />
      <StyledNotifyTime style={{ fontSize: 25 }}> ~ </StyledNotifyTime>
      <StyledNotifyTime style={{ marginLeft: 20 }}>结束时间:</StyledNotifyTime>
      <Field
        name="limitTimes[1]"
        component={(props) => (
          <StyledNotifyButton
            onPress={() => {
              const self = this;
              this.setState({ isDateTimePickerVisible: true });
              this.onChange = async (time) => {
                // fields.
                const before = moment(fields.get(0), 'HH:mm');
                const after = moment(time, 'HH:mm');
                const flag = before.isBefore(after);
                if (flag) {
                  props.input.onChange && props.input.onChange(time);
                  self.setState({ isDateTimePickerVisible: false });
                } else {
                  Toast.showWithGravity(
                    '开始时间要小于结束时间,建议至少有一小时间隔',
                    Toast.SHORT,
                    Toast.TOP,
                  );
                }
              };
            }}>
            <StyledNotifyButtonInner>
              <StyledMaterialIcons size={30} name="alarm" />
              <StyledNotifyTime>{props.input.value} </StyledNotifyTime>
            </StyledNotifyButtonInner>
          </StyledNotifyButton>
        )}
      />
    </StyledLimitTimeContent>
  );

  render(): ReactElement<any> {
    const { name } = this.props;

    return (
      <View>
        <FieldArray
          key={name}
          name={name}
          isDelete={this.state.isDelete}
          component={this.renderComponent}
        />

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode="time"
          display="spinner"
          cancelTextIOS="取消"
          headerTextIOS="选择提醒时间"
          confirmTextIOS="确定"
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}
