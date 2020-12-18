import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import Button from '../../../components/Button';
import ZoomImage from '../../../components/ZoomImage/ZoomImage';

export const StyledButton = styled.TouchableOpacity``;

export const StyledImagesScolleView = styled.ScrollView`
  margin: 15px 0px 0px 0px;
`;

export const StyledImageButton = styled(Button)``;

export const StyledImage = styled(FastImage)`
  width: ${(props) => props.theme.width * 0.65};
  height: ${(props) => (props.theme.width * 0.65 * 9) / 16};
  border-radius: 10px;
  margin: 0px 15px 0px 0px;
  background-color: #fdfbfb;
`;

export const StyledZoomImage = styled(ZoomImage)`
  height: ${(props) => (props.theme.width * 0.65 * 9) / 16};
  border-radius: 10px;
  margin: 15px 45px;
  background-color: #fdfbfb;
`;

export const StyledTop = styled.View`
  padding: 0px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledBottom = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 0px 0px;
`;

export const StyledDateView = styled.View`
  margin: 10px 0px 0px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledNewTip = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: red;
  margin-right: 5px;
`;

export const StyledDateText = styled.Text`
  font-size: 15px;
  color: #646464;
`;

export const StyledRecordText = styled.Text`
  line-height: 25px;
  font-size: 15px;
  margin: 20px 0px 0px 0px;
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
  margin-left: 5px;
`;

export const StyledName = styled.Text`
  margin-left: 10;
  min-width: 100;
  color: ${({ theme }) => theme.colors.text};
`;
