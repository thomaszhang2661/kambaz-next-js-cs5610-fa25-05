# Assignment 4 评分问题诊断清单

## 当前得分分析

- Dashboard CRUD: 12/18 (66%) - 较好
- Courses Display: 2/6 (33%) - 需要改进
- Modules CRUD: 8/24 (33%) - 需要改进
- Assignments CRUD: 6/18 (33%) - 需要改进

## 已修复的问题 ✅

1. **Courses Layout Redux 集成**

   - 文件: `app/(Kambaz)/Courses/[cid]/layout.tsx`
   - 修改: 从直接读取 Database 改为使用 Redux useSelector
   - 状态: ✅ 已修复

2. **Dashboard Edit 按钮变量名冲突**
   - 文件: `app/(Kambaz)/Dashboard/page.tsx`
   - 修改: map 中的变量名从 `course` 改为 `courseItem`
   - 状态: ✅ 已修复

## 需要检查的潜在问题 ⚠️

### Dashboard (4/6 分 - 缺少 2 分)

可能原因:

- [ ] 新创建的课程图片路径不正确 (`/images/reactjs.jpg` 404)
- [ ] 表单字段可能缺少某些必需属性
- [ ] Update 按钮逻辑可能有问题

建议测试:

1. 创建新课程 → 检查是否立即出现
2. 点击 Edit → 检查表单是否填充正确
3. 修改后 Update → 检查是否立即更新
4. 点击 Go → 检查是否能正确导航

### Courses Display (2/6 分 - 缺少 4 分)

可能原因:

- [ ] 课程标题可能没有正确显示
- [ ] 面包屑导航可能有问题
- [ ] 课程导航栏可能缺失某些元素

需要检查的文件:

- `app/(Kambaz)/Courses/[cid]/layout.tsx` ✅ 已修复 Redux
- `app/(Kambaz)/Courses/[cid]/Breadcrumb.tsx`
- `app/(Kambaz)/Courses/[cid]/Navigation.tsx`

### Modules (2/6 每项 - 共缺少 16 分)

可能原因:

- [ ] Module Editor 弹窗可能没有实现
- [ ] 创建模块时可能缺少某些字段
- [ ] 编辑功能使用的是 prompt 而不是 dialog

当前实现:

- ✅ Redux 集成正确
- ✅ 创建/删除/更新功能存在
- ⚠️ 使用的是简单的 prompt，不是 Modal dialog

建议改进:
创建 ModuleEditor.tsx 组件使用 Bootstrap Modal

### Assignments (2/6 每项 - 共缺少 12 分)

可能原因:

- [ ] AssignmentEditor 页面可能不完整
- [ ] 创建时缺少必需字段 (points, dueDate 等)
- [ ] 编辑功能使用的是 prompt 而不是专门的编辑页面

当前实现:

- ✅ Redux 集成正确
- ✅ 基本 CRUD 功能存在
- ⚠️ 使用 prompt 而不是完整的编辑器页面

建议改进:

1. 点击 "+ Assignment" → 应该导航到 AssignmentEditor
2. AssignmentEditor 应该有完整表单 (name, description, points, dates)
3. 点击作业名称 → 应该导航到编辑页面

## 关键的 HTML ID 检查清单

### Dashboard 必需的 ID:

- [x] `#wd-dashboard`
- [x] `#wd-dashboard-title`
- [x] `#wd-dashboard-published`
- [x] `#wd-add-new-course-click`
- [x] `#wd-update-course-click`
- [x] `#wd-dashboard-courses`
- [x] `.wd-dashboard-course` (每个课程卡片)
- [x] `.wd-dashboard-course-link`
- [x] `.wd-dashboard-course-title`
- [x] `#wd-edit-course-click`
- [x] `#wd-delete-course-click`

### Modules 必需的 ID:

- [x] `#wd-modules`
- [x] `#wd-add-module-btn`
- [x] `.wd-module` (每个模块)
- [x] `.wd-title` (模块标题)

### Assignments 必需的 ID:

- [x] `#wd-add-assignment-btn`
- [ ] 可能缺少作业列表项的特定 ID

## 推荐的修复优先级

### 高优先级 🔴

1. **实现完整的 AssignmentEditor 页面**

   - 包含所有字段 (title, description, points, dates)
   - Save 按钮分发 addNewAssignment 或 updateAssignment
   - Cancel 按钮返回列表

2. **创建 ModuleEditor Modal 对话框**
   - 使用 Bootstrap Modal
   - 输入模块名称
   - Add Module 和 Cancel 按钮

### 中优先级 🟡

3. **修复课程图片路径**

   - 确保 `/images/reactjs.jpg` 存在
   - 或使用默认的 webp 图片

4. **检查 Breadcrumb 组件**
   - 确保正确显示课程路径

### 低优先级 🟢

5. **添加更详细的错误处理**
6. **改进用户反馈（加载状态等）**

## 测试步骤

### Dashboard 测试:

```
1. npm run dev
2. 访问 http://localhost:3000/Dashboard
3. 填写表单创建新课程
4. 点击Add - 课程应立即出现
5. 点击Edit - 表单应填充课程信息
6. 修改并Update - 课程应立即更新
7. 点击Delete - 课程应立即消失
8. 点击Go - 应导航到课程页面
```

### Modules 测试:

```
1. 进入任意课程
2. 点击Modules导航
3. 点击 +Module 按钮
4. 输入模块名称
5. 新模块应立即出现
6. 点击铅笔图标编辑
7. 点击垃圾桶删除
```

### Assignments 测试:

```
1. 在同一课程中点击Assignments
2. 点击 +Assignment 按钮
3. 应该看到创建表单或对话框
4. 填写并保存
5. 新作业应立即出现
6. 点击作业名称应导航到编辑器
7. 编辑并保存应立即更新
```

## 下一步行动

1. ✅ 已修复: Courses Layout Redux 集成
2. ✅ 已修复: Dashboard Edit 按钮
3. ⚠️ 需要实现: 完整的 AssignmentEditor 页面
4. ⚠️ 需要实现: ModuleEditor Modal 对话框
5. 🔄 需要测试: 所有 CRUD 操作的完整流程
