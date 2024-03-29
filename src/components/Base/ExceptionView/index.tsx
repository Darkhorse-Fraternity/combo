/* @flow */
import React, { isValidElement, PureComponent, ReactChild } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  // useColorScheme,
} from 'react-native';
import Indicators from '../../Indicators';
import { StyledContent, StyledReportBtn, StyledReportText } from './style';

export enum ExceptionType {
  Loading = 'exceptionTypeLoading',
  NoData = 'exceptionTypeNoData',
  NetError = 'exceptionTypeError',
}

interface RenderPromptImageProp {
  promptImage?: ImageSourcePropType;
  prompIamgeStyle?: StyleProp<ImageStyle>;
}

const RenderPromptImage = (props: RenderPromptImageProp) => {
  // const sc = useColorScheme();
  // const isMode = sc === 'dark';

  const {
    prompIamgeStyle,
    promptImage = require('@img/my/logo.png'),
    // ? require('@img/my/logo.png')
    // : require('@img/my/logo-dark.png'),
  } = props;
  return <Image source={promptImage} style={[styles.image, prompIamgeStyle]} />;
};

export interface ExceptionViewProps {
  exceptionType?: ExceptionType;
  prompt?: Function | ReactChild[] | ReactChild | null;
  otherTips?: string;
  onRefresh?: () => void;
  tipBtnText?: string;
  // children?: ReactChild[] | ReactChild;
  prompIamgeStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  promptImage?: ImageSourcePropType;
}

export default class ExceptionView extends PureComponent<ExceptionViewProps> {
  static defaultProps = {
    exceptionType: ExceptionType.Loading,
  };

  constructor(props: Object) {
    super(props);
  }

  renderTipButton = () =>
    this.props.tipBtnText ? (
      <StyledReportBtn onPress={this.props.onRefresh}>
        <StyledReportText>{this.props.tipBtnText}</StyledReportText>
      </StyledReportBtn>
    ) : null;

  renderPrompt() {
    const { prompt, exceptionType } = this.props;

    const defaultPrompt =
      exceptionType === ExceptionType.Loading ? '正在加载～' : '没有数据～';
    const text = prompt || defaultPrompt;
    // console.log('defaultPrompt', defaultPrompt);

    if (prompt === null) {
      return null;
    }

    if (isValidElement(prompt)) {
      return prompt;
    }

    return <Text style={styles.text}>{text}</Text>;
  }

  renderOtherTips() {
    const { otherTips } = this.props;
    if (isValidElement(otherTips)) {
      return otherTips;
    }
    return <Text style={styles.otherTips}>{otherTips}</Text>;
  }

  render() {
    const {
      style,
      exceptionType = ExceptionType.Loading,
      promptImage,
    } = this.props;

    // console.log("exceptionType", exceptionType);
    return (
      // @ts-ignore: Unreachable code error
      <StyledContent style={style}>
        {exceptionType === ExceptionType.Loading && <Indicators />}
        {exceptionType === ExceptionType.NoData && (
          <RenderPromptImage promptImage={promptImage} {...this.props} />
        )}
        {this.renderPrompt()}

        {this.renderTipButton()}
      </StyledContent>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    // position:'absolute',
    width: 50,
    height: 50,
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
