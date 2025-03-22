# Tiny Vue Admin

## 项目简介

Tiny Vue Admin 是一个轻量级的前后端分离中后台管理系统框架，基于 Vue3 + TypeScript + Ant Design Vue 开发，致力于提供简洁高效且开箱即用的开发体验。本项目采用现代化的前端技术栈，实现了一套完整的企业级中后台管理系统解决方案。

## 技术栈

- **核心框架：** Vue3.5 + TypeScript + RSBuild
- **UI 组件：** Ant Design Vue 4.2 + @ant-design/icons-vue  + ludice-vue
- **状态管理：** Pinia + 持久化存储
- **路由管理：** Vue Router 4.5
- **HTTP 请求：** Alova + Axios
- **数据可视化：** ECharts 5.6 + echarts-liquidfill
- **CSS 框架：** TailwindCSS + SASS
- **工具库：** VueUse + dayjs + query-string
- **代码规范：** ESLint + Prettier + Oxlint
- **提交规范：** Commitlint + Husky + commitizen

## 系统功能

- 用户管理：用户信息管理、角色分配
- 角色管理：角色权限分配、权限管理
- 菜单管理：菜单配置、权限设置
- 系统监控：在线用户监控、系统日志
- 字典管理：字典项配置、字典值维护
- 部门管理：部门层级管理、人员配置
- 岗位管理：岗位信息维护、人员分配

## 项目特点

- 🎯 **TypeScript**: 使用 TypeScript 5.8 开发，提供完整的类型定义
- 🎨 **主题定制**: 支持动态主题切换，内置主题切换组件
- 📦 **组件封装**: 二次封装数据表格、抽屉、弹窗等高频组件
- 📊 **数据可视化**: 集成 ECharts，提供丰富的图表组件
- 🔐 **权限管理**: 完善的前端权限管理和动态路由方案
- 🔍 **代码规范**: 集成 ESLint + Prettier + Oxlint 的严格代码规范
- 📝 **Git提交**: 规范的 Git 提交信息规范和自动校验
- 🚀 **构建优化**: 使用 RSBuild 构建，支持构建分析和优化
- 📱 **响应式**: 基于 TailwindCSS 的响应式设计

## 快速开始

### 环境准备

- Node.js >= 16
- pnpm >= 8

### 安装使用

```bash
# 克隆项目
git clone https://github.com/your-username/tiny-vue-admin.git

# 进入项目目录
cd tiny-vue-admin

# 安装依赖
pnpm install

# 启动项目
pnpm dev

# 构建项目
pnpm build
```

## 项目结构

```
├── config/               # 项目配置文件
├── src/                  # 源代码
│   ├── api/             # API 接口
│   ├── assets/          # 静态资源
│   ├── components/      # 公共组件
│   ├── composables/     # 组合式函数
│   ├── layout/          # 布局组件
│   ├── router/          # 路由配置
│   ├── store/           # 状态管理
│   ├── utils/           # 工具函数
│   └── views/           # 页面组件
├── types/               # 类型定义
└── package.json         # 项目依赖
```

## 开发规范

- 遵循 Vue3 组合式 API 风格
- 使用 TypeScript 编写业务代码
- 遵循 ESLint 和 Prettier 代码规范
- 使用 Conventional Commits 规范提交代码

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (git checkout -b feature/AmazingFeature)
3. 提交您的更改 (git commit -m 'Add some AmazingFeature')
4. 推送到分支 (git push origin feature/AmazingFeature)
5. 打开一个 Pull Request

## 许可证

[MIT](LICENSE)

## 鸣谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/)
- [Ant Design Vue](https://antdv.com/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)


### 特别鸣谢

- 感谢 <a href="https://www.jetbrains.com/" target="_blank">JetBrains</a> 提供的 <a href="https://jb.gg/OpenSourceSupport" target="_blank">非商业开源软件开发授权</a>
