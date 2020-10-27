/**
 * Created by lintong on 2018/8/17.
 * @flow
 */

import React, { PureComponent } from 'react';
import { Provider as ContextProvide } from './index';
import { connect } from 'react-redux';

@connect((state) => ({
  user: state.user.data,
}))
class Provider extends PureComponent<{ user?: any }> {
  render() {
    return (
      <ContextProvide initialState={{ user: this.props.user }}>
        {this.props.children}
      </ContextProvide>
    );
  }
}

export default Provider;
