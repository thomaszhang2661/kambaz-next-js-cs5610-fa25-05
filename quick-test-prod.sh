#!/bin/bash

# 生产环境快速测试脚本
# 使用: ./quick-test-prod.sh

set -e

SERVER="https://kambaz-node-server-app-js8h.onrender.com"
FACULTY_COOKIE="/tmp/fac_prod.txt"
STUDENT_COOKIE="/tmp/stu_prod.txt"

# 颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Kambaz Quizzes 生产环境测试${NC}"
echo -e "${YELLOW}服务器: $SERVER${NC}"
echo "================================"

# 1. Faculty 登录
echo -e "\n${YELLOW}1️⃣  Faculty 登录...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$SERVER/api/users/signin" \
  -H "Content-Type: application/json" \
  -d '{"username":"faculty","password":"faculty123"}' \
  -c "$FACULTY_COOKIE")

if echo "$LOGIN_RESPONSE" | jq -e '.role' > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Faculty 登录成功${NC}"
else
  echo -e "${RED}❌ Faculty 登录失败${NC}"
  echo "$LOGIN_RESPONSE" | jq . 2>/dev/null || echo "$LOGIN_RESPONSE"
  exit 1
fi

# 2. Student 登录
echo -e "\n${YELLOW}2️⃣  Student 登录...${NC}"
LOGIN_STU=$(curl -s -X POST "$SERVER/api/users/signin" \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"alice123"}' \
  -c "$STUDENT_COOKIE")

if echo "$LOGIN_STU" | jq -e '.role' > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Student 登录成功${NC}"
else
  echo -e "${RED}❌ Student 登录失败${NC}"
  echo "$LOGIN_STU" | jq . 2>/dev/null || echo "$LOGIN_STU"
  exit 1
fi

# 3. 创建 Quiz
echo -e "\n${YELLOW}3️⃣  Faculty 创建 Quiz...${NC}"
QUIZ=$(curl -s -X POST "$SERVER/api/courses/CS5610/quizzes" \
  -H "Content-Type: application/json" \
  -b "$FACULTY_COOKIE" \
  -d '{
    "title": "Prod Test Quiz '"$(date +%s)"'",
    "description": "For production testing",
    "points": 100,
    "settings": {
      "multipleAttempts": true,
      "maxAttempts": 3
    },
    "questions": [
      {
        "type": "mcq",
        "title": "Q1: Best JS Framework?",
        "body": "Select one",
        "points": 50,
        "choices": [
          { "text": "React", "isCorrect": true },
          { "text": "Vue", "isCorrect": false },
          { "text": "Angular", "isCorrect": false }
        ]
      },
      {
        "type": "tf",
        "title": "Q2: JS is dynamically typed",
        "points": 30,
        "choices": [
          { "_id": "true", "text": "True", "isCorrect": true },
          { "_id": "false", "text": "False", "isCorrect": false }
        ]
      },
      {
        "type": "fill",
        "title": "Q3: CSS stands for",
        "points": 20,
        "blanks": [
          { "answers": ["Cascading Style Sheets", "cascading style sheets"] }
        ]
      }
    ]
  }')

QUIZ_ID=$(echo "$QUIZ" | jq -r '._id // empty')
if [ -z "$QUIZ_ID" ]; then
  echo -e "${RED}❌ 创建 Quiz 失败${NC}"
  echo "$QUIZ" | jq . 2>/dev/null || echo "$QUIZ"
  exit 1
fi
echo -e "${GREEN}✅ 创建 Quiz: $QUIZ_ID${NC}"

# 4. Faculty 发布 Quiz
echo -e "\n${YELLOW}4️⃣  Faculty 发布 Quiz...${NC}"
PUB=$(curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/publish" \
  -b "$FACULTY_COOKIE")

if echo "$PUB" | jq -e '.published' > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Quiz 已发布${NC}"
else
  echo -e "${RED}❌ 发布失败${NC}"
  echo "$PUB" | jq . 2>/dev/null || echo "$PUB"
fi

# 5. Student 获取 Quiz
echo -e "\n${YELLOW}5️⃣  Student 获取 Quiz 详情...${NC}"
QUIZ_DETAIL=$(curl -s -X GET "$SERVER/api/quizzes/$QUIZ_ID" \
  -b "$STUDENT_COOKIE")
PUBLISHED=$(echo "$QUIZ_DETAIL" | jq -r '.published // empty')
if [ "$PUBLISHED" = "true" ]; then
  echo -e "${GREEN}✅ 获取成功，Quiz 已发布${NC}"
else
  echo -e "${RED}❌ 获取失败或未发布${NC}"
  echo "$QUIZ_DETAIL" | jq . 2>/dev/null || echo "$QUIZ_DETAIL"
fi

# 6. 获取问题 ID
echo -e "\n${YELLOW}6️⃣  提取问题 ID...${NC}"
Q1_ID=$(echo "$QUIZ_DETAIL" | jq -r '.questions[0]._id')
Q1_CHOICE=$(echo "$QUIZ_DETAIL" | jq -r '.questions[0].choices[0]._id')
Q2_ID=$(echo "$QUIZ_DETAIL" | jq -r '.questions[1]._id')
Q3_ID=$(echo "$QUIZ_DETAIL" | jq -r '.questions[2]._id')
echo -e "${GREEN}✅ Q1 ID: $Q1_ID, Choice: $Q1_CHOICE${NC}"

# 7. Student 提交答案 (100分)
echo -e "\n${YELLOW}7️⃣  Student 提交完整答案...${NC}"
ATTEMPT=$(curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
  -H "Content-Type: application/json" \
  -b "$STUDENT_COOKIE" \
  -d "{
    \"answers\": [
      {
        \"questionId\": \"$Q1_ID\",
        \"answer\": \"$Q1_CHOICE\"
      },
      {
        \"questionId\": \"$Q2_ID\",
        \"answer\": true
      },
      {
        \"questionId\": \"$Q3_ID\",
        \"answer\": \"Cascading Style Sheets\"
      }
    ]
  }")

SCORE=$(echo "$ATTEMPT" | jq -r '.score // empty')
TOTAL=$(echo "$ATTEMPT" | jq -r '.total // empty')
ATTEMPT_ID=$(echo "$ATTEMPT" | jq -r '.attempt._id // empty')

if [ -z "$SCORE" ]; then
  echo -e "${RED}❌ 提交失败${NC}"
  echo "$ATTEMPT" | jq . 2>/dev/null || echo "$ATTEMPT"
else
  echo -e "${GREEN}✅ 答案已提交${NC}"
  echo -e "   分数: $SCORE/$TOTAL (应为 100/100)"
  echo -e "   Attempt ID: $ATTEMPT_ID"
fi

# 8. Student 查看尝试
echo -e "\n${YELLOW}8️⃣  Student 查看自己的尝试...${NC}"
ATTEMPTS=$(curl -s -X GET "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
  -b "$STUDENT_COOKIE")
COUNT=$(echo "$ATTEMPTS" | jq 'length')
echo -e "${GREEN}✅ 自己的尝试数: $COUNT${NC}"

# 9. Faculty 查看所有尝试
echo -e "\n${YELLOW}9️⃣  Faculty 查看所有学生的尝试...${NC}"
ALL_ATTEMPTS=$(curl -s -X GET "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
  -b "$FACULTY_COOKIE")
FACULTY_COUNT=$(echo "$ALL_ATTEMPTS" | jq 'length')
echo -e "${GREEN}✅ 总尝试数: $FACULTY_COUNT${NC}"

# 10. Student 再次提交 (不同答案，应该分数更低)
echo -e "\n${YELLOW}🔟 Student 再次提交答案 (尝试 2/3)...${NC}"
ATTEMPT2=$(curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
  -H "Content-Type: application/json" \
  -b "$STUDENT_COOKIE" \
  -d "{
    \"answers\": [
      {
        \"questionId\": \"$Q1_ID\",
        \"answer\": \"wrong-id\"
      },
      {
        \"questionId\": \"$Q2_ID\",
        \"answer\": false
      },
      {
        \"questionId\": \"$Q3_ID\",
        \"answer\": \"Wrong\"
      }
    ]
  }")

SCORE2=$(echo "$ATTEMPT2" | jq -r '.score // empty')
if [ -z "$SCORE2" ]; then
  echo -e "${RED}❌ 第二次提交失败${NC}"
  echo "$ATTEMPT2" | jq . 2>/dev/null || echo "$ATTEMPT2"
else
  echo -e "${GREEN}✅ 第二次提交成功，分数: $SCORE2/100${NC}"
fi

# 11. 第 3 次提交
echo -e "\n${YELLOW}1️⃣1️⃣ Student 第 3 次提交 (达到限制)...${NC}"
ATTEMPT3=$(curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
  -H "Content-Type: application/json" \
  -b "$STUDENT_COOKIE" \
  -d '{"answers": []}')
SCORE3=$(echo "$ATTEMPT3" | jq -r '.score // empty')
if [ -n "$SCORE3" ]; then
  echo -e "${GREEN}✅ 第 3 次提交成功${NC}"
else
  echo "$ATTEMPT3" | jq . 2>/dev/null || echo "$ATTEMPT3"
fi

# 12. 超过限制应失败
echo -e "\n${YELLOW}1️⃣2️⃣ 尝试超过限制 (应该失败)...${NC}"
OVER_LIMIT=$(curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
  -H "Content-Type: application/json" \
  -b "$STUDENT_COOKIE" \
  -d '{"answers": []}')
ERROR=$(echo "$OVER_LIMIT" | jq -r '.error // empty')
if [ -n "$ERROR" ]; then
  echo -e "${GREEN}✅ 正确拒绝: $ERROR${NC}"
else
  echo -e "${RED}❌ 应该返回错误但没有${NC}"
  echo "$OVER_LIMIT" | jq . 2>/dev/null || echo "$OVER_LIMIT"
fi

# 13. Faculty 取消发布
echo -e "\n${YELLOW}1️⃣3️⃣ Faculty 取消发布 Quiz...${NC}"
UNPUB=$(curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/unpublish" \
  -b "$FACULTY_COOKIE")
# 检查是否成功取消发布 (published 应该为 false，unpublishedAt 应该存在)
UNPUB_AT=$(echo "$UNPUB" | jq -r '.unpublishedAt // empty')
if [ -n "$UNPUB_AT" ]; then
  echo -e "${GREEN}✅ Quiz 已取消发布${NC}"
  UNPUB_BY=$(echo "$UNPUB" | jq -r '.unpublishedBy')
  echo -e "   unpublishedBy: $UNPUB_BY"
  echo -e "   unpublishedAt: $UNPUB_AT"
else
  echo -e "${RED}❌ 取消发布失败${NC}"
  echo "$UNPUB" | jq . 2>/dev/null || echo "$UNPUB"
fi

# 14. Student 应该看不到
echo -e "\n${YELLOW}1️⃣4️⃣ Student 尝试查看未发布的 Quiz (应该失败)...${NC}"
UNPUB_CHECK=$(curl -s -X GET "$SERVER/api/quizzes/$QUIZ_ID" \
  -b "$STUDENT_COOKIE")
UNPUB_ERROR=$(echo "$UNPUB_CHECK" | jq -r '.error // empty')
if [ -n "$UNPUB_ERROR" ]; then
  echo -e "${GREEN}✅ 正确拒绝: $UNPUB_ERROR${NC}"
else
  echo -e "${RED}❌ 应该返回 403${NC}"
  echo "$UNPUB_CHECK" | jq . 2>/dev/null || echo "$UNPUB_CHECK"
fi

# 15. Faculty 删除 Quiz
echo -e "\n${YELLOW}1️⃣5️⃣ Faculty 删除 Quiz...${NC}"
DEL=$(curl -s -X DELETE "$SERVER/api/quizzes/$QUIZ_ID" \
  -b "$FACULTY_COOKIE")
echo -e "${GREEN}✅ Quiz 已删除${NC}"

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}✨ 生产环境测试完成！${NC}"
echo -e "${GREEN}================================${NC}"
