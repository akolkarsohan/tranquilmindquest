# Important: Environment Variables Note

## ⚠️ AWS_REGION is Reserved

**`AWS_REGION` is automatically provided by AWS Lambda** and cannot be set as an environment variable.

### Why This Happens

Lambda automatically sets `AWS_REGION` based on the region where your function is deployed. For example:
- If your function is in **ap-south-1** (Mumbai), `AWS_REGION` = `ap-south-1`
- If your function is in **us-east-1** (N. Virginia), `AWS_REGION` = `us-east-1`

### What to Do

**Simply remove `AWS_REGION` from your environment variables list.**

The Lambda function code automatically uses the region provided by Lambda runtime.

### Environment Variables to Set

Only set these environment variables:

✅ **Set these:**
- `FROM_EMAIL` = `newsletter@tranquilmindquest.com`
- `REPLY_TO_EMAIL` = `contact@tranquilmindquest.com`
- `ALLOWED_ORIGIN` = `*` (or your domain)

❌ **Do NOT set:**
- `AWS_REGION` (automatically provided)

---

## ✅ How the Code Handles This

The Lambda function code uses:

```python
region = os.environ.get('AWS_REGION') or os.environ.get('AWS_DEFAULT_REGION') or 'ap-south-1'
ses_client = boto3.client('ses', region_name=region)
```

This means:
1. It tries to use `AWS_REGION` (automatically provided by Lambda)
2. Falls back to `AWS_DEFAULT_REGION` if needed
3. Falls back to `ap-south-1` as a last resort

**So the function will work correctly without manually setting `AWS_REGION`!**

---

## 📝 Summary

- ✅ Lambda automatically provides `AWS_REGION`
- ✅ Your function code uses it automatically
- ❌ Don't try to set `AWS_REGION` as an environment variable
- ✅ Only set: `FROM_EMAIL`, `REPLY_TO_EMAIL`, and `ALLOWED_ORIGIN`

