/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import React, { FC } from "react";
import { View } from "react-native";

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
import { GetClassesICardIdResponse, GetClassesIUseIdResponse } from 'src/hooks/interface';
import { useGetUserInfo } from 'src/data/data-context';



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
    const fromNow = moment(iUse.doneDate.iso).fromNow();


    //Warnming 老代码这边是string;
    const isSelf = user?.objectId === (iUse.user as string);

    const record = iCard.record || []
    const color = iCard.iconAndColor?.color || 'grey';
    return (<StyledInner >
      <AgendaScreen
        color={color}
        iCard={iCard}
        iUse={iUse}
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