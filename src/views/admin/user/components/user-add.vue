<template>
    <custom-drawer
        v-model:open="dialogVisible"
        :title="dialogTitle"
        :width="800"
        :confirm-loading="submitLoading"
        @confirm="handleSave(formRef)"
        @cancel="closeDialog(formRef)"
    >
        <a-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            :disabled="setRoleDisabled"
        >
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="归属部门" name="deptId">
                        <a-tree-select
                            v-model:value="formData.deptId"
                            :tree-data="deptTreeData"
                            placeholder="请选择归属部门"
                            :field-names="{ label: 'deptName', value: 'id', children: 'children' }"
                            allow-clear
                            tree-default-expand-all
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="用户名" name="username">
                        <a-input v-model:value="formData.username" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="用户昵称" name="nickname">
                        <a-input v-model:value="formData.nickname" allow-clear />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="手机号码" name="phone">
                        <a-input v-model:value="formData.phone" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="用户邮箱" name="email">
                        <a-input v-model:value="formData.email" allow-clear />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="用户性别" name="sex">
                        <a-select v-model:value="formData.sex">
                            <a-select-option v-for="(item, key) in SEX_STATUS" :key="key" :value="key"
                                >{{ item }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="用户姓名" name="name">
                        <a-input v-model:value="formData.name" allow-clear />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="用户工号" name="jobNumber">
                        <a-input v-model:value="formData.jobNumber" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="所在岗位" name="post">
                        <a-select v-model:value="formData.post" mode="multiple" allow-clear show-search>
                            <a-select-option
                                v-for="(item, index) in postList.filter((i) => i.id !== undefined)"
                                :key="index"
                                :value="item.id ?? ''"
                            >
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="备注信息" name="remark">
                        <a-textarea v-model:value="formData.remark" :rows="6" allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <a-divider orientation="left">用户分配角色</a-divider>
        <a-table :data-source="roleList" row-key="id" :row-selection="{ onChange: handleSelectionChange }">
            <a-table-column key="id" title="序号" data-index="id" />
            <a-table-column key="roleName" title="角色名称" data-index="roleName" />
            <a-table-column key="roleCode" title="角色编码" data-index="roleCode" />
        </a-table>
    </custom-drawer>
</template>

<script setup lang="ts">
import type { IDept } from '@/service/interface/dept';
import type { IPost } from '@/service/interface/post';
import type { IRole } from '@/service/interface/role';
import type { IUser } from '@/service/interface/user';
import { getDeptTree } from '@/service/apis/dept';
import { SEX_STATUS } from '@/global/enums';
import { addUser, editUser } from '@/service/apis/user';
import { getPostList } from '@/service/apis/post';
import CustomDrawer from '@/components/custom-drawer/index.vue';
import { useAntdForm, useMessage } from '@/composables';

defineOptions({
    name: 'UserAdd',
});

const { message } = useMessage();
const emits = defineEmits(['close']);
const dialogTitle = ref('新增用户');
const dialogVisible = ref(false);
const setRoleDisabled = ref(false);

const { formData, createCustomRule, formRef, validate, resetFields, defaultValue } = useAntdForm({
    _formData: ref<IUser>({
        deptId: undefined,
        username: '',
        nickname: '',
        phone: '',
        email: '',
        roles: [],
    }),
});

const submitLoading = ref(false);

const rules = {
    deptId: [createCustomRule({ message: '请选择归属部门' })],
    username: [createCustomRule({ message: '请输入用户名' })],
    nickname: [createCustomRule({ message: '请输入用户昵称' })],
    email: [createCustomRule({ type: 'email', message: '请输入正确的邮箱地址' })],
    phone: [createCustomRule({ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' })],
};

const deptTreeData = ref<IDept[]>([]);
const roleList = ref<IRole[]>([]);
const postList = ref<IPost[]>([]);

const openDialog = async (type = 'add', item: any = {}) => {
    dialogTitle.value = type === 'edit' ? '修改用户' : '新增用户';
    formRef.value?.resetFields();

    if (type === 'edit') {
        formData.value.id = item.id;
        formData.value.deptId = item.dept?.id;
        formData.value.username = item.username;
        formData.value.nickname = item.nickname;
        formData.value.phone = item.phoneNumber;
        formData.value.email = item.email;
        formData.value.roles = item.roles?.map((role: IRole) => role.id);
        formData.value.post = item.posts?.map((post: IPost) => post.id);
        formData.value.remark = item.remark;
        formData.value.name = item.name;
        formData.value.jobNumber = item.jobNumber;

        if (item.setRole) {
            setRoleDisabled.value = true;
        }
    }
    dialogVisible.value = true;
    await getAllDept();
    await getAllPost();
};

const getAllDept = async () => {
    const { data } = await getDeptTree();
    deptTreeData.value = data;
};

const getAllPost = async () => {
    const {
        data: { records },
    } = await getPostList({ current: 1, size: 100 });
    postList.value = records;
};

const handleSave = async () => {
    try {
        await validate();
        submitLoading.value = true;
        const saveURL = formData.value.id ? editUser : addUser;
        await saveURL(formData.value);
        message.success('保存成功');
        closeDialog();
    } catch (e) {
        console.error(e);
    } finally {
        submitLoading.value = false;
    }
};

const handleSelectionChange = (selectedRowKeys: any[]) => {
    formData.value.roles = selectedRowKeys;
};

const closeDialog = () => {
    resetFields();
    Object.assign(formData.value, defaultValue);
    dialogVisible.value = false;
    setRoleDisabled.value = false;
    emits('close');
};

defineExpose({
    openDialog,
});
</script>
