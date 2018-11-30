/**
 * Created by lintong on 2018/10/15.
 * @flow
 */
'use strict';

import React, { Component, PureComponent } from 'react';
import {
  View,
  ScrollView,
  InteractionManager,
} from 'react-native'
import {  FlatList, } from 'react-navigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import {
  StyledSubTitleView,
  StyledSubTitle
} from './style'
import {
  StyledCell,
  StyledCellImage
} from './Cell/style'
import Cell from './Cell'
import ColorCell from './Cell/ColorCell'
import { change } from 'redux-form/immutable'
import svgs from '../../../../../source/icons'
// import colors from '../../../../../source/colors'
import { colorsCutThree, iconsCutThree } from './IconAndColorData'

import {
  formValueSelector,
} from 'redux-form/immutable'

export const FormID = 'CreatCardForm'
const selector = formValueSelector(FormID) // <-- same as form name
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

@connect(
  state => ({
    // iconAndColor: selector(state, 'iconAndColor'),
    icon: selector(state, 'icon'),
    color: selector(state, 'color'),
  }),
  dispatch => ({
    onChange: (field, value) => {
      dispatch(change('CreatCardForm', field, value))
    }
  })
)


export default class IconAndColor extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      iconShow: true,
      colorShow:true,
    }
    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({ colorShow: true })
    // });
  }


  componentDidMount() {
    // InteractionManager.runAfterInteractions(async () => {
    //   // ...耗时较长的同步的任务...
    //   this.setState({ iconShow: true })
    // });

  }

  //
  // shouldComponentUpdate() {
  //   return false
  // }


  componentWillUnmount() {
  }

  static propTypes = {};
  static defaultProps = {};


  _keyExtractor = (item, index) => {
    const key = item[0].name || index;
    return key + '';
  }

  render(): ReactElement<any> {


    const { iconShow, colorShow } = this.state

    const { icon, color, onChange } = this.props

    return (
      <View>
        <StyledSubTitleView>
          <StyledSubTitle>
            挑选图标与颜色：
          </StyledSubTitle>

          {icon && color &&
          <StyledCell
            backgroundColor={color}
            style={{ marginLeft: 0 }}>
            <StyledCellImage
              resizeMode={'contain'}
              // style={{ position: 'absolute' }}
              size={35}
              height={35}
              source={svgs[icon]}
            />
          </StyledCell>}
        </StyledSubTitleView>


        {iconShow && <FlatList
          data={iconsCutThree}
          // delay={1000}
          // useNativeDriver
          // animation="fadeIn"
          horizontal
          removeClippedSubviews={true}
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: data) => (
            <View key ={item[0].name+'11'}>

              {item.map(it => (
                <Cell
                  select={icon === it.name}
                  key={it.name}
                  onPress={(ot) => {
                    console.log('ot:', it.name);
                    onChange('icon', it.name)
                  }}
                  data={it}/>
              ))}
            </View>
          )}
          keyExtractor={(item, index)=>{
            return item[0].name
          }}
          ListHeaderComponent={this._renderHeader}
          ListEmptyComponent={() => this.__renderNoData(statu)}
        />}


        {colorShow && <FlatList
          useNativeDriver
          delay={1100}
          animation="fadeInUp"
          data={colorsCutThree}
          horizontal
          removeClippedSubviews={true}
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: data) => (
            <View>

              {item.map(it => (
                <ColorCell
                  select={color === it}
                  onPress={(ot) => {
                    onChange('color', ot)
                  }}
                  key={it}
                  color={it}/>))
              }
            </View>
          )}
          keyExtractor={(item, index)=>{
            return item[0]
          }}
          ListHeaderComponent={this._renderHeader}
          ListEmptyComponent={() => this.__renderNoData(statu)}
        />}
      </View>
    );
  }
}


