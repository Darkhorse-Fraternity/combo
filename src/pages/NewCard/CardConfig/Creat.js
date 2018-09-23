/**
 * Created by lintong on 2017/7/11.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  // TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import { ICARD, IUSE } from '../../../redux/reqKeys'
import { add } from '../../../redux/module/leancloud'
import { bindActionCreators } from 'redux';
import { addListNormalizrEntity } from '../../../redux/actions/list'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { selfUser, iCard } from '../../../request/LCModle'
import moment from 'moment'
import OptionDo, { StaticOption } from './OptionDo'
import Button from '../../../components/Button/index'
import { mainColor } from '../../../Theme/index'
import {
  reduxForm,
  formValueSelector,
} from 'redux-form/immutable'
import { popToIndex } from '../../../redux/nav'

export const FormID = 'CreatCardForm'
const selector = formValueSelector(FormID) // <-- same as form name

import {
  StyledContent,
  StyledSubTitleView,
  StyledSubTitle
} from './style'
import { TextInput } from '../../../components/Form/Cunstom/index'
import Toast from 'react-native-simple-toast'
//static displayName = Creat

import HeaderBtn from '../../../components/Button/HeaderBtn'
import BackBtn from '../../../components/Button/BackBtn/index'
import * as Animatable from 'react-native-animatable';

@connect(
  state => ({
    //data:state.req.get()
    title: selector(state, 'title'),
    initialValues: StaticOption,
    load: state.req.get(ICARD).get('load')
  }),
  (dispatch, props) => ({
    //...bindActionCreators({},dispatch),
    add: () => dispatch(async (dispatch, getState) => {

      // console.log('test:', option);

      // const state = getState()
      // const user = state.user.data;
      //新建卡片


      const state = getState()
      // const title = selector(state, 'title')
      const op = selector(
        state,
        'title',
        'notifyTimes',
        'period',
        'recordDay',
        'notifyText',
        'record')

      const param = {
        // title,
        // cycle: 0,
        // time: 0,
        // notifyTime:option&&option.notifyTime||"20.00",
        ...op,
        record: op.record.toJS(),
        recordDay: op.recordDay.toJS(),
        notifyTimes: op.notifyTimes.toJS(),
        price: 0,
        state: 0,
        // doneDate: {"__type": "Date", "iso": moment('2017-03-20')},
        ...selfUser(),
      }


      const res = await add(param, ICARD)
      const entity = {
        ...param,
        ...res
      }
      dispatch(addNormalizrEntity(ICARD, entity))

      //返回首页
      // dispatch((dispatch, getState) => {
      //
      // })
      popToIndex()

      const iCardId = res.objectId
      // //询问是否立即使用。
      // Alert.alert(
      //     '你新建了一个卡片，是否立即使用它',
      //     '您可以立即  使用或者成立圈子',
      //     [{
      //         text: '建立圈子', onPress: () => {
      //             props.navigation.navigate('PublishDetail', {
      //                 iCardID: iCardId,
      //                 data: entity
      //             })
      //         }
      //     },
      //         {
      //             text: '自己使用', onPress: async () => {
      //
      //             const param = {
      //                 time: 0,
      //                 // notifyTime:option&&option.notifyTime||"20.00",
      //                 doneDate: { "__type": "Date", "iso": moment('2017-03-20') },
      //                 ...selfUser(),
      //                 ...iCard(iCardId)
      //             }
      //             const res = await add(param, IUSE)
      //             const entity = {
      //                 ...param,
      //                 ...res
      //             }
      //             dispatch(addListNormalizrEntity(IUSE, entity))
      //         }
      //         }
      //     ]
      // )
      const addParam = {
        time: 0,
        // notifyTime:option&&option.notifyTime||"20.00",
        doneDate: { "__type": "Date", "iso": moment('2017-03-20') },
        ...selfUser(),
        ...iCard(iCardId)
      }
      const addRes = await add(addParam, IUSE)
      const addEntity = {
        ...addParam,
        ...addRes
      }
      dispatch(addListNormalizrEntity(IUSE, addEntity))

    }),
  })
)


@reduxForm({
  form: FormID,
})

// @formValues('title')


export default class Creat extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      step: 0,
      optionOpen: false,
    }
  }

  static propTypes = {
    title: PropTypes.string
  };
  static defaultProps = {
    title: ''
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

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
  }


  __nextStep = () => {


    // const step = this.state.step + 1
    // this.setState({ step })
    // if (step === 2) {
    //     this.props.add()
    // }
    if (this.props.title && this.props.title.length > 0) {
      this.setState({ optionOpen: true })
    } else {
      Toast.show('标题不可为空')
    }


  }

  __backStep = (handle) => {

    const step = this.state.step - 1
    this.setState({ step })
    if (step === -1) {
      // this.props.navigation.goBack()
      handle()
    }
  }

  __doOption = () => {
    this.setState({ optionOpen: true })
  }


  __renderName = () => {
    return (
      <View style={{ marginTop: 90 }}>
        <View style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Animatable.View animation="fadeInLeft"
                           delay={Math.random() * 300}
          >
            <BackBtn onBackPress={this.__backStep}/>
          </Animatable.View>
          <Animatable.View animation="fadeInRight"
                           delay={Math.random() * 300}
          >
            <Button
              onPress={this.__nextStep}
              style={[styles.done, styles.shadow]}>
              <Text>下一步</Text>
            </Button>
          </Animatable.View>
        </View>
        <Animatable.View animation="fadeInLeft"
                         delay={Math.random() * 300}
        >
          <StyledSubTitleView>
            <StyledSubTitle>
              卡片标题
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
        </Animatable.View>
        {/*<View style={styles.line}/>*/}
        {/*<Button*/}
        {/*disabled={this.props.title.length === 0}*/}
        {/*onPress={this.__nextStep}*/}
        {/*style={[styles.sureBtn, {*/}
        {/*backgroundColor:*/}
        {/*this.props.title.length === 0 ?*/}
        {/*"rgb(200,200,200)" : "black"*/}
        {/*}]}>*/}
        {/*<Text style={styles.sureBtnText}>下一步</Text>*/}
        {/*</Button>*/}

      </View>
    )
  }


  // __doneView = () => {
  //
  //     return (
  //         <View style={{ marginTop: 60 }}>
  //             <BackBtn onBackPress={this.__backStep}/>
  //             <Text style={styles.doneTitle}>{this.props.title}</Text>
  //             {/*<Button*/}
  //             {/*onPress={this.__backStep}*/}
  //             {/*style={[styles.sureBtn]}>*/}
  //             {/*<Text style={styles.sureBtnText}>上一步</Text>*/}
  //             {/*</Button>*/}
  //             <Button
  //                 onPress={this.__doOption}
  //                 style={[styles.sureBtn]}>
  //                 <Text style={styles.sureBtnText}>更多配置</Text>
  //             </Button>
  //             <HeaderBtn
  //                 hitSlop={
  //                     { top: 0, left: 20, bottom: 20, right: 20 }}
  //                 style={styles.sureBtn}
  //                 load={this.props.load}
  //                 title={'完成'}
  //                 onPress={this.__nextStep}/>
  //         </View>
  //     )
  // }


  render(): ReactElement<any> {
    return (
      <StyledContent
        colors={['#f1f6f9', '#ffffff']}
        style={[this.props.style, styles.wrap]}>

        {!this.state.optionOpen && this.__renderName()}
        {/*{(this.state.step === 1 || this.state.step === 2)*/}
        {/*&& !this.state.optionOpen && this.__doneView()}*/}
        {this.state.optionOpen &&
        (<OptionDo goBack={() => {
          this.props.navigation.goBack()
        }}
                   done={this.props.add}
                   load={this.props.load}/>)}
      </StyledContent>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  row: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: mainColor,
    // marginHorizontal: 30,
    paddingHorizontal: 50,
    // paddingVertical:20,
  },
  downRow: {
    marginHorizontal: 30,
    height: 90,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 50,
    textAlign: 'left',
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 15,
  },
  sureBtn: {
    marginLeft: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    paddingVertical: 10,
    marginTop: 20,
  },
  sureBtn1: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    paddingVertical: 10,
    marginTop: 20,
  },
  sureBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  ctrlView: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingTop: 20,
  },
  doneBtn: {
    // width: 50,
    // height: 50,
    marginTop: 20,
    // borderRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneCtrlView: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingTop: 10,
  },
  doneTitle: {
    marginTop: 35,
    paddingHorizontal: 55,
    fontSize: 20,
    fontWeight: '600',
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgb(0,0,0)'
  },
  done: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginLeft: 5,
  },

  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 5,
    elevation: 3
  },
})
