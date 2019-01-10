/**
 * Created by lintong on 2018/5/8.
 * @flow
 */


'use strict';

import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import LCList from '../../../components/Base/LCList';
import FollowRow from '../../More/Follow/FollowRow'
import { IUSE, USER } from "../../../redux/reqKeys";
import { iCard } from "../../../request/LCModle";

import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle
} from './style'


const listKey = IUSE

@connect(
  state => ({
    users: state.normalizr.get(USER)
  }),
  dispatch => ({})
)


export default class CardUse extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = props => {
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    return {
      title: '',
    }
  };


  _renderHeader = () => {
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          圈子成员
        </StyledHeaderTitle>
      </StyledHeader>
    )
  }

  _renderItem = (data) => {
    const user = this.props.users.get(data.item.user).toJS()
    return (
      <FollowRow user={user} onPress={() => {
        this.props.navigation.navigate('following', { userId: data.item.user })
      }}/>
    )
  }

  render(): ReactElement<any> {

    const { params } = this.props.navigation.state;

    const iCardId = params && params.iCardId
    if (!iCardId) {
      return null
    }
    const param = {
      where: {
        ...iCard(iCardId),
        statu: { "$ne": 'del' },

      },
      include: USER
    }


    return (
      <StyledContent forceInset={{ top: 'never' }}>
        {this._renderHeader()}
        <LCList
          // ListHeaderComponent={this._renderHeader}
          style={{ flex: 1 }}
          reqKey={listKey}
          sKey={"CardUse" + iCardId}
          renderItem={this._renderItem}
          noDataPrompt={'还没有人关注~'}
          //search={followList('ee')}
          // dataMap={(data) => {
          //     console.log('data:', data);
          //     const list = data['results']
          //     return { results: list }
          // }}
          reqParam={param}
        />
      </StyledContent>
    );
  }
}


