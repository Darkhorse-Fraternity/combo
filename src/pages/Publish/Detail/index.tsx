/**
 * Created by lintong on 2017/9/26.
 * @flow
 */

import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { ICARD, IUSEExist, IUSE } from '../../../redux/reqKeys';
import { addNormalizrEntity } from '../../../redux/module/normalizr';
import { update, add } from '../../../redux/module/leancloud';

import { existSearch } from '../../../request/leanCloud';
import { selfUser, iCard } from '../../../request/LCModle';
import { req, reqChangeData } from '../../../redux/actions/req';
import { addListNormalizrEntity, claerByID } from '../../../redux/actions/list';
import { StyledContent, StyledHeaderBtn } from './style';

import Button from '../../../components/Button/index';
// static displayName = PublishDetail
@connect(
  (state, props) => ({
    // data:state.req.get()
    iCard: state.normalizr.get(ICARD).get(props.route.params.iCardID),
    // useExist: state.req.get(IUSEExist),
    load: state.req.get(IUSE).get('load'),
  }),
  (dispatch, props) => ({
    // ...bindActionCreators({},dispatch),
    refresh: async (data) => {
      const id = data.objectId;
      const param = {
        state: -1,
      };

      const res = await dispatch(update(id, param, ICARD));

      const entity = {
        ...param,
        ...res,
      };
      dispatch(addNormalizrEntity(ICARD, entity));
      dispatch(claerByID(ICARD, id));
      props.navigation.goBack();
    },
    exist: async () => {
      const id = props.route.params.iCardID;
      const params = existSearch(IUSE, {
        where: {
          ...iCard(id),
          ...dispatch(selfUser()),
          statu: { $ne: 'del' },
        },
      });
      dispatch(req(params, IUSEExist));
    },
    add: async (useNum = 0) => {
      const id = props.route.params.iCardID;
      const param = {
        // cycle: 0,
        time: 0,
        // notifyTime:option&&option.notifyTime||"20.00",
        doneDate: { __type: 'Date', iso: moment('2017-03-20') },
        ...dispatch(selfUser()),
        ...iCard(id),
      };
      const res = await dispatch(add(param, IUSE));
      const entity = {
        ...param,
        ...res,
      };
      dispatch(addListNormalizrEntity(IUSE, entity));
      dispatch(
        addNormalizrEntity(ICARD, {
          objectId: id,
          useNum: useNum + 1,
        }),
      );
      dispatch(
        reqChangeData(IUSEExist, {
          results: {
            results: [],
            count: 1,
          },
        }),
      );
    },
  }),
)
export default class PublishDetail extends Component {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {};

  static defaultProps = {};

  static navigationOptions = (props) =>
    // const {navigation} = props;
    // const {state} = navigation;
    // const {params} = state;
    ({
      // title: params.title,
    });

  shouldComponentUpdate(nextProps: Object) {
    return !immutable.is(this.props, nextProps);
  }

  componentDidMount() {
    // this.props.exist()
  }

  __alert = (iCard) => {
    Alert.alert('确定删除?', '删除后不可恢复', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.props.refresh(iCard);
        },
      },
    ]);
  };

  _renderHeader = (iCard) => (
    // const useExist = this.props.useExist.toJS().data
    // const exist = useExist.count >= 1
    // const load = this.props.useExist.get('load')
    // // console.log('useExist:', this.props.useExist.get('load'));
    // const text = exist ? "正在使用" : '立即使用'
    // console.log('iCard:', iCard);
    <View style={styles.header}>
      <Text style={styles.title}>{iCard.title}</Text>
      <View style={styles.headerIn}>
        <Text style={styles.useNum}>使用人数： {iCard.useNum || 1}</Text>
        <StyledHeaderBtn
          backgroundColor={iCard.iconAndColor && iCard.iconAndColor.color}
          // load={this.props.load || load}
          // disabled={exist}
          title="查看"
          onPress={() => {
            this.props.navigation.navigate('cardInfo', {
              iCardId: iCard.objectId,
            });
          }}
        />
      </View>
    </View>
  );

  _renderRow(title: string, onPress: Function = () => {}) {
    return (
      <Button onPress={onPress} style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.rowText}>{title}</Text>
        </View>
        {/* <View style={styles.row2}> */}
        {/* <View style={styles.arrowView}/> */}
        {/* </View> */}
      </Button>
    );
  }

  render() {
    const { navigation } = this.props;
    const iCard = this.props.iCard.toJS();

    // 当为-2 时候，则为系统禁止
    const allow = iCard.state !== -2;
    return (
      <StyledContent style={[this.props.style, styles.wrap]}>
        {this._renderHeader(iCard)}

        {!allow && (
          <Text style={{ padding: 20, color: 'red', fontSize: 50 }}>
            该圈子已被系统删除
          </Text>
        )}

        {/* {this._renderRow(iCard.state === 0 ? "马上发布" : '取消发布', () => { */}
        {/* if (iCard.state === 0) { */}
        {/* this.props.refresh(iCard) */}
        {/* } else { */}
        {/* this.__alert(iCard) */}
        {/* } */}
        {/* })} */}

        {allow &&
          this._renderRow('圈子设置', () => {
            navigation.navigate('cirlcleSetting', {
              iCardID: route.iCardID,
            });
          })}
        {/* {allow && this._renderRow('发布课程', () => { */}
        {/* navigation.navigate('courseRelease', */}
        {/* { iCardID: route.iCardID }) */}
        {/* })} */}

        {allow &&
          this._renderRow('卡片配置', () => {
            navigation.navigate('cardConfig', { iCardId: iCard.objectId });
          })}

        {/* {this._renderRow('删除圈子', () => { */}
        {/* //伪删除 */}
        {/* this.__alert(iCard) */}
        {/* })} */}
      </StyledContent>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
    // flexDirection: 'row'
  },
  header: {
    padding: 25,
  },
  headerIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  useNum: {
    marginTop: 10,
    fontSize: 15,
    color: 'rgb(50,50,50)',
  },

  row: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#e4e4e4',
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowText: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '500',
    // color: 'rgb(100,100,100)',
  },
  arrowView: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderRightWidth: StyleSheet.hairlineWidth * 2,
    borderColor: '#8c8c85',
    transform: [{ rotate: '315deg' }],
    marginRight: 5,
    width: 10,
    height: 10,
  },
});