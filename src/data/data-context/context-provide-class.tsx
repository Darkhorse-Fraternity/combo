/**
 * Created by lintong on 2018/8/17.
 * @flow
 */

import React, { PureComponent } from 'react';
import { Provider as ContextProvide, UserType } from './index';
import { connect } from 'react-redux';
import { GetUsersIdResponse } from 'src/hooks/interface';

@connect((state) => ({
  user: state.user.data,
}))
class Provider extends PureComponent<{ user?: GetUsersIdResponse }> {
  render() {
    return (
      <ContextProvide
        initialState={{
          user: {
            ...this.props.user!,
            isTourist: !!this.props.user?.authData?.anonymous?.id,
          },
        }}>
        {this.props.children}
      </ContextProvide>
    );
  }
}

export default Provider;
