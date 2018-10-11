/**
 * Created by lintong on 2018/10/11.
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';


import {
  StyledCard,
  StyledCardTitle,
  StyledCardTitleView
} from './style'

const width = Dimensions.get('window').width
const itemWidth = (width-64)/3
const iconWidth = itemWidth/2

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { required } from "../../../request/validation";


@connect(
  state => ({}),
  dispatch => ({})
)

export default class PunchItem extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {
    title: PropTypes.string
  };
  static defaultProps = {};

  render(): ReactElement<any> {

    const { title } = this.props

    return (
      <StyledCard
        width={itemWidth}
        backgroundColor='#afd2ef'>
        <SvgUri
          width={iconWidth}
          height={iconWidth}
          source={require('../../../../source/svg/柠檬.svg')}
        />
        <StyledCardTitleView>
          <StyledCardTitle
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
            textAlignVertical={'center'}
            numberOfLines={1}>
            {title}
          </StyledCardTitle>
        </StyledCardTitleView>
      </StyledCard>
    );
  }
}


