/**
 * @description 部门管理相关接口
 */
import xltRequest from '@/service/request/alova';
import { IPost, IPostParams, TPostDetailResult, TPostListResult } from '@/service/interface/post';

/**
 * @description 获取岗位列表
 * @param {IPostParams} params
 * @param {string} [params.name] 岗位名称
 * @param {string} [params.code] 岗位编码
 * @param {number | string} [params.status] 状态
 * @param {number} [params.current] 页码
 * @param {number} [params.size] 每页数量
 * @method get
 * @returns {AxiosPromise<ResPage<IPost>>}
 */
export const getPostList = (params?: IPostParams) => {
  return xltRequest.Get<TPostListResult>("/post/list", { params: { ...params } });
};

/**
 * @description 新增岗位
 * @param {IPost} data
 * @param {string} data.name 岗位名称
 * @param {string} data.code 岗位编码
 * @param {string} data.status 状态
 * @param {string} data.description 描述
 * @method post
 * @returns {AxiosPromise}
 */
export const addPost = (data: IPost) => {
  return xltRequest.Post("/post/add", data);
};

/**
 * @description 编辑岗位
 * @param {IPost} data
 * @param {number} data.id 岗位id
 * @param {string} data.name 岗位名称
 * @param {string} data.code 岗位编码
 * @param {string} data.status 状态
 * @param {string} data.description 描述
 * @method put
 * @returns {AxiosPromise}
 */
export const editPost = (data: IPost) => {
  return xltRequest.Post("/post/edit", data);
};

/**
 * @description 删除岗位
 * @param {number} id 岗位id
 * @method delete
 * @returns {AxiosPromise}
 */
export const deletePost = (id: number | string) => {
  return xltRequest.Delete(`/post/remove/${id}`);
};

/**
 * @description 获取岗位详情
 * @param {number} id 岗位id
 * @method get
 * @returns {AxiosPromise<IPost>}
 */
export const getPostDetail = (id: number | string) => {
  return xltRequest.Get<TPostDetailResult>(`/post/detail/${id}`);
};

/**
 * @description 修改岗位状态
 * @param {number} id 岗位id
 * @param {number} status 状态
 * @method put
 * @returns {AxiosPromise}
 */
export const changePostStatus = (id: number | string, status: number) => {
  return xltRequest.Put(`/post/status`, { id, status });
};
