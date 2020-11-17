/**
 * Created by lintong on 2019/1/24.
 * @flow
 */

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import LCList from '../../../components/Base/LCList';
import { ICARD, FLAG } from '../../../redux/reqKeys';
import {
  StyledContent,
  StyledItem,
  StyledCellInner,
  StyledCellTitle,
  StyledCellDiscrib,
  StyledArrow,
  StyledHeader,
  StyledHeaderTitle,
} from './style';
import { iCard } from '../../../request/LCModle';

@connect(
  (state, props) => ({
    iCard: state.normalizr.get(ICARD).get(props.route.params.iCardId),
  }),
  (dispatch) => ({}),
)
export default class FlagRecord extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  _renderHeader = () => (
    <StyledHeader>
      <StyledHeaderTitle>
        {this.props.iCard.get('title')}
        副本的记录
      </StyledHeaderTitle>
    </StyledHeader>
  );

  __renderItem = ({ item }) => {
    const { totalBonus, startDate, objectId, joinNum, reward } = item;
    return (
      <StyledItem
        onPress={() => {
          this.props.navigation.navigate('FRDetail', { flagId: objectId });
        }}>
        <StyledCellInner>
          <StyledCellTitle numberOfLines={1}>
            第{moment(startDate.iso).format('YYYYMMDD')}期
          </StyledCellTitle>

          <StyledCellDiscrib>
            参与人数:
            {joinNum}
            {reward === 'money' && `,总奖金:${totalBonus.toFixed(2)}元`}
          </StyledCellDiscrib>
        </StyledCellInner>
        <StyledArrow />
      </StyledItem>
    );
  };

  render() {
    const param = {
      where: {
        ...iCard(this.props.route.params.iCardId),
        // settled: true
      },
      // order: 'doneDate',
      // include: 'user',
    };

    return (
      <StyledContent edges={['bottom']}>
        <LCList
          style={{ flex: 1 }}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          reqKey={FLAG}
          sKey={`${FLAG}list`}
          // dataMap={(data)=>{
          //   return {[OPENHISTORYLIST]:data.list}
          // }}
          reqParam={param}
          renderItem={this.__renderItem}
          ListHeaderComponent={this._renderHeader}
          // ListFooterComponent={data.length > 0 && <View style={{ height: 100 }}/>}
        />
      </StyledContent>
    );
  }
}
