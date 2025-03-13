/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 13:16:44
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 12:39:15
 * @FilePath: src/service/interface/login.ts
 * @Description: 登录相关的TS类型
 */
import type { ServiceResult } from '@/service/request/config/handle';

export interface IAccount {
    username: string;
    password: string;
    code?: string;
}

export interface IUserInfo {
    username: string;
    roles: any[];
    permissions: string[];
    id: number | undefined;
    headPic?: string | undefined;
    nickname?: string | undefined;
    email?: string | undefined;

    [prototype: string]: any;
}

export interface ILoginResult {
    code: number;
    data: {
        accessToken: string;
        refreshToken: string;
        userInfo: IUserInfo;
    };
    msg: string;

    [prototype: string]: any;
}

export type TUserInfoResult = ServiceResult<{ userInfo: IUserInfo }>;
