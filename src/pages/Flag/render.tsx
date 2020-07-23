/**
 * Created by lintong on 2019/1/2.
 * @flow
 */

import React, {PureComponent} from 'react';
import moment from 'moment';

import {FLAG, ICARD, FBLIST} from '../../redux/reqKeys';

import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledItem,
  StyledItemImage,
  StyledItemTitle,
  StyledItemText,
  StyledItemCover,
} from './style';
import LCList from '../../components/Base/LCList';

export default class Flag extends PureComponent {
  openSmallTitle = false;
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  _renderHeader = () => (
    <StyledHeader>
      <StyledHeaderTitle>副本任务</StyledHeaderTitle>
    </StyledHeader>
  );

  _keyExtractor = (item, index) => {
    const key = item.objectId || index;
    return `${key}`;
  };

  __renderItem = ({item, index}) => {
    const {
      title,
      objectId,
      iCard,
      titleConfig,
      reward,
      rewardConfig,
      totalBonus,
    } = item;
    const {color = 'white', dColor = 'white', position} = titleConfig;

    let discirb = '奖励:';
    if (reward === 'money') {
      discirb = `奖金池:${totalBonus.toFixed(1)}元`;
    } else if (reward === 'redo') {
      discirb = `完成奖励:补打卡${rewardConfig.redo}张`;
    }

    return (
      <StyledItem
        onPress={() => {
          this.props.navigation.navigate('flagDetail', {
            flagId: objectId,
            iCardId: iCard,
          });
        }}>
        <StyledItemImage source={{uri: item.cover.url}} />
        <StyledItemCover position={position}>
          <StyledItemTitle color={color} position={position}>
            {title}
          </StyledItemTitle>
          <StyledItemText color={dColor} position={position}>
            {discirb}
          </StyledItemText>
        </StyledItemCover>
      </StyledItem>
    );
  };

  render(): ReactElement<any> {
    // const data = [{img:require('../../../source/img/flag/flag_up.jpeg'),
    //   title:'早起副本'
    // }]

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
        numColumns={2}
        onScroll={(event) => {
          const y = event.nativeEvent.contentOffset.y;
          if (!this.openSmallTitle && y > 35) {
            this.openSmallTitle = true;
            this.props.navigation.setOptions({title: '副本任务'});
          }
          if (this.openSmallTitle && y < 35) {
            this.openSmallTitle = false;
            this.props.navigation.setOptions({title: ''});
          }
        }}
        style={{flex: 1}}
        // removeClippedSubviews={true}
        // pagingEnabled={true}
        sKey={FBLIST} // 在list 中的位置
        callPath={FBLIST} // 表示走云函数,并告知云函数的路径
        reqKey={FLAG}
        // dataMap={(data)=>{
        //   return {[OPENHISTORYLIST]:data.list}
        // }}
        dataMap={(data) => ({results: data.result})}
        reqParam={param}
        renderItem={this.__renderItem}
        ListHeaderComponent={this._renderHeader}
        // ListFooterComponent={data.length > 0 && <View style={{ height: 100 }}/>}
      />
    );
  }
}
