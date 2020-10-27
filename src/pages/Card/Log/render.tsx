/**
 * Created by lintong on 2018/3/6.
 * @flow
 */

import React, { FC, PureComponent } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import {} from './style';

import LCList from '../../../components/Base/LCList';
import { IDO } from '../../../redux/reqKeys';

import RecordRow from '../Statistical/Row';
import { iUse, user } from '@request/LCModle';

const listKey = IDO;

@connect((state) => ({ user: state.user.data }))
export default class Statistical extends PureComponent {
  renderRow({ item, index }: Object) {
    // const img = item.imgs && item.imgs[0] || null

    console.log('item', item);

    return (
      <RecordRow
        item={item}
        color={this.props.route.params?.color}
        onPress={() => {
          this.props.navigation.navigate('rcomment', {
            iDoID: item.objectId,
            iUseId: this.props.route.params?.iCardId,
            iCardId: this.props.route.params?.iUseId,
          });
        }}
      />
    );
  }

  render() {
    // const iCardId = this.props.route.params?.iCardId
    const iUseId = this.props.route.params?.iUseId;

    const param = {
      where: {
        ...user(this.props.user.objectId),
        ...iUse(iUseId),
        $or: [{ imgs: { $exists: true } }, { recordText: { $exists: true } }],
        state: { $ne: -1 },
      },
      order: '-doneDate,-createdAt',
    };

    return (
      <LCList
        ref="list"
        reqKey={listKey}
        style={{ flex: 1 }}
        sKey={listKey + iUseId}
        renderItem={this.renderRow.bind(this)}
        // dataMap={(data)=>{
        //   return {[OPENHISTORYLIST]:data.list}
        // }
        reqParam={param}
        // {...config}
      />
    );
  }
}
