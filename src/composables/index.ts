/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-08 14:51:51
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-08 15:03:09
 * @FilePath: src/composables/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { useAntdForm } from '@/composables/common/useAntdForm';
import { useFormRules } from '@/composables/common/useFormRules';
import { useTableScroll } from '@/composables/common/useTableScroll';
import { useTableConfig } from '@/composables/common/useTable';
import { useDeepClone } from '@/composables/common/useDeepClone';
import { useAntdToken } from '@/composables/common/useAntdToken';
import { useSearchForm } from '@/composables/common/useSearchForm';
import { useMessage } from '@/composables/common/useMessage';

export {
    useAntdForm,
    useFormRules,
    useTableScroll,
    useTableConfig,
    useDeepClone,
    useAntdToken,
    useSearchForm,
    useMessage,
};
