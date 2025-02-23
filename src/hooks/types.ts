/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 17:10:51
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 17:15:00
 * @FilePath: src/hooks/types.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export interface MessageImplements {
    // Modal message 方法调用消息提示。
    info: (title: string) => Promise<any>;
    success: (title: string) => Promise<any>;
    warning: (title: string) => Promise<any>;
    error: (title: string) => Promise<any>;
    loading: (title: string) => Promise<any>;

    // Modal message alert 方法调用消息提示。
    alertInfo: (title: string) => Promise<any>;
    alertSuccess: (title: string) => Promise<any>;
    alertWarning: (title: string) => Promise<any>;
    alertError: (title: string) => Promise<any>;
    alertLoading: (title: string) => Promise<any>;

    confirm: (title: string, message: string, options?: IConfirmOptions) => Promise<any>;
}

export interface IConfirmOptions {
    // 显示头部
    showHeader?: boolean;
    // 显示底部
    showFooter?: boolean;
    // 确认按钮的文本
    confirmContent?: string;
    // 取消按钮文本
    cancelContent?: string;

    // 确认按钮的属性
    confirmBtnProps?: Record<string, any>;

    // 取消按钮的属性
    cancelBtnProps?: Record<string, any>;

    // 让底部也支持拖动（默认只有标题栏可拖动）。默认值为：false
    footerDragable?: boolean;

    // 弹窗宽度
    width?: number;

    // 弹窗高度
    height?: number;

    // 全屏
    fullscreen?: boolean;

    /**
     * 通过resize属性，设置是否允许拖动边框调整窗口大小，并且右上角显示切换最大化的按钮。
     * 当 resize属性设置为true后，通过 min-height属性设置拖拽后窗口的最小高度，默认值为 200.
     * min-width属性设置拖拽后窗口的最小宽度，默认值为 340。
     */
    resize?: boolean;

    /**
     * 通过mask属性，设置是否显示遮罩层。默认值为true
     * @default true
     */
    mask?: boolean;
    /**
     * 通过mask-closable属性，设置是否允许点击遮罩层关闭窗口。默认值为false
     * @default false
     */
    maskClosable?: boolean;

    /**
     * 通过lock-scroll属性，设置是否锁住滚动条，不允许页面滚动。默认值为false
     * @default false
     */
    lockScroll?: boolean;

    /**
     * 通过lock-view属性，设置是否锁住页面，不允许窗口之外的任何操作。默认值为true
     * @default false
     */
    lockView?: boolean;

    /**
     * 通过esc-closable属性设置是否允许按 Esc 键关闭窗口。默认值为false
     * @default false
     */
    escClosable?: boolean;

    /**
     * 通过z-index属性设置自定义堆叠顺序。
     */
    zIndex?: number;

    /**
     * 通过is-form-reset属性，设置关闭弹窗后，是否重置数据。默认值为true,即关闭弹窗后重置数据。
     * @default true
     */
    isFormReset?: boolean;

    /**
     * 通过duration属性设置自动关闭的延迟时间，单位为毫秒。默认值为3000 ms
     * @default 3000
     */
    duration?: number;

    /**
     * 通过top属性设置消息距离顶部的位置，单位为 px
     */
    top?: number;

    /**
     * 通过id设置防止重复提示。
     */
    id?: string;

    events?: {
        /**
         * 在窗口显示时会触发该事件
         * @param event
         */
        show?: (event: Event) => void;
        /**
         * 点击关闭按钮时会触发该事件
         * @param event
         */
        close?: (event: Event) => void;
        /**
         * 点击确定按钮时会触发该事件
         * @param event
         */
        confirm?: (event: Event) => void;
        /**
         * 在窗口关闭时会触发该事件
         * @param event
         */
        hide?: (event: Event) => void;
        /**
         * 点击关闭按钮时会触发该事件
         * @param event
         */
        cancel?: (event: Event) => void;
        /**
         * 窗口缩放时会触发该事件
         * @param event
         */
        zoom?: (event: Event) => void;
    };

    slots?: {
        default: () => VNode;
        footer: () => VNode;
    };
}
