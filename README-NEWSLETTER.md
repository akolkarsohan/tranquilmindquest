# Newsletter Email Configuration

## Overview

The newsletter subscription system is configured to work in two modes:

1. **With Backend API** (Recommended): Sends welcome emails via AWS SES
2. **LocalStorage Only** (Fallback): Stores subscriptions locally for later processing

---

## 🚀 Quick Setup (Automated)

**NEW:** Use the automated setup script for fastest setup!

```bash
# Run the setup script
./setup-newsletter-backend.sh --profile your-aws-profile

# Then complete 3 manual steps (see SETUP-SUMMARY.md)
```

See `SETUP-SUMMARY.md` for quick start guide, or `SETUP-SCRIPT-README.md` for detailed documentation.

---

## Current Status

By default, the system uses **localStorage only** mode. This means:
- Subscriptions are stored in the browser's localStorage
- No emails are sent automatically
- You can export subscribers using `newsletter-utils.js`

---

## To Enable Email Sending

### Option 1: AWS SES (Recommended - Free) - Automated Setup

**Fastest Method:** Use the setup script (see above)

**Manual Method:** Follow the guide below

1. Follow the guide in `NEWSLETTER-BACKEND-SETUP.md`
2. After setting up API Gateway, update `js/config.js` with your API endpoint
3. Uncomment the config script in `index.html`:
   ```html
   <script src="./js/config.js"></script>
   ```

### Option 2: EmailJS (Simpler, Limited Free Tier)

1. Sign up at https://www.emailjs.com/
2. Follow their setup guide
3. Update the newsletter handler to use their SDK

---

## Files Overview

### Setup Scripts (NEW!)
- `setup-newsletter-backend.sh` - **Automated AWS setup script** ⭐
- `test-api.sh` - Simple API testing script
- `SETUP-SCRIPT-README.md` - Detailed script documentation
- `SETUP-SUMMARY.md` - Quick setup summary

### Documentation
- `NEWSLETTER-BACKEND-SETUP.md` - Complete manual AWS SES setup guide
- `NEWSLETTER-QUICK-START.md` - Quick reference guide

### Code Files
- `aws/lambda-newsletter-handler.js` - Lambda function code
- `js/config.js` - API endpoint configuration
- `js/newsletter-utils.js` - Utility functions for viewing subscribers
- `js/main.js` - Updated with API integration

---

## Viewing Subscribers (LocalStorage Mode)

Open browser console and run:

```javascript
// View all subscribers
const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
console.table(subscribers);

// Export as CSV
const csv = subscribers.map(s => `${s.email},${s.subscribedAt}`).join('\n');
console.log('Email,Subscribed At\n' + csv);
```

Or use the utility functions (if `newsletter-utils.js` is included):

```javascript
NewsletterUtils.log(); // View in console
NewsletterUtils.downloadCSV(); // Download CSV file
```

---

## Next Steps

1. **For Development**: Continue using localStorage mode
2. **For Production**: Set up AWS SES following the setup guide
3. **For Testing**: Use the test email address in SES sandbox mode

---

## Questions?

Refer to:
- `NEWSLETTER-BACKEND-SETUP.md` for detailed AWS SES setup
- `NEWSLETTER-QUICK-START.md` for quick reference
- AWS SES Documentation: https://docs.aws.amazon.com/ses/

