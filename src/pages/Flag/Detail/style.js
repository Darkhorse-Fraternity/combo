/**
 * Created by lintong on 2019/1/2.
 * @flow
 */
'use strict';

import styled from "styled-components";
import { SafeAreaView } from 'react-navigation';
import FastImage from 'react-native-fast-image'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Button from '../../../components/Button'

export const StyledSafeAreaView = styled(SafeAreaView)`
    flex: 1;
`

export const StyledContent = styled.ScrollView`
    flex: 1;
`

export const StyledHeader = styled.View`
    padding: 20px 20px 24px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const StyledHeaderTitle = styled.Text`
  font-size: 21px;
  font-weight: 500;
`


export const StyledCover = styled(FastImage)`
  width: ${props => props.theme.width - 60};
  height: 320px;
  border-radius: 20px;
  align-self: center;
  margin-bottom: 20px;
`


export const StyledFlagView = styled.View`
  padding: 20px;
`


export const StyledTitle = styled.Text`
  font-size: 20px;
  color: #979797;
  margin-bottom: 5px;
`

export const StyledDiscrib = styled.Text`
  margin-top: 20px;
  font-size: 17px;
  fontStyle:italic;
  line-height: 25px;
`

export const StyledBtn = styled(Button)`
   margin-right: 15px;
`

export const StyledEvilIcons = styled(EvilIcons)`
    align-self: center;
`

export const StyledHeaderBtnText = styled.Text`

`