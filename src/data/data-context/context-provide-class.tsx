/**
 * Created by lintong on 2018/8/17.
 * @flow
 */

import React, { Component } from 'react';
import { MemoProvider as ContextProvide } from './index';
import { connect } from 'react-redux';
import { UserType } from './interface';

@connect((state) => ({
  user: state.user.data,
}))
class Provider extends Component<{ user?: UserType }> {
  shouldComponentUpdate(nextProps: { user?: UserType }) {
    return nextProps.user?.objectId !== this.props.user?.objectId;
  }

  user = {
    ...this.props.user!,
    isTourist: !!this.props.user?.authData?.anonymous?.id,
  };

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

// export default Provider;
