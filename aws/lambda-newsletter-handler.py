"""
AWS Lambda Function: Newsletter Subscription Handler (Python)
 
This Lambda function handles newsletter subscriptions and sends welcome emails via AWS SES.
 
Prerequisites:
- AWS SES email verified
- Lambda execution role has SES permissions
- API Gateway configured to invoke this function
"""

import json
import os
import re
from datetime import datetime
import boto3
from botocore.exceptions import ClientError

# Initialize SES client
ses_client = boto3.client('ses', region_name=os.environ.get('AWS_REGION', 'ap-south-1'))

# Configuration - can be overridden via environment variables
FROM_EMAIL = os.environ.get('FROM_EMAIL', 'newsletter@tranquilmindquest.com')
REPLY_TO_EMAIL = os.environ.get('REPLY_TO_EMAIL', 'contact@tranquilmindquest.com')
ALLOWED_ORIGIN = os.environ.get('ALLOWED_ORIGIN', '*')

def lambda_handler(event, context):
    """
    Main Lambda handler function
    """
    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
    
    # Handle preflight OPTIONS request
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    try:
        # Parse request body
        if isinstance(event.get('body'), str):
            body = json.loads(event['body'])
        else:
            body = event.get('body', {})
        
        email = body.get('email', '').strip()
        name = body.get('name', '')
        
        # Validate email
        if not email or not isinstance(email, str):
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'error': 'Email address is required'
                })
            }
        
        # Email regex validation
        email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        if not re.match(email_regex, email):
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'error': 'Invalid email address format'
                })
            }
        
        clean_email = email.lower().strip()
        display_name = name.strip() if name else clean_email.split('@')[0]
        
        # Welcome email content
        subject = 'Welcome to TranquilMindQuest Newsletter! 🧘'
        html_body = create_welcome_email_html(display_name)
        text_body = create_welcome_email_text(display_name)
        
        # Send email using SES
        try:
            response = ses_client.send_email(
                Source=FROM_EMAIL,
                Destination={
                    'ToAddresses': [clean_email]
                },
                ReplyToAddresses=[REPLY_TO_EMAIL],
                Message={
                    'Subject': {
                        'Data': subject,
                        'Charset': 'UTF-8'
                    },
                    'Body': {
                        'Html': {
                            'Data': html_body,
                            'Charset': 'UTF-8'
                        },
                        'Text': {
                            'Data': text_body,
                            'Charset': 'UTF-8'
                        }
                    }
                },
                Tags=[
                    {
                        'Name': 'newsletter',
                        'Value': 'subscription'
                    }
                ]
            )
            
            message_id = response['MessageId']
            print(f'Email sent successfully: {message_id}')
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'message': 'Subscription confirmed! Please check your email for confirmation.',
                    'messageId': message_id
                })
            }
            
        except ClientError as e:
            error_code = e.response['Error']['Code']
            print(f'AWS SES Error: {error_code} - {str(e)}')
            
            # Handle specific AWS SES errors
            error_message = 'Failed to process subscription. Please try again later.'
            
            if error_code == 'MessageRejected':
                error_message = 'Invalid email address. Please check and try again.'
            elif error_code == 'MailFromDomainNotVerifiedException':
                error_message = 'Service temporarily unavailable. Please try again later.'
            elif error_code == 'ConfigurationSetDoesNotExistException':
                error_message = 'Service configuration error. Please contact support.'
            
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'error': error_message
                })
            }
    
    except Exception as e:
        print(f'Error processing subscription: {str(e)}')
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'error': 'Failed to process subscription. Please try again later.'
            })
        }


def create_welcome_email_html(name):
    """
    Create HTML email template
    """
    current_year = datetime.now().year
    
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to TranquilMindQuest</title>
    <style>
        body {{
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
        }}
        .email-container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }}
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
        }}
        .header h1 {{
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }}
        .content {{
            padding: 40px 30px;
        }}
        .content p {{
            margin: 0 0 20px 0;
            font-size: 16px;
        }}
        .content ul {{
            margin: 20px 0;
            padding-left: 20px;
        }}
        .content li {{
            margin: 10px 0;
            font-size: 16px;
        }}
        .button {{
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            margin: 30px 0;
            font-weight: 600;
            font-size: 16px;
        }}
        .footer {{
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
        }}
        .footer p {{
            margin: 5px 0;
            font-size: 12px;
            color: #666666;
        }}
        .footer a {{
            color: #667eea;
            text-decoration: none;
        }}
        @media only screen and (max-width: 600px) {{
            .content {{
                padding: 30px 20px;
            }}
            .header {{
                padding: 30px 20px;
            }}
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to TranquilMindQuest! 🧘</h1>
        </div>
        <div class="content">
            <p>Hi {name},</p>
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
            <p>© {current_year} TranquilMindQuest. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    """


def create_welcome_email_text(name):
    """
    Create plain text email template
    """
    current_year = datetime.now().year
    
    return f"""
Welcome to TranquilMindQuest! 🧘

Hi {name},

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

© {current_year} TranquilMindQuest. All rights reserved.
    """

