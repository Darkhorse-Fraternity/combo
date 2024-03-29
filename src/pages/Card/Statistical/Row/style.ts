import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import Button from '../../../../components/Button';
import ZoomImage from '../../../../components/ZoomImage/ZoomImage';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const minWidth = Math.min(width, height);

export const StyledButton = styled(Button)`
  padding: 20px;
  flex-direction: row;
`;

export const StyledImagesScolleView = styled.ScrollView`
  margin: 15px 0px 0px 0px;
  width: ${(props) => props.theme.width * 0.74};
`;

export const StyledImage = styled(FastImage)`
  height: ${(minWidth * 0.65 * 9) / 16};
  width: ${minWidth * 0.65};
  border-radius: 10px;
  margin: 0px 15px 0px 0px;
  background-color: #fdfbfb;
`;

export const StyledImageButton = styled(Button)``;

export const StyledZoomImage = styled(ZoomImage)`
  width: 100%;
  height: ${(props) => (props.theme.width - 160) * 0.8};
  border-radius: 10px;
  margin: 20px 0px 0px 0px;
  background-color: #fdfbfb;
`;

export const StyledMain = styled.View`
  padding: 0px 0px 0px 20px;
  flex: 1;
`;

export const StyledBottom = styled.View`
  padding: 5px 10px;
`;
//
// export const StyledDateView = styled.View`
//     margin: 10px 0px 0px 0px;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
// `

export const StyledNewTip = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: red;
  margin-right: 5px;
`;

export const StyledDateText = styled.Text`
  margin-left: 60px;
  font-size: 13px;
  color: #646464;
`;

export const StyledRecordText = styled.Text`
  color: #323232;
  font-size: 17px;
  line-height: 25px;
`;

export const StyledIcon = styled(Icon)`
  align-self: center;
`;

export const StyledChatbtn = styled.View`
  justify-content: space-between;
  margin: 4px;
  flex-direction: row;
  align-items: center;
`;
export const StyledChatBtnText = styled.Text`
  margin-left: 5px;
`;

export const StyledArrowView = styled.View`
  border-bottom-width: ${(props) => props.theme.hairlineWidth * 2};
  border-right-width: ${(props) => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-right: 35px;
`;

export const StyledDateView = styled.View<{ color: string }>`
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 60px;
  height: 60px;
  border-width: 1px;
  border-color: ${(props) => props.color || 'gray'};
`;

export const StyledDateTextBig = styled.Text<{ color: string }>`
  color: ${(props) => props.color || 'gray'};
  font-size: 20px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
`;

export const StyledDateTextSmall = styled.Text<{ color: string }>`
  margin-top: 1px;
  color: ${(props) => props.color || 'gray'};
  font-size: 12px;
  font-weight: bold;
  min-width: 50px;
  text-align: center;
`;
