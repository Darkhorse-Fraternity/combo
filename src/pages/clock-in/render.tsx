import React, { useState, FC } from 'react';
import { StyledContent, StyledTexInput } from './style';

const Render: FC = (props) => {
  const [state, setstate] = useState(true);


  return (
    <StyledContent>
      <StyledTexInput multiline placeholder='记录每一天的改变～' />
    </StyledContent>
  );
};

export default Render;
