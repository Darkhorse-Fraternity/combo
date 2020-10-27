import styled from 'styled-components/native';
import Button from '@components/Button';

export const StyleModalView = styled.View`
  background-color: white;
  border-radius: 5px;
  align-items: center;
  padding: 20px 20px 10px 20px;
  /* margin: 2px; */
`;

export const StyleCance = styled(Button)`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const StyleAgree = styled(Button)`
  flex: 1;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const StyledTitle = styled.Text`
  align-self: center;
  font-size: 16px;
`;

export const StyledDiscrib = styled.Text`
  margin-top: 12px;
  line-height: 20px;
  font-size: 13px;
`;
export const StyledDiscribIn = styled.Text`
  margin-top: 12px;
  line-height: 20px;
  font-size: 13px;
  color: blue;
`;

export const StyledLine1 = styled.View`
  width: 100%;
  height: ${props => props.theme.hairlineWidth * 2}px;
  background-color: 'rgb(236,235,235)';
  margin: 10px 10px 5px 10px;
`;

export const StyledLine2 = styled.View`
  align-self: center;
  background-color: 'rgb(236,235,235)';
  width: ${props => props.theme.hairlineWidth * 2}px;
  height: 30px;
`;

export const StyledBottom = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
`;
