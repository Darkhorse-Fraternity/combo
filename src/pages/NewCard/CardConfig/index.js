/**
 * Created by lintong on 2017/8/4.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { PureComponent } from 'react';
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
import Main from './Main'
import {defaultHabit} from '../../../configure/habit'
import moment from 'moment'
//static displayName = OptionView

const FormID = 'CreatCardForm'
import {
  StyledHeader,
  StyledTitle,
  StyledHeaderInner,
  StyledHeaderBtn,
  StyledInnerView
} from './Creat/style'


@connect(
  (state, props) => {

    const id = props.navigation.state.params.iCardId
    let iCard = state.normalizr.get('iCard').get(id)
    iCard = iCard && iCard.toJS()

    // const data = props.navigation.state.params.opData
    const propsOption = {
      ...defaultHabit,
      ...iCard,
      icon:iCard.iconAndColor.name,
      color:iCard.iconAndColor.color
    }


    return {
      initialValues: propsOption,
      load: state.req.get('iCard').get('load'),
      color:iCard.iconAndColor?iCard.iconAndColor.color:'#39ba98'
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
          'recordDay',
          'icon',
          'color',
        )

        const notifyTimes = op.notifyTimes.toJS()
          .sort((a, b) => moment(a, 'HH:mm')
            - moment(b, 'HH:mm'))


        const param = {
          title:op.title,
          period:op.period,
          record: op.record.toJS(),
          recordDay: op.recordDay.toJS(),
          iconAndColor: {
            name: op.icon,
            color: op.color
          },
          notifyText:op.notifyText,
          notifyTimes
        }

        const res = await dispatch(update(id, param, ICARD))

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
        Toast.show('修改成功~!')
        return dispatch(addNormalizrEntity(ICARD, entity))
        // Toast.show('修改配置成功~!')
      }
    })
  })
)

@reduxForm({
  form: FormID,
})


export default class CardConfig extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      step: 0
    }
  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {

    return {
      header: null,
    }
  };

  // shouldComponentUpdate(nextProps: Object, nextState: Object) {
  //     return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
  // }

  __backStep = () => {

    const step = this.state.step
    if (step === 0) {
      this.props.navigation.goBack()
    } else {
      this.setState({ step: step - 1 })
    }
  }


  __nextStep = () => {


    const step = this.state.step
    step === 0 && this.setState({ step: step + 1 })

  }


  render(): ReactElement<any> {
    const { step } = this.state
    return (
      <StyledContent>

        <StyledHeader>
          <StyledTitle>
            习惯设置
          </StyledTitle>
          <StyledHeaderInner>
             <StyledHeaderBtn
              // load={false}
              // disabled={false}
              backgroundColor={'#bfc2c7'}
              hitSlop={{ top: 15, left: 10, bottom: 15, right: 10 }}
              onPress={this.__backStep}
              title={step === 0 ? '取消' : '返回'}/>
            {step>=1 && <StyledHeaderBtn
              // load={false}
              // disabled={false}
              backgroundColor={this.props.color}
              hitSlop={{ top: 15, left: 10, bottom: 15, right: 10 }}
              onPress={async () => {
                await this.props.refresh()
                if (step === 0) {
                  this.props.navigation.goBack()
                } else {
                  this.setState({step:0})
                }

              }}
              title={'保存'}/>}
          </StyledHeaderInner>
        </StyledHeader>


        <StyledInnerView>
          <Main
            modify={true}
            // goBack={this.__backStep}
            step={step}
            nextStep={this.__nextStep}/>
        </StyledInnerView>
      </StyledContent>
    );
  }
}

