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
import { ICARD, FLAG } from '../../../redux/reqKeys'
import moment from 'moment'
import {
  StyledContent,
  StyledItem,
  StyledCellInner,
  StyledCellTitle,
  StyledCellDiscrib,
  StyledArrow,
  StyledHeader,
  StyledHeaderTitle


} from './style'
import { iCard } from '../../../request/LCModle'

@connect(
  (state,props) => ({
    iCard: state.normalizr.get(ICARD).get(props.navigation.state.params.iCardId),
  }),
  dispatch => ({})
)


export default class FlagRecord extends PureComponent {
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
          {this.props.iCard.get('title')}副本的记录
        </StyledHeaderTitle>
      </StyledHeader>
    )
  }



  __renderItem = ({ item, index }) => {
    const { totalBonus, startDate, cost,objectId } = item
    return (
      <StyledItem onPress={() => {
        this.props.navigation.navigate('FRDetail',{flagId:objectId})
      }}>

        <StyledCellInner>
          <StyledCellTitle
            numberOfLines={1}>
            第{moment(startDate.iso).format("YYYYMMDD")}期
          </StyledCellTitle>
          <StyledCellDiscrib>
            参与人数:{Math.floor(totalBonus/cost)}{cost>0 &&`,总奖金:${totalBonus.toFixed(2)}元`}
          </StyledCellDiscrib>
        </StyledCellInner>
        <StyledArrow/>

      </StyledItem>
    )
  }


  render(): ReactElement<any> {


    const param = {
      where: {
        ...iCard(this.props.navigation.state.params.iCardId),
        settled:true
      },
      // order: 'doneDate',
      // include: 'user',
    }


    return (
      <StyledContent  forceInset={{ top: 'never' }}>
        <LCList
          style={{ flex: 1 }}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          reqKey={FLAG}
          sKey={FLAG + 'list'}
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


