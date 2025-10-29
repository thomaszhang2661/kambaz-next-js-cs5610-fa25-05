# PR: Lab4 — Redux Examples, Date fix, and styling adjustments

简短标题

- feat(lab4): add counter & todo Redux examples, fix date formatting, and align styles

概述

本次变更把第 4 章（Lab4）中缺失的 Redux 示例补齐，并对若干示例做了修复与样式调整，目的是让仓库内的 Lab4 页面更完整地匹配课本示例并便于教学/验收。

主要内容（高层）

- 新增 Redux slices：`counterSlice`、`todoSlice`。
- 新增演示组件：`CounterRedux.tsx`、`TodoListRedux.tsx`。
- 将新 slice 注册到 `app/Labs/Lab4/store/index.ts`。
- 在 `ReduxExamples/page.tsx` 中展示 Counter Redux 与 Todo Redux 示例。
- 修复 `DateStateVariable.tsx` 的日期格式化 off-by-one 问题，并改为 `value` 绑定。
- 在 `app/globals.css` 中添加 Lab4 专属样式（按钮颜色、卡片、列表等），并对 `Counter.tsx` 的按钮添加 Bootstrap 类以统一视觉。
- 为关键按钮与交互元素添加了 `aria-label` 与 `data-testid`，便于自动化测试。

修改的文件

请在 PR 中包含以下变更（已在仓库中修改）：

- app/Labs/Lab4/ReduxExamples/counterSlice.ts (新增)
- app/Labs/Lab4/ReduxExamples/todoSlice.ts (新增)
- app/Labs/Lab4/ReduxExamples/CounterRedux.tsx (新增)
- app/Labs/Lab4/ReduxExamples/TodoListRedux.tsx (新增)
- app/Labs/Lab4/store/index.ts (修改：注册 counter & todo reducer)
- app/Labs/Lab4/ReduxExamples/page.tsx (修改：导入并渲染新组件)
- app/Labs/Lab4/DateStateVariable.tsx (修改：修复日期格式化)
- app/globals.css (修改：新增 Lab4 专属样式)
- app/Labs/Lab4/Counter.tsx (修改：按钮样式)

验收步骤（本地）

1. 安装依赖并启动 dev 服务器：

```bash
npm install
npm run dev
```

2. 打开页面并检查：

- 访问 `http://localhost:3000/Labs/Lab4`
- 确认顶部的 `Redux Examples` 区块显示：
  - Hello Redux（显示 "Hello World"）
  - Counter Redux（初始值 5；点击 Increment/Decrement 可改变值）
  - Todo List Redux（能 Add、Edit->Update、Cancel、Toggle、Delete）
- 检查 `Date State Variables`：日期显示与日期输入一致（不再偏一天）
- 检查其它示例（Boolean/String/Object/Array/Event 等）交互是否正常

提交与分支建议

建议在本地新建分支进行提交并推送：

```bash
# 在仓库根
git checkout -b feature/lab4-redux-examples
git add .
git commit -m "feat(lab4): add counter & todo redux examples; fix date; style adjustments"
git push -u origin feature/lab4-redux-examples
```

PR 描述建议文本（可直接复制到 GitHub PR body）

- 标题：feat(lab4): add counter & todo Redux examples, fix date formatting, style tweaks
- 主体：见本文件顶部的“概述”和“主要内容”段落（复制粘贴即可）。

后续建议（可选）

- 添加自动化测试（reducers 单元测试 + RTL 覆盖关键 UI 流程）。我可以为你创建这些测试。
- 如果需要，继续把样式逐像素对齐书中截图（当前为接近式调整）。
- 可将 Todo 示例增强成模态编辑或增加验证。

---

如果你希望，我可以继续：

- 添加 Jest + React Testing Library 的测试并运行（我可以在本分支完成并把测试输出贴上）。
- 根据你的审阅把样式进一步细化或提 PR。
