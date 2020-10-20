/**
 * Created by lintong on 2018/11/23.
 * @flow
 */
'use strict';

import React, { FC, PureComponent } from 'react';
import CardCell from '../CardCell'

import {
  StyledRow,
  StyledMain
} from './style'

interface CardItemType {
  title: string;
  icon: string;
  color: string;

}

interface CardTemplateType {
  data: CardItemType[];
  onPress: Function
}

const CardTemplate: FC<CardTemplateType> = (props) => {
  const { data, onPress } = props;
  const res: CardItemType[][] = [];
  if (data.length > 0) {
    for (let index = 0; index < data.length; index += 4) {
      res.push(data.slice(index, index + 4))
    }
  }

  console.log('res', res.length);


  return res.map((cell, index) => (
    <StyledRow key={index + ''}>
      {cell.map((item, index) => (
        <CardCell
          key={item.title + index}
          title={item.title}
          name={item.icon}
          color={item.color}
          onPress={() => {
            onPress && onPress(item)
          }} />
      ))}
    </StyledRow>
  ))

}

export default CardTemplate