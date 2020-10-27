/**
 * Created by lintong on 2018/4/12.
 * @flow
 */
'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar/Avatar2'

import {
  StyledRowContent,
  StyledInnerView,
  StyledInnerRight,
  StyledName,
  StyledArrow,
  StyledDiscrib
} from './style'

import moment from 'moment'


export default class FollowRow extends PureComponent {
  constructor(props: Object) {
    super(props);

  }

  static propTypes = {
    user: PropTypes.object.isRequired
  };
  static defaultProps = {};



  render() {

    const { user, onPress } = this.props
    const { nickname, createdAt } = user


    const name = nickname || '路人甲'
    return (
      <StyledRowContent onPress={onPress}>
        <StyledInnerView>
          <Avatar user={user} />
          <StyledInnerRight>
            <StyledName>
              {name}
            </StyledName>
            <StyledDiscrib>
              加入时间:{moment(createdAt).format("YYYY-MM-DD")}
            </StyledDiscrib>
          </StyledInnerRight>
        </StyledInnerView>
        <StyledArrow />
      </StyledRowContent>
    );
  }
}


