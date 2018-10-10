/**
 * Created by lintong on 2017/8/31.
 * @flow
 */
'use strict';


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import * as immutable from 'immutable';

import HeaderBtn from '../../components/Button/HeaderBtn'
import Agenda from '../Card/Statistical'


import {
  StyledContent,
  StyledHeaderBtn
} from './style'


@connect(
  (state, props) => ({
    iCard: state.normalizr.get('iCard').get(props.navigation.state.params.iCardId),
    iUse: state.normalizr.get('iUse').get(props.navigation.state.params.iUseId),
  }),
  (dispatch, props) => ({})
)

export default class Detail extends Component {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};


  shouldComponentUpdate(nextProps: Object) {
    return !immutable.is(this.props, nextProps)
  }

  componentDidMount() {
    const { navigation, iCard } = this.props;
    const { setParams } = navigation;

    setParams({ title: iCard.get('title') })
  }


  static navigationOptions = props => {
    const { navigation } = props;
    const { state } = navigation;
    const { params } = state;
    // console.log('iCard:', iCard,iCard.get('title'));
    return {
      title: params && params.title,
      headerRight: (
        <StyledHeaderBtn
          // load={false}
          style={{ marginRight: 10 }}
          // disabled={false}
          hitSlop={{ top: 5, left: 10, bottom: 5, right: 10 }}
          onPress={()=>{
            navigation.navigate('cardInfo', {
              iCardId:params.iCardId,
            })
          }}
          title={'加入'}/>
      ),
    }
  };


  // _renderHeader = () => {
  //   const { navigation, iCard } = this.props;
  //   const { state } = navigation;
  //   const { params } = state;
  //
  //   const { iCardId } = params
  //
  //   console.log('iCard:', iCard);
  //
  //
  //   return (
  //     <View style={styles.header}>
  //       <Text style={styles.headerTitle}>{iCard.get('title')}</Text>
  //       <HeaderBtn
  //         style={styles.headerBtn}
  //         title={'查看'}
  //         onPress={() => {
  //           navigation.navigate('cardInfo', {
  //             iCardId,
  //           })
  //         }}/>
  //     </View>
  //   )
  // }


  render() {


    return (
      <StyledContent>
        {/*{this._renderHeader()}*/}
        <Agenda {...this.props}/>
      </StyledContent>
    )


  }
}

const styles = StyleSheet.create({

  header: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 25,
  },
  headerBtn: {},
  headerBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',

  }
})




