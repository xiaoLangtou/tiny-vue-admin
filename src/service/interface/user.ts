import type { ServiceResult } from '../request/config/handle';
import type { ReqPage, ResPage } from './type';

/**
 * @description 用户管理
 */
export interface IUser {
  id?: number;
  username?: string;
  deptId?: string;
  post?: number[];
  nickname?: string;
  email?: string;
  phone?: string;
  sex?: string;
  jobNumber?: string;
  name?: string;
  enName?: string;
  remark?: string;
  roles?: number[];
  status?: string;
}

export interface IUserParams extends ReqPage {
  username?: string;
  deptId?: string;
  post?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  name?: string;

  [prototype: string]: any;
}

export type TUserListResult = ServiceResult<ResPage<IUser>>;
