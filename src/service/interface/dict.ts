/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 17:00:06
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-04 17:04:03
 * @FilePath: src/service/interface/dict.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { ServiceResult } from '@/service/request/config/handle';
import { ResPage } from '@/service/interface/type';

export interface IDictType {
    id?: string | number;
    dictName: string;
    dictCode: string;
    dictDesc?: string;
    systemFlag: string;
}

export interface IDictData {
    id?: string | number;
    dictValue: string;
    dictLabel: string;
    dictRemark?: string;
    dictSort?: number | undefined;
    dictTypeId: number | undefined;
    dictType?: string;
    dictDesc?: string;
}

export type TDictListResult = ServiceResult<IDictType[]>;
export type TDictDetailResult = ServiceResult<IDictType>;
export type TDictDataListResult = ServiceResult<ResPage<IDictData>>;
export type TDictDataDetailResult = ServiceResult<IDictData>;

