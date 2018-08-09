import createInputCreator from '../../Cunstom/createInputCreator'
import ImageSelect from './ImageSelect'
import {Field} from 'redux-form/immutable'
import React from 'react'

const createInput = inputCreator => {

    const renderImageSelectView = ({input: {value, ...restInput}, ...rest}) => (
        <ImageSelect value={value} {...rest} {...restInput}/>
    )

    return inputCreator('ImageSelect', renderImageSelectView, {}, {})


}


export default createInput(createInputCreator(Field))

