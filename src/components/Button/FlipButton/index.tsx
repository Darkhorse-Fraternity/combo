/**
 * Created by lintong on 2017/7/12.
 * @flow
 */

import React, { FC, PureComponent, RefObject } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { debounce } from 'lodash'; // 4.0.8
import * as Animatable from 'react-native-animatable';
import { theme } from '../../../Theme';

import {
  StyledContent,
  StyledCard,
  StyledFace,
  StyledBack,
  StyledFaceText,
  StyledBackText,
  StyledIcon,
} from './style';
import { Icon } from 'react-native-vector-icons/Icon';

export const AniStyledContent = Animatable.createAnimatableComponent(
  StyledContent,
);

interface FlipButtonProps extends TouchableOpacityProps {
  flip: boolean;
  load: boolean;
  backText: string;
  faceText: string;
  animation?: string;
  containStyle?: StyleProp<ViewStyle>;
}

type ChatBtnRefType =
  | ((instance: Icon | null) => void)
  | RefObject<Icon>
  | null
  | undefined;

const RenderCard: FC<FlipButtonProps & { chatBtnRef: ChatBtnRefType }> = (
  props,
) => {
  const { containStyle, flip, faceText, backText, chatBtnRef } = props;

  return (
    <StyledCard
      useNativeDriver
      friction={6}
      perspective={1000}
      flipHorizontal
      flipVertical={false}
      flip={flip}
      clickable={false}>
      {/* Face Side */}
      <StyledFace style={containStyle as {}}>
        <StyledFaceText>{faceText}</StyledFaceText>
      </StyledFace>
      {/* Back Side */}
      <StyledBack style={containStyle as {}}>
        <StyledIcon
          ref={chatBtnRef}
          name="md-checkmark"
          size={20}
          color="green"
        />
        <StyledBackText>{backText}</StyledBackText>
      </StyledBack>
    </StyledCard>
  );
};

const RenderActivety: FC<{ containStyle: StyleProp<ViewStyle> }> = (props) => {
  const { containStyle } = props;
  return (
    <StyledFace style={containStyle as {}}>
      <ActivityIndicator
        size="small"
        color={theme.normalBtn.activityIndicatorColor}
      />
    </StyledFace>
  );
};

export default class FlipButton extends PureComponent<FlipButtonProps> {
  static defaultProps = {
    load: true,
    // animation:'bounceInRight',
    flip: false,
  };

  debouncedOnPress = (e: GestureResponderEvent) => {
    this.props.onPress && this.props.onPress(e);
  };

  onPress = debounce(this.debouncedOnPress, 300, {
    leading: true,
    trailing: false,
  });

  chatBtnRef: ChatBtnRefType;

  render() {
    // console.log('test:', this.state.statu !== 0 || this.props.load);
    const {
      style,
      disabled,
      load,
      // animation = 'bounceInRight',
      containStyle,
    } = this.props;

    return (
      // <Animatable.View
      //   useNativeDriver
      //   duration={1000}
      //   easing="ease-in-out"
      //   animation={animation}
      //   // @ts-ignore: Unreachable code error
      // >
      <StyledContent
        activeOpacity={1}
        disabled={disabled || load}
        style={style as {}}
        onPress={this.onPress}>
        {load && <RenderActivety containStyle={containStyle} />}
        {!load && <RenderCard {...this.props} chatBtnRef={this.chatBtnRef} />}
      </StyledContent>
      // </Animatable.View>
    );
  }
}
