<template>
    <custom-drawer
        v-model:open="dialogVisible"
        :title="dialogTitle"
        width="50%"
        :confirm-loading="confirmLoading"
        @cancel="closeDialog"
        @confirm="handleSave"
    >
        <template #title>
            <div class="flex items-center">
                <FileTextOutlined :style="{ color: 'var(--ant-primary-color)', fontSize: '20px' }" />
                <span class="ml-2">{{ dialogTitle }}</span>
            </div>
        </template>

        <a-form ref="menuFormRef" :model="formData" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-form-item label="类型" name="menuType">
                <a-radio-group v-model:value="formData.menuType" :disabled="!!formData.id">
                    <a-radio-button v-for="(item, key) in menuTypeDict" :key="key" :value="+key"
                        >{{ item }}
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>

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

            <a-form-item :label="`${editLabelName()}名称`" name="name">
                <a-input v-model:value="formData.name" placeholder="请输入名称" allow-clear />
            </a-form-item>

            <a-form-item v-if="[0, 1].includes(formData.menuType)" label="路由地址" name="path">
                <a-tooltip title="route.path" placement="topLeft">
                    <a-input v-model:value="formData.path" placeholder="请输入路由地址" allow-clear />
                </a-tooltip>
            </a-form-item>

            <a-form-item v-if="[1].includes(formData.menuType)" label="组件路径" name="component">
                <a-tooltip title="route.component" placement="topLeft">
                    <a-input v-model:value="formData.component" placeholder="请输入组件路径" allow-clear />
                </a-tooltip>
            </a-form-item>

            <a-form-item v-if="[1].includes(formData.menuType)" label="组件名称" name="enName">
                <a-tooltip title="route.name" placement="topLeft">
                    <a-input v-model:value="formData.enName" placeholder="请输入组件英文名称" allow-clear />
                </a-tooltip>
            </a-form-item>

            <a-form-item v-if="[2, 1].includes(formData.menuType)" label="权限标识" name="permission">
                <a-input v-model:value="formData.permission" placeholder="请输入权限标识" allow-clear />
            </a-form-item>

            <a-form-item v-if="[0, 1].includes(formData.menuType)" :label="`${editLabelName()}图标`" name="icon">
                <select-icon v-model="formData.icon" />
            </a-form-item>

            <a-form-item label="显示排序" name="sortOrder">
                <a-input-number v-model:value="formData.sortOrder" :min="0" style="width: 100%" />
            </a-form-item>

            <template v-if="[0, 1].includes(formData.menuType)">
                <div class="flex justify-between flex-wrap">
                    <a-form-item label="是否缓存" name="isKeepAlive">
                        <a-switch
                            v-model:checked="formData.isKeepAlive"
                            checked-children="是"
                            un-checked-children="否"
                        />
                    </a-form-item>
                    <a-form-item label="是否隐藏" name="isHide">
                        <a-switch
                            v-model:checked="formData.isHide"
                            checked-children="隐藏"
                            un-checked-children="展示"
                        />
                    </a-form-item>
                    <a-form-item label="是否外链" name="isIframe">
                        <a-switch v-model:checked="formData.isIframe" checked-children="是" un-checked-children="否" />
                    </a-form-item>
                </div>
            </template>
        </a-form>
    </custom-drawer>
</template>

<script setup lang="ts" name="MenuAdd">
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { FileTextOutlined } from '@ant-design/icons-vue';
import { createMenu, getMenuTreeList, updateMenu } from '@/service/apis/menu';
import { getDictDataListByType } from '@/service/apis/dict';
import { IMenu, MenuOptions } from '@/service/interface/menu';

const emits = defineEmits(['close']);
const dialogTitle = ref('新增菜单');
const dialogVisible = ref(false);
const confirmLoading = ref(false);
const menuFormRef = ref<FormInstance>();

let formData = reactive<IMenu>({
    menuType: 0,
    parentId: -1,
    name: '',
    path: '',
    sortOrder: 999,
    icon: 'icon-kuaizhuangshitu-copy',
    isKeepAlive: false,
    isHide: false,
    isIframe: false,
    permission: '',
    component: '',
    enName: '',
});

const menuTypeDict = reactive<Record<string, string>>({
    0: '目录',
    1: '菜单',
    2: '按钮',
});

const rules = {
    name: [{ required: true, message: '请输入菜单名称' }],
    sortOrder: [{ required: true, message: '请输入显示排序' }],
    component: [{ required: true, message: '请输入组件路径' }],
    path: [{ required: true, message: '请输入路由地址' }],
};

const menuTreeData = ref<MenuOptions[]>([]);

const editLabelName = () => {
    return menuTypeDict[formData.menuType];
};

const openDialog = async (type = 'add', data: any = {}) => {
    dialogTitle.value = type === 'edit' ? '修改菜单' : '新增菜单';
    formData.parentId = data.parentId || -1;
    if (type === 'edit') {
        await nextTick();
        dialogTitle.value = '修改菜单';
        formData.id = data.id;
        formData.menuType = Number(data.menuType);
        formData.parentId = Number(data.parentMenuId);
        formData.name = data.name;
        formData.path = data.path;
        formData.sortOrder = data.sortOrder;
        formData.icon = data.icon;
        formData.isKeepAlive = data.keepAlive === '1';
        formData.isHide = data.visible === '1';
        formData.isIframe = data.isIframe === '1';
        formData.permission = data.permission;
        formData.component = data.component;
        formData.enName = data.enName;
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
        await menuFormRef.value?.validate();
        const saveURL = formData.id ? updateMenu : createMenu;
        await saveURL(formData);
        message.success('保存成功');
        closeDialog();
    } catch (error) {
        console.error(error);
    } finally {
        confirmLoading.value = false;
    }
};

const closeDialog = () => {
    formData.id = undefined;
    formData.name = '';
    formData.path = '';
    formData.sortOrder = 0;
    formData.icon = 'icon-kuaizhuangshitu-copy';
    formData.isKeepAlive = false;
    formData.isHide = false;
    formData.isIframe = false;
    formData.permission = '';
    formData.component = '';
    menuFormRef.value?.resetFields();
    dialogVisible.value = false;
    emits('close');
};

defineExpose({
    openDialog,
});
</script>
