/**
 * AWS Lambda Function: Newsletter Subscription Handler
 * 
 * This Lambda function handles newsletter subscriptions and sends welcome emails via AWS SES.
 * 
 * Prerequisites:
 * - AWS SES email verified
 * - Lambda execution role has SES permissions
 * - API Gateway configured to invoke this function
 */

const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: process.env.AWS_REGION || 'ap-south-1' });

// Configuration - Update these values
const FROM_EMAIL = process.env.FROM_EMAIL || 'newsletter@tranquilmindquest.com';
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'contact@tranquilmindquest.com';

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
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
        let body;
        if (typeof event.body === 'string') {
            body = JSON.parse(event.body);
        } else {
            body = event.body || {};
        }

        const { email, name } = body;

        // Validate email
        if (!email || typeof email !== 'string') {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'Email address is required'
                })
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid email address format'
                })
            };
        }

        const cleanEmail = email.trim().toLowerCase();
        const displayName = name || cleanEmail.split('@')[0];

        // Welcome email content
        const subject = 'Welcome to TranquilMindQuest Newsletter! 🧘';
        
        const htmlBody = createWelcomeEmailHTML(displayName);
        const textBody = createWelcomeEmailText(displayName);

        // Send email using SES
        const params = {
            Source: FROM_EMAIL,
            Destination: {
                ToAddresses: [cleanEmail]
            },
            ReplyToAddresses: [REPLY_TO_EMAIL],
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
            },
            Tags: [
                {
                    Name: 'newsletter',
                    Value: 'subscription'
                }
            ]
        };

        const result = await ses.sendEmail(params).promise();

        console.log('Email sent successfully:', result.MessageId);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Subscription confirmed! Please check your email for confirmation.',
                messageId: result.MessageId
            })
        };

    } catch (error) {
        console.error('Error processing subscription:', error);

        // Handle specific AWS SES errors
        let errorMessage = 'Failed to process subscription. Please try again later.';
        
        if (error.code === 'MessageRejected') {
            errorMessage = 'Invalid email address. Please check and try again.';
        } else if (error.code === 'MailFromDomainNotVerifiedException') {
            errorMessage = 'Service temporarily unavailable. Please try again later.';
        } else if (error.code === 'ConfigurationSetDoesNotExistException') {
            errorMessage = 'Service configuration error. Please contact support.';
        }

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: errorMessage
            })
        };
    }
};

/**
 * Create HTML email template
 */
function createWelcomeEmailHTML(name) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to TranquilMindQuest</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .content p {
            margin: 0 0 20px 0;
            font-size: 16px;
        }
        .content ul {
            margin: 20px 0;
            padding-left: 20px;
        }
        .content li {
            margin: 10px 0;
            font-size: 16px;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            margin: 30px 0;
            font-weight: 600;
            font-size: 16px;
        }
        .footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
        }
        .footer p {
            margin: 5px 0;
            font-size: 12px;
            color: #666666;
        }
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            .header {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to TranquilMindQuest! 🧘</h1>
        </div>
        <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for subscribing to our weekly wellness newsletter! We're thrilled to have you join our community of individuals committed to mental wellness and personal growth.</p>
            
            <p><strong>Every week, you'll receive:</strong></p>
            <ul>
                <li>🔬 Science-based mental health tips and insights</li>
                <li>💆 Guided exercises and mindfulness practices</li>
                <li>📚 Curated resources for your wellness journey</li>
                <li>💡 Practical strategies for managing stress and anxiety</li>
                <li>🎯 Expert advice from mental health professionals</li>
            </ul>
            
            <p>We're committed to providing you with valuable, evidence-based content that supports your mental wellness journey. We respect your privacy and promise to never spam you—you can unsubscribe at any time.</p>
            
            <div style="text-align: center;">
                <a href="https://tranquilmindquest.com" class="button">Explore Our Resources</a>
            </div>
            
            <p>Stay mindful and take care,<br><strong>The TranquilMindQuest Team</strong></p>
        </div>
        <div class="footer">
            <p><strong>TranquilMindQuest</strong> - Your journey to mental wellness</p>
            <p>
                <a href="https://tranquilmindquest.com">Visit our website</a> | 
                <a href="https://tranquilmindquest.com/privacy.html">Privacy Policy</a> | 
                <a href="https://tranquilmindquest.com/unsubscribe">Unsubscribe</a>
            </p>
            <p>© ${new Date().getFullYear()} TranquilMindQuest. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
}

/**
 * Create plain text email template
 */
function createWelcomeEmailText(name) {
    return `
Welcome to TranquilMindQuest! 🧘

Hi ${name},

Thank you for subscribing to our weekly wellness newsletter! We're thrilled to have you join our community of individuals committed to mental wellness and personal growth.

Every week, you'll receive:
- Science-based mental health tips and insights
- Guided exercises and mindfulness practices
- Curated resources for your wellness journey
- Practical strategies for managing stress and anxiety
- Expert advice from mental health professionals

We're committed to providing you with valuable, evidence-based content that supports your mental wellness journey. We respect your privacy and promise to never spam you—you can unsubscribe at any time.

Explore our resources: https://tranquilmindquest.com

Stay mindful and take care,
The TranquilMindQuest Team

---
TranquilMindQuest - Your journey to mental wellness
Visit: https://tranquilmindquest.com
Privacy Policy: https://tranquilmindquest.com/privacy.html
Unsubscribe: https://tranquilmindquest.com/unsubscribe

© ${new Date().getFullYear()} TranquilMindQuest. All rights reserved.
    `;
}

