import React, { createContext, useReducer, FC, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GetUsersIdResponse,
  GetClassesIUseResponse,
  GetClassesIUseIdResponse,
  GetClassesICardIdResponse,
  PostCallCardListResponse,
  // GetClassesICardResponse,
} from 'src/hooks/interface';
import { entity } from '@redux/scemes';
import { ICARD, IUSE } from '@redux/reqKeys';
import { normalize } from 'normalizr';
// import { setHeader } from '../../../local_modules/react-native-qj-fetch/config';
// import { GetMemberLoginByCodeResponse } from 'req';
// export type UserType = NonNullable<GetMemberLoginByCodeResponse['datas']>;

type ICardType = NonNullable<PostCallCardListResponse['result']>[number];
type IUseType = NonNullable<GetClassesIUseResponse['results']>[number];
type IUseNomType = Omit<IUseType, 'iCard'> & { iCard: string };
type IUseNom2Type = Omit<GetClassesIUseIdResponse, 'iCard'> & { iCard: string };

const iCardSceme = entity<GetClassesICardIdResponse>(ICARD);
const iUseSceme = entity<GetClassesIUseIdResponse>(IUSE, { iCard: iCardSceme });

export interface UserType extends GetUsersIdResponse {
  isTourist: boolean;
  // isLogin: boolean;
}

export interface StateType {
  user: UserType;
  iCards_self: {
    [key: string]:
      | {
          [key: string]: GetClassesICardIdResponse;
        }
      | undefined;
  }; // user 为自己的iCard
  iUses_self: {
    [key: string]:
      | {
          [key: string]: GetClassesIUseIdResponse;
        }
      | undefined;
  }; // user 为自己的iUse
}
export type Action =
  | {
      type: 'updata_iUse';
      data:
        | IUseType[]
        | GetClassesIUseIdResponse[]
        | IUseType
        | GetClassesIUseIdResponse;
    }
  | { type: 'login'; user: GetUsersIdResponse }
  | { type: 'update_user_info'; user: GetUsersIdResponse }
  | { type: 'logout' }
  | { type: 'init' };

interface DataContextType {
  config?: unknown;
  initialState?: StateType;
}

export interface BaseProviderValueType {
  data: StateType;
  dispatch: React.Dispatch<Action>;
}

let user: UserType = { isTourist: true } as UserType;

const defaultInitialState: StateType = {
  user: user,
  iCards_self: {},
  iUses_self: {},
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
      case 'updata_iUse': {
        const normalizedData = normalize(action.data, iUseSceme);
        const { entities, result } = normalizedData;
        console.log('entities', entities);
        console.log('result', result);

        return { ...preState, iUses: {}, iCards: {} };
      }
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
