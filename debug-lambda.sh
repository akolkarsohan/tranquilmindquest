#!/bin/bash

# Debug script to check Lambda function creation

PROFILE="${1:-sohan}"
REGION="${2:-ap-south-1}"
FUNCTION_NAME="newsletter-subscription-handler"

export AWS_PROFILE="$PROFILE"

echo "Checking Lambda function status..."
echo "Profile: $PROFILE"
echo "Region: $REGION"
echo "Function: $FUNCTION_NAME"
echo ""

# Check if function exists
if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" 2>/dev/null; then
    echo ""
    echo "✅ Lambda function exists!"
    echo ""
    echo "Function details:"
    aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" --query 'Configuration.[FunctionName,Runtime,Handler,LastModified,State]' --output table
else
    echo "❌ Lambda function does not exist"
    echo ""
    echo "Checking IAM role..."
    aws iam get-role --role-name newsletter-lambda-role --query 'Role.[RoleName,Arn]' --output table 2>/dev/null || echo "Role not found"
    echo ""
    echo "Checking CloudWatch Logs for errors..."
    aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/$FUNCTION_NAME" --region "$REGION" --query 'logGroups[*].[logGroupName]' --output table 2>/dev/null || echo "No log groups found"
fi

