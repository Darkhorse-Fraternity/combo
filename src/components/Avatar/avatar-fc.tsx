/**
 * Created by lintong on 2018/9/29.
 * @flow
 */

import { createPropsGetter } from '@components/create-props-getter';
import { add_Leancloud_Thumbnail_Suffix } from '@helps/util';
import React, { FC, PureComponent } from 'react';
import { Image, Platform, ImageProps } from 'react-native';
// import { createPropsGetter } from '../CreatePropsGetter';

// interface AvatarProps extends ImageProps {
//   readonly radius?: 30;
//   readonly uri: string;
// }

export type AvatarProps = ImageProps & {
  readonly radius?: number;
} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {
  radius: 30,
};

const getProps = createPropsGetter(defaultProps);

export default class Avatar extends PureComponent<AvatarProps> {
  static defaultProps = defaultProps;

  render() {
    const { radius, style, ...other } = getProps(this.props);


    return (
      <Image
        // placeholderStyle={[
        //   {width: radius, height: radius, borderRadius: radius / 2},
        // ]}
        style={[
          {
            width: radius,
            height: radius,
            borderRadius: radius / 2,
            resizeMode: Platform.OS === 'ios' ? 'stretch' : 'cover',
            // backgroundColor: 'red'
          },
          style,
        ]}
        // borderRadius={radius / 2}
        defaultSource={require('../../../source/img/my/avatar.png')}
        {...other}
      />
    );
  }
}

interface AvatarUrlProps extends Omit<AvatarProps, 'source'> {
  url: string
}

export const AvatarUrl: FC<AvatarUrlProps> = (props) => {
  const { url, radius = defaultProps.radius, ...ohter } = props;
  const avatarUrl = add_Leancloud_Thumbnail_Suffix(url, radius * 3, radius * 3)
  return <Avatar {...ohter} radius={radius} source={{ uri: avatarUrl }} />
}

interface AvatarAutoProps extends Omit<AvatarProps, 'source'> {
  headimgurl: string,
  avatarUrl: string;
}

export const AvatarAuto: FC<AvatarAutoProps> = (props) => {
  const { avatarUrl, radius, headimgurl, ...ohter } = props;
  if (avatarUrl && avatarUrl.length > 0) {
    return <AvatarUrl url={avatarUrl} {...ohter} />
  }

  const avatarSource = headimgurl ? { uri: headimgurl } :
    require('../../../source/img/my/my_head.png')

  return <Avatar {...ohter} source={avatarSource} />
}