# Newsletter Backend Testing Guide

This guide provides multiple ways to test your newsletter subscription API endpoint.

## 📋 API Endpoint

Your API endpoint: `https://uv48rxi4gf.execute-api.ap-south-1.amazonaws.com/prod/subscribe`

---

## 🌐 Method 1: Browser Test Page (Recommended)

The easiest way to test your API is using the included test page.

### Steps:

1. **Open the test page** in your browser:
   ```
   file:///path/to/tranquilmindquest-website/test-newsletter-api.html
   ```
   Or if you have a local server running:
   ```
   http://localhost/test-newsletter-api.html
   ```

2. **Enter a test email address** in the form

3. **Click "Test Subscription"**

4. **Check the results**:
   - ✅ Success: You'll see a green success message
   - ❌ Error: You'll see detailed error information

5. **Check your email inbox** (and spam folder) for the welcome email

### Features:
- Visual interface
- Shows response time
- Displays full error messages
- Configuration checker
- CORS testing

---

## 💻 Method 2: Terminal Testing (Bash/Linux/Mac)

Use the bash script for quick terminal testing.

### Steps:

1. **Make the script executable** (if needed):
   ```bash
   chmod +x test-newsletter-api.sh
   ```

2. **Run the test**:
   ```bash
   ./test-newsletter-api.sh your-email@example.com
   ```
   
   Or use the default test email:
   ```bash
   ./test-newsletter-api.sh
   ```

### Example Output:
```
========================================
Newsletter API Test Script
========================================

API Endpoint: https://uv48rxi4gf.execute-api.ap-south-1.amazonaws.com/prod/subscribe
Test Email: your-email@example.com

Testing OPTIONS request (CORS preflight)...
✓ OPTIONS request successful (Status: 200)

Testing POST request (Subscription)...
Response Details:
  Status Code: 200
  Response Time: 0.523s

✓ Test PASSED!
Subscription successful!
```

---

## 💻 Method 3: PowerShell (Windows)

Use the PowerShell script for Windows testing.

### Steps:

1. **Open PowerShell**

2. **Navigate to the project directory**:
   ```powershell
   cd path\to\tranquilmindquest-website
   ```

3. **Run the test**:
   ```powershell
   .\test-newsletter-api.ps1 your-email@example.com
   ```
   
   Or use the default test email:
   ```powershell
   .\test-newsletter-api.ps1
   ```

### If you get an execution policy error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🔧 Method 4: Using cURL (Manual)

Test the API directly using cURL.

### Test OPTIONS (CORS):
```bash
curl -X OPTIONS https://uv48rxi4gf.execute-api.ap-south-1.amazonaws.com/prod/subscribe \
  -H "Origin: http://localhost" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

### Test POST (Subscription):
```bash
curl -X POST https://uv48rxi4gf.execute-api.ap-south-1.amazonaws.com/prod/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost" \
  -d '{"email":"your-email@example.com"}' \
  -v
```

---

## 🌐 Method 5: Browser Console (Developer Tools)

Test directly from your website's browser console.

### Steps:

1. **Open your website** (or the test page)

2. **Open Developer Tools** (F12)

3. **Go to the Console tab**

4. **Run this code**:
   ```javascript
   // Test subscription
   fetch('https://uv48rxi4gf.execute-api.ap-south-1.amazonaws.com/prod/subscribe', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({ email: 'your-email@example.com' })
   })
   .then(response => response.json())
   .then(data => {
       console.log('Response:', data);
       if (data.success) {
           console.log('✅ Success!', data.message);
       } else {
           console.error('❌ Error:', data.error);
       }
   })
   .catch(error => {
       console.error('❌ Network Error:', error);
   });
   ```

---

## ✅ Expected Success Response

```json
{
  "success": true,
  "message": "Subscription confirmed! Please check your email."
}
```

## ❌ Common Error Responses

### Invalid Email:
```json
{
  "success": false,
  "error": "Invalid email address"
}
```

### Server Error:
```json
{
  "success": false,
  "error": "Failed to process subscription. Please try again later."
}
```

---

## 🔍 Verification Checklist

After a successful test, verify:

- [ ] ✅ API returns `200 OK` status
- [ ] ✅ Response contains `"success": true`
- [ ] ✅ Welcome email received in inbox (check spam folder)
- [ ] ✅ Email appears in AWS SES "Sent" statistics
- [ ] ✅ Lambda function executed successfully (check CloudWatch logs)
- [ ] ✅ No errors in browser console
- [ ] ✅ CORS headers are present in response

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Symptom**: Browser shows CORS error in console

**Solutions**:
1. Check API Gateway CORS configuration
2. Verify `Access-Control-Allow-Origin` header
3. Ensure OPTIONS method is configured

### Issue: 502 Bad Gateway
**Symptom**: API returns 502 status code

**Solutions**:
1. Check Lambda function logs in CloudWatch
2. Verify Lambda function exists and is deployed
3. Check Lambda timeout settings (should be at least 10 seconds)
4. Verify Lambda execution role has SES permissions

### Issue: 500 Internal Server Error
**Symptom**: API returns 500 status code

**Solutions**:
1. Check CloudWatch logs for Lambda errors
2. Verify SES email is verified
3. Check Lambda function code for errors
4. Verify environment variables are set correctly

### Issue: Email Not Received
**Symptom**: API returns success but no email arrives

**Solutions**:
1. Check spam/junk folder
2. Verify sender email is verified in SES
3. Check SES "Sending statistics" for email count
4. Verify recipient email is valid
5. Check if account is in SES Sandbox mode (can only send to verified emails)

### Issue: "Account is in sandbox"
**Symptom**: Error message about sandbox mode

**Solutions**:
1. Request production access in SES Console
2. Wait for AWS approval (usually 24-48 hours)
3. Or verify the recipient email address in SES

---

## 📊 Monitoring

### Check Lambda Logs:
1. Go to AWS CloudWatch Console
2. Navigate to Log groups
3. Find `/aws/lambda/newsletter-subscription-handler`
4. View recent log streams

### Check SES Statistics:
1. Go to AWS SES Console
2. Click "Sending statistics"
3. View sent emails count

### Check API Gateway Logs:
1. Go to API Gateway Console
2. Select your API
3. Go to "Logs" section
4. Enable execution logging if needed

---

## 🎯 Quick Test Commands

### Test with your actual email:
```bash
# Bash
./test-newsletter-api.sh your-actual-email@gmail.com

# PowerShell
.\test-newsletter-api.ps1 your-actual-email@gmail.com

# cURL
curl -X POST https://uv48rxi4gf.execute-api.ap-south-1.amazonaws.com/prod/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"your-actual-email@gmail.com"}'
```

---

## 📝 Notes

- Use a **real email address** you can access for testing
- Check **spam/junk folder** for the welcome email
- The API endpoint uses the **prod** stage - make sure your API is deployed to this stage
- Response times should typically be **< 2 seconds**
- First test might be slower due to Lambda cold start

---

## 🎉 Success!

If all tests pass and you receive the welcome email, your newsletter backend is working correctly! 🚀

