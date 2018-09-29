/**
 * Created by lintong on 2018/9/22.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  FlatList,
  InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { ICARD, IUSE } from '../../../redux/reqKeys'


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
  StyledDeleteBtnText
} from './style'
import moment from 'moment'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { localRemind } from '../../../redux/actions/util'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast'
import { addNormalizrEntity } from '../../../redux/module/normalizr'
import { update } from '../../../redux/module/leancloud'
import Swipeout from 'react-native-swipeout'


export const Days = ['一', '二', '三', '四', '五', '六', '天'];
export const daysText = (recordDay) => {
  const days = recordDay.sort();
  // console.log('days:', days);
  if (days.length === 0) {
    return "无"
  } else if (days.length === 7) {
    return "每天"
  } else if (days.length === 2 && days[0] === 6) {
    return '休息日'
  } else if (days.length === 5 && days[4] === 5) {
    return '工作日'
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

        const res = await update(id, param, ICARD)

        const entity = {
          ...param,
          ...res
        }
        return dispatch(addNormalizrEntity(ICARD, entity))
        // Toast.show('修改配置成功~!')
      }
    }),
    deleteRow: async (notifyTime, iCard) => dispatch(async (dispatch, getState) => {
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

        const res = await update(id, param, ICARD)

        const entity = {
          ...param,
          ...res
        }
        return dispatch(addNormalizrEntity(ICARD, entity))
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


    return [
      <StyledSubTitle key={'subTitle'}>
        <StyledRowInner>
          <StyledIcon size={30} name={'alarm-on'}/>
          <StyledSubTitleText>
            开启习惯提醒
          </StyledSubTitleText>
        </StyledRowInner>
        <StyledSwitch value={value} onValueChange={async (value) => {
          await this.props.remind(id, value)
        }}/>
      </StyledSubTitle>,
      data.length > 0 && <StyledLine key={'line'} style={{ height: 15, marginLeft: 35 }}/>
    ]


  }


  _renderSwipeOutDeleteBtn = () => {
    return (
      <StyledDeleteBtn>
        <StyledDeleteBtnText>
          删除
        </StyledDeleteBtnText>
      </StyledDeleteBtn>
    )
  }


  _deleteRow = async (item) => {
    const { iCard,notifyTime } = item
    const { selfUser, deleteRow } = this.props

    if (iCard.user === selfUser.objectId) {
      await deleteRow(notifyTime, iCard)
    } else {
      Toast.show('共享卡片,只有卡片拥有有权限删除哦~!')
    }

  }

  _renderRow = ({ item, index }) => {

    // console.log('test:', item);
    const { iCard ,notifyTime ,objectId} = item

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

    return (
      <Swipeout
        autoClose={true}
        right={[{
          type: 'delete',
          onPress: () => {
            this._deleteRow(item)
          },
          component: this._renderSwipeOutDeleteBtn(),
          backgroundColor: 'red'
        }]}
        backgroundColor={'red'}>
        <StyledButton
          activeOpacity={1}
          onPress={() => {
            this.setState({
              isDateTimePickerVisible: true,
              time: notifyTime,
              selectItem: item,
            })
          }}>
          <StyledRowInner>
            <StyledLine/>
            <StyledRound/>
            <StyledTime>
              {notifyTime}
            </StyledTime>
            <StyledIconView>
              <StyledIcon size={30} name={'alarm'}/>
            </StyledIconView>
            <StyledRowDis>
              <StyledName>
                {iCard.title}
              </StyledName>
              <StyledDays>
                {daysText(iCard.recordDay)}
              </StyledDays>
            </StyledRowDis>
          </StyledRowInner>
          <StyledSwitch onValueChange={(value) => {
            this.props.remind(id, value)
          }} value={value}/>

        </StyledButton>
      </Swipeout>
    )

  }

  _keyExtractor = (item, index) => {
    const key = item.id || index;
    return key + '';
  }


  _handleDatePicked = (date) => {
    this.setState({ isDateTimePickerVisible: false })

    InteractionManager.runAfterInteractions(async () => {
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
        await refresh(notifyTimes, iCard)
      } else {
        Toast.show('共享卡片,只有卡片拥有有权限修改哦~!')
      }
    });


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
      <StyledContent>
        {this._renderHeader()}
        <FlatList
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


