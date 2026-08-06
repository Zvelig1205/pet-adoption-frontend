# 宠物领养系统前端

基于 Vue 3 + Vite 的宠物领养系统前端，配套后端项目 `pet-adoption-backend`。

## 技术栈

- Vue 3（Composition API，`<script setup>`）
- Vue Router
- Axios
- Vite

> 说明：当前页面使用原生 HTML/CSS 实现，未引入 UI 组件库。

## 已实现功能

- 用户注册 / 登录
- 个人中心
- 宠物大厅（未领养宠物列表）
- 宠物详情
- 宠物领养 / 弃养
- 我的宠物

## 项目结构

```
frontend/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js          # 应用入口
    ├── App.vue          # 根组件
    ├── api/             # 接口封装（user.js、pet.js）
    ├── utils/request.js # Axios 实例（统一 baseURL、携带 token）
    ├── router/          # 路由配置
    ├── components/      # 公共组件
    └── views/           # 页面
```

## 项目启动

前置条件：Node.js；后端服务已启动（见 `pet-adoption-backend/README.md`）。

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 5173 端口）
npm run dev
```

## 后端接口对接

后端项目：`pet-adoption-backend`（Spring Boot，默认 8080 端口）。

- 所有请求通过 `src/utils/request.js` 封装的 Axios 实例发出，`baseURL` 为 `http://localhost:8080`；
- 登录成功后 token 存入 `localStorage`，请求拦截器自动在 `Authorization` 请求头中携带；
- 后端已配置 CORS，允许 `http://localhost:5173` 跨域访问。

接口封装见 `src/api/`：

| 文件 | 函数 | 对应后端接口 |
|------|------|-------------|
| user.js | `login` / `register` | POST `/users/login`、`/users/register` |
| user.js | `getUserVO` | GET `/users/my` |
| pet.js | `getUnadoptedPets` | GET `/pets/hall` |
| pet.js | `getPetById` | GET `/pets/{id}` |
| pet.js | `getMyPets` | GET `/users/my/pets` |
| pet.js | `getMyPetDetail` | GET `/users/my/pets/{petId}` |
| pet.js | `adoptPet` | POST `/pets/{id}/adopt` |
| pet.js | `abandonPet` | DELETE `/pets/{id}/adopt` |

## 环境要求

- Node.js（npm install / npm run dev）
- 后端服务已启动，且 MySQL、Redis 可用
