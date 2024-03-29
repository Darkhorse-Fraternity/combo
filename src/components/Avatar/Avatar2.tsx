/**
 * Created by lintong on 2018/9/29.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';

import { StyledContent2, StyledAvatar, StyledIndicator } from './style';
import { add_Leancloud_Thumbnail_Suffix } from '../../../helps/util';
import { UserType } from 'src/data/data-context/interface';
import { StyleProp, ViewStyle } from 'react-native';
// 限定缩略图
// https://developer.qiniu.com/dora/manual/1279/basic-processing-images-imageview2
//?imageView/1/w/10/h/10/q/100/format/png

interface AvatarType {
  radius?: number;
  load?: boolean;
  user: UserType;
  style?: StyleProp<ViewStyle>;
}

export default class Avatar extends PureComponent<AvatarType> {
  constructor(props: AvatarType) {
    super(props);
  }

  static defaultProps = {
    type: 'small',
    radius: 30,
    load: false,
  };

  render() {
    const { radius, user, load, style } = this.props;

    const { avatar, headimgurl } = user;
    let avatarUrl = avatar ? avatar.url : headimgurl;
    avatarUrl = !avatarUrl
      ? avatarUrl
      : add_Leancloud_Thumbnail_Suffix(avatarUrl, radius! * 3, radius! * 3);
    const avatarSource = avatarUrl
      ? { uri: avatarUrl }
      : require('../../../source/img/my/my_head.png');

    return (
      <StyledContent2 radius={radius!} style={style as never}>
        {load ? (
          <StyledIndicator radius={radius!} />
        ) : (
          <StyledAvatar radius={radius!} source={avatarSource} />
        )}
      </StyledContent2>
    );
  }
}
