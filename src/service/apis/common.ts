/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-18 15:43:44
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-18 15:51:29
 * @FilePath: src/service/apis/common.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import xltRequest from '@/service/request/alova';

export const getGiteeNews = () => {
    return xltRequest.Get('/gitee/news');
};
