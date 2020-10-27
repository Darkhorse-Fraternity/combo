import React, { PureComponent } from 'react';
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Theme as defaultTheme} from 'react-native-clean-form'



const render = renderComponent => props => {
  return renderComponent(props)
}


const createInputCreator = ReduxFormFieldComponent => (name, renderFunction, PropTypesOverrides = {}, defaultProps = {}) => {
  const Component = render(renderFunction)
  Component.displayName = name

  class FieldWrapper extends PureComponent{
    static propTypes = {
      name:PropTypes.string.isRequired
    };
    static defaultProps = {};
    render() {
      const { name, ...rest } = this.props
      return <ReduxFormFieldComponent name={name} component={Component} {...rest} />
    }
  }
  return FieldWrapper
}



export default createInputCreator
