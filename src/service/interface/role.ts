import type { ServiceResult } from '@/service/request/config/handle.ts';
import type { ReqPage, ResPage } from '@/service/interface/type.ts';

/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-12 14:11:48
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 14:16:34
 * @FilePath: src/service/interface/role.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export interface IRole {
    id?: number;
    roleName?: string;
    name?: string;
    roleCode?: string;
    description?: string;
    sortOrder?: number;
    isEnable?: number;
    createTime?: string;
    menus?: number[];
    deptIds?: number[];
}

export interface IRoleParams extends ReqPage {
    roleName?: string;
    roleCode?: string;
    isEnable?: number | string;
    createTime?: any[];
    startTime?: string;
    endTime?: string;
}

export interface IRoleUsers {
    roleId: number;
    users: number[];
}

export type TRoleListResult = ServiceResult<ResPage<IRole>>;
export type TRoleDetailResult = ServiceResult<IRole>;
