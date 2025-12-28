#!/bin/bash

# =============================================================================
# Newsletter Backend Setup Script for AWS
# 
# This script automates the creation and configuration of:
# - IAM Role for Lambda with SES permissions
# - Lambda function for newsletter subscriptions
# - API Gateway REST API with /subscribe endpoint
# - CORS configuration
#
# Usage: ./setup-newsletter-backend.sh --profile PROFILE_NAME [OPTIONS]
#
# Prerequisites:
# - AWS CLI installed and configured
# - AWS profile configured in ~/.aws/credentials
# - Email/domain verified in SES (manual step)
#
# =============================================================================

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
AWS_PROFILE=""
AWS_REGION="us-east-1"
LAMBDA_FUNCTION_NAME="newsletter-subscription-handler"
LAMBDA_ROLE_NAME="newsletter-lambda-role"
API_NAME="newsletter-api"
API_STAGE="prod"
FROM_EMAIL="newsletter@tranquilmindquest.com"
REPLY_TO_EMAIL="contact@tranquilmindquest.com"
ALLOWED_ORIGIN="*"

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to display usage
show_usage() {
    cat << EOF
Usage: $0 --profile PROFILE_NAME [OPTIONS]

Required:
    --profile PROFILE_NAME      AWS profile name from ~/.aws/credentials

Optional:
    --region REGION             AWS region (default: us-east-1)
    --from-email EMAIL          From email address (default: newsletter@tranquilmindquest.com)
    --reply-to EMAIL            Reply-to email address (default: contact@tranquilmindquest.com)
    --allowed-origin ORIGIN     Allowed CORS origin (default: *)
    --api-name NAME             API Gateway name (default: newsletter-api)
    --lambda-name NAME          Lambda function name (default: newsletter-subscription-handler)
    --help                      Show this help message

Examples:
    $0 --profile my-aws-profile
    $0 --profile production --region us-west-2 --from-email news@example.com
    $0 --profile dev --allowed-origin https://example.com

EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --profile)
            AWS_PROFILE="$2"
            shift 2
            ;;
        --region)
            AWS_REGION="$2"
            shift 2
            ;;
        --from-email)
            FROM_EMAIL="$2"
            shift 2
            ;;
        --reply-to)
            REPLY_TO_EMAIL="$2"
            shift 2
            ;;
        --allowed-origin)
            ALLOWED_ORIGIN="$2"
            shift 2
            ;;
        --api-name)
            API_NAME="$2"
            shift 2
            ;;
        --lambda-name)
            LAMBDA_FUNCTION_NAME="$2"
            shift 2
            ;;
        --help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate required parameters
if [[ -z "$AWS_PROFILE" ]]; then
    print_error "AWS profile is required!"
    show_usage
    exit 1
fi

# Export AWS profile
export AWS_PROFILE="$AWS_PROFILE"

# Function to check if we can create zip files
check_zip_available() {
    # Check if zip command is available
    if command -v zip &> /dev/null; then
        ZIP_METHOD="zip"
        return 0
    fi
    
    # Check common Windows Git Bash locations
    if [[ -f "/usr/bin/zip" ]]; then
        ZIP_METHOD="zip"
        return 0
    fi
    
    # On Windows, try PowerShell Compress-Archive
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$(uname -s)" == "MINGW"* ]]; then
        if command -v powershell &> /dev/null; then
            ZIP_METHOD="powershell"
            return 0
        fi
    fi
    
    return 1
}

# Function to check required tools
check_required_tools() {
    local missing_tools=()
    
    if ! command -v aws &> /dev/null; then
        missing_tools+=("aws")
    fi
    
    if ! check_zip_available; then
        missing_tools+=("zip")
    fi
    
    if [[ ${#missing_tools[@]} -gt 0 ]]; then
        print_error "Missing required tools: ${missing_tools[*]}"
        if [[ " ${missing_tools[@]} " =~ " aws " ]]; then
            print_info "Install AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        fi
        if [[ " ${missing_tools[@]} " =~ " zip " ]]; then
            print_info "For zip on Windows Git Bash, try one of these:"
            print_info "  1. Install via MSYS2 package manager:"
            print_info "     pacman -S zip"
            print_info "  2. Download zip from: https://sourceforge.net/projects/gnuwin32/files/zip/3.0/"
            print_info "  3. Use PowerShell (script will try this automatically on Windows)"
        fi
        exit 1
    fi
    
    if [[ "$ZIP_METHOD" == "zip" ]]; then
        print_success "All required tools found (using zip command)"
    elif [[ "$ZIP_METHOD" == "powershell" ]]; then
        print_success "All required tools found (using PowerShell for zip creation)"
    fi
}

# Function to create zip file
create_zip_file() {
    local source_file="$1"
    local output_file="$2"
    local file_name=$(basename "$source_file")
    local source_dir=$(dirname "$source_file")
    
    if [[ "$ZIP_METHOD" == "zip" ]]; then
        # Use zip command
        (cd "$source_dir" && zip -q -j "$output_file" "$file_name")
    elif [[ "$ZIP_METHOD" == "powershell" ]]; then
        # Use PowerShell Compress-Archive
        # Convert Unix-style paths to Windows-style for PowerShell
        local win_source="$source_file"
        local win_output="$output_file"
        
        # Try cygpath if available (Git Bash)
        if command -v cygpath &> /dev/null; then
            win_source=$(cygpath -w "$source_file")
            win_output=$(cygpath -w "$output_file")
        else
            # Manual conversion: /c/Users/... -> C:\Users\...
            win_source=$(echo "$source_file" | sed 's|^/\([a-zA-Z]\)/|\1:/|' | sed 's|/|\\|g')
            win_output=$(echo "$output_file" | sed 's|^/\([a-zA-Z]\)/|\1:/|' | sed 's|/|\\|g')
        fi
        
        # PowerShell Compress-Archive requires the destination to not exist
        if [[ -f "$output_file" ]]; then
            rm -f "$output_file"
        fi
        
        # Use PowerShell to create zip file
        print_info "Using PowerShell to create zip file..."
        if ! powershell.exe -NoProfile -Command "Compress-Archive -Path '$win_source' -DestinationPath '$win_output' -Force" 2>&1; then
            print_error "PowerShell Compress-Archive failed"
            print_info "Source: $win_source"
            print_info "Output: $win_output"
            exit 1
        fi
        
        # Verify zip file was created
        if [[ ! -f "$output_file" ]]; then
            print_error "Zip file was not created at: $output_file"
            exit 1
        fi
    else
        print_error "Cannot create zip file - no suitable method available"
        exit 1
    fi
}

# Function to check AWS credentials
check_aws_credentials() {
    print_info "Checking AWS credentials for profile: $AWS_PROFILE"
    if ! aws sts get-caller-identity --region "$AWS_REGION" &> /dev/null; then
        print_error "AWS credentials not configured or invalid for profile: $AWS_PROFILE"
        print_info "Please check your ~/.aws/credentials file"
        exit 1
    fi
    
    local account_id=$(aws sts get-caller-identity --query Account --output text --region "$AWS_REGION")
    print_success "AWS credentials valid (Account ID: $account_id)"
}

# Function to get Lambda handler code path
get_lambda_code_path() {
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local lambda_code="$script_dir/aws/lambda-newsletter-handler.js"
    
    if [[ ! -f "$lambda_code" ]]; then
        print_error "Lambda function code not found at: $lambda_code"
        exit 1
    fi
    
    echo "$lambda_code"
}

# Function to create IAM role for Lambda
create_iam_role() {
    print_info "Creating IAM role: $LAMBDA_ROLE_NAME"
    
    # Check if role already exists
    if aws iam get-role --role-name "$LAMBDA_ROLE_NAME" &> /dev/null; then
        print_warning "IAM role $LAMBDA_ROLE_NAME already exists, skipping creation"
        return
    fi
    
    # Trust policy for Lambda
    local trust_policy='{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "lambda.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }'
    
    # Create role
    aws iam create-role \
        --role-name "$LAMBDA_ROLE_NAME" \
        --assume-role-policy-document "$trust_policy" \
        --description "Role for newsletter subscription Lambda function" \
        &> /dev/null
    
    print_success "IAM role created"
    
    # Attach basic Lambda execution policy
    print_info "Attaching basic Lambda execution policy"
    aws iam attach-role-policy \
        --role-name "$LAMBDA_ROLE_NAME" \
        --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole" \
        &> /dev/null
    
    # Attach SES full access policy
    print_info "Attaching SES full access policy"
    aws iam attach-role-policy \
        --role-name "$LAMBDA_ROLE_NAME" \
        --policy-arn "arn:aws:iam::aws:policy/AmazonSESFullAccess" \
        &> /dev/null
    
    print_success "IAM policies attached"
    
    # Wait for role to be available
    print_info "Waiting for IAM role to be available..."
    sleep 5
}

# Function to get IAM role ARN
get_role_arn() {
    local account_id=$(aws sts get-caller-identity --query Account --output text --region "$AWS_REGION")
    echo "arn:aws:iam::${account_id}:role/${LAMBDA_ROLE_NAME}"
}

# Function to create Lambda function
create_lambda_function() {
    print_info "Creating Lambda function: $LAMBDA_FUNCTION_NAME"
    
    local lambda_code=$(get_lambda_code_path)
    local role_arn=$(get_role_arn)
    
    # Check if function already exists
    if aws lambda get-function --function-name "$LAMBDA_FUNCTION_NAME" --region "$AWS_REGION" &> /dev/null; then
        print_warning "Lambda function $LAMBDA_FUNCTION_NAME already exists, updating code..."
        
        # Create deployment package
        print_info "Creating deployment package..."
        # Use Windows-compatible temp directory
        if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$(uname -s)" == "MINGW"* ]]; then
            local package_dir=$(pwd)/.lambda-package-$$
        else
            local package_dir=$(mktemp -d)
        fi
        mkdir -p "$package_dir"
        local package_file="$package_dir/function.zip"
        
        # Copy Lambda code to package directory and rename to index.js
        cp "$lambda_code" "$package_dir/index.js"
        
        # Create zip file using available method
        create_zip_file "$package_dir/index.js" "$package_file"
        
        # Convert to Windows path for AWS CLI
        local abs_package_file
        if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$(uname -s)" == "MINGW"* ]]; then
            # On Windows/Git Bash, MUST convert MSYS path to Windows path
            if command -v cygpath &> /dev/null; then
                abs_package_file=$(cygpath -w "$package_file" 2>&1 | tr -d '\n\r')
                if [[ ! "$abs_package_file" =~ ^[A-Za-z]: ]]; then
                    print_error "cygpath conversion failed. Output: $abs_package_file"
                    rm -rf "$package_dir"
                    exit 1
                fi
            else
                print_error "cygpath not found - cannot convert path for AWS CLI"
                rm -rf "$package_dir"
                exit 1
            fi
        else
            abs_package_file=$(realpath "$package_file" 2>/dev/null || readlink -f "$package_file" 2>/dev/null || echo "$package_file")
        fi
        
        # Update function code
        if ! aws lambda update-function-code \
            --function-name "$LAMBDA_FUNCTION_NAME" \
            --zip-file "fileb://$abs_package_file" \
            --region "$AWS_REGION"; then
            print_error "Failed to update Lambda function code"
            rm -rf "$package_dir"
            exit 1
        fi
        
        # Cleanup
        rm -rf "$package_dir"
        
        # Update environment variables
        aws lambda update-function-configuration \
            --function-name "$LAMBDA_FUNCTION_NAME" \
            --environment "Variables={FROM_EMAIL=$FROM_EMAIL,REPLY_TO_EMAIL=$REPLY_TO_EMAIL,ALLOWED_ORIGIN=$ALLOWED_ORIGIN,AWS_REGION=$AWS_REGION}" \
            --timeout 10 \
            --region "$AWS_REGION" \
            &> /dev/null
        
        print_success "Lambda function updated"
        return
    fi
    
    # Create deployment package
    print_info "Creating deployment package..."
    # Use Windows-compatible temp directory
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$(uname -s)" == "MINGW"* ]]; then
        local package_dir=$(pwd)/.lambda-package-$$
    else
        local package_dir=$(mktemp -d)
    fi
    mkdir -p "$package_dir"
    local package_file="$package_dir/function.zip"
    
    # Copy Lambda code to package directory and rename to index.js for handler
    cp "$lambda_code" "$package_dir/index.js"
    
    # Create zip file using available method
    create_zip_file "$package_dir/index.js" "$package_file"
    
    # Create Lambda function
    print_info "Deploying Lambda function..."
    
    # Verify zip file was created
    if [[ ! -f "$package_file" ]]; then
        print_error "Zip file was not created: $package_file"
        exit 1
    fi
    
    local zip_size=$(stat -f%z "$package_file" 2>/dev/null || stat -c%s "$package_file" 2>/dev/null || echo "0")
    if [[ "$zip_size" -eq 0 ]]; then
        print_error "Zip file is empty: $package_file"
        exit 1
    fi
    print_info "Zip file created successfully (size: ${zip_size} bytes)"
    
    # Convert to Windows path for AWS CLI (important on Windows)
    local abs_package_file
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$(uname -s)" == "MINGW"* ]]; then
        # On Windows/Git Bash, convert MSYS path to Windows path
        # Try cygpath first (Git Bash includes this - REQUIRED for AWS CLI on Windows)
        if command -v cygpath &> /dev/null; then
            abs_package_file=$(cygpath -w "$package_file" 2>&1 | tr -d '\n\r')
            # Verify conversion worked (should start with drive letter like C:)
            if [[ ! "$abs_package_file" =~ ^[A-Za-z]: ]]; then
                print_error "cygpath conversion failed!"
                print_error "Input: $package_file"
                print_error "Output: $abs_package_file"
                exit 1
            fi
        else
            print_error "cygpath command not found!"
            print_error "Git Bash should include cygpath. Please check your installation."
            exit 1
        fi
        print_info "Path converted: $package_file -> $abs_package_file"
    else
        abs_package_file=$(realpath "$package_file" 2>/dev/null || readlink -f "$package_file" 2>/dev/null || echo "$package_file")
    fi
    
    print_info "Using zip file (Windows path): $abs_package_file"
    
    # Verify the file exists in Windows path format (for debugging)
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$(uname -s)" == "MINGW"* ]]; then
        # Test if Windows can see the file
        if ! powershell.exe -Command "Test-Path '$abs_package_file'" 2>/dev/null | grep -q "True"; then
            print_warning "Windows path verification failed, but continuing anyway..."
        fi
    fi
    
    # Create Lambda function
    if ! aws lambda create-function \
        --function-name "$LAMBDA_FUNCTION_NAME" \
        --runtime nodejs18.x \
        --role "$role_arn" \
        --handler index.handler \
        --zip-file "fileb://$abs_package_file" \
        --timeout 10 \
        --memory-size 256 \
        --environment "Variables={FROM_EMAIL=$FROM_EMAIL,REPLY_TO_EMAIL=$REPLY_TO_EMAIL,ALLOWED_ORIGIN=$ALLOWED_ORIGIN,AWS_REGION=$AWS_REGION}" \
        --description "Newsletter subscription handler - sends welcome emails via SES" \
        --region "$AWS_REGION"; then
        print_error "Failed to create Lambda function"
        print_info "Zip file location: $abs_package_file"
        print_info "Checking if file exists:"
        ls -la "$abs_package_file" 2>/dev/null || echo "File not found at: $abs_package_file"
        rm -rf "$package_dir"
        exit 1
    fi
    
    # Cleanup - only after successful creation
    rm -rf "$package_dir"
    
    print_success "Lambda function created"
    
    # Verify function was created
    sleep 2
    if aws lambda get-function --function-name "$LAMBDA_FUNCTION_NAME" --region "$AWS_REGION" &> /dev/null; then
        print_success "Lambda function verified and ready"
    else
        print_warning "Lambda function created but verification failed - it may still be initializing"
    fi
}

# Function to fix Lambda handler name (not needed since we use index.js)
fix_lambda_handler() {
    # Handler is already set to index.handler, no fix needed
    print_info "Lambda handler configured correctly"
}

# Function to create API Gateway
create_api_gateway() {
    print_info "Creating API Gateway: $API_NAME"
    
    # Check if API already exists
    local api_id=$(aws apigateway get-rest-apis --query "items[?name=='$API_NAME'].id" --output text --region "$AWS_REGION" 2>/dev/null || echo "")
    
    if [[ -n "$api_id" && "$api_id" != "None" ]]; then
        print_warning "API Gateway $API_NAME already exists (ID: $api_id)"
        API_ID="$api_id"
        return
    fi
    
    # Create REST API
    API_ID=$(aws apigateway create-rest-api \
        --name "$API_NAME" \
        --description "REST API for newsletter subscription" \
        --endpoint-configuration types=REGIONAL \
        --region "$AWS_REGION" \
        --query 'id' \
        --output text)
    
    print_success "API Gateway created (ID: $API_ID)"
    
    # Get root resource ID
    ROOT_RESOURCE_ID=$(aws apigateway get-resources \
        --rest-api-id "$API_ID" \
        --region "$AWS_REGION" \
        --query 'items[?path==`/`].id' \
        --output text)
    
    # Create /subscribe resource
    print_info "Creating /subscribe resource"
    SUBSCRIBE_RESOURCE_ID=$(aws apigateway create-resource \
        --rest-api-id "$API_ID" \
        --parent-id "$ROOT_RESOURCE_ID" \
        --path-part "subscribe" \
        --region "$AWS_REGION" \
        --query 'id' \
        --output text)
    
    print_success "Resource /subscribe created"
    
    # Create POST method
    print_info "Creating POST method"
    aws apigateway put-method \
        --rest-api-id "$API_ID" \
        --resource-id "$SUBSCRIBE_RESOURCE_ID" \
        --http-method POST \
        --authorization-type NONE \
        --region "$AWS_REGION" \
        &> /dev/null
    
    # Get Lambda function ARN
    local lambda_arn=$(aws lambda get-function \
        --function-name "$LAMBDA_FUNCTION_NAME" \
        --region "$AWS_REGION" \
        --query 'Configuration.FunctionArn' \
        --output text)
    
    # Set up Lambda integration
    print_info "Setting up Lambda integration"
    aws apigateway put-integration \
        --rest-api-id "$API_ID" \
        --resource-id "$SUBSCRIBE_RESOURCE_ID" \
        --http-method POST \
        --type AWS_PROXY \
        --integration-http-method POST \
        --uri "arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/${lambda_arn}/invocations" \
        --region "$AWS_REGION" \
        &> /dev/null
    
    # Configure CORS
    print_info "Configuring CORS"
    aws apigateway put-method-response \
        --rest-api-id "$API_ID" \
        --resource-id "$SUBSCRIBE_RESOURCE_ID" \
        --http-method OPTIONS \
        --status-code 200 \
        --response-parameters method.response.header.Access-Control-Allow-Headers=false,method.response.header.Access-Control-Allow-Methods=false,method.response.header.Access-Control-Allow-Origin=false \
        --region "$AWS_REGION" \
        &> /dev/null || true
    
    # Create OPTIONS method for CORS
    aws apigateway put-method \
        --rest-api-id "$API_ID" \
        --resource-id "$SUBSCRIBE_RESOURCE_ID" \
        --http-method OPTIONS \
        --authorization-type NONE \
        --region "$AWS_REGION" \
        &> /dev/null || true
    
    # Add CORS integration
    aws apigateway put-integration \
        --rest-api-id "$API_ID" \
        --resource-id "$SUBSCRIBE_RESOURCE_ID" \
        --http-method OPTIONS \
        --type MOCK \
        --request-templates '{"application/json":"{\"statusCode\":200}"}' \
        --region "$AWS_REGION" \
        &> /dev/null || true
    
    aws apigateway put-integration-response \
        --rest-api-id "$API_ID" \
        --resource-id "$SUBSCRIBE_RESOURCE_ID" \
        --http-method OPTIONS \
        --status-code 200 \
        --response-parameters '{"method.response.header.Access-Control-Allow-Headers":"'"'"'Content-Type,Authorization'"'"'","method.response.header.Access-Control-Allow-Methods":"'"'"'OPTIONS,POST'"'"'","method.response.header.Access-Control-Allow-Origin":"'"'"'*'"'"'"}' \
        --region "$AWS_REGION" \
        &> /dev/null || true
    
    print_success "CORS configured"
    
    # Add Lambda permission for API Gateway
    print_info "Adding Lambda permission for API Gateway"
    local lambda_arn=$(aws lambda get-function \
        --function-name "$LAMBDA_FUNCTION_NAME" \
        --region "$AWS_REGION" \
        --query 'Configuration.FunctionArn' \
        --output text)
    
    # Remove existing permission if it exists (ignore errors)
    aws lambda remove-permission \
        --function-name "$LAMBDA_FUNCTION_NAME" \
        --statement-id "apigateway-invoke" \
        --region "$AWS_REGION" \
        &> /dev/null || true
    
    aws lambda add-permission \
        --function-name "$LAMBDA_FUNCTION_NAME" \
        --statement-id "apigateway-invoke" \
        --action "lambda:InvokeFunction" \
        --principal "apigateway.amazonaws.com" \
        --source-arn "arn:aws:execute-api:${AWS_REGION}:*:${API_ID}/*/*" \
        --region "$AWS_REGION" \
        &> /dev/null || true
    
    print_success "Lambda permission configured"
}

# Function to deploy API Gateway
deploy_api_gateway() {
    print_info "Deploying API Gateway to stage: $API_STAGE"
    
    aws apigateway create-deployment \
        --rest-api-id "$API_ID" \
        --stage-name "$API_STAGE" \
        --description "Production deployment for newsletter API" \
        --region "$AWS_REGION" \
        &> /dev/null || \
    aws apigateway create-deployment \
        --rest-api-id "$API_ID" \
        --stage-name "$API_STAGE" \
        --description "Updated deployment" \
        --region "$AWS_REGION" \
        &> /dev/null
    
    print_success "API Gateway deployed"
    
    # Get API Gateway URL
    API_URL="https://${API_ID}.execute-api.${AWS_REGION}.amazonaws.com/${API_STAGE}/subscribe"
    print_success "API Gateway URL: $API_URL"
}

# Function to display summary and next steps
display_summary() {
    echo ""
    echo "============================================================================"
    print_success "Newsletter Backend Setup Complete!"
    echo "============================================================================"
    echo ""
    echo "Configuration Summary:"
    echo "  AWS Profile:        $AWS_PROFILE"
    echo "  AWS Region:         $AWS_REGION"
    echo "  Lambda Function:    $LAMBDA_FUNCTION_NAME"
    echo "  API Gateway:        $API_NAME"
    echo "  API Gateway URL:    $API_URL"
    echo "  From Email:         $FROM_EMAIL"
    echo "  Reply-To Email:     $REPLY_TO_EMAIL"
    echo ""
    echo "============================================================================"
    print_warning "MANUAL STEPS REQUIRED:"
    echo "============================================================================"
    echo ""
    echo "1. VERIFY EMAIL IN SES:"
    echo "   - Go to: https://console.aws.amazon.com/ses/?region=${AWS_REGION}"
    echo "   - Click 'Verified identities' → 'Create identity'"
    echo "   - Verify: $FROM_EMAIL"
    echo ""
    echo "2. REQUEST PRODUCTION ACCESS (if not done):"
    echo "   - In SES Console → 'Account dashboard'"
    echo "   - Click 'Request production access'"
    echo "   - Fill form and submit (takes 24-48 hours for approval)"
    echo ""
    echo "3. UPDATE FRONTEND CONFIG:"
    echo "   - Open: js/config.js"
    echo "   - Update API_ENDPOINT with: $API_URL"
    echo "   - Uncomment config script in index.html"
    echo ""
    echo "4. TEST THE API:"
    echo "   curl -X POST $API_URL \\"
    echo "     -H 'Content-Type: application/json' \\"
    echo "     -d '{\"email\":\"your-email@example.com\"}'"
    echo ""
    echo "============================================================================"
    echo ""
}

# Main execution
main() {
    echo ""
    echo "============================================================================"
    echo "Newsletter Backend Setup Script"
    echo "============================================================================"
    echo ""
    
    check_required_tools
    check_aws_credentials
    create_iam_role
    create_lambda_function
    fix_lambda_handler
    create_api_gateway
    deploy_api_gateway
    display_summary
}

# Run main function
main

