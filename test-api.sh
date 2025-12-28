#!/bin/bash

# Simple test script for newsletter API endpoint
# Usage: ./test-api.sh API_URL EMAIL

API_URL="${1:-}"
EMAIL="${2:-test@example.com}"

if [[ -z "$API_URL" ]]; then
    echo "Usage: $0 API_URL [EMAIL]"
    echo "Example: $0 https://abc123.execute-api.us-east-1.amazonaws.com/prod/subscribe test@example.com"
    exit 1
fi

echo "Testing newsletter subscription API..."
echo "URL: $API_URL"
echo "Email: $EMAIL"
echo ""

response=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$API_URL" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\"}")

http_code=$(echo "$response" | grep "HTTP_CODE" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_CODE/d')

echo "Response:"
echo "$body" | python -m json.tool 2>/dev/null || echo "$body"
echo ""
echo "HTTP Status Code: $http_code"

if [[ "$http_code" == "200" ]]; then
    echo "✅ API test successful!"
else
    echo "❌ API test failed!"
    exit 1
fi

