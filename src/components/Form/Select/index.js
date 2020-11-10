import { Field } from 'redux-form/immutable';
import React from 'react';
import createInputCreator from '../Cunstom/createInputCreator';
import RadioRenderer from './Radio';


const createInput = (inputCreator) => {
 
  const RenderRadio = ({
    input: { onChange, value }, options, keyName, renderItem, ...rest
  }) => (
    <RadioRenderer
      {...rest}
      options={options}
      keyName={keyName}
      renderItem={renderItem}
      onValueChange={onChange}
      value={value}
    />
  );

  const Radio = inputCreator('Radio', RenderRadio, RadioRenderer.PropTypes,
    RadioRenderer.defaultProps);

  return {
    Radio,
  };
};


const {
  Radio,
} = createInput(createInputCreator(Field));

export {
  Radio,
};
