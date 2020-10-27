import Button from '@components/Button';
import styled from 'styled-components/native';
// import { ButtonOpacity } from 'components/Button';
interface StyledCoverBgProps {
  width?: number;
}
interface StyledListItemVProps {
  index: number; //第几位
  countInrow: number; //一行几个
}
interface StyledbackgroundColorProps {
  backgroundColor?: string;
}
export const StyledMainView = styled.View<StyledbackgroundColorProps>`
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  flex-direction: row;
  flex-flow: wrap;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

//itme布局
export const StyledListItemV = styled.View<StyledListItemVProps>`
  width: ${(props) =>
    (props.theme.getWidth() - 30 - (props.countInrow - 1) * 7) /
    props.countInrow}px;
  height: ${(props) =>
    (props.theme.getWidth() - 30 - (props.countInrow - 1) * 7) /
    props.countInrow}px;
  margin-left: ${(props) => (props.index % props.countInrow === 0 ? 0 : 7)}px;
  margin-top: ${(props) => (props.index < props.countInrow ? 0 : 7)}px;
  border-radius: 5px;
  overflow: hidden;
`;
export const StyledListItemVImage = styled.ImageBackground`
  flex: 1;
`;
export const StyledCoverBtn = styled(Button)``;

export const StyledCoverImage = styled.ImageBackground<StyledCoverBgProps>`
  flex: 1;
  flex-direction: row-reverse;
`;

//删除按钮
export const StyledDelImageBtn = styled(Button)``;
export const StyledDelImage = styled.Image`
  height: 18px;
  width: 18px;
  margin-right: 0px;
`;

export const StyledCoverImageBg = styled.View<StyledCoverBgProps>`
  flex: 1;
  background-color: #fafafa;
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  border-color: #ececeb;
`;
export const StyledCoverAddImage = styled.Image`
  height: 18px;
  width: 18px;
`;
export const StyledCoverAddTitle = styled.Text`
  margin-top: 15px;
  color: #848494;
  font-size: 12px;
`;
