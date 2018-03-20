import createInputCreator from '../Cunstom/createInputCreator'
import {Field} from 'redux-form/immutable'
import SelectRenderer from './Select'
import RadioRenderer from './Radio'
import MultipleRenderer from './Multiple'
import React from 'react'


const createInput = inputCreator => {
    const renderSelect = ({input: {onChange, value}, labelKey, valueKey, options, placeholder, ...rest}) => (
        <SelectRenderer
            {...rest}
            labelKey={labelKey}
            options={options}
            onValueChange={onChange}
            placeholder={placeholder}
            value={value}
            valueKey={valueKey}
        />
    )
    const Select = inputCreator('Select', renderSelect, SelectRenderer.PropTypes,
        SelectRenderer.defaultProps)


    const RenderRadio = ({input: {onChange, value}, options,keyName,renderItem, ...rest}) => (
        <RadioRenderer
            {...rest}
            options={options}
            keyName={keyName}
            renderItem={renderItem}
            onValueChange={onChange}
            value={value}
        />
    )

    const Radio = inputCreator('Radio', RenderRadio, RadioRenderer.PropTypes,
        RadioRenderer.defaultProps)


    const RenderMultiple = ({input: {onChange, value}, options,keyName,renderItem, ...rest}) => (
        <MultipleRenderer
            {...rest}
            options={options}
            keyName={keyName}
            renderItem={renderItem}
            onValueChange={onChange}
            value={value}
        />
    )

    const Multiple = inputCreator('Radio', RenderMultiple, RadioRenderer.PropTypes,
        RadioRenderer.defaultProps)

    return {
        Select,
        Radio,
        Multiple
    }
}


const {
    Select,
    Radio,
    Multiple,
} = createInput(createInputCreator(Field))

export {
    Select,
    Radio,
    Multiple
}