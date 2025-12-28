# Newsletter Backend Setup Script - README

## Overview

The `setup-newsletter-backend.sh` script automates the complete setup of AWS infrastructure for the newsletter email backend, including:

- ✅ IAM Role creation with SES permissions
- ✅ Lambda function deployment
- ✅ API Gateway REST API creation
- ✅ CORS configuration
- ✅ API deployment

## Prerequisites

1. **AWS CLI installed**
   ```bash
   # Windows (PowerShell)
   winget install Amazon.AWSCLI
   
   # macOS
   brew install awscli
   
   # Linux
   sudo apt-get install awscli
   ```

2. **AWS Profile configured**
   Add your AWS credentials to `~/.aws/credentials`:
   ```ini
   [your-profile-name]
   aws_access_key_id = YOUR_ACCESS_KEY_ID
   aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
   ```

3. **Required AWS Permissions**
   The AWS profile/user needs permissions for:
   - IAM (create roles, attach policies)
   - Lambda (create/update functions)
   - API Gateway (create APIs, deploy)
   - SES (read access to verify setup)

## Usage

### Basic Usage

```bash
./setup-newsletter-backend.sh --profile your-profile-name
```

### With Custom Options

```bash
./setup-newsletter-backend.sh \
  --profile production \
  --region us-west-2 \
  --from-email newsletter@example.com \
  --reply-to contact@example.com \
  --allowed-origin https://example.com
```

### All Options

```bash
./setup-newsletter-backend.sh \
  --profile PROFILE_NAME \          # Required: AWS profile name
  --region REGION \                 # Optional: AWS region (default: us-east-1)
  --from-email EMAIL \              # Optional: From email (default: newsletter@tranquilmindquest.com)
  --reply-to EMAIL \                # Optional: Reply-to email (default: contact@tranquilmindquest.com)
  --allowed-origin ORIGIN \         # Optional: CORS origin (default: *)
  --api-name NAME \                 # Optional: API Gateway name (default: newsletter-api)
  --lambda-name NAME \              # Optional: Lambda function name (default: newsletter-subscription-handler)
```

## Running on Windows

### Option 1: Git Bash (Recommended)

1. Install Git for Windows (includes Git Bash)
2. Right-click in the project folder → "Git Bash Here"
3. Run: `./setup-newsletter-backend.sh --profile your-profile`

### Option 2: WSL (Windows Subsystem for Linux)

1. Install WSL: `wsl --install`
2. Open WSL terminal
3. Navigate to project: `cd /mnt/c/Users/.../TranquilMindQuest-website-cursor/tranquilmindquest-website`
4. Run: `bash setup-newsletter-backend.sh --profile your-profile`

### Option 3: PowerShell with AWS Tools

The script uses standard AWS CLI commands, so you can also run the AWS commands manually in PowerShell if needed.

## What the Script Does

1. **Validates Prerequisites**
   - Checks AWS CLI installation
   - Verifies AWS credentials

2. **Creates IAM Role**
   - Creates `newsletter-lambda-role`
   - Attaches Lambda execution policy
   - Attaches SES full access policy

3. **Creates Lambda Function**
   - Packages the Lambda code
   - Deploys to AWS Lambda
   - Configures environment variables
   - Sets timeout and memory

4. **Creates API Gateway**
   - Creates REST API
   - Creates `/subscribe` resource
   - Creates POST method
   - Configures Lambda integration
   - Sets up CORS
   - Adds Lambda invoke permissions

5. **Deploys API**
   - Creates deployment to `prod` stage
   - Outputs API Gateway URL

## Manual Steps Still Required

After running the script, you **MUST** complete these manual steps:

### 1. Verify Email in SES ⚠️

```bash
# Go to SES Console
https://console.aws.amazon.com/ses/?region=us-east-1
```

Steps:
1. Click "Verified identities" → "Create identity"
2. Choose "Email address"
3. Enter your FROM_EMAIL (e.g., `newsletter@tranquilmindquest.com`)
4. Click verification link in email
5. Wait for verification status to show "Verified"

**Note:** Until email is verified, Lambda function will fail when sending emails.

### 2. Request Production Access (If Needed) ⚠️

By default, SES is in "Sandbox" mode and can only send to verified emails.

To send to any email address:
1. Go to SES Console → "Account dashboard"
2. Click "Request production access"
3. Fill out the form:
   - Mail Type: Transactional
   - Website URL: Your website URL
   - Use case: "Weekly wellness newsletter"
   - Expected volume: < 1000 emails/day
4. Submit and wait for approval (24-48 hours)

**Note:** You can test with verified emails in sandbox mode while waiting.

### 3. Update Frontend Configuration ⚠️

1. Open `js/config.js`
2. Replace `YOUR_API_ID` with the API Gateway URL from script output:
   ```javascript
   API_ENDPOINT: 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/subscribe'
   ```
3. Uncomment the config script in `index.html`:
   ```html
   <script src="./js/config.js"></script>
   ```

### 4. Test the API

```bash
# Test the API endpoint
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/subscribe \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Subscription confirmed! Please check your email for confirmation."
}
```

## Troubleshooting

### Error: "AWS credentials not configured"

**Solution:** Check your `~/.aws/credentials` file:
```bash
cat ~/.aws/credentials
```

Make sure your profile name matches what you're using in `--profile`.

### Error: "Access Denied" when creating IAM role

**Solution:** Ensure your AWS user has IAM permissions. Add these policies:
- `IAMFullAccess` (or custom policy with create-role permissions)
- `LambdaFullAccess`
- `AmazonAPIGatewayAdministrator`
- `AmazonSESFullAccess` (read-only is OK)

### Error: "Email address not verified" in Lambda logs

**Solution:** Complete Manual Step #1 above - verify your email in SES.

### Lambda function not found

**Solution:** The script creates the function, but AWS sometimes takes a few seconds. Wait 10-15 seconds and try again, or check the Lambda console.

### API Gateway CORS errors

**Solution:** The script configures CORS, but you may need to redeploy:
```bash
# Get your API ID from the script output, then:
aws apigateway create-deployment \
  --rest-api-id YOUR_API_ID \
  --stage-name prod \
  --profile your-profile
```

## Output

The script will output:
- API Gateway URL (save this!)
- Configuration summary
- List of manual steps required

Example output:
```
[SUCCESS] Newsletter Backend Setup Complete!
============================================================================

Configuration Summary:
  AWS Profile:        production
  AWS Region:         us-east-1
  Lambda Function:    newsletter-subscription-handler
  API Gateway:        newsletter-api
  API Gateway URL:    https://abc123.execute-api.us-east-1.amazonaws.com/prod/subscribe
  From Email:         newsletter@tranquilmindquest.com
  Reply-To Email:     contact@tranquilmindquest.com
```

## Cleanup (If Needed)

To remove all created resources:

```bash
# Delete API Gateway
aws apigateway delete-rest-api \
  --rest-api-id YOUR_API_ID \
  --profile your-profile

# Delete Lambda function
aws lambda delete-function \
  --function-name newsletter-subscription-handler \
  --profile your-profile

# Delete IAM role
aws iam detach-role-policy \
  --role-name newsletter-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \
  --profile your-profile

aws iam detach-role-policy \
  --role-name newsletter-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonSESFullAccess \
  --profile your-profile

aws iam delete-role \
  --role-name newsletter-lambda-role \
  --profile your-profile
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review AWS CloudWatch logs for Lambda function
3. Check API Gateway logs in CloudWatch
4. Verify all manual steps are completed

