/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-19 20:40:42
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-19 20:40:53
 * @FilePath: src/store/module/app/types.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export interface AppState {
    theme: string;
    colorWeek: boolean;
    navbar: boolean;
    menu: boolean;
    hideMenu: boolean;
    menuCollapse: boolean;
    footer: boolean;
    themelist: string;
    themeColor: string;
    themeValue: number;
    themeContent: any;
    menuWidth: number;
    Settings: boolean;
    device: string;
    tabBar: boolean;
    [key: string]: unknown;
    step: number;
    themeLightColors: any
}
