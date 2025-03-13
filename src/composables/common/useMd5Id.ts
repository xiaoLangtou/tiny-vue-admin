/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-13 17:19:00
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-13 17:20:16
 * @FilePath: src/composables/common/useMd5Id.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import md5 from 'md5';

export const useMd5Id = (id?: string) => {
    return md5(id || '');
};
