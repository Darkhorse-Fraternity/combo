/**
 * Created by lintong on 2017/7/14.
 * @flow
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import * as immutable from 'immutable';
import * as Animatable from 'react-native-animatable';
import LCList from '../../components/Base/LCList';
import { IRECORD, ICARD, IUSE } from '../../redux/reqKeys';
import { selfUser } from '../../request/LCModle';
import { update } from '../../redux/module/leancloud';

import CardRow from '../Habit/Cell';
import {
  StyledContent,
  StyledHeader,
  StyledHeaderTitle,
  StyledIcon,
  StyledDeleteBtn,
  StyledDeleteBtnText,
  StyledAntDesign
} from './style';

import { claerByID, addListNormalizrEntity } from '../../redux/actions/list';
import { addNormalizrEntity } from '../../redux/module/normalizr';
import { classUpdate } from '../../request/leanCloud';
import { req } from '../../redux/actions/req';
import AppleStyleSwipeableRow from '../../components/Swipeable';
import AnimationRow from '../../components/AnimationRow';


const Archive = `${IUSE}archive`;


@connect(
  state => ({
    data: state.list.get(IRECORD),
    iCard: state.normalizr.get(ICARD),
    user: state.user.data,
  }),
  dispatch => ({
    refresh: async (data, handleView) => {
      const id = data.objectId;
      // const card = props.route.params.iCard

      // const isDone = data.time % card.period === 0

      const param = {
        // time: isDone ? 0 : data.time,
        statu: 'start',
        // cycle: isDone ? data.cycle + 1 : data.cycle,
      };


      const lParams = classUpdate(IUSE, id, param);
      const res = await dispatch(req(lParams, Archive));
      const entity = {
        ...param,
        ...res,
      };
      handleView && await handleView.remove();
      dispatch(addListNormalizrEntity(IUSE, entity));
      await dispatch(claerByID(IRECORD, id));
      handleView && await handleView.reset();
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
            handleView && await handleView.remove();
            dispatch(addNormalizrEntity(IUSE, entity));
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

export default class Record extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      openIndex: -1,
      scrollEnabled: true
    };
  }

  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = props =>
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    ({
      // title: '我的记录',
    })
  ;

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return !immutable.is(this.props, nextProps) || !immutable.is(this.state, nextState);
  }


  _renderHeader = () => (
    <StyledHeader>
      <StyledHeaderTitle>
          已暂停习惯
      </StyledHeaderTitle>
    </StyledHeader>
  )

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

  renderRow = ({ item, index }: Object) => {
    // md-refresh
    const self = this;
    const iCardId = item[ICARD];
    const card = this.props.iCard.get(iCardId);
    const iCard = card && card.toJS();
    // console.log('test:', item);

    if (!iCard) {
      console.log('iCardId:', iCardId, iCard);
      return <View />;
    }
    // const days = item.time
    // const reflesh = item.time === iCard.period || item.statu === 'stop'
    // const cycle = parseInt(item.time / iCard.period)
    const { user } = iCard;
    const isSelf = user === this.props.user.objectId;

    return (
      <AnimationRow
        useNativeDriver
        ref={res => this.handleViewRef[`habit${index}`] = res}
      >
        <AppleStyleSwipeableRow
          ref={(ref) => {
            this.swipeRefs[`swipe${index}`] = ref;
          }}
          backgroundColor="white"
          close={this.state.openIndex !== index}
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
              // this._deleteRow(item)
            },
            component: this._renderSwipeOutDeleteBtn('设置', '#388e3c', 'settings'),
            backgroundColor: '#fdfbfb'
          } : {
            type: 'secondary',
            onPress: () => {
              this.props.navigation.navigate('cardInfo',
                { iCardId });
              // this.setState({ openIndex: -1 })
              // this._deleteRow(item)
            },
            component: this._renderSwipeOutDeleteBtn('查看', '#388e3c', 'info'),
            backgroundColor: '#fdfbfb'
          }, {
            type: 'delete',
            onPress: () => {
              // this._deleteRow(item)
              const handleView = self.handleViewRef[`habit${index}`];
              this.props.delete(item.objectId, handleView, item.isFb);

              // this.setState({ openIndex: -1 })
            },
            component: this._renderSwipeOutDeleteBtn('删除', '#f44336', 'delete', StyledAntDesign),
            backgroundColor: '#fdfbfb'
          }, {
            type: 'primary',
            onPress: () => {
              // this._deleteRow(item)
              const handleView = self.handleViewRef[`habit${index}`];
              this.props.refresh(item, handleView);
              // this.setState({ openIndex: -1 })
            },
            component: this._renderSwipeOutDeleteBtn('恢复', '#009afb', 'refresh-ccw'),
            backgroundColor: '#fdfbfb'
          }]}
        >

          <CardRow
            data={item}
            iCard={iCard}
            onPress={() => {
              this.props.navigation.navigate('card', {
                iUseId: item.objectId,
                iCardId: iCard.objectId
              });
            }}
          />
        </AppleStyleSwipeableRow>
      </AnimationRow>
    );
  }

  render() {
    const { navigation,route } = this.props;
    const { dispatch } = navigation;
    const { params } = route;
    const statu = !!params ? params.statu : { $ne: 'del' };
    // const statu =  { $ne: 'del' };
    const param = {
      // where: {
      //   ...dispatch(selfUser()),
      //   statu,
      // },
      // include: ICARD,
      statu
    };
    return (
      <StyledContent forceInset={{ top: 'never' }}>
        <LCList
          scrollEnabled={this.state.openIndex === -1}
          ListHeaderComponent={this._renderHeader}
          style={[this.props.style, styles.list]}
          reqKey={IUSE}
          sKey={IRECORD}
          renderItem={this.renderRow}
          dataMap={(data) => {
            // console.log('data', data);

            return { results: data.result.iUseList };
          }}
          callPath="iUseList2"
          reqParam={param}
        />
      </StyledContent>
    );
  }
}


const styles = StyleSheet.create({
  list: {
    flex: 1,
    overflow: 'hidden',
  }
});
