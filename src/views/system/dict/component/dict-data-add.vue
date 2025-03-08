<template>
    <custom-drawer
        v-model:open="dialogVisible"
        :width="700"
        get-container="body"
        :title="dialogTitle"
        @confirm="handleSave(formRef)"
        @close="closeDialog(formRef)"
    >
        <a-form ref="formRef" :model="formData" :rules="rules" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-form-item label="字典类型" name="dictType">
                <a-input v-model:value="formData.dictType" disabled placeholder="请输入字典类型"></a-input>
            </a-form-item>
            <a-form-item label="标签名" name="dictLabel">
                <a-input v-model:value="formData.dictLabel" placeholder="请输入标签名"></a-input>
            </a-form-item>
            <a-form-item label="数据值" name="dictValue">
                <a-input v-model:value="formData.dictValue" placeholder="请输入数据值"></a-input>
            </a-form-item>
            <a-form-item label="描述" name="dictDesc">
                <a-input v-model:value="formData.dictDesc" placeholder="请输入描述"></a-input>
            </a-form-item>
            <a-form-item label="排序" name="dictSort">
                <a-input-number
                    v-model:value="formData.dictSort"
                    placeholder="请输入排序"
                    style="width: 100%"
                ></a-input-number>
            </a-form-item>
            <a-form-item label="备注" name="dictRemark">
                <a-textarea v-model:value="formData.dictRemark" placeholder="请输入备注"></a-textarea>
            </a-form-item>
        </a-form>
    </custom-drawer>
</template>

<script setup lang="ts">
import { FormInstance } from 'ant-design-vue';
import { IDictData } from '@/service/interface/dict';
import { addDictData, updateDictData } from '@/service/apis/dict';
import { useMessage } from '@/composables/common/useMessage';
import { useAntdForm } from '@/composables';

const emits = defineEmits(['close']);
const dialogTitle = ref('新增字典项');
const activeAction = ref('add');
const { message } = useMessage();
const { formRef, resetFields, validate, createCustomRule } = useAntdForm();

const formData = reactive<IDictData>({
    dictLabel: '',
    dictValue: '',
    dictType: '',
    dictSort: 0,
    dictRemark: '',
    dictTypeId: undefined,
    dictDesc: '',
});

const rules = {
    dictLabel: [createCustomRule({ message: '请输入标签名' })],
    dictValue: [createCustomRule({ message: '请输入数据值' })],
    dictType: [createCustomRule({ message: '请输入字典类型' })],
    dictSort: [createCustomRule({ message: '请输入排序', type: 'number', trigger: 'change' })],
};

const dialogVisible = ref(false);

const openDialog = (type = 'add', data = {}) => {
    dialogTitle.value = type === 'add' ? '新增字典项' : '修改字典项';
    activeAction.value = type;
    Object.assign(formData, data);
    dialogVisible.value = true;
};

const handleSave = async (formEl: FormInstance | null) => {
    if (!formEl) return;
    try {
        await validate();
        const saveURL = activeAction.value === 'add' ? addDictData : updateDictData;
        await saveURL(formData);
        message.success('保存成功');
        closeDialog(formEl);
        emits('close');
    } catch (error) {}
};

const closeDialog = (formEl: FormInstance | null) => {
    if (!formEl) return;
    resetFields();
    formData.id = undefined;
    dialogVisible.value = false;
    emits('close');
};

defineExpose({
    openDialog,
});
</script>

<style lang="scss">
.dialog-footer {
    text-align: right;

    .ant-btn + .ant-btn {
        margin-left: 8px;
    }
}
</style>
