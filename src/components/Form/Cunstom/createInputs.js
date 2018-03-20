import React from 'react'

import {
    StyleAutoGrowingTextInput,
    StyleAutoGrowingChatTextInput,
    StyleTextInput
} from '../Cunstom/style'

const createInputs = inputCreator => {
    const renderInput = ({ input: { onChange, ...restInput }, ...rest }) => (
        <StyleAutoGrowingTextInput onChangeText={onChange} {...rest} {...restInput} />
    )
    const AutoGrowingInput = inputCreator('Input', renderInput, {}, {})

    const renderChatInput = ({ input: { onChange, ...restInput }, ...rest }) => (
        <StyleAutoGrowingChatTextInput onChangeText={onChange} {...rest} {...restInput} />
    )
    const AutoGrowingChatInput = inputCreator('Input', renderChatInput, {}, {})

    const renderTextInput = ({input: {onChange, ...restInput}, ...rest}) => (
        <StyleTextInput onChangeText={onChange} {...rest} {...restInput} />
    )
    const TextInput = inputCreator('Input', renderTextInput, {}, {})

    return {
        AutoGrowingInput,
        TextInput,
        AutoGrowingChatInput,
    }
}

export default createInputs
