#!/bin/bash

# Newsletter API Test Script
# Tests the newsletter subscription endpoint

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# API Endpoint
API_ENDPOINT="https://uv48rxi4gf.execute-api.ap-south-1.amazonaws.com/prod/subscribe"

# Test email (change this to your test email)
TEST_EMAIL="${1:-test@example.com}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Newsletter API Test Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "API Endpoint: ${YELLOW}${API_ENDPOINT}${NC}"
echo -e "Test Email: ${YELLOW}${TEST_EMAIL}${NC}"
echo ""

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo -e "${RED}Error: curl is not installed${NC}"
    echo "Please install curl to use this test script"
    exit 1
fi

echo -e "${BLUE}Testing OPTIONS request (CORS preflight)...${NC}"
OPTIONS_RESPONSE=$(curl -s -w "\n%{http_code}" -X OPTIONS "${API_ENDPOINT}" \
    -H "Origin: http://localhost" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: Content-Type" 2>&1)

OPTIONS_CODE=$(echo "$OPTIONS_RESPONSE" | tail -n1)
OPTIONS_BODY=$(echo "$OPTIONS_RESPONSE" | sed '$d')

if [ "$OPTIONS_CODE" == "200" ]; then
    echo -e "${GREEN}✓ OPTIONS request successful (Status: ${OPTIONS_CODE})${NC}"
else
    echo -e "${YELLOW}⚠ OPTIONS request returned status: ${OPTIONS_CODE}${NC}"
fi
echo ""

echo -e "${BLUE}Testing POST request (Subscription)...${NC}"
START_TIME=$(date +%s%3N)

RESPONSE=$(curl -s -w "\n%{http_code}\n%{time_total}" -X POST "${API_ENDPOINT}" \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost" \
    -d "{\"email\":\"${TEST_EMAIL}\"}" 2>&1)

END_TIME=$(date +%s%3N)
RESPONSE_TIME=$(echo "$RESPONSE" | tail -n1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n2 | head -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | sed -e '$ d' | sed -e '$ d')

echo ""
echo -e "${BLUE}Response Details:${NC}"
echo -e "  Status Code: ${YELLOW}${HTTP_CODE}${NC}"
echo -e "  Response Time: ${YELLOW}${RESPONSE_TIME}s${NC}"
echo ""

# Parse JSON response
if command -v jq &> /dev/null; then
    echo -e "${BLUE}Response Body (formatted):${NC}"
    echo "$RESPONSE_BODY" | jq '.' 2>/dev/null || echo "$RESPONSE_BODY"
    echo ""
    
    SUCCESS=$(echo "$RESPONSE_BODY" | jq -r '.success' 2>/dev/null)
    MESSAGE=$(echo "$RESPONSE_BODY" | jq -r '.message // .error // "No message"' 2>/dev/null)
else
    echo -e "${BLUE}Response Body (raw):${NC}"
    echo "$RESPONSE_BODY"
    echo ""
    echo -e "${YELLOW}Note: Install 'jq' for formatted JSON output${NC}"
    SUCCESS=$(echo "$RESPONSE_BODY" | grep -o '"success":[^,}]*' | cut -d':' -f2 | tr -d ' "')
    MESSAGE="(install jq to see formatted message)"
fi

echo ""
echo -e "${BLUE}========================================${NC}"

if [ "$HTTP_CODE" == "200" ] && [ "$SUCCESS" == "true" ]; then
    echo -e "${GREEN}✓ Test PASSED!${NC}"
    echo -e "${GREEN}Subscription successful!${NC}"
    if [ -n "$MESSAGE" ] && [ "$MESSAGE" != "(install jq to see formatted message)" ]; then
        echo -e "${GREEN}Message: ${MESSAGE}${NC}"
    fi
    echo ""
    echo -e "${BLUE}Next Steps:${NC}"
    echo "  1. Check your email inbox (and spam folder) for the welcome email"
    echo "  2. Verify the email was sent in AWS SES Console"
    echo "  3. Check CloudWatch logs for Lambda execution"
    exit 0
else
    echo -e "${RED}✗ Test FAILED${NC}"
    echo -e "${RED}Status Code: ${HTTP_CODE}${NC}"
    if [ -n "$MESSAGE" ] && [ "$MESSAGE" != "(install jq to see formatted message)" ]; then
        echo -e "${RED}Error: ${MESSAGE}${NC}"
    fi
    echo ""
    echo -e "${YELLOW}Troubleshooting:${NC}"
    echo "  1. Verify API Gateway is deployed"
    echo "  2. Check Lambda function logs in CloudWatch"
    echo "  3. Verify SES email is verified"
    echo "  4. Check CORS configuration in API Gateway"
    echo "  5. Verify Lambda has SES permissions"
    exit 1
fi

