/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import React, { FC, useEffect, useRef } from 'react';
import { Alert, DeviceEventEmitter, View } from 'react-native';

import moment from 'moment';
import {
  StyledInner,
  StyledTitleView,
  StyledTitleText,
  StyledRow,
  StyledRowText,
  StyledLogButton,
  StyledLogButtonText,
} from './style';

import { useNavigation } from '@react-navigation/native';
import { RouteKey } from '@pages/interface';
import {
  GetClassesIDoResponse,
  postClassesIDo,
  useGetClassesIDo,
} from 'src/hooks/interface';
import { useGetUserInfo } from 'src/data/data-context';
import SimpleToast from 'react-native-simple-toast';
import { iUsePoint, point, userPoint } from '@request/LCModle';
import { DeviceEventEmitterKey } from '@configure/enum';
import Calendar from '@components/Calendar';
import { IUseType } from 'src/data/data-context/interface';

type ItemType = GetClassesIDoResponse['results'][number];

// const calendParam = (
//   first: string,
//   last: string,
//   userId: string,
//   iUseId: string,
// ) => {
//   const param = {
//     where: {
//       user: userPoint(userId),
//       iUse: iUsePoint(iUseId),
//       $or: [
//         {
//           doneDate: {
//             $gte: { __type: 'Date', iso: `${first}T00:00:00.000Z` },
//             $lte: { __type: 'Date', iso: `${last}T24:00:00.000Z` },
//           },
//         },
//         {
//           createdAt: {
//             $gte: { __type: 'Date', iso: `${first}T00:00:00.000Z` },
//             $lte: { __type: 'Date', iso: `${last}T24:00:00.000Z` },
//           },
//         },
//       ],
//       state: { $ne: -1 },
//       type: { $ne: 1 }, // 0为打卡,1为日记,2为补打卡
//     },
//   };
//   // dispatch(req(params, IDOCALENDAR, {
//   //   dataMap: (datas) => {
//   //     // console.log('datas', datas);

//   //     datas.results.forEach((item) => {
//   //       const { createdAt, doneDate } = item;
//   //       const time = doneDate ? doneDate.iso : createdAt;
//   //       const date = moment(time).format('YYYY-MM-DD');
//   //       data[date] = item;
//   //     });

//   //     //  console.log('first:', first,datas,data);
//   //     return data;
//   //   }
//   // }));
// };
const retroactive = (
  item: string,
  activityEndDateISO: string,
  redo: number,
  clockin: (type: number, date?: Date) => void,
) => {
  // 补打卡
  // 判断卡片是否在活动中,判断是否有补签卡片

  try {
    // 只有自己可以补打卡

    // 活动截止时间
    const doMoment = moment(item);
    doMoment.set('hours', moment().hours());
    doMoment.set('minutes', moment().minutes());

    const activityMoment = activityEndDateISO
      ? moment(activityEndDateISO)
      : moment('2016-01-01');

    const isAfter = moment().isAfter(activityMoment);
    if (isAfter) {
      // 如果是今天则正常打卡
      const before = moment(0, 'HH').subtract(1, 'minutes');
      const after = moment(24, 'HH');
      const momentIn = doMoment.isBetween(before, after);
      if (momentIn) {
        // return dispatch(doCardWithNone(iUse));
        return clockin(0);
      }

      // 如果打卡的时间超过今天,则提示该时间还不允许打卡。

      if (doMoment.isAfter(before)) {
        SimpleToast.show('这个时间段还没有到~!');
        return;
      }

      if (redo > 0) {
        // 先获取那一天这个时候的moment
        // 以当天时间做打卡,并做特殊标记type=2。
        // 提示将消耗一张补签劵
        return Alert.alert(
          '是否进行补签?',
          `将消耗一张补签卡,补签卡数量:${redo}。`,
          [
            { text: '取消' },
            {
              text: '确定',
              onPress: () => {
                const doneDate = doMoment.toDate();
                clockin(2, doneDate);
                // dispatch(doCardWithNone(iUse, 2, doneDate));
              },
            },
          ],
        );

        // 扣去一个补签卡
        // toolConfig.redo = redo - 1;
        // dispatch(updateMeByParam({
        //   toolConfig
        // }));
      } else {
        // 补签卡数量不够去挑战一些活动吧。
        SimpleToast.show('亲,补签卡数量不够去挑战副本活动吧~!');
      }
    } else {
      SimpleToast.show('亲,卡片正在活动期间,不允许补打卡哦~!');
    }
  } catch (e) {
    console.log(e.messege);
    SimpleToast.show(e.messege);
  }
};

const RenderTitle: FC<{ title: string; des: string }> = ({ title, des }) => {
  return (
    <StyledRow>
      <StyledRowText>{`${title}:`}</StyledRowText>
      <View style={{ width: 20 }} />
      <StyledRowText style={{ minWidth: 100 }}>{des}</StyledRowText>
    </StyledRow>
  );
};

const LogButton: FC<{ color: string; iCardId: string; iUseId: string }> = ({
  iCardId,
  iUseId,
  color,
}) => {
  const { navigate } = useNavigation();
  return (
    <StyledLogButton
      color={color}
      onPress={() => {
        navigate(RouteKey.log, { iUseId, iCardId, color });
      }}>
      <StyledLogButtonText>查看日记</StyledLogButtonText>
    </StyledLogButton>
  );
};

interface StatisticalProps {
  iCard: IUseType['iCard'];
  iUse: IUseType;
  tabLabel?: string;
  userId?: string;
}

const Statistical: FC<StatisticalProps> = ({ iCard, iUse }) => {
  const user = useGetUserInfo();
  const { navigate } = useNavigation();
  const cardCreatedAt = moment(iCard.createdAt).format('YYYY-MM-DD');
  // const useCreatedAt = moment(iUse.createdAt).format("YYYY-MM-DD")
  const date1 = new Date();
  const date2 = new Date(iUse.createdAt);
  const date = (
    (date1.getTime() - date2.getTime()) /
    (24 * 60 * 60 * 1000)
  ).toFixed(1);

  const { time } = iUse;
  // moment.locale('zh-cn')
  const fromNow = moment(iUse.doneDate?.iso).fromNow();

  const isSelf = user?.objectId === iUse.user.objectId;

  const record = iCard.record || [];
  const color = iCard.iconAndColor?.color || 'grey';
  const { activityEndDate } = iCard;
  const { toolConfig } = user || {};
  const iUseId = iUse.objectId;
  const iCardId = iCard.objectId;

  const { data } = useGetClassesIDo({
    count: '1',
    limit: '0',
    where: JSON.stringify({
      user: userPoint(iUse.user?.objectId || ''), //粉丝查看也是这个入口，此时userid 不为自己
      iUse: iUsePoint(iUseId),
      $or: [{ imgs: { $exists: true } }, { recordText: { $exists: true } }],
      state: { $ne: -1 },
    }),
  });

  //本月的打卡记录
  {
    /* datas.results.forEach((item) => {
              const { createdAt, doneDate } = item;
              const time = doneDate ? doneDate.iso : createdAt;
              const date = moment(time).format('YYYY-MM-DD');
              data[date] = item;
            }); */
  }

  const { data: calendarData, run, loading } = useGetClassesIDo<
    Record<string, ItemType>
  >((item) => item, {
    manual: true,
    formatResult: (res) => {
      const data = {};
      res.results.forEach((item) => {
        const { createdAt, doneDate } = item;
        const time = doneDate ? doneDate.iso : createdAt;
        const date = moment(time).format('YYYY-MM-DD');
        data[date] = item;
      });

      return data;
    },
  });
  // const { count } = data;

  const ref = useRef<Calendar<ItemType>>(null);
  useEffect(() => {
    const lesten = DeviceEventEmitter.addListener(
      DeviceEventEmitterKey.iDO_reload,
      () => {
        ref?.current?.move();
        // console.log('ref?.current', ref?.current);
      },
    );
    ref?.current?.move();
    return () => {
      lesten.remove();
    };
  }, []);
  const selectDay = (item: string) =>
    isSelf &&
    retroactive(
      item || '',
      activityEndDate?.iso || '',
      toolConfig?.redo || 0,
      async (type, date) => {
        if (type === 0) {
          //需要判断是否在打卡时间内。 是否已经打卡
          const limitTimes = iCard.limitTimes || ['00:00', '24:00'];
          const before = moment(limitTimes[0], 'HH');
          const after = moment(limitTimes[1], 'HH');
          const now = moment(new Date());
          const momentIn = moment(now).isBetween(before, after);
          if (!momentIn) {
            SimpleToast.showWithGravity(
              '你好，我还没有到打卡时间!～',
              2,
              SimpleToast.CENTER,
            );
            return;
          }
        }

        const iso = date && date.toISOString();

        if (record.length > 0) {
          navigate(RouteKey.clockIn, { iUseId, doneDateIso: iso });
        } else {
          const { objectId } = await postClassesIDo({
            user: point('_User', user?.objectId || ''),
            type: 0,
            iCard: point('iCard', iCardId),
            iUse: point('iUse', iUseId),
            doneDate: { __type: 'Date', iso: iso || new Date().toISOString() },
          });
          if (objectId) {
            DeviceEventEmitter.emit(DeviceEventEmitterKey.iDO_reload, {});
            //只有当今天的时候才刷新。
            if (!iso) {
              DeviceEventEmitter.emit(DeviceEventEmitterKey.iUse_reload, {});
            }
          }
        }
      },
    );

  const canceDay = (item: ItemType) => {
    navigate(RouteKey.rcomment, { iDoID: item.objectId });
  };

  return (
    <StyledInner>
      <Calendar<ItemType>
        color={color}
        ref={ref}
        date={new Date()}
        load={loading}
        canceDay={canceDay} // 取消点击日打卡
        doneDay={selectDay} // 点击特定日
        busyDay={calendarData} // 全部数据
        move={(first, last) => {
          // 加载本月数据
          const where = {
            user: userPoint(iUse.user?.objectId || ''), //粉丝查看也是这个入口，此时userid 不为自己
            iUse: iUsePoint(iUseId),
            $or: [
              {
                doneDate: {
                  $gte: { __type: 'Date', iso: `${first}T00:00:00.000Z` },
                  $lte: { __type: 'Date', iso: `${last}T24:00:00.000Z` },
                },
              },
              {
                createdAt: {
                  $gte: { __type: 'Date', iso: `${first}T00:00:00.000Z` },
                  $lte: { __type: 'Date', iso: `${last}T24:00:00.000Z` },
                },
              },
            ],
            state: { $ne: -1 },
            type: { $ne: 1 }, // 0为打卡,1为日记,2为补打卡
          };
          // run({where:j})
          run({ where: JSON.stringify(where), limit: '31' });
        }}
      />
      <StyledTitleView>
        <StyledTitleText>习惯统计</StyledTitleText>
      </StyledTitleView>
      <View style={{ height: 10 }} />
      {/* {this._renderRow('已完成周期', `${(time / iCard.period).toFixed(2)}轮`)} */}
      <RenderTitle title={'总打卡天数'} des={`${time}日`} />
      <RenderTitle title={'上次打卡'} des={fromNow} />
      <RenderTitle title={'加入天数'} des={`${date}天`} />
      <RenderTitle title={'建立日期'} des={cardCreatedAt} />
      {isSelf && data?.count! > 0 && (
        <LogButton
          color={color}
          iCardId={iCard.objectId}
          iUseId={iUse.objectId}
        />
      )}
    </StyledInner>
  );
};

export default Statistical;
