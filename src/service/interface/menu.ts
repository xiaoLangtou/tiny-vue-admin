/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 15:32:17
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 12:00:12
 * @FilePath: src/service/interface/menu.ts
 * @Description: 菜单相关的类型
 */
import { ServiceResult } from '@/service/request/config/handle';

export interface MetaProps {
    icon: string;
    title: string;
    activeMenu?: string;
    isLink?: string;
    isHide: boolean;
    isFull: boolean;
    isAffix: boolean;
    isKeepAlive: boolean;
}

export interface MenuOptions {
    id?: number;
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: MetaProps;
    menuType?: string;
    children?: MenuOptions[];
    parentId: string;

    [key: string]:any
}

export type TMenuServiceResult = ServiceResult<MenuOptions[]>;
