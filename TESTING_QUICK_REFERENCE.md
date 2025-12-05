# 🚀 Kambaz Quizzes 后端测试 - 快速参考

## ⚡ 30 秒快速开始

```bash
# Terminal 1: 启动服务器
cd kambaz-node-server-app && npm start

# Terminal 2: 运行快速测试
./quick-test.sh
```

**预期**: ✅ 所有测试通过，15 个测试场景完成

---

## 🧪 三种测试方法

### 1️⃣ 快速自动化测试 (推荐) ⭐⭐⭐

```bash
./quick-test.sh
```

**优点**: 快速 (2 分钟)、全面、无需输入  
**缺点**: 无法自定义  
**用途**: 快速验证所有功能都在工作

---

### 2️⃣ 官方烟雾测试 ⭐⭐⭐

```bash
cd kambaz-node-server-app
./smoke-test-quizzes.sh
```

**优点**: 最全面、官方支持  
**缺点**: 可能较慢  
**用途**: 生产前的最终验证

---

### 3️⃣ 手动 cURL 测试 ⭐⭐

```bash
# 登录获取 cookie
curl -X POST http://localhost:4000/api/users/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"prof1","password":"pass123"}' \
  -c /tmp/cookie.txt

# 创建 Quiz
curl -X POST http://localhost:4000/api/courses/CS5610/quizzes \
  -H "Content-Type: application/json" \
  -b /tmp/cookie.txt \
  -d '{"title":"Test","questions":[]}'
```

**优点**: 完全控制、学习用  
**缺点**: 需要手动输入  
**用途**: 调试和学习 API

---

## 📋 测试场景清单

### 基础功能 ✅

- [ ] Faculty 登录
- [ ] Student 登录
- [ ] Faculty 创建 Quiz
- [ ] Faculty 发布 Quiz
- [ ] Faculty 编辑 Quiz
- [ ] Faculty 删除 Quiz

### 权限检查 ✅

- [ ] Student 看不到未发布 Quiz (403)
- [ ] Student 不能创建 Quiz (403)
- [ ] Student 不能编辑 Quiz (403)
- [ ] Student 不能删除 Quiz (403)
- [ ] Student 不能发布 Quiz (403)

### 尝试管理 ✅

- [ ] Student 提交答案
- [ ] Student 查看自己的尝试
- [ ] Faculty 查看所有尝试
- [ ] Student 看不到他人的尝试 (403)
- [ ] Faculty 查看任何尝试

### 评分系统 ✅

- [ ] MCQ 评分正确
- [ ] T/F 评分正确
- [ ] Fill 评分正确 (大小写不敏感)
- [ ] 总分计算准确

### 尝试限制 ✅

- [ ] 单次尝试 Quiz (maxAttempts: 1)
- [ ] 多次尝试 Quiz (maxAttempts: 3)
- [ ] 超出限制返回 422 错误

---

## 🔧 常见命令

### 启动服务器

```bash
cd kambaz-node-server-app
npm start
# 检查: http://localhost:4000/api/routes
```

### 获取 Faculty Cookie

```bash
curl -X POST http://localhost:4000/api/users/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"prof1","password":"pass123"}' \
  -c /tmp/fac.txt
```

### 创建 Quiz

```bash
curl -X POST http://localhost:4000/api/courses/CS5610/quizzes \
  -H "Content-Type: application/json" \
  -b /tmp/fac.txt \
  -d '{
    "title": "My Quiz",
    "questions": [],
    "settings": {"multipleAttempts": true, "maxAttempts": 3}
  }'
```

### 发布 Quiz

```bash
curl -X POST http://localhost:4000/api/quizzes/{QUIZ_ID}/publish \
  -b /tmp/fac.txt
```

### 提交答案

```bash
curl -X POST http://localhost:4000/api/quizzes/{QUIZ_ID}/attempts \
  -H "Content-Type: application/json" \
  -b /tmp/stu.txt \
  -d '{
    "answers": [
      {"questionId": "q1", "answer": "choice1"},
      {"questionId": "q2", "answer": true},
      {"questionId": "q3", "answer": "Fill answer"}
    ]
  }'
```

---

## 🔍 API 端点一览

| 操作 | 方法   | 路径                            | 权限              |
| ---- | ------ | ------------------------------- | ----------------- |
| 列表 | GET    | /api/courses/:cid/quizzes       | Login             |
| 创建 | POST   | /api/courses/:cid/quizzes       | Faculty           |
| 获取 | GET    | /api/quizzes/:qid               | Login + Published |
| 编辑 | PUT    | /api/quizzes/:qid               | Faculty           |
| 删除 | DELETE | /api/quizzes/:qid               | Faculty           |
| 发布 | POST   | /api/quizzes/:qid/publish       | Faculty           |
| 取消 | POST   | /api/quizzes/:qid/unpublish     | Faculty           |
| 提交 | POST   | /api/quizzes/:qid/attempts      | Login             |
| 查看 | GET    | /api/quizzes/:qid/attempts      | Login             |
| 详情 | GET    | /api/quizzes/:qid/attempts/:aid | Login             |

---

## ❌ 常见错误

### 401 Unauthorized

**原因**: 缺少 cookie  
**解决**: 添加 `-b /tmp/cookie.txt`

### 403 Forbidden

**原因**: 权限不足  
**解决**: 检查用户角色 (Faculty vs Student)

### 404 Not Found

**原因**: Quiz 不存在  
**解决**: 检查 Quiz ID 是否正确

### 422 Unprocessable

**原因**: 业务规则违反 (如超出尝试次数)  
**解决**: 阅读错误消息

### 评分不对

**原因**: 答案格式不对  
**调试**:

- MCQ: `answer` 必须是 `choice._id`
- T/F: `answer` 必须是 `true` 或 `false` (布尔值)
- Fill: `answer` 必须是字符串，大小写不敏感

---

## 📊 快速测试结果检查

运行 `quick-test.sh` 后应看到:

```
✅ Faculty 登录成功
✅ Student 登录成功
✅ 创建 Quiz: <UUID>
✅ Quiz 已发布
✅ 获取成功，published: true
✅ Q1 ID: ..., Choice: ...
✅ 答案已提交
   分数: 100/100 (100分满分)
✅ 尝试数: 1
✅ 总尝试数: 1
✅ 第二次提交，分数: 30/100
✅ 第 3 次提交成功
✅ 正确拒绝: Exceeded max attempts
✅ Quiz 已取消发布
✅ 正确拒绝: Quiz not published
✅ Quiz 已删除
✅ 所有测试通过！
```

---

## 📚 更多信息

- **完整指南**: `TESTING_GUIDE.md`
- **API 规范**: `API_ROUTES_ALIGNMENT.md`
- **需求分析**: `REQUIREMENTS_ANALYSIS.md`
- **快速参考**: `QUICK_REFERENCE.txt`

---

## 💡 提示

1. **确保服务器运行**: `npm start` 应该在一个终端
2. **使用 jq 解析 JSON**: `curl ... | jq .`
3. **保存 Cookie**: 使用 `-c` 和 `-b` 选项
4. **检查响应**: 添加 `-v` 看详细信息
5. **批量测试**: 使用 `quick-test.sh` 或 `smoke-test-quizzes.sh`

---

**推荐流程**:

1. `./quick-test.sh` 快速验证 (2 分钟)
2. 如需调试，参考 `TESTING_GUIDE.md` 进行手动测试
3. 大规模测试使用 `smoke-test-quizzes.sh`
