/**
 * Created by lintong on 2018/9/25.
 * @flow
 */
'use strict';

import styled from 'styled-components/native';
import HeaderBtn from '../../../components/Button/HeaderBtn';

export const StyledContent = styled.View`
  flex: 1;
  background-color: white;
`;

export const StyledHeaderBtn = styled(HeaderBtn)`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.sureColor};
  margin-top: 5px;
`;
