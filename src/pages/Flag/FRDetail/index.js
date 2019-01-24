/**
 * Created by lintong on 2019/1/24.
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
import { ICARD, FLAGRECORD, FLAG } from '../../../redux/reqKeys'
import moment from 'moment'
import {
  StyledContent,
  StyledItem,
  StyledHeader,
  StyledHeaderTitle,
  StyledRanking,
  StyledInner,
  StyledCellDiscrib,
  StyledCellName
} from './style'
import { Flag } from '../../../request/LCModle'
import Avatar from '../../../components/Avatar/Avatar2'


@connect(
  (state, props) => ({
    flag: state.normalizr.get(FLAG).get(props.navigation.state.params.flagId),
  }),
  dispatch => ({})
)


export default class FRDetail extends PureComponent {
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
    const startDate = this.props.flag.get('startDate')
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          第{moment(startDate.get('iso')).format("YYYYMMDD")}期
        </StyledHeaderTitle>
      </StyledHeader>
    )
  }


  __renderItem = ({ item, index }) => {
    const { user, doneDate } = item
    console.log('user:', user);
    return (
      <StyledItem onPress={() => {
      }}>
        <StyledInner>
          <StyledRanking>
            {index + 1}
          </StyledRanking>
          <Avatar user={user}/>
          <StyledCellName>
            {user.nickname || '路人甲'}
          </StyledCellName>
        </StyledInner>
        <StyledCellDiscrib>
          {doneDate?moment(doneDate.iso).format("MM-DD HH:mm"):'未完成'}
        </StyledCellDiscrib>
      </StyledItem>
    )
  }


  render(): ReactElement<any> {


    const param = {
      where: {
        ...Flag(this.props.navigation.state.params.flagId),
      },
      order: 'doneDate',
      include: 'user',
    }


    return (
      <StyledContent forceInset={{ top: 'never' }}>
        <LCList
          style={{ flex: 1 }}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          reqKey={FLAGRECORD}
          sKey={FLAGRECORD+this.props.navigation.state.params.flagId}
          //dataMap={(data)=>{
          //   return {[OPENHISTORYLIST]:data.list}
          //}}
          reqParam={param}
          renderItem={this.__renderItem}
          ListHeaderComponent={this._renderHeader}
          // ListFooterComponent={data.length > 0 && <View style={{ height: 100 }}/>}
        />
      </StyledContent>
    );
  }
}


