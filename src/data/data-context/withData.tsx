import React, { useContext } from 'react';

import { DataContext } from './index';
import { Action, StateType } from './interface';

const withData = <T extends { dispatch: React.Dispatch<Action> }>(
  WrappedComponent: React.ComponentType<T>,
) => (
  mapStateToProps: (data: StateType, props?: T) => {},
  mapDispatchToProps?: (dispatch: React.Dispatch<Action>, props: T) => {},
): React.ComponentType<never> => {
  const Mapper = (props: T) => {
    const { data, dispatch } = useContext(DataContext);

    let stateProps = {};
    if (mapStateToProps) {
      stateProps = mapStateToProps(data, props);
    }

    let dispatchProps = {};
    if (mapDispatchToProps) {
      dispatchProps = mapDispatchToProps(dispatch, props);
    } else {
      dispatchProps = { dispatch };
    }

    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
  };
  return Mapper;
};

export default withData;
