# TranquilMindQuest - Mental Health & Wellness Platform

A comprehensive, accessible, and evidence-based mental health resource website designed to provide free mental wellness tools, meditation guides, and educational content.

## 🌟 Features

- **Dark Theme Primary Design** - Optimized for reduced eye strain and comfortable reading
- **Fully Responsive** - Mobile-first design that works on all devices
- **Accessibility Compliant** - WCAG 2.1 AA standards with keyboard navigation and screen reader support
- **Fast Loading** - Optimized for AWS S3/CloudFront hosting
- **SEO Optimized** - Structured data, meta tags, and semantic HTML
- **Evidence-Based Content** - Research-backed mental health information and techniques

## 🎨 Design System

### Color Palette
- **Background Primary**: #0D1117 (deep charcoal)
- **Background Secondary**: #161B22 (slightly lighter panels)
- **Background Tertiary**: #1F2937 (cards and elevated surfaces)
- **Text Primary**: #E6EDF3 (soft white)
- **Text Secondary**: #8B949E (muted gray)
- **Accent Primary**: #58A6FF (calming blue)
- **Accent Secondary**: #7EE787 (soft green)
- **Accent Warm**: #F0A477 (warm peach)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Base Size**: 16px
- **Line Height**: 1.7 for body text
- **Weights**: 400, 500, 600, 700

## 📁 Project Structure

```
tranquilmindquest-website/
├── index.html                 # Homepage
├── about.html                 # About Mental Health
├── meditation.html            # Meditation & Mindfulness
├── yoga.html                  # Yoga for Mental Wellness
├── breathing.html             # Deep Breathing Exercises
├── mindfulness.html           # Mindfulness Practices
├── products.html              # Wellness Products
├── blog.html                  # Resources & Blog
├── contact.html               # Contact Page
├── privacy.html               # Privacy Policy
├── terms.html                 # Terms of Service
├── css/
│   ├── main.css              # Main stylesheet
│   ├── dark-theme.css        # Dark theme enhancements
│   └── responsive.css        # Responsive design
├── js/
│   ├── main.js               # Core functionality
│   ├── smooth-scroll.js      # Smooth scrolling
│   └── animations.js         # Animations & interactions
├── images/
│   └── placeholders/         # Image placeholders
├── docs/
│   ├── README.md             # This file
│   ├── deployment-guide.md   # AWS deployment guide
│   └── seo-checklist.md      # SEO optimization checklist
└── aws/
    ├── s3-bucket-policy.json # S3 bucket policy
    └── cloudfront-config.txt # CloudFront configuration
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Text editor (VS Code recommended)
- AWS account (for deployment)

### Local Development
1. Clone or download the project files
2. Open `index.html` in your browser
3. Use a local server for full functionality:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### File Structure
- **HTML**: Semantic, accessible markup with proper heading hierarchy
- **CSS**: Modular stylesheets with CSS custom properties
- **JavaScript**: Vanilla JS with modern ES6+ features
- **Images**: WebP format with fallbacks for better performance

## 🎯 Key Sections

### Homepage (index.html)
1. **Hero Section** - Full viewport with breathing animation
2. **Crisis Banner** - Dismissible emergency resources
3. **Mental Health Stats** - Real, verified statistics
4. **Why Mental Health Matters** - Educational content
5. **Coping Techniques** - 4 main technique cards
6. **Wellness Journey** - 5-step process
7. **Featured Products** - Curated wellness items
8. **Latest Resources** - Blog preview
9. **Newsletter Signup** - Email subscription
10. **Footer** - Links and social media

### Additional Pages
- **About** - Mental health education and awareness
- **Meditation** - Guided practices and techniques
- **Yoga** - Physical wellness for mental health
- **Breathing** - Breathwork exercises
- **Mindfulness** - Present-moment awareness
- **Products** - Wellness product recommendations
- **Blog** - Educational articles and guides

## ♿ Accessibility Features

- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and semantic HTML
- **Skip Links** - Quick navigation to main content
- **Focus Indicators** - Clear visual focus states
- **Color Contrast** - WCAG AA compliant contrast ratios
- **Text Scaling** - Supports up to 200% text scaling
- **Reduced Motion** - Respects user motion preferences

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoints**:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px - 1439px
  - Large Desktop: 1440px+

## ⚡ Performance Optimizations

- **Lazy Loading** - Images load as needed
- **Minified Assets** - Compressed CSS and JavaScript
- **Optimized Images** - WebP format with fallbacks
- **Critical CSS** - Above-the-fold styles prioritized
- **Service Worker** - Offline functionality (optional)

## 🔍 SEO Features

- **Meta Tags** - Comprehensive meta descriptions and keywords
- **Open Graph** - Social media sharing optimization
- **Twitter Cards** - Enhanced Twitter sharing
- **Structured Data** - Schema.org markup for search engines
- **Canonical URLs** - Prevent duplicate content issues
- **Sitemap** - XML sitemap for search engines

## 🛠️ Customization

### Colors
Update CSS custom properties in `css/main.css`:
```css
:root {
  --bg-primary: #0D1117;
  --accent-primary: #58A6FF;
  /* ... other colors */
}
```

### Content
- Update text content in HTML files
- Replace placeholder images in `images/placeholders/`
- Modify product information in product cards
- Update contact information in footer

### Styling
- Modify `css/main.css` for base styles
- Update `css/dark-theme.css` for theme variations
- Adjust `css/responsive.css` for breakpoint changes

## 📊 Analytics Integration

The site is ready for analytics integration:
- Google Analytics 4
- Google Tag Manager
- Custom event tracking for user interactions

## 🔒 Security Considerations

- **HTTPS Only** - All external links use HTTPS
- **Content Security Policy** - Ready for CSP headers
- **No Inline Scripts** - All JavaScript in external files
- **Sanitized Inputs** - Form validation and sanitization

## 🌐 Browser Support

- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Mobile Browsers** - iOS Safari, Chrome Mobile
- **Progressive Enhancement** - Graceful degradation for older browsers

## 📈 Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Page Size**: < 1MB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or support:
- Email: contact@tranquilmindquest.com
- GitHub Issues: Create an issue for bugs or feature requests
- Documentation: Check the docs/ folder for detailed guides

## 🔄 Updates

### Version 1.0.0
- Initial release
- Complete homepage with all sections
- Responsive design implementation
- Accessibility compliance
- SEO optimization
- Performance optimizations

## 📚 Additional Resources

- [Deployment Guide](deployment-guide.md)
- [SEO Checklist](seo-checklist.md)
- [AWS Configuration](aws/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Best Practices](https://web.dev/performance/)

---

**Built with care for mental wellness** ❤️
