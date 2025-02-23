# Tiny Vue Admin

一个基于 Vue 3、Vite 和 Tiny Vue 组件库构建的简约高效的管理后台。

## 项目设置

该项目使用 Vue 3 构建，并采用 Vite 作为开发和生产构建工具。集成了 Tiny Vue 组件库、Pinia 状态管理、Axios 请求库和 TailwindCSS 样式框架。

### 环境要求

- Node.js（建议 v18 及以上）
- npm 或 yarn

### 安装依赖

克隆项目并安装依赖：

```bash
git clone <repository_url>
cd tiny-vue-admin
npm install
```

可用脚本


```shell
# dev: 启动开发服务器，进入开发模式。
npm run dev

#build: 构建生产环境的项目。
npm run build

#preview: 本地预览生产环境构建后的项目。
npm run preview

#prettier: 使用 Prettier 格式化代码。
npm run prettier

#lint: 使用 ESLint 检查代码并自动修复问题。
npm run lint

#format: 格式化项目中的所有文件。
npm run format
```

### 依赖项

 - @opentiny/vue: Tiny Vue 组件库
 - vue: 渐进式 JavaScript 框架
 - pinia: 状态管理库 
 - vue-router: Vue 路由库 
 - axios: 基于 Promise 的 HTTP 客户端 
 - nprogress: 加载进度条 
 - tailwindcss: 功能齐全的 CSS 框架 
 - vite: 构建工具和开发服务器 
 - prettier: 代码格式化工具 
 - eslint: JavaScript 和 Vue 文件的代码检查工具


### 开发工具
- Husky: Git 钩子，用于强制执行提交消息格式检查 
- Commitizen: 用于生成一致的提交消息 
- Vite: 快速热更新的开发构建工具 
- Pinia Plugin PersistedState: 持久化 Pinia 状态，使页面重载后数据仍然保留

### 代码风格与提交信息

- 我们使用 Prettier 进行代码格式化，使用 ESLint 进行代码检查。 
- 提交信息 应遵循 Conventional Commits 标准。使用 Commitizen 简化提交消息的格式。 
- commitlint 钩子会确保提交信息符合标准格式。


### 文件资源目录

```shell
tiny-vue-admin
├── README.md                                    # 项目的说明文档，介绍项目的功能、安装和使用方法。
├── commitlint.config.cjs                        # 提交信息的配置文件，定义了提交信息的格式规范（使用 commitlint）。
├── config                                       
│  ├── plugin                                    # 插件配置文件夹，包含项目中使用的各种插件配置。
│  ├── utils                                     # 工具函数目录，存放一些公共的工具方法。
│  ├── vite.config.base.ts                       # Vite 基础配置文件，项目所有环境共用的配置。
│  ├── vite.config.dev.ts                        # Vite 开发环境的配置文件。
│  ├── vite.config.prod.ts                       # Vite 生产环境的配置文件。
├── index.html                                   # 项目的主 HTML 文件，包含入口标签等基础结构。
├── package.json                                 # 项目的配置文件，包含项目的依赖、脚本、配置等。
├── pnpm-lock.yaml                               # 项目依赖的锁定文件，确保各环境中的依赖一致性。
├── postcss.config.cjs                           # PostCSS 配置文件，处理 CSS 相关的任务。
├── public
│  └── vite.svg                                  # 项目的静态资源，可能用于展示在页面中的 SVG 图标或图形。
├── src                                          # 源代码目录，包含所有项目代码文件。
│  ├── App.vue                                   # 主 Vue 组件，项目的根组件。
│  ├── assets                                    # 静态资源目录，用于存放图片、字体、图标等资源文件。
│  ├── components                               # 存放 Vue 组件的目录。
│  ├── global                                   # 全局配置、全局样式等文件。
│  ├── hooks                                    # 自定义 Hook 函数目录，用于封装可复用的逻辑。
│  ├── layout                                   # 布局组件目录，包含项目中的公共布局组件。
│  ├── main.ts                                  # 项目的入口文件，初始化 Vue 应用并挂载到 DOM。
│  ├── router                                   # 路由配置目录，包含页面路由及相关配置。
│  ├── service                                  # 服务目录，封装接口请求和其他与后端交互的逻辑。
│  ├── store                                    # 状态管理目录，存放 Pinia 状态管理相关文件。
│  ├── tailwindcss.css                          # TailwindCSS 样式文件，项目的主样式文件。
│  ├── types                                    # 类型定义文件，存放项目中使用的 TypeScript 类型。
│  ├── utils                                    # 工具函数目录，存放项目中常用的工具方法。
│  ├── views                                    # 视图组件目录，存放页面级组件。
│  └── vite-env.d.ts                            # Vite 的环境类型声明文件。
├── tailwind.config.js                          # TailwindCSS 配置文件，用于定制 Tailwind 样式框架的配置。
├── tsconfig.app.json                           # TypeScript 项目配置文件，专门为应用代码设置的 TS 配置。
├── tsconfig.json                               # TypeScript 项目配置文件，通用的 TS 配置文件。
├── tsconfig.node.json                          # Node.js 环境的 TypeScript 配置文件。
└── vite.config.ts                              # Vite 的配置文件，包含项目的构建和开发配置。
```
