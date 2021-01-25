/*
 * @Author: tonyYo
 * @Date: 2021-01-06 16:44:48
 * @LastEditors: tonyYo
 * @LastEditTime: 2021-01-25 14:44:11
 * @FilePath: /Combo/src/pages/Publish/CirlcleSetting/render.tsx
 */
import React, { FC } from 'react';

import {
  StyledContent,
  StyledHeaderButton,
  StyledHeaderImage,
  StyledHeaderText,
} from './style';

import {
  useNavigationAllParamsWithType,
  useNavigationWithType,
} from '@components/Nav/hook';
import { RouteKey } from '@pages/interface';
import { ImageSourcePropType, TouchableOpacityProps } from 'react-native';

// interface iCardType {
//   objectId?: string;
// }

const MenuItem: FC<
  TouchableOpacityProps & { title: string; source: ImageSourcePropType }
> = ({ title, source, ...other }) => {
  return (
    <StyledHeaderButton
      style={{ marginLeft: 0 }}
      hitSlop={{
        top: 5,
        left: 10,
        bottom: 5,
        right: 10,
      }}
      {...other}>
      <StyledHeaderImage source={source} />
      <StyledHeaderText>{title}</StyledHeaderText>
    </StyledHeaderButton>
  );
};

const Render = (): JSX.Element => {
  const { iCardId } = useNavigationAllParamsWithType<RouteKey.cirlcleSetting>();
  const { navigate } = useNavigationWithType();

  return (
    <StyledContent>
      {__DEV__ && (
        <MenuItem
          title={'副本创建'}
          source={require('../../../../source/img/circle/fire.png')}
          onPress={() => {
            navigate(RouteKey.flagCreat, {
              iCardId: iCardId,
            });
          }}
        />
      )}
      <MenuItem
        title={'加入限制'}
        source={require('../../../../source/img/circle/password.png')}
        onPress={() => {
          navigate(RouteKey.joinSetting, {
            iCardId: iCardId,
          });
        }}
      />
    </StyledContent>
  );
};

export default Render;
