/**
 * Created by lintong on 2018/4/9.
 * @flow
 */

'use strict';

import React, { PureComponent } from 'react';
import LCList from '../../../components/Base/LCList';
import { followList } from '../../../redux/module/leancloud';

import { StyledContent } from './style';

import FollowRow from './FollowRow';
import { USER } from '../../../redux/reqKeys';
import { isTablet } from 'react-native-device-info';

const listKey = USER;

export default class Follow extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = (props) => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      title: '',
    };
  };

  _renderHeader = () => {};

  render() {
    const { navigation, route } = this.props;
    const { params } = route;
    const param = { uid: params.userId };

    return (
      <StyledContent>
        {this._renderHeader()}
        <LCList
          numColumns={isTablet() ? 2 : 1}
          style={{ flex: 1 }}
          reqKey={listKey}
          sKey={'followee_' + params.userId}
          renderItem={(data) => (
            <FollowRow
              user={data.item}
              onPress={() => {
                this.props.navigation.navigate('following', {
                  userId: data.item.objectId,
                });
              }}
            />
          )}
          noDataPrompt={'还没有人关注~'}
          search={followList('ee')}
          dataMap={(data) => {
            const list = data.results;
            const newList = list.map((item) => item.followee);
            return { results: newList };
          }}
          reqParam={param}
        />
      </StyledContent>
    );
  }
}
