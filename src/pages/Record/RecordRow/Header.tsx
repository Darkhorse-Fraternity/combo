/**
 * Created by lintong on 2018/7/27.
 * @flow
 */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from '../../../components/Avatar/Avatar2';

import Button from '../../../components/Button';
import { UserType } from 'src/data/data-context';

interface HeaderProps {
  user: UserType;
  onPress: () => void;
}

export default class Header extends PureComponent<HeaderProps> {
  render() {
    let { onPress, user } = this.props;
    return (
      <View style={styles.header}>
        <Button onPress={onPress} style={styles.top}>
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
