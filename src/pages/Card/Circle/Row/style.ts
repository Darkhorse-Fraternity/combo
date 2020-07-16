import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import Button from '../../../../components/Button';
import ZoomImage from '../../../../components/ZoomImage/ZoomImage';

export const StyledButton = styled.View`
  padding: 0px 0px;
`;

export const StyledImagesScolleView = styled.ScrollView`
  margin: 15px 0px 0px 0px;
  width: ${props => props.theme.width * 0.8};
`;

export const StyledMaterialCommunityIcons = styled(MaterialCommunityIcons)`
  align-self: center;
`;

export const StyledLikeIcon = styled(Icon)`
  align-self: center;
`;

export const StyledImage = styled(FastImage)`
  width: ${props => props.theme.width * 0.65};
  height: ${props => (props.theme.width * 0.65 * 9) / 16};
  border-radius: 10px;
  margin: 0px 15px 0px 0px;
  background-color: #fdfbfb;
`;

export const StyledImageButton = styled(Button)``;

export const StyledZoomImage = styled(ZoomImage)`
    width: 100%;
    height: ${props => (props.theme.width * 0.65 * 9) / 16};
    /* height: ${props => (props.theme.width - 140) * 0.8}; */
    border-radius: 10px;
    margin: 15px 0px 0px 0px;
    background-color: #fdfbfb;
`;

export const StyledMain = styled.View`
  padding: 0px 20px 0px 70px;
`;

export const StyledBottom = styled.View`
  padding: 5px 10px;
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
  margin-left: 60px;
  font-size: 13px;
  color: #646464;
`;

export const StyledBottomBtnView = styled.View`
  flex-direction: row;
`;

export const StyledRecordText = styled.Text`
  color: #323232;
  font-size: 15px;
  margin: 10px 0px 5px 0px;
  line-height: 25;
`;

export const StyledIcon = styled(Icon)`
  align-self: center;
`;

export const StyledChatbtn = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;
export const StyledChatBtnText = styled.Text`
  margin-left: 5px;
  color: #8c8c85;
  width: 35px;
`;

export const StyledArrowView = styled.View`
  border-bottom-width: ${props => props.theme.hairlineWidth * 2};
  border-right-width: ${props => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-right: 35px;
`;