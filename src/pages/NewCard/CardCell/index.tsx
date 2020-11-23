/**
 * Created by lintong on 2018/7/23.
 * @flow
 */

import React, { PureComponent } from 'react';

import {
  StyledContent,
  StyledImage,
  StyledTitle,
  StyledImageBack,
} from './style';
import icons from '../../../../source/icons';
import { ButtonType } from '@components/Button';

interface CardCellProps extends ButtonType {
  title: string;
  color: string;
  des?: string;
  name: string;
}

export default class CardCell extends PureComponent<CardCellProps> {
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
