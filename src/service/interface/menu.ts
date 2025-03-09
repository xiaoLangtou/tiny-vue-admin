/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 15:32:17
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-09 19:19:03
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
    id: number;
    path: string;
    name: string;
    component: string;
    redirect?: string;
    meta: MetaProps;
    menuType?: string;
    children?: MenuOptions[];
    parentId?: string;

    [key: string]: any;
}

export type TMenuServiceResult = ServiceResult<MenuOptions[]>;

export interface IMenu {
    id?: number;
    parentId: number;
    name: string;
    path?: string;
    component?: string;
    icon?: string;
    isKeepAlive?: boolean;
    isHide?: boolean;
    isIframe?: boolean;
    menuType: number;
    permission?: string;
    sortOrder: number;
    enName?: string;
}

export interface IMenuParams {
    name?: string;
}

export type TMenuListResult = ServiceResult<IMenu[]>;
