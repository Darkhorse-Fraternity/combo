'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  PanResponder,
  Platform,
  View,
} from 'react-native';
import { doReceiveNotify } from '../../configure/push/pushReceive';
import * as Animatable from 'react-native-animatable';
import { dataStorage } from '../../redux/actions/util';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

@connect(
  (state) => ({
    notify: state.util.get('notify'),
  }),
  (dispatch) => ({
    hidden: () => {
      dispatch(dataStorage('notify', { show: false }));
    },
  }),
)
export default class InfoBar extends Component {
  static propTypes = {};

  static defaultProps = {
    notify: fromJS({ show: false }),
  };

  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };

    this.createPanResponder = this.createPanResponder.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.time && clearTimeout(this.time);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notify.get('show')) {
      //做一个定时器 5s后自定消失
      const duration = Platform.OS === ' ios' ? 10000 : 22000;
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.refs.aniView &&
          this.refs.aniView
            .fadeOutUp()
            .then((endState) => endState.finished && this.props.hidden());
      }, duration); //自动调用开始刷新 新增方法
      this.time = timer;
    }
  }

  createPanResponder() {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('test:', '');
        if (gestureState.dy > -10) {
          this.setState({ show: false });
          const notify = this.props.notify.get('notification').toJS();
          // console.log('广播111111111111','广播111111111111')
          doReceiveNotify(notify);
          this.props.hidden();
        } else {
          this.refs.aniView.fadeOutUp().then((endState) => {
            if (endState.finished) {
              this.props.hidden();
            }
          });
        }
      },
    });
  }

  render() {
    if (this.props.notify.get('show')) {
      const notify = this.props.notify.get('notification').toJS();
      const data = notify.data || {};
      console.log('notify:', notify);
      const message = notify.message;
      const title =
        Platform.OS === 'ios' && data.type !== 'local'
          ? message.title
          : data.title;
      const body =
        Platform.OS === 'ios' && data.type !== 'local'
          ? message.body
          : data.alert;

      const source = require('../../../source/img/my/icon-60.png');
      return (
        <Animatable.View
          ref="aniView"
          {...this.createPanResponder().panHandlers}
          animation="fadeInDown"
          style={styles.infoBar}>
          <Image source={source} style={styles.img} />
          <View>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.body}>
              {body}
            </Text>
          </View>
        </Animatable.View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  infoBar: {
    position: 'absolute',
    top: 25,
    backgroundColor: 'white',
    width: '90%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    flexDirection: 'row',
    // justifyContent:'center'
    alignItems: 'center',
    paddingBottom: 10,
    paddingVertical: 15,
    // paddingVertical:25,
    paddingHorizontal: 15,
    elevation: 3,
    alignSelf: 'center',
    borderRadius: 6,
  },

  img: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 13,
    marginTop: Platform.OS === 'ios' ? 5 : 2,
  },
});
