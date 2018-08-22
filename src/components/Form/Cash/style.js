/**
 * Created by lintong on 2018/8/22.
 * @flow
 */
'use strict';

import styled from "styled-components";
import { TextInput } from '../Cunstom'


export const StyledContent = styled.View`
    background-color: white;
`

export const StyledInput = styled(TextInput)`
    height: 45px;
    border-bottom-width: ${props => props.theme.hairlineWidth };
    border-bottom-color: #c1c1c1 ;
    margin: 15px;
    font-size: 17px;
`