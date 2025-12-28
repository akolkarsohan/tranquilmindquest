# Newsletter API Test Script for PowerShell
# Tests the newsletter subscription endpoint

# API Endpoint
$API_ENDPOINT = "https://uv48rxi4gf.execute-api.ap-south-1.amazonaws.com/prod/subscribe"

# Test email (change this to your test email, or pass as argument)
$TEST_EMAIL = if ($args.Count -gt 0) { $args[0] } else { "test@example.com" }

Write-Host "========================================" -ForegroundColor Blue
Write-Host "Newsletter API Test Script" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue
Write-Host ""
Write-Host "API Endpoint: " -NoNewline
Write-Host $API_ENDPOINT -ForegroundColor Yellow
Write-Host "Test Email: " -NoNewline
Write-Host $TEST_EMAIL -ForegroundColor Yellow
Write-Host ""

# Test OPTIONS request (CORS preflight)
Write-Host "Testing OPTIONS request (CORS preflight)..." -ForegroundColor Blue
try {
    $optionsResponse = Invoke-WebRequest -Uri $API_ENDPOINT -Method OPTIONS `
        -Headers @{
            "Origin" = "http://localhost"
            "Access-Control-Request-Method" = "POST"
            "Access-Control-Request-Headers" = "Content-Type"
        } -UseBasicParsing -ErrorAction Stop
    
    if ($optionsResponse.StatusCode -eq 200) {
        Write-Host "✓ OPTIONS request successful (Status: $($optionsResponse.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "⚠ OPTIONS request returned status: $($optionsResponse.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ OPTIONS request failed: $($_.Exception.Message)" -ForegroundColor Yellow
}
Write-Host ""

# Test POST request (Subscription)
Write-Host "Testing POST request (Subscription)..." -ForegroundColor Blue

$body = @{
    email = $TEST_EMAIL
} | ConvertTo-Json

$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

try {
    $response = Invoke-WebRequest -Uri $API_ENDPOINT -Method POST `
        -ContentType "application/json" `
        -Headers @{
            "Origin" = "http://localhost"
        } `
        -Body $body `
        -UseBasicParsing -ErrorAction Stop
    
    $stopwatch.Stop()
    $responseTime = $stopwatch.Elapsed.TotalSeconds
    
    Write-Host ""
    Write-Host "Response Details:" -ForegroundColor Blue
    Write-Host "  Status Code: " -NoNewline
    Write-Host $response.StatusCode -ForegroundColor Yellow
    Write-Host "  Response Time: " -NoNewline
    Write-Host "$($responseTime.ToString('F3'))s" -ForegroundColor Yellow
    Write-Host ""
    
    $responseData = $response.Content | ConvertFrom-Json
    
    Write-Host "Response Body (formatted):" -ForegroundColor Blue
    $responseData | ConvertTo-Json -Depth 10
    Write-Host ""
    
    Write-Host "========================================" -ForegroundColor Blue
    
    if ($response.StatusCode -eq 200 -and $responseData.success -eq $true) {
        Write-Host "✓ Test PASSED!" -ForegroundColor Green
        Write-Host "Subscription successful!" -ForegroundColor Green
        if ($responseData.message) {
            Write-Host "Message: $($responseData.message)" -ForegroundColor Green
        }
        Write-Host ""
        Write-Host "Next Steps:" -ForegroundColor Blue
        Write-Host "  1. Check your email inbox (and spam folder) for the welcome email"
        Write-Host "  2. Verify the email was sent in AWS SES Console"
        Write-Host "  3. Check CloudWatch logs for Lambda execution"
        exit 0
    } else {
        Write-Host "✗ Test FAILED" -ForegroundColor Red
        Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Red
        if ($responseData.error) {
            Write-Host "Error: $($responseData.error)" -ForegroundColor Red
        }
        Write-Host ""
        Write-Host "Troubleshooting:" -ForegroundColor Yellow
        Write-Host "  1. Verify API Gateway is deployed"
        Write-Host "  2. Check Lambda function logs in CloudWatch"
        Write-Host "  3. Verify SES email is verified"
        Write-Host "  4. Check CORS configuration in API Gateway"
        Write-Host "  5. Verify Lambda has SES permissions"
        exit 1
    }
} catch {
    $stopwatch.Stop()
    $responseTime = $stopwatch.Elapsed.TotalSeconds
    
    Write-Host ""
    Write-Host "Response Time: " -NoNewline
    Write-Host "$($responseTime.ToString('F3'))s" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "========================================" -ForegroundColor Blue
    Write-Host "✗ Network Error" -ForegroundColor Red
    Write-Host "Failed to connect to the API endpoint." -ForegroundColor Red
    Write-Host ""
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Verify API Gateway is deployed"
    Write-Host "  2. Check network connectivity"
    Write-Host "  3. Verify the API endpoint URL is correct"
    Write-Host "  4. Check if API Gateway stage is 'prod'"
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host ""
        Write-Host "Response Body:" -ForegroundColor Blue
        Write-Host $responseBody
    }
    
    exit 1
}

