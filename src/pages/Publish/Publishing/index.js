/**
 * Created by lintong on 2017/9/26.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Image,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import { ICARD, IUSE } from '../../../redux/reqKeys'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { update } from '../../../redux/module/leancloud'

import { PBULImage } from '../../../redux/reqKeys'
import { uploadImages } from '../../../redux/actions/util'
//static displayName = PublishDetail
import Toast from 'react-native-simple-toast'
import CardPublishForm, { FormID } from '../../../components/Form/CardPublish/index'
import { formValueSelector } from 'redux-form/immutable'

import { Map } from 'immutable';
import {
  StyledContent,
  StyledHeader,
  StyledTitle,
  StyledSubTitle,
  StyledSubTitleText,
  StyledSwitch,
  StyledRowInner,
  StyledIcon,
  StyledEntypoIcon
} from './style'

const selector = formValueSelector(FormID)
import { showImagePicker } from '../../../components/ImagePicker/imagePicker'
import { CircleState } from '../../../configure/enum'
import {shadeBlend} from '../../../../helps/util'

@connect(
  (state, props) => ({
    //data:state.req.get()
    iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCardID),
    imageLoad: state.req.get(PBULImage).get('load'),
    load: state.req.get(ICARD).get('load'),
    // user: state.user.data
  }),
  (dispatch, props) => ({
    //...bindActionCreators({},dispatch),
    publish: (data) => {

      // if (!data.img) {
      //     Toast.show('发布的卡片必须有封面哟!');
      //     return;
      // }
      // if (!keys) {
      //     Toast.show('发布的卡片必须有关键字哟!');
      //     return;
      // }

      dispatch(async (dispatch, getState) => {

        const state = getState()
        const user = state.user.data
        // console.log('user:', user);
        if (!user.nickname || user.nickname.length === 0) {

          props.navigation.navigate('account')
          Toast.show('发布卡片前需要先设置昵称~!');
          return;
        }


        try {

          const keys = selector(state, 'keys');
          const describe = selector(state, 'describe');
          const id = data.objectId
          let cover = selector(state, 'cover')
          const imgs = selector(state, 'imgs')
          const price = selector(state, 'price')

          storage.save({
            key: "CardPublish",
            id,  //注意:请不要在key中使用_下划线符号!
            data: {
              keys,
              describe,
              cover,
              imgs,
              price
            },
          });


          cover = {
            "id": cover.get('id'),
            "__type": "File",
            url: cover.get('url')
          }

          const param = {
            price: Number(price),
            // state: data.state === 0 ? 1 : 0,
            keys: keys.split(','),
            describe,
            img: cover,
            imgs,

          }

          const res = await  dispatch(update(id, param, ICARD))


          if (res) {
            const entity = {
              ...param,
              ...res
            }
            dispatch(addNormalizrEntity(ICARD, entity))

            Toast.show('发布成功')
            // props.navigation.goBack()
          }
        } catch (e) {
          Toast.show(e.message)
        }

      })

    },

    shareState: async (data) => {
      const id = data.objectId
      const param = {
        state: data.state === 0 ? 1 : 0
      }
      const res = await  dispatch(update(id, param, ICARD))

      const entity = {
        ...param,
        ...res
      }
      dispatch(addNormalizrEntity(ICARD, entity))
    },
    circleState: async (data) => {
      const id = data.objectId
      const param = {
        circleState: data.circleState === CircleState.close ?
          CircleState.open : CircleState.close,
        state:data.circleState === CircleState.close ?
          CircleState.open : CircleState.close,
      }
      const res = await  dispatch(update(id, param, ICARD))

      const entity = {
        ...param,
        ...res
      }
      dispatch(addNormalizrEntity(ICARD, entity))
    },
    updatePrivacy: async (id, privacy) => {
      const param = {
        privacy,
      }
      const res = await dispatch(update(id, param, IUSE))
      const entity = {
        ...param,
        ...res,
      }
      dispatch(addNormalizrEntity(IUSE, entity))
    },
    picker: async (onChange) => {
      // dispatch(pickerImage())

      const response = await showImagePicker({
        title: '添加封面',
        maxWidth: 2000, // photos only
        maxHeight: 2000, // photos only
      })

      const { uri } = response


      if (uri) {
        // dispatch(uploadAvatar(response.uri))
        const res = await dispatch(uploadImages([uri],
          PBULImage))

        if (!res.payload) {
          return
        }

        // const id = props.navigation.state.params.iCardID
        const img = res.payload[0]
        // console.log('img:', img);
        // const param = {
        //     img: {
        //         "id": img.id,
        //         "__type": "File",
        //         url: img.attributes.url
        //     }
        // }
        // const res2 = await  update(id, param, ICARD)
        // const entity = {
        //     ...param,
        //     ...res2
        // }
        // dispatch(addNormalizrEntity(ICARD, entity))
        if (img) {
          onChange(new Map({ id: img.id, url: img.attributes.url }))
        }
      }
    }
  })
)
export default class Publishing extends Component {
  constructor(props: Object) {
    super(props);
    const keys = props.iCard.get('keys')
    this.state = {
      keys: keys && keys.join(","),
      getSave: false,
      circleState: props.iCard.get('circleState'),
      shareState: props.iCard.get('state')
    }

    this.load()

  }


  load = async () => {
    try {
      const id = this.props.navigation.state.params.iCardID


      const localSave = await storage.load({ key: "CardPublish", id })
      this.setState({
        getSave: true,
        localSave
      })
    } catch (e) {
      this.setState({
        getSave: true,
      })
    }

  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      // title: params.title,
    }
  };

  shouldComponentUpdate(nextProps: Object, nextState: object) {
    return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState)
  }

  componentWillReceiveProps(nextProps) {

  }

  _ListHeaderComponent = (data, color) => {

    const propsColor =(value)=> Platform.OS === 'ios' ? {
      trackColor: { false: color, true: color },
    } : {
      thumbColor: value ? color : '#f6f7f9',
      trackColor: { true: shadeBlend(0.75, color) },
    }

    const { circleState, shareState } = this.state
    return (
      <StyledHeader>
        <StyledTitle>
          {data.get('title')}
        </StyledTitle>
        <StyledSubTitle>
          <StyledRowInner>
            <StyledEntypoIcon size={25} name={'picasa'}/>
            <StyledSubTitleText>
              是否开启圈子
            </StyledSubTitleText>
          </StyledRowInner>
          <StyledSwitch
            value={circleState === CircleState.open}
            {...propsColor(circleState === CircleState.open)}
            onValueChange={() => {
              // await this.props.remind(id, value)
              this.setState({ circleState: circleState === 1 ? 0 : 1 })
              this.props.circleState(data.toJS())
              // this.props.updatePrivacy()
            }}/>
        </StyledSubTitle>
        {/*<StyledSubTitle>*/}
          {/*<StyledRowInner>*/}
            {/*<StyledIcon size={25} name={'share'}/>*/}
            {/*<StyledSubTitleText>*/}
              {/*是否允许推荐*/}
            {/*</StyledSubTitleText>*/}
          {/*</StyledRowInner>*/}
          {/*<StyledSwitch*/}
            {/*{...propsColor(shareState === 1)}*/}
            {/*value={shareState === 1}*/}
            {/*onValueChange={() => {*/}
              {/*// await this.props.remind(id, value)*/}
              {/*this.setState({ shareState: shareState === 1 ? 0 : 1 })*/}
              {/*this.props.shareState(data.toJS())*/}
            {/*}}/>*/}
        {/*</StyledSubTitle>*/}
      </StyledHeader>
    )
  }

  render(): ReactElement<any> {
    const { imageLoad, iCard, picker, load } = this.props
    // const iCard = this.props.iCard
    // const url = iCard.img && iCard.img.url
    const cover = iCard.get('img')
    let keys = iCard.get('keys')
    keys = keys && keys.toJS()


    let price = iCard.get('price') || 0
    const iconAndColor = iCard.get('iconAndColor')
    const { color } = iconAndColor ? iconAndColor.toJS() : { name: 'sun', color: '#b0d2ee' }

    price = price === 0 ? '' : price + ''
    const initialValues = {
      cover: new Map({
        url: cover && cover.get('url'),
        id: cover && cover.get('objectId')
      }),
      keys: keys && keys.toString(),
      describe: iCard.get('describe'),
      imgs: iCard.get('imgs'),
      price: price,
      ...this.state.localSave,
    }

    // console.log('this.state.localSave:', this.state.localSave);

    return (
      <StyledContent style={[this.props.style]}>
        {this._ListHeaderComponent(iCard, color)}


        {this.state.getSave &&
        this.state.circleState === CircleState.open && <CardPublishForm
          load={load}
          color={color}
          maxIndex={5}
          iCardId={this.props.navigation.state.params.iCardID}
          initialValues={initialValues}
          title={iCard.get('title')}
          imageLoad={imageLoad}
          // state={iCard.get('state')}
          handleImage={picker}
          onSubmit={() => {

            const iCardModel = iCard.toJS()
            // if (iCardModel.state === 0) {
            this.props.publish(iCardModel)
            // } else {
            //   // this.__alert(iCard)
            //   this.props.unPublish(iCardModel)
            // }
          }}
        />}
      </StyledContent>
    );
  }
}
