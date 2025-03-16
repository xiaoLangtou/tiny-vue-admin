<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-04 16:54:16
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-15 23:59:32
 * @FilePath: src/views/system/dict/component/dict-type.vue
 * @Description: 字典类型列表页
 -->
<template>
    <div class="dict-type-container w-full">
        <!-- Search and Action Bar -->
        <div class="flex flex-col gap-2 mb-4">
            <a-input
                v-model:value="dataObj.nameOrCode"
                placeholder="请输入字典名称或字典编码"
                class="input-field"
                @keydown.enter="handleSearchDictType"
            >
                <template #suffix>
                    <Search class="icon" />
                </template>
            </a-input>
            <div class="action-buttons">
                <a-button type="primary" class="action-button" @click="openAddDialog">
                    <Plus class="icon" />
                    新增
                </a-button>
                <a-button type="primary" class="action-button">
                    <Download class="icon" />
                    导出
                </a-button>
            </div>
        </div>

        <!-- Dictionary List -->
        <div class="flex flex-col gap-1.5">
            <div
                v-for="item in dictList"
                :key="item.id"
                class="dict-item group"
                :style="{
                    '--dark-bg-active': token.colorPrimary,
                    '--light-bg-active': token.colorPrimaryBg,
                    '--dark-border-active': token.colorPrimaryActive,
                    '--light-border-active': token.colorPrimaryHover,
                }"
                :class="{ active: activeId === item.id }"
                @click="handleCurrentChange(item)"
            >
                <div class="dict-item__label">
                    <span class="dict-name">{{ item.dictName }}</span>
                    <span class="dict-code">({{ item.dictCode }})</span>
                </div>
                <div class="dict-item__controls group-hover:opacity-100 group-hover:translate-x-0">
                    <a-button type="text" class="control-button" @click.stop="editItem(item)">
                        <Edit class="icon" />
                    </a-button>
                    <a-button
                        :disabled="item.systemFlag === 'SYSTEM'"
                        type="text"
                        class="control-button"
                        @click.stop="deleteItem(item)"
                    >
                        <Trash2 class="icon" />
                    </a-button>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="dictList.length === 0" class="empty-state">暂无数据</div>
        </div>

        <dict-type-add ref="dictTypeAddRef" @close="getList"></dict-type-add>
    </div>
</template>

<script setup lang="ts">
import { useMessage } from '@/composables';
import { useAntdToken } from '@/composables/common/useAntdToken';
import { getDictDetail, getDictList, removeDict } from '@/service/apis/dict';
import type { IDictType } from '@/service/interface/dict';
import DictTypeAdd from '@/views/system/dict/component/dict-type-add.vue';
import { Download, Edit, Plus, Search, Trash2 } from 'lucide-vue-next';

const emits = defineEmits(['currentRow']);

const dictList = ref<IDictType[]>([]);
const dataObj = reactive({
    nameOrCode: '',
});

const dictTypeAddRef = useTemplateRef<typeof DictTypeAdd>('dictTypeAddRef');
const activeId = ref<number | string | undefined>('');
const { message } = useMessage();

const getList = async () => {
    try {
        const { data } = await getDictList(dataObj.nameOrCode);
        dictList.value = data;
        if (dictList.value.length) {
            activeId.value = dictList.value[0].id;
            emits('currentRow', dictList.value[0]);
        } else {
            activeId.value = '';
            emits('currentRow', null);
        }
    } catch {
        message.error('获取字典列表失败');
    }
};

const editItem = async (item: IDictType) => {
    try {
        const { data } = await getDictDetail(item.id);
        dictTypeAddRef.value?.openDialog('edit', data);
    } catch {
        message.error('获取字典详情失败');
    }
};

const deleteItem = async (item: IDictType) => {
    try {
        await removeDict(item.id);
        message.success('删除成功');
        await getList();
    } catch {
        message.error('删除失败');
    }
};

const handleCurrentChange = (row: IDictType) => {
    activeId.value = row.id ?? -1;
    emits('currentRow', row);
};

const handleSearchDictType = () => {
    getList();
};

const openAddDialog = () => {
    dictTypeAddRef.value?.openDialog();
};

onMounted(() => {
    getList();
});

defineExpose({
    getList,
});
const { token } = useAntdToken();
</script>

<style lang="scss" scoped>
.input-field {
    @apply flex-1 h-8 text-sm;
}

.icon {
    @apply w-3.5 h-3.5;
}

.action-buttons {
    @apply flex items-center gap-3;
}

.action-button {
    @apply h-8 px-3 flex items-center gap-1 text-sm rounded;
}

.dict-item {
    @apply flex items-center justify-between p-2.5 border rounded transition-all duration-200 cursor-pointer
    bg-gray-50/50 dark:bg-gray-700/20 border-gray-100 dark:border-gray-600/30
    hover:bg-gray-100/50 dark:hover:bg-gray-600/20;
}

.dict-item.active {
    --dark-bg-active: v-bind(token.colorPrimary);
    --light-bg-active: v-bind(token.colorPrimaryBg);
    --dark-border-active: v-bind(token.colorPrimaryActive);
    --light-border-active: v-bind(token.colorPrimaryHover);
    @apply bg-[var(--light-bg-active)] dark:bg-[var(--dark-bg-active)]  text-[var(--dark-bg-active)] dark:text-white;
}

.dict-item__label {
    @apply flex-1 min-w-0 pr-3;
}

.dict-name {
    @apply font-medium text-sm mr-1;
}

.dict-code {
    @apply text-gray-500 dark:text-gray-50 text-xs;
}

.dict-item__controls {
    @apply flex gap-1 opacity-0 translate-x-2 transition-all duration-200;
}

.control-button {
    @apply p-1 rounded;
}

.empty-state {
    @apply py-8 text-center text-gray-500 dark:text-gray-400;
}
</style>
