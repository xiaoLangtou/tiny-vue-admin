/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 11:08:48
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 17:13:20
 * @FilePath: src/types/global.d.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export {};

declare module 'nprogress';
declare module '@opentiny/vue-locale';
declare module '@opentiny/vue';
declare module '@opentiny/vue-icon';
declare module '@opentiny/vue-theme/theme-tool.js';
declare module '@opentiny/vue-theme/theme';
declare module 'echarts4';
declare module 'query-string';
declare const BUILD_TOOLS: string;

declare module 'md5' {
    function md5(input: string | Buffer): string;

    export default md5;
}

declare interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
}

declare interface NodeRequire {
    context: any;
}
