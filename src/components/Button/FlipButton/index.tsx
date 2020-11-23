/**
 * Created by lintong on 2017/7/12.
 * @flow
 */

import React, { PureComponent, RefObject } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  TouchableOpacityProps,
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
  containStyle: {};
}

export default class FlipButton extends PureComponent<FlipButtonProps> {
  static defaultProps = {
    load: true,
    // animation:'bounceInRight',
    flip: false,
  };

  __renderActivety = () => {
    const { containStyle } = this.props;
    return (
      <StyledFace style={containStyle}>
        <ActivityIndicator
          size="small"
          color={theme.normalBtn.activityIndicatorColor}
        />
      </StyledFace>
    );
  };

  __renderCard = () => {
    const { containStyle, flip, faceText, backText } = this.props;

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
        <StyledFace style={containStyle}>
          <StyledFaceText>{faceText}</StyledFaceText>
        </StyledFace>
        {/* Back Side */}
        <StyledBack style={containStyle}>
          <StyledIcon
            ref={this.chatBtnRef}
            name="md-checkmark"
            size={20}
            color="green"
          />
          <StyledBackText>{backText}</StyledBackText>
        </StyledBack>
      </StyledCard>
    );
  };

  debouncedOnPress = (e: GestureResponderEvent) => {
    this.props.onPress && this.props.onPress(e);
  };

  onPress = debounce(this.debouncedOnPress, 300, {
    leading: true,
    trailing: false,
  });

  chatBtnRef:
    | ((instance: Icon | null) => void)
    | RefObject<Icon>
    | null
    | undefined;

  render() {
    // console.log('test:', this.state.statu !== 0 || this.props.load);
    const { style, disabled, load, animation = 'bounceInRight' } = this.props;

    return (
      <AniStyledContent
        useNativeDriver
        duration={1000}
        easing="ease-in-out"
        animation={animation}
        style={style}
        activeOpacity={1}
        disabled={disabled || load}
        onPress={this.onPress}>
        {load && this.__renderActivety()}
        {!load && this.__renderCard()}
      </AniStyledContent>
    );
  }
}
