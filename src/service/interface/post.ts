/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-09 17:02:32
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-09 17:04:38
 * @FilePath: src/service/interface/post.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { ServiceResult } from '@/service/request/config/handle';
import { ReqPage, ResPage } from '@/service/interface/type';

export interface IPost {
    id?: number | string;
    name?: string;
    code?: string;
    status?: number | string | boolean;
    description?: string;
    sortOrder?: number;

    [prototype: string]: any;
}

export interface IPostParams extends ReqPage {
    name?: string;
    code?: string;
    status?: number | string;
}

export type TPostListResult = ServiceResult<ResPage<IPost>>;
export type TPostDetailResult = ServiceResult<IPost>;
