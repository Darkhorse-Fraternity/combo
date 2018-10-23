import React, { Component } from 'react'
import { reduxForm } from 'redux-form/immutable'

import { ImageSelectView } from '../Select'
import PropTypes from 'prop-types';
import {
  Form,
  StyledIndicator,
  StyledIndicatorView,
  StyledButtonView,
  StyledBtn,
  StyledLine,
  StyledBackBtn,
  StyledBackBtnText,
  StyledContent,
  StyledTextInput,
  StyledHeader,
  StyledIcon
} from './style'

import {
  View,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { formValueSelector } from 'redux-form/immutable'
// import {getFormValues} from 'redux-form/immutable' //获取全部
// import ImageSelectView from '../../ImagePicker/ImageSelectView'
import theme from '../../../Theme'
import { KeyboardAccessoryView, KeyboardUtils } from 'react-native-keyboard-input';

export const FormID = 'DoCardForm'
const selector = formValueSelector(FormID) // <-- same as form name

import { dataStorage } from '../../../redux/actions/util'
import Pop from '../../Pop'
import KeyboardManager from 'react-native-keyboard-manager'

const isEmpty = value => value === undefined || value === null || value === '' || value.length === 0;
const TrackInteractive = true;


@connect(
  (state, props) => {
    const recordText = selector(state, 'recordText');
    let imgs = selector(state, 'imgs');
    // console.log('imgs:', imgs);
    imgs = imgs && imgs.toJS && imgs.toJS()
    const config = { "文字": recordText, "图片": imgs }
    const record = props.record || []//需要满足的条件
    // const mustText = chechType(record, '文字') && !isEmpty(config[文字])
    //遍历查询是否条件未被满足
    const hasNone = record.findIndex(key => {
      return record.includes(key) && isEmpty(config[key])
    }) !== -1

    return {
      enableSumbmit: !hasNone || props.type === 1,
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

export default class DoCardForm extends Component {

  constructor(props: Object) {
    super(props);
    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
    this.onKeyboardResigned = this.onKeyboardResigned.bind(this);
  }


  static propTypes = {
    record: PropTypes.array
  };
  static defaultProps = {
    record: []
  };


  componentDidMount() {
    Platform.OS === 'ios' && KeyboardManager.setEnable(false);

  }

  componentWillUnmount() {
    Platform.OS === 'ios' && KeyboardManager.setEnable(true);
    KeyboardUtils.dismiss()
    // this.props.localSaveEnable && this.props.localSave(this.props.inputText)
  }


  __textType = () => {

    return (
      <StyledTextInput
        // placeholderTextColor="rgba(180,180,180,1)"
        // selectionColor={theme.mainColor}
        ref={(r) => {
          this.textInputRef = r;
        }}
        style={{ backgroundColor: 'transparent' }}
        returnKeyType='next'
        name={'recordText'}
        maxLength={3000}
        autoFocus
        placeholder={"想写点什么？"}
        multiline={true}
        //keyboardType={boardType}
        underlineColorAndroid='transparent'
        clearButtonMode='while-editing'
        enablesReturnKeyAutomatically={true}
      />
    )
  }


  keyboardAccessoryViewContent() {

    return (
      <View style={{paddingHorizontal:20,marginBottom:-30}}>
        <ImageSelectView name={'imgs'} maxImage={1}/>
      </View>
    );
  }

  onKeyboardResigned() {
  }


  render() {
    // pristine 是否是初始化
    const {
      handleSubmit,
      onSubmit,
      load,
      disabled,
      pristine,
      color,
      enableSumbmit,
      ...rest
    } = this.props
    const { submitting, invalid } = rest
    const record = this.props.record

    // console.log('submitting222:', load);

    return (
      <Form>
        <StyledHeader>
          <StyledBtn
            hitSlop={{ top: 5, left: 50, bottom: 5, right: 20 }}
            onPress={() => {
              Pop.hide()
            }}>
            <StyledIcon name={'close'} size={20}/>
            {/*<StyledBackBtnText>返回</StyledBackBtnText>*/}
          </StyledBtn>


          {load ?
            <StyledIndicator color={color}/> :
            <StyledBtn
              disabled={!enableSumbmit}
              hitSlop={{ top: 5, left: 20, bottom: 5, right: 50 }}
              onPress={onSubmit && handleSubmit(onSubmit)}>
              <StyledBackBtnText
                disabled={!enableSumbmit}
                color={color}>
                发布
              </StyledBackBtnText>
            </StyledBtn>
          }
        </StyledHeader>
        <StyledContent>
          {this.__textType()}


          {/*{record.includes('图片') && (<ImageSelectView*/}
          {/*name={'imgs'}*/}
          {/*maxImage={1}/>)}*/}

          {<KeyboardAccessoryView
            renderContent={this.keyboardAccessoryViewContent}
            trackInteractive={TrackInteractive}
            kbInputRef={this.textInputRef}
            onKeyboardResigned={this.onKeyboardResigned}
            revealKeyboardInteractive
          />}


        </StyledContent>
      </Form>
    )
  }
}


