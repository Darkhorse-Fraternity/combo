/**
 * Created by lintong on 2018/7/23.
 * @flow
 */

import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import {
  StyledContent,
  StyledImage,
  StyledInnerView,
  StyledTitle,
  StyledImageBack,
} from './style';
import icons from '../../../../source/icons';

export default class CardCell extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    img: PropTypes.object,
    title: PropTypes.string,
    des: PropTypes.string,
  };

  static defaultProps = {};

  render() {
    const { title, onPress, name, color } = this.props;

    // const {  iconAndColor,title ,recordDay} = iCard
    // const { color, name } = iconAndColor || {name:'sun',color:'#b0d2ee'}

    // const source = img ? { uri: img.url } :
    //   require('../../../../source/img/my/icon-60.png')

    return (
      <StyledContent onPress={onPress}>
        <StyledImageBack color={color}>
          <StyledImage resizeMode="contain" source={icons[name]} />
        </StyledImageBack>
        <StyledTitle numberOfLines={1}>{title}</StyledTitle>
      </StyledContent>
    );
  }
}
