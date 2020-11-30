import {
  GetClassesICardIdResponse,
  GetClassesICardResponse,
  GetClassesIUseIdResponse,
  GetClassesIUseResponse,
  // GetUsersIdResponse,
  GetUsersMeResponse,
  PostCallCardListResponse,
  PostCallIUseList3Response,
} from 'src/hooks/interface';
import { ICARD, IUSE } from '@redux/reqKeys';
import { entity } from '@redux/scemes';
export type ICardType = NonNullable<PostCallCardListResponse['result']>[number];
export type ICardType2 = NonNullable<
  GetClassesICardResponse['results']
>[number];
export type IUseType = NonNullable<
  NonNullable<PostCallIUseList3Response['result']>['iUseList']
>[number];
export type IUseType2 = NonNullable<GetClassesIUseResponse['results']>[number];
// type IUseNomType = Omit<IUseType, 'iCard'> & { iCard: string };
// type IUseNom2Type = Omit<GetClassesIUseIdResponse, 'iCard'> & { iCard: string };

export type IUseComboType =
  | IUseType[]
  | GetClassesIUseIdResponse[]
  | IUseType
  | GetClassesIUseIdResponse
  | IUseType2
  | IUseType2[];

export type iUses_self_type = {
  entities: {
    [key: string]: GetClassesIUseIdResponse;
  };
  list: string[];
};

export type iCards_self_type = {
  [key: string]: GetClassesICardIdResponse;
};

export interface StateType {
  user: UserType;
  iCards_self: iCards_self_type; // user 为自己的iCard
  iUses_self: iUses_self_type; // user 为自己的iUse
}

type PartialWithoutId<T extends { objectId: string }> = {
  [P in keyof Omit<T, 'objectId'>]?: T[P];
} & { objectId: string };

export type IUseUpdateType =
  | PartialWithoutId<IUseType>
  | PartialWithoutId<GetClassesIUseIdResponse>;

export type ICardUpdateType = PartialWithoutId<ICardType>;
export type AuthDataKey = 'anonymous' | 'qq' | 'weixin' | 'lc_apple';

export type Action =
  | {
      type: 'get_iUse';
      data: IUseComboType;
    }
  | {
      type: 'update_iUse';
      data: IUseType | GetClassesIUseIdResponse;
    }
  | {
      type: 'update_iCard';
      data: ICardType;
    }
  | { type: 'remove_iUse'; id: string }
  | { type: 'login'; user: GetUsersMeResponse }
  | { type: 'update_user_info'; user: UserType }
  | { type: 'logout' }
  | { type: 'init' };

export interface DataContextType {
  config?: unknown;
}

export interface UserType extends GetUsersMeResponse {
  isTourist: boolean;
  // isLogin: boolean;
}

export interface BaseProviderValueType {
  data: StateType;
  dispatch: React.Dispatch<Action>;
}

export const iCardSceme = entity<GetClassesICardIdResponse>(ICARD);
export const iUseSceme = entity<GetClassesIUseIdResponse>(IUSE, {
  iCard: iCardSceme,
});
