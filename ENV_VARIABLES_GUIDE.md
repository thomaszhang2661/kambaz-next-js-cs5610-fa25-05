# 🔧 Render.com 环境变量配置

## 在 Render.com 添加以下环境变量：

### 1. SERVER_ENV

```
production
```

说明：标识为生产环境

### 2. CLIENT_URL

```
https://your-vercel-app.vercel.app
```

⚠️ 替换为您的实际 Vercel URL

- 必须包含 https://
- 不要在末尾添加斜杠 /

### 3. SERVER_URL

```
your-render-app.onrender.com
```

⚠️ 替换为 Render 分配的域名

- 不要包含 https://
- 只要域名部分

### 4. SESSION_SECRET

```
kambaz-secret-key-change-this-to-random-string-12345
```

⚠️ 建议改为随机字符串

- 可以使用：https://www.uuidgenerator.net/

### 5. DATABASE_CONNECTION_STRING

```
mongodb+srv://username:password@cluster.mongodb.net/kambaz?retryWrites=true&w=majority
```

⚠️ 从 MongoDB Atlas 获取

- 确保替换 username 和 password
- 确保包含数据库名 /kambaz
- 在 mongodb.net/ 和 ? 之间

---

# 🎨 Vercel 环境变量配置

## 在 Vercel 添加/更新以下环境变量：

### NEXT_PUBLIC_HTTP_SERVER

```
https://your-render-app.onrender.com
```

⚠️ 替换为您的 Render 后端 URL

- 必须包含 https://
- 不要在末尾添加斜杠 /

---

# 📝 快速复制模板

## Render 环境变量（复制后修改）

| Key                        | Value                                                                          |
| -------------------------- | ------------------------------------------------------------------------------ |
| SERVER_ENV                 | production                                                                     |
| CLIENT_URL                 | https://YOUR_VERCEL_APP.vercel.app                                             |
| SERVER_URL                 | YOUR_RENDER_APP.onrender.com                                                   |
| SESSION_SECRET             | YOUR_RANDOM_SECRET_KEY                                                         |
| DATABASE_CONNECTION_STRING | mongodb+srv://USER:PASS@CLUSTER.mongodb.net/kambaz?retryWrites=true&w=majority |

## Vercel 环境变量（复制后修改）

| Key                     | Value                                |
| ----------------------- | ------------------------------------ |
| NEXT_PUBLIC_HTTP_SERVER | https://YOUR_RENDER_APP.onrender.com |

---

# ✅ 验证清单

部署后验证以下 URL：

## 后端 API（Render）

- [ ] https://your-render-app.onrender.com/
- [ ] https://your-render-app.onrender.com/api/courses
- [ ] https://your-render-app.onrender.com/api/users

## 前端（Vercel）

- [ ] https://your-vercel-app.vercel.app/
- [ ] https://your-vercel-app.vercel.app/Dashboard
- [ ] https://your-vercel-app.vercel.app/Account/Users

## 数据库（MongoDB Atlas）

- [ ] 使用 Compass 连接成功
- [ ] users 集合有数据
- [ ] courses 集合有数据
- [ ] modules 集合有数据

---

# 🐛 常见错误修复

## CORS 错误

- 确认 Render 的 CLIENT_URL 与 Vercel URL 完全匹配
- 包括 https:// 前缀
- 不要有尾部斜杠

## Session 无法保持

- 确认 SERVER_ENV = production
- 确认 SERVER_URL 不含 https://
- 确认 SESSION_SECRET 已设置

## 数据库连接失败

- 确认连接字符串包含 /kambaz
- 确认密码正确（特殊字符需要 URL 编码）
- 确认 MongoDB Atlas 允许所有 IP (0.0.0.0/0)

## 404 错误

- 确认 NEXT_PUBLIC_HTTP_SERVER 包含 https://
- 确认 Render 服务正在运行（查看 Logs）
- 首次访问可能需要 30-60 秒唤醒
