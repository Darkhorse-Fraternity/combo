import React, {
  createContext,
  useReducer,
  FC,
  useContext,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { normalize, schema } from 'normalizr';
import {
  Action,
  BaseProviderValueType,
  DataContextType,
  iUseSceme,
  StateType,
  UserType,
} from './interface';
// import { GetMemberLoginByCodeResponse } from 'req';
// export type UserType = NonNullable<GetMemberLoginByCodeResponse['datas']>;

let user: UserType = { isTourist: true } as UserType;

const defaultInitialState: StateType = {
  user: user,
  iCards_self: {},
  iUses_self: { entities: {}, list: [] },
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
  const { children } = props;

  const dataReducer = useCallback((preState: StateType, action: Action) => {
    switch (action.type) {
      case 'login':
        // AsyncStorage.setItem('sessionToken', JSON.stringify(action.user));

        // setHeader({ Authorization: 'Bearer ' + action.user.accessToken || '' });
        // user = action.user;

        return {
          ...preState,
          user: {
            ...action.user,
            isTourist: !!action.user.authData?.anonymous?.id,
          },
        };
      case 'update_user_info': {
        return {
          ...preState,
          user: {
            ...action.user,
            isTourist: !!action.user.authData?.anonymous?.id,
          },
        };
      }
      case 'logout':
        // AsyncStorage.removeItem('sessionToken');
        // setHeader({ Authorization: '' });
        // user = undefined;
        return { ...preState, user: { isTourist: true } as UserType };
      case 'get_iUse': {
        const normalizedData = normalize(
          action.data,
          new schema.Array(iUseSceme),
        );
        const { entities, result } = normalizedData;
        const { iUse, iCard } = entities;
        // console.log('entities', entities.iUse);
        // console.log('result', result);

        return {
          ...preState,
          iUses_self: { entities: iUse || {}, list: result },
          iCards_self: iCard || {},
        };
      }
      case 'update_iUse': {
        // 先取出原来的值。
        const { iUses_self, iCards_self } = preState;
        const normalizedData = normalize(action.data, iUseSceme);
        const { entities, result } = normalizedData;
        const { iUse, iCard } = entities;
        const include = iUses_self.list.includes(result);
        return {
          ...preState,
          iUses_self: {
            entities: { ...iUses_self.entities, ...iUse },
            // result 如果已经含有，则不变，否则添加到第一个
            list: include
              ? preState.iUses_self.list
              : [result, ...preState.iUses_self.list],
          },
          iCards_self: { ...iCards_self, ...iCard },
        };
      }
      case 'update_iCard': {
        // 先取出原来的值。
        const { iCards_self } = preState;
        return {
          ...preState,
          iCards_self: { ...iCards_self, [action.data.objectId]: action.data },
        };
      }
      case 'remove_iUse': {
        const id = action.id;
        const list = preState.iUses_self.list;
        const index = list.indexOf(id);
        index > -1 ? list.splice(index, 1) : list;
        return {
          ...preState,
          iUses_self: {
            ...preState.iUses_self,
            list,
          },
        };
      }
      case 'init':
        return { ...preState };
      default:
        return { ...preState };
    }
  }, []);

  const [data, _dispatch] = useReducer(dataReducer, defaultInitialState);

  // console.log('data000', data);
  // console.log('dataxxxx', initialState);

  contextValue = {
    data: data,
    dispatch: _dispatch,
  };
  // contextValue.data = data;
  // contextValue.dispatch = _dispatch;
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

export const getContextDispatch = () => {
  return contextValue.dispatch;
};
