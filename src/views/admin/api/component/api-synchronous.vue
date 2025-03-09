<template>
    <custom-drawer v-model:open="visible" title="同步接口" direction="rtl" width="80%" @confirm="handleSyncAllApi">
        <div class="api-sync-container">
            <!-- Warning Alert -->
            <a-alert
                message="同步API，不输入路由分组将不会被自动同步，如果api不需要参与鉴权，可以按忽略按钮进行忽略。"
                type="warning"
                show-icon
                :closable="false"
            />

            <!-- New Route Section -->
            <div class="flex items-center gap-2 mt-3">
                <a-typography-text>新增路由</a-typography-text>
                <a-typography-text type="secondary">存在于当前路由中，但是不存在于api表</a-typography-text>
            </div>

            <!-- API Table -->
            <a-table :data-source="apiRoutes.newApis" :pagination="false">
                <a-table-column key="path" title="API路径" data-index="path">
                    <template #default="{ text }">
                        <span class="font-mono">{{ text }}</span>
                    </template>
                </a-table-column>

                <a-table-column key="apiGroup" title="API分组" data-index="apiGroup">
                    <template #default="{ record }">
                        <a-select
                            v-model:value="record.apiGroup"
                            allow-create
                            show-search
                            placeholder="请选择API分组"
                            class="w-full"
                        >
                            <a-select-option v-for="(item, index) in apiRoutes.apiGroups" :key="index" :value="item">
                                {{ item }}
                            </a-select-option>
                        </a-select>
                    </template>
                </a-table-column>

                <a-table-column key="description" title="API简介" data-index="description">
                    <template #default="{ record }">
                        <a-input v-model:value="record.description" placeholder="输入API简介" bordered="false" />
                    </template>
                </a-table-column>

                <a-table-column key="method" title="请求" data-index="method">
                    <template #default="{ record }">
                        <span class="text-sm"
                            >{{ record.method }}/{{ HttpMethodCN[record.method as HTTP_METHOD] }}</span
                        >
                    </template>
                </a-table-column>

                <a-table-column key="action" title="操作" :width="200">
                    <template #default="{ record }">
                        <div class="flex gap-2">
                            <a-button type="link" class="xlt-btn" @click="handleAddApi(record)">
                                <template #icon>
                                    <Plus :size="14" />
                                </template>
                                单条新增
                            </a-button>
                            <a-button type="link" class="xlt-btn" @click="handleIgnoreApi(record, 1)">
                                <template #icon>
                                    <CircleMinus :size="14" />
                                </template>
                                忽略
                            </a-button>
                        </div>
                    </template>
                </a-table-column>
            </a-table>

            <!-- Delete Route Section -->
            <div class="flex items-center gap-2 mt-3">
                <a-typography-text>删除路由</a-typography-text>
                <a-typography-text type="secondary"
                    >已经不存在于当前项目的路由中，确定同步后会自动从apis表删除
                </a-typography-text>
            </div>

            <!-- Delete API Table -->
            <a-table :data-source="apiRoutes.deleteApis" :pagination="false">
                <a-table-column key="path" title="API路径" data-index="path">
                    <template #default="{ text }">
                        <span class="font-mono">{{ text }}</span>
                    </template>
                </a-table-column>

                <a-table-column key="apiGroup" title="API分组" data-index="apiGroup" />

                <a-table-column key="description" title="API简介" data-index="description" />

                <a-table-column key="method" title="请求" data-index="method">
                    <template #default="{ record }">
                        <span class="text-sm"
                            >{{ record.method }}/{{ HttpMethodCN[record.method as HTTP_METHOD] }}</span
                        >
                    </template>
                </a-table-column>
            </a-table>

            <!-- Ignore Route Section -->
            <div class="flex items-center gap-2 mt-3">
                <a-typography-text>忽略路由</a-typography-text>
                <a-typography-text type="secondary"
                    >忽略路由不参与api同步，常见为不需要进行鉴权行为的路由
                </a-typography-text>
            </div>

            <!-- Ignore API Table -->
            <a-table :data-source="apiRoutes.ignoreApis" :pagination="false">
                <a-table-column key="path" title="API路径" data-index="path">
                    <template #default="{ text }">
                        <span class="font-mono">{{ text }}</span>
                    </template>
                </a-table-column>

                <a-table-column key="apiGroup" title="API分组" data-index="apiGroup" />

                <a-table-column key="description" title="API简介" data-index="description" />

                <a-table-column key="method" title="请求" data-index="method">
                    <template #default="{ record }">
                        <span class="text-sm"
                            >{{ record.method }}/{{ HttpMethodCN[record.method as HTTP_METHOD] }}</span
                        >
                    </template>
                </a-table-column>

                <a-table-column key="action" title="操作" :width="200">
                    <template #default="{ record }">
                        <a-button type="link" class="xlt-btn" @click="handleIgnoreApi(record, 0)">
                            <template #icon>
                                <CircleMinus :size="14" />
                            </template>
                            取消忽略
                        </a-button>
                    </template>
                </a-table-column>
            </a-table>
        </div>
    </custom-drawer>
</template>

<script setup lang="ts">
import { Plus, CircleMinus } from 'lucide-vue-next';
import type { IApiSync, IApi } from '@/service/interface/api';
import { to } from '@/utils/result-handler';
import { addApi, batchCreateApi, ignoreApi, syncApi } from '@/service/apis/api';
import { HttpMethodCN, HTTP_METHOD } from '@/global/enums';
import { useMessage } from '@/composables';

const { message } = useMessage();

const visible = ref(false);

const apiRoutes = ref<IApiSync>({
    newApis: [],
    deleteApis: [],
    ignoreApis: [],
    apiGroups: [],
});

const getApiList = async () => {
    const result = await to(syncApi());
    if (!result.ok) return message.error('获取数据错误');
    apiRoutes.value = result.value.data;
};

// 新增api
const handleAddApi = async (row: IApi) => {
    if (!row.apiGroup || !row.description) return message.error('请完善API的分组和简介');
    const result = await to(
        addApi({
            ...row,
            tags: row.apiGroup,
        }),
    );
    if (!result.ok) return;
    message.success('新增成功');
    await getApiList();
};

// 忽略api
const handleIgnoreApi = async (row: IApi, ignore: number) => {
    const result = await to(
        ignoreApi({
            ...row,
            ignore,
        }),
    );
    if (!result.ok) return;
    message.success(ignore === 1 ? '忽略成功' : '取消成功');
    await getApiList();
};

// 新增所有的api接口
const handleSyncAllApi = async () => {
    // 判断接口的分组和描述是否填写
    for (const item of apiRoutes.value.newApis) {
        if (!item.apiGroup || !item.description) return message.error('请完善API的分组和简介');
        item.tags = item.apiGroup;
    }
    const result = await to(batchCreateApi(apiRoutes.value.newApis));
    if (!result.ok) return;
    message.success('同步成功');
    await getApiList();
};

const open = () => {
    visible.value = true;
    getApiList();
};

defineExpose({
    open,
});
</script>

<style lang="scss" scoped>
.api-sync-container {
    box-sizing: border-box;
    width: 100%;
}
</style>
