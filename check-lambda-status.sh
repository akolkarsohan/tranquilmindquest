#!/bin/bash

# Quick script to check if Lambda function exists

PROFILE="${1:-sohan}"
REGION="${2:-ap-south-1}"
FUNCTION_NAME="newsletter-subscription-handler"

export AWS_PROFILE="$PROFILE"

echo "Checking Lambda function: $FUNCTION_NAME"
echo "Profile: $PROFILE | Region: $REGION"
echo ""

if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" 2>/dev/null; then
    echo ""
    echo "✅ Lambda function EXISTS!"
    echo ""
    echo "Getting function details..."
    aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" --query 'Configuration.[FunctionName,Runtime,Handler,State,LastUpdateStatus]' --output table
else
    echo "❌ Lambda function does NOT exist"
    echo ""
    echo "The function creation likely failed. Run the setup script again with the updated version."
fi

