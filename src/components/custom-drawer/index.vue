<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-03 15:14:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-03 15:14:03
 * @Description: 自定义抽屉组件
-->
<template>
    <a-drawer
        v-bind="drawerProps"
        :open="open"
        mask
        :destroy-on-close="true"
        :mask-closable="true"
        :get-container="getContainer"
        :after-open-change="afterOpenChange"
        @close="handleClose"
    >
        <!-- 额外操作按钮 -->
        <template #extra>
            <slot name="extra">
                <a-space>
                    <a-button v-if="showCancelButton" @click="handleCancel">
                        <template v-if="cancelButtonIcon" #icon>
                            <component :is="cancelButtonIcon"></component>
                        </template>
                        {{ cancelButtonText }}
                    </a-button>
                    <a-button v-if="showConfirmButton" type="primary" :loading="confirmLoading" @click="handleConfirm">
                        <template v-if="cancelButtonIcon" #icon>
                            <component :is="cancelButtonIcon"></component>
                        </template>
                        {{ confirmButtonText }}
                    </a-button>
                </a-space>
            </slot>
        </template>

        <!-- 主体内容 -->
        <slot></slot>

        <!-- 底部内容 -->
        <template v-if="showFooter" #footer>
            <slot name="footer"></slot>
        </template>
    </a-drawer>
</template>

<script setup lang="ts">
import type { DrawerProps } from 'ant-design-vue';

defineOptions({
    name: 'CustomDrawer',
});

const props = withDefaults(defineProps<Props>(), {
    open: false,
    confirmLoading: false,
    showConfirmButton: true,
    showCancelButton: true,
    width: 500,
    placement: 'right',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    confirmButtonIcon: '',
    cancelButtonIcon: '',
    getContainer: 'body',
    showFooter: false,
});

const emit = defineEmits<{
    (e: 'cancel'): void;
    (e: 'confirm'): void;
    (e: 'close'): void;
    (e: 'update:open', value: boolean): void;
    (e: 'afterOpenChange', value: boolean): void;
}>();

// 定义插槽
defineSlots<{
    /** 默认插槽，用于放置抽屉的主体内容 */
    default: () => any;
    /** 额外操作按钮插槽，用于自定义右上角的操作按钮 */
    extra: () => any;
    /** 底部内容插槽，用于自定义抽屉底部内容 */
    footer: () => any;
}>();

interface Props extends Partial<DrawerProps> {
    /** 抽屉是否可见 */
    open?: boolean;
    /** 确认按钮加载状态 */
    confirmLoading?: boolean;
    /** 是否显示确认按钮 */
    showConfirmButton?: boolean;
    /** 是否显示取消按钮 */
    showCancelButton?: boolean;
    /** 确认按钮文本 */
    confirmButtonText?: string;
    /** 取消按钮文本 */
    cancelButtonText?: string;
    /** 确认按钮图标 */
    confirmButtonIcon?: string;
    /** 取消按钮图标 */
    cancelButtonIcon?: string;
    /** 是否显示底部内容 */
    showFooter?: boolean;
    getContainer?: string | HTMLElement | (() => HTMLElement);
}

// 抽屉属性
const drawerProps = computed(() => {
    const { ...rest } = props;
    return rest;
});

// 处理取消
const handleCancel = () => {
    handleClose();
};

// 处理确认
const handleConfirm = () => {
    emit('confirm');
};

// 处理关闭
const handleClose = () => {
    emit('close');
    emit('update:open', false);
};

// 抽屉打开状态改变后的回调
const afterOpenChange = (open: boolean) => {
    emit('afterOpenChange', open);
};
</script>
