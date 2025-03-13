import { HTTP_METHOD } from '@/global/enums';
import type { ServiceResult } from '@/service/request/config/handle';
import type { ReqPage, ResPage } from '@/service/interface/type';

export interface IApi {
    id?: number;
    path?: string;
    description?: string;
    method?: HTTP_METHOD;
    apiGroup?: string;

    [prototype: string]: any;
}

export interface IApiGroup {
    apiGroup?: string;

    [prototype: string]: any;
}

export interface IApiSync {
    newApis: IApi[];
    deleteApis: IApi[];
    ignoreApis: IApi[];
    apiGroups: string[];
}

export interface IApiParams extends ReqPage {
    [prototype: string]: any;
}

export type TApiListResult = ServiceResult<ResPage<IApi[]>>;
export type TApiDetailResult = ServiceResult<IApi>;

export type TApiGroupResult = ServiceResult<IApiGroup[]>;

export type TApiSyncResult = ServiceResult<IApiSync>;
