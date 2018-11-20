/**
 * Created by lintong on 2018/7/23.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
  View,
  Image
} from 'react-native'
import PropTypes from 'prop-types';

import {
  StyledContent,
  StyledImage,
  StyledInnerView,
  StyledTitle,
  StyledImageBack
} from './style'
import icons from '../../../../source/icons'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


export default class CardCell extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {
    onPress: PropTypes.func,
    img: PropTypes.object,
    title: PropTypes.string,
    des: PropTypes.string,
  };
  static defaultProps = {};


  render(): ReactElement<any> {


    const {
      title,
      onPress,
      img,
      name,
      color,
    } = this.props


    // const {  iconAndColor,title ,recordDay} = iCard
    // const { color, name } = iconAndColor || {name:'sun',color:'#b0d2ee'}

    // const source = img ? { uri: img.url } :
    //   require('../../../../source/img/my/icon-60.png')


    return (
      <StyledContent onPress={onPress}>
        <StyledImageBack color={color}>
          <StyledImage source={icons[name]}/>
        </StyledImageBack>
        <StyledTitle numberOfLines={1}>
          {title}
        </StyledTitle>
      </StyledContent>
    );
  }
}


