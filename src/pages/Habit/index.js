/**
 * Created by lintong on 2017/7/3.
 * @flow
 */
'use strict';

import React, { Component,PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import { connect } from 'react-redux'

import { selfUser, } from '../../request/LCModle'
import Cell from './Cell'

import {
  StyledInnerdContent,
  StyledIcon,
  StyledDeleteBtn,
  StyledDeleteBtnText
} from './style'
import { strings } from '../../../locales/i18n';
import ExceptionView, { ExceptionType } from '../../components/Base/ExceptionView/index'
import HeaderBtn from '../../components/Button/HeaderBtn'
import moment from 'moment'
import Swipeout from 'react-native-swipeout'
import { update, search } from '../../redux/module/leancloud'

import { IUSE, IRECORD ,ICARD} from '../../redux/reqKeys'
import { claerByID } from '../../redux/actions/list'
import { addNormalizrEntity } from '../../redux/module/normalizr'
import { classUpdate } from '../../request/leanCloud'
import { req } from '../../redux/actions/req'
const Archive = IUSE + "archive"

@connect(
  state => ({
    data: state.list.get(IUSE),
    iUse: state.normalizr.get(IUSE),
    iCard: state.normalizr.get(ICARD),

    refreshLoad: state.req.get(IUSE).get("load"),
    stopIUSEexist: state.req.get('StopIUSEexist')
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
    stop: async (data) => {
      const id = data.objectId
      const param = {
        statu: 'stop',
        //cycle,
      }
      const lParams = classUpdate(IUSE, id, param)
      const res = await dispatch(req(lParams, Archive))
      const entity = {
        ...param,
        ...res,
      }

      dispatch(addNormalizrEntity(IUSE, entity))
      dispatch(claerByID(IUSE, id))
    },
    delete: async (objectId) => {
      // await remove(objectId,IUSE)
      // 做伪删除

      Alert.alert(
        '确定删除?',
        '删除后不可恢复~！',
        [{ text: '取消' }, {
          text: '确定', onPress: async () => {
            const param = {
              statu: 'del'
            }
            const res = await dispatch(update(objectId, param, IUSE))
            const entity = {
              ...param,
              ...res
            }
            dispatch(addNormalizrEntity(IUSE, entity))
            dispatch(claerByID(IUSE, objectId))
            dispatch(claerByID(IRECORD, objectId))
          }
        }]
      )
    },

  })
)
export default class Habit extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state={
      openIndex:-1,
    }
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

      //     headerRight: ( <TouchableOpacity
      //         style={styles.headerBtn}
      //         onPress={()=>{
      //                 navigation.navigate('NewCard')
      //             }}>
      //         <Icon name="md-add" size={30}/>
      //     </TouchableOpacity>),
      //     headerLeft: (
      //         <TouchableOpacity
      //             style={styles.headerBtn}
      //             onPress={()=>{
      //                 Pop.show(<Menu/>,{maskStyle:{backgroundColor:'transparent'}})
      //         }}>
      //             <Icon name="md-list" size={30}/>
      //         </TouchableOpacity>)
    }
  };

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


  _renderSwipeOutDeleteBtn = (title,color,name) => {
    return (
      <StyledDeleteBtn>
        <StyledIcon size={30} color={color} name={name}/>
        <StyledDeleteBtnText color={color}>
          {title}
        </StyledDeleteBtnText>
      </StyledDeleteBtn>
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


    return (
      <Swipeout
        backgroundColor='white'
        close={this.state.openIndex !== index}
        onOpen={()=>{
          this.setState({openIndex:index})
        }}
        right={[{
          type: 'secondary',
          onPress: () => {
            this.props.navigation.navigate('cardSetting',
              {iCardId,iUseId:item})
            this.setState({openIndex:-1})
            // this._deleteRow(item)
          },
          component: this._renderSwipeOutDeleteBtn('更多','#388e3c','more-vert'),
          backgroundColor: '#e0f2f1'
        },{
          type: 'delete',
          onPress: () => {
            // this._deleteRow(item)
            this.props.delete(item)
            this.setState({openIndex:-1})
          },
          component: this._renderSwipeOutDeleteBtn('删除','#f44336','delete'),
          backgroundColor: '#ffebee'
        },{
          type: 'primary',
          onPress: () => {
            // this._deleteRow(item)
            this.props.stop(data)
            this.setState({openIndex:-1})
          },
          component: this._renderSwipeOutDeleteBtn('归档','#009afb','archive'),
          backgroundColor: '#e3f2fd'
        }]}
      >
        <Cell
          // refreshLoad={this.props.refreshLoad}
          // onLongPress={() => {
          //     !this.props.load &&
          //     !done &&
          //     this.props.done(data)
          //
          // }}
          onPress={() => {
            this.props.navigation.navigate('card', {
              iUseId: data.objectId,
              iCardId: iCard.get('objectId')
            })
          }}
          data={data}
          iCard={iCard.toJS()}
        />
      </Swipeout>);
  }


  _keyExtractor = (item, index) => {
    const key = item.id || index;
    return key + '';
  }


  _renderHeader = () => {
    return (
      <View style={styles.headView}>
        <Text style={styles.headViewText}>
          日常习惯
        </Text>
        <HeaderBtn
          style={{ padding: 15 }}
          title={'添加'}
          onPress={() => {
            this.props.navigation.navigate('newCard')
          }}
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}/>
      </View>
    )
  }

  render(): ReactElement<any> {

    const statu = this.props.data.get('loadStatu')

    let data = this.props.data.toJS().listData

    // data = data.sort((a,b)=> a.time - b.time)


    return (
      <StyledInnerdContent>
        {/*<StyledContent*/}
        {/*style={this.props.style}>*/}
        <View style={{ height: 20 }}/>

        {/*{this._renderHeader()}*/}

        <FlatList
          refreshing={false}
          onRefresh={() => {
            this.props.search()
          }}
          style={styles.container}
          data={data}
          // removeClippedSubviews={true}
          // pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={this.__renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._renderHeader}
          ListEmptyComponent={() => this.__renderNoData(statu)}
        />

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
    overflow: 'hidden',
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
    marginTop: 44,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  headViewText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  headViewSubText: {
    marginTop: 10,
    // marginHorizontal: 20,
    fontSize: 14,
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
