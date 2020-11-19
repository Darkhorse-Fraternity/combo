/**
 * Created by lintong on 2017/8/31.
 * @flow
 */
'use strict';

import { LoadAnimation } from '@components/Load';
import { useNavigationAllParamsWithType } from '@components/Nav/hook';
import { DeviceEventEmitterKey } from '@configure/enum';
import { RouteKey } from '@pages/interface';
import { useNavigation } from '@react-navigation/native';
import TouchableItem from '@react-navigation/stack/src/views/TouchableItem';

import React, { FC, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useGetInfoOfMe } from 'src/data/data-context/user';
import {
  GetClassesICardIdResponse,
  useGetClassesIUseId,
} from 'src/hooks/interface';

import Statistical from '../../Card/Statistical';
// import NavBar from '../../../components/Nav/bar/NavBar';

import { StyledHeaderTitle, Styledcontain, StyledHeaderText } from './style';

const RecordDetail: FC<{}> = (porps) => {
  const { iUseId } = useNavigationAllParamsWithType<RouteKey.recordDetail>();
  const { data, run } = useGetClassesIUseId({ include: 'iCard', id: iUseId });
  const { setOptions, navigate } = useNavigation();
  const { user } = useGetInfoOfMe();
  const { iCard } = data || {};
  useEffect(() => {
    const deEmitter = DeviceEventEmitter.addListener(
      DeviceEventEmitterKey.iDO_reload,
      () => {
        run();
      },
    );
    return () => {
      deEmitter.remove();
    };
  }, [run]);

  useEffect(() => {
    if (iCard?.objectId && data?.user.objectId !== user.objectId) {
      const { color } = iCard.iconAndColor || { name: 'sun', color: '#fcd22f' };

      const headerRight = () => (
        <TouchableItem
          style={{
            marginRight: 20,
            backgroundColor: color,
            padding: 7,
            paddingHorizontal: 10,
            borderRadius: 8,
          }}
          onPress={() => {
            navigate('cardInfo', {
              iCardId: iCard?.objectId,
            });
          }}>
          {/* <StyledIcon size={20} color="black" name="search" /> */}

          <StyledHeaderText color={'black'}>加入</StyledHeaderText>
        </TouchableItem>
      );
      setOptions({ headerRight });
    }
  }, [data?.user.objectId, iCard, navigate, setOptions, user.objectId]);

  if (!data) {
    return <LoadAnimation />;
  }

  return (
    <Styledcontain>
      <StyledHeaderTitle>{iCard?.title}</StyledHeaderTitle>
      <Statistical
        iCard={iCard! as GetClassesICardIdResponse}
        iUse={data!}
        {...porps}
      />
    </Styledcontain>
  );
};

export default RecordDetail;
