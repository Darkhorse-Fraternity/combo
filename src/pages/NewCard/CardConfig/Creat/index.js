/**
 * Created by lintong on 2017/7/11.
 * @flow
 */

'use strict';

import * as immutable from 'immutable';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  // TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import { ICARD, IUSE } from '../../../../redux/reqKeys'
import { add } from '../../../../redux/module/leancloud'
import { addListNormalizrEntity } from '../../../../redux/actions/list'
import { addNormalizrEntity } from '../../../../redux/module/normalizr'
import { selfUser, iCard } from '../../../../request/LCModle'
import moment from 'moment'
import Main from '../Main'
import { defaultHabit } from '../../../../configure/habit'
import Button from '../../../../components/Button'
import { mainColor } from '../../../../Theme/index'

import {
  reduxForm,
  formValueSelector,
} from 'redux-form/immutable'
import { popToIndex } from '../../../../redux/nav'

export const FormID = 'CreatCardForm'
const selector = formValueSelector(FormID) // <-- same as form name

import {
  StyledContent,
  StyledSubTitleView,
  StyledSubTitle,
  StyledInnerView,
  StyledHeader,
  StyledTitle,
  StyledHeaderInner,
  StyledHeaderBtn,
  StyledInnerScrollView
} from './style'
import { TextInput } from '../../../../components/Form/Cunstom/index'
import Toast from 'react-native-simple-toast'
//static displayName = Creat
import BackBtn from '../../../../components/Button/BackBtn/index'
import * as Animatable from 'react-native-animatable';
import { Privacy } from '../../../../configure/enum'

import IconAndColor from './IconAndColor'
import { StyledArrowView } from "../../../Record/RecordRow/style";

@connect(
  (state, props) => ({
    //data:state.req.get()
    title: selector(state, 'title'),
    initialValues: props.navigation.state.params ? props.navigation.state.params.habit : defaultHabit,
    load: state.req.get(ICARD).get('load'),
    iUseLoad: state.req.get(IUSE).get('load'),
    color: selector(state, 'color')
  }),
  (dispatch, props) => ({
    //...bindActionCreators({},dispatch),
    add: () => dispatch(async (dispatch, getState) => {

      // console.log('test:', option);

      // const state = getState()
      // const user = state.user.data;
      //新建卡片


      //WARNING:首次登陆的时候也有用到icard 记得修改
      const state = getState()
      // const title = selector(state, 'title')
      const op = selector(
        state,
        'title',
        'notifyTimes',
        'period',
        'recordDay',
        'notifyText',
        'record',
        'icon',
        'color',
      )
      const notifyTimes = op.notifyTimes.toJS()
        .sort((a, b) => moment(a, 'HH:mm')
          - moment(b, 'HH:mm'))

      const param = {
        title: op.title,
        period: op.period,
        record: op.record.toJS(),
        recordDay: op.recordDay.toJS(),
        iconAndColor: {
          name: op.icon,
          color: op.color,
        },
        notifyTimes,
        price: 0,
        state: 0,
        // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
        ...dispatch(selfUser()),
      }


      const res = await dispatch(add(param, ICARD))
      const entity = {
        ...param,
        ...res
      }
      if (!res || !res.objectId) {
        return
      }

      dispatch(addNormalizrEntity(ICARD, entity))

      //返回首页
      // dispatch((dispatch, getState) => {
      //
      // })

      const iCardId = res.objectId
      const addParam = {
        time: 0,
        // notifyTime:option&&option.notifyTime||"20.00",
        doneDate: { "__type": "Date", "iso": moment('2017-03-20').toISOString() },
        ...dispatch(selfUser()),
        ...iCard(iCardId),
        statu: 'start',
        privacy: Privacy.open,
      }
      const addRes = await dispatch(add(addParam, IUSE))
      const addEntity = {
        ...addParam,
        ...addRes
      }
      dispatch(addListNormalizrEntity(IUSE, addEntity))
      dispatch(popToIndex())
    }),

  })
)


@reduxForm({
  form: FormID,
})

// @formValues('title')


export default class Creat extends PureComponent {
  constructor(props: Object) {
    super(props);
    // console.log('props.initialValues:', props.initialValues);
    this.state = {
      step:  props.initialValues.get("title")?1:0,
    }
  }

  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
  };
  static defaultProps = {
    title: '',
    type: 'custom',
  };
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      header: null,
      title: null,
      headerLeft: null
    }
  };

  // shouldComponentUpdate(nextProps: Object, nextState: Object) {
  //   return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
  // }

  componentWillReceiveProps(props) {
    // if(this.state.step <1){
    //   this.setState({ step: props.title?1:0 })
    // }
  }

  __nextStep = () => {

    const step = this.state.step
    if (this.props.title && this.props.title.length > 0) {
      this.setState({ step: step + 1 })
    } else {
      Toast.show('标题不可为空')
    }
  }

  __backStep = () => {

    const step = this.state.step
    if (step < 2) {
      this.props.navigation.goBack()
    } else {
      this.setState({ step: step - 1 })
    }
  }


  __renderName = () => {
    return (

      <View>
        <StyledSubTitleView>
          <StyledSubTitle>
            习惯标题：
          </StyledSubTitle>
        </StyledSubTitleView>
        <TextInput
          name='title'
          placeholderTextColor="rgba(180,180,180,1)"
          // selectionColor={mainColor}
          returnKeyType='next'
          maxLength={50}
          //keyboardType={boardType}
          style={styles.textInputStyle}
          underlineColorAndroid='transparent'
          placeholder='例如跑步、早睡等'
          clearButtonMode='while-editing'
          enablesReturnKeyAutomatically={true}
          //onSubmitEditing={() =>this.focusNextField(ref)}
          // onChangeText={(text) => this.setState({title: text})}
        />
      </View>
    )
  }


  render(): ReactElement<any> {
    // const { title, color } = this.props
    const { step } = this.state
    console.log('step:', step);
    return (
      <StyledContent
        // colors={['#f1f6f9', '#ffffff']}
        style={[this.props.style, styles.wrap]}>

        <StyledHeader>
          <StyledTitle>
            新建习惯
          </StyledTitle>
          <StyledHeaderInner>
            <StyledHeaderBtn
              // load={false}
              // disabled={false}
              backgroundColor={step < 2 ? '#bfc2c7' : null}
              hitSlop={{ top: 15, left: 10, bottom: 15, right: 10 }}
              onPress={this.__backStep}
              title={step < 2 ? '取消' : '返回'}/>
            {step < 2 && <StyledHeaderBtn
              load={this.props.load || this.props.iUseLoad}
              // disabled={false}
              // backgroundColor={color}
              hitSlop={{ top: 15, left: 10, bottom: 15, right: 10 }}
              onPress={() => {
                if (step === 0) {
                  this.__nextStep()
                } else {
                  this.props.add()
                }

              }}
              title={step === 0 ? '下一步' : '提交'}/>}
          </StyledHeaderInner>
        </StyledHeader>

        {this.state.step === 0 && <StyledInnerScrollView>
          {this.__renderName()}
          <IconAndColor/>
        </StyledInnerScrollView>}

        <StyledInnerView>


          {this.state.step >= 1 &&
          (<Main
            step={this.state.step - 1}
            nextStep={this.__nextStep}
          />)}
        </StyledInnerView>
      </StyledContent>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },

  textInputStyle: {
    height: 50,
    textAlign: 'left',
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 15,
  },

})
