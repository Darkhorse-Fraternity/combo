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

import styles, {
  StyledContent,
  StyledImage,
  StyledInnerView,
  StyledTitle,
  StyledDes
} from './style'
import icons from '../../../../source/icons'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


export default class CardRow extends Component {
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
      des
    } = this.props


    // const {  iconAndColor,title ,recordDay} = iCard
    // const { color, name } = iconAndColor || {name:'sun',color:'#b0d2ee'}

    const source = img ? { uri: img.url } :
      require('../../../../source/img/my/icon-60.png')


    return (
      <StyledContent onPress={onPress}>
        <View style={styles.shadow}>
          <View
            style={styles.imageContainer}>
            <StyledImage
              source={source}
              // defaultSource={require('../../../../source/img/my/icon-60.png')}
              style={[styles.image,!img && styles.imageDefault]}
            />
            <View style={styles.radiusMask}/>
          </View>
          <StyledInnerView style={styles.textContainer}>
            <StyledTitle numberOfLines={1}>
              {title}
            </StyledTitle>
            <StyledDes numberOfLines={1}>
              {des}
            </StyledDes>
          </StyledInnerView>
        </View>
      </StyledContent>
    );
  }
}


