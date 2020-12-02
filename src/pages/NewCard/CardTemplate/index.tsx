/**
 * Created by lintong on 2018/11/23.
 * @flow
 */
'use strict';

import { CardItemType } from '@pages/interface';
import React, { FC } from 'react';
import CardCell from '../CardCell';

import { StyledRow } from './style';

interface CardTemplateType {
  data: CardItemType[];
  onPress: (item: CardItemType) => void;
}

const CardTemplate: FC<CardTemplateType> = (props) => {
  const { data, onPress } = props;
  const res: CardItemType[][] = [];
  if (data.length > 0) {
    for (let index = 0; index < data.length; index += 4) {
      res.push(data.slice(index, index + 4));
    }
  }
  return (
    <>
      {res.map((cell, index) => (
        <StyledRow key={index + ''}>
          {cell.map((item, index) => (
            <CardCell
              key={item.title + index}
              title={item.title}
              name={item.icon}
              color={item.color}
              onPress={() => {
                onPress && onPress(item);
              }}
            />
          ))}
        </StyledRow>
      ))}
    </>
  );
};

export default CardTemplate;
