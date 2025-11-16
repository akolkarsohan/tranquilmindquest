#!/bin/bash

# ===== TranquilMindQuest AWS Deployment Script =====
# This script automates the deployment of the website to AWS S3 and CloudFront
# 
# Prerequisites:
# - AWS CLI installed and configured
# - Appropriate IAM permissions
# - S3 bucket created and configured
# - CloudFront distribution set up
#
# Usage: ./deploy.sh [options]
# Options:
#   --bucket BUCKET_NAME     Specify S3 bucket name
#   --distribution DIST_ID    Specify CloudFront distribution ID
#   --dry-run               Show what would be uploaded without actually doing it
#   --help                  Show this help message

# ===== CONFIGURATION VARIABLES =====
# Change these values to match your AWS setup

# Default values (override with command line arguments)
DEFAULT_BUCKET_NAME="tranquilmindquest.com"
DEFAULT_DISTRIBUTION_ID=""
DEFAULT_AWS_REGION="us-east-1"

# Set variables from command line or use defaults
BUCKET_NAME="${DEFAULT_BUCKET_NAME}"
DISTRIBUTION_ID="${DEFAULT_DISTRIBUTION_ID}"
AWS_REGION="${DEFAULT_AWS_REGION}"
DRY_RUN=false

# File exclusions (files/folders to not upload)
EXCLUDE_PATTERNS=(
    ".git/*"
    "*.md"
    "deploy.sh"
    ".gitignore"
    "README-DEPLOYMENT.md"
    "s3-bucket-policy.json"
    "cloudfront-config.txt"
    ".DS_Store"
    "Thumbs.db"
    "*.tmp"
    "*.log"
)

# ===== FUNCTIONS =====

# Function to display help message
show_help() {
    cat << EOF
TranquilMindQuest AWS Deployment Script

USAGE:
    ./deploy.sh [OPTIONS]

OPTIONS:
    --bucket BUCKET_NAME       S3 bucket name (default: $DEFAULT_BUCKET_NAME)
    --distribution DIST_ID     CloudFront distribution ID
    --region REGION           AWS region (default: $DEFAULT_AWS_REGION)
    --dry-run                 Show what would be uploaded without doing it
    --help                    Show this help message

EXAMPLES:
    ./deploy.sh
    ./deploy.sh --bucket my-bucket --distribution E1234567890ABC
    ./deploy.sh --dry-run

PREREQUISITES:
    - AWS CLI installed and configured
    - S3 bucket created and configured for static website hosting
    - CloudFront distribution set up
    - Appropriate IAM permissions

EOF
}

# Function to log messages with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Function to check if AWS CLI is installed
check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        log "ERROR: AWS CLI is not installed. Please install it first."
        log "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    fi
}

# Function to check AWS credentials
check_aws_credentials() {
    if ! aws sts get-caller-identity &> /dev/null; then
        log "ERROR: AWS credentials not configured or invalid."
        log "Run 'aws configure' to set up your credentials."
        exit 1
    fi
}

# Function to check if S3 bucket exists
check_s3_bucket() {
    if ! aws s3 ls "s3://$BUCKET_NAME" &> /dev/null; then
        log "ERROR: S3 bucket '$BUCKET_NAME' does not exist or is not accessible."
        log "Please create the bucket first or check your permissions."
        exit 1
    fi
}

# Function to build exclude string for AWS CLI
build_exclude_string() {
    local exclude_string=""
    for pattern in "${EXCLUDE_PATTERNS[@]}"; do
        exclude_string+=" --exclude '$pattern'"
    done
    echo "$exclude_string"
}

# Function to upload files to S3
upload_to_s3() {
    local exclude_string=$(build_exclude_string)
    
    log "Starting upload to S3 bucket: $BUCKET_NAME"
    
    if [ "$DRY_RUN" = true ]; then
        log "DRY RUN: Would upload files with exclusions: $exclude_string"
        aws s3 sync . "s3://$BUCKET_NAME" $exclude_string --dryrun
    else
        # Sync files to S3
        aws s3 sync . "s3://$BUCKET_NAME" $exclude_string
        
        if [ $? -eq 0 ]; then
            log "✅ Files uploaded successfully to S3"
        else
            log "❌ Error uploading files to S3"
            exit 1
        fi
    fi
}

# Function to set proper MIME types
set_mime_types() {
    if [ "$DRY_RUN" = true ]; then
        log "DRY RUN: Would set MIME types for HTML, CSS, and JS files"
        return
    fi
    
    log "Setting proper MIME types..."
    
    # Set MIME type for HTML files
    aws s3 cp "s3://$BUCKET_NAME" "s3://$BUCKET_NAME" \
        --recursive \
        --metadata-directive REPLACE \
        --content-type "text/html" \
        --exclude "*" \
        --include "*.html" \
        --quiet
    
    # Set MIME type for CSS files
    aws s3 cp "s3://$BUCKET_NAME" "s3://$BUCKET_NAME" \
        --recursive \
        --metadata-directive REPLACE \
        --content-type "text/css" \
        --exclude "*" \
        --include "*.css" \
        --quiet
    
    # Set MIME type for JavaScript files
    aws s3 cp "s3://$BUCKET_NAME" "s3://$BUCKET_NAME" \
        --recursive \
        --metadata-directive REPLACE \
        --content-type "application/javascript" \
        --exclude "*" \
        --include "*.js" \
        --quiet
    
    # Set MIME type for JSON files
    aws s3 cp "s3://$BUCKET_NAME" "s3://$BUCKET_NAME" \
        --recursive \
        --metadata-directive REPLACE \
        --content-type "application/json" \
        --exclude "*" \
        --include "*.json" \
        --quiet
    
    # Set MIME type for XML files
    aws s3 cp "s3://$BUCKET_NAME" "s3://$BUCKET_NAME" \
        --recursive \
        --metadata-directive REPLACE \
        --content-type "application/xml" \
        --exclude "*" \
        --include "*.xml" \
        --quiet
    
    # Set MIME type for TXT files
    aws s3 cp "s3://$BUCKET_NAME" "s3://$BUCKET_NAME" \
        --recursive \
        --metadata-directive REPLACE \
        --content-type "text/plain" \
        --exclude "*" \
        --include "*.txt" \
        --quiet
    
    log "✅ MIME types set successfully"
}

# Function to invalidate CloudFront cache
invalidate_cloudfront() {
    if [ -z "$DISTRIBUTION_ID" ]; then
        log "⚠️  CloudFront distribution ID not provided. Skipping cache invalidation."
        log "To enable cache invalidation, run: ./deploy.sh --distribution YOUR_DISTRIBUTION_ID"
        return
    fi
    
    if [ "$DRY_RUN" = true ]; then
        log "DRY RUN: Would invalidate CloudFront cache for distribution: $DISTRIBUTION_ID"
        return
    fi
    
    log "Invalidating CloudFront cache for distribution: $DISTRIBUTION_ID"
    
    aws cloudfront create-invalidation \
        --distribution-id "$DISTRIBUTION_ID" \
        --paths "/*"
    
    if [ $? -eq 0 ]; then
        log "✅ CloudFront cache invalidation initiated"
        log "Note: Cache invalidation may take 10-15 minutes to complete"
    else
        log "❌ Error invalidating CloudFront cache"
        exit 1
    fi
}

# Function to verify deployment
verify_deployment() {
    if [ "$DRY_RUN" = true ]; then
        log "DRY RUN: Would verify deployment by checking key files"
        return
    fi
    
    log "Verifying deployment..."
    
    # Check if key files exist
    local key_files=("index.html" "about.html" "contact.html" "products.html" "blog.html")
    
    for file in "${key_files[@]}"; do
        if aws s3 ls "s3://$BUCKET_NAME/$file" &> /dev/null; then
            log "✅ $file uploaded successfully"
        else
            log "❌ $file not found in S3 bucket"
        fi
    done
    
    # Check robots.txt and sitemap.xml
    if aws s3 ls "s3://$BUCKET_NAME/robots.txt" &> /dev/null; then
        log "✅ robots.txt uploaded successfully"
    else
        log "❌ robots.txt not found in S3 bucket"
    fi
    
    if aws s3 ls "s3://$BUCKET_NAME/sitemap.xml" &> /dev/null; then
        log "✅ sitemap.xml uploaded successfully"
    else
        log "❌ sitemap.xml not found in S3 bucket"
    fi
}

# Function to display deployment summary
show_summary() {
    log "=== DEPLOYMENT SUMMARY ==="
    log "Bucket: $BUCKET_NAME"
    log "Region: $AWS_REGION"
    log "Distribution ID: ${DISTRIBUTION_ID:-'Not provided'}"
    log "Dry Run: $DRY_RUN"
    log "=========================="
}

# Function to parse command line arguments
parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            --bucket)
                BUCKET_NAME="$2"
                shift 2
                ;;
            --distribution)
                DISTRIBUTION_ID="$2"
                shift 2
                ;;
            --region)
                AWS_REGION="$2"
                shift 2
                ;;
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            --help)
                show_help
                exit 0
                ;;
            *)
                log "Unknown option: $1"
                log "Use --help for usage information"
                exit 1
                ;;
        esac
    done
}

# Function to run pre-deployment checks
run_checks() {
    log "Running pre-deployment checks..."
    
    check_aws_cli
    check_aws_credentials
    check_s3_bucket
    
    log "✅ All checks passed"
}

# Function to cleanup on exit
cleanup() {
    log "Deployment script completed"
}

# ===== MAIN SCRIPT =====

# Set up signal handlers
trap cleanup EXIT

# Parse command line arguments
parse_arguments "$@"

# Display deployment summary
show_summary

# Run pre-deployment checks
run_checks

# Upload files to S3
upload_to_s3

# Set proper MIME types
set_mime_types

# Invalidate CloudFront cache
invalidate_cloudfront

# Verify deployment
verify_deployment

# Final success message
if [ "$DRY_RUN" = true ]; then
    log "🎉 Dry run completed successfully!"
    log "Run without --dry-run to perform actual deployment"
else
    log "🎉 Deployment completed successfully!"
    log "Your website should be live at: https://$BUCKET_NAME"
    
    if [ -n "$DISTRIBUTION_ID" ]; then
        log "CloudFront cache invalidation is in progress"
        log "Changes may take 10-15 minutes to appear globally"
    fi
fi

# ===== ADDITIONAL NOTES =====
#
# CUSTOMIZATION INSTRUCTIONS:
#
# 1. Update DEFAULT_BUCKET_NAME to match your S3 bucket
# 2. Update DEFAULT_DISTRIBUTION_ID to match your CloudFront distribution
# 3. Modify EXCLUDE_PATTERNS array to exclude additional files/folders
# 4. Add additional MIME types in set_mime_types() function
#
# USAGE EXAMPLES:
#
# Basic deployment:
#   ./deploy.sh
#
# Deployment with CloudFront invalidation:
#   ./deploy.sh --distribution E1234567890ABC
#
# Dry run to see what would be uploaded:
#   ./deploy.sh --dry-run
#
# Custom bucket and distribution:
#   ./deploy.sh --bucket my-custom-bucket --distribution E1234567890ABC
#
# AUTOMATION:
#
# To automate deployments:
# 1. Set up AWS credentials as environment variables
# 2. Add this script to your CI/CD pipeline
# 3. Run the script after code changes
# 4. Consider using AWS CodePipeline for full automation
#
# MONITORING:
#
# After deployment:
# 1. Check CloudWatch metrics for S3 and CloudFront
# 2. Monitor costs in AWS Cost Explorer
# 3. Set up CloudWatch alarms for errors
# 4. Use AWS X-Ray for performance monitoring
#
# TROUBLESHOOTING:
#
# Common issues:
# 1. Permission denied: Check IAM permissions
# 2. Bucket not found: Verify bucket name and region
# 3. CloudFront errors: Check distribution configuration
# 4. MIME type issues: Verify file extensions and content types
#
# SECURITY:
#
# Best practices:
# 1. Use IAM roles instead of access keys when possible
# 2. Limit permissions to minimum required
# 3. Enable S3 bucket versioning
# 4. Use CloudFront signed URLs for private content
# 5. Enable AWS CloudTrail for audit logging
#






