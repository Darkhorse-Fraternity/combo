/**
 * Created by lintong on 2017/7/12.
 * @flow
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View} from 'react-native';
import {debounce} from 'lodash'; // 4.0.8
import * as Animatable from 'react-native-animatable';
import {theme} from '../../../Theme';

import {
  StyledContent,
  StyledCard,
  StyledFace,
  StyledBack,
  StyledFaceText,
  StyledBackText,
  StyledIcon,
} from './style';

export const AniStyledContent = Animatable.createAnimatableComponent(
  StyledContent,
);

export default class FlipButton extends PureComponent {
  static propTypes = {
    faceText: PropTypes.string.isRequired,
    backText: PropTypes.string.isRequired,
    load: PropTypes.bool,
    flip: PropTypes.bool,
    animation: PropTypes.string,
  };

  static defaultProps = {
    load: true,
    // animation:'bounceInRight',
    flip: false,
  };

  __renderActivety = () => {
    const {containStyle} = this.props;
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
    const {containStyle, flip, faceText, backText} = this.props;

    return (
      <StyledCard
        useNativeDriver
        friction={6}
        perspective={1000}
        flipHorizontal
        flipVertical={false}
        flip={flip}
        clickable={false}
        onFlipEnd={isFlipEnd => {
          // console.log('isFlipEnd', isFlipEnd)
          // this.setState({statu:1})
        }}>
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

  debouncedOnPress = () => {
    this.props.onPress && this.props.onPress();
  };

  onPress = debounce(this.debouncedOnPress, 300, {
    leading: true,
    trailing: false,
  });

  render() {
    // console.log('test:', this.state.statu !== 0 || this.props.load);
    const {style, disabled, load, animation} = this.props;

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
