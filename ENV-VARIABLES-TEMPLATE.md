# Environment Variables Template

This file documents all environment variables needed for the TranquilMindQuest project.

## Lambda Function Environment Variables

Set these in AWS Lambda Console → Configuration → Environment Variables

```bash
# AWS Region (usually auto-detected, but can be set explicitly)
AWS_REGION=ap-south-1
AWS_DEFAULT_REGION=ap-south-1

# Email Configuration
FROM_EMAIL=newsletter@tranquilmindquest.com
REPLY_TO_EMAIL=contact@tranquilmindquest.com

# CORS Configuration (CRITICAL - Security)
# Comma-separated list of allowed origins (no spaces between commas)
ALLOWED_ORIGINS=https://tranquilmindquest.com,https://www.tranquilmindquest.com
```

## Frontend Configuration

Update `js/config.js` with your API Gateway endpoint:

```javascript
const NEWSLETTER_CONFIG = {
    API_ENDPOINT: 'https://your-api-id.execute-api.ap-south-1.amazonaws.com/prod/subscribe',
    USE_FALLBACK: true,
    TIMEOUT: 10000
};
```

## Important Notes

1. **CORS Origins:** The `ALLOWED_ORIGINS` variable is critical for security. Only include trusted domains.
2. **Email Addresses:** Must be verified in AWS SES before use.
3. **API Endpoint:** Get this from API Gateway console after deployment.

## Security Best Practices

- Never commit actual environment variables to version control
- Use AWS Systems Manager Parameter Store or Secrets Manager for sensitive values
- Rotate API keys regularly
- Monitor CloudWatch logs for suspicious activity

