/**
 * @description 角色模块
 */
import xltRequest from '@/service/request/alova';
import type { IRole, IRoleParams, IRoleUsers, TRoleDetailResult, TRoleListResult } from '../interface/role';

/**
 * @description 创建角色
 * @param {IRole} data 角色数据
 * @param {string} data.roleName 角色名称
 * @param {string} data.roleCode 角色编码
 * @param {string} data.description 角色描述
 * @returns
 */
export const createRole = (data: IRole) => {
    return xltRequest.Post('/role/add', data);
};

/**
 * @description 获取角色列表
 * @param {IRoleParams} params 查询参数
 * @param {string} params.roleName 角色名称
 * @param {string} params.roleCode 角色编码
 * @param {string} params.isEnable 角色状态
 * @param {string} params.startTime 创建时间
 * @param {string} params.endTime 创建时间结束
 * @param {number} params.current 当前页
 * @param {number} params.pageSize 每页条数
 * @returns
 */
export const getRoleList = (params: IRoleParams) => {
    return xltRequest.Get<TRoleListResult>('/role/list', { params: { ...params } });
};

/**
 * @description 删除角色
 * @param {number} id 角色ID
 * @returns
 */
export const removeRole = (id: number) => {
    return xltRequest.Post(`/role/remove/${id}`);
};

/**
 * @description 更新角色
 * @param {IRole} data 角色数据
 * @param {string} data.roleName 角色名称
 * @param {string} data.roleCode 角色编码
 * @param {string} data.description 角色描述
 * @param {number} data.id 角色ID
 * @returns
 */
export const updateRole = (data: IRole) => {
    return xltRequest.Post('/role/edit', data);
};

/**
 * 获取角色详情
 * @param {number} id  角色ID
 * @returns
 */
export const getRoleDetail = (id: number) => {
    return xltRequest.Get<TRoleDetailResult>(`/role/detail/${id}`);
};

/**
 * @description 修改角色状态
 * @param {number} id 角色ID
 * @param {number} status 角色状态
 * @returns
 */
export const changeRoleStatus = (id: number, status: number) => {
    return xltRequest.Put(`/role/changeStatus`, { roleId: id, isEnable: status });
};

/**
 * @description 修改角色菜单
 * @param {IRole} data
 * @param {number[]} data.menus 菜单ID
 * @param {number} data.id 角色ID
 * @returns
 */
export const changeRoleMenu = (data: IRole) => {
    return xltRequest.Put(`/role/changeMenu`, data);
};

/**
 * @description 角色分配用户
 * @param {IRoleUsers} data
 * @param {number} data.roleId 角色ID
 * @param {number[]} data.userIds 用户ID
 * @returns
 */
export const changeUserRole = (data: IRoleUsers) => {
    return xltRequest.Post(`/role/add/users`, data);
};

/**
 * @description 移除角色用户
 * @param {IRoleUsers} data
 * @param {number} data.roleId 角色ID
 * @param {number[]} data.users 用户ID
 * @returns
 */
export const removeUserRole = (data: IRoleUsers) => {
    return xltRequest.Put(`/role/remove/users`, data);
};
