/**
 * Created by lintong on 2018/4/13.
 * @flow
 */

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import Button from '../../../components/Button';

// var hexToRgb = function(hex) {
//   var color = [], rgb = [];
//
//   hex = hex.replace(/#/,"");
//
//   if (hex.length == 3) { // 处理 "#abc" 成 "#aabbcc"
//     var tmp = [];
//     for (var i = 0; i < 3; i++) {
//       tmp.push(hex.charAt(i) + hex.charAt(i));
//     }
//     hex = tmp.join("");
//   }
//
//   for (var i = 0; i < 3; i++) {
//     color[i] = "0x" + hex.substr(i * 2, 2);
//     rgb.push(parseInt(Number(color[i])));
//   }
//   return "rgba(" + rgb.join(",") +",0.2"+ ")";
// };

export const StyledContent = styled.View`
  flex: 1;
`;

export const StyledTitleView = styled.View`
  background-color: #e7ebeb;
  padding: 15px;
`;

export const StyledTitleText = styled.Text`
  font-size: 17px;
`;

export const StyledBottomMenu = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  /* justify-content: space-between; */
`;

export const StyledBottomMenuText = styled.Text`
  font-size: 14px;
  margin-top: 7.5px;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledBottomMenuButton = styled(Button)`
  align-items: center;
  padding: 15px 0px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.textinputbackgroundColor};
  width: 107px;
  margin-right: 15px;
  /* max-width: 100; */
  border-radius: 10px;
  height: 85px;
`;

export const StyledActivityIndicator = styled.ActivityIndicator`
  flex: 1;
`;

export const StyledIcon = styled(Icon)``;

export const StyledEntypoIcon = styled(EntypoIcon)``;

export const StyledRow = styled.View`
  padding: 25px 15px 25px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: ${(props) => props.theme.hairlineWidth};
  border-bottom-color: #e4e4e4;
`;

export const StyledRowTouch = styled.View`
  padding: 25px 25px 25px 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledRowText = styled.Text`
  color: #323232;
  font-size: 18px;
`;

export const StyledRowDes = styled.Text`
  color: #323232;
  font-size: 19px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledRowInner = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledBtn = styled(Button)`
  padding: 10px 20px;
`;
export const StyledBtnTitle = styled.Text<{ color?: string }>`
  font-size: 15px;
  color: ${({ color }) => color};
`;

export const StyledArrow = styled.View`
  border-bottom-width: ${(props) => props.theme.hairlineWidth * 2};
  border-right-width: ${(props) => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-left: 5px;
`;

export const StyeldDoneView = styled.View``;

export const StyledHeader = styled.View`
  padding: 20px 20px 10px 20px;
`;
