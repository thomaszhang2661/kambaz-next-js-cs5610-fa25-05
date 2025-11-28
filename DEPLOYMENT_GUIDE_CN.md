# 🚀 Kambaz A6 部署指南

## 概述

部署分为三个部分：

1. **MongoDB Atlas** - 云端数据库
2. **Render.com** - Node.js 后端服务器
3. **Vercel** - Next.js 前端应用

---

## 第一步：MongoDB Atlas 部署

### 1.1 创建 MongoDB Atlas 账号

1. 访问 https://www.mongodb.com/
2. 点击右上角 "Sign In"
3. 使用 Google 账号登录或注册新账号

### 1.2 创建数据库集群

1. 登录后，点击 "Create" 创建新项目（如果需要）
2. 点击 "Build a Database"
3. 选择 **FREE** 计划（M0 Sandbox）
4. 选择云服务商：**AWS**
5. 选择地区：**US East (N. Virginia)** 或离您最近的地区
6. 集群名称：`Kambaz` 或 `kambaz-a6`
7. 点击 "Create Deployment"

### 1.3 创建数据库用户

在弹出的对话框中：

1. **Username**: 输入用户名（例如：`kambaz_user`）
2. **Password**: 输入强密码（例如：`Kambaz2024!`）
   - ⚠️ **重要**：记下这个密码，后面需要用！
3. 点击 "Create Database User"

### 1.4 配置网络访问

1. 点击 "Choose a connection method"
2. 选择 "Connect from anywhere" 或 "Add IP Address"
3. 如果选择 "Allow Access from Anywhere"：
   - IP Address: `0.0.0.0/0`
   - Description: `Allow all`
4. 点击 "Add Entry"
5. 点击 "Finish and Close"

### 1.5 获取连接字符串

1. 在左侧菜单点击 "Database"
2. 在您的集群上点击 "Connect"
3. 选择 "Drivers"
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. 复制连接字符串，格式类似：
   ```
   mongodb+srv://kambaz_user:<password>@kambaz.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. **重要修改**：
   - 将 `<password>` 替换为您在 1.3 步骤设置的实际密码
   - 在 `mongodb.net/` 和 `?` 之间添加数据库名 `kambaz`
   - 最终格式：
     ```
     mongodb+srv://kambaz_user:Kambaz2024!@kambaz.xxxxx.mongodb.net/kambaz?retryWrites=true&w=majority
     ```

### 1.6 导入数据到 Atlas

1. 下载并打开 MongoDB Compass
2. 使用上面的连接字符串连接到 Atlas
3. 创建数据库 `kambaz`
4. 导入以下集合的 JSON 数据：
   - `users` - 从本地 Database/users.json
   - `courses` - 从本地 Database/courses.json
   - `modules` - 从本地 Database/modules.json
   - `assignments` - 从本地 Database/assignments.json
   - `enrollments` - 从本地 Database/enrollments.json

---

## 第二步：Render.com 部署后端

### 2.1 准备 GitHub 仓库

1. 确保 `kambaz-node-server-app` 已推送到 GitHub
2. 如果还没有推送，执行：
   ```bash
   cd kambaz-node-server-app
   git init
   git add .
   git commit -m "Initial commit for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kambaz-node-server-app.git
   git push -u origin main
   ```

### 2.2 创建 Render 账号

1. 访问 https://render.com/
2. 使用 GitHub 账号登录
3. 授权 Render 访问您的 GitHub 仓库

### 2.3 创建 Web Service

1. 在 Render Dashboard，点击 "New +" → "Web Service"
2. 连接 GitHub 仓库：
   - 找到 `kambaz-node-server-app` 仓库
   - 点击 "Connect"
3. 配置 Web Service：
   - **Name**: `kambaz-node-server-app-a6`（或您喜欢的名称）
   - **Region**: 选择离您最近的地区
   - **Branch**: `main` 或 `a6`
   - **Root Directory**: 留空（如果整个仓库就是服务器代码）
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: `Free`

### 2.4 配置环境变量

在 "Environment Variables" 部分，点击 "Add Environment Variable" 添加以下变量：

| Key                          | Value                                                                                               | 说明                               |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `SERVER_ENV`                 | `production`                                                                                        | 生产环境标识                       |
| `CLIENT_URL`                 | `https://your-app.vercel.app`                                                                       | 您的 Vercel 前端 URL               |
| `SERVER_URL`                 | `kambaz-node-server-app-a6.onrender.com`                                                            | Render 分配的域名（不含 https://） |
| `SESSION_SECRET`             | `your-super-secret-key-12345`                                                                       | 会话密钥（随机生成）               |
| `DATABASE_CONNECTION_STRING` | `mongodb+srv://kambaz_user:Kambaz2024!@kambaz.xxxxx.mongodb.net/kambaz?retryWrites=true&w=majority` | 从 MongoDB Atlas 获取的连接字符串  |

⚠️ **重要提示**：

- `CLIENT_URL` 必须是完整的 HTTPS URL
- `SERVER_URL` 不要包含 `https://`，只要域名
- `DATABASE_CONNECTION_STRING` 确保包含数据库名 `kambaz`

### 2.5 部署

1. 点击 "Create Web Service"
2. 等待部署完成（约 3-5 分钟）
3. 查看日志确认：
   - ✅ "Connected to MongoDB"
   - ✅ "kambaz-node-server-app listening on port 10000"

### 2.6 测试后端 API

部署完成后，测试以下 URL：

- `https://kambaz-node-server-app-a6.onrender.com/` - 应该返回欢迎消息
- `https://kambaz-node-server-app-a6.onrender.com/api/courses` - 应该返回课程列表
- `https://kambaz-node-server-app-a6.onrender.com/api/users` - 应该返回用户列表

⚠️ **注意**：Render 免费版会在 15 分钟无活动后休眠，首次访问可能需要 30-60 秒唤醒。

---

## 第三步：Vercel 部署前端

### 3.1 前端已部署（更新环境变量）

如果您的前端已经部署在 Vercel 上，只需更新环境变量：

1. 访问 https://vercel.com/
2. 进入您的项目（`kambaz-next-js-cs5610-fa25-05`）
3. 点击 "Settings" → "Environment Variables"
4. 找到 `NEXT_PUBLIC_HTTP_SERVER` 变量
5. 更新值为 Render 后端 URL：
   ```
   https://kambaz-node-server-app-a6.onrender.com
   ```
6. 点击 "Save"

### 3.2 重新部署

1. 在 Vercel 项目页面，点击 "Deployments"
2. 选择最新的部署
3. 点击右侧的 "..." → "Redeploy"
4. 确认重新部署

### 3.3 如果首次部署前端

1. 在本地项目根目录：
   ```bash
   cd kambaz-next-js-cs5610-fa25-05
   git add .
   git commit -m "Ready for deployment"
   git push origin a6
   ```
2. 访问 https://vercel.com/
3. 点击 "Add New" → "Project"
4. 选择您的 GitHub 仓库
5. 配置：
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. 添加环境变量：
   - Key: `NEXT_PUBLIC_HTTP_SERVER`
   - Value: `https://kambaz-node-server-app-a6.onrender.com`
7. 点击 "Deploy"

---

## 第四步：验证完整部署

### 4.1 检查清单

- [ ] MongoDB Atlas 数据已导入
- [ ] Render 后端服务运行正常（检查日志）
- [ ] Vercel 前端已重新部署
- [ ] 环境变量全部配置正确

### 4.2 功能测试

访问您的 Vercel 前端 URL，测试：

1. ✅ 用户登录/登出
2. ✅ Dashboard 显示课程
3. ✅ Modules 页面显示模块
4. ✅ Assignments 页面
5. ✅ Users 页面（Admin 权限）
6. ✅ 创建/编辑/删除功能
7. ✅ 刷新页面后数据持久化

### 4.3 常见问题排查

**问题 1：前端无法连接后端**

- 检查 Vercel 环境变量 `NEXT_PUBLIC_HTTP_SERVER` 是否正确
- 检查 Render 环境变量 `CLIENT_URL` 是否包含正确的 Vercel URL
- 查看浏览器 Console 和 Network 标签

**问题 2：CORS 错误**

- 确认 Render 的 `CLIENT_URL` 与 Vercel 的实际 URL 完全匹配（包括 https://）
- 不要在 URL 末尾添加斜杠

**问题 3：Session 无法保持**

- 检查 Render 的 `SERVER_ENV` 是否设置为 `production`
- 检查 `SESSION_SECRET` 是否已设置
- 检查 `SERVER_URL` 是否只包含域名（不含 https://）

**问题 4：数据库连接失败**

- 检查 MongoDB Atlas 的 IP 白名单是否包含 `0.0.0.0/0`
- 检查连接字符串中的密码是否正确
- 确认连接字符串中包含数据库名 `/kambaz`

**问题 5：Render 服务启动慢**

- 免费版会在 15 分钟后休眠
- 首次访问需要 30-60 秒唤醒
- 这是正常现象

---

## 快速配置参考

### MongoDB Atlas 连接字符串模板

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/kambaz?retryWrites=true&w=majority
```

### Render 环境变量

```
SERVER_ENV=production
CLIENT_URL=https://your-vercel-app.vercel.app
SERVER_URL=your-render-app.onrender.com
SESSION_SECRET=random-secret-key-12345
DATABASE_CONNECTION_STRING=mongodb+srv://...
```

### Vercel 环境变量

```
NEXT_PUBLIC_HTTP_SERVER=https://your-render-app.onrender.com
```

---

## 提交作业

完成部署后，在 Canvas 提交：

1. **Vercel 前端 URL**: `https://your-app.vercel.app`
2. **Render 后端 URL**: `https://your-render-app.onrender.com`
3. **GitHub 仓库链接**（a6 分支）

---

## 需要帮助？

如果遇到问题，检查：

1. Render 的日志（Logs 标签）
2. Vercel 的部署日志
3. 浏览器的 Console 和 Network 标签
4. MongoDB Atlas 的监控面板

祝您部署成功！🎉
