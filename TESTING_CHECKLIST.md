# 📋 完整功能测试清单 (Assessment Rubric)

**项目**: Kambaz Learning Management System  
**环境**: Vercel (Frontend) + Render (Backend) + MongoDB Atlas (Database)  
**测试时间**: 2025-12-05  
**URL**: https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app/

---

## 🔍 测试说明

本清单对应课程的 Rubric 要求，共计 51 项功能（占分 159 分）。
每个功能都需要按以下步骤验证：

1. **UI 验证** - 界面是否显示正确
2. **功能验证** - 操作是否工作
3. **数据库验证** - 刷新/重新登录后是否持久化

---

## 👤 Users 模块 (13 items × 3 pts = 39 pts)

### ✅ Users - Signin (3 pts)

- [ ] 访问 Signin 页面
- [ ] 使用有效凭证登录 (如: admin/admin)
- [ ] 成功登录后重定向到 Dashboard
- [ ] 可以访问受保护的页面

**数据库验证**: 用户应该从 MongoDB 中读取
**预期结果**: ✅ 200 OK - 成功登录

---

### ✅ Users - Signup (3 pts)

- [ ] 访问 Signup 页面
- [ ] 填写新用户信息 (First Name, Last Name, Email, Password, Role)
- [ ] 点击 Signup 创建新用户
- [ ] 新用户可以立即登录
- [ ] 验证新用户在数据库中 (刷新浏览器后仍然存在)

**数据库验证**: MongoDB 中应该有新用户记录
**预期结果**: ✅ 新用户可用

---

### ✅ Users - Update (3 pts)

- [ ] 以任何用户身份登录
- [ ] 访问 Account/Profile 页面
- [ ] 修改用户信息 (例如: First Name, Last Name)
- [ ] 点击 Save 或 Submit
- [ ] 修改立即在 UI 中显示
- [ ] 注销然后重新登录
- [ ] 验证修改已持久化到数据库

**数据库验证**: 修改应该在数据库中存在
**预期结果**: ✅ 数据一致，刷新后仍然保留

---

### ✅ Users - Reloading browser maintains login (3 pts)

- [ ] 以任何用户身份登录
- [ ] 刷新浏览器 (F5 或 Cmd+R)
- [ ] 验证仍然保持登录状态
- [ ] 不需要重新输入凭证

**技术细节**: 应该使用 Session/Token 存储在服务器
**预期结果**: ✅ 保持登录状态

---

### ✅ Users - Clicking Users navigates to new Users screen (3 pts)

- [ ] 从导航菜单/导航栏点击 "Users"
- [ ] 成功导航到 Users 页面 (/Kambaz/Users)
- [ ] 页面显示所有用户列表

**界面要求**: Users 页面应该存在并可访问
**预期结果**: ✅ 导航成功

---

### ✅ Users - Users screen displays all users in database (3 pts)

- [ ] 访问 Users 页面
- [ ] 验证所有用户都显示在表格中
- [ ] 用户信息包括: 用户名、邮箱、角色等
- [ ] 用户数应该与数据库中的一致

**数据库验证**: 应该从 MongoDB 中读取所有用户
**预期结果**: ✅ 显示所有用户

---

### ✅ Users - Can filter users by role (3 pts)

- [ ] 在 Users 页面上找到 "Role" 过滤选项
- [ ] 选择特定角色 (如: FACULTY, STUDENT, ADMIN)
- [ ] 表格应该只显示该角色的用户
- [ ] 切换不同角色时过滤应该正确工作

**功能要求**: 前端应该有过滤下拉框
**预期结果**: ✅ 过滤功能正常

---

### ✅ Users - Can filter users by name (3 pts)

- [ ] 在 Users 页面上找到 "Name" 搜索输入框
- [ ] 输入用户名或全名
- [ ] 表格应该只显示匹配的用户
- [ ] 清除搜索框显示所有用户

**功能要求**: 前端应该有名称搜索框
**预期结果**: ✅ 搜索功能正常

---

### ✅ Users - Clicking user's name displays selected user in PeopleDetails (3 pts)

- [ ] 在 Users 页面点击任何用户的名称
- [ ] 右侧面板 (PeopleDetails) 显示该用户的详细信息
- [ ] 显示用户的所有属性 (ID, Name, Email, Role 等)

**界面要求**: 应该有 PeopleDetails 侧面板
**预期结果**: ✅ 显示用户详情

---

### ✅ Users - Clicking Delete removes user from UI immediately (3 pts)

- [ ] 选择一个用户并点击 "Delete" 按钮
- [ ] 验证该用户立即从表格中消失
- [ ] UI 应该快速响应

**功能要求**: 应该有 Delete 按钮，且立即更新 UI
**预期结果**: ✅ 用户立即从列表中删除

---

### ✅ Users - Clicking Delete removes user from Database (reload to confirm) (3 pts)

- [ ] 删除一个用户 (如上一项)
- [ ] 刷新浏览器
- [ ] 验证该用户仍然不在列表中
- [ ] 检查后端数据库确认删除

**数据库验证**: 用户应该从 MongoDB 中删除
**预期结果**: ✅ 用户从数据库中永久删除

---

### ✅ Users - Editing user's name updates in UI immediately (3 pts)

- [ ] 选择一个用户
- [ ] 点击 "Edit" 或直接在 PeopleDetails 中修改
- [ ] 修改用户的 First Name 或 Last Name
- [ ] 点击 "Save" 或 "Update"
- [ ] 验证修改立即在 UI 中显示 (无需刷新)

**功能要求**: 应该支持在线编辑
**预期结果**: ✅ 修改立即显示

---

### ✅ Users - Editing user's name updates in Database (reload to confirm) (3 pts)

- [ ] 执行上一项的编辑操作
- [ ] 刷新浏览器
- [ ] 验证修改仍然存在
- [ ] 检查后端数据库确认更新

**数据库验证**: 修改应该持久化到 MongoDB
**预期结果**: ✅ 修改在数据库中持久化

---

### ✅ Users - Clicking +People adds a new user (reload to confirm) (3 pts)

- [ ] 在 Users 页面点击 "+People" 或 "Add User" 按钮
- [ ] 显示新建用户表单
- [ ] 填写用户信息并提交
- [ ] 新用户立即在列表中显示
- [ ] 刷新浏览器
- [ ] 验证新用户仍然存在

**数据库验证**: 新用户应该在数据库中
**预期结果**: ✅ 新用户创建成功

---

### ✅ Users - Can edit new user (reload to confirm) (3 pts)

- [ ] 创建新用户 (如上一项)
- [ ] 立即编辑该新用户
- [ ] 修改用户信息并保存
- [ ] 刷新浏览器
- [ ] 验证新用户及其修改都存在

**数据库验证**: 修改应该持久化
**预期结果**: ✅ 新用户和修改都被保存

---

## 📚 Courses 模块 (6 items × 3 pts = 18 pts)

### ✅ Courses - Confirm you can retrieve all courses, clicking on Enroll button (3 pts)

- [ ] 导航到 Courses 页面或 Dashboard 中查看所有课程
- [ ] 应该显示所有可用课程列表
- [ ] 每个课程都显示 "Enroll" 或 "Unenroll" 按钮

**数据库验证**: 课程应该从 MongoDB 中读取
**预期结果**: ✅ 显示所有课程

---

### ✅ Courses - Confirm you can insert new courses, UI updates immediately (3 pts)

- [ ] 以 Faculty 用户身份登录
- [ ] 导航到课程管理页面或找到 "Add Course" 按钮
- [ ] 创建新课程 (输入课程名、代码、描述等)
- [ ] 提交表单
- [ ] 验证新课程立即在 UI 中显示

**权限要求**: 仅 Faculty 可以创建课程
**预期结果**: ✅ 新课程立即显示

---

### ✅ Courses - Confirm you can insert new courses into database, reload to confirm new course (3 pts)

- [ ] 创建新课程 (如上一项)
- [ ] 刷新浏览器
- [ ] 验证新课程仍然存在于列表中

**数据库验证**: 课程应该在 MongoDB 中
**预期结果**: ✅ 新课程持久化

---

### ✅ Courses - Confirm you can remove a new course, UI updates immediately (3 pts)

- [ ] 找到任何课程的 "Delete" 按钮
- [ ] 点击删除课程
- [ ] 验证课程立即从列表中消失

**功能要求**: 应该有删除课程的选项
**预期结果**: ✅ 课程立即删除

---

### ✅ Courses - Confirm you can remove a new course from database. Reload to confirm (3 pts)

- [ ] 删除课程 (如上一项)
- [ ] 刷新浏览器
- [ ] 验证课程仍然不存在

**数据库验证**: 课程应该从 MongoDB 中删除
**预期结果**: ✅ 课程从数据库中删除

---

### ✅ Courses - Confirm you can update a course. UI updates immediately (3 pts)

- [ ] 找到一个课程并点击 "Edit"
- [ ] 修改课程信息 (名称、描述等)
- [ ] 保存修改
- [ ] 验证修改立即在 UI 中显示

**功能要求**: 应该支持课程编辑
**预期结果**: ✅ 修改立即显示

---

### ✅ Courses - Confirm you can update a course in database. Reload to confirm (3 pts)

- [ ] 编辑课程信息 (如上一项)
- [ ] 刷新浏览器
- [ ] 验证修改仍然存在

**数据库验证**: 修改应该持久化到 MongoDB
**预期结果**: ✅ 修改持久化

---

## 📑 Modules 模块 (8 items × 3 pts = 24 pts)

### ✅ Modules - Navigate to course and create new Module. UI updates immediately (3 pts)

- [ ] 进入一个课程的课程页面
- [ ] 找到 "Add Module" 或 "+" 按钮
- [ ] 创建新模块 (输入模块名称)
- [ ] 验证新模块立即在模块列表中显示

**功能要求**: 每个课程应该有模块管理
**预期结果**: ✅ 新模块立即显示

---

### ✅ Modules - Confirm new modules is in database by reload browser (3 pts)

- [ ] 创建新模块 (如上一项)
- [ ] 刷新浏览器
- [ ] 验证模块仍然存在

**数据库验证**: 模块应该在 MongoDB 中
**预期结果**: ✅ 模块持久化

---

### ✅ Modules - Create different modules for different courses (3 pts)

- [ ] 在课程 A 中创建模块
- [ ] 导航到课程 B
- [ ] 在课程 B 中创建不同的模块
- [ ] 验证每个课程有独立的模块列表

**功能要求**: 模块应该关联到特定课程
**预期结果**: ✅ 模块隔离正确

---

### ✅ Modules - Navigate to different courses and confirm different modules for course (3 pts)

- [ ] 在课程 A 和课程 B 之间切换
- [ ] 每个课程都显示对应的模块列表
- [ ] 验证模块不会混淆

**功能要求**: 导航应该显示课程特定的模块
**预期结果**: ✅ 导航和数据隔离正确

---

### ✅ Modules - Delete module and UI updates immediately (3 pts)

- [ ] 在模块列表中找到 "Delete" 按钮
- [ ] 点击删除一个模块
- [ ] 验证模块立即从列表中消失

**功能要求**: 应该有删除模块的选项
**预期结果**: ✅ 模块立即删除

---

### ✅ Modules - Confirm deleted from database by refreshing browser (3 pts)

- [ ] 删除模块 (如上一项)
- [ ] 刷新浏览器
- [ ] 验证模块仍然不存在

**数据库验证**: 模块应该从 MongoDB 中删除
**预期结果**: ✅ 模块从数据库中删除

---

### ✅ Modules - Update module name and UI updates immediately (3 pts)

- [ ] 找到一个模块并点击 "Edit"
- [ ] 修改模块名称
- [ ] 保存修改
- [ ] 验证修改立即在 UI 中显示

**功能要求**: 应该支持模块编辑
**预期结果**: ✅ 修改立即显示

---

### ✅ Modules - Confirm update in database by refreshing browser (3 pts)

- [ ] 编辑模块 (如上一项)
- [ ] 刷新浏览器
- [ ] 验证修改仍然存在

**数据库验证**: 修改应该持久化到 MongoDB
**预期结果**: ✅ 修改持久化

---

## 📝 Enrollments 模块 (10 items × 3 pts = 30 pts)

### ✅ Enrollments - Confirm clicking All Courses button at top right shows all courses (3 pts)

- [ ] 点击 "All Courses" 按钮
- [ ] 显示所有可用课程列表
- [ ] 包括已注册和未注册的课程

**功能要求**: 应该有 "All Courses" 视图
**预期结果**: ✅ 显示所有课程

---

### ✅ Enrollments - Courses not enrolled show Enroll button (3 pts)

- [ ] 在 "All Courses" 视图中
- [ ] 查看未注册的课程
- [ ] 验证这些课程显示 "Enroll" 按钮

**功能要求**: 未注册课程应该有注册按钮
**预期结果**: ✅ 显示 Enroll 按钮

---

### ✅ Enrollments - Clicking Enroll toggles to Unenroll (3 pts)

- [ ] 点击未注册课程的 "Enroll" 按钮
- [ ] 按钮应该立即变为 "Unenroll"
- [ ] 验证注册成功

**功能要求**: 按钮应该动态切换
**预期结果**: ✅ 按钮状态切换

---

### ✅ Enrollments - Clicking My Courses button only shows enrolled courses (3 pts)

- [ ] 点击 "My Courses" 按钮
- [ ] 应该只显示已注册的课程
- [ ] 已注册课程列表应该更新

**功能要求**: 应该有 "My Courses" 过滤视图
**预期结果**: ✅ 只显示已注册的课程

---

### ✅ Enrollments - Clicking My Courses courses don't show Enroll/Unenroll button (3 pts)

- [ ] 在 "My Courses" 视图中
- [ ] 验证课程列表中没有 "Enroll" 或 "Unenroll" 按钮
- [ ] 或者显示不同的操作按钮

**功能要求**: My Courses 中不应该显示注册按钮
**预期结果**: ✅ 隐藏注册按钮

---

### ✅ Enrollments - Click All Coures, Courses already enrolled in show Unenroll button (3 pts)

- [ ] 点击 "All Courses" 返回
- [ ] 查看已注册的课程
- [ ] 验证已注册课程显示 "Unenroll" 按钮

**功能要求**: 已注册课程应该显示取消注册按钮
**预期结果**: ✅ 显示 Unenroll 按钮

---

### ✅ Enrollments - Clicking Unenroll toggles to Enroll (3 pts)

- [ ] 点击已注册课程的 "Unenroll" 按钮
- [ ] 按钮应该立即变为 "Enroll"
- [ ] 验证取消注册成功

**功能要求**: 按钮应该动态切换
**预期结果**: ✅ 按钮状态切换

---

### ✅ Enrollments - Confirm Enroll/Unenroll actually work (3 pts)

- [ ] 执行注册和取消注册操作
- [ ] 检查课程列表是否正确更新
- [ ] 验证注册状态改变

**功能要求**: 注册状态应该改变
**预期结果**: ✅ 操作生效

---

### ✅ Enrollments - Refresh to confirm (3 pts)

- [ ] 注册/取消注册课程 (如前面项目)
- [ ] 刷新浏览器
- [ ] 验证注册状态仍然保持

**数据库验证**: 注册状态应该在 MongoDB 中
**预期结果**: ✅ 状态持久化

---

### ✅ Enrollments - Logout/login to confirm (3 pts)

- [ ] 注册/取消注册课程
- [ ] 注销账户
- [ ] 重新登录
- [ ] 验证注册状态仍然保持

**功能要求**: 注册信息应该关联到用户账户
**预期结果**: ✅ 状态在登录间保持

---

### ✅ Enrollments - Login as faculty, create new course, appears immediately in UI (3 pts)

- [ ] 注销学生账户
- [ ] 以教师身份登录
- [ ] 创建新课程
- [ ] 验证新课程立即出现在 UI 中

**权限要求**: 只有教师可以创建课程
**预期结果**: ✅ 新课程立即显示

---

### ✅ Enrollments - Refresh screen, new course should show as enrolled (3 pts)

- [ ] 使用教师账户创建新课程 (如上一项)
- [ ] 刷新浏览器
- [ ] 验证新课程仍然存在

**功能要求**: 新建课程应该对教师自动"注册"
**预期结果**: ✅ 新课程持久化

---

### ✅ Enrollments - Enroll different users into different courses (3 pts)

- [ ] 以学生身份登录
- [ ] 注册到多个不同课程
- [ ] 再次注册以不同课程
- [ ] 验证每个学生可以有多个注册

**功能要求**: 支持多课程注册
**预期结果**: ✅ 多个注册可行

---

### ✅ Enrollments - Navigate to Course/People, table lists all users enrolled in course (3 pts)

- [ ] 进入一个课程
- [ ] 导航到 "People" 或 "Enrollments" 页面
- [ ] 验证显示所有注册该课程的用户列表

**功能要求**: 应该有课程特定的人员列表
**预期结果**: ✅ 显示课程注册用户列表

---

## 📋 Assignments 模块 (4 items × 3 pts = 12 pts)

### ✅ Assignments - Can create new assignments (3 pts)

- [ ] 在课程中找到 "Assignments" 标签或导航
- [ ] 点击 "Add Assignment" 或 "+" 按钮
- [ ] 填写作业信息 (标题、描述、截止日期等)
- [ ] 提交创建
- [ ] 验证新作业立即在列表中显示

**功能要求**: 应该支持作业创建
**预期结果**: ✅ 新作业创建成功

---

### ✅ Assignments - Can edit assignment (3 pts)

- [ ] 选择一个作业并点击 "Edit"
- [ ] 修改作业信息
- [ ] 保存修改
- [ ] 验证修改立即在 UI 中显示

**功能要求**: 应该支持作业编辑
**预期结果**: ✅ 修改立即显示

---

### ✅ Assignments - Can delete assignment (3 pts)

- [ ] 选择一个作业并点击 "Delete"
- [ ] 确认删除
- [ ] 验证作业立即从列表中消失

**功能要求**: 应该支持作业删除
**预期结果**: ✅ 作业立即删除

---

### ✅ Assignments - Can list assignments per course (3 pts)

- [ ] 在不同课程之间切换
- [ ] 每个课程应该显示其特定的作业列表
- [ ] 验证作业正确关联到课程

**功能要求**: 作业应该按课程分组
**预期结果**: ✅ 作业按课程列表显示

---

## 🚀 Deployment (15 pts)

### ✅ Works deployed on Vercel integrated with Render and Mongo Atlas (15 pts)

#### Frontend - Vercel ✅

- [ ] 访问生产 URL: https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app/
- [ ] 页面加载无错误
- [ ] 所有页面可访问
- [ ] 响应时间 < 2 秒

#### Backend - Render ✅

- [ ] 后端 API 服务运行正常
- [ ] 所有 API 端点响应正确
- [ ] 日志显示正常的请求处理

#### Database - MongoDB Atlas ✅

- [ ] 数据持久化工作正常
- [ ] 可以读写数据
- [ ] 数据在刷新后保持
- [ ] 可以跨多个用户会话访问

#### Integration ✅

- [ ] 前端可以成功调用后端 API
- [ ] 后端可以连接 MongoDB 并操作数据
- [ ] 认证和授权正常工作
- [ ] 整个系统流程完整

**预期结果**: ✅ 完整的三层部署和集成工作

---

## 📊 总结评分

### 按类别统计

| 模块             | 项目数 | 每项分值 | 总分    | 完成情况  |
| ---------------- | ------ | -------- | ------- | --------- |
| Users (13)       | 13     | 3        | 39      | ?         |
| Courses (6)      | 6      | 3        | 18      | ?         |
| Modules (8)      | 8      | 3        | 24      | ?         |
| Enrollments (10) | 10     | 3        | 30      | ?         |
| Assignments (4)  | 4      | 3        | 12      | ?         |
| Deployment (1)   | 1      | 15       | 15      | ?         |
| **总计**         | **42** | -        | **159** | **?/159** |

---

## 🎯 测试手册

### 快速测试流程 (5 分钟)

```bash
# 1. 检查登录
# 2. 验证 Users 页面
# 3. 检查 Courses 列表
# 4. 验证 Modules 创建
# 5. 测试 Enrollments
# 6. 检查 Assignments
```

### 完整测试流程 (30 分钟)

1. 清除浏览器缓存和 cookies
2. 访问 https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app/
3. 按照上述检查表逐一测试每个功能
4. 对每个项目记录测试结果
5. 刷新浏览器验证持久化
6. 注销/登录验证会话保持

---

## 📝 注意事项

- 所有测试应该在最新的浏览器中进行 (Chrome, Firefox, Safari)
- 建议使用 DevTools Network 选项卡检查 API 调用
- 记录任何错误消息或异常行为
- 验证后端日志中是否有相关的操作记录

---

**测试完成时间**: ****\_\_\_****  
**测试人员**: ****\_\_\_****  
**总体评分**: ****\_\_\_****/159
