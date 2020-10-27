import React from 'react';
import {
  StyledIconView,
  StyledIcon,
  StyledIconItem,
  StyledActivityIndicator,
  StyledBtnContnet,
} from '../style';
import { BtnPeddingProps } from '@components/Button';

export const SigninBtn = (
  props: BtnPeddingProps & { color?: string; size?: number; name: string },
) => {
  const { color = 'black', size = 20, name, loading, ...other } = props;
  return (
    <StyledBtnContnet>
      <StyledIconItem disabled={loading} {...other}>
        <StyledIconView style={{ backgroundColor: color }}>
          {loading ? (
            <StyledActivityIndicator color={'white'} />
          ) : (
            <StyledIcon color={'white'} name={name} size={size} />
          )}
        </StyledIconView>
      </StyledIconItem>
    </StyledBtnContnet>
  );
};
