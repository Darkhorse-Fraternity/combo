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
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { update } from '../../../redux/module/leancloud'
import { ICARD } from '../../../redux/reqKeys'
import Toast from 'react-native-simple-toast'
import { StyledContent } from './style'
import {
    reduxForm,
    formValueSelector,
} from 'redux-form/immutable'
import OptionDo, { StaticOption } from './OptionDo'
import moment from 'moment'
//static displayName = OptionView

const FormID = 'CreatCardForm'

@connect(
    (state, props) => {

        const id = props.navigation.state.params.iCardId
        let iCard = state.normalizr.get('iCard').get(id)
        iCard = iCard && iCard.toJS()

        // const data = props.navigation.state.params.opData
        const propsOption = {
            ...StaticOption,
            ...iCard
        }


        return {
            initialValues: propsOption,
            load: state.req.get('iCard').get('load')
        }
    },
    (dispatch, props) => ({
        //...bindActionCreators({},dispatch),
        refresh: async () => dispatch(async (dispatch, getState) => {
            {
                const id = props.navigation.state.params.iCardId
                const state = getState()
                const selector = formValueSelector(FormID)
                const op = selector(
                    state,
                    'notifyTimes',
                    'notifyText',
                    'period',
                    'record',
                    'title',
                    'recordDay')

              const notifyTimes = op.notifyTimes.toJS()
                .sort((a, b) => moment(a, 'HH:mm')
                  - moment(b, 'HH:mm'))



                const param = {
                    ...op,
                    record: op.record.toJS(),
                    recordDay: op.recordDay.toJS(),
                     notifyTimes
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
                Toast.show('修改配置成功~!')
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
        this.props.navigation.goBack()
    }


    render(): ReactElement<any> {
        return (
            <StyledContent colors={['#f1f6f9', '#ffffff']}>
                <OptionDo
                    modify={true}
                    goBack={this.__backStep}
                    done={this.props.refresh}
                    load={this.props.load}/>
            </StyledContent>
        );
    }
}

