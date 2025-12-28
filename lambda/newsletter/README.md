# Newsletter Lambda Function

This folder contains everything you need to deploy the newsletter subscription Lambda function.

## 📁 Files in This Folder

- **`lambda_function.py`** - Main Lambda function code (Python)
- **`DEPLOY.md`** - Step-by-step deployment instructions
- **`SETTINGS.md`** - Configuration and environment variables guide
- **`TEST.md`** - How to test the function

---

## 🚀 Quick Deploy (Copy-Paste Method)

### Step 1: Create/Open Lambda Function

1. Go to **AWS Lambda Console**: https://console.aws.amazon.com/lambda/
2. Region: **ap-south-1** (Mumbai)
3. Either:
   - Open existing function: `newsletter-subscription-handler`
   - OR Create new function with name: `newsletter-subscription-handler`

### Step 2: Configure Runtime

1. **Configuration** → **General configuration** → **Edit**
2. **Runtime**: Select **Python 3.11** (or Python 3.12)
3. **Handler**: `lambda_function.lambda_handler`
4. **Timeout**: 30 seconds
5. **Memory**: 128 MB
6. Click **Save**

### Step 3: Copy Code

1. Open **`lambda_function.py`** in this folder
2. **Copy ALL the code** (Ctrl+A, Ctrl+C)
3. In Lambda Console → **Code** tab
4. **Delete** any existing code
5. **Paste** the copied code
6. Click **Deploy** button

### Step 4: Set Environment Variables

1. **Configuration** → **Environment variables** → **Edit**
2. Add these variables:
   ```
   FROM_EMAIL = newsletter@tranquilmindquest.com
   REPLY_TO_EMAIL = contact@tranquilmindquest.com
   ALLOWED_ORIGINS = https://tranquilmindquest.com,https://www.tranquilmindquest.com
   ```
   **Note**: `AWS_REGION` is automatically provided by Lambda - don't add it manually!
3. Click **Save**

### Step 5: Test

1. Click **Test** button
2. Create new test event
3. Use this JSON:
   ```json
   {
     "httpMethod": "POST",
     "body": "{\"email\":\"test@example.com\"}"
   }
   ```
4. Click **Test**
5. Should return success! ✅

---

## ✅ That's It!

Your Lambda function is now deployed and ready to use!

---

## 📚 More Information

- **`DEPLOY.md`** - Detailed deployment guide
- **`SETTINGS.md`** - Configuration options and SES sandbox information
- **`TEST.md`** - Testing instructions

---

## 🔗 Related Files

- Frontend configuration: `../js/config.js` (update API endpoint)
- Testing tools: `../../test-newsletter-api.html`
- Full backend setup: `../../NEWSLETTER-BACKEND-SETUP.md`

