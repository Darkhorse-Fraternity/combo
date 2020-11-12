import {
  GetClassesICardIdResponse,
  GetClassesIUseIdResponse,
  GetUsersIdResponse,
  PostCallCardListResponse,
  PostCallIUseList3Response,
} from 'src/hooks/interface';
import { ICARD, IUSE } from '@redux/reqKeys';
import { entity } from '@redux/scemes';
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

export interface StateType {
  user: UserType;
  iCards_self: {
    [key: string]: GetClassesICardIdResponse;
  }; // user 为自己的iCard
  iUses_self: {
    entities: {
      [key: string]: GetClassesIUseIdResponse;
    };
    list: string[];
  }; // user 为自己的iUse
}

export type Action =
  | {
      type: 'updata_iUse';
      data: IUseComboType;
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

const iCardSceme = entity<GetClassesICardIdResponse>(ICARD);
export const iUseSceme = entity<GetClassesIUseIdResponse>(IUSE, {
  iCard: iCardSceme,
});
