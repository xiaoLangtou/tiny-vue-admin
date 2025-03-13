<template>
    <custom-drawer
        v-model:open="dialogVisible"
        :title="dialogTitle"
        width="800px"
        :confirm-loading="confirmLoading"
        @close="closeDialog"
        @confirm="handleSave"
    >
        <template #title>
            <div class="flex items-center">
                <FileTextOutlined :style="{ color: 'var(--ant-primary-color)', fontSize: '20px' }" />
                <span class="ml-2">{{ dialogTitle }}</span>
            </div>
        </template>

        <a-form ref="formRef" layout="vertical" :model="formData" :rules="rules">
            <a-row :gutter="8">
                <a-col :span="12">
                    <a-form-item label="类型" name="menuType">
                        <a-radio-group v-model:value="formData.menuType" :disabled="!!formData.id">
                            <a-radio-button v-for="(item, key) in menuTypeDict" :key="key" :value="+key"
                                >{{ item }}
                            </a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="上级菜单" name="parentId">
                        <a-tree-select
                            v-model:value="formData.parentId"
                            :tree-data="menuTreeData"
                            placeholder="请选择上级菜单"
                            :field-names="{ children: 'children', label: 'name', value: 'id' }"
                            allow-clear
                            tree-default-expand-all
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item :label="`${editLabelName()}名称`" name="name">
                        <a-input v-model:value="formData.name" placeholder="请输入名称" allow-clear />
                    </a-form-item>
                </a-col>
                <a-col v-if="[0, 1].includes(formData.menuType)" :span="12">
                    <a-form-item label="路由地址" name="path">
                        <a-tooltip title="route.path" placement="topLeft">
                            <a-input v-model:value="formData.path" placeholder="请输入路由地址" allow-clear />
                        </a-tooltip>
                    </a-form-item>
                </a-col>
                <a-col v-if="[1].includes(formData.menuType)" :span="12">
                    <a-form-item label="组件路径" name="component">
                        <a-tooltip title="route.component" placement="topLeft">
                            <a-input v-model:value="formData.component" placeholder="请输入组件路径" allow-clear />
                        </a-tooltip>
                    </a-form-item>
                </a-col>
                <a-col v-if="[1].includes(formData.menuType)" :span="12">
                    <a-form-item label="组件名称" name="enName">
                        <a-tooltip title="route.name" placement="topLeft">
                            <a-input v-model:value="formData.enName" placeholder="请输入组件英文名称" allow-clear />
                        </a-tooltip>
                    </a-form-item>
                </a-col>
                <a-col v-if="[2, 1].includes(formData.menuType)" :span="12">
                    <a-form-item label="权限标识" name="permission">
                        <a-input v-model:value="formData.permission" placeholder="请输入权限标识" allow-clear />
                    </a-form-item>
                </a-col>
                <a-col v-if="[0, 1].includes(formData.menuType)" :span="12">
                    <a-form-item label="菜单图标" name="icon">
                        <SelectIcon v-model:model-value="formData.icon"></SelectIcon>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="显示排序" name="sortOrder">
                        <a-input-number v-model:value="formData.sortOrder" :min="0" style="width: 100%" />
                    </a-form-item>
                </a-col>
                <template v-if="[0, 1].includes(formData.menuType)">
                    <a-col :span="12">
                        <a-form-item label="是否缓存" name="isKeepAlive">
                            <a-select v-model:value="formData.isKeepAlive">
                                <a-select-option value="1">是</a-select-option>
                                <a-select-option value="0">否</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="是否隐藏" name="isHide">
                            <a-select v-model:value="formData.isHide">
                                <a-select-option value="1">显示</a-select-option>
                                <a-select-option value="0">隐藏</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="是否外链" name="isIframe">
                            <a-select v-model:value="formData.isIframe">
                                <a-select-option value="1">是</a-select-option>
                                <a-select-option value="0">否</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </template>
            </a-row>
        </a-form>
    </custom-drawer>
</template>

<script setup lang="ts">
import { FileTextOutlined } from '@ant-design/icons-vue';
import { createMenu, getMenuTreeList, updateMenu } from '@/service/apis/menu';
import { getDictDataListByType } from '@/service/apis/dict';
import type { IMenu, MenuOptions } from '@/service/interface/menu';
import { useAntdForm, useMessage } from '@/composables';

const emits = defineEmits(['close']);
const dialogTitle = ref('新增菜单');
const dialogVisible = ref(false);
const confirmLoading = ref(false);

const { message } = useMessage();

const menuTypeDict = reactive<Record<string, string>>({
    0: '目录',
    1: '菜单',
    2: '按钮',
});

const { createCustomRule, formRef, formData, resetFields, validate } = useAntdForm<IMenu>({
    _formData: ref<IMenu>({
        menuType: 0,
        parentId: -1,
        name: '',
        path: '',
        sortOrder: 999,
        icon: '',
        isKeepAlive: '0',
        isHide: '0',
        isIframe: '0',
        permission: '',
        component: '',
        enName: '',
    }),
});
const rules = {
    name: [createCustomRule({ message: '请输入菜单名称' })],
    sortOrder: [createCustomRule({ message: '请输入显示排序', type: 'number' })],
    component: [createCustomRule({ message: '请输入组件路径' })],
    path: [createCustomRule({ message: '请输入路由地址' })],
};

const menuTreeData = ref<MenuOptions[]>([]);

const editLabelName = () => {
    return menuTypeDict[formData.value.menuType];
};

const openDialog = async (type = 'add', data: any = {}) => {
    dialogTitle.value = type === 'edit' ? '修改菜单' : '新增菜单';
    formData.value.parentId = data.parentId || -1;
    if (type === 'edit') {
        await nextTick();
        dialogTitle.value = '修改菜单';
        formData.value.id = data.id;
        formData.value.menuType = Number(data.menuType);
        formData.value.parentId = Number(data.parentMenuId);
        formData.value.name = data.name;
        formData.value.path = data.path;
        formData.value.sortOrder = data.sortOrder;
        formData.value.icon = data.icon;
        formData.value.isKeepAlive = data.keepAlive;
        formData.value.isHide = data.visible;
        formData.value.isIframe = data.isIframe;
        formData.value.permission = data.permission;
        formData.value.component = data.component;
        formData.value.enName = data.enName;
    }
    await getAllMenu();
    await getMenuTypeDict();
    dialogVisible.value = true;
};

const getAllMenu = async () => {
    const { data } = await getMenuTreeList();
    menuTreeData.value = [
        {
            id: -1,
            name: '根目录',
            children: data,
        } as unknown as MenuOptions,
    ];
};

const getMenuTypeDict = async () => {
    const { data } = await getDictDataListByType('system_menu_type');
    console.log(data);
};

const handleSave = async () => {
    try {
        confirmLoading.value = true;
        await validate();
        const saveURL = formData.value.id ? updateMenu : createMenu;
        await saveURL(formData.value);
        message.success('保存成功');
        closeDialog();
    } catch (error) {
        console.error(error);
    } finally {
        confirmLoading.value = false;
    }
};

const closeDialog = () => {
    resetFields();
    dialogVisible.value = false;
    emits('close');
};

defineExpose({
    openDialog,
});
</script>
