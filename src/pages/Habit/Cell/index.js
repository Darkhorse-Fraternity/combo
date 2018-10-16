import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import  {
  StyledContent,
  StyledDes,
  StyledTitle
} from './style';


export default class Cell extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
  };


  render() {
    const {
      iCard,
      onPress,
      data,
      iCard: { img },
    } = this.props;

    const { title, notifyText, } = iCard
    const time = data.time
    const source = img ? { uri: img.url } : require('../../../../source/img/my/icon-60.png')


    return (
      <StyledContent
        onPress={onPress}
      >

      </StyledContent>

    );
  }
}
