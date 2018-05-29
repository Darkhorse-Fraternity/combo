import React from 'react'

import {
    StyleAutoGrowingTextInput,
    StyleAutoGrowingChatTextInput,
    StyleTextInput,
} from '../Cunstom/style'

const createInputs = inputCreator => {
    const renderInput = ({ input: { onChangeText,value,onSelectionChange, ...restInput }, ...rest }) => (
        <StyleAutoGrowingTextInput onChangeText={onChangeText}
                                   onSelectionChange={()=>{}}
                                   {...rest} {...restInput}

        />
    )
    const AutoGrowingInput = inputCreator('Input', renderInput, {}, {})

    const renderChatInput = ({ input: { onChangeText, ...restInput }, ...rest }) => (
        <StyleAutoGrowingChatTextInput
            onChangeText={onChangeText}
            onSelectionChange={()=>{}}
            {...rest} {...restInput} />
    )
    const AutoGrowingChatInput = inputCreator('Input', renderChatInput, {}, {})

    const renderTextInput = ({input: {onChangeText, ...restInput}, ...rest}) => (
        <StyleTextInput onChangeText={onChangeText}
                        onSelectionChange={()=>{}}
                        {...rest}
                        {...restInput} />
    )
    const TextInput = inputCreator('Input', renderTextInput, {}, {})



    return {
        AutoGrowingInput,
        TextInput,
        AutoGrowingChatInput,
    }
}

export default createInputs
