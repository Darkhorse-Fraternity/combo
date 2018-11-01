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


import {
  StyledFlipCard,
  StyledCard,
  StyledCardTitle,
  StyledCardTitleView,
  StyledMaterialCommunityIcons,
  StyledButton,
  StyledIconImage
} from './style'

const width = Dimensions.get('window').width
const itemWidth = (width - 64) / 3
const iconWidth = itemWidth / 2
import svgs from '../../../../source/icons'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { debounce } from 'lodash'; // 4.0.8



@connect(
  state => ({}),
  dispatch => ({})
)

export default class PunchItem extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      flip: props.done
    }
  }

  static propTypes = {
    title: PropTypes.string,
    done: PropTypes.bool,
    name: PropTypes.string,
    color: PropTypes.string,
  };
  static defaultProps = {
    done: false,
    name: 'sun',
    color: '#afd2ef'
  };


  flipDo= ()=>{
    if (this.props.done !== this.state.flip) {
      console.log('title2:', this.props.title);
      console.log('flip2:', this.props.done);
      this.setState({ flip: this.props.done })
    }
  }

  debounceFlip =  debounce(this.flipDo, 1000, { leading: false, trailing: true })

  componentWillReceiveProps(nextProps) {
    //TODO： 这边这样设置会有反复哦，所以这边就先避免了

    // const debounceFlip = debounceFlipConfig(nextProps,this.state)

    this.debounceFlip()

  }


  render(): ReactElement<any> {

    const { title, done, style, name, color, onPress } = this.props
    const { flip } = this.state

    const self = this
    return (
      <StyledButton
        // disabled={flip}
        onPress={() => {
          if (!flip) {
            onPress && onPress(() => {
              self.setState({ flip: !flip })
            })
          }
        }}>
        <StyledFlipCard
          style={style}
          useNativeDriver={true}
          friction={50}
          perspective={360}
          flipHorizontal={true}
          flipVertical={false}
          flip={flip}
          clickable={false}
        >
          <StyledCard
            width={itemWidth}
            backgroundColor={color}>
            <View style={{ height: iconWidth }}>
              <StyledIconImage
                size={iconWidth}
                source={svgs[name]}
                resizeMode={'contain'}
              />
              {/*<SvgUri*/}
              {/*width={iconWidth}*/}
              {/*height={iconWidth}*/}
              {/*svgXmlData={svgs[name]}*/}
              {/*/>*/}
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


