import React, { PureComponent } from 'react';
import {
  Alert
} from 'react-native';
import { connect } from 'react-redux';

import { IDO, IUSE, IDOCALENDAR } from "../../../redux/reqKeys";
import { updateByID } from "../../../redux/module/leancloud";
import { reqChangeData } from "../../../redux/actions/req";
import { addNormalizrEntity } from "../../../redux/module/normalizr";
import doCardWithNone from "../../../components/DoCard/doCardWithNone";

import moment from 'moment';
import { classSearch } from '../../../request/leanCloud';
import { user as UserM, iUse as iUseM } from '../../../request/LCModle';
import { req, clear } from '../../../redux/actions/req';

import Calendar from '../../../components/Calendar';

import SimpleToast from 'react-native-simple-toast'



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

        const userId = props.user.objectId;
        // console.log('last', last);

        const param = {
          where: {
            ...UserM(userId),
            ...iUseM(iUseId),
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
    iDoDelete: async (item, user) => {
      const isDiary =
        (item.imgs && item.imgs.length > 0) ||
        (item.recordText && item.recordText.length > 0);

      console.log('user.objectId === item.user.objectId', user);

      if (isDiary) {
        props.navigation.navigate("rcomment", {
          iDoID: item.objectId,
          iUseId: props.iUseId,
          iCardId: props.iCardId,
        });
      } else if (user.objectId === item.user.objectId) {
        // 取消打卡
        // console.log('item:', item);

        Alert.alert("删除打卡记录?", "删除后不可恢复", [
          { text: "取消" },
          {
            text: "确定",
            onPress: async () => {
              const { createdAt, type, doneDate } = item;
              const time = doneDate ? doneDate.iso : createdAt;
              const iDoID = item.objectId;
              const param = { state: -1 };
              const res = await dispatch(updateByID(IDO, iDoID, param));
              const entity = {
                ...param,
                ...res,
              };
              dispatch(addNormalizrEntity(IDO, entity));
              const date = moment(time).format("YYYY-MM-DD");
              dispatch(
                reqChangeData(IDOCALENDAR, {
                  [date]: null,
                })
              );

              // type === 1 为日记，不记录打卡次数
              if (type === 1) {
                return;
              }
              // 打卡次数也需要修改。
              const iUse = props.iUse;
              const paramiUSE = { time: iUse.time - 1 };
              const before = moment(0, "HH");
              const after = moment(24, "HH");

              const momentIn = moment(time).isBetween(before, after);
              // console.log('momentIn:', momentIn);
              if (momentIn) {
                paramiUSE.doneDate = {
                  __type: "Date",
                  iso: moment(time)
                    .subtract(1, "day")
                    .toISOString(),
                };
              }
              const entityiUse = {
                ...paramiUSE,
                objectId: item.iUse.objectId,
              };
              dispatch(addNormalizrEntity(IUSE, entityiUse));
            },
          },
        ]);
      }
    },
  })
)

// @withTheme
export default class AgendaScreen extends PureComponent<{ color: string, isSelf: boolean, onPress: (item: any) => void }> {
  constructor(props) {
    super(props);
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
    this.calendar && this.calendar.move();
  }

  render() {
    const { onPress, data, isSelf, color, user } = this.props;

    const busyDay = data.get('data').toJS();
    // console.log('busyDay:', busyDay);
    const load = data.get('load');


    return (
      <Calendar
        color={color}
        ref={ref => this.calendar = ref}
        date={new Date()}
        load={load}
        fetchData={(item) => {
          isSelf && this.props.iDoDelete(item, user);
        }}
        selectDay={onPress}
        busyDay={busyDay}
        move={this.props.load}
      />
    );
  }
}
