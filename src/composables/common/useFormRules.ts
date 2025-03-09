import { FormRule } from './types';
import { REG_USER_NAME, REG_PHONE, REG_PWD, REG_EMAIL, REG_CODE_SIX, REG_CODE_FOUR, REG_URL } from '@/utils/reg';

export interface FormRuleConfig {
    required?: boolean;
    message?: string;
    trigger?: ('blur' | 'change')[] | 'blur' | 'change' | '';
    min?: number;
    max?: number;
    len?: number;
    pattern?: RegExp;
    validator?: (rule: FormRule, value: any) => Promise<void>;
    type?:
        | 'string'
        | 'number'
        | 'boolean'
        | 'method'
        | 'regexp'
        | 'integer'
        | 'float'
        | 'array'
        | 'object'
        | 'enum'
        | 'date'
        | 'url'
        | 'hex'
        | 'email'
        | 'any';
}

export const useFormRules = () => {
    // 预定义的正则规则
    const patternRules = {
        username: {
            pattern: REG_USER_NAME,
            message: '用户名格式不正确',
            trigger: ['blur', 'change'],
        },
        password: {
            pattern: REG_PWD,
            message: '密码格式不正确，6-18位字符，包含字母、数字、下划线',
            trigger: ['blur', 'change'],
        },
        email: {
            pattern: REG_EMAIL,
            message: '邮箱格式不正确',
            trigger: ['blur', 'change'],
        },
        phone: {
            pattern: REG_PHONE,
            message: '手机号格式不正确',
            trigger: ['blur', 'change'],
        },
        code6: {
            pattern: REG_CODE_SIX,
            message: '验证码格式不正确（6位数字）',
            trigger: ['blur', 'change'],
        },
        code4: {
            pattern: REG_CODE_FOUR,
            message: '验证码格式不正确（4位数字）',
            trigger: ['blur', 'change'],
        },
        url: {
            pattern: REG_URL,
            message: 'URL格式不正确',
            trigger: ['blur', 'change'],
        },
    } satisfies Record<string, FormRule>;

    // 创建必填规则
    const createRequiredRule = (message: string): FormRule => {
        return { required: true, message, trigger: ['blur', 'change'] };
    };

    // 创建自定义规则
    const createCustomRule = (config: FormRuleConfig) => {
        return {
            required: Object.keys(config).includes('required') ? config.required : true,
            message: config.message,
            trigger: config.trigger || '',
            pattern: config.pattern,
            validator: config.validator,
            min: config.min,
            max: config.max,
            len: config.len,
            type: config.type || 'string',
        };
    };

    // 组合多个规则
    const combineRules = (...rules: (FormRule | undefined)[]) => {
        return rules.filter(Boolean) as FormRule[];
    };

    // 预定义的表单规则组合
    const formRules = {
        username: combineRules(createRequiredRule('请输入用户名'), patternRules.username),
        password: combineRules(createRequiredRule('请输入密码'), patternRules.password),
        email: combineRules(createRequiredRule('请输入邮箱'), patternRules.email),
        phone: combineRules(createRequiredRule('请输入手机号'), patternRules.phone),
        code: combineRules(createRequiredRule('请输入验证码'), patternRules.code6),
        url: combineRules(createRequiredRule('请输入URL'), patternRules.url),
    };

    return {
        patternRules,
        formRules,
        createRequiredRule,
        createCustomRule,
        combineRules,
    };
};
