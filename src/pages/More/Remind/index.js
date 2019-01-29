/**
 * Created by lintong on 2018/9/22.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  InteractionManager,
  Platform
} from 'react-native'
import {  FlatList, } from 'react-navigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { ICARD, IUSE } from '../../../redux/reqKeys'
import svgs from '../../../../source/icons'
import AppleStyleSwipeableRow from '../../../components/Swipeable'
const interactionManagerDelay = () => new Promise((resolve) =>
  InteractionManager.runAfterInteractions(resolve));


import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledSubTitle,
  StyledSubTitleText,
  StyledSwitch,
  StyledButton,
  StyledTime,
  StyledName,
  StyledDays,
  StyledLine,
  StyledRound,
  StyledIconView,
  StyledIcon,
  StyledRowInner,
  StyledRowDis,
  StyledDeleteBtn,
  StyledDeleteBtnText,
  StyledIconImage,
  StyledAntDesign
} from './style'
import moment from 'moment'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { localRemind } from '../../../redux/actions/util'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { update } from '../../../redux/module/leancloud'
import { shadeBlend } from '../../../../helps/util'
import * as Animatable from 'react-native-animatable';
import AnimationRow from '../../../components/AnimationRow'

export const Days = ['一', '二', '三', '四', '五', '六', '天'];
export const daysText = (recordDay) => {
  const days = recordDay.sort();
  // console.log('days:', days);
  if (days.length === 0) {
    return "无"
  } else if (days.length === 7) {
    return "每天"
  } else if (days.length === 2 && days[0] === 6) {
    return '周六与周日'
  } else if (days.length === 5 && days[4] === 5) {
    return '周一至周五'
  } else {
    return '逢周 ' + days.map(day => Days[day - 1] + ' ').toString()
  }
}


function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

@connect(
  state => ({
    data: state.list.get(IUSE).get('listData'),
    iUseList: state.normalizr.get(IUSE),
    iCardList: state.normalizr.get(ICARD),
    localRemindData: state.util.get('localRemind'),
    selfUser: state.user.data
  }),
  dispatch => ({
    remind: (id, value) => {

      storage.save({
        key: "localRemind",
        id,  //注意:请不要在key中使用_下划线符号!
        data: value,
      });

      dispatch(localRemind(id, value))
    },
    refresh: async (notifyTimes, iCard) => dispatch(async (dispatch, getState) => {
      {
        const id = iCard.objectId

        notifyTimes = notifyTimes.sort(
          (a, b) => moment(a, 'HH:mm') - moment(b, 'HH:mm'))

        const param = {
          notifyTimes
        }

        const res = await dispatch(update(id, param, ICARD))

        const entity = {
          ...param,
          ...res
        }
        return dispatch(addNormalizrEntity(ICARD, entity))
        // Toast.show('修改配置成功~!')
      }
    }),
    deleteRow: async (notifyTime, iCard, handleView) => dispatch(async (dispatch, getState) => {
      {
        const id = iCard.objectId

        const index = iCard.notifyTimes.indexOf(notifyTime);
        if (index > -1) {
          iCard.notifyTimes.splice(index, 1);
        }
        const notifyTimes = iCard.notifyTimes

        const param = {
          notifyTimes
        }

        const res = await dispatch(update(id, param, ICARD))

        const entity = {
          ...param,
          ...res
        }

         handleView && await handleView.remove()
        await  dispatch(addNormalizrEntity(ICARD, entity))
         handleView && await handleView.reset()

        return res;
        // Toast.show('修改配置成功~!')
      }
    }),

  })
)


export default class Remind extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      isDateTimePickerVisible: false,
      time: "00:00",
      selectItem: null,
      openIndex: -1,
    }

  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      title: '',
    }
  };


  _renderHeader = () => {
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          提醒时间线
        </StyledHeaderTitle>
      </StyledHeader>
    )
  }

  _ListHeaderComponent = (id, value, data) => {


    const propsColor = Platform.OS === 'ios' ? {
      trackColor: { false: '#39ba98', true: '#39ba98' },
    } : {
      thumbColor: value ? '#39ba98' : '#f6f7f9',
      // trackColor:{true: '#f6f7f9'},
    }


    return [
      <StyledSubTitle key={'subTitle'}>
        <StyledRowInner>
          <StyledIcon size={30} name={'alarm-on'}/>
          <StyledSubTitleText>
            开启习惯提醒
          </StyledSubTitleText>
        </StyledRowInner>
        <StyledSwitch
          {...propsColor}
          value={value}
          onValueChange={async (value) => {
            await this.props.remind(id, value)
          }}/>
      </StyledSubTitle>,
      data.length > 0 && <StyledLine key={'line'} style={{ height: 15, marginLeft: 35 }}/>
    ]


  }


  _renderSwipeOutDeleteBtn = () => {
    return (
      <StyledDeleteBtn>
        <StyledAntDesign size={25} color={'red'} name={'delete'}/>
        <StyledDeleteBtnText>
          删除
        </StyledDeleteBtnText>
      </StyledDeleteBtn>
    )
  }


  _deleteRow = async (item,index) => {
    const handleView = this.handleViewRef['habit' + index]
    const { iCard, notifyTime } = item
    const { selfUser, deleteRow } = this.props

    if (iCard.user === selfUser.objectId) {
      await deleteRow(notifyTime, iCard, handleView)
    } else {
      Toast.show('共享卡片,只有卡片拥有有权限删除哦~!')
    }

  }

  handleViewRef = {}
  swipeRefs = {}
  _renderRow = ({ item, index }) => {

    // console.log('test:', item);
    const { iCard, notifyTime, objectId } = item

    const { localRemindData } = this.props
    // const value =  await  storage.load({
    //    key: "localRemind",
    //    id:item.objectId+item.notifyTime,
    //  })
    const id = objectId + notifyTime
    let value = localRemindData.get(id)
    if (value === undefined) {
      value = true
    }
    const { iconAndColor, title, recordDay } = iCard
    const { color, name } = iconAndColor || { name: 'sun', color: '#b0d2ee' }
    const propsColor = Platform.OS === 'ios' ? {
      trackColor: { false: color, true: color },
    } : {
      thumbColor: value ? color : '#f6f7f9',
      trackColor: { true: shadeBlend(0.75, color) },
    }

    return (
      <AnimationRow
        useNativeDriver
        ref={res => this.handleViewRef['habit' + index] = res}>
        <AppleStyleSwipeableRow
          ref={ref => {
            this.swipeRefs['swipe'+ index] = ref
          }}
          backgroundColor='white'
          onSwipeableWillOpen={() => {
            const openIndex = this.state.openIndex
            if(index === openIndex) {
              return
            }
            if(openIndex !== -1){
              const swipeRef = this.swipeRefs['swipe'+openIndex]
              swipeRef && swipeRef.close()
            }
            this.setState({ openIndex: index })
          }}
          onSwipeableWillClose={() => {
            // rowId === this.state.openIndex &&
            console.log('test:', '111');
            if(index === this.state.openIndex) {
              this.setState({ openIndex: -1 })
            }

          }}
          right={[{
            type: 'delete',
            onPress: () => {
              this._deleteRow(item,index)
              // this.setState({ openIndex: -1 })
            },
            component: this._renderSwipeOutDeleteBtn(),
            backgroundColor: '#f6f7f9'
          }]}
        >
          <StyledButton
            hitSlop={{ top: 0, right: -100, bottom: 0, left: 0 }}
            activeOpacity={1}
            onPress={() => {

              const { selfUser } = this.props
              if (iCard.user === selfUser.objectId) {
                this.setState({
                  isDateTimePickerVisible: true,
                  time: notifyTime,
                  selectItem: item,
                })
              } else {
                Toast.show('追随他人习惯,只有自己的卡片有权限修改哦~!')
              }


            }}>
            <StyledRowInner>
              <StyledLine/>
              <StyledRound/>
              <StyledTime>
                {notifyTime}
              </StyledTime>
              <StyledIconView color={'#f6f7f9'}>
                <StyledIconImage
                  size={25}
                  source={svgs[name]}
                  resizeMode={'contain'}
                />
              </StyledIconView>
              <StyledRowDis>
                <StyledName numberOfLines={2}>
                  {title}
                </StyledName>
                <StyledDays>
                  {daysText(recordDay)}
                </StyledDays>
              </StyledRowDis>
            </StyledRowInner>
            <StyledSwitch
              {...propsColor}
              onValueChange={(value) => {
                this.props.remind(id, value)
              }} value={value}/>

          </StyledButton>
        </AppleStyleSwipeableRow
>
      </AnimationRow>
    )

  }

  _keyExtractor = (item, index) => {
    const key = item.objectId + item.notifyTime || index;
    return key + '';
  }


  _handleDatePicked = async (date) => {
    this.setState({ isDateTimePickerVisible: false })

    // await interactionManagerDelay()
    // InteractionManager.runAfterInteractions( () => {
      // ...耗时较长的同步的任务...
      const hours = PrefixInteger(date.getHours(), 2)
      const minutes = PrefixInteger(date.getMinutes(), 2)
      const time = `${hours}:${minutes}`
      const { selectItem } = this.state
      const { selfUser, refresh } = this.props
      const { iCard, notifyTime } = selectItem
      if (iCard.user === selfUser.objectId) {
        const index = iCard.notifyTimes.indexOf(notifyTime);
        if (index > -1) {
          iCard.notifyTimes.splice(index, 1);
        }
        const notifyTimes = [time, ...iCard.notifyTimes]
        refresh(notifyTimes, iCard)
      } else {
        Toast.show('共享卡片,只有卡片拥有有权限修改哦~!')
      }
    // });


    // this.onChange(time)
    //
    // this.onChange = null
  }

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }


  render(): ReactElement<any> {


    let { data, iUseList, iCardList, localRemindData } = this.props


    const id = 'all'
    let value = localRemindData.get(id)
    if (value === undefined) {
      value = true
    }

    const newData = []
    if (value) {

      data = data && data.toJS()


      data.forEach(item => {
        const iUse = iUseList.get(item).toJS()
        const { statu } = iUse
        if (statu === 'start') {

          const iCard = iCardList.get(iUse.iCard).toJS()

          iUse.iCard = iCard

          const { notifyTimes } = iCard
          // if(iUse.)

          notifyTimes && notifyTimes.forEach(notifyTime => {
            const newUse = { ...iUse }
            newUse.notifyTime = notifyTime
            newData.push(newUse)
          })
        }
      })
      newData.sort((a, b) => moment(a.notifyTime, 'HH:mm') - moment(b.notifyTime, 'HH:mm'))
    }


    // .filter(item => item.statu === 'start')


    // .sort(item => item.iCard.notifyTime)

    return (
      <StyledContent forceInset={{ top: 'never' }}>
        {this._renderHeader()}
        <FlatList
          scrollEnabled={this.state.openIndex === -1}
          data={newData}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={() => this._ListHeaderComponent(id, value, newData)}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode={'time'}
          cancelTextIOS={'取消'}
          titleIOS={'修改提醒时间'}
          // date={moment(this.state.time, 'HH:mm').toDate()}
          confirmTextIOS={'确定'}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </StyledContent>
    );
  }
}


