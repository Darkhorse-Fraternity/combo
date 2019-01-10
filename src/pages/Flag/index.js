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


import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledItem,
  StyledItemImage,
  StyledItemText
} from './style'


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
    return (
      <StyledItem onPress={()=>{
        this.props.navigation.navigate('flagDetail')
      }}>
        <StyledItemImage source={item.img}/>
        <StyledItemText>
          {item.title}
        </StyledItemText>
      </StyledItem>
    )
  }


  render(): ReactElement<any> {

    const data = [{img:require('../../../source/img/flag/flag_up.jpeg'),
      title:'早起副本'
    }]

    return (
      <StyledContent>
        <FlatList
          refreshing={false}
          onRefresh={() => {

          }}
          style={{flex:1}}
          data={data}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={this.__renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={data.length > 0 && <View style={{ height: 100 }}/>}
        />
      </StyledContent>
    );
  }
}


