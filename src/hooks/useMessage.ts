/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 16:22:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 17:13:19
 * @FilePath: src/hooks/useMessage.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { Modal } from '@opentiny/vue';
import { IConfirmOptions, MessageImplements } from '@/hooks/types';

export function useMessage() {
    class MessageClass implements MessageImplements {
        // 普通提示
        /**
         * 基本提示图标
         * @param {string} title 需要提示的内容
         * @returns 返回值为一个Promise对象，其中属性vm可用来关闭当前模态框
         */
        info(title: string) {
            return Modal.message({ message: title, status: 'info' });
        }

        /**
         * 成功提示图标
         * @param {string} title 需要提示的内容
         * @returns 返回值为一个Promise对象，其中属性vm可用来关闭当前模态框
         */
        success(title: string) {
            return Modal.message({ message: title, status: 'success' });
        }

        /**
         * 警告提示图标
         * @param {string} title 需要提示的内容
         * @returns 返回值为一个Promise对象，其中属性vm可用来关闭当前模态框
         */
        warning(title: string) {
            return Modal.message({ message: title, status: 'warning' });
        }

        /**
         * 错误提示图标
         * @param {string} title 需要提示的内容
         */
        error(title: string) {
            return Modal.message({ message: title, status: 'error' });
        }

        /**
         * 显示信息提示对话框
         * @param title 对话框中显示的标题或信息内容
         * @returns 返回值为一个Promise对象，其中属性vm可用来关闭当前模态框
         */
        alertInfo(title: string) {
            return Modal.alert({ message: title, status: 'info' });
        }

        /**
         * 显示成功提示的模态框
         * @param title 成功提示的标题，用于告知用户具体成功完成的操作
         * @returns 返回值为一个Promise对象，其中属性vm可用来关闭当前模态框
         */
        alertSuccess(title: string) {
            return Modal.alert({ message: title, status: 'success' });
        }

        /**
         * 显示警告提示的模态框
         * @param title 警告提示的标题，用于告知用户具体成功完成的操作
         * @returns 返回值为一个Promise对象，其中属性vm可用来关闭当前模态框
         */
        alertWarning(title: string) {
            return Modal.alert({ message: title, status: 'warning' });
        }

        /**
         * 显示错误提示的模态框
         * @param title 错误提示的标题，用于告知用户具体成功完成的操作
         * @returns 返回值为一个Promise对象，其中属性vm可用来关闭当前模态框
         */
        alertError(title: string) {
            return Modal.alert({ message: title, status: 'error' });
        }

        /**
         * 显示加载中提示的消息提示
         * @param title 加载中提示的标题，用于告知用户具体成功完成的操作
         * @returns 返回值为一个Promise对象，其中属性vm可用来关闭当前模态框
         */
        loading(title: string) {
            return Modal.loading({ message: title });
        }

        /**
         * 显示加载中提示的模态框
         * @param title 加载中提示的标题，用于告知用户具体成功完成的操作
         * @returns 返回值为一个Promise对象，其中属性vm可用来关闭当前模态框
         */
        alertLoading(title: string) {
            return Modal.alert({ message: title, status: 'loading' });
        }


        /**
         * 显示一个确认对话框
         *
         * 此函数用于显示一个带有指定标题和消息的确认对话框用户可以通过此对话框进行确认或取消操作
         *
         * @param title 对话框的标题
         * @param message 对话框显示的消息内容
         * @param options 可选的配置项，用于自定义对话框的行为和外观
         * @returns 返回一个Promise，包含用户操作的结果
         */
        confirm(title: string, message: string, options?: IConfirmOptions) {
            return Modal.confirm({
                message: message,
                title: title,
                ...options,
            });
        }
    }

    return new MessageClass();
}
