/**
 * Created by lintong on 2018/3/6.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  DeviceEventEmitter,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  StyledContent,
  StyledIcon,
  StyledEntypoIcon
} from './style'

// import DoCardButton from '../../components/Button/DoCardButton/index'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import BackTabBar from '../../components/Groceries/BackTabBar'
import Statistical from './Statistical'
// import Info from './Settings/index'
// import Course from './Course/index'
import Circle from './Circle/index'
import Button from '../../components/Button/index'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import theme from '../../Theme/index'
import { Privacy, CircleState } from '../../configure/enum'
import { COURSE,ICARD } from '../../redux/reqKeys'
import { list, entitys } from '../../redux/scemes'
import { find,update } from '../../redux/module/leancloud'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import  Toast from 'react-native-simple-toast'

@connect(
  (state, props) => {
    const iCard = state.normalizr.get('iCard').get(props.navigation.state.params.iCardId)
    // const courseId = iCard.get('course')
    return {
      iCard,
      iUse: state.normalizr.get('iUse').get(props.navigation.state.params.iUseId),
      user: state.user.data
      // course:
      // course: courseId && state.normalizr.get(COURSE).get(courseId)
    }
  },
  (dispatch, props) => ({

    setCircleState: async(iCard)=>{
      const data = iCard.toJS()
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
      Toast.show(data.circleState === CircleState.close?'多人模式':'单人模式')
    },
    dataLoad: () => {
      dispatch(async (dispatch, getState) => {
        const state = getState()
        const iCard = state.normalizr.get('iCard').get(props.navigation.state.params.iCardId)
        const courseId = iCard.get('course')
        const course = courseId && state.normalizr.get(COURSE).get(courseId)
        console.log('course:', course);
        if (courseId && course.get('statu') === undefined) {
          const params = {
            include: 'user',
            where: {
              objectId: props.courseId
            },
          }
          await dispatch(find(COURSE, params, { sceme: list(entitys[COURSE]) }))
        }
      })
    },
  })
)


export default class Card extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      scrollValue: new Animated.Value(0)
    }
  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {
    const { navigation } = props;
    const { state } = navigation;
    const { params } = state;
    return {
      // title: params.iCard.title,
      header: null,
    }
  };


  // _afterDone = (key) => {
  //   DeviceEventEmitter.emit(key);
  // }


  __renderRightView = () => {

    const { navigation,iCard,user } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { iCardId, iUseId } = params

    const isSelf = iCard.get('user') === user.objectId
    return [
      isSelf && <Button key={'icon1'} onPress={() => {
        this.props.setCircleState(iCard)
      }}>
        <StyledEntypoIcon
          color={'black'}
          style={{ marginRight: 5 }}
          size={21}
          name={'picasa'}/>
      </Button>,
      <Button key={'icon2'} onPress={() => {
        this.props.navigation.navigate('cardSetting', {
          iCardId, iUseId
        })
      }}>
        <StyledIcon
          color={'black'}
          style={{ marginRight: 10 }}
          size={23}
          name={'md-settings'}/>
      </Button>,
    ]
  }


  componentDidMount() {
    // this.props.dataLoad()
  }

  render(): ReactElement<any> {

    // const params = this.props.navigation.state.params
    // const {iUse,iCard} = params

    const { iCard, iUse } = this.props
    if (!iCard) {
      return (
        <StyledContent/>
      )
    }


    const useNum = iCard.get('useNum')
    let iconAndColor = iCard.get('iconAndColor')
    iconAndColor = iconAndColor ? iconAndColor.toJS() : {}
    const color = iconAndColor.color || ''
    const title = iCard.get('title')
    const privacy = iUse.get('privacy')
    const circleState = iCard.get('circleState')

    return (
      <StyledContent>
        <ScrollableTabView
          ref={'ScrollableTabView'}
          locked={useNum <= 1}
          onScroll={(x) => {
            const containerWidthAnimatedValue = new Animated.Value(x);
            this.setState({ scrollValue: containerWidthAnimatedValue });
          }}
          renderTabBar={() => (
            <BackTabBar
              underlineColor={color}
              title={title}
              tabUnderlineWidth={35}
              scrollValueWithOutNative={this.state.scrollValue}
              rightView={this.__renderRightView}
              onBackPress={this.props.navigation.goBack}/>
          )}
          prerenderingSiblingsNumber={0}
          // tabBarInactiveTextColor={theme.mainColor}
          // tabBarActiveTextColor={theme.mainColor}
          // tabBarUnderlineStyle={{ backgroundColor: theme.mainColor }}
          // tabBarPosition ='bottom'
        >
          {/*{course && course.get('statu') === 1 &&*/}
          {/*<Course {...this.props}*/}
          {/*tabLabel='课程'/>}*/}
          {circleState === CircleState.open &&
          <Circle
             color={color}
            {...this.props}
            tabLabel='圈子'/>}
          <Statistical
            color={color}
            {...this.props}
            tabLabel="统计"/>
          {/*<Info {...this.props} tabLabel="设置"/>*/}
        </ScrollableTabView>

        {/*<DoCardButton*/}
        {/*// afterDone={(res) => this._afterDone('done_' + iCard.get('objectId'))}*/}
        {/*{...this.props} />*/}
      </StyledContent>
    );
  }
}

