/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 22:04:59
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 16:16:33
 * @FilePath: src/service/module/login.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import xltRequest from '@/service/request/alova';
import { IAccount, ILoginResult, TUserInfoResult } from '@/service/interface/login';
import { TMenuServiceResult } from '@/service/interface/menu';

export const login = (data: IAccount) => {
    const method = xltRequest.Post<ILoginResult>('/auth/login', data);

    method.meta = {
        authRole: 'login',
    };
    return method;
};

export const getUserInfo = () => {
    return xltRequest.Get<TUserInfoResult>('/auth/info');
};

export const getUserMenu = () => {
    return xltRequest.Get<TMenuServiceResult>('/menu/user/list');
};
