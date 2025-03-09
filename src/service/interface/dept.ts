import { ServiceResult } from '@/service/request/config/handle';
import { ResPage } from '@/service/interface/type';

/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-09 15:26:18
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-09 15:26:52
 * @FilePath: src/service/interface/dept.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export interface IDept {
    id?: number;
    address?: string;
    deptCode: string;
    deptName: string;
    deptType: string;
    email?: string;
    fullName: string;
    leader?: string;
    orderNum: number;
    parentId: number | undefined;
    phone?: string;
    postalCode?: string;
    remark?: string;

    [property: string]: any;
}

export interface IDeptParams {
    name?: string;
    code?: string;
    pid?: number | undefined;
    status?: number | string;
}

export type TDeptListResult = ServiceResult<IDept[]>;
export type TDeptPageListResult = ServiceResult<ResPage<IDept>>;
