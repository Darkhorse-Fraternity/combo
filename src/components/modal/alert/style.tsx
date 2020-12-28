import styled from 'styled-components/native';
interface StyledSubmitTextProps {
  color?: string;
}
export const ContentView = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 10px;
  /* height: 163px; */
  justify-content: flex-end;
  align-items: center;
`;
export const CommitBtn = styled.Text<StyledSubmitTextProps>`
  color: ${(props) => props.color || '#333333'};
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
`;

export const StyledButtonView = styled.View`
  flex-direction: row;
`;

export const StyledSubmit = styled.View`
  align-items: center;
  height: 52px;
  justify-content: center;
`;
export const StyledSplitView = styled.View`
  background-color: ${({ theme }) =>
    theme.isDarkMode ? 'rgb(50,50,50)' : '#f5f5f5'};
  height: 1px;
`;
export const StyledCellTopLine = styled.View<StyledSubmitTextProps>`
  height: 0.5px;
  background-color: #999999;
`;

export const StyledLogo = styled.Image`
  flex: 1;
  width: 40px;
  height: 40px;
`;

export const StyledLogoView = styled.View`
  width: 60px;
  height: 60px;
  background-color: white;
  margin-top: -30;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

export const StyledBG = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
`;
