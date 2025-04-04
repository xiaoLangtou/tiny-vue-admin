<template>
    <div class="xlt-base-container">
        <api-search @search="handleSearchEvent" @reset="handleSearchEvent"></api-search>
        <div class="xlt-container">
            <div class="card content-box w-full">
                <data-table
                    :data-source="[...tableData] as IApi[]"
                    v-bind="{ ...tableConfig, pagination, ...toolbarConfig }"
                    show-pagination
                    @page-change="handlePageChange"
                >
                    <template #toolbar-buttons>
                        <a-button
                            v-auth="['role:synchronization:btn']"
                            type="primary"
                            class="flex items-center justify-center gap-1"
                            :icon="CompassIcon({ size: 14 }, {} as any)"
                            @click="handleSynchronousApi"
                        >
                            同步API
                        </a-button>
                        <a-button
                            v-auth="['role:add:btn']"
                            class="flex items-center justify-center gap-1"
                            :icon="RefreshCw({ size: 14 }, {} as any)"
                        >
                            刷新缓存
                        </a-button>
                        <a-button
                            v-auth="['role:add:btn']"
                            class="flex items-center justify-center gap-1"
                            :icon="LucideBookmark({ size: 14 }, {} as any)"
                            @click="lookApiDocument"
                        >
                            查看文档
                        </a-button>
                    </template>
                </data-table>
            </div>
            <!-- <api-add></api-add> -->
            <api-synchronous ref="apiSynchronousRef" @close="send"></api-synchronous>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useTableConfig } from '@/composables';
import { useWindowOpen } from '@/composables/common/useWindowOpen.ts';
import { HTTP_METHOD, HttpMethodCN } from '@/global/enums';
import { getApiList } from '@/service/apis/api';
import type { IApi, IApiParams } from '@/service/interface/api';
import { usePagination } from 'alova/client';
import { CompassIcon, LucideBookmark, RefreshCw } from 'lucide-vue-next';
import { ApiSearch, ApiSynchronous } from './component';

const queryForm = ref<IApiParams>({});

const { tableConfig, pagination, toolbarConfig } = useTableConfig({
    columns: [
        {
            dataIndex: 'path',
            title: 'API路径',
            minWidth: 200,
        },
        {
            dataIndex: 'apiGroup',
            title: 'API分组',
            minWidth: 200,
        },
        {
            dataIndex: 'description',
            title: 'API简介',
            minWidth: 200,
        },
        {
            dataIndex: 'method',
            title: '请求方式',
            minWidth: 200,
            customRender: ({ record }) => {
                return (record as IApi).method !== undefined
                    ? `${(record as IApi).method}/${HttpMethodCN[(record as IApi).method as HTTP_METHOD]}`
                    : '';
            },
        },
    ],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
    controlsWidth: 240,
    isCreateTime: false,
    isControls: false,
});
const apiSynchronousRef = useTemplateRef<typeof ApiSynchronous>('apiSynchronousRef');
const { data: tableData, send } = usePagination(
    () =>
        getApiList({
            current: pagination.value.current,
            size: pagination.value.pageSize,
            ...queryForm.value,
        }),
    {
        force: true,
        total: (response) => {
            pagination.value.total = response.data?.pager?.total || 0;
            return response.data?.pager?.total || 0;
        },
        data: (response): IApi[] => response.data?.records ?? [],
    },
);

const handleSearchEvent = (form: IApiParams) => {
    queryForm.value = form;
    console.log(queryForm.value);
    send();
};
const handlePageChange = ({ current, size }: { current: number; size: number }) => {
    pagination.value.current = current;
    pagination.value.pageSize = size;
    console.log(current, size);
    send();
};

const handleSynchronousApi = () => {
    apiSynchronousRef.value?.open();
};

const lookApiDocument = () => {
    useWindowOpen({
        url: 'https://xiaolangtou.apifox.cn',
        target: '_blank',
    });
};
</script>
