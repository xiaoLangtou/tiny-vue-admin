<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-15 00:35:03
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-15 00:47:53
 * @FilePath: src/views/admin/role/components/empty-data.vue
 * @Description: 角色管理空状态组件
 -->
<template>
    <div class="flex flex-col items-center justify-center min-h-[70vh] p-6 max-w-3xl mx-auto font-sans">
        <div
            class="flex flex-col items-center text-center p-6 sm:p-10 bg-gray-50 dark:bg-gray-800 rounded-xl w-full shadow-sm"
        >
            <img
                src="@/assets/images/show-role.svg"
                alt="请选择一个角色来查看相关权限和功能"
                class="w-36 sm:w-44 h-auto mb-8"
            />
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">请选择角色</h2>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                您需要选择一个角色来查看相关权限和功能
            </p>
        </div>

        <div
            class="mt-10 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 rounded w-full"
        >
            <div class="flex items-center mb-3 text-blue-700 dark:text-blue-400 font-semibold">
                <InfoIcon class="mr-2 h-5 w-5" />
                <span>角色说明</span>
            </div>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 text-sm sm:text-base">
                角色用于标识团队中不同的职责和权限，如财务、人事或项目管理。选择角色后可以查看和使用相应的功能模块。
            </p>
            <a href="/help/roles" class="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                >了解更多角色相关信息</a
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { InfoIcon } from 'lucide-vue-next';

defineOptions({
    name: 'EmptyData',
});
</script>
