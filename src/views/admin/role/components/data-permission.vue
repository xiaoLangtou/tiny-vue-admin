<template>
    <div class="w-full">
        <a-radio-group v-model:value="dataScope">
            <a-radio :value="0">全部数据</a-radio>
            <a-radio :value="1">本人数据</a-radio>
            <a-radio :value="2">自定义数据</a-radio>
            <a-radio :value="3">本部门数据</a-radio>
            <a-radio :value="4">本部门及以下数据</a-radio>
        </a-radio-group>

        <div v-if="dataScope === 2" class="border border-br-light rounded pt-2 pl-2 pb-3 pr-2 box-border">
            <div class="mb-2 flex justify-between">
                <a-checkbox
                    v-model:checked="checkAll"
                    :indeterminate="isIndeterminate"
                    style="font-size: 16px"
                    @change="setMenuCheck"
                >
                    公司部门权限
                </a-checkbox>
                <div class="select-none">
                    <a-button type="link" @click="setDeptOpenOrClose(true)">展开</a-button>
                    <span class="text-sm align-middle ml-0.5 mr-0.5">/</span>
                    <a-button type="link" @click="setDeptOpenOrClose(false)">折叠</a-button>
                </div>
            </div>
            <a-tree
                ref="treeRef"
                class="pl-2"
                :tree-data="deptTreeData"
                checkable
                :default-expand-all="true"
                :checked-keys="role.deptIds"
                :field-names="{ title: 'deptName', key: 'id', children: 'children' }"
                @check="handleNodeClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getDeptTree } from '@/service/apis/dept';
import type { IRole } from '@/service/interface/role';
import type { Tree } from 'ant-design-vue';

defineOptions({
    name: 'DataPermission',
});

const props = defineProps({
    role: {
        type: Object as PropType<IRole>,
        default: () => ({}),
    },
});

const isIndeterminate = ref(false);
const deptTreeData = ref<any[]>([]);
const checkAll = ref(false);
const treeRef = useTemplateRef<typeof Tree>('treeRef');
const dataScope = ref(undefined);

const setMenuCheck = () => {
    const ids = extractIds(deptTreeData.value);
    treeRef.value?.setCheckedKeys(checkAll.value ? ids : []);
    isIndeterminate.value = false;
};

const setDeptOpenOrClose = (expend: boolean) => {
    const ids = extractIds(deptTreeData.value);
    ids.forEach((id: any) => {
        if (treeRef.value?.store.nodesMap[id]) {
            treeRef.value.store.nodesMap[id].expanded = expend;
        }
    });
};

const handleNodeClick = (checkedKeys: any) => {
    const ids = extractIds(deptTreeData.value);
    const checkDeptLen = checkedKeys.checked.length || 0;
    isIndeterminate.value = checkDeptLen > 0 && checkDeptLen < ids.length;
    checkAll.value = checkDeptLen === ids.length;
};

const getDeptTreeList = async () => {
    const { data } = await getDeptTree();
    deptTreeData.value = data;
    const ids = extractIds(data);
    const roleDeptLen = props.role.deptIds?.length || 0;
    checkAll.value = roleDeptLen === ids.length;

    if (props.role.menus) {
        isIndeterminate.value = roleDeptLen > 0 && roleDeptLen < ids.length;
    }
};

const extractIds = (data: any[]): number[] => {
    const ids: number[] = [];
    data.forEach((item: any) => {
        ids.push(item.id);
        if (item.children && item.children.length > 0) {
            ids.push(...extractIds(item.children));
        }
    });
    return ids;
};

const getCheckedKeys = () => {
    return treeRef.value?.getCheckedKeys() as number[];
};

onMounted(() => {
    getDeptTreeList();
});

defineExpose({
    getCheckedKeys,
});
</script>

<style scoped lang="scss"></style>
