/**
 * Created by lintong on 2018/10/15.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import {
  StyledSubTitleView,
  StyledSubTitle
} from './style'
import {
  StyledCell,
} from './Cell/style'
import SvgUri from 'react-native-svg-uri';
import Cell from './Cell'
import ColorCell from './Cell/ColorCell'
import { Field } from 'redux-form/immutable'
import svgs from '../../../../../source/svgs'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
// import colors from '../../../../../source/colors'
import { Map } from 'immutable';
import {icons,colors} from './IconAndColorData'

@connect(
  state => ({}),
  dispatch => ({})
)


export default class IconAndColor extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      show:false,
    }
  }


  componentDidMount() {
    this.timer =  setTimeout(()=>{
      this.setState({show:true})
    },10)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  static propTypes = {};
  static defaultProps = {};


  render(): ReactElement<any> {


    if(this.state.show === false ){
      return <View/>
    }


    const { iconAndColor } = this.props

    return (
      <View delay={1000} animation='fadeIn'>
        <StyledSubTitleView>
          <StyledSubTitle>
            挑选图标与颜色：
          </StyledSubTitle>
          {iconAndColor &&
          <StyledCell
            backgroundColor={iconAndColor.get('color')}
            style={{ marginLeft: 0 }}>
            <SvgUri
              style={{ position: 'absolute' }}
              width={45}
              height={45}
              svgXmlData={svgs[iconAndColor.get('name')]}
            />
          </StyledCell>}
        </StyledSubTitleView>


        <ScrollView
          key={'icon'}
          removeClippedSubviews={true}
          contentContainerStyle={{
            width: 1100,
            flexWrap: 'wrap',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {icons.map(item =>
            (<Cell
              key={item.name}
              onPress={(props) => {
                const { input } = props
                const { value, onChange } = input
                onChange(new Map({
                  name: item.name,
                  color: value.get('color')
                }))
              }}
              data={item}/>))}
        </ScrollView>
        <ScrollView
          key={'color'}
           removeClippedSubviews={true}
          contentContainerStyle={{
            width: 2200,
            flexWrap: 'wrap',
            overflow: 'hidden'
          }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {colors.map(item =>
            <Field
              key={item}
              name={`iconAndColor`}
              component={props =>
                <ColorCell
                  select={props.input.value && props.input.value.get('color') === item}
                  onPress={() => {
                    const { input } = props
                    const { value, onChange } = input
                    onChange(new Map({
                      name: value.get('name'),
                      color: item
                    }))
                  }}
                  key={item}
                  color={item}/>}/>)}
        </ScrollView>
      </View>
    );
  }
}


