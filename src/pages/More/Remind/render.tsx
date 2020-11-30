/**
 * Created by lintong on 2018/9/22.
 * @flow
 */

import React, { FC, PureComponent } from 'react';
import { Platform, FlatList } from 'react-native';

import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import svgs from '../../../../source/icons';
import AppleStyleSwipeableRow from '../../../components/Swipeable';

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
  StyledDeleteBtnText,
  StyledIconImage,
  StyledAntDesign,
  StyledTips,
} from './style';
import { shadeBlend } from '../../../../helps/util';
import AnimationRow from '../../../components/AnimationRow';
import { useGetUserInfo } from 'src/data/data-context';
import { remind, RemindDataType, useLoadlocalRemind } from '@configure/app';
import { IUseType, UserType } from 'src/data/data-context/interface';
import { useGetIuseData, useMutateICardData } from 'src/data/data-context/core';
import {
  PutClassesICardIdRequest,
  usePutClassesICardId,
} from 'src/hooks/interface';

// const interactionManagerDelay = () =>
//   new Promise((resolve) => InteractionManager.runAfterInteractions(resolve));

export const Days = ['一', '二', '三', '四', '五', '六', '天'];
export const daysText = (recordDay: number[]) => {
  const days = recordDay.sort();
  // console.log('days:', days);
  if (days.length === 0) {
    return '无';
  }
  if (days.length === 7) {
    return '每天';
  }
  if (days.length === 2 && days[0] === 6) {
    return '周六与周日';
  }
  if (days.length === 5 && days[4] === 5) {
    return '周一至周五';
  }
  return `逢周 ${days.map((day) => `${Days[day - 1]} `).toString()}`;
};

function PrefixInteger(num: number, length: number) {
  return (Array(length).join('0') + num).slice(-length);
}

interface RemindClassProps {
  selfUser: UserType;
  localRemindData: RemindDataType;
  iUses: IUseType[];
  refresh: (p: Partial<PutClassesICardIdRequest>) => Promise<{}>;
}

type ItemType = IUseType & { notifyTime: string };

interface RemindClassState {
  isDateTimePickerVisible: boolean;
  time: string;
  selectItem: ItemType | null;
  openIndex: number;
}

// @connect(
//   (state) => ({}),
//   (dispatch) => ({
//     // refresh: async (notifyTimes, iCard) =>
//     //   dispatch(async (dispatch, getState) => {
//     //     {
//     //       const id = iCard.objectId;

//     //       notifyTimes = notifyTimes.sort(
//     //         (a, b) => moment(a, 'HH:mm') - moment(b, 'HH:mm'),
//     //       );

//     //       const param = {
//     //         notifyTimes,
//     //       };

//     //       const res = await dispatch(update(id, param, ICARD));

//     //       const entity = {
//     //         ...param,
//     //         ...res,
//     //       };
//     //       return dispatch(addNormalizrEntity(ICARD, entity));
//     //       // Toast.show('修改配置成功~!')
//     //     }
//     //   }),
//     deleteRow: async (notifyTime, iCard, handleView) =>
//       dispatch(async (dispatch) => {
//         {
//           const id = iCard.objectId;

//           const index = iCard.notifyTimes.indexOf(notifyTime);
//           if (index > -1) {
//             iCard.notifyTimes.splice(index, 1);
//           }
//           const { notifyTimes } = iCard;

//           const param = {
//             notifyTimes,
//           };

//           const res = await dispatch(update(id, param, ICARD));

//           const entity = {
//             ...param,
//             ...res,
//           };

//           handleView && (await handleView.remove());
//           await dispatch(addNormalizrEntity(ICARD, entity));
//           handleView && (await handleView.reset());

//           return res;
//           // Toast.show('修改配置成功~!')
//         }
//       }),
//   }),
// )
class RemindClass extends PureComponent<RemindClassProps, RemindClassState> {
  constructor(props: RemindClassProps) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      time: '00:00',
      selectItem: null,
      openIndex: -1,
    };
  }

  _deleteRow = async (item: ItemType, index: number) => {
    const handleView = this.handleViewRef[`habit${index}`];
    const { iCard, notifyTime } = item;
    const { selfUser, refresh } = this.props;

    if (iCard.user.objectId === selfUser.objectId) {
      handleView && (await handleView.remove());
      // await dispatch(addNormalizrEntity(ICARD, entity));
      // await deleteRow(notifyTime, iCard, handleView);
      const { notifyTimes = [] } = iCard;
      const index1 = notifyTimes.indexOf(notifyTime);
      if (index1 > -1) {
        notifyTimes.splice(index1, 1);
      }
      await refresh({ id: iCard.objectId, notifyTimes });
      handleView && (await handleView.reset());
    } else {
      Toast.show('共享卡片,只有卡片拥有有权限删除哦~!');
    }
  };

  handleViewRef = {};

  swipeRefs = {};

  _renderRow = ({ item, index }: { item: ItemType; index: number }) => {
    // console.log('test:', item);
    const { iCard, notifyTime, objectId } = item;

    const { localRemindData } = this.props;
    // const value =  await  storage.load({
    //    key: "localRemind",
    //    id:item.objectId+item.notifyTime,
    //  }
    const id = objectId + notifyTime;
    let value = localRemindData[id] ?? true;
    const { iconAndColor, title, recordDay = [] } = iCard;
    const { color, name = '' } = iconAndColor || {
      name: 'sun',
      color: '#b0d2ee',
    };
    const propsColor =
      Platform.OS === 'ios'
        ? {
            trackColor: { false: color, true: color },
          }
        : {
            thumbColor: value ? color : '#f6f7f9',
            trackColor: { true: shadeBlend(0.75, color || '') },
          };

    return (
      <AnimationRow ref={(res) => (this.handleViewRef[`habit${index}`] = res)}>
        <AppleStyleSwipeableRow
          ref={(ref) => {
            this.swipeRefs[`swipe${index}`] = ref;
          }}
          // backgroundColor="white"
          onSwipeableWillOpen={() => {
            const { openIndex } = this.state;
            if (index === openIndex) {
              return;
            }
            if (openIndex !== -1) {
              const swipeRef = this.swipeRefs[`swipe${openIndex}`];
              swipeRef && swipeRef.close();
            }
            this.setState({ openIndex: index });
          }}
          onSwipeableWillClose={() => {
            // rowId === this.state.openIndex &&
            if (index === this.state.openIndex) {
              this.setState({ openIndex: -1 });
            }
          }}
          right={[
            {
              type: 'delete',
              onPress: () => {
                this._deleteRow(item, index);
                // this.setState({ openIndex: -1 })
              },
              component: <RenderSwipeOutDeleteBtn />,
              backgroundColor: '#f6f7f9',
            },
          ]}>
          <StyledButton
            hitSlop={{
              top: 0,
              right: -100,
              bottom: 0,
              left: 0,
            }}
            activeOpacity={1}
            onPress={() => {
              const { selfUser } = this.props;
              if (iCard.user.objectId === selfUser.objectId) {
                this.setState({
                  isDateTimePickerVisible: true,
                  time: notifyTime,
                  selectItem: item,
                });
              } else {
                Toast.show('追随他人习惯,只有自己的卡片有权限修改哦~!');
              }
            }}>
            <StyledRowInner>
              <StyledLine />
              <StyledRound />
              <StyledTime>{notifyTime}</StyledTime>
              <StyledIconView color="#f6f7f9">
                <StyledIconImage
                  size={25}
                  source={svgs[name]}
                  resizeMode="contain"
                />
              </StyledIconView>
              <StyledRowDis>
                <StyledName numberOfLines={2}>{title}</StyledName>
                <StyledDays>{daysText(recordDay)}</StyledDays>
              </StyledRowDis>
            </StyledRowInner>
            <StyledSwitch
              {...(propsColor as never)}
              onValueChange={(value1) => {
                remind(id, value1);
              }}
              value={value}
            />
          </StyledButton>
        </AppleStyleSwipeableRow>
      </AnimationRow>
    );
  };

  _handleDatePicked = async (date: Date) => {
    this.setState({ isDateTimePickerVisible: false });

    // await interactionManagerDelay()
    // InteractionManager.runAfterInteractions( () => {
    // ...耗时较长的同步的任务...
    const hours = PrefixInteger(date.getHours(), 2);
    const minutes = PrefixInteger(date.getMinutes(), 2);
    const time = `${hours}:${minutes}`;
    const { selectItem } = this.state;
    const { selfUser, refresh } = this.props;
    const { iCard, notifyTime } = selectItem!;
    if (iCard.user.objectId === selfUser.objectId) {
      const index = iCard.notifyTimes?.indexOf(notifyTime) ?? -1;
      if (index > -1) {
        iCard.notifyTimes?.splice(index, 1);
      }
      const notifyTimes = [time, ...(iCard.notifyTimes || [])].sort((a, b) =>
        moment(a, 'HH:mm').isAfter(moment(b, 'HH:mm')) ? 1 : -1,
      );
      refresh({ id: iCard.objectId, notifyTimes });
    } else {
      Toast.show('共享卡片,只有卡片拥有有权限修改哦~!');
    }
    // });

    // this.onChange(time)
    //
    // this.onChange = null
  };

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  render() {
    let { iUses, localRemindData } = this.props;

    const id = 'all';
    //当为ios 时 默认打开
    let value = localRemindData[id] ?? Platform.OS === 'ios';
    // if (value === undefined) {
    //   value = true;
    // }

    const newData: ItemType[] = [];
    if (value) {
      iUses.forEach((iUse) => {
        const { statu, iCard } = iUse;
        if (statu === 'start') {
          const { notifyTimes } = iCard;
          // if(iUse.)

          notifyTimes &&
            notifyTimes.forEach((notifyTime) => {
              const newUse = { ...iUse, notifyTime };
              newData.push(newUse);
            });
        }
      });
      newData.sort((a, b) =>
        moment(a.notifyTime, 'HH:mm').isAfter(moment(b.notifyTime, 'HH:mm'))
          ? 1
          : -1,
      );
    }

    // .filter(item => item.statu === 'start')

    // .sort(item => item.iCard.notifyTime)

    return (
      <>
        <FlatList<ItemType>
          scrollEnabled={this.state.openIndex === -1}
          data={newData}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderRow}
          keyExtractor={_keyExtractor}
          ListHeaderComponent={
            <ListHeaderComponent
              id={id}
              value={value}
              hasData={newData.length > 0}
            />
          }
          ListFooterComponent={() => <NoticeTip />}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode="time"
          // textColor={'red'}
          display="spinner"
          cancelTextIOS="取消"
          headerTextIOS="修改提醒时间"
          // date={moment(this.state.time, 'HH:mm').toDate()}
          confirmTextIOS="确定"
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </>
    );
  }
}

const RenderSwipeOutDeleteBtn = () => (
  <StyledDeleteBtn>
    <StyledAntDesign size={25} color="red" name="delete" />
    <StyledDeleteBtnText>删除</StyledDeleteBtnText>
  </StyledDeleteBtn>
);

const _keyExtractor = (item: ItemType, index: number) => {
  const key = item.objectId + item.notifyTime || index;
  return `${key}`;
};

const RenderHeader = () => (
  <StyledHeader>
    <StyledHeaderTitle>提醒时间线</StyledHeaderTitle>
  </StyledHeader>
);

const ListHeaderComponent: FC<{
  id: string;
  value: boolean;
  hasData: boolean;
}> = ({ id, value, hasData }) => {
  const propsColor =
    Platform.OS === 'ios'
      ? {
          trackColor: { false: '#39ba98', true: '#39ba98' },
        }
      : {
          thumbColor: value ? '#f6d971' : '#f6f7f9',
          // trackColor:{true: '#f6f7f9'},
          trackColor: { true: shadeBlend(0.5, '#f6d971') },
        };

  return (
    <>
      <RenderHeader />
      <StyledSubTitle>
        <StyledRowInner>
          <StyledIcon size={30} name="alarm-on" />
          <StyledSubTitleText>
            开启{Platform.OS === 'ios' ? '习惯' : '日历'}提醒
          </StyledSubTitleText>
        </StyledRowInner>
        <StyledSwitch
          {...(propsColor as any)}
          value={value}
          onValueChange={async (value1) => {
            remind(id, value1);
          }}
        />
      </StyledSubTitle>
      {hasData && <StyledLine style={{ height: 15, marginLeft: 35 }} />}
    </>
  );
};

export const NoticeTip = () => {
  if (Platform.OS === 'android') {
    return (
      <StyledTips>
        注意：{'\n'}
        开启日历通知,{'\n'}
        如果在删除本app前未关闭通知，{'\n'}
        需手动打开系统日历,{'\n'}
        删除所有重复提醒事件。
      </StyledTips>
    );
  }
  return null;
};

export const Remind: FC<{}> = ({}) => {
  const user = useGetUserInfo();
  const localRemindData = useLoadlocalRemind();
  const { data } = useGetIuseData();
  const { update: iCardUpdate } = useMutateICardData();

  const { run } = usePutClassesICardId((res) => res, {
    manual: true,
    onSuccess: (_, params) => {
      const p1 = params[0];
      const { notifyTimes, id } = p1;
      iCardUpdate({ objectId: id, notifyTimes });
    },
  });

  return (
    <StyledContent>
      <RemindClass
        selfUser={user!}
        localRemindData={localRemindData}
        iUses={data || []}
        refresh={run as never}
      />
    </StyledContent>
  );
};

export default Remind;
