/**
 * Created by lintong on 2019/1/2.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import {
  View,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment'


import { FLAG,ICARD  } from '../../redux/reqKeys'

import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledItem,
  StyledItemImage,
  StyledItemText
} from './style'
import LCList from '../../components/Base/LCList';



@connect(
  state => ({}),
  dispatch => ({})
)


export default class Flag extends PureComponent {
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
      header: null
    }
  };

  _renderHeader = () => {
    return (
      <StyledHeader>
        <StyledHeaderTitle>
          副本任务
        </StyledHeaderTitle>
      </StyledHeader>
    )
  }


  _keyExtractor = (item, index) => {
    const key = item.objectId || index;
    return key + '';
  }


  __renderItem = ({ item, index }) => {
    const {title,objectId,iCard} = item
    return (
      <StyledItem onPress={()=>{
        this.props.navigation.navigate('flagDetail',{flagId:objectId,iCardId:iCard})
      }}>
        <StyledItemImage source={{uri:item.cover.url}}/>
        <StyledItemText>
          {title}
        </StyledItemText>
      </StyledItem>
    )
  }


  render(): ReactElement<any> {

    // const data = [{img:require('../../../source/img/flag/flag_up.jpeg'),
    //   title:'早起副本'
    // }]

    const param = {
      where: {
        state:1,
        endDate:{"$gt":{"__type":"Date","iso":moment().toISOString()}},
        settled:false,
      },
      include: ICARD,
    }

    return (
      <StyledContent>
        <LCList
          style={{flex:1}}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          reqKey={FLAG}
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


