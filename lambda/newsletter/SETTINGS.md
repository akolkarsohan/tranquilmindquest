# Configuration Settings - Newsletter Lambda Function

This document explains all configuration options for the newsletter Lambda function.

---

## ⚙️ Environment Variables

These can be set in Lambda Console → Configuration → Environment variables

**Note**: `AWS_REGION` is automatically provided by Lambda runtime and cannot be set manually. The function automatically uses the region where it's deployed.

### Required Settings

#### `FROM_EMAIL`
- **Description**: Verified sender email address in SES
- **Default**: `newsletter@tranquilmindquest.com`
- **Example**: `newsletter@yourdomain.com`
- **Important**: Must be verified in SES Console

#### `REPLY_TO_EMAIL`
- **Description**: Reply-to email address for newsletters
- **Default**: `contact@tranquilmindquest.com`
- **Example**: `contact@yourdomain.com`

### Optional Settings

#### `ALLOWED_ORIGIN`
- **Description**: CORS allowed origin header
- **Default**: `*` (allows all origins)
- **Example**: `https://tranquilmindquest.com`
- **Production**: Should be set to your actual domain for security

---

## 🔧 Runtime Configuration

### Recommended Settings

| Setting | Value | Reason |
|---------|-------|--------|
| **Runtime** | Python 3.11 or 3.12 | Latest stable Python versions |
| **Handler** | `lambda_function.lambda_handler` | Standard Lambda handler format |
| **Timeout** | 30 seconds | Enough time for email sending |
| **Memory** | 128 MB | Sufficient for this function |
| **Architecture** | x86_64 | Standard architecture |

---

## 📧 Email Configuration

### Sender Email Verification

Before the function can send emails:

1. Go to **AWS SES Console**: https://console.aws.amazon.com/ses/
2. Region: **ap-south-1** (or your region)
3. **Verified identities** → **Create identity**
4. Choose **Email address**
5. Enter: `newsletter@tranquilmindquest.com`
6. Click **Create identity**
7. Check email and click verification link

### Domain Verification (Alternative)

For production, verify your entire domain:

1. **Verified identities** → **Create identity**
2. Choose **Domain**
3. Enter: `tranquilmindquest.com`
4. Add DNS records to your domain
5. Wait for verification

---

## 🔐 IAM Permissions

The Lambda execution role needs these permissions:

### Minimum Required Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

### Recommended Policy (Easier):

Attach the managed policy: **`AmazonSESFullAccess`**

This gives the function full access to SES (necessary for sending emails).

---

## 🌐 CORS Configuration

The function includes CORS headers for browser requests.

### Current Configuration:

```python
headers = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,  # From environment variable
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
}
```

### For Production:

Set `ALLOWED_ORIGIN` to your actual domain:
```
ALLOWED_ORIGIN = https://tranquilmindquest.com
```

This prevents unauthorized websites from using your API.

---

## 📊 Monitoring

### CloudWatch Logs

All logs are automatically sent to CloudWatch:

1. **Log Group**: `/aws/lambda/newsletter-subscription-handler`
2. **View Logs**: Lambda Console → Monitor → View CloudWatch logs
3. **Search**: Filter by "ERROR" to find issues

### Key Log Messages

- `Email sent successfully: {messageId}` - Success
- `AWS SES Error: {error}` - SES-related errors
- `Error processing subscription: {error}` - General errors

---

## 🔍 Validation Rules

### Email Validation

The function validates emails using regex:
- Format: `name@domain.extension`
- Example: `user@example.com`

Invalid emails return:
```json
{
  "success": false,
  "error": "Invalid email address format"
}
```

### Required Fields

- `email` (string) - Required
- `name` (string) - Optional, defaults to email username

---

## 🧪 Testing Configuration

### Test Event Format

```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"test@example.com\",\"name\":\"Test User\"}"
}
```

### Expected Success Response

```json
{
  "statusCode": 200,
  "headers": {
    "Access-Control-Allow-Origin": "*",
    ...
  },
  "body": "{\"success\": true, \"message\": \"Subscription confirmed! Please check your email for confirmation.\", \"messageId\": \"...\"}"
}
```

---

## 🚨 Error Handling

The function handles these errors:

| Error Code | Description | Response |
|------------|-------------|----------|
| `MessageRejected` | Invalid email address | 400 Bad Request |
| `MailFromDomainNotVerifiedException` | Sender not verified | 500 Internal Server Error |
| `ConfigurationSetDoesNotExistException` | Configuration error | 500 Internal Server Error |
| General exceptions | Unexpected errors | 500 Internal Server Error |

All errors are logged to CloudWatch for debugging.

---

## 📝 Code Customization

### Changing Email Template

Edit these functions in `lambda_function.py`:
- `create_welcome_email_html(name)` - HTML email template
- `create_welcome_email_text(name)` - Plain text email template

### Changing Validation Rules

Edit the validation section in `lambda_handler()`:
```python
email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
```

---

## ✅ Configuration Checklist

Before deploying, verify:

- [ ] Runtime: Python 3.11 or 3.12
- [ ] Handler: `lambda_function.lambda_handler`
- [ ] Timeout: 30 seconds
- [ ] Memory: 128 MB
- [ ] Environment variables set
- [ ] SES email verified
- [ ] IAM permissions configured
- [ ] Test event succeeds

---

For deployment instructions, see **`DEPLOY.md`**

