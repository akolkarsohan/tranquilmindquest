# TranquilMindQuest API Gateway Configuration
## REST API Setup for Chatbot Integration

### 🎯 **OVERVIEW**

This guide covers the complete API Gateway setup for the TranquilMindQuest chatbot, including REST API creation, CORS configuration, deployment stages, and integration with AWS Lex and Lambda.

---

### 📋 **PREREQUISITES**

Before starting, ensure you have:

- [ ] AWS Account with appropriate permissions
- [ ] Lambda function deployed (`tranquilquest-chatbot-handler`)
- [ ] Lex bot configured (`TranquilMindQuest-SupportBot`)
- [ ] Domain name configured (tranquilmindquest.com)
- [ ] SSL certificate in AWS Certificate Manager

---

### 🚀 **STEP 1: CREATE REST API**

#### **1.1 API Creation**

1. **Navigate to API Gateway Console**
   - Go to [API Gateway Console](https://console.aws.amazon.com/apigateway/)
   - Click "Create API"

2. **API Configuration**
   ```
   API name: TranquilMindQuest-Chatbot-API
   Description: REST API for TranquilMindQuest mental health chatbot
   Endpoint type: Regional
   API type: REST API
   ```

3. **API Settings**
   ```
   API Gateway role: Create new role
   CloudWatch role: Create new role
   Enable API key: Optional (for rate limiting)
   ```

#### **1.2 API Structure**

```
TranquilMindQuest-Chatbot-API
├── /chat (POST) - Main chatbot endpoint
├── /health (GET) - Health check endpoint
├── /status (GET) - API status endpoint
└── /metrics (GET) - Usage metrics endpoint
```

---

### 🔧 **STEP 2: CONFIGURE RESOURCES AND METHODS**

#### **2.1 Create Main Chat Resource**

1. **Create Resource**
   ```
   Resource name: chat
   Resource path: /chat
   Enable CORS: Yes
   ```

2. **Create POST Method**
   ```
   Method: POST
   Integration type: Lambda Function
   Lambda function: tranquilquest-chatbot-handler
   Use Lambda Proxy integration: Yes
   ```

3. **Method Configuration**
   ```
   Authorization: None (for public access)
   Request validator: Validate body
   API key required: Optional
   ```

#### **2.2 Create Health Check Resource**

1. **Create Resource**
   ```
   Resource name: health
   Resource path: /health
   Enable CORS: Yes
   ```

2. **Create GET Method**
   ```
   Method: GET
   Integration type: Mock
   Mock integration: Yes
   ```

3. **Mock Response**
   ```json
   {
     "status": "healthy",
     "timestamp": "2024-01-15T10:30:00Z",
     "service": "TranquilMindQuest-Chatbot-API",
     "version": "1.0.0"
   }
   ```

#### **2.3 Create Status Resource**

1. **Create Resource**
   ```
   Resource name: status
   Resource path: /status
   Enable CORS: Yes
   ```

2. **Create GET Method**
   ```
   Method: GET
   Integration type: Lambda Function
   Lambda function: tranquilquest-status-handler
   Use Lambda Proxy integration: Yes
   ```

---

### 🌐 **STEP 3: CORS CONFIGURATION**

#### **3.1 CORS Settings for /chat**

```json
{
  "Access-Control-Allow-Origin": "https://tranquilmindquest.com",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Max-Age": "86400"
}
```

#### **3.2 CORS Settings for /health**

```json
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Max-Age": "86400"
}
```

#### **3.3 CORS Settings for /status**

```json
{
  "Access-Control-Allow-Origin": "https://tranquilmindquest.com",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Max-Age": "86400"
}
```

---

### 🔒 **STEP 4: SECURITY CONFIGURATION**

#### **4.1 API Key Configuration**

1. **Create API Key**
   ```
   API key name: TranquilMindQuest-Chatbot-Key
   Description: API key for chatbot rate limiting
   API key source: HEADER
   ```

2. **Create Usage Plan**
   ```
   Usage plan name: TranquilMindQuest-Chatbot-Plan
   Throttle: 100 requests per second
   Burst: 200 requests per second
   Quota: 10,000 requests per day
   ```

3. **Associate API Key**
   - Link API key to usage plan
   - Associate usage plan with API stages

#### **4.2 Request Validation**

1. **Create Request Validator**
   ```
   Validator name: Chatbot-Request-Validator
   Validate request body: Yes
   Validate request parameters: No
   Validate request headers: No
   ```

2. **Apply to Methods**
   - Apply validator to POST /chat
   - Apply validator to GET /status

#### **4.3 Rate Limiting**

1. **Method-level Throttling**
   ```
   POST /chat: 50 requests per second
   GET /health: 100 requests per second
   GET /status: 20 requests per second
   ```

2. **Account-level Throttling**
   ```
   Default: 10,000 requests per second
   Burst: 20,000 requests per second
   ```

---

### 📊 **STEP 5: MONITORING AND LOGGING**

#### **5.1 CloudWatch Integration**

1. **Enable CloudWatch Logs**
   ```
   Log level: INFO
   Log format: JSON
   Include request/response data: Yes
   ```

2. **Create CloudWatch Dashboard**
   ```
   Dashboard name: TranquilMindQuest-Chatbot-API
   Metrics to include:
   - Request count
   - Error rate
   - Latency
   - Cache hit rate
   ```

#### **5.2 Custom Metrics**

1. **Create Custom Metrics**
   ```javascript
   // In Lambda function
   await cloudwatch.putMetricData({
       Namespace: 'TranquilMindQuest/API',
       MetricData: [{
           MetricName: 'ChatbotRequests',
           Value: 1,
           Unit: 'Count'
       }]
   }).promise();
   ```

2. **Set Up Alarms**
   ```
   High error rate alarm: >5% error rate
   High latency alarm: >2 seconds average
   Low request count alarm: <10 requests/hour
   ```

---

### 🚀 **STEP 6: DEPLOYMENT STAGES**

#### **6.1 Development Stage**

1. **Create Development Stage**
   ```
   Stage name: dev
   Stage description: Development environment
   Deployment: Manual
   Cache: Disabled
   ```

2. **Development Configuration**
   ```
   Log level: DEBUG
   Throttling: 10 requests per second
   API key: Optional
   ```

#### **6.2 Staging Stage**

1. **Create Staging Stage**
   ```
   Stage name: staging
   Stage description: Staging environment
   Deployment: Manual
   Cache: Enabled (5 minutes)
   ```

2. **Staging Configuration**
   ```
   Log level: INFO
   Throttling: 50 requests per second
   API key: Required
   ```

#### **6.3 Production Stage**

1. **Create Production Stage**
   ```
   Stage name: prod
   Stage description: Production environment
   Deployment: Manual
   Cache: Enabled (10 minutes)
   ```

2. **Production Configuration**
   ```
   Log level: WARN
   Throttling: 100 requests per second
   API key: Required
   ```

---

### 🌍 **STEP 7: CUSTOM DOMAIN SETUP**

#### **7.1 Domain Configuration**

1. **Create Custom Domain**
   ```
   Domain name: api.tranquilmindquest.com
   Certificate: Use existing ACM certificate
   Endpoint type: Regional
   ```

2. **Domain Mapping**
   ```
   Base path: /chatbot
   Target stage: prod
   Target API: TranquilMindQuest-Chatbot-API
   ```

#### **7.2 Route 53 Configuration**

1. **Create Route 53 Record**
   ```
   Record type: A (Alias)
   Alias target: API Gateway domain
   TTL: 300 seconds
   ```

2. **Health Check**
   ```
   Health check path: /health
   Health check interval: 30 seconds
   Failure threshold: 3
   ```

---

### 📱 **STEP 8: FRONTEND INTEGRATION**

#### **8.1 Update Chat.js**

Replace the `generateBotResponse` function in `contact.js`:

```javascript
async function generateBotResponse(userMessage) {
    try {
        const response = await fetch('https://api.tranquilmindquest.com/chatbot/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': 'YOUR_API_KEY' // Optional for rate limiting
            },
            body: JSON.stringify({
                message: userMessage,
                userId: getUserId(),
                sessionId: getSessionId(),
                timestamp: new Date().toISOString()
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.message || data.content;
        
    } catch (error) {
        console.error('Chatbot API error:', error);
        return "I'm having trouble connecting right now. Please try again in a moment, or visit our website for immediate support.";
    }
}
```

#### **8.2 Error Handling**

```javascript
function handleApiError(error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return "I'm having trouble connecting right now. Please check your internet connection and try again.";
    } else if (error.status === 429) {
        return "I'm receiving too many requests right now. Please wait a moment and try again.";
    } else if (error.status >= 500) {
        return "I'm experiencing technical difficulties. Please try again in a few minutes.";
    } else {
        return "I'm having trouble processing your request. Please try rephrasing your question.";
    }
}
```

---

### 🧪 **STEP 9: TESTING AND VALIDATION**

#### **9.1 API Testing**

1. **Test Endpoints**
   ```bash
   # Test health endpoint
   curl -X GET https://api.tranquilmindquest.com/chatbot/health
   
   # Test chat endpoint
   curl -X POST https://api.tranquilmindquest.com/chatbot/chat \
     -H "Content-Type: application/json" \
     -H "X-API-Key: YOUR_API_KEY" \
     -d '{"message": "hello", "userId": "test-user"}'
   ```

2. **Test CORS**
   ```javascript
   fetch('https://api.tranquilmindquest.com/chatbot/chat', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({message: 'test'})
   })
   .then(response => console.log('CORS test passed'))
   .catch(error => console.error('CORS test failed:', error));
   ```

#### **9.2 Load Testing**

1. **Use Artillery.js**
   ```yaml
   config:
     target: 'https://api.tranquilmindquest.com'
     phases:
       - duration: 60
         arrivalRate: 10
   scenarios:
     - name: "Chatbot API Test"
       requests:
         - post:
             url: "/chatbot/chat"
             json:
               message: "test message"
   ```

2. **Monitor Performance**
   - Response time < 2 seconds
   - Error rate < 1%
   - Throughput > 50 requests/second

---

### 📈 **STEP 10: OPTIMIZATION AND MONITORING**

#### **10.1 Performance Optimization**

1. **Enable Caching**
   ```
   Cache TTL: 300 seconds (5 minutes)
   Cache key: Request method + URI + query parameters
   Cache size: 0.5 GB
   ```

2. **Compression**
   ```
   Enable compression: Yes
   Compression types: gzip, deflate
   Minimum size: 1024 bytes
   ```

#### **10.2 Monitoring Dashboard**

1. **CloudWatch Dashboard**
   ```
   Dashboard widgets:
   - Request count (line chart)
   - Error rate (line chart)
   - Latency (line chart)
   - Cache hit rate (line chart)
   - Top error codes (bar chart)
   ```

2. **Custom Metrics**
   ```javascript
   // Track chatbot-specific metrics
   await cloudwatch.putMetricData({
       Namespace: 'TranquilMindQuest/Chatbot',
       MetricData: [{
           MetricName: 'IntentDistribution',
           Dimensions: [{
               Name: 'IntentName',
               Value: intentName
           }],
           Value: 1,
           Unit: 'Count'
       }]
   }).promise();
   ```

---

### 🔧 **STEP 11: MAINTENANCE AND UPDATES**

#### **11.1 Regular Maintenance**

**Weekly Tasks**:
- [ ] Review API Gateway logs
- [ ] Check error rates and latency
- [ ] Monitor rate limiting effectiveness
- [ ] Review security metrics

**Monthly Tasks**:
- [ ] Analyze usage patterns
- [ ] Update rate limiting thresholds
- [ ] Review and rotate API keys
- [ ] Performance optimization review

**Quarterly Tasks**:
- [ ] Comprehensive security audit
- [ ] API versioning review
- [ ] Cost optimization analysis
- [ ] Feature enhancement planning

#### **11.2 Update Procedures**

1. **Deployment Process**
   ```
   1. Test changes in development stage
   2. Deploy to staging stage
   3. Run integration tests
   4. Deploy to production stage
   5. Monitor for issues
   ```

2. **Rollback Procedures**
   ```
   1. Identify the issue
   2. Revert to previous deployment
   3. Monitor system stability
   4. Investigate root cause
   ```

---

### 🚨 **STEP 12: TROUBLESHOOTING**

#### **12.1 Common Issues**

**Issue**: CORS errors
**Solution**: 
- Verify CORS configuration
- Check allowed origins
- Ensure preflight requests are handled

**Issue**: High latency
**Solution**:
- Enable caching
- Optimize Lambda function
- Check CloudFront configuration

**Issue**: Rate limiting errors
**Solution**:
- Review usage plan settings
- Check API key configuration
- Monitor request patterns

**Issue**: Authentication failures
**Solution**:
- Verify API key validity
- Check IAM permissions
- Review request headers

#### **12.2 Debugging Tools**

1. **CloudWatch Logs**
   - API Gateway execution logs
   - Lambda function logs
   - Custom application logs

2. **X-Ray Tracing**
   - Enable X-Ray tracing
   - Monitor request flow
   - Identify bottlenecks

3. **API Gateway Test**
   - Use built-in test feature
   - Test individual methods
   - Validate request/response

---

### 📚 **STEP 13: DOCUMENTATION AND SUPPORT**

#### **13.1 API Documentation**

1. **OpenAPI Specification**
   ```yaml
   openapi: 3.0.0
   info:
     title: TranquilMindQuest Chatbot API
     version: 1.0.0
     description: REST API for mental health chatbot
   paths:
     /chat:
       post:
         summary: Send message to chatbot
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 type: object
                 properties:
                   message:
                     type: string
                   userId:
                     type: string
   ```

2. **API Reference**
   - Endpoint documentation
   - Request/response examples
   - Error code reference
   - Rate limiting information

#### **13.2 Support Procedures**

1. **Monitoring Alerts**
   - Set up CloudWatch alarms
   - Configure SNS notifications
   - Define escalation procedures

2. **Incident Response**
   - Document common issues
   - Create runbooks
   - Establish communication channels

---

### ✅ **DEPLOYMENT CHECKLIST**

#### **Pre-Deployment**
- [ ] API Gateway created and configured
- [ ] Resources and methods created
- [ ] CORS configured correctly
- [ ] Security settings applied
- [ ] Monitoring enabled

#### **Testing**
- [ ] All endpoints tested
- [ ] CORS validation passed
- [ ] Error handling verified
- [ ] Rate limiting tested
- [ ] Load testing completed

#### **Security**
- [ ] API keys configured
- [ ] Rate limiting enabled
- [ ] Request validation active
- [ ] HTTPS enforced
- [ ] Access logging enabled

#### **Monitoring**
- [ ] CloudWatch dashboard created
- [ ] Custom metrics configured
- [ ] Alarms set up
- [ ] Logging enabled
- [ ] Performance monitoring active

#### **Post-Deployment**
- [ ] Frontend integration tested
- [ ] Production monitoring active
- [ ] Documentation updated
- [ ] Support procedures documented
- [ ] Maintenance schedule established

---

### 💰 **COST OPTIMIZATION**

#### **API Gateway Costs**
- **REST API**: $3.50 per million requests
- **Data transfer**: $0.09 per GB
- **Custom domain**: $0.50 per month
- **API key**: Free

#### **Optimization Strategies**
- Enable caching to reduce Lambda invocations
- Use compression to reduce data transfer
- Implement request validation to reduce errors
- Monitor usage patterns and adjust limits

---

**🎉 Congratulations! Your TranquilMindQuest API Gateway is now ready for production!**

For questions or issues, refer to the troubleshooting section or contact AWS support. Remember to monitor performance and security regularly.






