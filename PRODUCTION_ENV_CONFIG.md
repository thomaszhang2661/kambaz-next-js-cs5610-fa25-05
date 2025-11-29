# 🚀 生产环境配置完整指南

## 一、Render.com 后端环境变量配置

### 必需的 5 个环境变量

访问 Render Dashboard → 选择你的 Web Service → Environment → Add Environment Variable

```bash
# 1. 环境标识
SERVER_ENV=production

# 2. 允许的前端域名（CORS）
# 重要：包含你所有的 Vercel 部署域名
CLIENT_URL=https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app,https://你的主域名.vercel.app

# 3. 后端服务器域名（用于 Cookie）
# 注意：不含 https://，只要域名
SERVER_URL=你的render服务名.onrender.com

# 4. Session 加密密钥
# 生产环境必须使用强密码！建议随机生成
SESSION_SECRET=你的超级复杂随机密钥-至少32位-包含字母数字特殊字符

# 5. MongoDB Atlas 连接字符串
DATABASE_CONNECTION_STRING=mongodb+srv://用户名:密码@cluster.mongodb.net/kambaz?retryWrites=true&w=majority
```

---

## 二、各环境变量详细说明

### 1️⃣ SERVER_ENV

**作用**: 区分开发和生产环境，影响 session 配置

```javascript
// 开发环境
SERVER_ENV = development;
// → saveUninitialized: true (方便测试)
// → cookie: { secure: false }

// 生产环境
SERVER_ENV = production;
// → saveUninitialized: false (更安全)
// → cookie: { secure: true, sameSite: 'none' }
```

**配置**:

- **本地**: `development`
- **Render**: `production`

---

### 2️⃣ CLIENT_URL

**作用**: CORS 跨域配置，决定哪些前端域名可以访问后端

**重要**:

- ✅ 必须包含 `https://` 协议
- ✅ 可以用逗号分隔多个域名
- ❌ 不要在末尾加斜杠 `/`

**本地环境**:

```bash
CLIENT_URL=http://localhost:3000,http://localhost:3001
```

**生产环境（Render）**:

```bash
# 基础配置：只有生产前端
CLIENT_URL=https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app

# 推荐配置：生产 + 本地测试
CLIENT_URL=https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app,http://localhost:3000

# 完整配置：多个 Vercel 部署 + 本地
CLIENT_URL=https://主域名.vercel.app,https://分支预览.vercel.app,http://localhost:3000
```

**获取 Vercel 域名**:

1. 访问 https://vercel.com/dashboard
2. 选择项目 → Deployments
3. 点击最新部署 → 复制 Domain URL

---

### 3️⃣ SERVER_URL

**作用**: 设置 Session Cookie 的域名（生产环境才需要）

**格式**:

- ✅ 只要域名，**不含** `https://`
- ✅ 不含路径，**不含** `/`

**示例**:

```bash
# ❌ 错误
SERVER_URL=https://kambaz-backend-a6.onrender.com
SERVER_URL=kambaz-backend-a6.onrender.com/

# ✅ 正确
SERVER_URL=kambaz-backend-a6.onrender.com
```

**如何获取**:

- Render 创建 Web Service 后会分配域名
- 格式: `你的服务名.onrender.com`
- 可以在 Render Dashboard → Settings → Domain 中查看

---

### 4️⃣ SESSION_SECRET

**作用**: 加密 Session Cookie，防止伪造和篡改

**安全要求**:

- ✅ 至少 32 个字符
- ✅ 包含大小写字母、数字、特殊字符
- ✅ 绝对不能泄露或提交到 Git
- ✅ 生产和开发环境使用不同的密钥

**生成强密钥的方法**:

```bash
# 方法 1：使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 方法 2：使用 OpenSSL
openssl rand -hex 32

# 方法 3：在线生成
# https://randomkeygen.com/ (选择 Fort Knox Passwords)
```

**示例**:

```bash
# ❌ 弱密钥（不要使用）
SESSION_SECRET=123456
SESSION_SECRET=kambaz

# ✅ 强密钥
SESSION_SECRET=a7f9d2e8c1b4f6a3e5d7c9b2f8e1a4d6c3b7f9e2a8d5c1b6f3e9a7d4c2b8f5e1a3
```

---

### 5️⃣ DATABASE_CONNECTION_STRING

**作用**: 连接到 MongoDB Atlas 云数据库

**格式**:

```bash
mongodb+srv://用户名:密码@cluster地址.mongodb.net/数据库名?retryWrites=true&w=majority
```

**获取步骤**:

1. **登录 MongoDB Atlas**: https://cloud.mongodb.com/
2. **选择集群** → 点击 "Connect"
3. **选择 "Drivers"**
4. **复制连接字符串**
5. **修改三个地方**:
   - 替换 `<password>` 为实际密码
   - 在 `.mongodb.net/` 后面添加数据库名 `kambaz`
   - 确保密码中的特殊字符被 URL 编码

**示例**:

```bash
# 原始字符串（从 Atlas 复制）
mongodb+srv://kambaz_user:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority

# ✅ 修改后（正确）
mongodb+srv://kambaz_user:Kambaz2024@cluster.xxxxx.mongodb.net/kambaz?retryWrites=true&w=majority
#                         ↑ 实际密码              ↑ 数据库名
```

**注意事项**:

- ⚠️ 密码中如果有特殊字符（`@`, `#`, `%` 等），需要 URL 编码
- ⚠️ 必须包含数据库名 `kambaz`
- ⚠️ 确保 MongoDB Atlas 的 IP 白名单设置为 `0.0.0.0/0`（允许所有）

---

## 三、完整配置示例

### 📁 本地开发环境

**文件**: `kambaz-node-server-app/.env`

```bash
SERVER_ENV=development
CLIENT_URL=http://localhost:3000,http://localhost:3001
SESSION_SECRET=kambaz-dev-secret-2024-local-only
DATABASE_CONNECTION_STRING=mongodb://127.0.0.1:27017/kambaz
```

### 🌐 生产环境（Render.com）

**位置**: Render Dashboard → Environment Variables

```bash
SERVER_ENV=production

CLIENT_URL=https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app

SERVER_URL=kambaz-backend-a6.onrender.com

SESSION_SECRET=a7f9d2e8c1b4f6a3e5d7c9b2f8e1a4d6c3b7f9e2a8d5c1b6f3e9a7d4c2b8f5e1a3

DATABASE_CONNECTION_STRING=mongodb+srv://kambaz_user:YourStrongPassword123@cluster0.xxxxx.mongodb.net/kambaz?retryWrites=true&w=majority
```

---

## 四、前端配置

### 📁 本地前端环境变量

**文件**: `.env.local` (项目根目录)

```bash
NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000
```

### 🌐 Vercel 前端环境变量

**位置**: Vercel Dashboard → Settings → Environment Variables

| Variable Name             | Value                                 | Environments                     |
| ------------------------- | ------------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_HTTP_SERVER` | `https://你的render域名.onrender.com` | Production, Preview, Development |

**配置步骤**:

1. 访问 https://vercel.com/dashboard
2. 选择项目 → Settings → Environment Variables
3. 找到 `NEXT_PUBLIC_HTTP_SERVER`
4. 点击 Edit → 更新为 Render 后端 URL
5. 确保勾选 `Production`, `Preview`, `Development`
6. Save → Redeploy

---

## 五、部署检查清单

### ✅ 后端部署前检查

- [ ] MongoDB Atlas 集群已创建并运行
- [ ] 数据库用户已创建（用户名 + 强密码）
- [ ] IP 白名单设置为 `0.0.0.0/0`
- [ ] 使用 MongoDB Compass 导入了初始数据
- [ ] 获取了正确的连接字符串（包含数据库名）
- [ ] 后端代码已推送到 GitHub

### ✅ Render.com 配置检查

- [ ] 创建了 Web Service
- [ ] 连接了正确的 GitHub 仓库和分支
- [ ] Root Directory 设置正确（留空或指定 `kambaz-node-server-app`）
- [ ] Build Command: `npm install`
- [ ] Start Command: `node index.js`
- [ ] 添加了全部 5 个环境变量
- [ ] `CLIENT_URL` 包含正确的 Vercel 域名
- [ ] `SERVER_URL` 不含协议和斜杠
- [ ] `SESSION_SECRET` 是强密钥
- [ ] `DATABASE_CONNECTION_STRING` 包含数据库名

### ✅ Vercel 配置检查

- [ ] 前端已部署到 Vercel
- [ ] 更新了 `NEXT_PUBLIC_HTTP_SERVER` 环境变量为 Render URL
- [ ] 重新部署了前端
- [ ] 验证前端可以访问

### ✅ 功能测试

- [ ] 访问 Render 后端 URL: `https://xxx.onrender.com/api/courses`
- [ ] 应该返回课程数据 JSON
- [ ] 访问 Vercel 前端 URL
- [ ] 尝试登录（使用 `alice` / `alice123`）
- [ ] 登录成功并跳转到 Dashboard
- [ ] 刷新页面，session 保持
- [ ] 测试 CRUD 功能（创建、编辑、删除）

---

## 六、常见问题排查

### ❌ 问题 1: CORS 错误

**错误信息**:

```
Access to fetch at 'https://xxx.onrender.com/api/users' from origin 'https://xxx.vercel.app'
has been blocked by CORS policy
```

**原因**: `CLIENT_URL` 配置不正确

**解决**:

1. 检查 Render 的 `CLIENT_URL` 环境变量
2. 确保包含你的 Vercel 前端域名
3. 确保有 `https://` 协议
4. 保存后重新部署

---

### ❌ 问题 2: 登录后刷新页面就登出

**原因**: Session Cookie 配置问题

**检查**:

- `SERVER_ENV` 是否为 `production`
- `SERVER_URL` 是否正确（不含 `https://`）
- `SESSION_SECRET` 是否配置

---

### ❌ 问题 3: 数据库连接失败

**错误日志**:

```
Failed to connect to MongoDB
```

**检查**:

1. `DATABASE_CONNECTION_STRING` 是否正确
2. 密码是否包含特殊字符（需要 URL 编码）
3. 数据库名 `kambaz` 是否存在
4. MongoDB Atlas IP 白名单是否设置为 `0.0.0.0/0`

---

### ❌ 问题 4: Render 服务启动失败

**检查 Render 日志**:

1. Render Dashboard → Logs
2. 查看错误信息
3. 常见问题：
   - 缺少环境变量
   - Start Command 不正确
   - 依赖安装失败

---

## 七、安全最佳实践

### 🔒 环境变量安全

- ✅ 不要在代码中硬编码任何密钥
- ✅ 不要将 `.env` 文件提交到 Git
- ✅ 生产和开发使用不同的密钥
- ✅ 定期更换 SESSION_SECRET
- ✅ 使用强密码生成器

### 🔒 CORS 配置

- ✅ 只允许信任的域名
- ❌ 不要使用 `origin: '*'`（允许所有）
- ✅ 定期审查允许的域名列表

### 🔒 数据库安全

- ✅ 使用强密码
- ✅ 限制数据库用户权限（只读或读写）
- ✅ 定期备份数据
- ✅ 启用 MongoDB Atlas 的审计日志

---

## 八、快速参考

### 🎯 本地开发快速启动

```bash
# 1. 启动后端
cd kambaz-node-server-app
node index.js
# 应该看到：Connected to MongoDB
#           kambaz-node-server-app listening on port 4000

# 2. 启动前端（另一个终端）
cd ..
npm run dev
# 应该看到：Ready on http://localhost:3000

# 3. 访问应用
# http://localhost:3000
```

### 🎯 生产环境访问

```bash
# 前端
https://你的项目名.vercel.app

# 后端 API
https://你的服务名.onrender.com/api/courses

# 测试账号
Username: alice
Password: alice123
```

---

## 九、需要帮助？

如果遇到问题，请提供：

1. 错误截图（浏览器 Console 或 Render Logs）
2. 环境变量配置（隐藏敏感信息）
3. 具体的操作步骤

祝部署顺利！🚀
