import React, { PureComponent } from 'react';
import {
} from 'react-native';
import { connect } from 'react-redux';

import { IDO, IUSE, IDOCALENDAR } from "../../../redux/reqKeys";
import { updateByID } from "../../../redux/module/leancloud";
import { reqChangeData } from "../../../redux/actions/req";
import { addNormalizrEntity } from "../../../redux/module/normalizr";
import doCardWithNone from "../../../components/DoCard/doCardWithNone";

import moment from 'moment';
import { classSearch } from '../../../request/leanCloud';
import { user, iUse } from '../../../request/LCModle';
import { req, clear } from '../../../redux/actions/req';

import Calendar from '../../../components/Calendar';





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

        const userId = props.iUse.user;
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
    iDoDelete: async (item, user) => {
      const isDiary =
        (item.imgs && item.imgs.length > 0) ||
        (item.recordText && item.recordText.length > 0);
      if (isDiary) {
        props.navigation.navigate("rcomment", {
          iDoID: item.objectId,
          iUseId: props.iUse.get("objectId"),
          iCardId: props.iCard.get("objectId"),
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
              const iUse = props.iUse.toJS();
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
    retroactive: (item, iCard, iUse) => {
      dispatch(async (dispatch, getState) => {
        // 补打卡
        // 判断卡片是否在活动中,判断是否有补签卡片
        try {
          // 只有自己可以补打卡
          const state = getState();
          const user = state.user.data;
          const { toolConfig, objectId } = user;
          if (objectId !== iUse.user) {
            return;
          }

          // 活动截止时间
          const doMoment = moment(item);
          const { activityEndDate } = iCard;
          doMoment.set("hours", moment().hours());
          doMoment.set("minutes", moment().minutes());

          const activityMoment = activityEndDate
            ? moment(activityEndDate.iso || activityEndDate)
            : moment("2016-01-01");

          const isAfter = moment().isAfter(activityMoment);

          if (isAfter) {
            // 如果是今天则正常打卡
            const before = moment(0, "HH").subtract(1, "minutes");
            const after = moment(24, "HH");
            const momentIn = doMoment.isBetween(before, after);

            if (momentIn) {
              return dispatch(doCardWithNone(iUse));
            }

            // 如果打卡的时间超过今天,则提示该时间还不允许打卡。

            if (doMoment.isAfter(before)) {
              SimpleToast.show("这个时间段还没有到~!");
              return;
            }

            const { redo } = toolConfig;
            if (redo > 0) {
              // 先获取那一天这个时候的moment
              // 以当天时间做打卡,并做特殊标记type=2。
              // 提示将消耗一张补签劵
              Alert.alert(
                "是否进行补签?",
                `将消耗一张补签卡,补签卡数量:${redo}。`,
                [
                  { text: "取消" },
                  {
                    text: "确定",
                    onPress: () => {
                      const doneDate = doMoment.toDate();
                      dispatch(doCardWithNone(iUse, 2, doneDate));
                    },
                  },
                ]
              );

              // 扣去一个补签卡
              // toolConfig.redo = redo - 1;
              // dispatch(updateMeByParam({
              //   toolConfig
              // }));
            } else {
              // 补签卡数量不够去挑战一些活动吧。
              SimpleToast.show("亲,补签卡数量不够去挑战副本活动吧~!");
            }
          } else {
            SimpleToast.show("亲,卡片正在活动期间,不允许补打卡哦~!");
          }
        } catch (e) {
          console.log(e.messege);
          SimpleToast.show(e.messege);
        }
      });
    },
  })
)

// @withTheme
export default class AgendaScreen extends PureComponent {
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
    const { onPress, data, iCard, iUse } = this.props;

    const busyDay = data.get('data').toJS();
    // console.log('busyDay:', busyDay);
    const load = data.get('load');


    return (
      <Calendar
        color={this.props.color}
        ref={ref => this.calendar = ref}
        date={new Date()}
        load={load}
        fetchData={(item) => {
          this.props.iDoDelete(item, user);
        }}
        selectDay={(item) => this.props.retroactive(item, iCard, iUse)}
        busyDay={busyDay}
        move={this.props.load}
      />
    );
  }
}
