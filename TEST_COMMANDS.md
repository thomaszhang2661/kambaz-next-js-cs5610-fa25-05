# 🧪 Quizzes API - 测试命令速查表

## 快速开始

### 1. 启动服务器

```bash
cd kambaz-node-server-app
npm start
# 服务器运行在 http://localhost:4000
```

### 2. 自动化测试 (推荐)

```bash
# 完整烟雾测试
./smoke-test-quizzes.sh

# 或使用 Node.js 运行
node scripts/smoke-test-quizzes.js
```

---

## 📝 手动 cURL 测试

### 登录 (获取 Session)

```bash
# Faculty 用户登录
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"faculty01","password":"password123"}' \
  -c cookies.txt

# 后续请求使用 -b cookies.txt
```

### ✅ Quiz 列表

```bash
# 规范路径
curl http://localhost:4000/api/courses/CS5610/quizzes \
  -b cookies.txt

# 兼容路径 (旧版本)
curl http://localhost:4000/api/quizzes \
  -b cookies.txt
```

### 📌 创建 Quiz (Faculty)

```bash
curl -X POST http://localhost:4000/api/courses/CS5610/quizzes \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Midterm Exam",
    "description": "Chapter 1-5",
    "points": 100,
    "settings": {
      "quizType": "Graded Quiz",
      "multipleAttempts": true,
      "maxAttempts": 3,
      "showCorrectAnswers": false
    },
    "questions": [
      {
        "title": "What is React?",
        "type": "mcq",
        "points": 25,
        "choices": ["JS Library", "CSS Framework", "DB", "Server"]
      }
    ]
  }'
```

### 👀 获取 Quiz 详情

```bash
# 规范路径
curl http://localhost:4000/api/courses/CS5610/quizzes/quiz123 \
  -b cookies.txt

# 兼容路径
curl http://localhost:4000/api/quizzes/quiz123 \
  -b cookies.txt

# 如果未发布且用户是学生 → 403 Forbidden
```

### 🔧 编辑 Quiz

```bash
curl -X PUT http://localhost:4000/api/courses/CS5610/quizzes/quiz123 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Midterm Exam - Updated",
    "description": "Chapter 1-6"
  }'
```

### 📤 发布 Quiz

```bash
curl -X POST http://localhost:4000/api/courses/CS5610/quizzes/quiz123/publish \
  -b cookies.txt

# 返回:
# {
#   "message": "Quiz published",
#   "published": true,
#   "publishedBy": "faculty01",
#   "publishedAt": "2025-12-04T..."
# }
```

### 📥 取消发布

```bash
curl -X POST http://localhost:4000/api/courses/CS5610/quizzes/quiz123/unpublish \
  -b cookies.txt
```

### 🗑️ 删除 Quiz

```bash
curl -X DELETE http://localhost:4000/api/courses/CS5610/quizzes/quiz123 \
  -b cookies.txt
```

### 📝 提交答案

```bash
curl -X POST http://localhost:4000/api/courses/CS5610/quizzes/quiz123/attempts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "answers": [
      {
        "questionId": "q1",
        "answer": "JS Library"
      },
      {
        "questionId": "q2",
        "answer": "true"
      },
      {
        "questionId": "q3",
        "answer": "React is a library"
      }
    ]
  }'

# 返回:
# {
#   "attempt": {...},
#   "score": 50,
#   "totalPoints": 100
# }
```

### 📊 查看所有尝试

```bash
# Faculty: 看全部 | Student: 看自己的
curl http://localhost:4000/api/courses/CS5610/quizzes/quiz123/attempts \
  -b cookies.txt

# 返回数组:
# [
#   {
#     "_id": "attempt1",
#     "quiz": "quiz123",
#     "user": "student01",
#     "score": 85,
#     "totalPoints": 100,
#     "attemptNumber": 1,
#     "createdAt": "2025-12-04T..."
#   },
#   ...
# ]
```

### 🔍 查看单次尝试

```bash
curl http://localhost:4000/api/courses/CS5610/quizzes/quiz123/attempts/attempt1 \
  -b cookies.txt

# Student: 403 if 不是自己的
# Faculty: 200 OK (返回详情)
```

---

## 🔐 权限检查列表

| 端点                              | Student    | Faculty | 备注 |
| --------------------------------- | ---------- | ------- | ---- |
| GET /courses/:cid/quizzes         | 仅看已发布 | 全部    | ✅   |
| POST /courses/:cid/quizzes        | 403        | 201     | ✅   |
| GET /courses/:cid/quizzes/:qid    | 403 未发布 | 200     | ✅   |
| PUT /courses/:cid/quizzes/:qid    | 403        | 200     | ✅   |
| DELETE /courses/:cid/quizzes/:qid | 403        | 200     | ✅   |
| POST .../publish                  | 403        | 200     | ✅   |
| POST .../unpublish                | 403        | 200     | ✅   |
| POST .../attempts                 | 仅自己     | 200     | ✅   |
| GET .../attempts                  | 仅自己     | 全部    | ✅   |
| GET .../attempts/:aid             | 403 他人   | 200     | ✅   |

---

## 🐛 常见问题排查

### ❌ 401 Unauthorized

**问题**: 未登录

```bash
# 解决: 先登录获取 session
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"faculty01","password":"password123"}' \
  -c cookies.txt

# 后续请求加 -b cookies.txt
```

### ❌ 403 Forbidden

**问题**: 权限不足

```bash
# 1. 学生试图编辑/删除/发布 → 403
# 2. 学生查看未发布的 quiz → 403
# 3. 学生查看他人的尝试 → 403

# 解决: 使用 Faculty 账号或查看自己的资源
```

### ❌ 404 Not Found

**问题**: Quiz 或 Attempt 不存在

```bash
# 检查 ID 是否正确
curl http://localhost:4000/api/courses/CS5610/quizzes \
  -b cookies.txt
# 找到存在的 quiz ID，再查询
```

### ❌ 422 Unprocessable Entity

**问题**: 业务规则违反

```bash
# 常见原因:
# 1. 尝试次数超过限制 maxAttempts
# 2. Quiz 未发布但学生试图提交
# 3. 必填字段缺失

# 检查 response 中的错误消息
```

---

## 📊 性能测试

### 批量创建 Quizzes

```bash
for i in {1..10}; do
  curl -X POST http://localhost:4000/api/courses/CS5610/quizzes \
    -H "Content-Type: application/json" \
    -b cookies.txt \
    -d "{
      \"title\": \"Quiz $i\",
      \"description\": \"Test quiz $i\",
      \"points\": $((i * 10))
    }"
  echo "Created quiz $i"
done
```

### 并发提交尝试 (使用 GNU Parallel)

```bash
# 需要先: brew install parallel

parallel -j 5 'curl -X POST http://localhost:4000/api/courses/CS5610/quizzes/quiz1/attempts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d "{\"answers\": [{\"questionId\": \"q1\", \"answer\": \"JS\"}]}"' ::: {1..20}
```

---

## 📈 监控和调试

### 查看服务器日志

```bash
# 在启动服务器的终端看日志，或:
tail -f kambaz-node-server-app/logs/*.log 2>/dev/null || echo "无日志文件"
```

### 验证路由已注册

```bash
curl http://localhost:4000/api/routes 2>/dev/null | jq . || \
  echo "路由端点 /api/routes 未实现，但可通过实际调用验证"

# 或直接测试
curl -s http://localhost:4000/api/courses/CS5610/quizzes -I -b cookies.txt | head -1
# 输出: HTTP/1.1 200 OK
```

### 检查数据库连接

```bash
# 在 Node.js REPL 中检查
cd kambaz-node-server-app
node -e "
const QuizzesDao = require('./Kambaz/Quizzes/dao');
console.log('MongoDB Connected:', QuizzesDao.isConnected());
"
```

---

## 🚀 部署前检查清单

- [ ] 运行 `./smoke-test-quizzes.sh` 通过全部测试
- [ ] 验证旧路径 `/api/quizzes/:qid` 和新路径 `/api/courses/:cid/quizzes/:qid` 都可用
- [ ] 检查所有权限控制正确 (学生 403、Faculty 200)
- [ ] 确认发布/取消发布功能正常
- [ ] 验证尝试次数限制生效
- [ ] 测试评分计算准确 (MCQ、TF、Fill)
- [ ] 检查 MongoDB 连接或内存模式回退正常

---

**最后更新**: 2025-12-04  
**状态**: ✅ 完成并验证  
**兼容性**: 100% 向后兼容
