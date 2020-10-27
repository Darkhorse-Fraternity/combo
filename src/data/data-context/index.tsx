import React, { createContext, useReducer, FC, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { GetUsersIdResponse } from 'src/hooks/interface';
// import { setHeader } from '../../../local_modules/react-native-qj-fetch/config';
// import { GetMemberLoginByCodeResponse } from 'req';
// export type UserType = NonNullable<GetMemberLoginByCodeResponse['datas']>;
export interface UserType extends GetUsersIdResponse {}

export interface StateType {
  user: UserType | undefined;
}
export type Action =
  | { type: 'login'; user: UserType }
  | { type: 'update_user_info'; user: UserType }
  | { type: 'logout' }
  | { type: 'init' };

interface DataContextType {
  config?: any;
  initialState?: StateType;
}

export interface BaseProviderValueType {
  data: StateType;
  dispatch: React.Dispatch<Action>;
}

let user: UserType | undefined;

const defaultInitialState: StateType = {
  user: user,
};

//   console.log('
export const DataContextInit = () => {
  return AsyncStorage.getItem('sessionToken').then((userString) => {
    if (userString) {
      defaultInitialState.user = JSON.parse(userString);
      // setHeader({
      //   Authorization: 'Bearer ' + defaultInitialState.user?.accessToken || '',
      // });
      //   user = defaultInitialState.user;
      //   console.log('user', user);
      //   defaultInitialState.user = user;
      //   dispatch({ type: 'login', user });
      //   setTimeout(() => {
      //     _dispatch({ type: 'login', user });
      //   }, 100);
    }
    return userString;
  });
};

export const DataContext = createContext<BaseProviderValueType>({
  data: defaultInitialState,
  dispatch: () => {},
});
const BaseProvider = DataContext.Provider;

interface CcontextValueT {
  data: typeof defaultInitialState;
  dispatch: React.Dispatch<Action>;
}
let contextValue: CcontextValueT = {
  data: defaultInitialState,
  dispatch: () => {},
};
export const Provider: FC<DataContextType> = (props) => {
  const { children, initialState = defaultInitialState } = props;

  const dataReducer = (preState: StateType, action: Action) => {
    console.log('action.type', action.type);

    switch (action.type) {
      case 'login':
        // AsyncStorage.setItem('sessionToken', JSON.stringify(action.user));

        // setHeader({ Authorization: 'Bearer ' + action.user.accessToken || '' });
        // user = action.user;
        return { ...preState, user: action.user };
      case 'update_user_info': {
        return { ...preState, user: action.user };
      }
      case 'logout':
        // AsyncStorage.removeItem('sessionToken');
        // setHeader({ Authorization: '' });
        // user = undefined;
        return { ...preState, user: undefined };
      case 'init':
        return { ...preState };
      default:
        return { ...preState };
    }
  };

  const [data, _dispatch] = useReducer(dataReducer, initialState);

  // console.log('data000', data);
  // console.log('dataxxxx', initialState);

  contextValue = {
    data: data.user?.objectId ? data : { ...data, ...initialState },
    dispatch: _dispatch,
  };
  // console.log('initialState', contextValue.data);

  return <BaseProvider value={contextValue}>{children}</BaseProvider>;
};

export const { Consumer } = DataContext;

export default DataContext;

// export const useLoginState = () => {
//   const { data } = useContext(DataContext);
//   return !!data.user?.accessToken;
// };

export const useGetUserInfo = () => {
  const { data } = useContext(DataContext);
  return data.user;
};

export const getUerInfo = () => {
  return contextValue.data.user;
};

// export const getLoginState = () => {
//   return !!contextValue.data.user?.accessToken;
// };

export const getContextDispatch = () => {
  return contextValue.dispatch;
};
