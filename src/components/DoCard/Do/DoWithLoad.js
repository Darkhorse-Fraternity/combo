import React, { Component } from 'react';
import { connect } from 'react-redux';
import DoView from './DoView';
import { IDO, IDOULIMAGE } from '../../../redux/reqKeys';
// static displayName =

@connect(
  state => ({
    load: state.req.get(IDO).get('load')
    || state.req.get(IDOULIMAGE).get('load')
  }),
)

export default class DoWithLoad extends Component {
  render() {
    return (
      <DoView {...this.props} />
    );
  }
}
