import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { connect } from 'react-redux'


import { classSearch } from '../../../request/leanCloud'
// import {addListNormalizrEntity} from '../../../redux/actions/list'
import { IDO, IDOCALENDAR } from '../../../redux/reqKeys'
// import {IRECORD, ICARD,IUSE} from '../../../redux/reqKeys'
import { user, iUse } from '../../../request/LCModle'
import { req, clear } from '../../../redux/actions/req'

import Calendar from '../../../components/Calendar'
import moment from 'moment'

import {
  StyledAgendaRow
} from './style'


import { withTheme } from 'styled-components'


@connect(
  state => ({
    data: state.req.get(IDOCALENDAR)
  }),
  (dispatch, props) => ({
    load: (first, last) => {
      //获取iDo
      dispatch((dispatch, getState) => {

        const state = getState()
        const data = state.req.get(IDOCALENDAR).get('data').toJS()

        const iUseId = props.navigation.state.params.iUseId
        const userId = props.iUse.get('user')
        const param = {
          'where': {
            ...user(userId),
            ...iUse(iUseId),
            "createdAt": {
              "$gte": { "__type": "Date", "iso": first + "T00:00:00.000Z" },
              "$lte": { "__type": "Date", "iso": last + "T00:00:00.000Z" },
            },
            state: { $ne: -1 },
            type: 0
          }
        }
        const params = classSearch(IDO, param)
        dispatch(req(params, IDOCALENDAR, {
          dataMap: datas => {
            console.log(datas);
            
            datas.results.forEach(item => {
              const date = moment(item.createdAt).format("YYYY-MM-DD")
              data[date] = item
            })

            //  console.log('first:', first,datas,data);
            return data
          }
        }))

      })
    },
    clear: () => dispatch(clear(IDOCALENDAR)),
  })
)

@withTheme

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.props.clear()
    this.state = {}
  }


  componentDidMount() {
    this.refresh()
    // const key = 'done_' + this.props.iCard.get('objectId')
    // this.subscription =
    //     DeviceEventEmitter.addListener(key, this.refresh);
  }

  componentWillUnmount() {
    // this.subscription.remove();
  }


  refresh = () => {
    this.refs['calendar'] && this.refs['calendar'].move()
  }

  render() {

    const { onPress, data } = this.props

    const busyDay = data.get('data').toJS()
    // console.log('busyDay:', busyDay);
    const load = data.get('load')


    return (
      <Calendar
        color={this.props.color}
        ref={'calendar'}
        date={new Date()}
        load={load}
        fetchData={onPress}
        busyDay={busyDay}
        move={this.props.load}/>
    );
  }


}


