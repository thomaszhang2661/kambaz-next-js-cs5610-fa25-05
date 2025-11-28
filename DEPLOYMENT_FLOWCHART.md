# 🚀 Kambaz A6 部署流程图

```
┌─────────────────────────────────────────────────────────────────┐
│                    开始部署 Kambaz A6                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────┐
        │  步骤 1: MongoDB Atlas 设置         │
        │  ⏱️  时间: 10 分钟                  │
        └────────────────┬───────────────────┘
                         │
                         │  1. mongodb.com 注册
                         │  2. 创建免费集群 (M0)
                         │  3. 创建数据库用户
                         │  4. 配置 IP 访问 (0.0.0.0/0)
                         │  5. 获取连接字符串
                         │  6. Compass 导入数据
                         │
                         ▼
        ┌────────────────────────────────────┐
        │  步骤 2: 推送代码到 GitHub          │
        │  ⏱️  时间: 2 分钟                   │
        │  ✅ 已完成                          │
        └────────────────┬───────────────────┘
                         │
                         │  git add -A
                         │  git commit -m "A6 deployment"
                         │  git push origin a6
                         │
                         ▼
        ┌────────────────────────────────────┐
        │  步骤 3: Render.com 部署后端        │
        │  ⏱️  时间: 15 分钟                  │
        └────────────────┬───────────────────┘
                         │
                         │  1. render.com 登录
                         │  2. New Web Service
                         │  3. 连接 GitHub 仓库
                         │  4. 配置 5 个环境变量:
                         │     - SERVER_ENV
                         │     - CLIENT_URL
                         │     - SERVER_URL
                         │     - SESSION_SECRET
                         │     - DATABASE_CONNECTION_STRING
                         │  5. 点击 Deploy
                         │  6. 等待部署完成
                         │
                         ▼
        ┌────────────────────────────────────┐
        │  步骤 4: Vercel 更新前端环境变量    │
        │  ⏱️  时间: 5 分钟                   │
        └────────────────┬───────────────────┘
                         │
                         │  1. vercel.com 登录
                         │  2. 进入项目 Settings
                         │  3. Environment Variables
                         │  4. 更新 NEXT_PUBLIC_HTTP_SERVER
                         │  5. Redeploy
                         │
                         ▼
        ┌────────────────────────────────────┐
        │  步骤 5: 完整功能测试               │
        │  ⏱️  时间: 20 分钟                  │
        └────────────────┬───────────────────┘
                         │
                         │  测试项目:
                         │  ✓ 登录/登出
                         │  ✓ Courses CRUD
                         │  ✓ Modules CRUD
                         │  ✓ Users CRUD (Admin)
                         │  ✓ Assignments CRUD
                         │  ✓ 数据持久化
                         │
                         ▼
        ┌────────────────────────────────────┐
        │  步骤 6: Canvas 提交                │
        │  ⏱️  时间: 5 分钟                   │
        └────────────────┬───────────────────┘
                         │
                         │  提交内容:
                         │  • Vercel URL
                         │  • Render URL
                         │  • GitHub 链接 (a6 分支)
                         │
                         ▼
        ┌────────────────────────────────────┐
        │          🎉 部署完成！               │
        │     预期得分: 147-153/153          │
        │          (96-100%)                 │
        └────────────────────────────────────┘
```

---

## 📊 环境变量配置关系图

```
┌─────────────────────────────────────────────────────────────────┐
│                        MongoDB Atlas                             │
│  🗄️  数据库服务                                                  │
│                                                                   │
│  连接字符串:                                                      │
│  mongodb+srv://user:pass@cluster.net/kambaz?...                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ DATABASE_CONNECTION_STRING
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Render.com                                │
│  🖥️  Node.js 后端服务器                                          │
│                                                                   │
│  环境变量:                                                        │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ SERVER_ENV = production                               │      │
│  │ CLIENT_URL = https://your-app.vercel.app ──────┐     │      │
│  │ SERVER_URL = your-app.onrender.com             │     │      │
│  │ SESSION_SECRET = random-key                    │     │      │
│  │ DATABASE_CONNECTION_STRING = mongodb+srv://... │     │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                   │
│  API 端点:                                                        │
│  https://your-app.onrender.com/api/...                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ NEXT_PUBLIC_HTTP_SERVER
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Vercel                                    │
│  🎨 Next.js 前端应用                                             │
│                                                                   │
│  环境变量:                                                        │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ NEXT_PUBLIC_HTTP_SERVER =                             │      │
│  │   https://your-app.onrender.com                       │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                    │              │
│  前端 URL:                                         │              │
│  https://your-app.vercel.app ─────────────────────┘              │
│                                                                   │
│  用户访问 ───────────────────────────────────────────────┐       │
└────────────────────────────────────────────────────────┼───────┘
                                                          │
                                                          ▼
                                                    👤 最终用户
```

---

## 🔄 请求流程图

```
用户浏览器
    │
    │ 1. 访问 https://your-app.vercel.app
    │
    ▼
Vercel (前端)
    │
    │ 2. 加载 React 应用
    │ 3. 读取 NEXT_PUBLIC_HTTP_SERVER
    │
    ▼
    │ 4. axios 请求到后端
    │    https://your-app.onrender.com/api/...
    │
    ▼
Render (后端)
    │
    │ 5. Express 处理请求
    │ 6. 检查 CORS (CLIENT_URL)
    │ 7. 验证 Session
    │
    ▼
    │ 8. Mongoose 查询数据库
    │    使用 DATABASE_CONNECTION_STRING
    │
    ▼
MongoDB Atlas
    │
    │ 9. 返回数据
    │
    ▼
Render (后端)
    │
    │ 10. 响应 JSON
    │
    ▼
Vercel (前端)
    │
    │ 11. React 渲染数据
    │
    ▼
用户浏览器
    │
    │ 12. 显示结果
    │
    ✅
```

---

## ⏱️ 时间估算

| 步骤     | 任务                | 预计时间     | 难度           |
| -------- | ------------------- | ------------ | -------------- |
| 1        | MongoDB Atlas 设置  | 10 分钟      | ⭐⭐           |
| 2        | 推送代码到 GitHub   | 2 分钟       | ⭐ (已完成 ✅) |
| 3        | Render 部署后端     | 15 分钟      | ⭐⭐⭐         |
| 4        | Vercel 更新环境变量 | 5 分钟       | ⭐             |
| 5        | circumfunc 功能测试 | 20 分钟      | ⭐⭐           |
| 6        | Canvas 提交         | 5 分钟       | ⭐             |
| **总计** |                     | **~60 分钟** |                |

---

## 💡 关键提示

### ✅ DO（正确做法）

- ✅ MongoDB 连接字符串包含 `/kambaz`
- ✅ Render `CLIENT_URL` 包含 `https://`
- ✅ Render `SERVER_URL` 不含 `https://`
- ✅ Vercel `NEXT_PUBLIC_HTTP_SERVER` 包含 `https://`
- ✅ 所有 URL 末尾不加斜杠 `/`
- ✅ 首次访问 Render 等待 30-60 秒

### ❌ DON'T（避免错误）

- ❌ 不要在 MongoDB 连接字符串忘记 `/kambaz`
- ❌ 不要混淆 Render 和 Vercel 的 URL
- ❌ 不要在 `.env` 文件中用引号
- ❌ 不要将 `.env` 推送到 GitHub
- ❌ 不要在密码中使用特殊字符（或使用 URL 编码）

---

## 🎯 成功标志

部署成功的标志：

1. ✅ Render 日志显示 "Connected to MongoDB"
2. ✅ Render 日志显示 "listening on port 10000"
3. ✅ 访问 `https://your-render-app.onrender.com/api/courses` 返回数据
4. ✅ Vercel 前端可以登录并查看课程
5. ✅ 刷新页面后保持登录状态
6. ✅ 所有 CRUD 操作正常工作
7. ✅ 浏览器 Console 无 CORS 错误

---

## 📞 需要帮助？

如果遇到问题，按优先级检查：

1. **Render 日志** (最重要)

   - 查看是否连接到 MongoDB
   - 查看是否有启动错误

2. **浏览器 Console**

   - 查看 JavaScript 错误
   - 查看 CORS 错误

3. **浏览器 Network 标签**

   - 查看 API 请求是否成功
   - 查看响应状态码

4. **环境变量**

   - 确认所有变量拼写正确
   - 确认所有值格式正确

5. **MongoDB Atlas**
   - 确认 IP 白名单设置
   - 确认用户权限

---

**祝您部署顺利！🚀**
