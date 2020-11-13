import {
  GetClassesICardIdResponse,
  GetClassesIUseIdResponse,
  GetUsersIdResponse,
  PostCallCardListResponse,
  PostCallIUseList3Response,
} from 'src/hooks/interface';
import { ICARD, IUSE } from '@redux/reqKeys';
import { entity } from '@redux/scemes';
import { object, string } from 'prop-types';
type ICardType = NonNullable<PostCallCardListResponse['result']>[number];
type IUseType = NonNullable<
  NonNullable<PostCallIUseList3Response['result']>['iUseList']
>[number];
type IUseNomType = Omit<IUseType, 'iCard'> & { iCard: string };
type IUseNom2Type = Omit<GetClassesIUseIdResponse, 'iCard'> & { iCard: string };

export type IUseComboType =
  | IUseType[]
  | GetClassesIUseIdResponse[]
  | IUseType
  | GetClassesIUseIdResponse;

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
  | { type: 'login'; user: GetUsersIdResponse }
  | { type: 'update_user_info'; user: GetUsersIdResponse }
  | { type: 'logout' }
  | { type: 'init' };

export interface DataContextType {
  config?: unknown;
}

export interface UserType extends GetUsersIdResponse {
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
