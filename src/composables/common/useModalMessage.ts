/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-12 14:32:17
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-16 19:47:04
 * @FilePath: src/composables/common/useModalMessage.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { createVNode } from 'vue';

/**
 * @description 操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法 (必传)
 * @param {Object} params 携带的操作数据参数 {id,params} (必传)
 * @param {String} message 提示信息 (必传)
 * @param {Function} refresh 刷新的方法
 * @returns
 */
export const useModalMessage = (
    message: string,
    api: (params: any) => Promise<any>,
    params: any = {},
    refresh?: () => void,
) => {
    return new Promise((resolve) => {
        Modal.confirm({
            title: '温馨提示',
            icon: createVNode(ExclamationCircleOutlined),
            content: `是否${message}`,
            okText: '确认',
            cancelText: '取消',
            async onOk() {
                await api(params);
                if (refresh) refresh();
                resolve(true);
            },
            onCancel() {
                resolve(false);
            },
        });
    });
};
