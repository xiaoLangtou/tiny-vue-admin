<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-23 15:14:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-03 15:44:45
 * @FilePath: src/views/admin/menu/index.vue
 * @Description: 抽屉组件使用示例
 -->
<template>
    <div class="xlt-base-container">
        <a-button type="primary" @click="showDrawer">打开抽屉</a-button>

        <CustomDrawer
            v-model:open="drawerVisible"
            title="抽屉标题"
            :confirm-loading="confirmLoading"
            @cancel="handleCancel"
            @confirm="handleConfirm"
        >
            <!-- 抽屉内容区域 -->
            <div class="drawer-content">
                <a-form :model="formState" layout="vertical">
                    <a-form-item label="名称" name="name">
                        <a-input v-model:value="formState.name" placeholder="请输入名称" />
                    </a-form-item>
                    <a-form-item label="描述" name="description">
                        <a-textarea v-model:value="formState.description" placeholder="请输入描述" :rows="4" />
                    </a-form-item>
                    <a-form-item label="状态" name="status">
                        <a-switch v-model:checked="formState.status" />
                    </a-form-item>
                </a-form>
            </div>

            <!-- 自定义底部内容 -->
            <template #footer>
                <div class="drawer-footer-custom">
                    <a-alert type="info" message="这是一个自定义的底部提示信息" banner />
                </div>
            </template>
        </CustomDrawer>
    </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';

// 抽屉可见性控制
const drawerVisible = ref(false);
// 确认按钮加载状态
const confirmLoading = ref(false);

// 表单数据
const formState = reactive({
    name: '',
    description: '',
    status: true,
});

// 打开抽屉
const showDrawer = () => {
    drawerVisible.value = true;
};

// 取消操作
const handleCancel = () => {
    drawerVisible.value = false;
    message.info('已取消操作');
};

// 确认操作
const handleConfirm = async () => {
    try {
        confirmLoading.value = true;
        // 模拟异步操作
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        message.success('操作成功');
        drawerVisible.value = false;
    } catch (error) {
        message.error('操作失败');
    } finally {
        confirmLoading.value = false;
    }
};
</script>

<style scoped>
.drawer-content {
    padding: 16px;
}

.drawer-footer-custom {
    margin-top: 16px;
}
</style>
