/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-01-03 19:48:30
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-01-03 20:21:07
 * @FilePath: plop/view/prompt.cjs
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
const toUpperCase = str => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = {
  description: "创建vue视图(view)",
  prompts: [
    {
      type: "input",
      name: "path",
      message: "请输入view路径(Please enter a view path)",
      default: "views"
    },
    {
      type: "input",
      name: "name",
      message: "请输入模块名称(Please enter module name)【必填】"
    }
  ],
  actions: data => {
    const { name, path } = data;

    const actions = [];
    if (name) {
      actions.push(
        {
          type: "add",
          path: `./src/${path}/${name}/index.vue`,
          templateFile: "./plop/view/view.hbs"
        },
        {
          type: "add",
          path: `./src/api/modules/${name}.ts`,
          templateFile: "./plop/view/api.hbs"
        },
        {
          type: "add",
          path: `./src/api/interface/${name}.ts`,
          templateFile: "./plop/view/interface.hbs"
        },
        {
          type: "add",
          path: `./src/${path}/${name}/components/Search.vue`,
          templateFile: "./plop/view/searchForm.hbs"
        }
      );
    }
    return actions;
  }
};
