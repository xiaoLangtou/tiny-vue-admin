/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 13:16:44
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 14:18:40
 * @FilePath: src/service/interface/login.ts
 * @Description: 登录相关的TS类型
 */

export interface IAccount {
    username: string;
    password: string;
    code?: string;
}

export interface ILoginResult {
    code: number;
    data: {
        accessToken: string;
        refreshToken: string;
        userInfo: any;
    };
    msg: string;

    [prototype: string]: any;
}
