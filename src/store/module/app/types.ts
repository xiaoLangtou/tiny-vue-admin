import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import { ILayoutSetting } from '@/store/module/app/index';

/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-19 20:40:42
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-04 17:04:03
 * @FilePath: src/store/module/app/types.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export type ThemeType = 'light' | 'dark' | 'inverted';

export interface AppState {
    theme: ThemeType;
    themeConfig: ThemeConfig;
    layoutSetting: ILayoutSetting;
}
