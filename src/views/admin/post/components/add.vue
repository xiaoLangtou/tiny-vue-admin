<template>
    <custom-drawer
        v-model:open="dialogVisible"
        :title="dialogTitle"
        width="50%"
        :confirm-loading="submitLoading"
        destroyOnClose
        @confirm="handleSave"
        @close="closeDialog"
    >
        <a-form ref="formRef" :model="formData" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-form-item label="岗位名称" name="name">
                <a-input v-model:value="formData.name" placeholder="请输入岗位名称" />
            </a-form-item>
            <a-form-item label="岗位标识" name="code">
                <a-input v-model:value="formData.code" placeholder="请输入岗位标识" />
            </a-form-item>
            <a-form-item label="岗位排序" name="sortOrder">
                <a-input-number v-model:value="formData.sortOrder" style="width: 100%" :min="0" />
            </a-form-item>
            <a-form-item label="岗位状态" name="status">
                <a-switch
                    v-model:checked="formData.status"
                    checked-children="正常"
                    un-checked-children="停用"
                    :checked-value="1"
                    :un-checked-value="0"
                />
            </a-form-item>
            <a-form-item label="备注" name="description">
                <a-textarea v-model:value="formData.description" :rows="8" placeholder="请输入备注" />
            </a-form-item>
        </a-form>
    </custom-drawer>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { addPost, editPost } from '@/service/apis/post';
import { useAntdForm } from '@/composables';

const emits = defineEmits(['close']);
const dialogTitle = ref('新增岗位');
const dialogVisible = ref(false);

const submitLoading = ref(false);

const { createCustomRule, resetFields, validate, formData, formRef, defaultValue } = useAntdForm({
    _formData: reactive({
        name: '',
        code: '',
        sortOrder: 0,
        status: 1,
        description: '',
    }),
});

const rules = ref<Record<string, any>>({
    name: [createCustomRule({ message: '请输入岗位名称' })],
    code: [createCustomRule({ message: '请输入岗位标识' })],
    sortOrder: [createCustomRule({ message: '请输入岗位排序', type: 'number' })],
});

const openDialog = async (type = 'add', data: any = {}) => {
    dialogTitle.value = type === 'edit' ? '修改岗位' : '新增岗位';
    if (type === 'edit') {
        formData.id = data.id;
        formData.name = data.name;
        formData.code = data.code;
        formData.sortOrder = data.sortOrder;
        formData.status = Number(data.status);
        formData.description = data.description ?? '';
    }
    dialogVisible.value = true;
};

const handleSave = async () => {
    submitLoading.value = true;
    await validate();
    const saveURL = formData.id ? editPost : addPost;
    await saveURL({
        ...formData,
        sortOrder: Number(formData.sortOrder),
    });
    message.success('保存成功');
    closeDialog();
    submitLoading.value = false;
};

const closeDialog = () => {
    resetFields();
    Object.assign(formData, defaultValue);
    formData.id = '';
    dialogVisible.value = false;
    emits('close');
};

defineExpose({
    openDialog,
});
</script>
