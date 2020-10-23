/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import React, { FC, useEffect, useRef } from "react";
import { Alert, DeviceEventEmitter, View } from "react-native";

import moment from "moment";
import {
  StyledInner,
  StyledTitleView,
  StyledTitleText,
  StyledRow,
  StyledRowText,
  StyledLogButton,
  StyledLogButtonText,

} from "./style";

import AgendaScreen from "./agenda";
import { useNavigation } from '@react-navigation/native';
import { RouteKey } from '@pages/interface';
import { GetClassesICardIdResponse, GetClassesIUseIdResponse, postClassesIDo, useGetClassesIDo } from 'src/hooks/interface';
import { useGetUserInfo } from 'src/data/data-context';
import SimpleToast from 'react-native-simple-toast';
import { point } from '@request/LCModle';
import { iUse as iUseM, user as userM } from '@request/LCModle';
import { DeviceEventEmitterKey } from '@configure/enum';

const retroactive = (
  item: any,
  activityEndDateISO: string,
  redo: number,
  clockin: (type: number, date?: Date) => void
) => {
  // 补打卡
  // 判断卡片是否在活动中,判断是否有补签卡片

  try {
    // 只有自己可以补打卡

    // 活动截止时间
    const doMoment = moment(item);
    doMoment.set("hours", moment().hours());
    doMoment.set("minutes", moment().minutes());

    const activityMoment = activityEndDateISO
      ? moment(activityEndDateISO)
      : moment("2016-01-01");

    const isAfter = moment().isAfter(activityMoment);

    if (isAfter) {

      // 如果是今天则正常打卡
      const before = moment(0, "HH").subtract(1, "minutes");
      const after = moment(24, "HH");
      const momentIn = doMoment.isBetween(before, after);

      if (momentIn) {
        // return dispatch(doCardWithNone(iUse));
        clockin(0);
      }

      // 如果打卡的时间超过今天,则提示该时间还不允许打卡。

      if (doMoment.isAfter(before)) {
        SimpleToast.show("这个时间段还没有到~!");
        return;
      }

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
                clockin(2, doneDate);
                // dispatch(doCardWithNone(iUse, 2, doneDate));
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
}




const RenderTitle: FC<{ title: string, des: string }> = ({ title, des }) => {

  return (
    <StyledRow>
      <StyledRowText>{`${title}:`}</StyledRowText>
      <View style={{ width: 20 }} />
      <StyledRowText>{des}</StyledRowText>
    </StyledRow>
  )
};

const LogButton: FC<{ color: string, iCardId: string, iUseId: string }> =
  ({ iCardId, iUseId, color, ...other }) => {
    const { navigate } = useNavigation();
    return (<StyledLogButton color={color} onPress={() => {
      navigate(RouteKey.log, { iUseId, iCardId, color })
    }}>
      <StyledLogButtonText>
        查看日记
    </StyledLogButtonText>
    </StyledLogButton>

    )
  }

interface StatisticalProps {
  iCard: GetClassesICardIdResponse,
  iUse: GetClassesIUseIdResponse,
  tabLabel?: string,
}

const Statistical: FC<StatisticalProps> =
  ({ iCard, iUse, ...other }) => {


    const user = useGetUserInfo();
    const { navigate } = useNavigation()
    const cardCreatedAt = moment(iCard.createdAt).format("YYYY-MM-DD");
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

    const record = iCard.record || []
    const color = iCard.iconAndColor?.color || 'grey';
    const { activityEndDate } = iCard;
    const { toolConfig } = user || {};
    const iUseId = iUse.objectId;
    const iCardId = iCard.objectId;

    const { data } = useGetClassesIDo({
      count: '1', limit: '1', where: JSON.stringify({
        ...userM(user?.objectId || ''),
        ...iUseM(iUseId),
        $or: [{ imgs: { $exists: true } }, { recordText: { $exists: true } }],
        state: { $ne: -1 },
      })
    });
    // const { count } = data;

    const ref = useRef<AgendaScreen>(null);
    useEffect(() => {
      const lesten = DeviceEventEmitter.addListener(DeviceEventEmitterKey.iDO_Reload, () => {
        ref.current?.refresh();
      })
      return () => {
        lesten.remove()
      }
    }, [])

    return (<StyledInner >
      <AgendaScreen
        user={user}
        ref={ref}
        iUse={iUse}
        color={color}
        isSelf={isSelf}
        iUseId={iUseId}
        iCardId={iCardId}
        onPress={(item) => isSelf &&
          retroactive(
            item,
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
                  SimpleToast.showWithGravity('你好，我还没有到打卡时间!～', 2, SimpleToast.CENTER)
                  return;
                }
              }

              const iso = date && date.toISOString()

              if (record.length > 0) {
                navigate(RouteKey.clockIn, { iUseId, doneDateIso: iso })
              } else {
                const { objectId: id } = await postClassesIDo({
                  user: point('_User', user?.objectId || ''),
                  type: 0,
                  iCard: point('iCard', iCardId),
                  iUse: point('iUse', iUseId),
                  doneDate: { "__type": "Date", iso: iso || new Date().toISOString() },
                })
                if (id) {
                  DeviceEventEmitter.emit(DeviceEventEmitterKey.iDO_Reload, {});
                }
              }
            })}
        {...other}
      // selectDay={(item) => this.props.retroactive(item, iCard, iUse)}
      // onPress={(item) => {
      //   this.props.iDoDelete(item, user);
      // }}
      />
      <StyledTitleView>
        <StyledTitleText>习惯统计</StyledTitleText>
      </StyledTitleView>
      <View style={{ height: 10 }} />
      {/* {this._renderRow('已完成周期', `${(time / iCard.period).toFixed(2)}轮`)} */}
      <RenderTitle title={"总打卡天数"} des={`${time}日`} />
      <RenderTitle title={'上次打卡'} des={fromNow} />
      <RenderTitle title={"加入天数"} des={`${date}天`} />
      <RenderTitle title={"建立日期"} des={cardCreatedAt} />
      {isSelf && record.length > 0 && <LogButton
        color={color}
        iCardId={iCard.objectId}
        iUseId={iUse.objectId} />}
    </StyledInner>)
  }

export default Statistical