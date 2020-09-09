import React from 'react';
import {
  StyledIconView,
  StyledIcon,
  StyledIconItem,
  StyledActivityIndicator,
  StyledBtnContnet,
} from '../style';
import { Text } from 'react-native'
import { BtnPeddingProps } from '@components/Button';



export const SigninBtn = (props: BtnPeddingProps &
{ color?: string, size?: number, name: string }) => {
  const { color = '#f0f0f0', size = 25, name, loading, ...other } = props;
  return (
    <StyledBtnContnet>
      <StyledIconItem disabled={loading} {...other}>
        <StyledIconView style={{ backgroundColor: color }}>
          {loading ? (
            <StyledActivityIndicator color={'#c3c3c3'} />
          ) : (
              <StyledIcon color={'#233238'} name={name} size={size} />
            )}
        </StyledIconView>
      </StyledIconItem>
    </StyledBtnContnet>
  )
}