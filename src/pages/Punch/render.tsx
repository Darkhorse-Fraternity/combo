/**
 * Created by lintong on 2017/7/3.
 * @flow
 */

import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  SectionList,
  SectionListData,
  StyleSheet,
  SectionListRenderItemInfo,
  NativeSyntheticEvent,
  NativeScrollEvent,
  DeviceEventEmitter,
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import { ICARD } from '../../redux/reqKeys';
// import { search, } from '../../redux/module/leancloud';
import ExceptionView, {
  ExceptionType,
} from '../../components/Base/ExceptionView/index';
// import { selfUser } from '../../request/LCModle';
import {
  StyledContent,
  StyledHeaderTitle,
  StyledSectionHeader,
  StyledSectionHeaderTitle,
  StyledCellMain,
} from './style';
import { strings } from '../../../locales/i18n';
import Item from './Item';
import rate from '../../../helps/rate';
import { PrivacyModal } from '@components/modal/privacy';
import { isLandscapeSync, isTablet } from 'react-native-device-info';
import Orientation from 'react-native-orientation';
import { RouteKey } from '@pages/interface';
import { GetClassesIUseIdResponse, postClassesIDo } from 'src/hooks/interface';
import { useNavigation } from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';

import { useGetUserInfo } from 'src/data/data-context';
import { useGetIuseData, useMutateIuseData } from 'src/data/data-context/core';
import { UserType } from 'src/data/data-context/interface';
import { point } from '@request/LCModle';
import { DeviceEventEmitterKey } from '@configure/enum';
import { SoundsKeys } from '@configure/source';

type ItemType = GetClassesIUseIdResponse & {
  satisfy?: boolean;
  unSatisfyDiscrib?: string;
  isFb?: boolean;
};

interface CellProps {
  iCard: ItemType['iCard'];
  iUse: ItemType;
  numColumns: number;
}

const RenderCell: FC<CellProps> = ({ iCard, iUse, numColumns }) => {
  // const showFB = iUse.isFb;
  const { isFb, unSatisfyDiscrib, time, satisfy, objectId } = iUse;
  const { update } = useMutateIuseData();
  const [load, setLoad] = useState(false);
  const done = moment(0, 'HH').isBefore(iUse.doneDate?.iso);
  const { iconAndColor = {}, sound, title, record, objectId: iCardId } = iCard;
  const { width, height } = Dimensions.get('window');
  const user = useGetUserInfo();
  const { navigate } = useNavigation();

  const doCard = async (doIt: () => void) => {
    doIt();
    setLoad(true);
    try {
      const { objectId: id, createdAt } = await postClassesIDo({
        user: point('_User', user?.objectId || ''),
        type: 0,
        iCard: point('iCard', iCardId),
        iUse: point('iUse', objectId),
        doneDate: { __type: 'Date', iso: new Date().toISOString() },
      });
      if (id && createdAt) {
        //直接更新 iUse 里面的doneDate 数据
        update({
          objectId,
          doneDate: { __type: 'Date', iso: moment(createdAt).toISOString() },
        });
      } else {
        doIt();
      }

      setLoad(false);
    } catch (error) {
      console.log('error', error);
      SimpleToast.show(error.message);
      doIt();
      setLoad(false);
    }
  };

  return (
    <Item
      numColumns={numColumns}
      showFB={isFb}
      openSound={sound?.open ?? false}
      soundsKey={sound?.item?.key as SoundsKeys}
      key={title}
      name={iconAndColor.name}
      scWidth={
        numColumns === 7 ? Math.max(width, height) : Math.min(width, height)
      }
      color={iconAndColor.color}
      done={done}
      title={title || ''}
      discrib={unSatisfyDiscrib || `第${time}日`}
      onPress={async (flip, doIt) => {
        // const iCardM = iCard.toJS()
        // 如果没有强制打卡类型，则直接翻转

        if (!flip && satisfy) {
          // record?.length === 0 && doIt();
          if (!load && !done) {
            if (record?.length === 0) {
              rate();
              //直接打卡
              doCard(doIt);
            } else {
              navigate(RouteKey.clockIn, { iUseId: objectId });
            }

            // await this.props.done(item);
          }
        } else {
          navigate('card', {
            iUseId: objectId,
            iCardId,
          });
        }
      }}
    />
  );
};

const iUseDataMap = (data: ItemType[], numColumns: number) => {
  const satisfy = [];
  const unSatisfy = [];
  const sections = [];
  if (data.length > 0) {
    for (let i = 0, j = data.length; i < j; i++) {
      const mData = data[i];
      const iCard = mData.iCard;
      // .get(mData.iCard)
      // .toJS() as GetClassesICardIdResponse;
      const week = new Date().getDay() === 0 ? 7 : new Date().getDay();
      const recordDay = iCard.recordDay?.sort((a, b) => a - b);

      if (recordDay?.indexOf(week) !== -1) {
        const limitTimes = iCard.limitTimes || ['00:00', '24:00'];
        const before = moment(limitTimes[0], 'HH');
        const after = moment(limitTimes[1], 'HH');
        const now = moment(new Date());
        const momentIn = moment(now).isBetween(before, after);
        if (momentIn) {
          mData.satisfy = true;
          satisfy.push(mData);
        } else {
          mData.satisfy = false;
          if (now.isBefore(before)) {
            mData.unSatisfyDiscrib = limitTimes[0];
          } else if (now.isAfter(after)) {
            mData.unSatisfyDiscrib = `${limitTimes[1]}前`;
          }
          unSatisfy.push(mData);
        }
      } else {
        let unSatisfyDiscrib = '一周后';
        // 算出正向上满足条件的下一天
        const unSatisfyRecordDay = recordDay.filter((a) => a - week > 0);
        let nextDoDay = unSatisfyRecordDay[0];
        // 相差几天
        let days = nextDoDay - week;
        if (unSatisfyRecordDay.length === 0) {
          // 如果一周内没有大于当天的打卡要求，则必然在下周的第一个要求中
          nextDoDay = recordDay[0];
          days = nextDoDay + 7 - week;
        }

        if (days < 4) {
          unSatisfyDiscrib = ['明天', '后天', '大后天'][days - 1];
        } else {
          unSatisfyDiscrib = [
            '周一',
            '周二',
            '周三',
            '周四',
            '周五',
            '周六',
            '周天',
          ][nextDoDay - 1];
        }
        // 算出离今天最近的下一次打卡时间
        // console.log('week:', recordDay, week);

        mData.satisfy = false;
        // const fromNow = moment().to(moment().add(2, 'days'))
        mData.unSatisfyDiscrib = unSatisfyDiscrib;
        unSatisfy.push(mData);
      }
    }
    satisfy.length > 0 &&
      sections.push({
        title: unSatisfy.length > 0 ? '进行中' : '',
        data: _.chunk(satisfy, numColumns),
      });
    unSatisfy.length > 0 &&
      sections.push({
        title: '等待中',
        data: _.chunk(unSatisfy, numColumns),
      });
  }

  return sections;
};

interface PunchProps {
  numColumns: number;
  user: UserType;
  iUse: ItemType[];
  loading: boolean;
  onRefresh: () => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const PunchClass: FC<PunchProps> = (props): JSX.Element => {
  // const statu = this.props.data.get('loadStatu');

  const { iUse, numColumns, onScroll, onRefresh, loading } = props;

  const sections = useMemo(() => iUseDataMap(iUse, numColumns), [
    iUse,
    numColumns,
  ]);

  return (
    <SectionList
      refreshing={false}
      onScroll={onScroll}
      onRefresh={onRefresh}
      // data={data}
      sections={sections}
      // numColumns={numColumns}
      style={styles.list}
      renderSectionHeader={_renderSectionHeader}
      // removeClippedSubviews={true}
      // pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={(i) => renderItem(i, numColumns)}
      keyExtractor={_keyExtractor}
      ListHeaderComponent={renderHeader}
      // ListFooterComponent={
      //   data.length > 0 ? <View style={{ height: 120 }} /> : null
      // }
      ListEmptyComponent={
        <RenderNoData refreshLoad={loading} onRefresh={onRefresh} />
      }
    />
  );
};

const MemoPunchList = memo(PunchClass);

const renderItem = (
  data: SectionListRenderItemInfo<ItemType[], { title: string }>,
  numColumns: number,
) => {
  // return (<View/>)
  // const
  const views = data.item.map((itemIn) => {
    // const iCardId = item[ICARD];
    const iCard = itemIn[ICARD];

    return (
      <RenderCell
        key={itemIn.objectId}
        numColumns={numColumns}
        iUse={itemIn}
        iCard={iCard!}
      />
    );
  });

  return <StyledCellMain>{views}</StyledCellMain>;
};

const _keyExtractor = (item: ItemType[], index: number) => {
  const key = item[0].objectId || index;
  return `${key}`;
};

const renderHeader = () => (
  <StyledHeaderTitle>{strings('app.name')}</StyledHeaderTitle>
);

const _renderSectionHeader = (info: {
  section: SectionListData<ItemType[], { title: string }>;
}) => {
  // if (info.section.title.length === 0) {
  //   return <View style={{height: 30}} />;
  // }
  return (
    <StyledSectionHeader>
      <StyledSectionHeaderTitle numberOfLines={1}>
        {info.section.title}
      </StyledSectionHeaderTitle>
    </StyledSectionHeader>
  );
};

const RenderNoData: FC<{ refreshLoad: boolean; onRefresh: () => void }> = ({
  refreshLoad,
  onRefresh,
}) => {
  return (
    <ExceptionView
      style={{ height: Dimensions.get('window').height / 1.6 }}
      exceptionType={refreshLoad ? ExceptionType.Loading : ExceptionType.NoData}
      tipBtnText="重新加载"
      // prompt={refreshLoad ? '正在加载～' : '暂无数据~'}
      onRefresh={onRefresh}
    />
  );
};

const Punch: FC<{}> = () => {
  console.log('puch render');

  const [numColumns, setNumColumns] = useState(
    isTablet() ? (isLandscapeSync() ? 7 : 5) : 3,
  );
  const user = useGetUserInfo();
  const { objectId: uid } = user;
  const { data = [], loading, run } = useGetIuseData();

  const { setOptions } = useNavigation();
  // console.log('data',data?.result);

  const _orientationDidChange = (orientation: string) => {
    if (orientation === 'LANDSCAPE') {
      setNumColumns(7);
      // do something with landscape layout
    } else {
      setNumColumns(5);
      // do something with portrait layout
    }
  };

  useEffect(() => {
    isTablet() && Orientation.removeOrientationListener(_orientationDidChange);
    return () => {
      isTablet() &&
        Orientation.removeOrientationListener(_orientationDidChange);
    };
  }, []);

  //当切换用户的时候,发起请求
  const firstRef = useRef(true);
  useEffect(() => {
    if (uid && uid.length > 0 && !firstRef.current) {
      run();
    }
    firstRef.current = false;
  }, [run, uid]);

  useEffect(() => {
    const deEmitter = DeviceEventEmitter.addListener(
      DeviceEventEmitterKey.iUse_reload,
      run,
    );
    return () => {
      deEmitter.remove();
    };
  }, [run]);

  const openSmallTitleRef = useRef(false);
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      if (!openSmallTitleRef.current && y > 35) {
        openSmallTitleRef.current = true;
        setOptions({ title: '小改变' });
      }
      if (openSmallTitleRef.current && y < 35) {
        openSmallTitleRef.current = false;
        setOptions({ title: '' });
      }
    },
    [setOptions],
  );

  return (
    <StyledContent>
      <PrivacyModal />
      <MemoPunchList
        numColumns={numColumns}
        user={user}
        iUse={data as never}
        loading={loading}
        onRefresh={run}
        onScroll={onScroll}
      />
    </StyledContent>
  );
};

export default Punch;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
