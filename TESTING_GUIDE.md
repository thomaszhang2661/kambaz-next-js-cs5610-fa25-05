# 🧪 Kambaz Quizzes 后端测试指南

**创建日期**: 2025-12-04  
**目的**: 全面测试 Quizzes API 的所有功能

---

## 🚀 快速开始

### 方式 1: 运行自动化烟雾测试 (推荐)

```bash
# 1. 启动服务器
cd kambaz-node-server-app
npm start

# 2. 在另一个终端运行烟雾测试
./smoke-test-quizzes.sh

# 3. 查看结果
# 应该看到类似输出:
# ✅ Quiz created
# ✅ Quiz fetched
# ✅ Quiz updated
# ✅ Quiz published
# ✅ Attempt submitted
# ✅ Attempt retrieved
```

### 方式 2: 手动 cURL 测试

```bash
# 启动服务器
cd kambaz-node-server-app
npm start
```

---

## 📝 详细测试步骤

### 步骤 1: 用户登录

首先需要登录以获取 session cookie：

```bash
# Faculty 登录
curl -X POST http://localhost:4000/api/users/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"prof1","password":"pass123"}' \
  -c /tmp/faculty_cookie.txt \
  -v

# 或 Student 登录
curl -X POST http://localhost:4000/api/users/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"pass123"}' \
  -c /tmp/student_cookie.txt \
  -v

# 验证响应: 应该看到 currentUser 和 role 字段
```

### 步骤 2: 创建 Quiz (Faculty only)

```bash
COURSE_ID="CS5610"
COOKIE_FILE="/tmp/faculty_cookie.txt"

curl -X POST http://localhost:4000/api/courses/$COURSE_ID/quizzes \
  -H "Content-Type: application/json" \
  -b "$COOKIE_FILE" \
  -d '{
    "title": "Midterm Exam",
    "description": "Chapter 1-5 content",
    "points": 100,
    "settings": {
      "quizType": "graded",
      "multipleAttempts": true,
      "maxAttempts": 3,
      "shuffleAnswers": true,
      "timeLimitMinutes": 20,
      "oneQuestionAtATime": true,
      "showCorrectAnswers": false
    },
    "questions": [
      {
        "type": "mcq",
        "title": "What is JavaScript?",
        "body": "Select the correct definition",
        "points": 25,
        "choices": [
          { "text": "A programming language", "isCorrect": true },
          { "text": "A markup language", "isCorrect": false },
          { "text": "A styling language", "isCorrect": false }
        ]
      },
      {
        "type": "tf",
        "title": "React is a library",
        "body": "True or False?",
        "points": 25,
        "choices": [
          { "_id": "true", "text": "True", "isCorrect": true },
          { "_id": "false", "text": "False", "isCorrect": false }
        ]
      },
      {
        "type": "fill",
        "title": "Fill in the blank",
        "body": "CSS stands for ___",
        "points": 25,
        "blanks": [
          {
            "answers": ["Cascading Style Sheets", "cascading style sheets"]
          }
        ]
      }
    ],
    "dueDate": "2025-12-20T23:59:00",
    "availableDate": "2025-12-04T00:00:00",
    "untilDate": "2025-12-21T00:00:00"
  }' \
  -o /tmp/quiz_created.json \
  -v

# 查看响应，获取 quiz._id
jq . /tmp/quiz_created.json
QUIZ_ID=$(jq -r '._id' /tmp/quiz_created.json)
echo "Created quiz: $QUIZ_ID"
```

**预期结果:**

- ✅ 200 OK (或 201 Created)
- ✅ 返回 Quiz 对象，包含所有字段
- ✅ 包含 `_id`, `course`, `questions` 等

---

### 步骤 3: 获取 Quiz 列表

```bash
COURSE_ID="CS5610"
COOKIE_FILE="/tmp/faculty_cookie.txt"

# Faculty 应该看到所有 Quiz
curl -X GET http://localhost:4000/api/courses/$COURSE_ID/quizzes \
  -b "$COOKIE_FILE" \
  -v

# Student 只看已发布的
curl -X GET http://localhost:4000/api/courses/$COURSE_ID/quizzes \
  -b /tmp/student_cookie.txt \
  -v
```

**预期结果:**

- Faculty: 200 OK，返回所有 Quiz (包括未发布的)
- Student: 200 OK，返回仅已发布的 Quiz
- 返回数组，每个元素都是 Quiz 对象

---

### 步骤 4: 获取单个 Quiz 详情

```bash
QUIZ_ID="从步骤2获取"
COOKIE_FILE="/tmp/faculty_cookie.txt"

# Faculty 可以看到未发布的 Quiz
curl -X GET http://localhost:4000/api/quizzes/$QUIZ_ID \
  -b "$COOKIE_FILE" \
  -v

# Student 看不到未发布的 Quiz
curl -X GET http://localhost:4000/api/quizzes/$QUIZ_ID \
  -b /tmp/student_cookie.txt \
  -v
```

**预期结果:**

- Faculty: 200 OK，返回 Quiz 对象
- Student (未发布): 403 Forbidden，错误消息: "Quiz not published"
- Student (已发布): 200 OK，返回 Quiz 对象

---

### 步骤 5: 编辑 Quiz

```bash
QUIZ_ID="从步骤2获取"
COOKIE_FILE="/tmp/faculty_cookie.txt"

curl -X PUT http://localhost:4000/api/quizzes/$QUIZ_ID \
  -H "Content-Type: application/json" \
  -b "$COOKIE_FILE" \
  -d '{
    "title": "Midterm Exam (Updated)",
    "description": "Chapter 1-6 content (Updated)"
  }' \
  -o /tmp/quiz_updated.json \
  -v

jq . /tmp/quiz_updated.json
```

**预期结果:**

- ✅ 200 OK 或 204 No Content
- ✅ 返回更新后的 Quiz 对象

---

### 步骤 6: 发布 Quiz

```bash
QUIZ_ID="从步骤2获取"
COOKIE_FILE="/tmp/faculty_cookie.txt"

curl -X POST http://localhost:4000/api/quizzes/$QUIZ_ID/publish \
  -b "$COOKIE_FILE" \
  -o /tmp/quiz_published.json \
  -v

# 检查发布字段
jq '{published, publishedBy, publishedAt}' /tmp/quiz_published.json
```

**预期结果:**

- ✅ 200 OK
- ✅ `published: true`
- ✅ `publishedBy`: 当前用户 ID
- ✅ `publishedAt`: 当前时间戳 (ISO 8601 格式)

---

### 步骤 7: 验证学生现在可以看到 Quiz

```bash
QUIZ_ID="从步骤2获取"

# 现在 Student 应该能看到已发布的 Quiz
curl -X GET http://localhost:4000/api/quizzes/$QUIZ_ID \
  -b /tmp/student_cookie.txt \
  -v

# 应该返回 200 OK
```

**预期结果:**

- ✅ 200 OK
- ✅ 返回 Quiz 对象

---

### 步骤 8: Student 提交答案

```bash
QUIZ_ID="从步骤2获取"
STUDENT_COOKIE="/tmp/student_cookie.txt"

# 首先获取 Quiz，查看题目 ID
curl -X GET http://localhost:4000/api/quizzes/$QUIZ_ID \
  -b "$STUDENT_COOKIE" \
  -o /tmp/quiz_for_attempt.json

# 提取题目 ID
MCQ_ID=$(jq -r '.questions[0]._id' /tmp/quiz_for_attempt.json)
TF_ID=$(jq -r '.questions[1]._id' /tmp/quiz_for_attempt.json)
FILL_ID=$(jq -r '.questions[2]._id' /tmp/quiz_for_attempt.json)

# 获取 MCQ 的第一个选择 ID
MCQ_CHOICE_ID=$(jq -r '.questions[0].choices[0]._id' /tmp/quiz_for_attempt.json)

echo "MCQ ID: $MCQ_ID, Choice ID: $MCQ_CHOICE_ID"
echo "TF ID: $TF_ID"
echo "Fill ID: $FILL_ID"

# 提交答案
curl -X POST http://localhost:4000/api/quizzes/$QUIZ_ID/attempts \
  -H "Content-Type: application/json" \
  -b "$STUDENT_COOKIE" \
  -d "{
    \"answers\": [
      {
        \"questionId\": \"$MCQ_ID\",
        \"answer\": \"$MCQ_CHOICE_ID\"
      },
      {
        \"questionId\": \"$TF_ID\",
        \"answer\": true
      },
      {
        \"questionId\": \"$FILL_ID\",
        \"answer\": \"Cascading Style Sheets\"
      }
    ]
  }" \
  -o /tmp/attempt_submitted.json \
  -v

jq . /tmp/attempt_submitted.json
ATTEMPT_ID=$(jq -r '.attempt._id' /tmp/attempt_submitted.json)
echo "Attempt ID: $ATTEMPT_ID"
```

**预期结果:**

- ✅ 201 Created (或 200 OK)
- ✅ 返回 `{attempt, score, total}`
- ✅ `attempt._id`: 唯一标识符
- ✅ `score`: 根据正确答案计算的分数
- ✅ `total`: 总分

**分数计算验证:**

- MCQ (正确答案): +25 分
- TF (true = 正确): +25 分
- Fill (Cascading Style Sheets 匹配): +25 分
- 总分: 75/100

---

### 步骤 9: Student 查看尝试历史

```bash
QUIZ_ID="从步骤2获取"
STUDENT_COOKIE="/tmp/student_cookie.txt"

# 获取所有尝试
curl -X GET http://localhost:4000/api/quizzes/$QUIZ_ID/attempts \
  -b "$STUDENT_COOKIE" \
  -o /tmp/attempts_list.json \
  -v

jq . /tmp/attempts_list.json

# 获取单个尝试详情
ATTEMPT_ID="从步骤8获取"
curl -X GET http://localhost:4000/api/quizzes/$QUIZ_ID/attempts/$ATTEMPT_ID \
  -b "$STUDENT_COOKIE" \
  -o /tmp/attempt_detail.json \
  -v

jq . /tmp/attempt_detail.json
```

**预期结果:**

- ✅ 200 OK
- ✅ 返回该 Student 的所有尝试
- ✅ 每个尝试包含: `_id`, `score`, `totalPoints`, `attemptNumber`, `answers`, `createdAt`

---

### 步骤 10: Faculty 查看所有 Student 的尝试

```bash
QUIZ_ID="从步骤2获取"
FACULTY_COOKIE="/tmp/faculty_cookie.txt"

# Faculty 应该看到所有学生的尝试
curl -X GET http://localhost:4000/api/quizzes/$QUIZ_ID/attempts \
  -b "$FACULTY_COOKIE" \
  -o /tmp/all_attempts.json \
  -v

jq . /tmp/all_attempts.json

# 应该包含多个学生的尝试
```

**预期结果:**

- ✅ 200 OK
- ✅ 返回所有学生的所有尝试

---

### 步骤 11: 测试尝试次数限制

```bash
QUIZ_ID="从步骤2获取"
STUDENT_COOKIE="/tmp/student_cookie.txt"

# 尝试多个答案组合，每次提交一次
for i in {1..3}; do
  echo "Attempt #$i"
  curl -X POST http://localhost:4000/api/quizzes/$QUIZ_ID/attempts \
    -H "Content-Type: application/json" \
    -b "$STUDENT_COOKIE" \
    -d '{
      "answers": [
        {"questionId": "q1", "answer": "choice1"},
        {"questionId": "q2", "answer": false},
        {"questionId": "q3", "answer": "Wrong answer"}
      ]
    }' \
    -v
done

# 第 4 次尝试应该失败 (maxAttempts: 3)
echo "Attempt #4 (should fail)"
curl -X POST http://localhost:4000/api/quizzes/$QUIZ_ID/attempts \
  -H "Content-Type: application/json" \
  -b "$STUDENT_COOKIE" \
  -d '{
    "answers": []
  }' \
  -v
```

**预期结果:**

- ✅ 前 3 次: 201 Created，`attemptNumber` 分别为 1, 2, 3
- ❌ 第 4 次: 422 Unprocessable Entity，错误: "Exceeded max attempts"

---

### 步骤 12: 测试不允许多次尝试的 Quiz

```bash
COURSE_ID="CS5610"
FACULTY_COOKIE="/tmp/faculty_cookie.txt"

# 创建不允许多次尝试的 Quiz
curl -X POST http://localhost:4000/api/courses/$COURSE_ID/quizzes \
  -H "Content-Type: application/json" \
  -b "$FACULTY_COOKIE" \
  -d '{
    "title": "Single Attempt Quiz",
    "settings": {
      "multipleAttempts": false,
      "maxAttempts": 1
    },
    "questions": []
  }' \
  -o /tmp/single_attempt_quiz.json

SINGLE_QUIZ_ID=$(jq -r '._id' /tmp/single_attempt_quiz.json)

# 发布 Quiz
curl -X POST http://localhost:4000/api/quizzes/$SINGLE_QUIZ_ID/publish \
  -b "$FACULTY_COOKIE"

# Student 第一次提交 (应该成功)
curl -X POST http://localhost:4000/api/quizzes/$SINGLE_QUIZ_ID/attempts \
  -H "Content-Type: application/json" \
  -b /tmp/student_cookie.txt \
  -d '{"answers": []}' \
  -v

# Student 第二次提交 (应该失败)
curl -X POST http://localhost:4000/api/quizzes/$SINGLE_QUIZ_ID/attempts \
  -H "Content-Type: application/json" \
  -b /tmp/student_cookie.txt \
  -d '{"answers": []}' \
  -v
```

**预期结果:**

- ✅ 第 1 次: 201 Created
- ❌ 第 2 次: 422 Unprocessable Entity，错误: "No multiple attempts allowed"

---

### 步骤 13: 取消发布 Quiz

```bash
QUIZ_ID="从步骤2获取"
FACULTY_COOKIE="/tmp/faculty_cookie.txt"

curl -X POST http://localhost:4000/api/quizzes/$QUIZ_ID/unpublish \
  -b "$FACULTY_COOKIE" \
  -o /tmp/quiz_unpublished.json \
  -v

jq '{published, unpublishedBy, unpublishedAt}' /tmp/quiz_unpublished.json
```

**预期结果:**

- ✅ 200 OK
- ✅ `published: false`
- ✅ `unpublishedBy`: 当前用户 ID
- ✅ `unpublishedAt`: 当前时间戳

---

### 步骤 14: 删除 Quiz

```bash
QUIZ_ID="从步骤2获取"
FACULTY_COOKIE="/tmp/faculty_cookie.txt"

curl -X DELETE http://localhost:4000/api/quizzes/$QUIZ_ID \
  -b "$FACULTY_COOKIE" \
  -v

# 应该返回 204 No Content 或 200 OK
```

**预期结果:**

- ✅ 204 No Content 或 200 OK
- 验证：尝试再次获取应该返回 404

```bash
curl -X GET http://localhost:4000/api/quizzes/$QUIZ_ID \
  -b "$FACULTY_COOKIE" \
  -v
# 应该返回 404 Not Found
```

---

## 🔐 权限测试矩阵

| 操作     | Endpoint                        | Faculty | Student   | 预期                                 |
| -------- | ------------------------------- | ------- | --------- | ------------------------------------ |
| 创建     | POST /quizzes                   | ✅      | ❌        | Faculty: 201, Student: 403           |
| 列表     | GET /quizzes                    | ✅ 全部 | ✅ 已发布 | Faculty: 所有, Student: 过滤         |
| 读取     | GET /quizzes/:qid               | ✅      | ❌ 未发布 | Faculty: 200, Student: 403 if 未发布 |
| 编辑     | PUT /quizzes/:qid               | ✅      | ❌        | Faculty: 200, Student: 403           |
| 删除     | DELETE /quizzes/:qid            | ✅      | ❌        | Faculty: 204, Student: 403           |
| 发布     | POST /quizzes/:qid/publish      | ✅      | ❌        | Faculty: 200, Student: 403           |
| 取消     | POST /quizzes/:qid/unpublish    | ✅      | ❌        | Faculty: 200, Student: 403           |
| 提交     | POST /quizzes/:qid/attempts     | ✅      | ✅        | Both: 201                            |
| 查看尝试 | GET /quizzes/:qid/attempts      | ✅ 全部 | ✅ 自己的 | Faculty: 所有, Student: 过滤         |
| 查看单个 | GET /quizzes/:qid/attempts/:aid | ✅      | ❌ 他人的 | Faculty: 200, Student: 403 if 他人   |

---

## 📊 自动化测试脚本

如果想写自己的测试脚本，参考 `smoke-test-quizzes.sh`：

```bash
#!/bin/bash

# 设置变量
SERVER="http://localhost:4000"
FACULTY_COOKIE="/tmp/fac.txt"
STUDENT_COOKIE="/tmp/stu.txt"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# 测试函数
test_endpoint() {
  local name=$1
  local method=$2
  local url=$3
  local cookie=$4
  local data=$5
  local expected_code=$6

  if [ -z "$data" ]; then
    response=$(curl -s -w "\n%{http_code}" -X $method "$SERVER$url" -b "$cookie")
  else
    response=$(curl -s -w "\n%{http_code}" -X $method "$SERVER$url" -H "Content-Type: application/json" -b "$cookie" -d "$data")
  fi

  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')

  if [ "$http_code" = "$expected_code" ]; then
    echo -e "${GREEN}✅ $name${NC} (HTTP $http_code)"
    echo "$body"
  else
    echo -e "${RED}❌ $name${NC} (Expected $expected_code, got $http_code)"
    echo "$body"
  fi
}

# 1. Faculty 登录
test_endpoint "Faculty Login" POST "/api/users/signin" "" \
  '{"username":"prof1","password":"pass123"}' 200

# 保存 cookie
curl -s -X POST "$SERVER/api/users/signin" \
  -H "Content-Type: application/json" \
  -d '{"username":"prof1","password":"pass123"}' \
  -c "$FACULTY_COOKIE" > /dev/null

# 2. Student 登录
curl -s -X POST "$SERVER/api/users/signin" \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"pass123"}' \
  -c "$STUDENT_COOKIE" > /dev/null

# 3. 创建 Quiz
test_endpoint "Create Quiz" POST "/api/courses/CS5610/quizzes" "$FACULTY_COOKIE" \
  '{"title":"Test Quiz","questions":[]}' 201

# ... 更多测试 ...
```

---

## ✅ 测试清单

- [ ] 用户登录 (Faculty + Student)
- [ ] 创建 Quiz (Faculty only)
- [ ] 列表 Quiz (Faculty 全部 vs Student 过滤)
- [ ] 获取 Quiz 详情 (发布/未发布权限检查)
- [ ] 编辑 Quiz (Faculty only)
- [ ] 发布 Quiz (Faculty only)
- [ ] 取消发布 Quiz (Faculty only)
- [ ] Student 提交答案 (评分计算)
  - [ ] MCQ 评分
  - [ ] T/F 评分
  - [ ] Fill 评分 (大小写不敏感)
- [ ] 查看尝试 (Faculty 全部 vs Student 自己的)
- [ ] 尝试次数限制
  - [ ] multipleAttempts: false
  - [ ] multipleAttempts: true, maxAttempts: 3
- [ ] 删除 Quiz (Faculty only)
- [ ] 权限验证 (Student 403 errors)

---

## 🐛 常见问题和调试

### 问题 1: 401 Unauthorized

**原因**: 没有有效的 session cookie

**解决**:

```bash
# 确保使用 -b 和 -c 选项
curl -b /tmp/cookie.txt ...
```

### 问题 2: 403 Forbidden

**原因**: 权限不足 (用 Student 账户尝试 Faculty 操作)

**解决**:

```bash
# 使用 Faculty cookie 进行修改操作
curl -b /tmp/faculty_cookie.txt ...
```

### 问题 3: 404 Not Found

**原因**: Quiz ID 不存在

**解决**:

```bash
# 先列出所有 Quiz，获取正确的 ID
curl http://localhost:4000/api/courses/CS5610/quizzes \
  -b /tmp/cookie.txt | jq .
```

### 问题 4: 422 Unprocessable Entity

**原因**: 业务规则验证失败 (如尝试次数超出)

**解决**: 检查响应中的错误消息

```bash
curl ... -v 2>&1 | grep -A 5 "error"
```

### 问题 5: 评分不对

**原因**: 答案格式或比对逻辑不匹配

**调试**:

```bash
# 检查问题的 _id 和选项的 _id
jq '.questions' /tmp/quiz.json

# 确保答案格式正确
# MCQ: answer = choice._id (字符串)
# T/F: answer = true/false (布尔值)
# Fill: answer = "string" (字符串，大小写不敏感)
```

---

## 📈 性能测试

```bash
# 测试批量创建 (10 个 Quiz)
time for i in {1..10}; do
  curl -X POST http://localhost:4000/api/courses/CS5610/quizzes \
    -H "Content-Type: application/json" \
    -b /tmp/faculty_cookie.txt \
    -d "{\"title\":\"Quiz $i\",\"questions\":[]}" \
    -s > /dev/null
done

# 测试并发提交 (使用 GNU Parallel)
parallel -j 5 'curl -X POST http://localhost:4000/api/quizzes/QUIZ_ID/attempts \
  -H "Content-Type: application/json" \
  -b /tmp/student_cookie.txt \
  -d "{\"answers\":[]}" \
  -s > /dev/null' ::: {1..20}
```

---

## 📚 参考资源

- 完整 API 规范: `API_ROUTES_ALIGNMENT.md`
- 测试命令速查: `TEST_COMMANDS.md`
- 烟雾测试脚本: `kambaz-node-server-app/smoke-test-quizzes.sh`
