/**
 * Created by lintong on 2018/4/12.
 * @flow
 */
'use strict';

import React, { FC } from 'react';
import Avatar from '../../../components/Avatar/Avatar2';

import {
  StyledRowContent,
  StyledInnerView,
  StyledInnerRight,
  StyledName,
  StyledArrow,
  StyledDiscrib,
} from './style';

import moment from 'moment';
import { UserType } from 'src/data/data-context/interface';
import { ButtonType } from '@components/Button';

interface FollowRowProps extends ButtonType {
  user: UserType;
}

const FollowRow: FC<FollowRowProps> = (props) => {
  const { user, ...rest } = props;
  const { nickname, createdAt } = user;

  const name = nickname || '路人甲';
  return (
    <StyledRowContent {...rest}>
      <StyledInnerView>
        <Avatar user={user} />
        <StyledInnerRight>
          <StyledName>{name}</StyledName>
          <StyledDiscrib>
            加入时间:{moment(createdAt).format('YYYY-MM-DD')}
          </StyledDiscrib>
        </StyledInnerRight>
      </StyledInnerView>
      <StyledArrow />
    </StyledRowContent>
  );
};

export default FollowRow;
