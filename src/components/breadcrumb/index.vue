<template>
    <a-breadcrumb>
        <template #separator>
            <ChevronRight :size="16"></ChevronRight>
        </template>
        <a-breadcrumb :routes="breadcrumbList" separator="">
            <template #itemRender="itemRender">
                <span v-if="breadcrumbList.indexOf(itemRender.route) === breadcrumbList.length - 1">
                    {{ formatterBreadcrumb(itemRender.route) }}
                </span>
                <router-link v-else :to="`/${itemRender.paths[itemRender.paths.length - 1]}`">
                    {{ formatterBreadcrumb(itemRender.route) }}
                </router-link>
            </template>
        </a-breadcrumb>
    </a-breadcrumb>
</template>

<script lang="ts" setup>
import { ChevronRight } from 'lucide-vue-next';

const route = useRoute();

interface Route {
    path: string;
    breadcrumbName: string;
    children?: Array<{
        path: string;
        breadcrumbName: string;
    }>;
}

defineOptions({
    name: 'AppBreadcrumb',
});

// 假设 route 是一个全局变量或通过 props 传入的对象

const formatterBreadcrumb = (broadcrumb: Route) => {
    return broadcrumb.breadcrumbName ?? '未知页面';
};

const breadcrumbList = computed(() => {
    const matched = route.matched;

    // 默认的面包屑，通常是首页
    const defaultBreadcrumb: Route = { path: '/dashboard', breadcrumbName: '首页' };

    // 将 matched 处理为面包屑列表
    const breadcrumbItems = matched
        .slice(1) // 跳过第一个项（通常是根路径，已经包含首页）
        .map((item) => ({
            path: item.meta?.path ?? '', // 提供默认值避免 undefined
            breadcrumbName: item.meta?.title ?? '未知页面', // 提供默认值
            children: item.children?.map((child) => ({
                path: child.path,
                breadcrumbName: child.meta?.title ?? '未知子页面', // 提供默认值
            })),
        }));
    console.log(breadcrumbItems);
    // 返回最终的面包屑列表，包括首页作为默认项
    return [defaultBreadcrumb, ...breadcrumbItems];
});
</script>

<style lang="scss">
.ant-breadcrumb {
    ol {
        li {
            @apply flex items-center;
        }
    }
}
</style>
