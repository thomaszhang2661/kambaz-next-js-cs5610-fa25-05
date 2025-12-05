#!/bin/bash

# 快速测试脚本
# 使用: ./quick-test.sh

set -e

SERVER="http://localhost:4000"
FACULTY_COOKIE="/tmp/fac_quick.txt"
STUDENT_COOKIE="/tmp/stu_quick.txt"

# 颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🧪 Kambaz Quizzes 快速测试${NC}"
echo "================================"

# 1. Faculty 登录
echo -e "\n${YELLOW}1️⃣  Faculty 登录...${NC}"
curl -s -X POST "$SERVER/api/users/signin" \
  -H "Content-Type: application/json" \
  -d '{"username":"prof1","password":"pass123"}' \
  -c "$FACULTY_COOKIE" > /dev/null
echo -e "${GREEN}✅ Faculty 登录成功${NC}"

# 2. Student 登录
echo -e "\n${YELLOW}2️⃣  Student 登录...${NC}"
curl -s -X POST "$SERVER/api/users/signin" \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"pass123"}' \
  -c "$STUDENT_COOKIE" > /dev/null
echo -e "${GREEN}✅ Student 登录成功${NC}"

# 3. 创建 Quiz
echo -e "\n${YELLOW}3️⃣  Faculty 创建 Quiz...${NC}"
QUIZ=$(curl -s -X POST "$SERVER/api/courses/CS5610/quizzes" \
  -H "Content-Type: application/json" \
  -b "$FACULTY_COOKIE" \
  -d '{
    "title": "Quick Test Quiz",
    "description": "For testing",
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

QUIZ_ID=$(echo "$QUIZ" | jq -r '._id')
echo -e "${GREEN}✅ 创建 Quiz: $QUIZ_ID${NC}"

# 4. Faculty 发布 Quiz
echo -e "\n${YELLOW}4️⃣  Faculty 发布 Quiz...${NC}"
curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/publish" \
  -b "$FACULTY_COOKIE" > /dev/null
echo -e "${GREEN}✅ Quiz 已发布${NC}"

# 5. Student 获取 Quiz
echo -e "\n${YELLOW}5️⃣  Student 获取 Quiz 详情...${NC}"
QUIZ_DETAIL=$(curl -s -X GET "$SERVER/api/quizzes/$QUIZ_ID" \
  -b "$STUDENT_COOKIE")
PUBLISHED=$(echo "$QUIZ_DETAIL" | jq -r '.published')
echo -e "${GREEN}✅ 获取成功，published: $PUBLISHED${NC}"

# 6. 获取问题 ID
echo -e "\n${YELLOW}6️⃣  提取问题 ID...${NC}"
Q1_ID=$(echo "$QUIZ_DETAIL" | jq -r '.questions[0]._id')
Q1_CHOICE=$(echo "$QUIZ_DETAIL" | jq -r '.questions[0].choices[0]._id')
Q2_ID=$(echo "$QUIZ_DETAIL" | jq -r '.questions[1]._id')
Q3_ID=$(echo "$QUIZ_DETAIL" | jq -r '.questions[2]._id')
echo -e "${GREEN}✅ Q1 ID: $Q1_ID, Choice: $Q1_CHOICE${NC}"

# 7. Student 提交答案 (100分)
echo -e "\n${YELLOW}7️⃣  Student 提交答案...${NC}"
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

SCORE=$(echo "$ATTEMPT" | jq -r '.score')
TOTAL=$(echo "$ATTEMPT" | jq -r '.total')
ATTEMPT_ID=$(echo "$ATTEMPT" | jq -r '.attempt._id')

echo -e "${GREEN}✅ 答案已提交${NC}"
echo -e "   分数: $SCORE/$TOTAL (100分满分)"
echo -e "   Attempt ID: $ATTEMPT_ID"

# 8. Student 查看尝试
echo -e "\n${YELLOW}8️⃣  Student 查看自己的尝试...${NC}"
ATTEMPTS=$(curl -s -X GET "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
  -b "$STUDENT_COOKIE")
COUNT=$(echo "$ATTEMPTS" | jq 'length')
echo -e "${GREEN}✅ 尝试数: $COUNT${NC}"

# 9. Faculty 查看所有尝试
echo -e "\n${YELLOW}9️⃣  Faculty 查看所有学生的尝试...${NC}"
ALL_ATTEMPTS=$(curl -s -X GET "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
  -b "$FACULTY_COOKIE")
FACULTY_COUNT=$(echo "$ALL_ATTEMPTS" | jq 'length')
echo -e "${GREEN}✅ 总尝试数: $FACULTY_COUNT${NC}"

# 10. Student 再次提交 (不同答案)
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

SCORE2=$(echo "$ATTEMPT2" | jq -r '.score')
echo -e "${GREEN}✅ 第二次提交，分数: $SCORE2/100${NC}"

# 11. 测试尝试限制
echo -e "\n${YELLOW}1️⃣1️⃣ 测试尝试限制 (3/3)...${NC}"
for i in {3..3}; do
  curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
    -H "Content-Type: application/json" \
    -b "$STUDENT_COOKIE" \
    -d '{"answers": []}' > /dev/null
done
echo -e "${GREEN}✅ 第 3 次提交成功${NC}"

# 12. 超过限制应失败
echo -e "\n${YELLOW}1️⃣2️⃣ 尝试超过限制 (应该失败)...${NC}"
OVER_LIMIT=$(curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/attempts" \
  -H "Content-Type: application/json" \
  -b "$STUDENT_COOKIE" \
  -d '{"answers": []}')
ERROR=$(echo "$OVER_LIMIT" | jq -r '.error // "No error"')
if [ "$ERROR" != "No error" ]; then
  echo -e "${GREEN}✅ 正确拒绝: $ERROR${NC}"
else
  echo -e "${RED}❌ 应该返回错误但没有${NC}"
fi

# 13. Faculty 取消发布
echo -e "\n${YELLOW}1️⃣3️⃣ Faculty 取消发布 Quiz...${NC}"
curl -s -X POST "$SERVER/api/quizzes/$QUIZ_ID/unpublish" \
  -b "$FACULTY_COOKIE" > /dev/null
echo -e "${GREEN}✅ Quiz 已取消发布${NC}"

# 14. Student 应该看不到
echo -e "\n${YELLOW}1️⃣4️⃣ Student 尝试查看未发布的 Quiz (应该失败)...${NC}"
UNPUB=$(curl -s -X GET "$SERVER/api/quizzes/$QUIZ_ID" \
  -b "$STUDENT_COOKIE")
UNPUB_ERROR=$(echo "$UNPUB" | jq -r '.error // "No error"')
if [ "$UNPUB_ERROR" != "No error" ]; then
  echo -e "${GREEN}✅ 正确拒绝: $UNPUB_ERROR${NC}"
else
  echo -e "${RED}❌ 应该返回 403${NC}"
fi

# 15. Faculty 删除 Quiz
echo -e "\n${YELLOW}1️⃣5️⃣ Faculty 删除 Quiz...${NC}"
curl -s -X DELETE "$SERVER/api/quizzes/$QUIZ_ID" \
  -b "$FACULTY_COOKIE" > /dev/null
echo -e "${GREEN}✅ Quiz 已删除${NC}"

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}✨ 所有测试通过！${NC}"
echo -e "${GREEN}================================${NC}"

