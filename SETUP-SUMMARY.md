# Newsletter Backend Setup - Quick Summary

## 🚀 Quick Start (3 Steps)

### Step 1: Run the Setup Script

```bash
# Using Git Bash or WSL
./setup-newsletter-backend.sh --profile your-aws-profile

# The script will create:
# - IAM Role
# - Lambda Function  
# - API Gateway
# - All configurations
```

**Time:** ~2-3 minutes

### Step 2: Manual Steps (REQUIRED)

#### A. Verify Email in SES
1. Go to: https://console.aws.amazon.com/ses/
2. Click "Verified identities" → "Create identity" → "Email address"
3. Enter your FROM email (e.g., `newsletter@tranquilmindquest.com`)
4. Verify the email

**Time:** ~2 minutes

#### B. Request Production Access (Optional for now)
- Only needed to send to unverified emails
- Can test with verified emails in sandbox mode
- Takes 24-48 hours for approval

#### C. Update Frontend Config
1. Copy API Gateway URL from script output
2. Open `js/config.js`
3. Update `API_ENDPOINT` with your URL
4. Uncomment config script in `index.html`

**Time:** ~1 minute

### Step 3: Test

```bash
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/subscribe \
  -H 'Content-Type: application/json' \
  -d '{"email":"your-verified-email@example.com"}'
```

**Time:** ~1 minute

---

## ⏱️ Total Setup Time

- **Automated (Script):** ~3 minutes
- **Manual Steps:** ~5 minutes
- **Total:** ~8 minutes

---

## 📋 Prerequisites Checklist

Before running the script:

- [ ] AWS CLI installed
- [ ] AWS profile configured in `~/.aws/credentials`
- [ ] AWS profile has required permissions (IAM, Lambda, API Gateway, SES)
- [ ] Git Bash or WSL installed (for Windows)

---

## 🎯 What Gets Created

| Resource | Name | Purpose |
|----------|------|---------|
| **IAM Role** | `newsletter-lambda-role` | Lambda execution role with SES permissions |
| **Lambda Function** | `newsletter-subscription-handler` | Sends welcome emails via SES |
| **API Gateway** | `newsletter-api` | REST API endpoint `/subscribe` |
| **API Stage** | `prod` | Production deployment stage |

---

## 📝 Manual Steps Required

These steps **cannot** be automated and must be done manually:

1. ✅ **Email Verification in SES** - Must verify sender email address
2. ✅ **Production Access Request** - Optional, for sending to unverified emails
3. ✅ **Frontend Config Update** - Update `js/config.js` with API Gateway URL

---

## 🔍 Verification Checklist

After setup, verify:

- [ ] Script completed without errors
- [ ] API Gateway URL is displayed
- [ ] Email verified in SES Console
- [ ] `js/config.js` updated with API URL
- [ ] Config script uncommented in `index.html`
- [ ] Test API call returns success
- [ ] Welcome email received (check spam folder)

---

## 💡 Tips

1. **Use Git Bash on Windows** - Easiest way to run bash scripts
2. **Test with Verified Email First** - Works in sandbox mode
3. **Check CloudWatch Logs** - If Lambda fails, check logs for errors
4. **Save API Gateway URL** - You'll need it for frontend config

---

## 🆘 Quick Troubleshooting

**Script fails with "Access Denied"**
→ Check AWS profile permissions

**Lambda fails with "Email not verified"**
→ Complete manual step #1 (verify email)

**CORS errors in browser**
→ API Gateway CORS is configured, check browser console for details

**No email received**
→ Check spam folder, verify email is verified in SES, check CloudWatch logs

---

## 📚 Full Documentation

- **Setup Script Guide:** `SETUP-SCRIPT-README.md`
- **Backend Setup Details:** `NEWSLETTER-BACKEND-SETUP.md`
- **Quick Start Guide:** `NEWSLETTER-QUICK-START.md`

---

## 🎉 You're Done!

Once all steps are complete, your newsletter subscription will:
- ✅ Accept subscriptions via frontend
- ✅ Send welcome emails automatically
- ✅ Store subscriptions (localStorage + backend)
- ✅ Handle errors gracefully

