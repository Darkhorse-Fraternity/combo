/**
 * Created by lintong on 2018/7/23.
 * @flow
 */


import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  StyledContent2,
  StyledImage2,
  StyledInnerView,
  StyledTitle2,
  StyledImageBack2,
  StyledName,
  StyledArrowView,
  StyledNotify
} from './style';
import icons from '../../../../source/icons';


export default class CardCell extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    des: PropTypes.string,
  };

  static defaultProps = {
    des: ''
  };


  render(): ReactElement<any> {
    const {
      title,
      onPress,
      name,
      color,
      nickname,
      des
    } = this.props;


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
            <StyledTitle2 numberOfLines={1}>
              {title}
            </StyledTitle2>
            <StyledNotify>
              {des}
            </StyledNotify>
          </View>
        </StyledInnerView>

        <StyledArrowView />
      </StyledContent2>
    );
  }
}
