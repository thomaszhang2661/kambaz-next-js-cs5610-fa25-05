# 🚀 快速生产环境测试指南

**目标**: 验证 Kambaz LMS 在生产环境中的所有核心功能  
**URL**: https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app/  
**时间**: 约 10-15 分钟  
**工具**: 浏览器 DevTools (F12)

---

## 🔐 第 1 步: 认证测试 (3 分钟)

### 1.1 测试 Signin

```
✓ 打开 https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app/
✓ 点击 Signin (如果有)
✓ 使用测试凭证登录:
  - Username: admin
  - Password: admin
  (或查看数据库中已有的凭证)
✓ 应该重定向到 Dashboard/Home
✓ 头部应该显示 "Hello, [用户名]"
✓ 打开 DevTools > Network > 检查是否有 API 调用
  预期: POST /api/users/login 返回 200 或 201
```

### 1.2 测试 Signup

```
✓ 点击 Signup
✓ 填写新用户信息:
  - First Name: TestUser
  - Last Name: Test
  - Email: test@example.com
  - Password: test123
  - Role: STUDENT
✓ 点击 Signup
✓ 应该重定向到 Signin
✓ 使用新凭证再次登录
✓ 成功登录表示 Signup 工作正常
```

### 1.3 测试 Session 持久化

```
✓ 保持登录状态
✓ 按 F5 或 Cmd+R 刷新页面
✓ 应该仍然保持登录状态
✓ 不需要重新输入凭证
```

### ✅ 检查点

- [ ] Signin 工作 (Network: 200 OK)
- [ ] Signup 工作 (新用户可以登录)
- [ ] 刷新后保持登录

---

## 👥 第 2 步: Users 模块测试 (2 分钟)

### 2.1 导航到 Users

```
✓ 从导航菜单点击 "Users"
✓ 应该导航到 /Kambaz/Users
✓ 显示所有用户的表格
✓ 应该包含 "firstName", "lastName", "email", "role" 列
```

### 2.2 测试 Users 过滤

```
✓ 找到 "Filter by Role" 下拉框
✓ 选择 "FACULTY"
✓ 表格应该只显示 FACULTY 角色的用户
✓ 选择 "STUDENT"
✓ 表格应该只显示 STUDENT 角色的用户
```

### 2.3 测试 Users 搜索

```
✓ 找到 "Search by Name" 输入框
✓ 输入一个用户名 (如: "John")
✓ 表格应该只显示匹配的用户
✓ 清除搜索框
✓ 应该显示所有用户
```

### 2.4 测试 Users 编辑

```
✓ 在表格中点击任何用户的名称
✓ 右侧面板应该显示 "PeopleDetails" 信息
✓ 找到编辑按钮 (铅笔图标)
✓ 修改 First Name 为 "UpdatedName"
✓ 点击 Save
✓ UI 应该立即更新
✓ 刷新浏览器验证修改持久化
```

### 2.5 测试 Users 删除

```
✓ 选择一个不重要的用户
✓ 点击 Delete 按钮 (垃圾桶图标)
✓ 用户应该立即从列表中消失
✓ 刷新浏览器
✓ 用户应该仍然被删除 (证明删除持久化)
```

### 2.6 测试 Users 新增

```
✓ 点击 "+People" 或 "Add User" 按钮
✓ 显示新建用户表单
✓ 填写用户信息并提交
✓ 新用户应该立即在列表中显示
✓ 刷新浏览器验证新用户持久化
```

### ✅ 检查点

- [ ] Users 页面加载正常
- [ ] 过滤和搜索工作
- [ ] 编辑、删除、新增都工作
- [ ] 刷新后修改持久化
- [ ] Network: 所有 API 调用返回 200/201

---

## 📚 第 3 步: Courses 模块测试 (2 分钟)

### 3.1 导航到 Courses

```
✓ 从导航菜单点击 "Courses" 或 "All Courses"
✓ 显示所有可用课程列表
✓ 每个课程应该显示 "Enroll" 或 "Unenroll" 按钮
✓ 应该看到课程名称、描述、开始/结束日期
```

### 3.2 测试 Courses 创建 (仅 Faculty)

```
✓ 以 Faculty 用户身份登录
✓ 找到 "Add Course" 或 "+" 按钮
✓ 填写课程信息:
  - Course Number: CS5611
  - Course Name: Advanced Web Development
  - Start Date: [选择日期]
  - End Date: [选择日期]
✓ 点击 Create/Save
✓ 新课程应该立即在列表中显示
```

### 3.3 测试 Courses 编辑

```
✓ 找到一个课程
✓ 点击 Edit 按钮
✓ 修改课程名称或描述
✓ 点击 Save
✓ 修改应该立即显示
✓ 刷新浏览器验证持久化
```

### 3.4 测试 Courses 删除

```
✓ 选择一个课程
✓ 点击 Delete
✓ 课程应该立即消失
✓ 刷新浏览器验证删除持久化
```

### ✅ 检查点

- [ ] Courses 页面加载正常
- [ ] 创建、编辑、删除都工作
- [ ] 刷新后修改持久化
- [ ] Faculty 和 Student 看到不同的操作

---

## 📑 第 4 步: Modules 模块测试 (2 分钟)

### 4.1 导航到 Modules

```
✓ 在 Courses 列表中点击一个课程
✓ 进入课程详情页面
✓ 应该看到 "Modules" 或 "Module List" 选项
✓ 点击进入 Modules 页面
✓ 应该显示该课程的所有模块列表
```

### 4.2 测试 Modules 创建

```
✓ 找到 "Add Module" 或 "+" 按钮
✓ 输入模块名称 (如: "Week 1 - Introduction")
✓ 点击 Create
✓ 新模块应该立即在列表中显示
✓ 刷新浏览器验证持久化
```

### 4.3 测试 Modules 编辑

```
✓ 点击一个模块的 Edit 按钮
✓ 修改模块名称
✓ 点击 Save
✓ 修改应该立即显示
✓ 刷新浏览器验证持久化
```

### 4.4 测试 Modules 删除

```
✓ 点击一个模块的 Delete 按钮
✓ 模块应该立即消失
✓ 刷新浏览器验证删除持久化
```

### 4.5 测试多课程模块隔离

```
✓ 创建 2 个不同的课程 (如: CS5610, CS5611)
✓ 在 CS5610 中创建模块: "Module A"
✓ 在 CS5611 中创建模块: "Module B"
✓ 在 CS5610 中应该只看到 "Module A"
✓ 切换到 CS5611，应该只看到 "Module B"
✓ 验证模块被正确关联到课程
```

### ✅ 检查点

- [ ] Modules 页面加载正常
- [ ] 创建、编辑、删除都工作
- [ ] 模块正确关联到课程
- [ ] 刷新后修改持久化

---

## 🎯 第 5 步: Enrollments 模块测试 (2 分钟)

### 5.1 测试 All Courses

```
✓ 点击 "All Courses" 按钮
✓ 显示所有可用课程
✓ 包括已注册和未注册的课程
✓ 每个课程显示 "Enroll" 或 "Unenroll" 按钮
```

### 5.2 测试 Enroll

```
✓ 在 "All Courses" 视图中找到未注册的课程
✓ 点击 "Enroll" 按钮
✓ 按钮应该立即变为 "Unenroll"
✓ 课程应该被添加到"已注册"列表
```

### 5.3 测试 My Courses

```
✓ 点击 "My Courses" 按钮
✓ 应该只显示已注册的课程
✓ 不应该显示 "Enroll" 或 "Unenroll" 按钮
✓ 或者显示不同的操作选项
```

### 5.4 测试 Unenroll

```
✓ 在 "All Courses" 视图中找到已注册的课程
✓ 点击 "Unenroll" 按钮
✓ 按钮应该立即变为 "Enroll"
✓ 课程应该从"已注册"列表中移除
```

### 5.5 验证持久化

```
✓ 执行 Enroll/Unenroll 操作
✓ 刷新浏览器
✓ 注册状态应该保持
✓ 注销然后重新登录
✓ 注册状态应该仍然保持
```

### ✅ 检查点

- [ ] All Courses 和 My Courses 视图正常
- [ ] Enroll/Unenroll 按钮动态切换
- [ ] 注册状态在刷新/登出登入后保持

---

## 📝 第 6 步: Assignments 模块测试 (2 分钟)

### 6.1 导航到 Assignments

```
✓ 进入一个课程
✓ 找到 "Assignments" 导航选项
✓ 点击进入 Assignments 页面
✓ 显示该课程的所有作业列表
```

### 6.2 测试 Assignment 创建

```
✓ 找到 "Add Assignment" 或 "+" 按钮
✓ 填写作业信息:
  - Title: "Assignment 1"
  - Description: "First assignment"
  - Due Date: [选择日期]
  - Points: 100
✓ 点击 Create
✓ 新作业应该立即在列表中显示
```

### 6.3 测试 Assignment 编辑

```
✓ 点击一个作业的 Edit 按钮
✓ 修改作业信息
✓ 点击 Save
✓ 修改应该立即显示
✓ 刷新浏览器验证持久化
```

### 6.4 测试 Assignment 删除

```
✓ 点击一个作业的 Delete 按钮
✓ 作业应该立即消失
✓ 刷新浏览器验证删除持久化
```

### 6.5 测试多课程作业隔离

```
✓ 创建 2 个课程，在每个课程中创建作业
✓ 在课程 A 中应该只看到课程 A 的作业
✓ 在课程 B 中应该只看到课程 B 的作业
✓ 验证作业被正确关联到课程
```

### ✅ 检查点

- [ ] Assignments 页面加载正常
- [ ] 创建、编辑、删除都工作
- [ ] 作业正确关联到课程
- [ ] 刷新后修改持久化

---

## 🌐 第 7 步: 部署和集成验证 (2 分钟)

### 7.1 验证 Vercel Frontend

```
✓ 打开生产 URL
✓ 页面加载无错误
✓ 打开 DevTools > Console
✓ 不应该有红色错误信息
✓ Network 标签显示正常的请求
```

### 7.2 验证 Render Backend

```
✓ 打开 DevTools > Network
✓ 刷新页面
✓ 应该看到 API 请求到 Render
✓ 例如: POST https://api.render.com/.../api/users/login
✓ 响应状态应该是 200/201
```

### 7.3 验证 MongoDB 集成

```
✓ 执行任何数据修改操作 (创建、编辑、删除)
✓ 刷新浏览器
✓ 数据应该仍然存在
✓ 这表示数据已持久化到 MongoDB
```

### ✅ 检查点

- [ ] Frontend 加载无错误
- [ ] Backend API 正常响应
- [ ] 数据在 MongoDB 中持久化
- [ ] 三层集成工作正常

---

## 📊 最终评分表

```
总项数: 42 个功能项
每项分值: 3 分
部署: 15 分
总分: 159 分

⚠️ 填写完成情况 (✓ 或 ✗):

Users (13 × 3 = 39 分):
  [ ] Signin (3)
  [ ] Signup (3)
  [ ] Update (3)
  [ ] Browser reload maintains login (3)
  [ ] Navigate to Users screen (3)
  [ ] Display all users (3)
  [ ] Filter by role (3)
  [ ] Filter by name (3)
  [ ] View user details (3)
  [ ] Delete user from UI (3)
  [ ] Delete user from database (3)
  [ ] Edit user in UI (3)
  [ ] Edit user in database (3)
小计: __/39

Courses (6 × 3 = 18 分):
  [ ] Retrieve all courses (3)
  [ ] Insert courses, UI updates (3)
  [ ] Insert courses into database (3)
  [ ] Remove course, UI updates (3)
  [ ] Remove course from database (3)
  [ ] Update course, UI updates (3)
小计: __/18

Modules (8 × 3 = 24 分):
  [ ] Create module, UI updates (3)
  [ ] Module in database (3)
  [ ] Different modules per course (3)
  [ ] Navigate and confirm isolation (3)
  [ ] Delete module, UI updates (3)
  [ ] Delete from database (3)
  [ ] Edit module (3)
  [ ] Edit module in database (3)
小计: __/24

Enrollments (10 × 3 = 30 分):
  [ ] All Courses button (3)
  [ ] Unenrolled courses show Enroll (3)
  [ ] Enroll toggles to Unenroll (3)
  [ ] My Courses shows enrolled (3)
  [ ] My Courses hides enroll button (3)
  [ ] All Courses shows Unenroll (3)
  [ ] Unenroll toggles to Enroll (3)
  [ ] Enroll/Unenroll work (3)
  [ ] Refresh maintains state (3)
  [ ] Logout/login maintains state (3)
  [ ] Faculty create course (3)
  [ ] Refresh shows new course (3)
  [ ] Multiple enrollments (3)
  [ ] People per course (3)
小计: __/30

Assignments (4 × 3 = 12 分):
  [ ] Create assignments (3)
  [ ] Edit assignment (3)
  [ ] Delete assignment (3)
  [ ] List per course (3)
小计: __/12

Deployment (1 × 15 = 15 分):
  [ ] Vercel + Render + MongoDB (15)
小计: __/15

═══════════════════════════
总计: __/159 分
═══════════════════════════
```

---

## 🐛 调试技巧

如果功能不工作，请检查:

### 1. Frontend 调试

```bash
# 打开 DevTools (F12)
# Console 标签: 查看 JavaScript 错误
# Network 标签: 查看 API 调用是否成功
# Application 标签: 查看 Session/Cookies 存储
```

### 2. Backend 调试

```bash
# 访问 Render 仪表板
# 查看 Backend 应用的日志
# 确认没有 500 错误
# 验证 MongoDB 连接正常
```

### 3. 数据库 调试

```bash
# 访问 MongoDB Atlas
# 查看 collections
# 确认数据被正确写入
# 检查 indexes 是否创建
```

### 常见问题

| 问题         | 原因              | 解决方案                  |
| ------------ | ----------------- | ------------------------- |
| 页面不加载   | Frontend 部署失败 | 检查 Vercel 日志          |
| API 返回 500 | Backend 错误      | 检查 Render 日志          |
| 数据不持久化 | MongoDB 连接失败  | 检查连接字符串            |
| 认证失败     | Session 配置问题  | 检查 Backend Session 设置 |

---

**测试完成**: ****\_\_\_****  
**总体评分**: ****\_\_\_****/159
