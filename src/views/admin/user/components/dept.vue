<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-13 11:00:35
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-13 17:54:09
 * @FilePath: src/views/admin/user/components/dept.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div>
        <div class="w-full xlt-flex-center">
            <a-input v-model:value="filterText" placeholder="输入关键字进行过滤" allow-clear>
                <template #prefix>
                    <SearchIcon :size="16" />
                </template>
            </a-input>
            <a-dropdown trigger="click">
                <MoreVerticalIcon :size="18" class="cursor-pointer" />
                <template #overlay>
                    <a-menu>
                        <a-menu-item @click="getDeptTreeList">刷新数据</a-menu-item>
                        <a-menu-item @click="toggleTreeNodes(true)">展开全部</a-menu-item>
                        <a-menu-item @click="toggleTreeNodes(false)">折叠全部</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <div class="tree-data mt-4">
            <a-tree
                v-if="deptTreeList.length"
                show-line
                show-icon
                default-expand-all
                :tree-data="deptTreeList"
                :field-names="{
                    children: 'children',
                    title: 'deptName',
                    key: 'id',
                }"
                @select="handleTreeDataSelect"
            >
            </a-tree>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getDeptTree } from '@/service/apis/dept.ts';
import type { IDept } from '@/service/interface/dept.ts';
import { MoreVerticalIcon, SearchIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const emit = defineEmits(['change']);
const deptTreeList = ref<IDept[]>([]);

const getDeptTreeList = async () => {
    const { data } = await getDeptTree();
    deptTreeList.value = data;
};

const handleTreeDataSelect = (data: string[]) => {
    if (data.length) {
        const deptId = data[0];
        emit('change', deptId);
    }
};

onMounted(getDeptTreeList);
</script>

<style scoped lang="scss">
.ant-tree .ant-tree-treenode {
    @apply pb-3;
}
</style>
