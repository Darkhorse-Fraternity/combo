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
  StyledFlipCard,
  StyledCard,
  StyledCardTitle,
  StyledCardTitleView,
  StyledMaterialCommunityIcons,
  StyledButton
} from './style'

const width = Dimensions.get('window').width
const itemWidth = (width - 64) / 3
const iconWidth = itemWidth / 2
import svgs from '../../../../source/svgs'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';


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
    title: PropTypes.string,
    done: PropTypes.bool,
    name: PropTypes.string,
    color: PropTypes.string,
  };
  static defaultProps = {
    done: false,
    name: 'mangosteen',
    color: '#afd2ef'
  };

  render(): ReactElement<any> {

    const { title, done, style, name, color, onPress } = this.props

    return (
      <StyledButton onPress={onPress}>
        <StyledFlipCard
          style={style}
          useNativeDriver={true}
          friction={50}
          perspective={360}
          flipHorizontal={true}
          flipVertical={false}
          flip={done}
          clickable={false}
        >
          <StyledCard
            width={itemWidth}
            backgroundColor={color}>
            <View style={{ height: iconWidth }}>
              <SvgUri
                width={iconWidth}
                height={iconWidth}
                source={svgs[name]}
              />
            </View>
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
          <StyledCard

            width={itemWidth}
            backgroundColor={color}>
            <View style={{ height: iconWidth }}>
              <StyledMaterialCommunityIcons
                color={'white'}
                size={50}
                name={'check-decagram'}/>
            </View>
            <StyledCardTitleView>
              <StyledCardTitle
                style={{ color: 'white', fontWeight: '600' }}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
                textAlignVertical={'center'}
                numberOfLines={1}>
                打卡成功
              </StyledCardTitle>
            </StyledCardTitleView>
          </StyledCard>
        </StyledFlipCard>
      </StyledButton>
    );
  }
}


