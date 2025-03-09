/**
 * @description 字典管理相关接口
 */
import xltRequest from '@/service/request/alova';
import { IDeptParams, TDeptListResult, IDept, TDeptPageListResult } from '@/service/interface/dept';

/**
 * @description 获取部门列表
 * @param {IDeptParams}  params 部门查询参数
 * @param {string}  [params.name] 部门名称
 * @param {string}  [params.code] 部门编码
 * @param {number}  [params.pid] 父级ID
 * @param {number}  [params.status] 状态
 * @returns
 */
export const getDeptList = (params?: IDeptParams) => {
  return xltRequest.Get<TDeptPageListResult>("/dept/list", { params: { ...params } });
};

/**
 * @description 获取部门树
 * @returns
 */
export const getDeptTree = () => {
  return xltRequest.Get<TDeptListResult>("/dept/tree", {});
};

/**
 * @description 添加部门
 * @param {IDept}  data 部门数据
 * @param {string}  data.deptCode 部门编码
 * @param {string}  data.deptName 部门名称
 * @param {string}  data.deptType 部门类型
 * @param {string}  [data.address] 地址
 * @param {string}  [data.email] 邮箱
 * @param {string}  data.fullName 全称
 * @param {string}  [data.leader] 负责人
 * @param {number}  data.orderNum 排序
 * @param {number}  data.parentId 父级ID
 * @param {string}  [data.phone] 电话
 * @param {string}  [data.postalCode] 邮编
 * @param {string}  [data.remark] 备注
 * @returns
 */
export const addDept = (data: IDept) => {
  return xltRequest.Post("/dept/add", data);
};

/**
 * @description 更新部门
 * @param {IDept}  data 部门数据
 * @param {string}  data.deptCode 部门编码
 * @param {string}  data.deptName 部门名称
 * @param {string}  data.deptType 部门类型
 * @param {string}  [data.address] 地址
 * @param {string}  [data.email] 邮箱
 * @param {string}  data.fullName 全称
 * @param {string}  [data.leader] 负责人
 * @param {number}  data.orderNum 排序
 * @param {number}  data.parentId 父级ID
 * @param {string}  [data.phone] 电话
 * @param {string}  [data.postalCode] 邮编
 * @param {string}  [data.remark] 备注
 * @param {number}  data.id 部门ID
 * @returns
 */
export const updateDept = (data: IDept) => {
  return xltRequest.Post("/dept/edit", data);
};

/**
 * @description 删除部门
 * @param {number} id 部门ID
 * @returns
 */
export const removeDept = (id: number) => {
  return xltRequest.Delete(`/dept/remove/${id}`);
};

/**
 * @description 获取部门详情
 * @param {number} id 部门ID
 * @returns
 */
export const getDeptDetail = (id: any) => {
  return xltRequest.Get<IDept>(`/dept/detail/${id}`);
};

/**
 * @description 修改部门状态
 * @param {number} id 部门ID
 * @param {number} status 是否启用
 */
export const changeDeptStatus = (id: number, status: number) => {
  return xltRequest.Put("/dept/change-status", { id, status });
};

/**
 * @description 生成部门常量
 */
export const getDeptConst = () => {
  return xltRequest.Get<any>("/dept/generate-dept-constants");
};
