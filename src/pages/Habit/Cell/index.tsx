import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native';
import {
  StyledContent,
  StyledDes,
  StyledTitle,
  StyledIconBG,
  StyledInner,
  StyledTime,
  StyledIconImage
} from './style';
import svgs from '../../../../source/icons';

export default class Cell extends PureComponent {

  render() {
    const {
      iCard,
      onPress,
      data,
      iCard: { img },
    } = this.props;

    const {
      title, notifyText, iconAndColor, period
    } = iCard;
    const { time } = data;

    return (
      <StyledContent
        onPress={onPress}
      >
        <StyledIconBG color={iconAndColor ? iconAndColor.color : '#afd2ef'}>
          <StyledIconImage
            size={40}
            resizeMode="contain"
            source={svgs[iconAndColor ? iconAndColor.name : 'sun']}
          />
          {/* <SvgUri */}
          {/* width={40} */}
          {/* height={40} */}
          {/* svgXmlData={svgs[iconAndColor ? iconAndColor.name : 'sun']} */}
          {/* /> */}
        </StyledIconBG>
        <StyledInner>
          <StyledTitle>
            {title}
          </StyledTitle>

          <StyledTime>
            第
            {time}
            次
          </StyledTime>
          <StyledDes>
            {notifyText}
          </StyledDes>
        </StyledInner>

      </StyledContent>

    );
  }
}
