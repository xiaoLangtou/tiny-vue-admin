module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['alloy', 'alloy/vue', 'alloy/typescript', './.eslintrc-auto-import.json'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: {
            js: '@babel/eslint-parser',
            jsx: '@babel/eslint-parser',
            ts: '@typescript-eslint/parser',
            tsx: '@typescript-eslint/parser',
        },
    },
    rules: {
        // 函数参数最多4个
        'max-params': ['error', 4],
        '@typescript-eslint/prefer-optional-chain': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        'vue/no-duplicate-attr-inheritance': 'off',
        'vue/no-ref-object-reactivity-loss': 1,
        'vue/block-order': [
            'error',
            {
                order: [['template', 'script'], 'style'],
            },
        ],

        'vue/no-duplicate-attributes': [
            'error',
            {
                allowCoexistClass: true,
                allowCoexistStyle: true,
            },
        ],
        'no-irregular-whitespace': [
            1,
            {
                skipComments: true,
            },
        ],
        // 已弃用规则关闭掉
        'vue/no-setup-props-destructure': 'off',
        'vue/component-tags-order': 'off',
        'vue/no-invalid-model-keys': 'off',
        'vue/no-ref-object-destructure': 'off',
        'vue/script-setup-uses-vars': 'off',
        'vue/v-on-function-call': 'off',
    },
};
