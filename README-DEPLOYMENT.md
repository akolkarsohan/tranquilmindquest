# TranquilMindQuest AWS Deployment Guide

## 🚀 Complete Step-by-Step AWS Deployment Guide

This guide will walk you through deploying the TranquilMindQuest website to AWS S3 with CloudFront CDN, including custom domain setup and SSL certificates.

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] AWS Account (free tier eligible)
- [ ] Domain name registered (tranquilmindquest.com)
- [ ] Local website files ready
- [ ] AWS CLI installed (optional but recommended)
- [ ] Basic understanding of web hosting concepts

---

## 💰 Estimated Costs Breakdown

| Service | Monthly Cost | Notes |
|---------|-------------|-------|
| **S3 Storage** | $0.50-2.00 | ~1-5GB website files |
| **CloudFront CDN** | $0.00-5.00 | Free tier: 1TB transfer |
| **Route 53** | $0.50 | Hosted zone fee |
| **Certificate Manager** | $0.00 | Free SSL certificates |
| **Lambda (Chatbot)** | $0.00-2.00 | First 1M requests free |
| **Total Expected** | **$1.00-9.50** | Small to medium traffic |

---

## 🔧 Step 1: AWS Account Setup

### 1.1 Create AWS Account
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create an AWS Account"
3. Follow the registration process
4. Verify your email and phone number
5. Choose a support plan (Basic is free)

### 1.2 Set Up IAM User (Recommended)
**Never use root account credentials for deployment!**

1. Sign in to AWS Console
2. Go to **IAM** service
3. Click **Users** → **Create user**
4. Username: `tranquilmindquest-deploy`
5. Select **Programmatic access**
6. Attach policies:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `Route53FullAccess`
   - `AWSCertificateManagerFullAccess`
7. Download and save the access keys securely

### 1.3 Install AWS CLI (Optional)
```bash
# Windows (PowerShell)
winget install Amazon.AWSCLI

# macOS
brew install awscli

# Linux
sudo apt-get install awscli
```

Configure AWS CLI:
```bash
aws configure
# Enter your Access Key ID
# Enter your Secret Access Key
# Default region: us-east-1
# Default output format: json
```

---

## 🪣 Step 2: Create S3 Bucket

### 2.1 Create Bucket
1. Go to **S3** service in AWS Console
2. Click **Create bucket**
3. **Bucket name**: `tranquilmindquest.com` (must match your domain)
4. **Region**: `US East (N. Virginia) us-east-1` (recommended for CloudFront)
5. **Object Ownership**: ACLs disabled (recommended)
6. **Block Public Access**: **Uncheck "Block all public access"**
7. **Bucket Versioning**: Enable (recommended)
8. **Default encryption**: Enable (recommended)
9. Click **Create bucket**

### 2.2 Enable Static Website Hosting
1. Select your bucket
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click **Edit**
5. **Static website hosting**: Enable
6. **Hosting type**: Host a static website
7. **Index document**: `index.html`
8. **Error document**: `error.html`
9. **Redirection rules**: Leave empty
10. Click **Save changes**

### 2.3 Upload Website Files

#### Method 1: AWS Console (Beginner)
1. Go to your bucket
2. Click **Upload**
3. Add all website files (drag and drop)
4. Click **Upload**

#### Method 2: AWS CLI (Recommended)
```bash
# Navigate to your website directory
cd tranquilmindquest-website

# Sync files to S3
aws s3 sync . s3://tranquilmindquest.com \
  --exclude ".git/*" \
  --exclude "*.md" \
  --exclude "deploy.sh" \
  --exclude ".gitignore" \
  --exclude "README-DEPLOYMENT.md"

# Set proper MIME types
aws s3 cp s3://tranquilmindquest.com s3://tranquilmindquest.com \
  --recursive \
  --metadata-directive REPLACE \
  --content-type "text/html" \
  --exclude "*" \
  --include "*.html"

aws s3 cp s3://tranquilmindquest.com s3://tranquilmindquest.com \
  --recursive \
  --metadata-directive REPLACE \
  --content-type "text/css" \
  --exclude "*" \
  --include "*.css"

aws s3 cp s3://tranquilmindquest.com s3://tranquilmindquest.com \
  --recursive \
  --metadata-directive REPLACE \
  --content-type "application/javascript" \
  --exclude "*" \
  --include "*.js"
```

---

## 🔒 Step 3: Apply Bucket Policy

### 3.1 Apply Bucket Policy
1. Go to your S3 bucket
2. Click **Permissions** tab
3. Scroll to **Bucket policy**
4. Click **Edit**
5. Copy and paste the contents of `s3-bucket-policy.json`
6. Click **Save changes**

**Important**: Replace `YOUR-BUCKET-NAME` with your actual bucket name in the policy.

---

## ☁️ Step 4: Set Up CloudFront Distribution

### 4.1 Create Distribution
1. Go to **CloudFront** service
2. Click **Create distribution**
3. **Origin domain**: Select your S3 bucket (`tranquilmindquest.com.s3.amazonaws.com`)
4. **Origin path**: Leave empty
5. **Origin access**: Public
6. **Viewer protocol policy**: Redirect HTTP to HTTPS
7. **Allowed HTTP methods**: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
8. **Cache policy**: CachingOptimized
9. **Default root object**: `index.html`
10. **Price class**: Use all edge locations (or choose cost-optimized)
11. Click **Create distribution**

### 4.2 Configure Custom Error Responses
1. Go to your CloudFront distribution
2. Click **Error pages** tab
3. Click **Create custom error response**
4. **HTTP error code**: 404
5. **Error caching minimum TTL**: 0
6. **Customize error response**: Yes
7. **Response page path**: `/error.html`
8. **HTTP response code**: 200
9. Click **Create custom error response**

### 4.3 Enable Compression
1. Go to **Behaviors** tab
2. Select the default behavior
3. Click **Edit**
4. **Compress objects automatically**: Yes
5. Click **Save changes**

---

## 🌐 Step 5: Configure Custom Domain

### 5.1 Set Up Route 53 Hosted Zone
1. Go to **Route 53** service
2. Click **Hosted zones**
3. Click **Create hosted zone**
4. **Domain name**: `tranquilmindquest.com`
5. **Type**: Public hosted zone
6. Click **Create hosted zone**

### 5.2 Request SSL Certificate
1. Go to **Certificate Manager** service
2. Click **Request a certificate**
3. **Certificate type**: Request a public certificate
4. **Domain names**: 
   - `tranquilmindquest.com`
   - `www.tranquilmindquest.com`
5. **Validation method**: DNS validation
6. Click **Request**

### 5.3 Validate Certificate
1. In Certificate Manager, click your certificate
2. Click **Create record in Route 53** for each domain
3. Wait for validation (usually 5-10 minutes)

### 5.4 Update CloudFront Distribution
1. Go to your CloudFront distribution
2. Click **Settings** tab
3. Click **Edit**
4. **Alternate domain names (CNAMEs)**:
   - `tranquilmindquest.com`
   - `www.tranquilmindquest.com`
5. **SSL certificate**: Custom SSL certificate
6. Select your certificate from the dropdown
7. Click **Save changes**

### 5.5 Create Route 53 Records
1. Go to your Route 53 hosted zone
2. Click **Create record**
3. **Record name**: `tranquilmindquest.com`
4. **Record type**: A
5. **Alias**: Yes
6. **Route traffic to**: Alias to CloudFront distribution
7. **Region**: Global
8. **Distribution**: Select your CloudFront distribution
9. Click **Create records**

Repeat for `www.tranquilmindquest.com` with the same settings.

---

## ✅ Step 6: Test and Verify

### 6.1 Basic Tests
- [ ] Visit `https://tranquilmindquest.com` - should load homepage
- [ ] Visit `https://www.tranquilmindquest.com` - should redirect to main domain
- [ ] Test all pages: `/about.html`, `/products.html`, `/blog.html`, `/contact.html`
- [ ] Check mobile responsiveness
- [ ] Test chatbot functionality on contact page
- [ ] Verify contact form works
- [ ] Test product filtering and search

### 6.2 Performance Tests
- [ ] Use Google PageSpeed Insights
- [ ] Check GTmetrix scores
- [ ] Verify CloudFront caching is working
- [ ] Test from different geographic locations

### 6.3 SEO Tests
- [ ] Check robots.txt is accessible
- [ ] Verify sitemap.xml is accessible
- [ ] Test social media embeds (Open Graph, Twitter Cards)
- [ ] Validate HTML markup

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: "Access Denied" when accessing website
**Solution**: Check bucket policy is applied correctly and public access is not blocked.

#### Issue: CloudFront shows "Access Denied"
**Solution**: Ensure S3 bucket policy allows CloudFront access and origin is configured correctly.

#### Issue: SSL certificate not working
**Solution**: Verify certificate is validated and attached to CloudFront distribution.

#### Issue: Custom domain not resolving
**Solution**: Check Route 53 records are created correctly and DNS propagation is complete (can take up to 48 hours).

#### Issue: Website not updating after changes
**Solution**: CloudFront caches content. Use cache invalidation or wait for TTL to expire.

---

## 📊 Monitoring and Maintenance

### Daily Tasks
- [ ] Check website uptime
- [ ] Monitor error rates in CloudFront

### Weekly Tasks
- [ ] Review CloudFront access logs
- [ ] Check AWS costs in Cost Explorer
- [ ] Update blog content
- [ ] Monitor chatbot performance

### Monthly Tasks
- [ ] Review and optimize CloudFront cache settings
- [ ] Check S3 storage usage
- [ ] Review security settings
- [ ] Update website content

### Quarterly Tasks
- [ ] SEO audit and optimization
- [ ] Check for broken links
- [ ] Review and update SSL certificates
- [ ] Performance optimization review

---

## 🚨 Security Best Practices

### S3 Security
- Enable bucket versioning
- Enable server-side encryption
- Use bucket policies instead of ACLs
- Regular backup of website files

### CloudFront Security
- Always use HTTPS
- Enable DDoS protection
- Use AWS WAF if needed
- Monitor access patterns

### General Security
- Never commit AWS credentials to version control
- Use IAM roles with minimal permissions
- Enable CloudTrail for audit logging
- Regular security reviews

---

## 📈 Performance Optimization

### CloudFront Optimization
- Enable compression
- Use appropriate cache TTLs
- Configure custom error pages
- Use appropriate price class

### S3 Optimization
- Use appropriate storage class
- Enable lifecycle policies for old versions
- Optimize file sizes
- Use appropriate MIME types

---

## 🔄 Backup and Recovery

### Backup Strategy
1. **Website Files**: Keep local copies and version control
2. **S3 Bucket**: Enable versioning and cross-region replication
3. **Route 53**: Export hosted zone configuration
4. **CloudFront**: Document distribution settings

### Recovery Plan
1. **Website Down**: Check CloudFront status, S3 bucket access
2. **Domain Issues**: Verify Route 53 records
3. **SSL Problems**: Check certificate status and validation
4. **Data Loss**: Restore from S3 versioning or local backups

---

## 📞 Support and Resources

### AWS Support
- **Basic Support**: Free (community forums)
- **Developer Support**: $29/month (recommended for production)
- **Business Support**: $100/month (24/7 phone support)

### Documentation
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Route 53 Documentation](https://docs.aws.amazon.com/route53/)

### Community Resources
- [AWS Forums](https://forums.aws.amazon.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/amazon-web-services)
- [AWS Subreddit](https://www.reddit.com/r/aws/)

---

## 🎯 Next Steps

After successful deployment:

1. **Set up monitoring** with CloudWatch
2. **Configure analytics** with Google Analytics
3. **Implement CI/CD** pipeline for automated deployments
4. **Set up chatbot backend** with AWS Lex
5. **Configure email services** with AWS SES
6. **Implement form handling** with AWS Lambda

---

## 📝 Deployment Checklist

Use this checklist to ensure nothing is missed:

### Pre-Deployment
- [ ] AWS account created and configured
- [ ] Domain name registered
- [ ] Website files tested locally
- [ ] AWS CLI installed (optional)

### S3 Setup
- [ ] S3 bucket created with correct name
- [ ] Static website hosting enabled
- [ ] Bucket policy applied
- [ ] Website files uploaded
- [ ] Public access configured correctly

### CloudFront Setup
- [ ] CloudFront distribution created
- [ ] Custom error responses configured
- [ ] Compression enabled
- [ ] SSL certificate attached
- [ ] Custom domain configured

### Domain Setup
- [ ] Route 53 hosted zone created
- [ ] SSL certificate requested and validated
- [ ] DNS records created
- [ ] Domain propagation verified

### Testing
- [ ] All pages load correctly
- [ ] HTTPS working
- [ ] Mobile responsive
- [ ] Forms functional
- [ ] Performance acceptable

### Post-Deployment
- [ ] Monitoring configured
- [ ] Backup strategy implemented
- [ ] Documentation updated
- [ ] Team trained on maintenance

---

**🎉 Congratulations! Your TranquilMindQuest website is now live on AWS!**

For questions or issues, refer to the troubleshooting section or contact AWS support.







