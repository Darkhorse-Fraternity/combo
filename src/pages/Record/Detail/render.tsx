/**
 * Created by lintong on 2017/8/31.
 * @flow
 */
'use strict';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {connect} from 'react-redux';

import Statistical from '../../Card/Statistical';
// import NavBar from '../../../components/Nav/bar/NavBar';

import {StyledHeaderBtn, StyledHeaderTitle, Styledcontain} from './style';

@connect(
  (state, props) => ({
    iCard: state.normalizr.get('iCard').get(props.route.params.iCardId),
    iUse: state.normalizr.get('iUse').get(props.route.params.iUseId),
  }),
  (dispatch, props) => ({}),
)
export default class RecordDetail extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    // const { iCard, iUse } = this.props
    // const state = iCard.get('state')
    // this.props.navigation.setParams({ renderRightView: this.__renderRightView,
    //   title: iCard.get('title') })
    this.props.navigation.setOptions({headerRight: this.__renderRightView});
    // console.log('this.props.navigation', this.props.navigation);
  }

  componentWillReceiveProps() {
    // this.props.navigation.setOptions({headerRight: this.__renderRightView});
  }

  __renderRightView = () => {
    const {navigation, iCard, route} = this.props;
    const {params} = route;
    const iconAndColor = iCard.get('iconAndColor');
    const {color} = iconAndColor
      ? iconAndColor.toJS()
      : {name: 'sun', color: '#fcd22f'};

    return (
      <StyledHeaderBtn
        // load={false}
        style={{backgroundColor: color, marginRight: 20}}
        // disabled={false}
        hitSlop={{top: 5, left: 10, bottom: 5, right: 10}}
        onPress={() => {
          navigation.navigate('cardInfo', {
            iCardId: params.iCardId,
          });
        }}
        title={'加入'}
      />
    );
  };
  _;
  _renderHeader = () => {
    const {iCard} = this.props;
    // const { state } = navigation;
    // const { params } = state;
    const iconAndColor = iCard.get('iconAndColor');
    const {color} = iconAndColor
      ? iconAndColor.toJS()
      : {name: 'sun', color: '#fcd22f'};

    return <StyledHeaderTitle>{iCard.get('title')}</StyledHeaderTitle>;
  };

  render() {
    const {navigation, iCard, route} = this.props;
    const iconAndColor = iCard.get('iconAndColor');
    const {color} = iconAndColor
      ? iconAndColor.toJS()
      : {name: 'sun', color: '#fcd22f'};
    return (
      <Styledcontain>
        {/* <NavBar
          onBackPress={this.props.navigation.goBack}
          rightView={this.__renderRightView}
        /> */}
        {this._renderHeader()}
        <Statistical color={color} {...this.props} />
      </Styledcontain>
    );
  }
}
