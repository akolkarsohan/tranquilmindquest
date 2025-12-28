# TranquilMindQuest

**Mental Health & Wellness Resource Platform**

A comprehensive website providing evidence-based mental health resources, meditation guides, breathing exercises, and wellness tools to support your mental wellness journey.

## 🌟 Features

- **Evidence-Based Resources**: Science-backed mental health information
- **Wellness Techniques**: Meditation, breathing exercises, yoga, and mindfulness practices
- **Accessible Design**: WCAG 2.1 AA compliant with full keyboard navigation
- **Responsive Layout**: Mobile-first design that works on all devices
- **Newsletter Integration**: AWS SES-powered newsletter subscription system
- **Comprehensive Testing**: Playwright test suite with 200+ test cases

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- AWS Account (for newsletter backend - optional)

### Installation

```bash
# Install dependencies
npm install

# Start local development server
npm start

# Run tests
npm test
```

## 📁 Project Structure

```
tranquilmindquest-website/
├── css/              # Stylesheets (main, responsive, dark theme)
├── js/               # JavaScript modules
├── lambda/           # AWS Lambda functions (newsletter)
├── tests/            # Playwright test suite
├── docs/             # Documentation
└── images/           # Images and assets
```

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: AWS Lambda (Python), AWS SES
- **Testing**: Playwright
- **Deployment**: AWS S3 + CloudFront

## 📚 Documentation

- **[Deployment Guide](README-DEPLOYMENT.md)** - AWS deployment instructions
- **[Newsletter Setup](README-NEWSLETTER.md)** - Newsletter backend configuration
- **[Code Review](CODE-REVIEW.md)** - Comprehensive code review and improvements
- **[Improvements Applied](IMPROVEMENTS-APPLIED.md)** - Track of improvements made
- **[Testing Guide](TESTING-GUIDE.md)** - Testing documentation

## 🔒 Security

- CORS configured with specific origin whitelist
- Email input sanitization and validation
- Rate limiting on form submissions
- Secure AWS Lambda function with proper IAM roles

## 📊 Code Quality

- ✅ Comprehensive test coverage
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Performance optimized
- ✅ Mobile-responsive design
- ✅ Clean, maintainable code structure

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

MIT License

## 🙏 Acknowledgments

Built with care for mental wellness. This website provides educational information about mental health and wellness only. We are not mental health professionals, therapists, or medical experts.

---

**Note**: This website content is generated with AI assistance and may contain errors or inaccuracies. Always consult qualified healthcare professionals for medical advice.

