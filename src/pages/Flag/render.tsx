/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import React, { FC, PureComponent, useEffect, useRef, useState } from 'react';
import moment from 'moment';

import { FLAG, ICARD, FBLIST } from '../../redux/reqKeys';

import {
  StyledHeader,
  StyledHeaderTitle,
  StyledItem,
  StyledItemImage,
  StyledItemTitle,
  StyledItemText,
  StyledItemCover,
} from './style';
import LCList from '../../components/Base/LCList';
import { isTablet, isLandscape } from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { useOrientation, useScrollTitle } from '@components/util/hooks';

// export default class Flag extends PureComponent<any, { numColumns: number }> {
//   openSmallTitle = false;
//   constructor(props: Object) {
//     super(props);
//     this.state = {
//       numColumns: isTablet() ? isLandscape() ? 3 : 2 : 1
//     }
//   }

//   _orientationDidChange = (orientation: string) => {
//     if (orientation === 'LANDSCAPE') {
//       this.setState({ numColumns: 3 })
//     } else {
//       this.setState({ numColumns: 2 })
//     }
//   }

//   componentDidMount() {
//     isTablet() && Orientation.addOrientationListener(this._orientationDidChange);
//   }

//   componentWillUnmount() {
//     isTablet() && Orientation.removeOrientationListener(this._orientationDidChange);
//   }

//   _renderHeader = () => (
//     <StyledHeader>
//       <StyledHeaderTitle>副本任务</StyledHeaderTitle>
//     </StyledHeader>
//   );

//   __renderItem = ({ item, index }) => {
//     const {
//       title,
//       objectId,
//       iCard,
//       titleConfig,
//       reward,
//       rewardConfig,
//       totalBonus,
//     } = item;
//     const { color = 'white', dColor = 'white', position } = titleConfig;

//     let discirb = '奖励:';
//     if (reward === 'money') {
//       discirb = `奖金池:${totalBonus.toFixed(1)}元`;
//     } else if (reward === 'redo') {
//       discirb = `完成奖励:补打卡${rewardConfig.redo}张`;
//     }

//     return (
//       <StyledItem
//         onPress={() => {
//           this.props.navigation.navigate('flagDetail', {
//             flagId: objectId,
//             iCardId: iCard,
//           });
//         }}>
//         <StyledItemImage
//           numColumns={this.state.numColumns}
//           source={{ uri: item.cover.url }}
//         />
//         <StyledItemCover position={position}>
//           <StyledItemTitle color={color}>{title}</StyledItemTitle>
//           <StyledItemText color={dColor}>{discirb}</StyledItemText>
//         </StyledItemCover>
//       </StyledItem>
//     );
//   };

//   render() {
//     // const data = [{img:require('../../../source/img/flag/flag_up.jpeg'),
//     //   title:'早起副本'
//     // }]

//     const param = {
//       where: {
//         state: 1,
//         startDate: {
//           $gte: {
//             __type: 'Date',
//             iso: moment('00:00', 'HH:mm').add(1, 'day').toISOString(),
//           },
//         },
//         // endDate:{"$lte":{"__type":"Date","iso":moment('24:00', 'HH:mm').add(1, 'day').toISOString()}},
//         settled: false,
//       },
//       include: ICARD,
//     };

//     return (
//       <LCList
//         numColumns={this.state.numColumns}
//         onScroll={(event) => {
//           const y = event.nativeEvent.contentOffset.y;
//           if (!this.openSmallTitle && y > 35) {
//             this.openSmallTitle = true;
//             this.props.navigation.setOptions({ title: '副本任务' });
//           }
//           if (this.openSmallTitle && y < 35) {
//             this.openSmallTitle = false;
//             this.props.navigation.setOptions({ title: '' });
//           }
//         }}
//         style={{ flex: 1 }}
//         // removeClippedSubviews={true}
//         // pagingEnabled={true}
//         key={(this.state.numColumns === 2 ? 'h' : 'v')}
//         sKey={FBLIST} // 在list 中的位置
//         callPath={FBLIST} // 表示走云函数,并告知云函数的路径
//         reqKey={FLAG}
//         // dataMap={(data)=>{
//         //   return {[OPENHISTORYLIST]:data.list}
//         // }}
//         dataMap={(data) => ({ results: data.result })}
//         reqParam={param}
//         renderItem={this.__renderItem}
//         ListHeaderComponent={this._renderHeader}
//       // ListFooterComponent={data.length > 0 && <View style={{ height: 100 }}/>}
//       />
//     );
//   }
// }

const title = '副本任务';
const RenderHeader = () => (
  <StyledHeader>
    <StyledHeaderTitle>{title}</StyledHeaderTitle>
  </StyledHeader>
);

const RenderItem = ({
  item,
  index,
  numColumns,
}: {
  item: any;
  index: number;
  numColumns: number;
}) => {
  const { navigate } = useNavigation();

  const {
    title,
    objectId,
    iCard,
    titleConfig,
    reward,
    rewardConfig,
    totalBonus,
  } = item;
  const { color = 'white', dColor = 'white', position } = titleConfig;

  let discirb = '奖励:';
  if (reward === 'money') {
    discirb = `奖金池:${totalBonus.toFixed(1)}元`;
  } else if (reward === 'redo') {
    discirb = `完成奖励:补打卡${rewardConfig.redo}张`;
  }

  return (
    <StyledItem
      onPress={() => {
        navigate('flagDetail', {
          flagId: objectId,
          iCardId: iCard,
        });
      }}>
      <StyledItemImage
        numColumns={numColumns}
        source={{ uri: item.cover.url }}
      />
      <StyledItemCover position={position}>
        <StyledItemTitle color={color}>{title}</StyledItemTitle>
        <StyledItemText color={dColor}>{discirb}</StyledItemText>
      </StyledItemCover>
    </StyledItem>
  );
};

const Render: FC<any> = () => {
  const onScroll = useScrollTitle(title);
  const ori = useOrientation();
  const numColumns = isTablet() ? (ori === 'LANDSCAPE' ? 3 : 2) : 1;

  console.log('???');

  const param = {
    where: {
      state: 1,
      startDate: {
        $gte: {
          __type: 'Date',
          iso: moment('00:00', 'HH:mm').add(1, 'day').toISOString(),
        },
      },
      // endDate:{"$lte":{"__type":"Date","iso":moment('24:00', 'HH:mm').add(1, 'day').toISOString()}},
      settled: false,
    },
    include: ICARD,
  };
  return (
    <LCList
      numColumns={numColumns}
      onScroll={onScroll}
      style={{ flex: 1 }}
      // removeClippedSubviews={true}
      // pagingEnabled={true}
      key={numColumns === 2 ? 'h' : 'v'}
      sKey={FBLIST} // 在list 中的位置
      callPath={FBLIST} // 表示走云函数,并告知云函数的路径
      reqKey={FLAG}
      // dataMap={(data)=>{
      //   return {[OPENHISTORYLIST]:data.list}
      // }}
      dataMap={(data) => ({ results: data.result })}
      reqParam={param}
      renderItem={(props) => <RenderItem {...props} numColumns={numColumns} />}
      ListHeaderComponent={RenderHeader}
      // ListFooterComponent={data.length > 0 && <View style={{ height: 100 }}/>}
    />
  );
};
export default Render;
