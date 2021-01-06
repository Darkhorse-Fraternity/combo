/*
 * @Author: tonyYo
 * @Date: 2020-12-30 16:18:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-06 09:46:28
 * @FilePath: /Combo/src/components/modal/bottom-sheet-handle/styles.ts
 */
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
// import { WINDOW_WIDTH } from '../../constants';
const { width: WINDOW_WIDTH } = Dimensions.get('window');
// export const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },

//   indicator: {
//     alignSelf: 'center',
//     width: (7.5 * WINDOW_WIDTH) / 100,
//     height: 4,
//     borderRadius: 4,
//     backgroundColor: 'rgba(0, 0, 0, 0.75)',
//   },
// });

export const StyledContainer = styled.View`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.cardPrimary};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const StyledIndicator = styled.View`
  align-self: center;
  width: ${(7.5 * WINDOW_WIDTH) / 100}px;
  height: 4px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.text};
`;
