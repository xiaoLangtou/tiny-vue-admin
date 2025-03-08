/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-07 09:08:59
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-08 15:11:16
 * @FilePath: src/composables/common/useAntdForm.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { FormInstance } from 'ant-design-vue';
import { useFormRules } from '@/composables';

export const useAntdForm = () => {
    const formRef = ref<FormInstance | null>(null);
    const { createCustomRule, createRequiredRule, combineRules } = useFormRules();
    const validate = async () => {
        await formRef.value?.validate();
    };

    const resetFields = () => {
        formRef.value?.resetFields();
    };

    return {
        createCustomRule,
        createRequiredRule,
        combineRules,
        formRef,
        validate,
        resetFields,
    };
};
