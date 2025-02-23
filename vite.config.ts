/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-21 14:31:08
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 17:57:07
 * @FilePath: vite.config.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import viteConfigDev from './config/vite.config.dev';
import viteConfigProd from './config/vite.config.prod';

export default process.env.NODE_ENV === 'development' ? viteConfigDev : viteConfigProd;
