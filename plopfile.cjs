/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-01-03 17:46:43
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-01-03 19:53:17
 * @FilePath: plopfile.cjs
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
const viewGenerator = require("./plop/view/prompt.cjs");

module.exports = function (plop) {
  plop.setGenerator("view", viewGenerator);
  plop.setHelper("toUpperCase", str => str.charAt(0).toUpperCase() + str.slice(1));
};
