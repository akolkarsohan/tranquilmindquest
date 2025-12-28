# TranquilMindQuest AWS Serverless Chatbot Setup Guide
## Complete AWS Lex + Lambda + API Gateway Implementation

### 🎯 **OVERVIEW**

This guide will walk you through setting up a complete serverless chatbot backend for TranquilMindQuest using AWS Lex, Lambda, and API Gateway. The chatbot provides mental health support, crisis intervention, and resource guidance.

---

### 📋 **PREREQUISITES**

Before starting, ensure you have:

- [ ] AWS Account with appropriate permissions
- [ ] AWS CLI installed and configured
- [ ] Node.js 18.x installed locally
- [ ] Basic understanding of AWS services
- [ ] TranquilMindQuest website deployed

---

### 💰 **COST ESTIMATES**

| Service | Free Tier | Paid Usage | Monthly Cost (1K conversations) |
|---------|-----------|------------|-----------------------------------|
| **AWS Lex** | 10K text requests | $0.004/request | ~$4.00 |
| **Lambda** | 1M requests | $0.20/1M requests | ~$0.50 |
| **API Gateway** | 1M requests (12 months) | $3.50/1M requests | ~$1.00 |
| **CloudWatch** | 5GB logs | $0.50/GB | ~$2.00 |
| **Total Estimated** | | | **$7.50/month** |

---

### 🚀 **STEP 1: AWS LEX BOT SETUP**

#### **1.1 Create Lex Bot**

1. **Navigate to AWS Lex Console**
   - Go to [AWS Lex Console](https://console.aws.amazon.com/lex/)
   - Click "Create bot"

2. **Bot Configuration**
   ```
   Bot name: TranquilMindQuest-SupportBot
   Description: Mental health support chatbot for TranquilMindQuest
   IAM role: Create new role (LexBotRole)
   COPPA compliance: No
   Idle session timeout: 5 minutes
   ```

3. **Voice Settings**
   ```
   Output voice: Joanna (calming, professional)
   Language: English (US)
   ```

4. **Advanced Settings**
   ```
   Enable conversation logs: Yes
   Log level: INFO
   CloudWatch log group: /aws/lex/TranquilMindQuest-SupportBot
   ```

#### **1.2 Create Intents**

Create the following intents in your Lex bot:

**GreetingIntent**
- Sample utterances:
  - "hello"
  - "hi"
  - "hey"
  - "good morning"
  - "good afternoon"
  - "good evening"
  - "start"
  - "begin"
  - "help me"
  - "I need help"

**AnxietyHelpIntent**
- Sample utterances:
  - "I'm anxious"
  - "help with anxiety"
  - "feeling anxious"
  - "panic attack"
  - "worried"
  - "nervous"
  - "scared"
  - "overwhelmed"
  - "can't calm down"
  - "racing thoughts"

**MeditationInfoIntent**
- Sample utterances:
  - "what is meditation"
  - "how to meditate"
  - "meditation help"
  - "teach me meditation"
  - "meditation guide"
  - "learn meditation"
  - "meditation techniques"
  - "mindfulness meditation"

**BreathingExerciseIntent**
- Sample utterances:
  - "breathing exercise"
  - "how to breathe"
  - "calm down"
  - "relaxation technique"
  - "breathing techniques"
  - "deep breathing"
  - "breathing help"
  - "box breathing"

**StressManagementIntent**
- Sample utterances:
  - "I'm stressed"
  - "manage stress"
  - "feeling overwhelmed"
  - "too much pressure"
  - "work stress"
  - "stress relief"
  - "burnout"
  - "exhausted"

**DepressionSupportIntent**
- Sample utterances:
  - "I'm depressed"
  - "feeling sad"
  - "need help"
  - "feeling down"
  - "hopeless"
  - "empty"
  - "no motivation"
  - "can't get out of bed"

**ResourcesIntent**
- Sample utterances:
  - "show resources"
  - "where can I find help"
  - "I need information"
  - "mental health resources"
  - "helpful links"
  - "support groups"
  - "professional help"

**CrisisIntent** (HIGH PRIORITY)
- Sample utterances:
  - "I want to die"
  - "suicide"
  - "kill myself"
  - "end it all"
  - "harm myself"
  - "not worth living"
  - "better off dead"
  - "want to disappear"

**ProductRecommendationIntent**
- Sample utterances:
  - "recommend products"
  - "what should I buy"
  - "help with shopping"
  - "wellness products"
  - "meditation supplies"
  - "anxiety tools"

**FallbackIntent**
- Sample utterances:
  - "I don't understand"
  - "what do you mean"
  - "can you help"
  - "not sure"
  - "confused"

#### **1.3 Configure Intent Fulfillment**

For each intent:
1. Go to the intent configuration
2. Set **Fulfillment** to "AWS Lambda function"
3. Function name: `tranquilquest-chatbot-handler`
4. Function version: `$LATEST`

---

### ⚡ **STEP 2: LAMBDA FUNCTION SETUP**

#### **2.1 Create Lambda Function**

1. **Navigate to AWS Lambda Console**
   - Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/)
   - Click "Create function"

2. **Function Configuration**
   ```
   Function name: tranquilquest-chatbot-handler
   Runtime: Node.js 18.x
   Architecture: x86_64
   Execution role: Create new role with basic Lambda permissions
   ```

3. **Function Settings**
   ```
   Memory: 256 MB
   Timeout: 10 seconds
   Environment variables: None (for now)
   ```

#### **2.2 Deploy Lambda Code**

1. **Replace the default code** with the provided `lambda-function.js`
2. **Deploy the function**
3. **Test the function** with sample Lex events

#### **2.3 Configure Lambda Permissions**

1. **Add Lex permissions** to Lambda execution role:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "lex:PostText",
           "lex:PostContent"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

2. **Grant Lex permission** to invoke Lambda:
   - In Lex console, go to bot settings
   - Add Lambda function
   - Grant permission when prompted

---

### 🌐 **STEP 3: API GATEWAY SETUP**

#### **3.1 Create REST API**

1. **Navigate to API Gateway Console**
   - Go to [API Gateway Console](https://console.aws.amazon.com/apigateway/)
   - Click "Create API"
   - Choose "REST API"

2. **API Configuration**
   ```
   API name: TranquilMindQuest-Chatbot-API
   Description: API for TranquilMindQuest chatbot
   Endpoint type: Regional
   ```

#### **3.2 Create Resources and Methods**

1. **Create Resource**
   ```
   Resource name: chat
   Resource path: /chat
   ```

2. **Create Method**
   ```
   Method: POST
   Integration type: Lambda Function
   Lambda function: tranquilquest-chatbot-handler
   Use Lambda Proxy integration: Yes
   ```

#### **3.3 Configure CORS**

1. **Enable CORS** on the `/chat` resource
2. **CORS Configuration**:
   ```
   Access-Control-Allow-Origin: https://tranquilmindquest.com
   Access-Control-Allow-Headers: Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token
   Access-Control-Allow-Methods: POST,OPTIONS
   ```

#### **3.4 Deploy API**

1. **Create Deployment**
   ```
   Stage name: v1
   Stage description: Production stage for chatbot API
   ```

2. **Note the Invoke URL** for frontend integration

---

### 🔧 **STEP 4: FRONTEND INTEGRATION**

#### **4.1 Update Chat.js**

Replace the `generateBotResponse` function in `contact.js` with:

```javascript
async function generateBotResponse(userMessage) {
    try {
        const response = await fetch('YOUR_API_GATEWAY_URL/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                userId: getUserId() // Implement user identification
            })
        });
        
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Chatbot API error:', error);
        return "I'm having trouble connecting right now. Please try again in a moment.";
    }
}
```

#### **4.2 Error Handling**

Add comprehensive error handling for:
- Network failures
- API timeouts
- Invalid responses
- Rate limiting

---

### 📊 **STEP 5: MONITORING AND ANALYTICS**

#### **5.1 CloudWatch Setup**

1. **Enable CloudWatch Logs** for:
   - Lambda function
   - Lex bot
   - API Gateway

2. **Create CloudWatch Dashboard** with:
   - Request count
   - Error rate
   - Response time
   - Intent distribution

#### **5.2 Custom Metrics**

Add custom metrics to Lambda function:
```javascript
const cloudwatch = new AWS.CloudWatch();

// Track intent usage
await cloudwatch.putMetricData({
    Namespace: 'TranquilMindQuest/Chatbot',
    MetricData: [{
        MetricName: 'IntentUsage',
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

### 🔒 **STEP 6: SECURITY AND COMPLIANCE**

#### **6.1 Security Measures**

1. **API Gateway Security**
   - Enable API key (optional)
   - Rate limiting
   - Request validation

2. **Lambda Security**
   - Least privilege IAM roles
   - Environment variable encryption
   - VPC configuration (if needed)

3. **Data Protection**
   - No PII storage
   - Secure HTTPS only
   - Data retention policies

#### **6.2 Compliance Considerations**

**Important Disclaimers**:
- This chatbot is NOT HIPAA-compliant
- Not a replacement for professional therapy
- Crisis situations require immediate professional help
- Data is logged for 30 days in CloudWatch

**Required Disclaimers**:
- Add to chatbot interface
- Include in privacy policy
- Mention in terms of service

---

### 🧪 **STEP 7: TESTING AND VALIDATION**

#### **7.1 Lex Console Testing**

1. **Test each intent** individually
2. **Verify responses** are appropriate
3. **Check crisis detection** works correctly
4. **Test fallback** scenarios

#### **7.2 Integration Testing**

1. **Test API Gateway** endpoint
2. **Verify CORS** configuration
3. **Test error handling**
4. **Validate response format**

#### **7.3 User Acceptance Testing**

1. **Test with real users**
2. **Gather feedback**
3. **Monitor conversation logs**
4. **Refine responses** based on feedback

---

### 📈 **STEP 8: OPTIMIZATION AND IMPROVEMENT**

#### **8.1 Performance Optimization**

1. **Lambda Optimization**
   - Increase memory if needed
   - Optimize cold start
   - Use connection pooling

2. **Response Time**
   - Target < 2 seconds
   - Monitor CloudWatch metrics
   - Optimize Lambda code

#### **8.2 Intent Refinement**

1. **Monitor Fallback Rate**
   - Target < 20%
   - Add new utterances
   - Improve intent recognition

2. **User Feedback Integration**
   - Collect satisfaction ratings
   - Analyze conversation logs
   - Update responses

#### **8.3 Analytics and Insights**

1. **Popular Intents**
   - Track most used intents
   - Optimize popular responses
   - Create content around popular topics

2. **User Journey Analysis**
   - Track conversation flows
   - Identify common paths
   - Optimize user experience

---

### 🚨 **STEP 9: CRISIS INTERVENTION PROTOCOLS**

#### **9.1 Crisis Detection**

The CrisisIntent is configured to detect:
- Suicidal ideation
- Self-harm intentions
- Hopelessness expressions
- Crisis language

#### **9.2 Crisis Response Protocol**

1. **Immediate Response**
   - Provide crisis hotline numbers
   - Offer online crisis chat
   - Encourage immediate help-seeking

2. **Follow-up Actions**
   - Log crisis conversations
   - Flag for review
   - Consider escalation procedures

#### **9.3 Crisis Resources**

Always include:
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- Online crisis chat options
- Local emergency services

---

### 🔄 **STEP 10: MAINTENANCE AND UPDATES**

#### **10.1 Regular Maintenance**

**Weekly Tasks**:
- [ ] Review CloudWatch logs
- [ ] Check error rates
- [ ] Monitor response times
- [ ] Review crisis conversations

**Monthly Tasks**:
- [ ] Analyze intent usage patterns
- [ ] Update sample utterances
- [ ] Review and refine responses
- [ ] Check for new mental health resources

**Quarterly Tasks**:
- [ ] Comprehensive bot review
- [ ] Intent optimization
- [ ] Response quality assessment
- [ ] Security audit

#### **10.2 Continuous Improvement**

1. **A/B Testing**
   - Test different response formats
   - Compare response effectiveness
   - Optimize based on results

2. **Machine Learning Integration**
   - Consider Amazon Comprehend for sentiment analysis
   - Implement response personalization
   - Add conversation context

---

### 📞 **SUPPORT AND TROUBLESHOOTING**

#### **Common Issues**

**Issue**: Lambda function not responding
**Solution**: Check IAM permissions, function timeout, memory allocation

**Issue**: Lex not recognizing intents
**Solution**: Add more sample utterances, check utterance patterns

**Issue**: API Gateway CORS errors
**Solution**: Verify CORS configuration, check allowed origins

**Issue**: High fallback rate
**Solution**: Analyze unrecognized utterances, add new intents

#### **AWS Support**

- **Basic Support**: Community forums
- **Developer Support**: $29/month (recommended)
- **Business Support**: $100/month (24/7 phone)

---

### 📚 **ADDITIONAL RESOURCES**

#### **AWS Documentation**
- [AWS Lex Developer Guide](https://docs.aws.amazon.com/lex/)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/)
- [API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/)

#### **Mental Health Resources**
- [National Suicide Prevention Lifeline](https://suicidepreventionlifeline.org/)
- [Crisis Text Line](https://www.crisistextline.org/)
- [Mental Health America](https://www.mhanational.org/)

#### **Best Practices**
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Mental Health Chatbot Guidelines](https://www.apa.org/ethics/code)

---

### ✅ **DEPLOYMENT CHECKLIST**

#### **Pre-Deployment**
- [ ] AWS account configured
- [ ] IAM permissions set up
- [ ] Lambda function created
- [ ] Lex bot configured
- [ ] API Gateway deployed

#### **Testing**
- [ ] All intents tested in Lex console
- [ ] API Gateway endpoint tested
- [ ] Frontend integration tested
- [ ] Crisis detection verified
- [ ] Error handling validated

#### **Security**
- [ ] CORS configured correctly
- [ ] HTTPS enforced
- [ ] No PII storage
- [ ] Disclaimers added
- [ ] Privacy policy updated

#### **Monitoring**
- [ ] CloudWatch logs enabled
- [ ] Custom metrics configured
- [ ] Alarms set up
- [ ] Dashboard created
- [ ] Monitoring procedures documented

#### **Post-Deployment**
- [ ] User acceptance testing completed
- [ ] Performance monitoring active
- [ ] Support procedures documented
- [ ] Maintenance schedule established
- [ ] Success metrics defined

---

**🎉 Congratulations! Your TranquilMindQuest chatbot backend is now ready for deployment!**

For questions or issues, refer to the troubleshooting section or contact AWS support. Remember to prioritize user safety and always provide appropriate crisis resources.
