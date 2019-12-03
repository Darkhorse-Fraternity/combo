/* @flow */
import React, { Component, isValidElement } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { defaultFormatUtc } from 'moment';
import Indicators from '../../Indicators';
import {
  StyledContent,
  StyledReportBtn,
  StyledReportText,
  StyledActivityIndicator,
  StyledImage,
  StyleReportView,
  StyledIcon,
  StyledRefresh
} from './style';


export const ExceptionType = {
  Loading: 'exceptionTypeLoading',
  NoData: 'exceptionTypeNoData',
  NetError: 'exceptionTypeError',
};


export default class ExceptionView extends Component {
  static propTypes = {
    exceptionType: PropTypes.string,
    prompt: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    image: PropTypes.number,
    otherTips: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onRefresh: PropTypes.func,
    tipBtnText: PropTypes.string
  };

  static defaultProps = {
    exceptionType: ExceptionType.Loading,
    prompt: '暂无数据'
  };

  constructor(props: Object) {
    super(props);
  }


  renderTipButton = () => (
    this.props.tipBtnText ? (
      <StyledReportBtn onPress={() => {
        this.props.onRefresh && this.props.onRefresh();
      }}
      >
        <StyledReportText>
          {this.props.tipBtnText}
        </StyledReportText>

      </StyledReportBtn>
    ) : null
  )

  renderPrompt() {
    if (isValidElement(this.props.prompt)) {
      return this.props.prompt;
    }
    const text = this.getPromptText(this.props.exceptionType);
    if (text) {
      return (
        <Text style={styles.text}>
          {text}
        </Text>
      );
    }
  }

  renderOtherTips() {
    const { otherTips } = this.props;
    if (isValidElement(otherTips)) {
      return otherTips;
    }
    return (
      <Text style={styles.otherTips}>{otherTips}</Text>
    );
  }


  getPromptText(type: string): string {
    let { prompt } = this.props;
    if (prompt) {
      return prompt;
    }
    switch (type) {
      case ExceptionType.Loading:
        prompt = '正在加载';
        break;
      case ExceptionType.NoData:
        prompt = '';
        break;
      case ExceptionType.NetError:
        prompt = '网络异常';
        break;
      default:
        break;
    }
    return prompt;
  }


  _renderPromptIndicator = (type: string) => {
    switch (type) {
      case ExceptionType.Loading:
        return (
          <Indicators size="large" />
        );
      case ExceptionType.NoData:
      case ExceptionType.NetError:
        return (
          <Indicators size="large" animated={false} />
        );
      default:
        break;
    }
  };


  render() {
    // let prompt = this.getPromptText(this.props.exceptionType);
    // console.log('test:', this.props.styles);
    // const style = {height:300,... this.props.styles}
    // console.log('test:', style);
    const {
      otherTips,
      // onRefresh,
      // refresh,
      style,
      exceptionType
    } = this.props;    
    return (
      <StyledContent
        style={style}
      >
        {this._renderPromptIndicator(exceptionType)}
        {this.renderPrompt()}
        {otherTips && this.renderOtherTips()}
        {this.renderTipButton()}
        {/* <Button */}
        {/* style={} */}
        {/* onPress={() => { */}
        {/* this.props.onRefresh && this.props.onRefresh() */}
        {/* }}> */}

        {/**/}
        {/* </Button> */}
      </StyledContent>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    // position:'absolute',
    width: 50,
    height: 50
  },
  text: {
    marginTop: 10,
    fontSize: 15,
    color: '#9e9e9e',
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  otherTips: {
    marginTop: 27,
    marginLeft: 43,
    marginRight: 43,
    fontSize: 13,
    color: '#9e9e9e',
    lineHeight: 26,
  },
});
