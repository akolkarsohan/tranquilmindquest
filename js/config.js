/**
 * Newsletter API Configuration
 * 
 * Update the API_ENDPOINT with your actual API Gateway URL after deployment.
 * You can find this URL in the API Gateway console after deploying your API.
 */

const NEWSLETTER_CONFIG = {
    // API Gateway URL for newsletter subscription
    // Format: https://[API-ID].execute-api.[REGION].amazonaws.com/[STAGE]/subscribe
    API_ENDPOINT: 'https://uv48rxi4gf.execute-api.ap-south-1.amazonaws.com/prod/subscribe',
    
    // Enable fallback to localStorage if API call fails
    USE_FALLBACK: true,
    
    // Request timeout in milliseconds
    TIMEOUT: 10000
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.NEWSLETTER_CONFIG = NEWSLETTER_CONFIG;
}

