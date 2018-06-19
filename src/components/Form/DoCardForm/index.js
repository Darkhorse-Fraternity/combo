import React, { Component } from 'react'
import { reduxForm } from 'redux-form/immutable'
import { AutoGrowingInput } from '../Cunstom'
import { ImageSelectView } from '../Select'
import PropTypes from 'prop-types';
import {
    Form,
    StyledIndicator,
    StyledIndicatorView,
    StyledButtonView,
    StyledBtn,
    StyledLine
} from './style'

import { View } from 'react-native'
import { connect } from 'react-redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { formValueSelector } from 'redux-form/immutable'
// import {getFormValues} from 'redux-form/immutable' //获取全部
// import ImageSelectView from '../../ImagePicker/ImageSelectView'
import theme from '../../../Theme'

export const FormID = 'DoCardForm'
const selector = formValueSelector(FormID) // <-- same as form name

import { dataStorage } from '../../../redux/actions/util'
import Pop from '../../Pop'


const isEmpty = value => value === undefined || value === null || value === '' || value.length ===0;


@connect(
    (state, props) => {
        const recordText = selector(state, 'recordText');
        let imgs = selector(state, 'imgs');
        imgs = imgs && imgs.toJS()
        const config = {"文字":recordText,"图片":imgs}
        const record = props.record || []//需要满足的条件
        // const mustText = chechType(record, '文字') && !isEmpty(config[文字])
        //遍历查询是否条件未被满足
       const hasNone =  record.findIndex(key=>{
            return record.includes(key) && isEmpty(config[key])
        }) !== -1

        return {
            enableSumbmit: !hasNone,
            initialValues: { imgs: [] },
            inputText: props.localSaveEnable && text,
        }
    },
    (dispatch, props) => ({

        localSave: (text) => {
            dispatch(dataStorage(FormID + props.localSaveID, { text }))
        }
    })
)

@reduxForm({
    form: FormID,
})

@immutableRenderDecorator

export default class ChatSendForm extends Component {

    static propTypes = {
        record: PropTypes.array
    };
    static defaultProps = {
        record: []
    };




    componentWillUnmount() {
        this.props.localSaveEnable && this.props.localSave(this.props.inputText)
    }


    __textType = () => {

        return (
            <View>
                {/*<Text style={{fontSize: 15, marginTop:10}}>一句话日记</Text>*/}
                <AutoGrowingInput
                    placeholderTextColor="rgba(180,180,180,1)"
                    // selectionColor={theme.mainColor}
                    returnKeyType='next'
                    name={'recordText'}
                    maxLength={500}
                    placeholder={"一句话日记"}
                    //keyboardType={boardType}
                    underlineColorAndroid='transparent'
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                />
                <StyledLine/>
            </View>
        )
    }


    render() {
        // pristine 是否是初始化
        const { handleSubmit, onSubmit,load, disabled, pristine, enableSumbmit, ...rest } = this.props
        const { submitting, invalid } = rest
        const record = this.props.record

        // console.log('submitting222:', load);

        return (
            <Form>

                {record.includes('图片') && (<ImageSelectView
                    name={'imgs'}
                    maxImage={1}/>)}

                {record.includes('文字') && this.__textType()}


                {load ?
                    (<StyledIndicatorView>
                        <StyledIndicator size="large"/>
                    </StyledIndicatorView>) :
                    (<StyledButtonView>
                        <StyledBtn
                            title="取消"
                            hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
                            onPress={() => {
                                Pop.hide()
                            }}/>
                        <StyledBtn
                            disabled={!enableSumbmit}
                            title="打卡"
                            hitSlop={{ top: 5, left: 50, bottom: 5, right: 50 }}
                            onPress={onSubmit && handleSubmit(onSubmit)}/>
                    </StyledButtonView>)}
            </Form>
        )
    }
}


