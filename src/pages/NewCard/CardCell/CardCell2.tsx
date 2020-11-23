/**
 * Created by lintong on 2018/7/23.
 * @flow
 */

import React, { PureComponent } from 'react';
import { View } from 'react-native';

import {
  StyledContent2,
  StyledImage2,
  StyledInnerView,
  StyledTitle2,
  StyledImageBack2,
  StyledArrowView,
  StyledNotify,
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
  static defaultProps = {
    des: '',
  };

  render() {
    const { title, onPress, name, color, des } = this.props;

    // const {  iconAndColor,title ,recordDay} = iCard
    // const { color, name } = iconAndColor || {name:'sun',color:'#b0d2ee'}

    // const source = img ? { uri: img.url } :
    //   require('../../../../source/img/my/icon-60.png')

    return (
      <StyledContent2 onPress={onPress}>
        <StyledInnerView>
          <StyledImageBack2 color={color}>
            <StyledImage2 resizeMode="contain" source={icons[name]} />
          </StyledImageBack2>
          <View>
            <StyledTitle2 numberOfLines={1}>{title}</StyledTitle2>
            <StyledNotify>{des}</StyledNotify>
          </View>
        </StyledInnerView>

        <StyledArrowView />
      </StyledContent2>
    );
  }
}
