/**
 * Created by lintong on 2018/7/27.
 * @flow
 */

import React, { PureComponent } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar/Avatar2';

import Button from '../../../components/Button';

@connect(
  (state, props) => ({
    user: state.normalizr.get('user').get(props.userId),
  }),
  (dispatch) => ({}),
)
export default class Header extends PureComponent {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {
    userId: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  };

  static defaultProps = {};

  render() {
    let { onPress, user } = this.props;
    user = (user && user.toJS()) || {};

    // 缩略图
    return (
      <View style={styles.header}>
        <Button onPress={() => onPress && onPress(user)} style={styles.top}>
          <Avatar radius={20} user={user} />
          <Text style={styles.name}>{user.nickname || '路人甲'}</Text>
        </Button>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  top: {
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  name: {
    marginLeft: 10,
  },
});
