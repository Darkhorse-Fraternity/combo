import React, { FC } from 'react';

import {
  StyledContent,
  StyledDes,
  StyledTitle,
  StyledIconBG,
  StyledInner,
  StyledTime,
  StyledIconImage,
} from './style';
import svgs from '../../../../source/icons';
import { ButtonType } from '@components/Button';
import { IUseType, IUseType2 } from 'src/data/data-context/interface';

interface CellProps extends ButtonType {
  iCard: IUseType['iCard'] | IUseType2['iCard'];
  data: IUseType | IUseType2;
}

const Cell: FC<CellProps> = (props) => {
  const { iCard, onPress, data } = props;

  const { title, notifyText, iconAndColor } = iCard;
  const { time } = data;

  return (
    <StyledContent onPress={onPress}>
      <StyledIconBG
        color={iconAndColor?.color ? iconAndColor.color : '#afd2ef'}>
        <StyledIconImage
          size={40}
          resizeMode="contain"
          source={svgs[iconAndColor?.name ? iconAndColor.name : 'sun']}
        />
        {/* <SvgUri */}
        {/* width={40} */}
        {/* height={40} */}
        {/* svgXmlData={svgs[iconAndColor ? iconAndColor.name : 'sun']} */}
        {/* /> */}
      </StyledIconBG>
      <StyledInner>
        <StyledTitle>{title}</StyledTitle>

        <StyledTime>第{time}次</StyledTime>
        <StyledDes>{notifyText}</StyledDes>
      </StyledInner>
    </StyledContent>
  );
};

export default Cell;
