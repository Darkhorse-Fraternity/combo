/**
 * Created by lintong on 2018/10/14.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import SvgUri from 'react-native-svg-uri';
import {
  StyledCell,
  StyledCellBtn,
  StyledSvgUri
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import svgs from '../../../../../../source/svgs'
import { Field } from 'redux-form/immutable'


@connect(
  state => ({}),
  dispatch => ({})
)


export default class IconCell extends Component {
  constructor(props: Object) {
    super(props);
    // this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      iconShow: false
    }

    InteractionManager.runAfterInteractions(async () => {
      // ...耗时较长的同步的任务...
      this.setState({ iconShow: true })
    });
    // this.timer = setTimeout(() =>
    //   this.setState({ iconShow: true }),
    //   2000);

  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }


  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.select !== this.props.select ||
      nextProps.data.name !== this.props.data.name ||
      nextState.iconShow !== this.state.iconShow
  }


  render(): ReactElement<any> {

    const { iconShow } = this.state
    const { data, onPress, select } = this.props;
    const { size, name } = data;
    return [
      <StyledCell
        key={name}
        select={select}
        activeOpacity={1}
        onPress={onPress}>

        <StyledCellBtn pointerEvents="none">
          {iconShow && <SvgUri
            // style={{ position: 'absolute' }}
            width={size}
            height={size}
            svgXmlData={svgs[name]}
          />}
        </StyledCellBtn>
      </StyledCell>
    ];
  }
}


