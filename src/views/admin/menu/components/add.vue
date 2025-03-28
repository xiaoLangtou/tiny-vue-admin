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
        <!--新增可控按钮-->
        <div class="flex items-center gap-3">
            <a-button type="primary" class="xlt-btn mb-3" @click="handleAddCommonButtons">
                <template #icon>
                    <Edit3Icon :size="16" />
                </template>
                添加常用按钮
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="buttonSource" size="middle" :bordered="false" :pagination="false">
            <template #bodyCell="{ column, text, record }">
                <template v-if="['btnName', 'permission'].includes(column.dataIndex)">
                    <div>
                        <a-input
                            v-if="record.$edit"
                            v-model:value.trim="editableData[record.key][column.dataIndex]"
                            style="margin: -5px 0"
                        />

                        <span v-else class="font-mono"> {{ text }}</span>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                    <div class="editable-row-operations">
                        <span v-if="editableData[record.key]" class="xlt-flex-center gap-2">
                            <a-typography-link @click="save(record.key)">确定</a-typography-link>
                            <a-typography-link @click="cancel(record.key)">取消</a-typography-link>
                        </span>
                        <span v-else class="xlt-flex-center gap-2">
                            <a-typography-link @click="edit(record.key)">编辑</a-typography-link>
                            <a-popconfirm title="确定删除?" @confirm="deleteData(record.key)">
                                <a-typography-link>删除</a-typography-link>
                            </a-popconfirm>
                        </span>
                    </div>
                </template>
            </template>
        </a-table>
        <a-button type="dashed" class="xlt-btn mt-3 w-full" @click="handleAddControllableBtn">
            <template #icon>
                <Plus :size="16" />
            </template>
            添加自定义按钮
        </a-button>
    </custom-drawer>
</template>

<script setup lang="ts">
import { useAntdForm, useDeepClone, useMessage } from '@/composables';
import { getDictDataListByType } from '@/service/apis/dict';
import { createMenu, getMenuTreeList, updateMenu } from '@/service/apis/menu';
import type { IMenu, MenuOptions } from '@/service/interface/menu';
import { generateUUID } from '@/utils';
import { FileTextOutlined } from '@ant-design/icons-vue';
import { Plus } from 'lucide-vue-next';
import type { UnwrapRef } from 'vue';

const emits = defineEmits(['close']);
const dialogTitle = ref('新增菜单');
const dialogVisible = ref(false);
const confirmLoading = ref(false);

const { message } = useMessage();

const menuTypeDict = reactive<Record<string, string>>({
    0: '目录',
    1: '菜单',
});

const columns = [
    {
        title: '按钮名称',
        dataIndex: 'btnName',
        width: '40%',
    },
    {
        title: '权限标识',
        dataIndex: 'permission',
        width: '40%',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
    },
];

interface DataItem {
    key: string;
    btnName: string;
    permission: string;
    $edit: boolean;
}

const commonButtons: DataItem[] = [
    {
        key: generateUUID(),
        btnName: '新增',
        permission: 'btn:add',
        $edit: false,
    },
    {
        key: generateUUID(),
        btnName: '修改',
        permission: 'btn:edit',
        $edit: false,
    },
    {
        key: generateUUID(),
        btnName: '删除',
        permission: 'btn:delete',
        $edit: false,
    },
];
const buttonSource = ref<DataItem[]>([]);
let editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

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
        buttonSource.value =
            data.buttons?.map((item: any) => ({
                key: generateUUID(),
                btnName: item.name,
                permission: item.permission,
                $edit: false,
            })) || [];
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
        //添加菜单按钮,先判断是否有按钮，如果有则保存按钮，如果没有则不保存按钮
        const _buttons = buttonSource.value
            .filter((item) => !item.$edit)
            .map((item) => ({
                name: item.btnName,
                permission: item.permission,
            }));
        const permissions = _buttons.map((item) => item.permission);
        const duplicatePermissions = permissions.filter((permission, index) => {
            return permissions.indexOf(permission) !== index;
        });
        if (duplicatePermissions.length > 0) {
            message.error(`权限标识不能重复，请检查：${duplicatePermissions.join(', ')}`);
            return;
        }
        formData.value.buttons = _buttons;
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
    buttonSource.value = [];
    formData.value.id = undefined;
    editableData = {};
    dialogVisible.value = false;
    emits('close');
};

const handleAddCommonButtons = () => {
    commonButtons.forEach((button) => {
        if (!buttonSource.value.find((item) => item.permission === button.permission)) {
            buttonSource.value.push(button);
        }
    });
};
const handleAddControllableBtn = () => {
    const btnObj = {
        key: generateUUID(),
        btnName: '',
        permission: '',
        $edit: true,
    };
    buttonSource.value.push(btnObj);
    editableData[btnObj.key] = btnObj;
};

const save = (key: string) => {
    // 如果有值，则保存
    if (!editableData[key].btnName || !editableData[key].permission) {
        message.error('请输入按钮名称和权限标识');
        return;
    }
    Object.assign(buttonSource.value.filter((item) => key === item.key)[0], editableData[key], { $edit: false });
    delete editableData[key];
};

const edit = (key: string) => {
    const button = buttonSource.value.filter((item) => key === item.key)[0];
    button.$edit = true;
    editableData[key] = useDeepClone(button);
};

const cancel = (key: string) => {
    // 如果当前两个字段都没值，则直接移除整条数据，
    if (editableData[key] && !editableData[key].btnName && !editableData[key].permission) {
        buttonSource.value = buttonSource.value.filter((item) => key !== item.key);
        delete editableData[key];
    } else {
        const button = buttonSource.value.filter((item) => key === item.key)[0];
        button.$edit = false;
        Object.assign(buttonSource.value, button);
        delete editableData[key];
    }
};

const deleteData = (key: string) => {
    buttonSource.value = buttonSource.value.filter((item) => key !== item.key);
    delete editableData[key];
};

defineExpose({
    openDialog,
});
</script>
