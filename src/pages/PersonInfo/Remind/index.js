/**
 * Created by lintong on 2018/9/22.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  View,
  FlatList,
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
  StyledRowDis
} from './style'
import moment from 'moment'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { localRemind } from '../../../redux/actions/util'


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

@connect(
  state => ({
    data: state.list.get(IUSE).get('listData'),
    iUseList: state.normalizr.get(IUSE),
    iCardList: state.normalizr.get(ICARD),
    localRemindData: state.util.get('localRemind')
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


  })
)


export default class Remind extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);


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

  _ListHeaderComponent = (id,value,data) => {




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
  _renderRow = ({ item, index }) => {

    // console.log('test:', item);
    const { iCard } = item

    const { localRemindData } = this.props
    // const value =  await  storage.load({
    //    key: "localRemind",
    //    id:item.objectId+item.notifyTime,
    //  })
    const id = item.objectId + item.notifyTime
    let value = localRemindData.get(id)
    if(value === undefined){
      value = true
    }

    return (
      <StyledButton>
        <StyledRowInner>
          <StyledLine>
            <StyledRound/>
          </StyledLine>
          <StyledTime>
            {item.notifyTime}
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
    )

  }

  _keyExtractor = (item, index) => {
    const key = item.id || index;
    return key + '';
  }

  render(): ReactElement<any> {


    let { data, iUseList, iCardList,localRemindData } = this.props


    const id = 'all'
    let value = localRemindData.get(id)
    if(value === undefined){
      value = true
    }

    const newData = []
    if(value){

      data = data && data.toJS()

      data.forEach(item => {
        const iUse = iUseList.get(item).toJS()
        const { statu } = iUse
        if (statu === 'start') {

          const iCard = iCardList.get(iUse.iCard).toJS()

          iUse.iCard = iCard

          const { notifyTimes } = iCard
          // if(iUse.)

          notifyTimes.forEach(notifyTime => {
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
          ListHeaderComponent={()=>this._ListHeaderComponent(id,value,data)}
        />
      </StyledContent>
    );
  }
}


