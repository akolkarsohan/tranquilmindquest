# AWS Deployment Guide - TranquilMindQuest

This guide will walk you through deploying the TranquilMindQuest website to AWS using S3 for hosting and CloudFront for content delivery.

## 🎯 Overview

We'll use:
- **Amazon S3** - Static website hosting
- **Amazon CloudFront** - CDN for global distribution
- **Route 53** - DNS management (optional)
- **AWS Certificate Manager** - SSL/TLS certificates

## 📋 Prerequisites

- AWS Account with appropriate permissions
- Domain name (optional, can use S3 default domain)
- Basic understanding of AWS services

## 🚀 Step-by-Step Deployment

### 1. Prepare Your Files

Ensure all files are ready for deployment:
```bash
# Verify file structure
ls -la tranquilmindquest-website/
# Should show: index.html, css/, js/, images/, etc.
```

### 2. Create S3 Bucket

1. **Log into AWS Console**
2. **Navigate to S3**
3. **Create Bucket**:
   - Bucket name: `tranquilmindquest.com` (or your domain)
   - Region: Choose closest to your users
   - Block Public Access: Uncheck "Block all public access"
   - Bucket Versioning: Enable (recommended)

4. **Configure Bucket Policy**:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::tranquilmindquest.com/*"
       }
     ]
   }
   ```

### 3. Enable Static Website Hosting

1. **Select your bucket**
2. **Go to Properties tab**
3. **Scroll to Static website hosting**
4. **Enable**:
   - Index document: `index.html`
   - Error document: `index.html` (for SPA routing)
   - Redirection rules: Leave empty

### 4. Upload Files

#### Option A: AWS Console
1. **Go to Objects tab**
2. **Upload** all files maintaining folder structure
3. **Set permissions** for all objects to public read

#### Option B: AWS CLI
```bash
# Install AWS CLI
pip install awscli

# Configure credentials
aws configure

# Upload files
aws s3 sync . s3://tranquilmindquest.com --delete
```

#### Option C: AWS SDK (Node.js)
```javascript
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const s3 = new AWS.S3();

function uploadFile(filePath, bucketName) {
    const fileContent = fs.readFileSync(filePath);
    const key = path.relative('.', filePath).replace(/\\/g, '/');
    
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
        ContentType: getContentType(filePath),
        ACL: 'public-read'
    };
    
    return s3.upload(params).promise();
}

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const types = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml'
    };
    return types[ext] || 'application/octet-stream';
}
```

### 5. Set Up CloudFront Distribution

1. **Navigate to CloudFront**
2. **Create Distribution**:
   - Origin Domain: Your S3 bucket domain
   - Origin Path: Leave empty
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD, OPTIONS
   - Cache Policy: Managed-CachingOptimized
   - Origin Request Policy: Managed-CORS-S3Origin

3. **Configure Custom Error Pages**:
   - Error Code: 403, 404
   - Response Page Path: `/index.html`
   - HTTP Response Code: 200

4. **Set Default Root Object**: `index.html`

### 6. Configure SSL Certificate (Optional)

1. **Request Certificate in ACM**:
   - Domain name: `tranquilmindquest.com`
   - Validation: DNS validation (recommended)
   - Region: Must be in us-east-1 for CloudFront

2. **Update CloudFront Distribution**:
   - SSL Certificate: Custom SSL Certificate
   - Select your certificate

### 7. Set Up Custom Domain (Optional)

1. **Create Route 53 Hosted Zone**:
   - Domain name: `tranquilmindquest.com`
   - Type: Public hosted zone

2. **Create A Record**:
   - Name: `tranquilmindquest.com`
   - Type: A
   - Alias: Yes
   - Alias Target: Your CloudFront distribution

3. **Create CNAME Record**:
   - Name: `www.tranquilmindquest.com`
   - Type: CNAME
   - Value: `tranquilmindquest.com`

### 8. Configure Caching

#### CloudFront Cache Behaviors
- **Default (*)**: TTL 86400 (1 day)
- **CSS/JS files**: TTL 31536000 (1 year)
- **Images**: TTL 31536000 (1 year)
- **HTML files**: TTL 3600 (1 hour)

#### Cache Headers
Add to your S3 objects:
```javascript
// For CSS/JS files
'Cache-Control': 'public, max-age=31536000, immutable'

// For HTML files
'Cache-Control': 'public, max-age=3600'

// For images
'Cache-Control': 'public, max-age=31536000'
```

## 🔧 Advanced Configuration

### 1. S3 Bucket Policy for CloudFront
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tranquilmindquest.com/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT-ID:distribution/DISTRIBUTION-ID"
        }
      }
    }
  ]
}
```

### 2. CloudFront Function for SPA Routing
```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // Check if the request is for a file with an extension
    if (uri.includes('.')) {
        return request;
    }
    
    // If not, serve index.html
    request.uri = '/index.html';
    return request;
}
```

### 3. Lambda@Edge for Dynamic Content
```javascript
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    
    // Add security headers
    const response = {
        status: '200',
        statusDescription: 'OK',
        headers: {
            'strict-transport-security': [{
                key: 'Strict-Transport-Security',
                value: 'max-age=31536000; includeSubDomains'
            }],
            'x-content-type-options': [{
                key: 'X-Content-Type-Options',
                value: 'nosniff'
            }],
            'x-frame-options': [{
                key: 'X-Frame-Options',
                value: 'DENY'
            }]
        }
    };
    
    callback(null, response);
};
```

## 📊 Monitoring and Analytics

### 1. CloudWatch Metrics
- **CloudFront Metrics**: Requests, data transfer, error rates
- **S3 Metrics**: Storage, requests, errors
- **Custom Metrics**: Page load times, user interactions

### 2. Real User Monitoring (RUM)
```javascript
// Add to your HTML
<script>
  // CloudWatch RUM
  (function(n,i,v,r,s,c,x,z){x=window.AwsRumClient=function(a,p){this.q=a;this.p=p};c=n.createElement(i),z=n.getElementsByTagName(i)[0];c.async=1;c.src=r;c.onload=function(){window.AwsRumClient=function(a,p){this.q=a;this.p=p};window.awsRumClient=new window.AwsRumClient(s,{id:z,region:v,version:"1.0.0"});window.awsRumClient.recordPageView()};z.parentNode.insertBefore(c,z)})(document,"script","us-east-1","https://client.rum.us-east-1.amazonaws.com/1.0.2/cwr.js",{id:"YOUR_APP_ID",region:"us-east-1",version:"1.0.0"});
</script>
```

### 3. Performance Monitoring
```javascript
// Web Vitals tracking
function sendToAnalytics(metric) {
    // Send to your analytics service
    gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.value),
        non_interaction: true
    });
}

// Track Core Web Vitals
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            sendToAnalytics({
                name: 'LCP',
                value: entry.startTime,
                id: entry.id
            });
        }
    }
}).observe({entryTypes: ['largest-contentful-paint']});
```

## 🔒 Security Best Practices

### 1. Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https:;
    connect-src 'self' https://www.google-analytics.com;
">
```

### 2. Security Headers
```javascript
// Lambda@Edge function for security headers
exports.handler = (event, context, callback) => {
    const response = event.Records[0].cf.response;
    const headers = response.headers;
    
    headers['strict-transport-security'] = [{
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload'
    }];
    
    headers['x-content-type-options'] = [{
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    }];
    
    headers['x-frame-options'] = [{
        key: 'X-Frame-Options',
        value: 'DENY'
    }];
    
    headers['referrer-policy'] = [{
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
    }];
    
    callback(null, response);
};
```

## 🚀 Deployment Automation

### 1. GitHub Actions Workflow
```yaml
name: Deploy to AWS S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Deploy to S3
      run: |
        aws s3 sync . s3://tranquilmindquest.com --delete
        aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

### 2. AWS CodePipeline
1. **Create Pipeline**:
   - Source: GitHub
   - Build: AWS CodeBuild (optional)
   - Deploy: S3 + CloudFront

2. **Buildspec.yml**:
```yaml
version: 0.2
phases:
  build:
    commands:
      - echo Build started on `date`
      - aws s3 sync . s3://tranquilmindquest.com --delete
      - aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
```

## 📈 Cost Optimization

### 1. S3 Storage Classes
- **Standard**: Active content
- **IA**: Less frequently accessed content
- **Glacier**: Archived content

### 2. CloudFront Pricing
- **Data Transfer**: First 1TB free per month
- **Requests**: First 10M requests free per month
- **Lambda@Edge**: Pay per invocation

### 3. Monitoring Costs
```bash
# Check S3 costs
aws ce get-cost-and-usage \
    --time-period Start=2024-01-01,End=2024-01-31 \
    --granularity MONTHLY \
    --metrics BlendedCost \
    --group-by Type=DIMENSION,Key=SERVICE
```

## 🧪 Testing Deployment

### 1. Health Checks
```bash
# Test S3 website
curl -I https://tranquilmindquest.com.s3-website-us-east-1.amazonaws.com/

# Test CloudFront
curl -I https://d1234567890.cloudfront.net/

# Test custom domain
curl -I https://tranquilmindquest.com/
```

### 2. Performance Testing
```bash
# Using Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Using WebPageTest
# Visit https://www.webpagetest.org/
# Enter your domain and run test
```

### 3. Security Testing
```bash
# SSL Labs test
# Visit https://www.ssllabs.com/ssltest/
# Enter your domain

# Security headers test
# Visit https://securityheaders.com/
# Enter your domain
```

## 🔄 Maintenance

### 1. Regular Updates
- **Content Updates**: Upload new files to S3
- **Cache Invalidation**: Clear CloudFront cache when needed
- **Security Updates**: Monitor for vulnerabilities

### 2. Backup Strategy
```bash
# Backup S3 bucket
aws s3 sync s3://tranquilmindquest.com s3://tranquilmindquest-backup/

# Version control
git tag v1.0.0
git push origin v1.0.0
```

### 3. Monitoring Alerts
- **CloudWatch Alarms**: Set up alerts for errors and performance
- **SNS Notifications**: Email alerts for critical issues
- **Health Checks**: Route 53 health checks for availability

## 📞 Support

For deployment issues:
- **AWS Documentation**: https://docs.aws.amazon.com/
- **AWS Support**: Available with paid support plans
- **Community Forums**: AWS re:Post and Stack Overflow

---

**Happy Deploying! 🚀**
