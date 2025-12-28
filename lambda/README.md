# Lambda Functions

This folder contains all AWS Lambda functions organized by purpose.

## 📁 Structure

```
lambda/
├── newsletter/          # Newsletter subscription handler
│   ├── lambda_function.py    # Main function code
│   ├── README.md             # Quick start guide
│   ├── DEPLOY.md             # Deployment instructions
│   ├── SETTINGS.md           # Configuration guide
│   └── TEST.md               # Testing guide
└── README.md            # This file
```

---

## 🚀 Quick Deploy

Each subfolder contains everything needed to deploy that Lambda function:

1. **Function code** - Ready to copy-paste into Lambda Console
2. **Documentation** - Step-by-step guides
3. **Configuration** - Environment variables and settings

---

## 📚 Available Functions

### Newsletter Handler

**Location**: `newsletter/`

**Purpose**: Handles newsletter subscriptions and sends welcome emails via AWS SES

**Quick Deploy**:
1. Open `newsletter/README.md` for quick start
2. Copy code from `newsletter/lambda_function.py`
3. Paste into Lambda Console
4. Deploy!

**Full Documentation**: See `newsletter/DEPLOY.md`

---

## 📝 Adding New Functions

To add a new Lambda function:

1. Create new folder: `lambda/your-function-name/`
2. Add function code file (e.g., `lambda_function.py`)
3. Add documentation:
   - `README.md` - Quick start
   - `DEPLOY.md` - Deployment guide
   - `SETTINGS.md` - Configuration
   - `TEST.md` - Testing guide
4. Update this README with the new function

---

## 🔧 Best Practices

- Each function has its own folder
- Function code file is always named `lambda_function.py` (Python) or `index.js` (Node.js)
- Handler format: `lambda_function.lambda_handler` (Python) or `index.handler` (Node.js)
- Include comprehensive documentation in each folder
- All files needed for deployment should be in the function folder

---

## 📖 General Lambda Resources

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [Lambda Pricing](https://aws.amazon.com/lambda/pricing/)

