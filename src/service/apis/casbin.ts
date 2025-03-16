/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-15 18:31:33
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-15 23:45:29
 * @FilePath: src/service/apis/casbin.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import xltRequest from '@/service/request/alova';

/**
 * 根据角色code获取角色api权限
 */
export const getRoleApi = (roleCode: string) => {
    return xltRequest.Get(`/casbin/permission-list`, { params: { code: roleCode } });
};

/**
 * 更新角色api权限
 * @param {object} data
 * @param {array} data.apis api权限列表
 * @param {string} data.roleCode 角色code
 */
export const updateRolePermission = (data: { apis: any[]; roleCode: string }) => {
    return xltRequest.Post(`/casbin/update-role-permission`, data);
};
