// 获取菜单列表
import xltRequest from '@/service/request/alova';
import type { IMenu } from '../interface/menu';
import type { ServiceResult } from '@/service/request/config/handle';

/**
 * @description 获取菜单列表
 * @param {string} name 菜单名称
 */
export const getMenuTreeList = (name?: string) => {
    return xltRequest.Get<any>('/menu/tree', { params: { name } });
};

/**
 * 创建菜单
 * @param {Menu.IMenu} params 菜单参数
 * @param {number} params.parentId 父级菜单ID
 * @param {string} params.name 菜单名称
 * @param {string} params.path 菜单路径
 * @param {string} params.component 菜单组件
 * @param {string} params.icon 菜单图标
 * @param {boolean} params.isKeepAlive 是否缓存
 * @param {boolean} params.isHide 是否隐藏
 * @param {boolean} params.isIframe 是否内嵌页面
 * @param {number} params.menuType 菜单类型
 * @param {string} params.permission 菜单权限
 * @param {number} params.sortOrder 排序
 * @returns
 */
export const createMenu = (params: IMenu) => {
    return xltRequest.Post('/menu/create', params);
};

/**
 * @description 更新菜单
 * @param {Menu.IMenu} params
 * @param {number} params.id 菜单ID
 * @param {number} params.parentId 父级菜单ID
 * @param {string} params.name 菜单名称
 * @param {string} params.path 菜单路径
 * @param {string} params.component 菜单组件
 * @param {string} params.icon 菜单图标
 * @param {boolean} params.isKeepAlive 是否缓存
 * @param {boolean} params.isHide 是否隐藏
 * @param {boolean} params.isIframe 是否内嵌页面
 * @param {number} params.menuType 菜单类型
 * @param {string} params.permission 菜单权限
 * @param {number} params.sortOrder 排序
 * @returns
 */
export const updateMenu = (params: IMenu) => {
    return xltRequest.Post('/menu/update', params);
};

/**
 * @description 删除菜单
 * @param {number} id 菜单ID
 * @returns
 */
export const deleteMenu = (id: number) => {
    return xltRequest.Delete(`/menu/delete/${id}`);
};

/**
 * @description 获取菜单详情
 * @param {number} id 菜单ID
 * @returns
 */
export const getMenuDetail = (id: number | undefined) => {
    return xltRequest.Get<ServiceResult<IMenu>>(`/menu/detail/${id}`);
};
