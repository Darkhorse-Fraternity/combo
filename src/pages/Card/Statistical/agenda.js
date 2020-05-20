import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { connect } from 'react-redux';


import moment from 'moment';
// import { withTheme } from 'styled-components';
import { classSearch } from '../../../request/leanCloud';
// import {addListNormalizrEntity} from '../../../redux/actions/list'
import { IDO, IDOCALENDAR } from '../../../redux/reqKeys';
// import {IRECORD, ICARD,IUSE} from '../../../redux/reqKeys'
import { user, iUse } from '../../../request/LCModle';
import { req, clear } from '../../../redux/actions/req';

import Calendar from '../../../components/Calendar';

import {
  StyledAgendaRow
} from './style';


@connect(
  state => ({
    data: state.req.get(IDOCALENDAR)
  }),
  (dispatch, props) => ({
    load: (first, last) => {
      // 获取iDo
      dispatch((dispatch, getState) => {
        const state = getState();
        const data = state.req.get(IDOCALENDAR).get('data').toJS();

        const { iUseId } = props.route.params;
        
        const userId = props.iUse.get('user');
        // console.log('last', last);

        const param = {
          where: {
            ...user(userId),
            ...iUse(iUseId),
            $or: [{
              doneDate: {
                $gte: { __type: 'Date', iso: `${first}T00:00:00.000Z` },
                $lte: { __type: 'Date', iso: `${last}T24:00:00.000Z` },
              },
            }, {
              createdAt: {
                $gte: { __type: 'Date', iso: `${first}T00:00:00.000Z` },
                $lte: { __type: 'Date', iso: `${last}T24:00:00.000Z` },
              },
            },

            ],
            state: { $ne: -1 },
            type: { $ne: 1 }, // 0为打卡,1为日记,2为补打卡
          }
        };
        const params = classSearch(IDO, param);
        dispatch(req(params, IDOCALENDAR, {
          dataMap: (datas) => {
            // console.log('datas', datas);

            datas.results.forEach((item) => {
              const { createdAt, doneDate } = item;
              const time = doneDate ? doneDate.iso : createdAt;
              const date = moment(time).format('YYYY-MM-DD');
              data[date] = item;
            });

            //  console.log('first:', first,datas,data);
            return data;
          }
        }));
      });
    },
    clear: () => dispatch(clear(IDOCALENDAR)),
  })
)

// @withTheme
export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.props.clear();
    this.state = {};
  }


  componentDidMount() {
    this.refresh();
    // const key = 'done_' + this.props.iCard.get('objectId')
    // this.subscription =
    //     DeviceEventEmitter.addListener(key, this.refresh);
  }

  componentWillUnmount() {
    // this.subscription.remove();
  }


  refresh = () => {
    this.refs.calendar && this.refs.calendar.move();
  }

  render() {
    const { onPress, data, selectDay } = this.props;

    const busyDay = data.get('data').toJS();
    // console.log('busyDay:', busyDay);
    const load = data.get('load');


    return (
      <Calendar
        color={this.props.color}
        ref="calendar"
        date={new Date()}
        load={load}
        fetchData={onPress}
        selectDay={selectDay}
        busyDay={busyDay}
        move={this.props.load}
      />
    );
  }
}
