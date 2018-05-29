/**
 * Created by lintong on 2017/8/4.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import { update } from '../../redux/module/leancloud'
import { ICARD } from '../../redux/reqKeys'
import { mainColor } from '../../configure'

import {
    reduxForm,
    formValueSelector,
} from 'redux-form/immutable'
import OptionDo, { StaticOption } from './OptionDo'

//static displayName = OptionView

const FormID = 'CreatCardForm'

@connect(
    (state, props) => {

        const data = props.navigation.state.params.opData
        const propsOption = {
            ...StaticOption,
            ...data
        }


        return {
            initialValues: propsOption
        }
    },
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        refresh: async () => dispatch(async (dispatch, getState) => {
            {
                const data = props.navigation.state.params.opData
                const state = getState()
                const selector = formValueSelector(FormID)
                const op = selector(state, 'notifyTime', 'notifyText','record','title','recordDay')


                const id = data.objectId
                const param = {
                    ...op,
                    record:op.record.toJS(),
                    recordDay:op.recordDay.toJS()
                }

                const res = await update(id, param, ICARD)

                const entity = {
                    ...param,
                    ...res
                }
                // console.log('entity:', entity);
                // dispatch(addEntities({
                //     [ICARD]: {
                //         [entity.objectId]: entity
                //     }
                // }))
                dispatch(addNormalizrEntity(ICARD, entity))
            }
        })
    })
)

@reduxForm({
    form: FormID,
})


export default class OptionView extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};
    static navigationOptions = props => {

        return {
            header: null,
        }
    };

    shouldComponentUpdate(nextProps: Object, nextState: Object) {
        return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
    }

    __backStep = () => {
        this.props.refresh()
        this.props.navigation.goBack()
    }


    render(): ReactElement<any> {
        return (
            <OptionDo style={{paddingTop:80}} revise goBack={this.__backStep}/>
        );
    }
}

