/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-22 14:30:28
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-22 14:33:24
 * @FilePath: src/composables/common/useWindowOpen.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface OpenWindowOptions {
    url: string;
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    features?: string;
    onClose?: () => void;
}

export function useWindowOpen(options: OpenWindowOptions) {
    const windowRef = ref<Window | null>(null);
    let closeCheckInterval: number | null = null;

    const openWindow = () => {
        closeWindow(); // 先关闭已有窗口

        windowRef.value = window.open(options.url, options.target || '_blank', options.features || '') || null;

        if (windowRef.value) {
            closeCheckInterval = window.setInterval(() => {
                if (windowRef.value?.closed && options.onClose !== undefined) {
                    clearInterval(closeCheckInterval!);
                    closeCheckInterval = null;
                    options.onClose();
                }
            }, 500);
        }
    };

    const closeWindow = () => {
        if (windowRef.value && !windowRef.value.closed) {
            windowRef.value.close();
        }
        if (closeCheckInterval) {
            clearInterval(closeCheckInterval);
            closeCheckInterval = null;
        }
    };

    // 组件销毁时，确保窗口关闭
    onUnmounted(() => {
        closeWindow();
    });

    // 立即打开窗口
    openWindow();

    return {
        windowRef,
        closeWindow,
    };
}
