/**
 * Created by lintong on 2018/9/29.
 * @flow
 */

import React, { FC, memo } from 'react';

import {
  StyledContent,
  StyledAvatar,
  StyledIndicator,
  StyledContent3,
} from './style';

import { add_Leancloud_Thumbnail_Suffix } from '../../../helps/util';
import { UserType } from 'src/data/data-context/interface';
import { useColorScheme } from 'react-native';

// 限定缩略图
// https://developer.qiniu.com/dora/manual/1279/basic-processing-images-imageview2
// ?imageView/1/w/10/h/10/q/100/format/png

interface AvatarType {
  radius?: number;
  load?: boolean;
  user: UserType;
}

const Avatar: FC<AvatarType> = (props) => {
  const { radius = 40, user, load = false } = props;

  const colorScheme = useColorScheme();
  const defaultImage =
    colorScheme === 'dark'
      ? require('../../../source/img/my/logo-dark.png')
      : require('../../../source/img/my/icon-60.png');

  const { avatar, headimgurl } = user;
  let avatarUrl = avatar ? avatar.url : headimgurl;
  avatarUrl = !avatarUrl
    ? avatarUrl
    : add_Leancloud_Thumbnail_Suffix(avatarUrl, radius * 8, radius * 8);
  const avatarSource = avatarUrl ? { uri: avatarUrl } : defaultImage;

  // console.log('avatarUrl:', avatarUrl);

  if (!avatarUrl) {
    return (
      <StyledContent3 radius={radius}>
        <StyledAvatar
          style={{ margin: 5 }}
          radius={radius * 0.75}
          source={avatarSource}
        />
      </StyledContent3>
    );
  }

  return (
    <StyledContent radius={radius}>
      {load ? (
        <StyledIndicator color={'grey'} radius={radius} />
      ) : (
        <StyledAvatar radius={radius} source={avatarSource} />
      )}
    </StyledContent>
  );
};

export default memo(Avatar);
