/**
 * Created by lintong on 2017/7/14.
 * @flow
 */

import React, { FC, useRef } from 'react';
import { Alert } from 'react-native';

import CardRow from '../Habit/Cell';
import {
  StyledHeaderTitle,
  StyledIcon,
  StyledDeleteBtn,
  StyledDeleteBtnText,
  StyledAntDesign,
  StyledAnimationRow,
} from './style';

import AppleStyleSwipeableRow from '../../components/Swipeable';
import { useMutateIuseData } from 'src/data/data-context/core';
import { useScrollTitle } from '@components/util/hooks';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import PageList from '@components/Base/PageList';
import {
  getClassesIUse,
  GetClassesIUseResponse,
  putClassesIUseId,
} from 'src/hooks/interface';
import AnimationRow from '@components/AnimationRow';
import { useNavigation } from '@react-navigation/native';
import { userPoint } from '@request/LCModle';
import { RouteKey } from '@pages/interface';
// import { isTablet } from 'react-native-device-info';

// const Archive = `${IUSE}archive`;

// interface HabitProps {
//   user: UserType;
//   iUse: IUseType[];
//   onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
//   search: () => void;
// }

// @connect(
//   (state) => ({
//     data: state.list.get(IRECORD),
//     iCard: state.normalizr.get(ICARD),
//   }),
//   (dispatch) => ({
//     refresh: async (data, handleView) => {
//       const id = data.objectId;
//       // const card = props.route.params.iCard

//       // const isDone = data.time % card.period === 0

//       const param = {
//         // time: isDone ? 0 : data.time,
//         statu: 'start',
//         // cycle: isDone ? data.cycle + 1 : data.cycle,
//       };

//       const lParams = classUpdate(IUSE, id, param);
//       const res = await dispatch(req(lParams, Archive));
//       const entity = {
//         ...param,
//         ...res,
//       };
//       handleView && (await handleView.remove());
//       dispatch(addListNormalizrEntity(IUSE, entity));
//       await dispatch(claerByID(IRECORD, id));
//       handleView && (await handleView.reset());
//     },
//     delete: async (objectId, handleView, isFb) => {
//       // await remove(objectId,IUSE)
//       // 做伪删除

//       if (isFb) {
//         Alert.alert(
//           '主人，我正参与副本活动，不可以被删除哦～！',
//           '等活动结束后再来吧。',
//           [{ text: '知道了' }],
//         );
//         return;
//       }

//       Alert.alert('确定删除?', '删除后不可恢复~！', [
//         { text: '取消' },
//         {
//           text: '确定',
//           onPress: async () => {
//             const param = {
//               statu: 'del',
//             };
//             const res = await dispatch(update(objectId, param, IUSE));
//             const entity = {
//               ...param,
//               ...res,
//             };
//             handleView && (await handleView.remove());
//             dispatch(addNormalizrEntity(IUSE, entity));
//             await dispatch(claerByID(IUSE, objectId));
//             await dispatch(claerByID(IRECORD, objectId));
//             handleView && (await handleView.reset());
//             return res;
//           },
//         },
//       ]);
//     },
//   }),
// )
// class RecordClass extends Component<HabitProps> {
//   constructor(props: HabitProps) {
//     super(props);
//     this.state = {
//       openIndex: -1,
//     };
//   }

//   handleViewRef = {};

//   swipeRefs = {};

//   renderRow = ({ item, index }: Object) => {
//     // md-refresh

//     const self = this;
//     const iCardId = item[ICARD];
//     const card = this.props.iCard.get(iCardId);
//     const iCard = card && card.toJS();
//     // console.log('test:', item);

//     if (!iCard) {
//       console.log('iCardId:', iCardId, iCard);
//       return <View />;
//     }
//     // const days = item.time
//     // const reflesh = item.time === iCard.period || item.statu === 'stop'
//     // const cycle = parseInt(item.time / iCard.period)
//     const { user } = iCard;
//     const isSelf = user === this.props.user.objectId;

//     return (
//       <StyledAnimationRow
//         ref={(res) => (this.handleViewRef[`habit${index}`] = res)}>
//         <AppleStyleSwipeableRow
//           ref={(ref) => {
//             this.swipeRefs[`swipe${index}`] = ref;
//           }}
//           backgroundColor="white"
//           close={this.state.openIndex !== index}
//           onSwipeableWillOpen={() => {
//             const { openIndex } = this.state;
//             if (index === openIndex) {
//               return;
//             }
//             if (openIndex !== -1) {
//               const swipeRef = this.swipeRefs[`swipe${openIndex}`];
//               swipeRef && swipeRef.close();
//             }
//             this.setState({ openIndex: index });
//           }}
//           onSwipeableWillClose={() => {
//             // rowId === this.state.openIndex &&
//             if (index === this.state.openIndex) {
//               this.setState({ openIndex: -1 });
//             }
//           }}
//           right={[
//             isSelf
//               ? {
//                   type: 'secondary',
//                   onPress: () => {
//                     this.props.navigation.navigate('cardConfig', { iCardId });
//                     // this.setState({ openIndex: -1 })
//                     // this._deleteRow(item)
//                   },
//                   component: _renderSwipeOutDeleteBtn(
//                     '设置',
//                     '#388e3c',
//                     'settings',
//                   ),
//                   backgroundColor: '#fdfbfb',
//                 }
//               : {
//                   type: 'secondary',
//                   onPress: () => {
//                     this.props.navigation.navigate('cardInfo', { iCardId });
//                     // this.setState({ openIndex: -1 })
//                     // this._deleteRow(item)
//                   },
//                   component: _renderSwipeOutDeleteBtn(
//                     '查看',
//                     '#388e3c',
//                     'info',
//                   ),
//                   backgroundColor: '#fdfbfb',
//                 },
//             {
//               type: 'delete',
//               onPress: () => {
//                 // this._deleteRow(item)
//                 const handleView = self.handleViewRef[`habit${index}`];
//                 this.props.delete(item.objectId, handleView, item.isFb);

//                 // this.setState({ openIndex: -1 })
//               },
//               component: _renderSwipeOutDeleteBtn(
//                 '删除',
//                 '#f44336',
//                 'delete',
//                 StyledAntDesign,
//               ),
//               backgroundColor: '#fdfbfb',
//             },
//             {
//               type: 'primary',
//               onPress: () => {
//                 // this._deleteRow(item)
//                 const handleView = self.handleViewRef[`habit${index}`];
//                 this.props.refresh(item, handleView);
//                 // this.setState({ openIndex: -1 })
//               },
//               component: _renderSwipeOutDeleteBtn(
//                 '恢复',
//                 '#009afb',
//                 'refresh-ccw',
//               ),
//               backgroundColor: '#fdfbfb',
//             },
//           ]}>
//           <CardRow
//             data={item}
//             iCard={iCard}
//             onPress={() => {
//               this.props.navigation.navigate('card', {
//                 iUseId: item.objectId,
//                 iCardId: iCard.objectId,
//               });
//             }}
//           />
//         </AppleStyleSwipeableRow>
//       </StyledAnimationRow>
//     );
//   };

//   render() {
//     const { navigation, route, onScroll } = this.props;
//     const { dispatch } = navigation;
//     const { params } = route;
//     const statu = params ? params.statu : { $ne: 'del' };
//     // const statu =  { $ne: 'del' };
//     const param = {
//       // where: {
//       //   ...dispatch(selfUser()),
//       //   statu,
//       // },
//       // include: ICARD,
//       statu,
//     };
//     return (
//       <LCList
//         numColumns={1}
//         onScroll={onScroll}
//         scrollEnabled={this.state.openIndex === -1}
//         ListHeaderComponent={renderHeader}
//         style={[styles.list]}
//         reqKey={IUSE}
//         sKey={IRECORD}
//         renderItem={this.renderRow}
//         dataMap={(data) => {
//           // console.log('data', data);

//           return { results: data.result.iUseList };
//         }}
//         callPath="iUseList2"
//         reqParam={param}
//       />
//     );
//   }
// }

const renderHeader = () => <StyledHeaderTitle>已暂停习惯</StyledHeaderTitle>;

const _renderSwipeOutDeleteBtn = (
  title: string,
  color: string,
  name: string,
  CMP = StyledIcon,
) => (
  <StyledDeleteBtn>
    <CMP size={25} color={color} name={name} />
    <StyledDeleteBtnText color={color}>{title}</StyledDeleteBtnText>
  </StyledDeleteBtn>
);

type IUseType = NonNullable<GetClassesIUseResponse['results']>[number];

const RenderCell: FC<{
  item: IUseType;
  onSwipeableWillOpen: (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
  ) => void;
  onSwipeableWillClose: (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
  ) => void;
  listRef: React.RefObject<PageList<IUseType>>;
}> = (props) => {
  const { item, onSwipeableWillOpen, onSwipeableWillClose, listRef } = props;
  const { navigate } = useNavigation();
  const data = item;

  // const { user } = useGetInfoOfMe();
  const { add } = useMutateIuseData();

  // console.log('data:', data);
  // const iCardId = data[ICARD];
  const iCard = item.iCard;
  // const isSelf = iCard.user?.objectId === user.objectId;
  const iCardId = iCard.objectId;
  const handleViewRef = useRef<AnimationRow>();
  const swipeRef = useRef<AppleStyleSwipeableRow>();

  const refreshAction = async () => {
    const params = { statu: 'start' };
    await handleViewRef.current?.remove();
    const res = await putClassesIUseId({ id: item.objectId, ...params });
    res && add({ ...item, ...params });
    const info = listRef.current?.getData();

    // 找到并移除data 中的选项。
    if (info && info.length > 0) {
      const index = info.findIndex((cell) => cell?.objectId === item.objectId);
      info.splice(index, 1);
      listRef.current?.mutate(info);
    }

    handleViewRef.current?.reset();
  };
  const deleteAction = () => {
    // this.props.delete(item, handleViewRef, data.isFb);
    // if (item.isFb) {
    //   Alert.alert(
    //     '主人，我正参与副本活动，不可以被删除哦～！',
    //     '等活动结束后再来吧。',
    //     [{ text: '知道了' }],
    //   );
    //   return;
    // }
    Alert.alert('确定删除?', '删除后不可恢复~！', [
      { text: '取消' },
      {
        text: '确定',
        onPress: async () => {
          const params = {
            statu: 'del',
          };
          await handleViewRef.current?.remove();
          putClassesIUseId({ id: item.objectId, ...params });
          const info = listRef.current?.getData();
          if (info) {
            const index = info.findIndex(
              (cell) => cell?.objectId === item.objectId,
            );
            info.splice(index, 1);
            listRef.current?.mutate(info);
          }
          // res && remove(res.objectId);
          handleViewRef.current?.reset();
        },
      },
    ]);
  };

  return (
    <StyledAnimationRow ref={handleViewRef as never}>
      <AppleStyleSwipeableRow
        // rowID={index}
        // autoClose={true}
        ref={swipeRef as never}
        // close={this.state.openIndex !== index}
        onSwipeableWillOpen={onSwipeableWillOpen.bind(undefined, swipeRef)}
        onSwipeableWillClose={onSwipeableWillClose.bind(undefined, swipeRef)}
        right={[
          // isSelf
          //   ?
          // {
          //     type: 'secondary',
          //     onPress: () => {
          //       navigate('cardConfig', { iCardId });
          //       // this.setState({ openIndex: -1 })
          //     },
          //     component: _renderSwipeOutDeleteBtn(
          //       '设置',
          //       '#388e3c',
          //       'settings',
          //     ),
          //     backgroundColor: '#fdfbfb',
          //   }
          {
            type: 'secondary',
            onPress: () => {
              // this.props.navigation.navigate('cardSetting',
              //   { iCardId, iUseId: item })
              navigate('cardInfo', { iCardId });
              // this.setState({ openIndex: -1 })
            },
            component: _renderSwipeOutDeleteBtn('查看', '#388e3c', 'info'),
            backgroundColor: '#fdfbfb',
          },
          {
            type: 'delete',
            onPress: deleteAction,
            component: _renderSwipeOutDeleteBtn(
              '删除',
              '#f44336',
              'delete',
              StyledAntDesign,
            ),
            backgroundColor: '#fdfbfb',
          },
          {
            type: 'primary',
            onPress: refreshAction,
            component: _renderSwipeOutDeleteBtn(
              '恢复',
              '#009afb',
              'refresh-ccw',
            ),
            backgroundColor: '#fdfbfb',
          },
        ]}>
        <CardRow
          onPress={() => {
            navigate(RouteKey.recordDetail, {
              iUseId: data.objectId,
              iCardId: iCard.objectId,
            });
          }}
          data={data as never}
          iCard={iCard}
        />
      </AppleStyleSwipeableRow>
    </StyledAnimationRow>
  );
};

const Record: FC<{}> = () => {
  const onScroll = useScrollTitle('已暂停习惯');
  const { user } = useGetInfoOfMe();
  const handleRef = useRef<AppleStyleSwipeableRow>();
  const listRef = useRef<PageList<IUseType>>(null);

  const onSwipeableWillOpen = (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
  ) => {
    if (handleRef.current === ref.current) {
      return;
    }
    if (handleRef) {
      // const swipeRef = this.swipeRefs[`swipe${openIndex}`];
      handleRef.current?.close();
    }
    handleRef.current = ref.current;
  };

  const onSwipeableWillClose = (
    ref: React.MutableRefObject<AppleStyleSwipeableRow | undefined>,
  ) => {
    if (handleRef.current === ref.current) {
      handleRef.current = undefined;
    }
  };

  const loadPage = (page_index: number, page_size: number) => {
    const where = {
      statu: 'stop',
      user: userPoint(user.objectId),
    };
    const param = {
      limit: page_size + '',
      skip: page_index * page_size + '',
      include: 'iCard',
      // order: '-doneDate,-createdAt',
      where: JSON.stringify(where),
    };
    return getClassesIUse(param).then((res) => {
      if (res.results) {
        // addIuse([...res.results]);
      }

      return res.results;
    });
  };

  return (
    <PageList<IUseType>
      ref={listRef}
      keyId={'objectId'}
      loadPage={loadPage}
      onScroll={onScroll}
      noDataPrompt="暂无已暂停的习惯～"
      ListHeaderComponent={renderHeader}
      renderItem={(props) => (
        <RenderCell
          {...props}
          listRef={listRef}
          onSwipeableWillOpen={onSwipeableWillOpen}
          onSwipeableWillClose={onSwipeableWillClose}
        />
      )}
      // ListHeaderComponent={<TopMenu {...props} />}
    />
  );

  // return <RecordClass {...props} user={user} onScroll={onScroll} />;
};
export default Record;

// const styles = StyleSheet.create({
//   list: {
//     flex: 1,
//     // overflow: 'hidden',
//   },
// });
