import xltRequest from '@/service/request/alova';
import type { ICache } from '../interface/cache';

/**
 * @description 获取详情
 * @param {number} id id
 */
export const getCacheDetail = () => {
  return xltRequest.Get<ICache>(`/redis-cache/info`);
};
