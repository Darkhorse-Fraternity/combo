/**
 * Created by lintong on 2018/9/29.
 * @flow
 */

import { createPropsGetter } from '@components/create-props-getter';
import React, { PureComponent } from 'react';
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
            backgroundColor: 'red'
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

