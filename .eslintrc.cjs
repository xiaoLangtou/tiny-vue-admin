module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['alloy',"alloy/vue","alloy/typescript"],
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
        'vue/no-duplicate-attr-inheritance': 'off',
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
    },
};
