# ✅ Kambaz A6 部署检查清单

## 📋 准备阶段

- [x] ✅ 代码已推送到 GitHub (a6 分支)
- [x] ✅ .gitignore 已配置
- [x] ✅ 部署文档已创建

---

## 1️⃣ MongoDB Atlas 设置 (10 分钟)

### 步骤：

- [ ] 访问 https://mongodb.com 并登录
- [ ] 创建免费集群 (M0 Sandbox)
  - Provider: AWS
  - Region: US East (N. Virginia) 或最近地区
  - Cluster Name: `Kambaz` 或 `kambaz-a6`
- [ ] 创建数据库用户
  - Username: `____________________`
  - Password: `____________________` (记住！)
- [ ] 配置网络访问
  - IP: `0.0.0.0/0` (Allow from anywhere)
- [ ] 获取连接字符串
  - 格式: `mongodb+srv://user:pass@cluster.mongodb.net/kambaz?retryWrites=true&w=majority`
  - 我的连接字符串: `____________________________________________________`
- [ ] 使用 Compass 连接并导入数据
  - [ ] users 集合
  - [ ] courses 集合
  - [ ] modules 集合
  - [ ] assignments 集合
  - [ ] enrollments 集合

---

## 2️⃣ Render.com 部署后端 (15 分钟)

### 步骤：

- [ ] 访问 https://render.com 并用 GitHub 登录
- [ ] 点击 "New +" → "Web Service"
- [ ] 连接 GitHub 仓库: `kambaz-next-js-cs5610-fa25-05`
- [ ] 配置服务
  - Name: `kambaz-node-server-app-a6`
  - Branch: `a6`
  - Root Directory: `kambaz-node-server-app`
  - Build Command: `npm install`
  - Start Command: `node index.js`
  - Instance Type: `Free`

### 环境变量配置：

- [ ] `SERVER_ENV` = `production`
- [ ] `CLIENT_URL` = `https://______________.vercel.app`
- [ ] `SERVER_URL` = `______________.onrender.com` (不含 https://)
- [ ] `SESSION_SECRET` = `your-random-secret-key`
- [ ] `DATABASE_CONNECTION_STRING` = `mongodb+srv://...`

### 验证：

- [ ] 部署成功（查看日志）
- [ ] 访问 `https://your-app.onrender.com/` 有响应
- [ ] 访问 `https://your-app.onrender.com/api/courses` 返回课程数据
- [ ] 访问 `https://your-app.onrender.com/api/users` 返回用户数据

**我的 Render URL**: `https://______________________________.onrender.com`

---

## 3️⃣ Vercel 更新前端环境变量 (5 分钟)

### 步骤：

- [ ] 访问 https://vercel.com
- [ ] 进入项目: `kambaz-next-js-cs5610-fa25-05`
- [ ] Settings → Environment Variables
- [ ] 更新/添加 `NEXT_PUBLIC_HTTP_SERVER`
  - Value: `https://your-render-app.onrender.com`
- [ ] 保存后重新部署
  - Deployments → 最新部署 → "..." → Redeploy

### 验证：

- [ ] 访问 Vercel URL 正常显示
- [ ] 打开浏览器 Console，无 CORS 错误
- [ ] Network 标签显示后端请求成功

**我的 Vercel URL**: `https://______________________________.vercel.app`

---

## 4️⃣ 完整功能测试 (20 分钟)

### 基础功能：

- [ ] **登录/登出**
  - [ ] 可以用已有用户登录
  - [ ] 刷新页面后保持登录
  - [ ] 可以正常登出

### Courses CRUD：

- [ ] 在 Dashboard 查看课程列表
- [ ] 创建新课程
- [ ] 编辑课程信息
- [ ] 删除课程
- [ ] 刷新页面确认持久化

### Modules CRUD：

- [ ] 进入某个课程的 Modules 页面
- [ ] 点击 "+ Module" 添加新模块
- [ ] 点击铅笔图标编辑模块名
- [ ] 点击垃圾桶删除模块
- [ ] 刷新页面确认持久化

### Users 管理（需要 Admin 权限）：

- [ ] 以 Admin 身份登录
- [ ] 导航到 Users 页面
- [ ] 查看用户列表
- [ ] 使用 Role 下拉菜单过滤用户
- [ ] 使用搜索框按名字搜索
- [ ] 点击用户名查看详情
- [ ] 点击铅笔图标编辑用户
- [ ] 点击 "+ Users" 创建新用户
- [ ] 删除测试用户
- [ ] 刷新确认所有操作持久化

### Assignments CRUD：

- [ ] 进入某个课程的 Assignments 页面
- [ ] 创建新作业
- [ ] 编辑作业
- [ ] 删除作业
- [ ] 刷新确认持久化

---

## 5️⃣ 最终检查

### 数据持久化验证：

- [ ] 重启 Render 服务（Manual Deploy → Deploy latest commit）
- [ ] 重新访问前端，之前的修改都还在
- [ ] 使用 MongoDB Compass 查看数据库，数据正确

### 性能检查：

- [ ] 首次访问可能需要 30-60 秒（Render 免费版唤醒）
- [ ] 后续访问速度正常
- [ ] 没有明显的错误或警告

### 文档检查：

- [ ] GitHub README 包含部署信息
- [ ] 有 Vercel 和 Render 的 URL
- [ ] 有清晰的功能说明

---

## 6️⃣ Canvas 提交

### 提交内容：

1. **Vercel 前端 URL**: `https://______________________________.vercel.app`
2. **Render 后端 URL**: `https://______________________________.onrender.com`
3. **GitHub 仓库**: `https://github.com/thomaszhang2661/kambaz-next-js-cs5610-fa25-05`
   - 分支: `a6`
4. **说明文档**: 指向 DEPLOYMENT_GUIDE_CN.md

### 额外说明（可选）：

```
A6 完成功能：
✅ Users 完整 CRUD (45分)
✅ Modules API 集成 (12分)
✅ 生产环境部署 (15分)
✅ MongoDB + Session 支持
✅ Assignments CRUD
✅ Courses CRUD
✅ Enrollments 功能

技术栈：
- Frontend: Next.js 15 + React + Redux (Vercel)
- Backend: Node.js + Express (Render.com)
- Database: MongoDB (Atlas)
```

---

## 🐛 问题排查

### 如果遇到问题，检查：

#### CORS 错误

- [ ] Render `CLIENT_URL` = Vercel URL（含 https://）
- [ ] Vercel `NEXT_PUBLIC_HTTP_SERVER` = Render URL（含 https://）
- [ ] URL 末尾没有斜杠

#### Session 问题

- [ ] Render `SERVER_ENV` = `production`
- [ ] Render `SERVER_URL` 不含 https://
- [ ] `SESSION_SECRET` 已设置

#### 数据库连接失败

- [ ] 连接字符串包含 `/kambaz`
- [ ] 用户名密码正确
- [ ] MongoDB Atlas IP 白名单包含 `0.0.0.0/0`

#### 404 错误

- [ ] Render 服务正在运行（查看 Logs）
- [ ] 环境变量拼写正确
- [ ] 等待 30-60 秒服务唤醒

---

## 📊 预期得分

- **不部署**: 132-138/153 (86-90%) ⚠️
- **完整部署**: 147-153/153 (96-100%) ✨

**当前进度**: \_\_\_/153 分

---

## 🎉 恭喜完成！

- [ ] 所有功能测试通过
- [ ] 已提交到 Canvas
- [ ] 保存好所有 URL 和凭据

**完成时间**: ****\_\_\_\_****

**遇到的主要问题和解决方案**:

1. ***
2. ***
3. ***
