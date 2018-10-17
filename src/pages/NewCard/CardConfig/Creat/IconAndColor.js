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
import colors from '../../../../../source/colors'
import { Map } from 'immutable';
const data = [{
  name: 'cactus',
  size: 30,
}, {
  name: 'mangosteen',
  size: 30,
}, {
  name: 'watermelon',
  size: 30,
}]


const colorNames = ['DELTAORANGE','RED',
  'PINK','PURPLE','INDIGO','LIGHTBLUE','CYAN','TEAL','LIGHTGREEN',
  'LIME','YELLOW','AMBER','ORANGE','DEEPORANGE','BROWN','BLUEGREY']
const colorType = ['100','200','300','400','500']

let ColorData = []

colorNames.forEach((name)=>{
  colorType.forEach((type)=>{
    ColorData.push(colors[name][type])
  })

})

const  shuffle = function(self) {
  let m = self.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [self[m], self[i]] = [self[i], self[m]]
  }
  return self;
}
ColorData = shuffle(ColorData)
ColorData.push('#7e7e7e')

@connect(
  state => ({}),
  dispatch => ({})
)


export default class IconAndColor extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {};
  static defaultProps = {};


  render(): ReactElement<any> {


    const { iconAndColor } = this.props

    return (
      <View>
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
              width={30}
              height={30}
              svgXmlData={svgs[iconAndColor.get('name')]}
            />
          </StyledCell>}
        </StyledSubTitleView>


        <ScrollView
          key={'icon'}
          contentContainerStyle={{
            width: 500,
            flexWrap: 'wrap',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {data.map(item =>
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
          // removeClippedSubviews={true}
          contentContainerStyle={{
            width: 2200,
            flexWrap: 'wrap',
            overflow: 'hidden'
          }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {ColorData.map(item =>
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


