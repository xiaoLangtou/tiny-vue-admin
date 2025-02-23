/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 20:13:07
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 14:45:02
 * @FilePath: src/store/module/menu/menu.ts
 * @Description: 路由相关的store
 */

import { defineStore } from 'pinia';
import { getUserMenu } from '@/service/module/login';
import { to } from '@/utils/result-handler';
import { MenuOptions } from '@/service/interface/menu';

const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            menuList: [] as MenuOptions[], // 树形菜单
            flatMeuList: [] as MenuOptions[], // 平铺菜单
        };
    },
    actions: {
        async getAuthMenuList() {
            const result = await to(getUserMenu());
            if (!result.ok) return;
            this.menuList = result.value.data;
            this.flatMeuList = this.flattenMenu(this.menuList);
            return result.value.data;
        },
        flattenMenu(menuList: MenuOptions[]): MenuOptions[] {
            const result: MenuOptions[] = [];
            const stack: MenuOptions[] = [...menuList];
            while (stack.length > 0) {
                const currentItem = stack.pop()!; // 弹出栈顶元素
                result.push(currentItem); // 将当前项添加到结果数组
                // 将子菜单倒序压入栈中，以保证顺序是从左到右处理
                if (currentItem.children && currentItem.children.length > 0) {
                    stack.push(...currentItem.children.reverse());
                }
            }
            return result;
        },
    },
});

export default useMenuStore;
