import React, {Component} from 'react'
import {reduxForm} from 'redux-form/immutable'
import {AutoGrowingInput} from '../Cunstom'
import PropTypes from 'prop-types';
import {Form} from './style'

import CleanBtn from '../../../components/Button/CleanBtn'

import {connect} from 'react-redux'

import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {formValueSelector} from 'redux-form/immutable'

export const FormID = 'ChatSendForm'
const selector = formValueSelector(FormID) // <-- same as form name


@connect(
    (state, props) => {
        const text = selector(state, props.name)
        return {
            enableSumbmit: text && text.length > 0
        }
    },
    (dispatch, props) => ({
        load: async () => {

        },
        save: async () => {

        }
    })
)

@reduxForm({
    form: FormID,
})

@immutableRenderDecorator

export default class ChatSendForm extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
    };
    static defaultProps = {};


    



    render() {
        const {handleSubmit, onSubmit, disabled, pristine, enableSumbmit, ...rest} = this.props
        const {submitting, invalid} = rest
        return (
            <Form>
                <AutoGrowingInput underlineColorAndroid="transparent"
                                  {...rest} />
                <CleanBtn
                    disabled={pristine || !enableSumbmit  || submitting || invalid || disabled}
                    style={{width: 31}}
                    text='发送'
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                    onPress={onSubmit && handleSubmit(onSubmit)}
                    {...rest}
                />
            </Form>
        )
    }
}


