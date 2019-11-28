/**
 * Created by lintong on 2017/7/3.
 * @flow
 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { FlatList, } from 'react-navigation';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { selfUser, } from '../../request/LCModle';
import Cell from './Cell';

import {
  StyledInnerdContent,
  StyledIcon,
  StyledDeleteBtn,
  StyledDeleteBtnText,
  StyledAdd,
  StyledIonicons,
  StyledHeader,
  StyledHeaderTitle,
  StyledAntDesign
} from './style';
import { strings } from '../../../locales/i18n';
import ExceptionView, { ExceptionType } from '../../components/Base/ExceptionView/index';
import HeaderBtn from '../../components/Button/HeaderBtn';
import AppleStyleSwipeableRow from '../../components/Swipeable';
import { update, search } from '../../redux/module/leancloud';

import { IUSE, IRECORD, ICARD } from '../../redux/reqKeys';
import { claerByID } from '../../redux/actions/list';
import { addNormalizrEntity } from '../../redux/module/normalizr';
import { classUpdate } from '../../request/leanCloud';
import { req } from '../../redux/actions/req';
import AnimationRow from '../../components/AnimationRow';

const Archive = `${IUSE}archive`;

@connect(
  state => ({
    data: state.list.get(IUSE),
    iUse: state.normalizr.get(IUSE),
    iCard: state.normalizr.get(ICARD),
    refreshLoad: state.req.get(IUSE).get('load'),
    stopIUSEexist: state.req.get('StopIUSEexist'),
    user: state.user.data
  }),
  (dispatch, props) => ({
    // ...bindActionCreators({},dispatch)
    search: () => {
      // cloude 中加入',iCard.course' 反而完全没有信息了，很奇怪

      dispatch(search(false, {
        where: {
          ...dispatch(selfUser()),
          statu: 'start'
        },
        order: '-time',
        include: `${ICARD},iCard.user`
      }, IUSE));
    },
    stop: async (data, handleView) => {
      const id = data.objectId;
      const param = {
        statu: 'stop',
        // cycle,
      };
      const lParams = classUpdate(IUSE, id, param);
      const res = await dispatch(req(lParams, Archive));
      const entity = {
        ...param,
        ...res,
      };

      dispatch(addNormalizrEntity(IUSE, entity));
      handleView && await handleView.remove();
      await dispatch(claerByID(IUSE, id));
      handleView && await handleView.reset();
      // handleView && await handleView.fadeIn(100)
      return res;
    },
    delete: async (objectId, handleView, isFb) => {
      // await remove(objectId,IUSE)
      // 做伪删除

      if (isFb) {
        Alert.alert('主人，我正参与副本活动，不可以被删除哦～！', '等活动结束后再来吧。', [{ text: '知道了' }]);
        return;
      }


      Alert.alert(
        '确定删除?',
        '删除后不可恢复~！',
        [{ text: '取消' }, {
          text: '确定',
          onPress: async () => {
            const param = {
              statu: 'del'
            };
            const res = await dispatch(update(objectId, param, IUSE));
            const entity = {
              ...param,
              ...res
            };
            dispatch(addNormalizrEntity(IUSE, entity));
            handleView && await handleView.remove();
            await dispatch(claerByID(IUSE, objectId));
            await dispatch(claerByID(IRECORD, objectId));
            handleView && await handleView.reset();
            return res;
          }
        }]
      );
    },

  })
)
export default class Habit extends PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      openIndex: -1,
    };
  }

  static propTypes = {};

  static defaultProps = {};


  static navigationOptions = // const { navigation } = props;
                             // const { state } = navigation;
                             // const { params } = state;
                             // console.log('test:', params,localLoad);
                             props => ({
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
                             })
  ;

  __renderNoData = (statu) => {
    const refreshLoad = statu === 'LIST_FIRST_JOIN' || statu === 'LIST_LOAD_DATA';
    return (
      <ExceptionView
        style={{ height: Dimensions.get('window').height / 2 }}
        exceptionType={refreshLoad
          ? ExceptionType.Loading : ExceptionType.NoData}
        tipBtnText="添加卡片"
        refresh={refreshLoad}
        prompt={refreshLoad ? '正在加载' : '暂无数据'}
        onRefresh={() => {
          this.props.navigation.navigate('newCard');
        }}
      />
    );
  }


  _renderSwipeOutDeleteBtn = (title, color, name, CMP = StyledIcon) => (
    <StyledDeleteBtn>
      <CMP size={25} color={color} name={name} />
      <StyledDeleteBtnText color={color}>
        {title}
      </StyledDeleteBtnText>
    </StyledDeleteBtn>
  )


  handleViewRef = {}

  swipeRefs = {}

  __renderItem = ({ item, index }) => {
    const self = this;
    // if (item === -1) {
    //     return <StopCell title='查看已归档的卡片'
    //                      des='重新打卡点这里'
    //                      onPress={() => {
    //                          this.props.navigation.navigate('Record',
    //                              { statu: 'stop' })
    //                      }}/>
    // }

    const data = this.props.iUse.get(item).toJS();

    // console.log('data:', data);
    const iCardId = data[ICARD];
    const iCard = this.props.iCard.get(iCardId);
    const isSelf = iCard.get('user') === this.props.user.objectId;

    return (
      <AnimationRow
        useNativeDriver
        ref={res => this.handleViewRef[`habit${index}`] = res}
      >
        <AppleStyleSwipeableRow
          // rowID={index}
          // autoClose={true}
          ref={(ref) => {
            this.swipeRefs[`swipe${index}`] = ref;
          }}
          backgroundColor="white"
          // close={this.state.openIndex !== index}
          onSwipeableWillOpen={() => {
            const { openIndex } = this.state;
            if (index === openIndex) {
              return;
            }
            if (openIndex !== -1) {
              const swipeRef = this.swipeRefs[`swipe${openIndex}`];
              swipeRef && swipeRef.close();
            }
            this.setState({ openIndex: index });
          }}
          onSwipeableWillClose={() => {
            // rowId === this.state.openIndex &&
            if (index === this.state.openIndex) {
              this.setState({ openIndex: -1 });
            }
          }}
          right={[isSelf ? {
            type: 'secondary',
            onPress: () => {
              this.props.navigation.navigate('cardConfig', { iCardId });
              // this.setState({ openIndex: -1 })
            },
            component: this._renderSwipeOutDeleteBtn('设置', '#388e3c', 'settings'),
            backgroundColor: '#fdfbfb'
          } : {
            type: 'secondary',
            onPress: () => {
              // this.props.navigation.navigate('cardSetting',
              //   { iCardId, iUseId: item })
              this.props.navigation.navigate('cardInfo',
                { iCardId });
              // this.setState({ openIndex: -1 })
            },
            component: this._renderSwipeOutDeleteBtn('查看', '#388e3c', 'info'),
            backgroundColor: '#fdfbfb'
          }, {
            type: 'delete',
            onPress: () => {
              // this.setState({ openIndex: -1 })
              const handleView = self.handleViewRef[`habit${index}`];
              this.props.delete(item, handleView, data.isFb);
            },
            component: this._renderSwipeOutDeleteBtn('删除', '#f44336', 'delete', StyledAntDesign),
            backgroundColor: '#fdfbfb'
          }, {
            type: 'primary',
            onPress: async () => {
              // this.setState({ openIndex: -1 })
              const handleView = self.handleViewRef[`habit${index}`];
              await this.props.stop(data, handleView);
              // await self.handleViewRef['habit' + index].fadeOutLeft(800)
              // handleView && self.handleViewRef['habit' + index].fadeInUp(800)
            },
            component: this._renderSwipeOutDeleteBtn('暂停', '#009afb', 'pause'),
            backgroundColor: '#fdfbfb'
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
              });
            }}
            data={data}
            iCard={iCard.toJS()}
          />
        </AppleStyleSwipeableRow>
      </AnimationRow>
    );
  }


  _keyExtractor = (item, index) => {
    const key = item || index;
    return `${key}`;
  }


  _renderHeader = () => (
    <StyledHeader>
      <StyledHeaderTitle>
          日常习惯
      </StyledHeaderTitle>
    </StyledHeader>
  )

  render(): ReactElement<any> {
    const statu = this.props.data.get('loadStatu');

    let data = this.props.data.get('listData');
    data = data && data.toJS();
    // data = data.sort((a,b)=> a.time - b.time)

    return (
      <StyledInnerdContent>
        {/* <StyledContent */}
        {/* style={this.props.style}> */}

        {/* {this._renderHeader()} */}

        <FlatList
          scrollEnabled={this.state.openIndex === -1}
          refreshing={false}
          onRefresh={() => {
            this.setState({ openIndex: -1 });
            this.props.search();
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
          ListFooterComponent={data.length > 0 && <View style={{ height: 100 }} />}
          ListEmptyComponent={() => this.__renderNoData(statu)}
        />

      </StyledInnerdContent>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // overflow: 'hidden', 会影响ListEmptyComponent
  },
});
