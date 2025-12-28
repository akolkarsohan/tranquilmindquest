# Python Lambda Function Setup Guide

## ✅ Why Python?

Python is an excellent choice for AWS Lambda because:
- **boto3 (AWS SDK) is included** by default - no dependencies needed!
- Works perfectly in **all AWS regions** including ap-south-1 (Mumbai)
- All Python runtimes (3.9, 3.10, 3.11, 3.12) are supported
- Clean, readable code
- No module/package issues

---

## 🚀 Quick Setup Steps

### Step 1: Create/Update Lambda Function

1. **Go to AWS Lambda Console**: https://console.aws.amazon.com/lambda/
2. **Region**: Make sure you're in **ap-south-1** (Mumbai)
3. Either:
   - **Edit existing function** `newsletter-subscription-handler`
   - OR **Create new function** (if starting fresh)

### Step 2: Configure Runtime

1. Go to **Configuration** → **General configuration** → **Edit**
2. **Runtime**: Select **Python 3.11** or **Python 3.12** (both work great)
3. **Handler**: Should be `lambda_function.lambda_handler`
   - This means: file `lambda_function.py`, function `lambda_handler`
4. Click **Save**

### Step 3: Upload Python Code

1. Go to **Code** tab
2. **Delete** any existing code files
3. Click **"Upload from"** → **".zip file"** (if you have a zip)
   - OR **"Create file"** → name it `lambda_function.py`
4. **Copy and paste** the code from `aws/lambda-newsletter-handler.py` in this project
5. **Important**: If you created a new file, rename it to `lambda_function.py`
6. Click **"Deploy"**

### Step 4: Verify Handler Name

1. Go to **Configuration** → **General configuration**
2. **Handler** should be: `lambda_function.lambda_handler`
   - File: `lambda_function.py`
   - Function: `lambda_handler`

---

## 📝 Code Location

The Python code is in: **`aws/lambda-newsletter-handler.py`**

**Important**: When uploading to Lambda:
- **File name must be**: `lambda_function.py`
- **Handler setting**: `lambda_function.lambda_handler`

---

## ⚙️ Environment Variables (Optional but Recommended)

1. Go to **Configuration** → **Environment variables** → **Edit**
2. Add these variables:

```
AWS_REGION = ap-south-1
FROM_EMAIL = newsletter@tranquilmindquest.com
REPLY_TO_EMAIL = contact@tranquilmindquest.com
ALLOWED_ORIGIN = *
```

3. Click **Save**

---

## 🔧 Basic Settings

1. **Configuration** → **General configuration** → **Edit**
2. Set:
   - **Timeout**: **30 seconds** (recommended)
   - **Memory**: **128 MB** (sufficient)
3. Click **Save**

---

## 🧪 Test the Function

### Test Event in Lambda Console:

1. Click **"Test"** button
2. Create a new test event
3. Use this JSON:

```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"test@example.com\"}"
}
```

4. Click **"Test"**
5. You should see a successful response!

### Expected Success Response:

```json
{
  "statusCode": 200,
  "headers": {
    "Access-Control-Allow-Origin": "*",
    ...
  },
  "body": "{\"success\": true, \"message\": \"Subscription confirmed! Please check your email for confirmation.\", ...}"
}
```

---

## 🔗 Update API Gateway

If you're updating an existing function:

1. **No changes needed** in API Gateway!
2. API Gateway will automatically use the updated Lambda function
3. Just test your API endpoint again

---

## ✅ Advantages of Python Version

1. ✅ **No dependency issues** - boto3 is included
2. ✅ **All regions supported** - works everywhere
3. ✅ **All Python versions work** - 3.9, 3.10, 3.11, 3.12
4. ✅ **Clean error handling** - easier to debug
5. ✅ **Better AWS integration** - boto3 is the official SDK

---

## 🐛 Troubleshooting

### Issue: "Cannot find module boto3"
- **This should NOT happen** - boto3 is included by default
- If it does, make sure you're using a Python runtime (not Node.js)

### Issue: Handler name error
- Make sure handler is: `lambda_function.lambda_handler`
- Make sure file is named: `lambda_function.py`

### Issue: Function not found
- Make sure the file exists in the Lambda code editor
- Check that the file name matches the handler

### Issue: Import errors
- boto3 is included - no imports needed
- If you see import errors, check for typos in the code

---

## 📊 Testing Checklist

After setup, verify:

- [ ] ✅ Function deploys successfully
- [ ] ✅ Test event returns 200 status
- [ ] ✅ Email is sent successfully (check SES)
- [ ] ✅ API Gateway endpoint works
- [ ] ✅ Browser test page works
- [ ] ✅ CloudWatch logs show success

---

## 🎉 You're Done!

Your Python Lambda function is now set up and ready to go!

**Next Steps:**
1. Test the function in Lambda Console
2. Test via API Gateway endpoint
3. Test using `test-newsletter-api.html` page
4. Check your email inbox for the welcome email!

---

## 📝 Quick Reference

- **File name**: `lambda_function.py`
- **Handler**: `lambda_function.lambda_handler`
- **Runtime**: Python 3.11 or 3.12
- **Code location**: `aws/lambda-newsletter-handler.py` in this project

