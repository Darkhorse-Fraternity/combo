/**
 * Created by lintong on 2018/7/27.
 * @flow
 */

import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Avatar from '../../../components/Avatar/Avatar2';

import Button from '../../../components/Button';
import { UserType } from 'src/data/data-context/interface';
import { StyledAntDesign, StyledName } from './style';
import { Privacy } from '@configure/enum';
import { RouteKey } from '@pages/interface';
import { useNavigation } from '@react-navigation/native';
import { useGetInfoOfMe } from 'src/data/data-context/user';

interface HeaderProps {
  user: UserType;
  onPress: () => void;
  privacy?: number;
  iUseId: string;
}

const Header: FC<HeaderProps> = (props) => {
  let { onPress, user, privacy = Privacy.open, iUseId } = props;
  const { navigate } = useNavigation();
  const { user: self } = useGetInfoOfMe();
  return (
    <View style={styles.header}>
      <Button onPress={onPress} style={styles.top}>
        <Avatar radius={20} user={user} />
        <StyledName>{user.nickname || '路人甲'}</StyledName>
      </Button>
      <View />
      {self.objectId === user.objectId && privacy !== Privacy.open && (
        <Button
          hitSlop={{ bottom: 15, left: 15 }}
          onPress={() =>
            navigate(RouteKey.recordPrivate, {
              iUseId,
            })
          }>
          <StyledAntDesign name={'lock1'} size={20} />
        </Button>
      )}
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
