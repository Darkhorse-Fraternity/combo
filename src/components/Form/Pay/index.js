/**
 * Created by lintong on 2018/2/27.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form/immutable'


import {
    StyledContent,
    StyledBottomView,
    StyledPriceText,
    StyleRadio,
    StyleRadioText,
    RadioIcon,
    RadioImage,
    StyledRadioInnner,
    StyledBuyButton,
    RadioPlacehold,
    RadioPlaceholdText,
    StyledHeaderView,
    StyledHeaderTitle,
    StyledIconAwesome,
    StyledActivityIndicator
} from './style'
import { Radio } from '../../../components/Form/Select'
import Pop from '../../../components/Pop'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { formValueSelector } from 'redux-form/immutable'
import Button from '../../../components/Button'

export const FormID = 'PayForm'
const selector = formValueSelector(FormID) // <-- same as form name

const option = [
    { ItemId: 'alipay', name: '支付宝', source: require('../../../../source/img/icon/alipay.png') },
    { ItemId: 'wechat', name: '微信', source: require('../../../../source/img/icon/wechatpay.png') },
]


@connect(
    (state, props) => {
        let radio = selector(state, 'PayRadio')

        radio = radio && radio.toJS && radio.toJS()
        const {
            price,
            balance,
        } = props


        const balanceDisable = radio && radio.ItemId === 'cash' && balance / 100 < price

        // console.log('balanceDisable:', radio,balanceDisable);

        return {
            enableSumbmit: radio && !!radio.ItemId && !balanceDisable,
            // initialValues: props.localSaveEnable && state.util.get(FormID + props.localSaveID),
            // initialValues:{text:"123"},
            initialValues: { PayRadio: option[0] },
        }
    },
    dispatch => ({})
)

@reduxForm({
    form: FormID,
})

export default class PayForm extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};


    __renderRadioItem = (item, selItem) => {
        const { name, ItemId, source } = item

        // console.log('test:', ItemId,selItem);

        return (
            <StyleRadio>
                <StyledRadioInnner>
                    {source ? <RadioImage source={source}/> :
                        <RadioPlacehold>
                            <RadioPlaceholdText>
                                ￥
                            </RadioPlaceholdText>
                        </RadioPlacehold>}
                    <StyleRadioText>
                        {name}
                    </StyleRadioText>
                </StyledRadioInnner>
                <RadioIcon size={20}
                           name={selItem.ItemId === ItemId ?
                               "ios-radio-button-on" :
                               "ios-radio-button-off"}/>
            </StyleRadio>
        )
    }

    render(): ReactElement<any> {

        const {
            handleSubmit,
            onSubmit,
            disabled,
            price,
            pristine,
            balance,
            enableSumbmit,
            ...rest
        } = this.props
        let { submitting, invalid } = rest

        const myOption = [
            ...option,
            { ItemId: 'cash', name: `账户余额: ${(balance / 100).toFixed(1)}元` }
        ]


        const submitDisabled = !enableSumbmit || !!disabled || invalid

        return (
            <StyledContent>
                <StyledHeaderView>
                    <View/>
                    <StyledHeaderTitle>
                        选择支付方式
                    </StyledHeaderTitle>
                    <Button
                        hitSlop={{ top: 20, left: 20, bottom: 10, right: 20 }}
                        onPress={() => {
                            Pop.hide()
                        }}>
                        <StyledIconAwesome
                            size={30}
                            name={'close'}/>
                    </Button>
                </StyledHeaderView>
                <Radio
                    name='PayRadio'
                    keyName='ItemId'
                    options={myOption}
                    renderItem={this.__renderRadioItem}/>
                <StyledBuyButton
                    {...rest}
                    style={{ backgroundColor: submitDisabled?'#f6f7f9':'#1ac305' }}
                    disabled={submitDisabled || submitting}
                    hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                    onPress={onSubmit && handleSubmit(onSubmit)}
                >
                    {!submitting ? <StyledPriceText
                        submitDisabled={submitDisabled}>
                        立即支付：￥{price.toFixed(1)}
                    </StyledPriceText> : <StyledActivityIndicator color={'white'}/>}

                </StyledBuyButton>
            </StyledContent>
        );
    }
}


