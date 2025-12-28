# Testing Guide - Newsletter Lambda Function

Complete guide to test your newsletter Lambda function.

---

## 🧪 Test Methods

### Method 1: Lambda Console Test (Quickest)

#### Step 1: Create Test Event

1. In Lambda Console → **Code** tab
2. Click **Test** button
3. **Create new test event**
4. Event name: `test-newsletter-subscription`
5. Use this JSON:

```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"your-email@example.com\"}"
}
```

6. Click **Save**

#### Step 2: Run Test

1. Click **Test** button again
2. Wait for execution to complete
3. Check the result:

**✅ Success Response:**
```json
{
  "statusCode": 200,
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
  "body": "{\"success\": true, \"message\": \"Subscription confirmed! Please check your email for confirmation.\", \"messageId\": \"0100018a-1234-5678-9abc-def012345678-000000\"}"
}
```

**❌ Error Response:**
- Check the error message
- See Troubleshooting section below

---

### Method 2: Test OPTIONS Request (CORS)

1. Create test event:

```json
{
  "httpMethod": "OPTIONS"
}
```

2. Run test
3. Should return:

```json
{
  "statusCode": 200,
  "headers": {
    "Access-Control-Allow-Origin": "*",
    ...
  },
  "body": ""
}
```

---

### Method 3: Test via API Gateway

If you have API Gateway connected:

1. Get your API Gateway URL (e.g., `https://abc123.execute-api.ap-south-1.amazonaws.com/prod/subscribe`)
2. Use browser or curl:

**Browser Console:**
```javascript
fetch('YOUR_API_GATEWAY_URL/subscribe', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: 'test@example.com' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

**cURL:**
```bash
curl -X POST https://YOUR_API_GATEWAY_URL/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

### Method 4: Test Page (Easiest)

Use the test page in the project:

1. Open `../../test-newsletter-api.html` in your browser
2. Enter your test email
3. Click "Test Subscription"
4. Check results

---

## ✅ Success Indicators

After a successful test:

1. ✅ **Lambda Response**: Status code 200, `success: true`
2. ✅ **CloudWatch Logs**: "Email sent successfully: {messageId}"
3. ✅ **SES Console**: Email appears in "Sent" statistics
4. ✅ **Email Inbox**: Welcome email received (check spam folder)

---

## 🐛 Troubleshooting

### Issue: "Email address is required"

**Problem**: Email field is missing or empty

**Solution**: 
- Check test event has `body` with valid JSON
- Verify email is in the request body

**Test Event:**
```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"test@example.com\"}"
}
```

---

### Issue: "Invalid email address format"

**Problem**: Email doesn't match required format

**Solution**: 
- Use valid email format: `name@domain.com`
- Check for extra spaces or special characters

---

### Issue: "Access Denied" or Permission Error

**Problem**: Lambda execution role lacks SES permissions

**Solution**:
1. Go to **Configuration** → **Permissions**
2. Click on **Execution role**
3. Add policy: **AmazonSESFullAccess**
4. Retry test

---

### Issue: "MessageRejected" - Email address not verified

**Problem**: Recipient email not verified (SES is in Sandbox mode)

**Error Message**: 
```
MessageRejected - Email address is not verified. 
The following identities failed the check: [email@example.com]
```

**Quick Fix (Testing)**:
1. Go to **SES Console** → **Verified identities**
2. **Create identity** → **Email address**
3. Enter the recipient email address you're testing with
4. Check email and click verification link
5. Test again - should work now!

**Proper Fix (Production)**:
1. Go to **SES Console** → **Account dashboard**
2. Click **"Request production access"**
3. Fill out the form and submit
4. Wait 24-48 hours for approval
5. Once approved, you can send to any email address!

**See `SETTINGS.md` for SES sandbox mode information and production access request.**

---

### Issue: "MailFromDomainNotVerifiedException"

**Problem**: Sender domain not verified

**Solution**:
- Verify the sender email in SES Console
- Check environment variable `FROM_EMAIL` is correct

---

### Issue: Function Timeout

**Problem**: Function takes too long to execute

**Solution**:
1. Increase timeout: **Configuration** → **General configuration** → **Timeout**
2. Set to **30 seconds**
3. Check CloudWatch logs for slow operations

---

### Issue: Handler Not Found

**Problem**: Handler name doesn't match function

**Solution**:
1. Verify handler: `lambda_function.lambda_handler`
2. Verify file name: `lambda_function.py`
3. Verify function name: `lambda_handler`

---

## 📊 CloudWatch Logs

View detailed logs:

1. **Lambda Console** → **Monitor** → **View CloudWatch logs**
2. OR **CloudWatch Console** → **Log groups** → `/aws/lambda/newsletter-subscription-handler`

### Useful Log Queries

**Find errors:**
```
ERROR
```

**Find successful sends:**
```
Email sent successfully
```

**Find specific email:**
```
test@example.com
```

---

## 🧪 Test Scenarios

### Test 1: Valid Email

**Input:**
```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"valid@example.com\"}"
}
```

**Expected**: ✅ Success (200)

---

### Test 2: Invalid Email Format

**Input:**
```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"invalid-email\"}"
}
```

**Expected**: ❌ Error (400) - "Invalid email address format"

---

### Test 3: Missing Email

**Input:**
```json
{
  "httpMethod": "POST",
  "body": "{}"
}
```

**Expected**: ❌ Error (400) - "Email address is required"

---

### Test 4: Email with Name

**Input:**
```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"user@example.com\",\"name\":\"John Doe\"}"
}
```

**Expected**: ✅ Success (200) - Email sent with personalized name

---

### Test 5: OPTIONS Request (CORS)

**Input:**
```json
{
  "httpMethod": "OPTIONS"
}
```

**Expected**: ✅ Success (200) - CORS headers returned

---

## ✅ Testing Checklist

Before considering deployment complete:

- [ ] ✅ Lambda test succeeds with valid email
- [ ] ✅ Lambda test fails correctly with invalid email
- [ ] ✅ OPTIONS request returns CORS headers
- [ ] ✅ CloudWatch logs show successful email send
- [ ] ✅ SES Console shows email in sent statistics
- [ ] ✅ Welcome email received in inbox (check spam)
- [ ] ✅ API Gateway endpoint works (if connected)
- [ ] ✅ Browser test page works (if frontend ready)

---

## 📝 Test Event Templates

### Basic Test Event

```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"test@example.com\"}"
}
```

### Test Event with Name

```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"test@example.com\",\"name\":\"Test User\"}"
}
```

### Test CORS (OPTIONS)

```json
{
  "httpMethod": "OPTIONS"
}
```

### Test Invalid Email

```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"not-an-email\"}"
}
```

---

For deployment instructions, see **`DEPLOY.md`**  
For configuration options, see **`SETTINGS.md`**

