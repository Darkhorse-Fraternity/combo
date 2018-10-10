/**
 * Created by lintong on 2017/7/3.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import CardView from '../Habit/list/index'
import Button from '../../components/Button'
import HeaderBtn from '../../components/Button/HeaderBtn'
import {
  StyledContent,
  StyledInnerdContent
} from './style'
import { strings } from '../../../locales/i18n';

@connect(
  state => ({
    user: state.user.data
  }),
  (dispatch, props) => ({
    //...bindActionCreators({},dispatch)
    sayHello: () => {

    }
  })
)
export default class Punch extends Component {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};
  static defaultProps = {};


  static navigationOptions = props => {
    // const { navigation } = props;
    // const { state } = navigation;
    // const { params } = state;
    // console.log('test:', params,localLoad);
    return {
      // gesturesEnabled: false,
      header: null


    }
  };





  _renderHeader = () => {
    return (
      <View style={styles.headView}>
        <Text
          numberOfLines={1}
          style={styles.headViewText}>
          {strings('app.name')}
        </Text>
        {/*<View style={styles.headViewSub}>*/}
          {/*<Text style={styles.headViewSubText}>*/}
            {/*我在{' ' + moment(new Date()).format("YYYY/MM/DD") + ' '}这一天*/}
          {/*</Text>*/}
          {/*<HeaderBtn*/}
            {/*style={{ padding: 15 }}*/}
            {/*title={'添加'}*/}
            {/*onPress={() => {*/}
              {/*this.props.navigation.navigate('newCard')*/}
            {/*}}*/}
            {/*hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}/>*/}
        {/*</View>*/}
      </View>
    )
  }

  render(): ReactElement<any> {

    return (
      <StyledInnerdContent
        colors={['#f1f6f9', '#ffffff']}>
        {/*<StyledContent*/}
        {/*style={this.props.style}>*/}
        <View style={{height:20}}/>

        {/*{this._renderHeader()}*/}
        <CardView
          header={this._renderHeader}
          navigation={this.props.navigation}/>

        {/*</StyledContent>*/}
      </StyledInnerdContent>
    );
  }
}


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    marginTop: 30,
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  // headerBtn: {
  //     padding: 20,
  //     paddingHorizontal: 15,
  // },
  main: {
    flex: 1,
  },
  loginBg: {
    width: width,
    height: height - 64,
    alignItems: 'center'

  },
  login: {
    width: width - 100,
    height: 300,
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
    justifyContent: 'space-between',
    borderTopColor: '#EE7A8D',
    borderTopWidth: 4,
  },
  headView: {
    // height:180,

    marginBottom: 15,
  },
  headViewText: {
    marginTop: 40,
    marginHorizontal: 20,
    fontSize: 35,
    fontWeight: 'bold',
  },
  headViewSubText: {
    marginTop: 10,
    // marginHorizontal: 20,
    fontSize: 14,
  },
  headViewSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    // backgroundColor: "red"
  },
  headerBtn: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',

  }


})
