#!/bin/bash

# Kambaz A6 部署检查脚本

echo "🚀 Kambaz A6 部署准备检查"
echo "================================"
echo ""

# 检查 Node 后端
echo "📦 检查 Node.js 后端..."
cd kambaz-node-server-app 2>/dev/null || {
    echo "❌ 错误: 找不到 kambaz-node-server-app 目录"
    exit 1
}

# 检查 package.json
if [ -f "package.json" ]; then
    echo "✅ package.json 存在"
else
    echo "❌ 找不到 package.json"
    exit 1
fi

# 检查关键文件
echo ""
echo "📄 检查关键文件..."
files=("index.js" "Kambaz/Users/routes.js" "Kambaz/Courses/routes.js" "Kambaz/Modules/routes.js")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ 缺少 $file"
    fi
done

# 检查 .gitignore
echo ""
echo "🔒 检查 .gitignore..."
if [ -f ".gitignore" ]; then
    echo "✅ .gitignore 存在"
    if grep -q "node_modules" .gitignore && grep -q ".env" .gitignore; then
        echo "✅ .gitignore 配置正确"
    else
        echo "⚠️  .gitignore 可能需要添加 node_modules 和 .env"
    fi
else
    echo "❌ 缺少 .gitignore，已创建"
fi

# 检查 Git 状态
echo ""
echo "🔧 检查 Git 状态..."
if [ -d ".git" ]; then
    echo "✅ Git 仓库已初始化"
    git remote -v | grep origin && echo "✅ Git remote 已配置" || echo "⚠️  Git remote 未配置"
else
    echo "⚠️  Git 未初始化"
    echo "   运行: git init"
fi

# 返回主目录
cd ..

# 检查前端
echo ""
echo "🎨 检查 Next.js 前端..."
if [ -f "package.json" ]; then
    echo "✅ 前端 package.json 存在"
else
    echo "❌ 找不到前端 package.json"
fi

echo ""
echo "================================"
echo "✨ 部署准备总结"
echo "================================"
echo ""
echo "📋 下一步操作："
echo "1. 设置 MongoDB Atlas (mongodb.com)"
echo "2. 推送代码到 GitHub"
echo "3. 在 Render.com 部署后端"
echo "4. 在 Vercel 更新环境变量"
echo ""
echo "📖 详细步骤请查看: DEPLOYMENT_GUIDE_CN.md"
echo ""
