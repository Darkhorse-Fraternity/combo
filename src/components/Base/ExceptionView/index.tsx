/* @flow */
import React, { Component, isValidElement, PureComponent, ReactChild } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Dimensions,
  Platform,
  ImageStyle,
} from 'react-native';
import PropTypes from 'prop-types';
import Indicators from '../../Indicators';
import {
  StyledContent,
  StyledReportBtn,
  StyledReportText,
} from './style';


export enum ExceptionType {
  Loading = 'exceptionTypeLoading',
  NoData = 'exceptionTypeNoData',
  NetError = 'exceptionTypeError',
};


export interface ExceptionViewProps {
  exceptionType?: ExceptionType;
  prompt?: Function | ReactChild[] | ReactChild;
  otherTips?: string;
  onRefresh?: Function | (() => void) | null;
  tipBtnText?: string;
  // children?: ReactChild[] | ReactChild;
  prompIamgeStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  promptImage?: ImageSourcePropType;
}


export default class ExceptionView extends PureComponent<ExceptionViewProps, any>  {


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
    const text = this.props.prompt;
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




  renderPromptLoad() {
    // const {width, height} = Dimensions.get('window');
    // const dWidth = Platform.OS === 'ios' ? width / 375 : 200 / 300;
    // const imgWidth = dWidth * 359 * 0.5;
    // const imgHeight = dWidth * 77 * 0.5;
    // const navigationBarHeight = 44 + StatusBarHeight;
    return <Indicators />
  }


  // _renderPromptIndicator = (type: string) => {
  //   switch (type) {
  //     case ExceptionType.Loading:
  //       return (
  //         <Indicators size="large" />
  //       );
  //     case ExceptionType.NoData:
  //     case ExceptionType.NetError:
  //       return (
  //         <Indicators size="large" animated={false} />
  //       );
  //     default:
  //       break;
  //   }
  // };
  renderPromptImage(promptImage: ImageSourcePropType) {
    const { prompIamgeStyle } = this.props;
    //console.log('promptImage', promptImage);

    return (
      <Image source={promptImage} style={[styles.image, prompIamgeStyle]} />
    );
  }

  render() {



    const {
      style,
      exceptionType = ExceptionType.Loading,
      promptImage = require('@img/my/logo.png'),
    } = this.props;

    // console.log("exceptionType", exceptionType);
    return (
      <StyledContent
        style={style}
      >
        {exceptionType === ExceptionType.Loading && this.renderPromptLoad()}
        {exceptionType === 'exceptionTypeNoData' &&
          promptImage &&
          this.renderPromptImage(promptImage)}
        {this.renderPrompt()}

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
    width: 40,
    height: 40,
    // marginTop: -StatusBarHeight,
    alignSelf: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 13,
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
