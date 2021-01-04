/*
 * @Author: tonyYo
 * @Date: 2020-12-30 16:18:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2020-12-31 16:16:10
 * @FilePath: /Combo/src/pages/test/bottomSheetHandle/styles.ts
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
`;

export const StyledIndicator = styled.View`
  align-self: center;
  width: ${(7.5 * WINDOW_WIDTH) / 100}px;
  height: 4px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.text};
`;
