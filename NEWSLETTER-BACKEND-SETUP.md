# Newsletter Email Backend Setup Guide

## 🎯 Overview

This guide will help you set up a **completely free** newsletter email backend using AWS SES (Simple Email Service). AWS SES Free Tier includes:

- **3,000 emails/month** for the first 12 months (Sandbox mode)
- **62,000 emails/month** if sent from EC2 instances
- Can request production access after verification

---

## 📋 Prerequisites

- AWS Account (free tier available)
- Domain name (or verified email address)
- Basic knowledge of AWS Console

---

## 🚀 Option 1: AWS SES Setup (Recommended)

### Important: Region Selection

**All AWS services should be in the same region** for consistency and to avoid cross-region issues:
- SES (Simple Email Service)
- Lambda function
- API Gateway

Common regions:
- `ap-south-1` (Mumbai) - Good for users in India/South Asia
- `us-east-1` (N. Virginia) - Good for users in North America
- `eu-west-1` (Ireland) - Good for users in Europe

**Make sure to select the same region** in all AWS Console pages!

---

### Step 1: Verify Your Email Address or Domain

1. **Go to AWS SES Console**
   - Navigate to: https://console.aws.amazon.com/ses/
   - **Important**: Select your preferred AWS region (e.g., `ap-south-1` for Mumbai, or `us-east-1` for N. Virginia)
   - All services (SES, Lambda, API Gateway) should be in the same region for consistency

2. **Verify Email Address (Quick Start)**
   - Click "Verified identities" → "Create identity"
   - Choose "Email address"
   - Enter your email (e.g., `newsletter@tranquilmindquest.com`)
   - Click "Create identity"
   - Check your email and click the verification link

3. **Verify Domain (Better for Production)**
   - Click "Verified identities" → "Create identity"
   - Choose "Domain"
   - Enter your domain (e.g., `tranquilmindquest.com`)
   - Choose "Easy DKIM" for email authentication
   - **Configuration Options** (leave all unchecked for basic setup):
     - ❌ **Assign a default configuration set**: Leave unchecked (for basic newsletter setup)
     - ❌ **Assign to a tenant**: Leave unchecked (not needed for single website)
     - ❌ **Use a custom MAIL FROM domain**: Leave unchecked for now (optional - improves deliverability but requires additional DNS setup; can be enabled later)
   - Click "Create identity"
   - Add the DNS records provided by AWS to your domain's DNS settings
   - Wait for domain verification to complete

### Step 2: Request Production Access (Important!)

By default, SES is in "Sandbox mode" which only allows sending to verified emails.

1. **Request Production Access**
   - In SES Console, go to "Account dashboard"
   - Click "Request production access"
   - Fill out the form:
     - Mail Type: Transactional
     - Website URL: Your website URL
     - Use case description: "Weekly wellness newsletter for subscribers"
     - Expected sending rate: < 1000 emails/day
     - Acknowledge AWS Customer Agreement

2. **Wait for Approval** (usually 24-48 hours)

### Step 3: Create IAM User for SES Access (Optional)

**Note**: If you're using Lambda (recommended), you don't need a separate IAM user. Lambda will use its execution role. Skip this step and proceed to Step 4.

If you need IAM user credentials for other purposes:

1. **Go to IAM Console**
   - Navigate to: https://console.aws.amazon.com/iam/

2. **Create New User**
   - Click "Users" → "Create user"
   - User name: `ses-newsletter-sender`
   - Click "Next"

3. **Attach Policies**
   - Search for "AmazonSESFullAccess" or "AmazonSESSendingAccess"
   - Select the policy and click "Next" → "Create user"

4. **Create Access Keys**
   - Click on the user you just created
   - Go to "Security credentials" tab
   - Click "Create access key"
   - Choose "Application running outside AWS"
   - Click "Next" → "Create access key"
   - **IMPORTANT**: Save the Access Key ID and Secret Access Key securely

---

## 🔧 Step 4: Create Lambda Function for Sending Emails

### Lambda Function Code

Create a new Lambda function in AWS Console:

1. **Go to Lambda Console**
   - Navigate to: https://console.aws.amazon.com/lambda/
   - **Important**: Make sure you're in the same AWS region as your SES setup (e.g., `ap-south-1`)
   - Click "Create function"

2. **Function Configuration**
   - Function name: `newsletter-subscription-handler`
   - Runtime: Node.js 18.x or 20.x
   - Architecture: x86_64
   - Execution role: Create new role with basic Lambda permissions

3. **Add SES Permissions to Role**
   - Go to IAM → Roles → Find your Lambda execution role
   - Click "Add permissions" → "Attach policies"
   - Search for "AmazonSESFullAccess" and attach it

4. **Function Code**

Replace the default code with this:

```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: process.env.AWS_REGION || 'ap-south-1' });

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*', // Change to your domain in production
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Parse request body
        const body = JSON.parse(event.body || '{}');
        const { email, name } = body;

        // Validate email
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid email address'
                })
            };
        }

        // Email configuration
        const FROM_EMAIL = 'newsletter@tranquilmindquest.com'; // Your verified email
        const TO_EMAIL = email;
        
        // Welcome email subject and body
        const subject = 'Welcome to TranquilMindQuest Newsletter! 🧘';
        const htmlBody = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                              color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; padding: 12px 30px; background: #667eea; 
                             color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to TranquilMindQuest! 🧘</h1>
                    </div>
                    <div class="content">
                        <p>Hi there,</p>
                        <p>Thank you for subscribing to our weekly wellness newsletter! We're thrilled to have you join our community.</p>
                        <p>Every week, you'll receive:</p>
                        <ul>
                            <li>🔬 Science-based mental health tips</li>
                            <li>💆 Guided exercises and mindfulness practices</li>
                            <li>📚 Curated resources for your wellness journey</li>
                            <li>💡 Practical strategies for managing stress and anxiety</li>
                        </ul>
                        <p>We respect your privacy and promise to never spam you. You can unsubscribe at any time.</p>
                        <p>Stay mindful,<br>The TranquilMindQuest Team</p>
                        <div class="footer">
                            <p>TranquilMindQuest - Your journey to mental wellness</p>
                            <p><a href="https://tranquilmindquest.com">Visit our website</a> | 
                               <a href="https://tranquilmindquest.com/unsubscribe">Unsubscribe</a></p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        const textBody = `
            Welcome to TranquilMindQuest!
            
            Thank you for subscribing to our weekly wellness newsletter!
            
            Every week, you'll receive:
            - Science-based mental health tips
            - Guided exercises and mindfulness practices
            - Curated resources for your wellness journey
            - Practical strategies for managing stress and anxiety
            
            We respect your privacy and promise to never spam you. You can unsubscribe at any time.
            
            Stay mindful,
            The TranquilMindQuest Team
            
            Visit: https://tranquilmindquest.com
        `;

        // Send email using SES
        const params = {
            Source: FROM_EMAIL,
            Destination: {
                ToAddresses: [TO_EMAIL]
            },
            Message: {
                Subject: {
                    Data: subject,
                    Charset: 'UTF-8'
                },
                Body: {
                    Html: {
                        Data: htmlBody,
                        Charset: 'UTF-8'
                    },
                    Text: {
                        Data: textBody,
                        Charset: 'UTF-8'
                    }
                }
            }
        };

        await ses.sendEmail(params).promise();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Subscription confirmed! Please check your email.'
            })
        };

    } catch (error) {
        console.error('Error sending email:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: 'Failed to process subscription. Please try again later.'
            })
        };
    }
};
```

5. **Save and Deploy**
   - Click "Deploy" button
   - Note the function ARN (you'll need it for API Gateway)

---

## 🌐 Step 5: Create API Gateway Endpoint

1. **Go to API Gateway Console**
   - Navigate to: https://console.aws.amazon.com/apigateway/
   - **Important**: Make sure you're in the same AWS region as your SES and Lambda setup (e.g., `ap-south-1`)
   - Click "Create API" → "REST API" → "Build"

2. **Create API**
   - Name: `newsletter-api`
   - Endpoint type: Regional
   - **Region**: Select the same region as your Lambda and SES (e.g., `ap-south-1`)
   - Click "Create API"

3. **Create Resource**
   - Click "Actions" → "Create Resource"
   - Resource name: `subscribe`
   - Resource path: `/subscribe`
   - Enable CORS: Yes
   - Click "Create Resource"

4. **Create POST Method**
   - Select `/subscribe` resource
   - Click "Actions" → "Create Method" → Select "POST"
   - Integration type: Lambda Function
   - Lambda Function: `newsletter-subscription-handler`
   - Enable Lambda Proxy Integration: Yes
   - Click "Save" → "OK"

5. **Enable CORS**
   - Select `/subscribe` resource
   - Click "Actions" → "Enable CORS"
   - Access-Control-Allow-Origin: `*` (or your domain)
   - Click "Enable CORS and replace existing CORS headers"

6. **Deploy API**
   - Click "Actions" → "Deploy API"
   - Deployment stage: `prod` (or create new)
   - Click "Deploy"
   - **Copy the Invoke URL** (e.g., `https://abc123.execute-api.ap-south-1.amazonaws.com/prod/subscribe`)
   - Note: The URL format will be: `https://[API-ID].execute-api.[REGION].amazonaws.com/[STAGE]/subscribe`

---

## 💻 Step 6: Update Frontend Code

Update your newsletter subscription handlers to call the API Gateway endpoint.

### Update main.js

Find the `handleNewsletterSubmit` function and update it:

```javascript
function handleNewsletterSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"], .newsletter-input');
    if (!emailInput) {
        showNotification('Newsletter form error. Please refresh the page.', 'error');
        return;
    }
    
    const email = emailInput.value.trim();
    
    // Clear any previous errors
    clearFieldError(emailInput);
    
    // Validate email
    if (!email) {
        showFieldError(emailInput, 'This field is required');
        showNotification('Please enter your email address.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Disable submit button
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : 'Subscribe';
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';
    }
    
    // Send to API Gateway
    const API_ENDPOINT = 'YOUR_API_GATEWAY_URL/subscribe'; // Replace with your API Gateway URL
    
    fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store email locally as backup
            try {
                let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                const timestamp = new Date().toISOString();
                const existingIndex = subscribers.findIndex(sub => sub.email.toLowerCase() === email.toLowerCase());
                
                if (existingIndex >= 0) {
                    subscribers[existingIndex].lastSubscription = timestamp;
                } else {
                    subscribers.push({
                        email: email,
                        subscribedAt: timestamp,
                        lastSubscription: timestamp
                    });
                }
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
            
            showNotification('Thank you for subscribing! Please check your email for confirmation.', 'success');
            form.reset();
        } else {
            showNotification(data.error || 'Subscription failed. Please try again.', 'error');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    })
    .catch(error => {
        console.error('Subscription error:', error);
        showNotification('Unable to connect. Please try again later.', 'error');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}
```

---

## 🔐 Step 7: Environment Configuration

Create a config file to manage your API endpoint:

**Create `js/config.js`:**

```javascript
// Newsletter API Configuration
const NEWSLETTER_CONFIG = {
    // Replace with your API Gateway URL
    // Format: https://[API-ID].execute-api.[REGION].amazonaws.com/[STAGE]/subscribe
    // Example for ap-south-1: https://abc123.execute-api.ap-south-1.amazonaws.com/prod/subscribe
    API_ENDPOINT: 'https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/prod/subscribe',
    
    // Fallback to localStorage if API fails
    USE_FALLBACK: true
};
```

**Include in your HTML:**

```html
<script src="js/config.js"></script>
<script src="js/main.js"></script>
```

---

## ✅ Testing

1. **Test in Browser Console:**
   ```javascript
   fetch('YOUR_API_ENDPOINT/subscribe', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email: 'your-email@example.com' })
   }).then(r => r.json()).then(console.log);
   ```

2. **Check Lambda Logs:**
   - Go to CloudWatch → Log groups → `/aws/lambda/newsletter-subscription-handler`
   - View recent logs for errors

3. **Check SES Dashboard:**
   - Go to SES Console → "Sending statistics"
   - Verify emails are being sent

---

## 📊 Monitoring & Costs

### Free Tier Limits:
- **3,000 emails/month** (first 12 months)
- **62,000 emails/month** if sent from EC2

### Cost After Free Tier:
- **$0.10 per 1,000 emails** (very affordable!)

### Monitor Usage:
- AWS SES Console → "Sending statistics"
- Set up CloudWatch alarms for cost tracking

---

## 🚨 Troubleshooting

### Common Issues:

1. **"Email address not verified"**
   - Solution: Verify the FROM email address in SES Console

2. **"Account is in sandbox"**
   - Solution: Request production access (Step 2)

3. **CORS errors**
   - Solution: Make sure CORS is enabled in API Gateway

4. **Lambda timeout**
   - Solution: Increase Lambda timeout to 10 seconds

5. **Email not received**
   - Check spam folder
   - Verify recipient email is valid
   - Check CloudWatch logs for errors

---

## 📝 Alternative: EmailJS (Simpler, No AWS Setup)

If you prefer a simpler solution without AWS setup, you can use EmailJS (free tier: 200 emails/month):

1. Sign up at https://www.emailjs.com/
2. Connect your email service
3. Create email template
4. Use their JavaScript SDK

See `NEWSLETTER-EMAILJS-SETUP.md` for EmailJS setup instructions.

---

## 🎉 You're Done!

Your newsletter email backend is now configured! Subscribers will receive a welcome email when they sign up.

**Next Steps:**
- Monitor your email sending statistics
- Set up email templates for weekly newsletters
- Consider using AWS SNS for newsletter scheduling
- Set up unsubscribe functionality

