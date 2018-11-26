/**
 * Created by lintong on 2018/11/23.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import CardCell from '../CardCell'

import {
  StyledContent,
  StyledRow
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
  state => ({}),
  dispatch => ({})
)


export default class CardTemplate extends PureComponent {
  constructor(props: Object) {
    super(props);

  }

  static propTypes = {};
  static defaultProps = {};


  __renderRow = (rows,rIndex)=>{




      return (
        <StyledRow>
          {rows.map(({title,name,color},index)=>(
            <CardCell
              key={rIndex+'cell'+index}
              title={title}
              name={name}
              color={color}
              onPress={() => {

              }}/>
          ))}

        </StyledRow>
      )
  }


  render(): ReactElement<any> {

    const obj = {
      title:'测试',
      name:'sun',
      color:'green',
    }

    const rows = [obj,obj,obj,obj]

    return (
      <StyledContent>
        {this.__renderRow(rows,0)}

      </StyledContent>
    );
  }
}


