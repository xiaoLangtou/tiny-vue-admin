/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 22:04:59
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-08 16:13:28
 * @FilePath: src/service/apis/login.ts
 * @Description: 登录相关接口
 */
import xltRequest from '@/service/request/alova';
import { IAccount, ILoginResult, TUserInfoResult } from '@/service/interface/login';
import { TMenuServiceResult } from '@/service/interface/menu';
import exp from 'constants';
import { ServiceResult } from '@/service/request/config/handle';

/**
 * @description 用户登录接口
 * @param {IAccount} data 登录参数
 * @param {string} data.username 用户名
 * @param {string} data.password 密码
 * @param {string} [data.code] 验证码
 * @returns {Promise<ILoginResult>} 返回登录结果，包含token和用户信息
 */
export const login = (data: IAccount) => {
    const method = xltRequest.Post<ILoginResult>('/auth/login', data);

    method.meta = {
        authRole: 'login',
    };
    return method;
};

/**
 * @description 获取当前登录用户信息
 * @returns {Promise<TUserInfoResult>} 返回用户详细信息，包含用户基本信息、角色和权限列表
 */
export const getUserInfo = () => {
    return xltRequest.Get<TUserInfoResult>('/auth/info');
};

/**
 * @description 获取当前用户的菜单列表
 * @returns {Promise<TMenuServiceResult>} 返回用户可访问的菜单树形结构
 */
export const getUserMenu = () => {
    return xltRequest.Get<TMenuServiceResult>('/menu/user/list');
};

export const logout = () => {
    return xltRequest.Post<ServiceResult<{ code: number }>>(`/auth/logout`);
};
