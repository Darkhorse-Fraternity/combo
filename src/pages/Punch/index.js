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
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { ICARD, IUSE, IDO } from '../../redux/reqKeys'
import { search, } from '../../redux/module/leancloud'
import { doCardWithNone } from '../../components/Button/DoCardButton/doCardWithNone'
import ExceptionView, { ExceptionType } from '../../components/Base/ExceptionView/index'
import { selfUser } from '../../request/LCModle'
import {
  StyledContent,
  StyledIcon,
  StyledCard,
  StyledCardTitle
} from './style'
import { strings } from '../../../locales/i18n';
import Item from './Item'


@connect(
  state => ({
    data: state.list.get(IUSE),
    iUse: state.normalizr.get(IUSE),
    iCard: state.normalizr.get(ICARD),
    refreshLoad: state.req.get(IUSE).get("load"),
    load: state.req.get(IDO).get("load"),
  }),
  (dispatch, props) => ({
    //...bindActionCreators({},dispatch)
    search: () => {

      //cloude 中加入',iCard.course' 反而完全没有信息了，很奇怪

      dispatch(search(false, {
        where: {
          ...dispatch(selfUser()),
          statu: 'start'
        },
        order: '-time',
        include: ICARD + ',iCard.user'
      }, IUSE))
    },
    done: (data) => {
      dispatch(doCardWithNone(data))
    },
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
      // title:strings('app.name')

    }
  };

  componentDidMount() {
    this.props.search()
    // this.props.exist()
    // console.log('this.refs.list:', this.refs.list.scrollToOffset);
  }


  __renderNoData = (statu) => {


    const refreshLoad = statu === 'LIST_FIRST_JOIN' || statu === 'LIST_LOAD_DATA'
    return (
      <ExceptionView
        style={{ height: Dimensions.get('window').height / 2 }}
        exceptionType={refreshLoad ?
          ExceptionType.Loading : ExceptionType.NoData}
        tipBtnText={'添加卡片'}
        refresh={refreshLoad}
        prompt={refreshLoad ? '正在加载' : '空空如也~'}
        onRefresh={() => {
          this.props.navigation.navigate('newCard')
        }}/>
    )
  }

  _keyExtractor = (item, index) => {
    const key = item.id || index;
    return key + '';
  }


  _renderHeader = () => {
    return (
      <View style={styles.headView}>
        <Text
          numberOfLines={1}
          style={styles.headViewText}>
          {strings('app.name')}
        </Text>
      </View>
    )
  }

  __renderItem = ({ item, index }) => {

    // if (item === -1) {
    //     return <StopCell title='查看已归档的卡片'
    //                      des='重新打卡点这里'
    //                      onPress={() => {
    //                          this.props.navigation.navigate('Record',
    //                              { statu: 'stop' })
    //                      }}/>
    // }

    const data = this.props.iUse.get(item).toJS()

    // console.log('data:', data);
    const iCardId = data[ICARD]
    let iCard = this.props.iCard.get(iCardId)
    const done = moment(2, "HH").isBefore(data.doneDate.iso)
    let iconAndColor = iCard.get('iconAndColor')
    iconAndColor = iconAndColor ? iconAndColor.toJS() : {}

    return <Item
      name={iconAndColor.name}
      color={iconAndColor.color}
      done={done}
      title={iCard.get('title')}
      onPress={(done) => {
        // const iCardM = iCard.toJS()

        //如果没有强制打卡类型，则直接翻转
        iCard.get('record').size === 0 && done()

        !this.props.load && !done &&
        this.props.done(data)
      }}
    />;
  }


  render(): ReactElement<any> {

    const statu = this.props.data.get('loadStatu')

    let data = this.props.data.toJS().listData

    return [
      <View key={'1'} style={{ height: 20, backgroundColor: 'white' }}/>,
      <StyledContent key={'2'}>
        {/*<StyledContent*/}
        {/*style={this.props.style}>*/}

        <FlatList
          refreshing={false}
          onRefresh={() => {
            this.props.search()
          }}
          data={data}
          numColumns={3}
          style={{ flex: 1 }}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={this.__renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._renderHeader}
          ListEmptyComponent={() => this.__renderNoData(statu)}
        />


      </StyledContent>
    ];
  }
}


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop:44,
    marginBottom: 25,
  },
  headViewText: {
    marginHorizontal: 10,
    fontSize: 25,
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
