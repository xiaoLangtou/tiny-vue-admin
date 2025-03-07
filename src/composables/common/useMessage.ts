/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 17:09:12
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-04 19:21:12
 * @FilePath: src/hooks/useMessage.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { App } from 'ant-design-vue';
import type { MessageInstance } from 'ant-design-vue/es/message/interface';
import type { ModalStaticFunctions } from 'ant-design-vue/es/modal/confirm';
import type { NotificationInstance } from 'ant-design-vue/es/notification/interface';

export const useMessage = () => {
    let message = reactive<MessageInstance>({} as unknown as MessageInstance);
    let notification = reactive<NotificationInstance>({} as unknown as NotificationInstance);
    let modal = reactive<Omit<ModalStaticFunctions, 'warn'>>({} as unknown as Omit<ModalStaticFunctions, 'warn'>);
    (() => {
        const staticFunction = App.useApp();
        message = staticFunction.message;
        modal = staticFunction.modal;
        notification = staticFunction.notification;
    })();

    return { message, notification, modal };
};
