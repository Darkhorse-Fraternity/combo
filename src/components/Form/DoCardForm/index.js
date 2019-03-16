import React, { Component } from 'react';
import { reduxForm } from 'redux-form/immutable';

import PropTypes from 'prop-types';

import {
  View,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { formValueSelector } from 'redux-form/immutable';
// import {getFormValues} from 'redux-form/immutable' //获取全部
// import ImageSelectView from '../../ImagePicker/ImageSelectView'
import { KeyboardAccessoryView, KeyboardUtils } from 'react-native-keyboard-input'; // <-- same as form name
import KeyboardManager from 'react-native-keyboard-manager';
import * as immutable from 'immutable';
import theme from '../../../Theme';

import { dataStorage } from '../../../redux/actions/util';
import Pop from '../../Pop';
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
} from './style';
import { ImageSelectView } from '../Select';

export const FormID = 'DoCardForm';
const selector = formValueSelector(FormID);

const isEmpty = value => value === undefined || value === null || value === '' || value.length === 0;
const TrackInteractive = true;


@connect(
  (state, props) => {
    const recordText = selector(state, 'recordText');

    const { util } = state;
    const storage = util.get(FormID + props.localSaveID);
    const storageData = storage && storage.toJS() || { imgs: [] };
    let imgs = selector(state, 'imgs');
    // console.log('imgs:', imgs);
    imgs = imgs && imgs.toJS && imgs.toJS();
    const config = { 文字: recordText, 图片: imgs };
    const record = props.record || [];// 需要满足的条件
    // const mustText = chechType(record, '文字') && !isEmpty(config[文字])
    // 遍历查询是否条件未被满足
    const hasNone = record.findIndex(key => record.includes(key) && isEmpty(config[key])) !== -1;

    return {
      enableSumbmit: !hasNone || props.type === 1,
      initialValues: storageData,
      imgs,
      recordText
      // inputText: props.localSaveEnable && text,
    };
  },
  (dispatch, props) => ({

    localSave: (recordText, imgs) => {
      dispatch((dispatch, getState) => {
        // const state = getState();
        // const recordText = selector(state, 'recordText');
        dispatch(dataStorage(FormID + props.localSaveID, { recordText, imgs }));
      });
    },
    // localLoad
  })
)

@reduxForm({
  form: FormID,
  // destroyOnUnmount: false
})


export default class DoCardForm extends Component {
  constructor(props: Object) {
    super(props);
    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
    this.onKeyboardResigned = this.onKeyboardResigned.bind(this);
    this.state = {

    };
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


  shouldComponentUpdate(nextProps, nextState) {
    const otherNextProps = { ...nextProps };
    const props = { ...this.props };

    delete otherNextProps.imgs;
    delete otherNextProps.recordText;
    delete props.imgs;
    delete props.recordText;
    return !immutable.is(props, otherNextProps) || !immutable.is(this.state, nextState);
    // return this.props.enableSumbmit !== nextProps.enableSumbmit;
  }

  componentWillUnmount() {
    Platform.OS === 'ios' && KeyboardManager.setEnable(true);
    KeyboardUtils.dismiss();
    const { imgs, recordText } = this.props;
    this.props.localSaveEnable && this.props.localSave(recordText, imgs);
  }

  __textType = () => (
    <StyledTextInput
        // placeholderTextColor="rgba(180,180,180,1)"
        // selectionColor={theme.mainColor}
        // ref={(r) => {
        //   this.textInputRef = r;
        // }}
      style={{ backgroundColor: 'transparent' }}
      returnKeyType="next"
      name="recordText"
      maxLength={50000}
      autoFocus
      placeholder="想写点什么？"
      multiline
        // keyboardType={boardType}
      underlineColorAndroid="transparent"
      clearButtonMode="while-editing"
      enablesReturnKeyAutomatically
    />
  )


  keyboardAccessoryViewContent() {
    return (
      <View style={{ paddingHorizontal: 0, marginBottom: 10, marginTop: Platform.OS === 'ios' ? 0 : 20 }}>
        <ImageSelectView name="imgs" maxImage={1} />
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
      reset,
      ...rest
    } = this.props;
    // const { submitting, invalid } = rest;
    // const { record } = this.props;

    // console.log('submitting222:', load);

    return (
      <Form>
        <StyledHeader>
          <StyledBtn
            hitSlop={{
              top: 5, left: 50, bottom: 5, right: 20
            }}
            onPress={() => {
              Pop.hide();
            }}
          >
            <StyledIcon name="close" size={20} />
            {/* <StyledBackBtnText>返回</StyledBackBtnText> */}
          </StyledBtn>


          {load
            ? <StyledIndicator color={color} />
            : (
              <StyledBtn
                disabled={!enableSumbmit}
                hitSlop={{
                  top: 5, left: 20, bottom: 5, right: 50
                }}
                onPress={async () => {
                  if (onSubmit) {
                    await handleSubmit(onSubmit)();
                    await reset();
                    Pop.hide();
                  }
                }}
              >
                <StyledBackBtnText
                  disabled={!enableSumbmit}
                  color={color}
                >
                发布
                </StyledBackBtnText>
              </StyledBtn>
            )
          }
        </StyledHeader>
        <StyledContent behavior="padding" enabled>
          {this.__textType()}


          {/* {record.includes('图片') && (<ImageSelectView */}
          {/* name={'imgs'} */}
          {/* maxImage={1}/>)} */}

          {/* {Platform.OS==='ios'?<KeyboardAccessoryView */}
          {/* renderContent={this.keyboardAccessoryViewContent} */}
          {/* trackInteractive={TrackInteractive} */}
          {/* kbInputRef={this.textInputRef} */}
          {/* onKeyboardResigned={this.onKeyboardResigned} */}
          {/* revealKeyboardInteractive */}
          {/* />: */}
          {/* this.keyboardAccessoryViewContent() */}
          {/* } */}
          {this.keyboardAccessoryViewContent()}

        </StyledContent>
      </Form>
    );
  }
}
