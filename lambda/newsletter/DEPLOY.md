# Deployment Guide - Newsletter Lambda Function

Complete step-by-step guide to deploy the newsletter subscription Lambda function.

---

## 📋 Prerequisites

- AWS Account with access to Lambda, SES, and API Gateway
- SES email address verified (e.g., `newsletter@tranquilmindquest.com`)
- Lambda execution role with SES permissions

---

## 🚀 Deployment Steps

### Step 1: Create Lambda Function

1. **Go to AWS Lambda Console**
   - URL: https://console.aws.amazon.com/lambda/
   - **Region**: Select **ap-south-1** (Mumbai)

2. **Create Function** (if new) or **Open Existing Function**
   - Function name: `newsletter-subscription-handler`
   - Runtime: **Python 3.11** or **Python 3.12**
   - Architecture: x86_64

3. Click **Create function** (or skip if editing existing)

---

### Step 2: Configure Basic Settings

1. Go to **Configuration** → **General configuration** → **Edit**

2. Set the following:
   - **Runtime**: Python 3.11 (or 3.12)
   - **Handler**: `lambda_function.lambda_handler`
   - **Timeout**: **30 seconds**
   - **Memory**: **128 MB**

3. Click **Save**

---

### Step 3: Upload Function Code

#### Option A: Copy-Paste Method (Easiest)

1. Open **`lambda_function.py`** from this folder
2. **Select all** (Ctrl+A / Cmd+A)
3. **Copy** (Ctrl+C / Cmd+C)
4. In Lambda Console → **Code** tab
5. **Delete** any existing code in the editor
6. **Paste** the copied code
7. **Verify** the file is named `lambda_function.py` (should be automatic)
8. Click **Deploy** button

#### Option B: Upload ZIP (If needed)

1. Create a ZIP file containing only `lambda_function.py`
2. In Lambda Console → **Code** tab
3. Click **Upload from** → **.zip file**
4. Select your ZIP file
5. Click **Save**

---

### Step 4: Set Environment Variables

1. Go to **Configuration** → **Environment variables** → **Edit**

2. Click **Add environment variable** for each:

   | Key | Value | Description |
   |-----|-------|-------------|
   | `FROM_EMAIL` | `newsletter@tranquilmindquest.com` | Verified sender email |
   | `REPLY_TO_EMAIL` | `contact@tranquilmindquest.com` | Reply-to address |
   | `ALLOWED_ORIGIN` | `*` | CORS allowed origin (use `*` for now, or your domain) |

   **Important**: `AWS_REGION` is automatically provided by Lambda runtime - do NOT add it manually!

3. Click **Save**

---

### Step 5: Configure Permissions

The Lambda execution role needs SES permissions:

1. Go to **Configuration** → **Permissions**
2. Click on the **Execution role** name (opens IAM)
3. Click **Add permissions** → **Attach policies**
4. Search for **`AmazonSESFullAccess`**
5. Check the policy and click **Add permissions**
6. Return to Lambda Console

---

### Step 6: Test the Function

1. In Lambda Console → **Code** tab
2. Click **Test** button
3. **Create new test event**
4. Event name: `test-newsletter`
5. Use this JSON:

```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"your-test-email@example.com\"}"
}
```

6. Click **Save**
7. Click **Test** again
8. Check the execution result:
   - ✅ **Succeeded**: Function works!
   - ❌ **Failed**: Check error message (see Troubleshooting)

---

### Step 7: Connect to API Gateway

If you haven't set up API Gateway yet:

1. Go to **API Gateway Console**: https://console.aws.amazon.com/apigateway/
2. **Region**: ap-south-1
3. Select your API (or create new)
4. Create resource: `/subscribe`
5. Create method: **POST**
6. Integration type: **Lambda Function**
7. Lambda function: `newsletter-subscription-handler`
8. Enable **Lambda Proxy Integration**
9. Deploy API to **`prod`** stage
10. Copy the **Invoke URL**

---

## ✅ Deployment Complete!

Your Lambda function is now deployed and ready to receive newsletter subscriptions!

---

## 🧪 Next Steps

1. **Update Frontend**: Update `js/config.js` with your API Gateway URL
2. **Test via API**: Use `test-newsletter-api.html` to test the full flow
3. **Check Email**: Subscribe with a real email and check inbox/spam folder

---

## 🐛 Troubleshooting

### Error: "Cannot find module boto3"
- **This shouldn't happen** - boto3 is included by default
- Make sure runtime is Python (not Node.js)

### Error: "Handler not found"
- Verify handler is: `lambda_function.lambda_handler`
- Verify file is named: `lambda_function.py`

### Error: "Access Denied" when sending email
- Check Lambda execution role has `AmazonSESFullAccess` policy
- Verify SES email is verified

### Error: "MessageRejected"
- Check sender email is verified in SES Console
- Check if account is in Sandbox mode (can only send to verified emails)

---

## 📝 Handler Format

- **File name**: `lambda_function.py`
- **Function name**: `lambda_handler`
- **Handler setting**: `lambda_function.lambda_handler`

The format is: `{filename_without_extension}.{function_name}`

