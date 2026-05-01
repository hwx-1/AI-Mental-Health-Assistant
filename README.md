# 🧠 AI 心理健康助手

<div align="center">

![心理AI助手](https://file.itndedu.com/psychology_ai.png)

**一个基于 Vue 3 + Vite 构建的全功能 AI 心理健康管理平台**

[![Node.js](https://img.shields.io/badge/Node.js-v24.12.0-brightgreen)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF)](https://vitejs.cn/vite6-cn/)
[![Vue](https://img.shields.io/badge/Vue-3.x-42b883)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue)]()

</div>

---

## 📖 项目简介

**AI 心理健康助手**是一个前后端分离的 Web 应用，面向两类用户：

- **普通用户（用户端）**：可与 AI 心理咨询助手进行流式实时对话、记录情绪日记、浏览心理健康知识文章、查看情绪分析报告。
- **管理员（管理端）**：可管理知识库文章、查看所有用户的咨询会话与情绪日记、获取平台综合数据分析（ECharts 图表）。

项目前端基于 **Vue 3 + Vite 6**，使用 **wangEditor** 富文本编辑器管理知识文章，**ECharts** 展示数据图表，**iconfont** 提供字体图标，后端通过 RESTful API 及 SSE 流式接口提供服务。

---

## ✨ 功能特性

### 👤 用户端功能

| 功能 | 说明 |
|------|------|
| 用户注册 / 登录 | 账号密码注册，Token 鉴权 |
| AI 流式对话 | 基于 SSE 的实时流式心理咨询对话 |
| 会话管理 | 创建、查询、删除咨询会话 |
| 情绪分析 | 获取每次会话的情绪分析结果 |
| 情绪日记 | 创建或更新每日情绪日记 |
| 知识文章 | 分页浏览心理健康知识，查看文章详情 |

### 🛠️ 管理端功能

| 功能 | 说明 |
|------|------|
| 管理员登录 | Token 鉴权，独立管理后台 |
| 知识库管理 | 新增、编辑、删除、上下架知识文章（富文本） |
| 文章分类管理 | 获取并管理文章分类 |
| 会话监控 | 分页查询所有用户的咨询会话及消息记录 |
| 情绪日记管理 | 分页查询、删除用户情绪日记 |
| 数据看板 | ECharts 综合数据分析（用户活跃度、情绪趋势等） |
| 文件上传 | 上传图片/文件至文件服务器 |
| 退出登录 | 安全退出管理后台 |

---

## 🛠️ 技术栈

### 前端

| 技术 | 版本 | 说明 |
|------|------|------|
| [Vue 3](https://vuejs.org/) | 3.x | 渐进式前端框架 |
| [Vite](https://vitejs.cn/vite6-cn/) | 6.x | 新一代前端构建工具 |
| [wangEditor](https://www.wangeditor.com/) | 5.x | 富文本编辑器，用于知识文章管理 |
| [ECharts](https://echarts.apache.org/zh/index.html) | 5.x | 数据可视化图表库 |
| [iconfont](https://www.iconfont.cn/) | — | 阿里巴巴字体图标库 |
| Vue Router | 4.x | 前端路由管理 |
| Pinia / Vuex | — | 状态管理 |
| Axios | — | HTTP 请求库 |

### 后端（已部署，前端直接对接）

| 项 | 地址 |
|----|------|
| 后端接口地址 | `http://159.75.169.224:1235` |
| 接口文档（Apifox） | https://xsl1e23zpk.apifox.cn/ |
| 文件服务器 | `http://159.75.169.224:1235` |

> ⚠️ 注意：后端接口地址仅为服务地址，**请务必查看 Apifox 接口文档**了解具体路由和参数。

---

## 📁 项目结构

```
AI-Mental-Health-Assistant/
├── public/                   # 静态资源
├── src/
│   ├── api/                  # API 请求封装
│   │   ├── admin/            # 管理端接口
│   │   └── user/             # 用户端接口
│   ├── assets/               # 图片、字体等静态资源
│   ├── components/           # 公共组件
│   ├── router/               # 路由配置
│   │   └── index.js
│   ├── store/                # 状态管理（Pinia/Vuex）
│   ├── views/
│   │   ├── admin/            # 管理端页面
│   │   │   ├── Dashboard.vue     # 数据看板
│   │   │   ├── Articles.vue      # 知识文章管理
│   │   │   ├── Sessions.vue      # 会话管理
│   │   │   └── Diaries.vue       # 情绪日记管理
│   │   └── user/             # 用户端页面
│   │       ├── Chat.vue          # AI 对话页面
│   │       ├── Diary.vue         # 情绪日记
│   │       └── Knowledge.vue     # 知识文章浏览
│   ├── utils/                # 工具函数（请求封装、Token等）
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js            # Vite 配置
├── package.json
└── README.md
```

---

## 🚀 快速开始

### 环境要求

| 工具 | 版本要求 |
|------|----------|
| Node.js | **v24.12.0**（推荐） |
| npm / yarn | 随 Node.js 附带 |

#### 安装 Node.js

- 官网下载：https://nodejs.org/zh-cn/download
- 推荐使用 **nvm** 管理多版本 Node.js：https://nvm.uihtm.com

```bash
# 使用 nvm 安装指定版本
nvm install 24.12.0
nvm use 24.12.0

# 验证版本
node -v   # 应输出 v24.12.0
npm -v
```

#### 推荐编辑器

| 编辑器 | 下载地址 |
|--------|----------|
| **Trae**（推荐）| https://www.trae.cn/ |
| VS Code | https://code.visualstudio.com/ |

---

### 安装与启动

#### 1. 克隆项目

```bash
git clone https://github.com/hwx-1/AI-Mental-Health-Assistant.git
cd AI-Mental-Health-Assistant
```

#### 2. 安装依赖

```bash
npm install
```

#### 3. 启动开发服务器

```bash
npm run dev
```

启动成功后，终端会显示本地访问地址，通常为：

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://xxx.xxx.xxx.xxx:5173/
```

打开浏览器访问 `http://localhost:5173` 即可。

#### 4. 构建生产包

```bash
npm run build
```

构建产物默认输出至 `dist/` 目录，可直接部署至 Nginx / 静态托管服务。

#### 5. 预览生产包

```bash
npm run preview
```

---

## 🔌 API 接口说明

> 完整接口文档请访问：https://xsl1e23zpk.apifox.cn/
>
> 所有接口 Base URL：`http://159.75.169.224:1235/api`

### 鉴权说明

所有需要登录的接口均需在请求 Header 中携带 `token` 字段：

```http
token: <登录后返回的 Token>
```

---

### 📋 管理端接口

#### 1. 登录

```http
POST /user/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

#### 2. 退出登录

```http
POST /user/logout
Header: token: <token>
```

#### 3. 获取文章分类

```http
GET /category
Header: token: <token>
```

#### 4. 知识文章列表（分页）

```http
GET /article/list
Header: token: <token>
```

#### 5. 新增文章

```http
POST /article
Content-Type: application/json
Header: token: <token>

{
  "title": "文章标题",
  "content": "富文本内容（HTML）",
  "categoryId": "分类ID",
  "coverImage": "封面图片URL"
}
```

> 默认知识库封面图：`https://file.itndedu.com/psychology_ai.png`

#### 6. 更新文章状态（上架/下架）

```http
PUT /article/{id}/status
Header: token: <token>
```

#### 7. 获取文章详情

```http
GET /article/{id}
Header: token: <token>
```

#### 8. 更新文章

```http
PUT /article/{id}
Content-Type: application/json
Header: token: <token>
```

#### 9. 删除文章

```http
DELETE /article/{id}
Header: token: <token>
```

#### 10. 分页查询咨询会话（管理端）

```http
GET /session/list
Header: token: <token>
```

#### 11. 获取会话消息列表（管理端）

```http
GET /session/{sessionId}/messages
Header: token: <token>
```

#### 12. 分页查询情绪日记（管理端）

```http
GET /diary/list
Header: token: <token>
```

#### 13. 删除情绪日记（管理端）

```http
DELETE /diary/{id}
Header: token: <token>
```

#### 14. 获取综合数据分析

```http
GET /data-analytics/overview
Header: token: <token>
```

返回平台整体数据，用于 ECharts 图表展示（用户活跃度、情绪分布、对话数量等）。

#### 15. 文件上传

```http
POST /file/upload
Content-Type: multipart/form-data
Header: token: <token>

file: <二进制文件>
```

返回文件访问 URL，文件服务器地址：`http://159.75.169.224:1235`

---

### 📋 用户端接口

#### 1. 用户注册

```http
POST /user/register
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

#### 2. 创建新会话

```http
POST /psychological-chat/session
Header: token: <token>
```

#### 3. 流式对话（SSE）

```http
POST /psychological-chat/stream
Content-Type: application/json
Header: token: <token>
Header: Accept: text/event-stream

{
  "sessionId": "会话ID",
  "userMessage": "用户输入内容"
}
```

> 该接口使用 **Server-Sent Events（SSE）** 实现 AI 流式回复，前端需监听 `EventSource` 或使用 `fetch` + `ReadableStream` 解析流式数据。

#### 4. 分页查询咨询会话（用户端）

```http
GET /psychological-chat/sessions
Header: token: <token>
```

#### 5. 获取会话消息列表（用户端）

```http
GET /psychological-chat/session/{sessionId}/messages
Header: token: <token>
```

#### 6. 获取会话情绪分析结果

```http
GET /psychological-chat/session/{sessionId}/emotion
Header: token: <token>
```

返回该会话中的情绪分析数据，包括情绪类型、强度等信息。

#### 7. 删除咨询会话

```http
DELETE /psychological-chat/session/{sessionId}
Header: token: <token>
```

#### 8. 创建或更新情绪日记

```http
POST /diary
Content-Type: application/json
Header: token: <token>

{
  "date": "2025-01-01",
  "content": "今天的情绪记录...",
  "emotion": "happy"
}
```

#### 9. 查询知识文章列表（用户端）

```http
GET /knowledge/list
Header: token: <token>
```

#### 10. 获取知识文章详情（用户端）

```http
GET /knowledge/{id}
Header: token: <token>
```

---

## 🧩 核心依赖配置

### wangEditor 富文本编辑器

官网：https://www.wangeditor.com/

```bash
npm install @wangeditor/editor @wangeditor/editor-for-vue
```

在管理端新增/编辑文章时使用，支持图文混排，可配合文件上传接口插入图片。

基本使用示例：

```vue
<template>
  <div>
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" />
    <Editor
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

const editorRef = shallowRef()
const valueHtml = ref('<p>请输入文章内容...</p>')
const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: 'http://159.75.169.224:1235/api/file/upload',
      fieldName: 'file',
      headers: { token: localStorage.getItem('token') }
    }
  }
}
const handleCreated = (editor) => { editorRef.value = editor }
</script>
```

---

### ECharts 数据图表

官网：https://echarts.apache.org/zh/index.html

```bash
npm install echarts
```

在管理端数据看板页面使用，展示用户活跃度、情绪趋势、文章阅读量等统计图表。

基本使用示例：

```vue
<template>
  <div ref="chartRef" style="width: 600px; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)

onMounted(() => {
  const chart = echarts.init(chartRef.value)
  chart.setOption({
    title: { text: '情绪趋势分析' },
    xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150, 80, 70], type: 'bar' }]
  })
})
</script>
```

---

### SSE 流式对话实现

AI 对话使用 SSE（Server-Sent Events）流式返回，前端推荐使用 `fetch` + `ReadableStream`：

```javascript
async function streamChat(sessionId, userMessage, token) {
  const response = await fetch('http://159.75.169.224:1235/api/psychological-chat/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      'token': token
    },
    body: JSON.stringify({ sessionId, userMessage })
  })

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value, { stream: true })
    // 处理每个 SSE 数据块
    const lines = chunk.split('\n').filter(line => line.startsWith('data:'))
    for (const line of lines) {
      const data = line.replace('data:', '').trim()
      if (data === '[DONE]') return
      // 将 AI 回复追加显示到界面
      console.log(data)
    }
  }
}
```

---

### iconfont 字体图标

官网：https://www.iconfont.cn/

1. 在 iconfont 创建项目，选择需要的图标加入购物车
2. 生成在线 CDN 链接或下载至本地
3. 在 `main.js` 或 `index.html` 中引入

```html
<!-- index.html 中引入在线链接 -->
<link rel="stylesheet" href="//at.alicdn.com/t/font_xxxx_xxxx.css">
```

```html
<!-- 使用图标 -->
<i class="iconfont icon-psychology"></i>
```

---

## ⚙️ Vite 配置参考

`vite.config.js` 推荐配置（含跨域代理）：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://159.75.169.224:1235',
        changeOrigin: true,
        // 如果后端接口本身已带 /api 前缀则不需要 rewrite
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

---

## 🗂️ 资源地址汇总

| 资源 | 地址 |
|------|------|
| 后端接口地址 | http://159.75.169.224:1235 |
| 接口文档（Apifox） | https://xsl1e23zpk.apifox.cn/ |
| 文件服务器 | http://159.75.169.224:1235 |
| 默认知识库封面图 | https://file.itndedu.com/psychology_ai.png |
| Node.js 官网 | https://nodejs.org/zh-cn/download |
| nvm（Node 版本管理） | https://nvm.uihtm.com |
| Vite 官方文档（中文） | https://vitejs.cn/vite6-cn/guide/ |
| wangEditor 富文本编辑器 | https://www.wangeditor.com/ |
| ECharts 图表库 | https://echarts.apache.org/zh/index.html |
| iconfont 字体图标库 | https://www.iconfont.cn/ |
| Trae 编辑器 | https://www.trae.cn/ |
| VS Code 编辑器 | https://code.visualstudio.com/ |

---

## ❓ 常见问题

### Q1：启动后提示端口被占用？

```bash
# 修改 vite.config.js 中的端口号
server: { port: 3000 }
```

### Q2：接口请求报跨域错误（CORS）？

在 `vite.config.js` 中配置 `server.proxy` 代理（见上方 Vite 配置参考），将 `/api` 请求代理到后端地址。

### Q3：文件上传后图片不显示？

图片 URL 是相对路径时，需拼接文件服务器地址前缀：

```javascript
const imageUrl = 'http://159.75.169.224:1235' + response.data.url
```

### Q4：SSE 流式对话没有响应？

检查请求 Header 中是否正确设置了 `Accept: text/event-stream` 和有效的 `token`。

### Q5：Node.js 版本不对导致安装失败？

```bash
# 查看当前版本
node -v

# 使用 nvm 切换版本
nvm install 24.12.0
nvm use 24.12.0
```

---

## 📝 开发规范

- 组件命名使用 **PascalCase**（如 `ChatWindow.vue`）
- API 请求统一封装在 `src/api/` 目录，禁止在组件内直接 fetch
- Token 统一存储于 `localStorage`，在请求拦截器中自动注入
- 路由权限控制：管理端路由需登录鉴权（路由守卫），用户端同理
- 富文本内容提交前需做 XSS 过滤处理

---

## 📄 License

MIT License © 2025 hwx-1

---

<div align="center">

如有问题，欢迎提 [Issue](https://github.com/hwx-1/AI-Mental-Health-Assistant/issues) 或 Pull Request 🙌

</div>
