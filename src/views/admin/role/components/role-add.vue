<template>
    <a-modal v-model:visible="dialogVisible" :title="dialogTitle" :width="700" @cancel="closeDialog">
        <a-form ref="formRef" :model="formData" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-form-item label="角色名称" name="roleName">
                <a-input v-model:value="formData.roleName" placeholder="请输入角色名称" />
            </a-form-item>
            <a-form-item name="roleCode">
                <template #label>
                    <span class="flex items-center gap-1"
                        >角色标识
                        <a-tooltip
                            title="可填写组织内已有的角色标识，该标识可作为角色的唯一标识符，不填则由系统自动生成，填写后无法修改"
                        >
                            <icon-view model-value="Lucide-CircleAlert" />
                        </a-tooltip>
                    </span>
                </template>
                <a-input v-model:value="formData.roleCode" :disabled="!!formData.id" placeholder="请输入角色标识" />
            </a-form-item>
            <a-form-item label="角色排序" name="sortOrder">
                <a-input-number v-model:value="formData.sortOrder" style="width: 100%" :min="0" />
            </a-form-item>
            <a-form-item label="备注" name="description">
                <a-input v-model:value="formData.description" placeholder="请输入备注" />
            </a-form-item>
        </a-form>
        <template #footer>
            <a-space>
                <a-button @click="closeDialog">取消</a-button>
                <a-button type="primary" :loading="submitLoading" @click="handleSave">保存</a-button>
            </a-space>
        </template>
    </a-modal>
</template>

<script setup lang="ts">
import { useAntdForm, useMessage } from '@/composables';
import { getMenuTreeList } from '@/service/apis/menu';
import { createRole, updateRole } from '@/service/apis/role';
import type { IRole } from '@/service/interface/role';

const { message } = useMessage();

defineOptions({
    name: 'RoleAdd',
});

const emits = defineEmits(['close']);
const dialogTitle = ref('新增角色');
const dialogVisible = ref(false);
const checkAll = ref(false);
const submitLoading = ref(false);

const { formData, formRef, validate, resetFields, createCustomRule } = useAntdForm({
    _formData: ref<IRole>({
        roleName: '',
        roleCode: '',
        sortOrder: 0,
        isEnable: 1,
        menus: [],
        description: '',
    }),
});
const rules = {
    roleName: [createCustomRule({ message: '请输入角色名称' })],
};

const menuTreeData = ref([]);
const openDialog = async (type = 'add', data: IRole = {}) => {
    dialogTitle.value = type === 'edit' ? '修改角色' : '新增角色';
    if (type === 'edit') {
        formData.value.id = data.id;
        formData.value.roleName = data.name;
        formData.value.roleCode = data.roleCode;
        formData.value.sortOrder = data.sortOrder;
        formData.value.isEnable = data.isEnable;
        formData.value.menus = data.menus;
        formData.value.description = data.description;
    }
    await getAllMenu();
    dialogVisible.value = true;
};

const getAllMenu = async () => {
    // 获取所有菜单
    const { data } = await getMenuTreeList();
    menuTreeData.value = data;

    // 判断当前菜单是否已经全选
    const ids = _getIds(data);
    checkAll.value = formData.value.menus?.length === ids.length;
};

const handleSave = async () => {
    submitLoading.value = true;

    try {
        await validate();
        const saveURL = formData.value.id ? updateRole : createRole;
        await saveURL({
            ...formData.value,
            menus: [],
        });
        message.success('保存成功');
        closeDialog();
        submitLoading.value = false;
    } catch {
        submitLoading.value = false;
    }
};

const _getIds = (data: any) => {
    const ids: any[] = [];
    data.forEach((item: any) => {
        ids.push(item.id);
        if (item.children && item.children.length > 0) {
            ids.push(..._getIds(item.children));
        }
    });
    return ids;
};

const closeDialog = () => {
    resetFields();
    formData.value.id = undefined;
    dialogVisible.value = false;
    emits('close');
};

defineExpose({
    openDialog,
});
</script>

<style scoped></style>
