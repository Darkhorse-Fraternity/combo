import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const render = (renderComponent) => (props) => {
  return renderComponent(props);
};

const createInputCreator = (ReduxFormFieldComponent) => (
  name,
  renderFunction,
  PropTypesOverrides = {},
  defaultProps = {},
) => {
  const Component = render(renderFunction);

  class FieldWrapper extends PureComponent {
    static propTypes = {
      name: PropTypes.string.isRequired,
    };
    static defaultProps = {};
    render() {
      const { name, ...rest } = this.props;
      return (
        <ReduxFormFieldComponent name={name} component={Component} {...rest} />
      );
    }
  }
  return FieldWrapper;
};

export default createInputCreator;
