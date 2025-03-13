import xltRequest from '@/service/request/alova';
import type { IUser, IUserParams, TUserListResult } from '@/service/interface/user';

/**
 * @description 获取用户列表
 * @param {IUserParams} params
 * @param {string} [params.username] 用户名
 * @param {string} [params.deptId] 部门id
 * @param {string} [params.nickname] 昵称
 * @param {string} [params.email] 邮箱
 * @param {string} [params.phone] 手机号
 * @param {number} params.current 页码
 * @param {number} params.size 每页数量
 * @method get
 * @returns
 */
export const getUserList = (params?: IUserParams) => {
    return xltRequest.Get<TUserListResult>('/user/list', { params: { ...params } });
};

/**
 * @description 获取用户详情
 * @param {number} id 用户id
 */
export const getUserDetail = (id: number) => {
    return xltRequest.Get<any>(`/user/detail/${id}`);
};

/**
 * @description 新增用户
 * @param {IUser} data
 * @param {string} data.username 用户名
 * @param {string} data.deptId 部门id
 * @param {string} data.post 岗位
 * @param {string} data.nickname 昵称
 * @param {string} data.email 邮箱
 * @param {string} data.phone 手机号
 * @param {string} data.name 姓名
 * @param {string} data.enName 英文名
 * @param {string} data.remark 备注
 * @param {string} data.roles 角色
 * @param {number} data.status 状态
 * @method post
 * @returns
 */
export const addUser = (data: IUser) => {
    return xltRequest.Post('/user/add', data);
};

/**
 * @description 编辑用户
 * @param {IUser}  data
 * @param {number} data.id 用户id
 * @param {string} data.username 用户名
 * @param {string} data.deptId 部门id
 * @param {string} data.post 岗位
 * @param {string} data.nickname 昵称
 * @param {string} data.email 邮箱
 * @param {string} data.phone 手机号
 * @param {string} data.name 姓名
 * @param {string} data.enName 英文名
 * @param {string} data.remark 备注
 * @param {string} data.roles 角色
 * @param {number} data.status 状态
 * @method post
 * @returns
 */
export const editUser = (data: IUser) => {
    return xltRequest.Post('/user/edit', data);
};

/**
 * @description 删除用户
 * @param {number} id 用户id
 * @method delete
 * @returns
 */
export const deleteUser = (id: number) => {
    return xltRequest.Delete(`/user/remove/${id}`);
};

/**
 * @description 修改用户状态
 * @param {number} id 用户id
 * @param {string} status 状态
 * @method put
 * @returns
 */
export const changeUserStatus = (data: { id: number; status: string }) => {
    return xltRequest.Put(`/user/status`, { id: data.id, status: data.status });
};

/**
 * @description 根据角色ID获取用户列表
 * @param {number} params.current 页码
 * @param {number} params.size 每页数量
 * @param {number} params.roleId 角色ID
 * @param {IUserParams} params
 * @param {string} [params.username] 用户名
 * @param {string} [params.nickname] 昵称
 * @param {string} [params.email] 邮箱
 * @param {string} [params.phone] 手机号
 * @param {string} [params.status] 状态 NORMAL：正常，FROZEN：冻结
 * @method get
 * @returns
 */
export const getUsersByRoleId = (params: IUserParams) => {
    return xltRequest.Get<any>('/user/role/list', { params: { ...params } });
};

/**
 * @description 重置密码
 * @param data
 */
export const resetPassword = (data: { ids: number[] }) => {
    return xltRequest.Put('/user/reset/password', data);
};
