/**
 * Created by lintong on 2017/8/31.
 * @flow
 */
'use strict';


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import * as immutable from 'immutable';

import HeaderBtn from '../../components/Button/HeaderBtn'
import Statistical from '../Card/Statistical'
import NavBar from '../../components/Nav/bar/NavBar'

import {
  StyledContent,
  StyledHeaderBtn,
  StyledAdd,
  StyledIonicons,
  StyledHeader,
  StyledHeaderTitle
} from './style'


@connect(
  (state, props) => ({
    iCard: state.normalizr.get('iCard').get(props.navigation.state.params.iCardId),
    iUse: state.normalizr.get('iUse').get(props.navigation.state.params.iUseId),
  }),
  (dispatch, props) => ({})
)

export default class Detail extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};





  static navigationOptions = props => {
    const iCardId = props.navigation.state.params.iCardId

    return {
      headerShown: false,
      // headerRight: ( <StyledHeaderBtn
      //     // load={false}
      //     // style={{ backgroundColor: color }}
      //     // disabled={false}
      //     hitSlop={{ top: 5, left: 10, bottom: 5, right: 10 }}
      //     onPress={()=>{
      //       props.navigation.navigate('cardInfo', {
      //         iCardId
      //       })
      //     }}
      //     title={'加入'}/>
      // ),
    }
  };


  __renderRightView = () => {

    const { navigation,iCard} = this.props;
    const { state } = navigation;
    const { params } = state;
    const iconAndColor = iCard.get('iconAndColor')
    const { color } = iconAndColor ? iconAndColor.toJS()
      : { name: 'sun', color: '#fcd22f' }

    return (
      <StyledHeaderBtn
        // load={false}
         style={{ backgroundColor: color,marginRight:20}}
        // disabled={false}
        hitSlop={{ top: 5, left: 10, bottom: 5, right: 10 }}
        onPress={()=>{
          navigation.navigate('cardInfo', {
            iCardId:params.iCardId
          })
        }}
        title={'加入'}/>
    )
  }
  _
  _renderHeader = () => {
    const { navigation,iCard} = this.props;
    // const { state } = navigation;
    // const { params } = state;
    const iconAndColor = iCard.get('iconAndColor')
    const { color } = iconAndColor ? iconAndColor.toJS()
      : { name: 'sun', color: '#fcd22f' }

    return (
      <StyledHeader>

        <StyledHeaderTitle >
          {iCard.get('title')}
        </StyledHeaderTitle>
        {/*<StyledAdd*/}
          {/*onPress={() => {*/}
            {/*this.props.navigation.navigate('cardInfo', {*/}
              {/*iCardId: params.iCardId,*/}
            {/*})*/}
          {/*}}*/}
          {/*hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>*/}

          {/*<StyledIonicons*/}
            {/*// color={color}*/}
            {/*size={25}*/}
            {/*name={'ios-add-circle-outline'}/>*/}
        {/*</StyledAdd>*/}
        {/*<StyledHeaderBtn*/}
          {/*// load={false}*/}
          {/*style={{ backgroundColor: color }}*/}
          {/*// disabled={false}*/}
          {/*hitSlop={{ top: 5, left: 10, bottom: 5, right: 10 }}*/}
          {/*onPress={()=>{*/}
            {/*navigation.navigate('cardInfo', {*/}
              {/*iCardId:params.iCardId,*/}
            {/*})*/}
          {/*}}*/}
          {/*title={'加入'}/>*/}

      </StyledHeader>
    )
  }


  render() {
    const { navigation,iCard} = this.props;
    const { state } = navigation;
    const { params } = state;
    const iconAndColor = iCard.get('iconAndColor')
    const { color } = iconAndColor ? iconAndColor.toJS() : { name: 'sun', color: '#fcd22f' }
    return (
      <StyledContent >
        <NavBar
          onBackPress={this.props.navigation.goBack}
          rightView={this.__renderRightView}
        />
        {this._renderHeader()}
        <Statistical color={color} {...this.props}/>
      </StyledContent>
    )

  }
}






