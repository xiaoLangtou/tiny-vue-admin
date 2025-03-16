<template>
    <div class="w-full">
        <div class="border border-br-light rounded pt-2 pl-2 pb-3 pr-2 box-border">
            <div class="top-1 z-10 flex gap-3 items-center justify-between">
                <a-dropdown-button type="primary" @click="authApiEnter">
                    提交
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="refresh">刷新数据</a-menu-item>
                            <a-menu-item key="select">选择全部</a-menu-item>
                            <a-menu-item key="unselect">取消选择</a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="expand">展开全部</a-menu-item>
                            <a-menu-item key="collapse">折叠全部</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown-button>
            </div>
            <div class="tree-content mt-5 h-[calc(100vh_-240px)] overflow-y-auto pb-10 mb-5">
                <a-tree
                    ref="apiTree"
                    v-model:checked-keys="apiTreeIds"
                    v-model:expanded-keys="apiExpandedKeys"
                    class="xlt-ant-tree"
                    :field-names="apiDefaultProps"
                    :tree-data="apiTreeData"
                    checkable
                    show-line
                >
                    <template #title="{ description, data }">
                        <div class="flex items-center gap-4 justify-between w-full pr-1">
                            <span>{{ description }} </span>
                            <span v-if="data.path" class="max-w-[240px] break-all overflow-ellipsis overflow-hidden">{{
                                data.path
                            }}</span>
                        </div>
                    </template>
                </a-tree>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMessage } from '@/composables';
import { getAllApis } from '@/service/apis/api';
import { getRoleApi, updateRolePermission } from '@/service/apis/casbin';
import type { Resp } from '@/service/interface/type.ts';
import { generateUUID } from '@/utils';
import { to } from '@/utils/result-handler.js';
import type { MenuProps, Tree } from 'ant-design-vue';

const { message } = useMessage();

defineOptions({
    name: 'ApiPermission',
});

const props = defineProps({
    role: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({}),
    },
});

const apiTree = useTemplateRef<typeof Tree>('apiTree');
const apiTreeData = ref<any[]>([]);
const apiTreeIds = ref<any[]>([]);
const apiExpandedKeys = ref<string[]>([]);
const setTreeOpenOrClose = (expend: boolean) => {
    const ids = extractIds(apiTreeData.value);
    apiExpandedKeys.value = expend ? ids : [];
};
const apiDefaultProps = ref({
    children: 'children',
    title: 'description',
    key: 'onlyId',
});

const init = async () => {
    const result = await to(getAllApis());
    if (!result.ok) return message.error(result.error.message);
    const apis = result.value.data as unknown as any[];
    apiTreeData.value = buildApiTree(apis);

    apiExpandedKeys.value = extractIds(apiTreeData.value);

    const casbinResult = await to<any>(getRoleApi(props.role.roleCode));
    if (!casbinResult.ok) return message.error(casbinResult.error.message);
    apiTreeIds.value = [];

    if (casbinResult.value.data) {
        casbinResult.value.data.forEach((item: any) => {
            apiTreeIds.value.push('p:' + item.path + '&m:' + item.method);
        });
    }
};

// 创建api树方法
const buildApiTree = (apis: any[]) => {
    const apiObj: Record<string, any> = {};
    if (apis) {
        apis.forEach((item) => {
            item.onlyId = 'p:' + item.path + '&m:' + item.method;
            if (Object.prototype.hasOwnProperty.call(apiObj, item.apiGroup)) {
                apiObj[item.apiGroup].push(item);
            } else {
                Object.assign(apiObj, { [item.apiGroup]: [item] });
            }
        });
    }

    const apiTree = [];
    for (const key in apiObj) {
        const treeNode = {
            ID: key,
            description: key + '组',
            onlyId: generateUUID(),
            children: apiObj[key],
        };
        apiTree.push(treeNode);
    }
    return apiTree;
};

const authApiEnter = async () => {
    const casbinInfos = [] as { path: string; method: string }[];
    // console.log('apiTreeIds', apiTreeIds.value);
    apiTreeIds.value.forEach((item: string) => {
        if (item.startsWith('p:') && item.indexOf('&m:') !== -1) {
            const casbinInfo = {
                path: item.split('&m:')[0].split('p:')[1],
                method: item.split('&m:')[1],
            };
            casbinInfos.push(casbinInfo);
        }
    });
    const result = await to(
        updateRolePermission({
            roleCode: props.role.roleCode,
            apis: casbinInfos,
        }),
    );
    if (!result.ok) return;
    if ((result.value as unknown as Resp).code === 0) {
        await init();
        message.success('api设置成功');
    }
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
        case 'expand':
            setTreeOpenOrClose(true);
            break;
        case 'collapse':
            setTreeOpenOrClose(false);
            break;
        case 'select':
            apiTreeIds.value = extractIds(apiTreeData.value);
            break;
        case 'unselect':
            apiTreeIds.value = [];
            break;
        case 'refresh':
            init();
            break;
    }
};

watch(
    () => props.role,
    (val) => {
        if (!val.id) return;
        init();
    },
    { immediate: true },
);

defineExpose({
    init,
});

const extractIds = (data: any[]): string[] => {
    const ids: string[] = [];
    data.forEach((item: any) => {
        ids.push(item.onlyId);
        if (item.children && item.children.length > 0) {
            ids.push(...extractIds(item.children));
        }
    });
    return ids;
};
</script>
