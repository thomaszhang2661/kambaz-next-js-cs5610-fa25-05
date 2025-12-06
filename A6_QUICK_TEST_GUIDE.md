# 🚀 A6 分支快速功能测试指南

**部署地址**: https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app/

**预计时间**: 15-20 分钟完整测试

---

## 🎯 5 分钟快速体验

### Step 1: Faculty 侧 (5 分钟)

```bash
时间：00:00 - 05:00

1. 访问网站
   └─ 打开: https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app/

2. 登录 Faculty (1分钟)
   └─ 点击: Signin
   └─ 用户名: faculty
   └─ 密码: faculty123
   └─ 验证: 看到 "Faculty" 名字在导航栏

3. 进入课程 (1分钟)
   └─ Kambaz > Courses > CS5610
   └─ 或直接点击: Quiz 菜单
   └─ 验证: 进入 Quiz 列表页

4. 创建 Quiz (2分钟)
   └─ 点击: "Create Quiz" 或 "New Quiz"
   └─ 填写:
      • Title: "My Test Quiz"
      • Description: "A quick test"
      • Points: 100
   └─ 添加题目 (Quick):
      • MCQ: "What is 2+2?" → "4" (正确)
      • T/F: "React is JS" → True (正确)
   └─ 点击: Save
   └─ 验证: 返回列表，看到新 Quiz

5. 发布 Quiz (1分钟)
   └─ 找到刚创建的 Quiz
   └─ 点击: Publish 按钮
   └─ 验证: 状态变为 "Published"
```

### Step 2: Student 侧 (5 分钟)

```bash
时间：05:00 - 10:00

1. 登出 Faculty (30秒)
   └─ 点击: 用户名 > Logout
   └─ 验证: 进入登录页

2. 登录 Student (1分钟)
   └─ 用户名: alice
   └─ 密码: alice123
   └─ 验证: 看到 "alice" 在导航栏

3. 查看 Quiz (1分钟)
   └─ Kambaz > Courses > CS5610 > Quizzes
   └─ 验证: 仅看到发布的 Quiz
   └─ 未发布的 Quiz 不在列表中

4. 答题 (2分钟)
   └─ 点击: "My Test Quiz"
   └─ 填答案:
      • MCQ: 选择 "4"
      • T/F: 选择 "True"
   └─ 点击: Submit
   └─ 验证: 显示成绩页面，显示 "100/100"

5. 查看成绩 (30秒)
   └─ 验证: 显示所有题目的答案反馈
   └─ 验证: 能看到正确答案
```

### Step 3: 权限检查 (2 分钟)

```bash
时间：10:00 - 12:00

1. 验证 Student 无权限 (1分钟)
   └─ 作为 alice 登录
   └─ 尝试访问: /Kambaz/Courses/CS5610/Quizzes/[quiz-id]/edit
   └─ 预期: 403 错误或重定向
   └─ 验证: 无创建/编辑/删除按钮

2. Faculty 查看所有成绩 (1分钟)
   └─ 登出 alice，登入 faculty
   └─ 进入已发布的 Quiz
   └─ 验证: 看到 alice 的答题记录
   └─ 验证: 可以查看详细成绩
```

---

## 📊 详细功能测试清单

### 🔐 认证和权限 (3 分钟)

- [ ] Faculty 能成功登录
- [ ] Student 能成功登录
- [ ] 登出功能正常
- [ ] Student 无法看到未发布 Quiz
- [ ] Student 无法创建 Quiz (无按钮或 403)
- [ ] Faculty 可以创建 Quiz

### 📝 创建 Quiz (5 分钟)

- [ ] 能填写 Quiz 基本信息
- [ ] 能添加 MCQ 题目
- [ ] 能添加 True/False 题目
- [ ] 能添加 Fill-blank 题目
- [ ] 能删除题目
- [ ] 能保存 Quiz
- [ ] 新 Quiz 出现在列表中

### 📤 发布管理 (2 分钟)

- [ ] 新 Quiz 默认未发布
- [ ] Faculty 能发布 Quiz
- [ ] 发布后状态改变
- [ ] Faculty 能取消发布
- [ ] Student 看不到未发布 Quiz

### ✏️ 答题功能 (5 分钟)

- [ ] Student 能查看已发布 Quiz
- [ ] 能选择 MCQ 选项
- [ ] 能选择 T/F 选项
- [ ] 能填写 Fill-blank 答案
- [ ] 能提交答案
- [ ] 提交后显示成绩
- [ ] Student 可以再次答题 (如配置允许)

### 📊 自动评分 (3 分钟)

- [ ] MCQ 正确答案得分
- [ ] MCQ 错误答案得 0 分
- [ ] T/F 正确答案得分
- [ ] T/F 错误答案得 0 分
- [ ] Fill-blank 正确答案得分
- [ ] Fill-blank 大小写不敏感
- [ ] 总分计算正确

### 👀 成绩查看 (2 分钟)

- [ ] Student 能查看自己的成绩
- [ ] Student 能看到每题的答案反馈
- [ ] Student 看不到其他学生的成绩
- [ ] Faculty 能看到所有学生的成绩
- [ ] Faculty 能查看具体学生的答案

### 🔁 多次尝试 (3 分钟) - 可选

- [ ] 配置允许多次尝试
- [ ] Student 可以再次答题
- [ ] 尝试次数显示正确
- [ ] 超过限制无法再答
- [ ] 每次尝试有独立成绩

---

## 🐛 常见问题排查

### 问题 1: 页面无法加载

```
症状: Blank page 或显示错误
排查步骤:
1. 打开浏览器开发者工具 (F12)
2. 查看 Console 标签是否有错误
3. 查看 Network 标签检查 API 调用
4. 检查是否需要刷新页面

可能原因:
- 环境变量配置不正确
- 后端服务未运行
- CORS 错误
```

### 问题 2: 无法登录

```
症状: 登录失败或显示错误
排查步骤:
1. 确认用户名和密码正确
2. 清除浏览器 Cookie: Settings > Clear browsing data
3. 尝试隐私模式/无痕窗口
4. 检查开发者工具 Network 标签的登录请求

验证:
- 请求返回 200 状态
- 响应包含用户信息和角色
```

### 问题 3: 创建 Quiz 失败

```
症状: 点击保存后无反应或显示错误
排查步骤:
1. 检查所有必填字段是否填写
2. 确认至少有一道题
3. 查看浏览器控制台的错误信息
4. 查看 Network 标签的 POST 请求

常见原因:
- 标题或描述为空
- 没有添加任何题目
- 题目中的点数设置错误
- 网络连接问题
```

### 问题 4: 答题无法提交

```
症状: 点击 Submit 后无响应
排查步骤:
1. 确认所有题目都已作答
2. 检查浏览器控制台
3. 查看 Network 标签的 POST /attempts
4. 检查后端日志

可能原因:
- 网络超时
- 后端评分出错
- 答案格式不正确
```

### 问题 5: 成绩显示为 0

```
症状: 即使答对了也显示 0 分
排查步骤:
1. 检查题目的正确答案是否设置
2. 对于 Fill-blank，检查答案是否完全匹配
3. 查看浏览器开发者工具的评分逻辑
4. 重新答题观察是否一致

验证步骤:
- MCQ: 选择标记为 "正确" 的选项
- T/F: 选择正确的布尔值
- Fill: 输入设置的答案
```

### 问题 6: 权限错误 (403)

```
症状: "Access Denied" 或 403 错误
排查步骤:
1. 确认当前登录的用户角色
2. 确认是否具有执行该操作的权限
3. 清除 Session 重新登录
4. 尝试不同的用户账户

预期行为:
- Faculty 可以创建/编辑/删除 Quiz
- Student 只能查看和答题
- 权限错误应显示清晰消息
```

---

## 🧪 API 测试 (使用 Postman 或 curl)

### 测试环境设置

```bash
# 获取后端 URL
BACKEND_URL="https://kambaz-node-server-app-js8h.onrender.com"

# 登录获取 Session
curl -X POST "$BACKEND_URL/api/users/signin" \
  -H "Content-Type: application/json" \
  -d '{"username":"faculty","password":"faculty123"}' \
  -c /tmp/cookies.txt

# 查看 cookies
cat /tmp/cookies.txt
```

### 关键 API 测试

```bash
# 1. 创建 Quiz
curl -X POST "$BACKEND_URL/api/courses/CS5610/quizzes" \
  -H "Content-Type: application/json" \
  -b /tmp/cookies.txt \
  -d '{
    "title": "Test",
    "questions": [{
      "type": "mcq",
      "title": "Q1",
      "points": 100,
      "choices": [
        {"text": "A", "isCorrect": true},
        {"text": "B", "isCorrect": false}
      ]
    }]
  }'

# 2. 发布 Quiz
curl -X POST "$BACKEND_URL/api/quizzes/{quiz_id}/publish" \
  -b /tmp/cookies.txt

# 3. 提交答案
curl -X POST "$BACKEND_URL/api/quizzes/{quiz_id}/attempts" \
  -H "Content-Type: application/json" \
  -b /tmp/cookies.txt \
  -d '{
    "answers": [{
      "questionId": "{question_id}",
      "answer": "{choice_id}"
    }]
  }'
```

---

## 📸 截图建议

建议记录以下截图：

1. **登录页面** - 验证认证系统
2. **Quiz 列表** (Faculty 视角) - 显示所有 Quiz
3. **Quiz 列表** (Student 视角) - 仅显示发布的
4. **创建 Quiz** - 编辑页面
5. **答题页面** - 显示所有题型
6. **成绩页面** - 显示分数和反馈
7. **成绩列表** (Faculty) - 显示所有学生

---

## ✅ 最终验收标准

### 必须通过 (Critical)

- [x] Faculty 可以创建 Quiz
- [x] Faculty 可以发布 Quiz
- [x] Student 只能看到已发布的 Quiz
- [x] Student 可以答题
- [x] 自动评分正确
- [x] 权限控制有效 (403)

### 应该实现 (Important)

- [ ] 多次尝试管理
- [ ] 尝试限制强制
- [ ] Faculty 可以查看所有成绩
- [ ] 响应式设计
- [ ] 加载状态指示

### 可选优化 (Nice-to-have)

- [ ] 草稿自动保存
- [ ] 成绩导出
- [ ] 详细分析
- [ ] 实时通知

---

## 🎓 测试完成后

1. **记录问题**

   - 使用 GitHub Issues 或记录文档
   - 包含重现步骤和预期结果

2. **提交报告**

   - 汇总所有测试结果
   - 标注严重级别
   - 提供改进建议

3. **反馈给开发者**
   - 优先级排序
   - 提供详细信息
   - 截图或录屏辅助

---

**祝你测试愉快！🎉**

有问题欢迎随时反馈。
