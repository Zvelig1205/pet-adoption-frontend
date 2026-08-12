# 宠物领养系统前端

基于 **Vue 3 + Vite + Element Plus + Pinia** 的宠物领养系统前端，配套后端项目 `pet-adoption-backend`。

## 技术栈

- Vue 3（Composition API，`<script setup>`）
- Vite（构建工具）
- Vue Router（路由 + 登录守卫）
- Pinia（状态管理：token / 用户信息）
- Element Plus（UI 组件库，通过 `unplugin-vue-components` 按需自动引入）
- Axios（HTTP 请求封装）
- unplugin-icons + `@iconify-json/ep`（Element Plus 图标）

## 功能页面

| 页面 | 路径 | 说明 | 需登录 |
|------|------|------|-------|
| 登录 | `/login` | 账号密码登录，登录成功跳转个人中心 | 否 |
| 注册 | `/register` | 注册新账号 | 否 |
| 宠物广场 | `/pethall` | 未领养宠物列表：搜索、分页、领养 | 否 |
| 宠物详情 | `/pet/:id` | 查看宠物信息、领养 | 否 |
| 个人中心 | `/details` | 展示当前用户、入口跳转 | 是 |
| 我的宠物 | `/details/pets` | 已领养宠物列表：分页、弃养 | 是 |
| 我的宠物详情 | `/my/pet/:id` | 查看已领养宠物信息、弃养 | 是 |
| 404 | 其他任意路径 | 页面不存在提示 | 否 |

## 项目结构

```
frontend/
├── index.html
├── package.json
├── vite.config.js        # unplugin-vue-components 按需引入 Element Plus、unplugin-icons 图标
└── src/
    ├── main.js           # 应用入口：注册 Router、Pinia，引入 Element Plus 样式
    ├── App.vue           # 根组件（渲染 router-view）
    ├── style.css         # 全局样式
    ├── api/              # 接口封装
    │   ├── user.js       # 登录 / 注册 / 用户信息 / 退出登录
    │   └── pet.js        # 宠物查询 / 搜索 / 领养 / 弃养
    ├── utils/request.js  # Axios 实例：统一 baseURL、自动携带 token、统一错误处理
    ├── store/user.js     # Pinia：token（持久化到 localStorage）、用户信息
    ├── router/index.js   # 路由配置 + 全局登录守卫
    ├── layout/Layout.vue # 整体布局（顶栏菜单 + 内容区）
    ├── components/       # 公共组件
    └── views/            # 页面
        ├── Login.vue       # 登录
        ├── Register.vue    # 注册
        ├── PetHall.vue     # 宠物广场
        ├── PetDetail.vue   # 宠物详情
        ├── My.vue          # 个人中心
        ├── MyPet.vue       # 我的宠物
        ├── MyPetDetail.vue # 我的宠物详情
        └── NotFound.vue    # 404
```

## 项目启动

前置条件：Node.js；后端服务已启动（见 `pet-adoption-backend/README.md`）。

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 5173 端口）
npm run dev

# 构建生产包（输出到 dist/）
npm run build

# 本地预览构建产物
npm run preview
```

## 路由与登录守卫

- `src/router/index.js` 中，需要登录的页面通过 `meta.requireAuth` 标记；
- 全局 `beforeEach` 守卫：访问标记页面且本地无 token 时，自动跳转 `/login`。

## 后端接口对接

后端项目：`pet-adoption-backend`（Spring Boot，默认 8080 端口）。

- 所有请求通过 `src/utils/request.js` 封装的 Axios 实例发出，`baseURL` 为 `http://localhost:8080`，超时 5 秒；
- 请求拦截器自动从 `localStorage` 读取 token，写入 `Authorization` 请求头；
- 响应拦截器统一处理：`code !== 200` 时弹出错误提示并 reject；HTTP 401 时清除 token 并跳转登录页；
- 后端已配置 CORS，允许 `http://localhost:5173` 跨域访问。

接口封装见 `src/api/`：

| 文件 | 函数 | 方法 / 路径 | 说明 |
|------|------|------------|------|
| user.js | `login` | POST `/users/login` | 登录 |
| user.js | `register` | POST `/users/register` | 注册 |
| user.js | `getUserVO` | GET `/users/my` | 当前用户信息 |
| user.js | `logout` | POST `/users/logout` | 退出登录 |
| pet.js | `getUnadoptedPets` | GET `/pets/hall` | 宠物广场（分页） |
| pet.js | `getPetById` | GET `/pets/{id}` | 宠物详情 |
| pet.js | `getPetByName` | GET `/pets/search` | 按名称搜索（分页） |
| pet.js | `getMyPets` | GET `/users/my/pets` | 我的宠物（分页） |
| pet.js | `getMyPetDetail` | GET `/users/my/pets/{petId}` | 我的宠物详情 |
| pet.js | `adoptPet` | POST `/pets/{id}/adopt` | 领养宠物 |
| pet.js | `abandonPet` | DELETE `/pets/{id}/adopt` | 弃养宠物 |

## 环境要求

- Node.js（`npm install` / `npm run dev`）
- 后端服务已启动，且 MySQL、Redis 可用
