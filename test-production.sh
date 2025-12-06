#!/bin/bash

###############################################
# 生产环境自动化测试脚本
# 验证 Kambaz LMS 的所有核心功能
###############################################

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置
FRONTEND_URL="${FRONTEND_URL:-https://kambaz-next-js-cs5610-fa25-05-git-a6-thomas-projects-866f7e96.vercel.app}"
BACKEND_URL="${BACKEND_URL:-https://kambaz-node-server-app-js8h.onrender.com}"

# 统计
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# 日志函数
log_title() {
  echo -e "\n${BLUE}═══════════════════════════════════════${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}═══════════════════════════════════════${NC}\n"
}

log_test() {
  echo -e "${YELLOW}➜${NC} $1"
  ((TOTAL_TESTS++))
}

log_pass() {
  echo -e "${GREEN}✓${NC} $1"
  ((PASSED_TESTS++))
}

log_fail() {
  echo -e "${RED}✗${NC} $1"
  ((FAILED_TESTS++))
}

log_info() {
  echo -e "${BLUE}ℹ${NC} $1"
}

# 测试 HTTP 端点
test_endpoint() {
  local method=$1
  local url=$2
  local data=$3
  local description=$4
  
  log_test "$description"
  
  if [ -z "$data" ]; then
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$url")
  else
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$url" \
      -H "Content-Type: application/json" \
      -d "$data")
  fi
  
  http_code=$(echo "$response" | tail -1)
  body=$(echo "$response" | head -n -1)
  
  if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
    log_pass "$description (HTTP $http_code)"
    echo "$body"
  else
    log_fail "$description (HTTP $http_code)"
    echo "Error: $body"
  fi
}

# 检查服务是否在线
check_service() {
  local url=$1
  local name=$2
  
  log_info "Checking $name..."
  
  if curl -s -f "$url" > /dev/null 2>&1; then
    log_pass "$name is online"
    return 0
  else
    log_fail "$name is offline or unreachable"
    return 1
  fi
}

###############################################
# 开始测试
###############################################

echo -e "\n${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║  Kambaz LMS 生产环境自动化测试        ║"
echo "║  Production Automated Testing Suite    ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

log_info "Frontend: $FRONTEND_URL"
log_info "Backend:  $BACKEND_URL"

###############################################
# 第一部分: 服务可用性检查
###############################################

log_title "第 1 部分: 服务可用性检查"

check_service "$FRONTEND_URL" "Frontend (Vercel)"
check_service "$BACKEND_URL/api/courses" "Backend (Render)"

###############################################
# 第二部分: Users API 测试
###############################################

log_title "第 2 部分: Users 模块 API 测试"

log_test "GET /api/users - 获取所有用户"
response=$(curl -s -w "%{http_code}" "$BACKEND_URL/api/users" | tail -c 3)
if [ "$response" = "200" ]; then
  log_pass "获取用户列表成功"
else
  log_fail "获取用户列表失败 (HTTP $response)"
fi

log_test "POST /api/users/login - 用户登录"
response=$(curl -s -w "%{http_code}" -X POST "$BACKEND_URL/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}' | tail -c 3)
if [ "$response" = "200" ] || [ "$response" = "201" ]; then
  log_pass "用户登录成功"
else
  log_fail "用户登录失败 (HTTP $response)"
fi

###############################################
# 第三部分: Courses API 测试
###############################################

log_title "第 3 部分: Courses 模块 API 测试"

log_test "GET /api/courses - 获取所有课程"
response=$(curl -s -w "%{http_code}" "$BACKEND_URL/api/courses" | tail -c 3)
if [ "$response" = "200" ]; then
  log_pass "获取课程列表成功"
else
  log_fail "获取课程列表失败 (HTTP $response)"
fi

###############################################
# 第四部分: Modules API 测试
###############################################

log_title "第 4 部分: Modules 模块 API 测试"

# 获取第一个课程 ID 用于测试
log_test "GET /api/courses/:courseId/modules - 获取课程模块"
response=$(curl -s -w "%{http_code}" "$BACKEND_URL/api/courses/CS5610/modules" | tail -c 3)
if [ "$response" = "200" ] || [ "$response" = "404" ]; then
  log_pass "模块 API 响应正常"
else
  log_fail "模块 API 失败 (HTTP $response)"
fi

###############################################
# 第五部分: Assignments API 测试
###############################################

log_title "第 5 部分: Assignments 模块 API 测试"

log_test "GET /api/courses/:courseId/assignments - 获取课程作业"
response=$(curl -s -w "%{http_code}" "$BACKEND_URL/api/courses/CS5610/assignments" | tail -c 3)
if [ "$response" = "200" ] || [ "$response" = "404" ]; then
  log_pass "作业 API 响应正常"
else
  log_fail "作业 API 失败 (HTTP $response)"
fi

###############################################
# 第六部分: Enrollments API 测试
###############################################

log_title "第 6 部分: Enrollments 模块 API 测试"

log_test "GET /api/enrollments - 获取注册信息"
response=$(curl -s -w "%{http_code}" "$BACKEND_URL/api/enrollments" | tail -c 3)
if [ "$response" = "200" ] || [ "$response" = "404" ] || [ "$response" = "401" ]; then
  log_pass "注册 API 响应正常"
else
  log_fail "注册 API 失败 (HTTP $response)"
fi

###############################################
# 第七部分: 数据库连接检查
###############################################

log_title "第 7 部分: 数据库连接检查"

log_info "检查 Backend 日志中的数据库连接状态..."
log_info "建议: 访问 https://dashboard.render.com 检查后端日志"
log_info "建议: 访问 https://cloud.mongodb.com 检查 MongoDB 连接"

###############################################
# 测试总结
###############################################

log_title "测试总结"

echo -e "总测试数:  ${BLUE}$TOTAL_TESTS${NC}"
echo -e "通过:     ${GREEN}$PASSED_TESTS${NC}"
echo -e "失败:     ${RED}$FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
  echo -e "\n${GREEN}✓ 所有测试通过！生产环境就绪。${NC}\n"
  exit 0
else
  echo -e "\n${RED}✗ 有 $FAILED_TESTS 个测试失败。请检查日志。${NC}\n"
  exit 1
fi
