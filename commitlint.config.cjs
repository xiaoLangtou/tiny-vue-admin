module.exports={
    //继承规则
    extends: ['@commitlint/config-conventional'],
    //自定义规则
    rules: {
        //type的类型定义:表示 git 提交的type必须在以下类型范围内
        'type-enum': [
            //当前验证的错误级别
            2,
            //在什么情况下进行验证
            'always',
            //泛型内容
            ['feat', 'fix', 'init', 'docs', 'style', 'refactor', 'perf', 'test', 'revert', 'build', 'chore', 'ci'],
        ],
        //subject 大小写不做校验
        'subject-case': [0],
    },
};

