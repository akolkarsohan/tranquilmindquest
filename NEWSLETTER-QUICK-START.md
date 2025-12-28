# Newsletter Email Setup - Quick Start Guide

## 🚀 Fastest Way to Get Started (AWS SES)

### Step 1: Verify Your Email (5 minutes)

1. Go to https://console.aws.amazon.com/ses/
2. Click "Verified identities" → "Create identity"
3. Choose "Email address"
4. Enter your email and verify it

### Step 2: Request Production Access (1 minute, wait 24-48 hours)

1. In SES Console → "Account dashboard"
2. Click "Request production access"
3. Fill form and submit (usually approved within 24-48 hours)

### Step 3: Create Lambda Function (10 minutes)

1. Go to https://console.aws.amazon.com/lambda/
2. Click "Create function"
3. Copy code from `aws/lambda-newsletter-handler.js`
4. Update `FROM_EMAIL` with your verified email
5. Attach `AmazonSESFullAccess` policy to execution role

### Step 4: Create API Gateway (5 minutes)

1. Go to https://console.aws.amazon.com/apigateway/
2. Create REST API
3. Create resource: `/subscribe`
4. Create POST method → Connect to your Lambda function
5. Enable CORS
6. Deploy API
7. **Copy the Invoke URL**

### Step 5: Update Frontend (2 minutes)

1. Open `js/config.js`
2. Replace `YOUR_API_ID` with your actual API Gateway URL
3. Save and test!

**Total Time: ~20 minutes (plus 24-48 hour wait for production access)**

---

## 📧 Alternative: EmailJS (Even Simpler, No AWS)

If you want something simpler without AWS:

1. Sign up at https://www.emailjs.com/ (free: 200 emails/month)
2. Connect your email (Gmail, Outlook, etc.)
3. Create email template
4. Get your Service ID, Template ID, and Public Key
5. Update `js/main.js` to use EmailJS SDK

**Time: ~10 minutes**

---

## 💰 Cost Comparison

| Service | Free Tier | After Free Tier |
|---------|-----------|-----------------|
| **AWS SES** | 3,000 emails/month (12 months) | $0.10 per 1,000 emails |
| **EmailJS** | 200 emails/month | $15/month for 1,000 emails |
| **Brevo** | 300 emails/day (9,000/month) | Plans from $25/month |

**Recommendation:** AWS SES is most cost-effective for growth!

---

## ✅ Testing Checklist

- [ ] Email verified in SES
- [ ] Lambda function deployed
- [ ] API Gateway URL copied
- [ ] Config file updated
- [ ] Test subscription works
- [ ] Welcome email received
- [ ] Check spam folder if not received

---

## 🆘 Need Help?

See detailed guide: `NEWSLETTER-BACKEND-SETUP.md`

