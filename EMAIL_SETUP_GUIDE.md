# Email Setup Guide for Contact Form

Your contact form is now configured to send real emails using EmailJS. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this improved template structure that clearly shows sender info:

**Template Subject:**
```
Portfolio Contact: {{subject}} - From {{from_name}}
```

**Template Body:**
```
You have received a new message from your portfolio contact form.

SENDER DETAILS:
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

MESSAGE:
{{message}}

---
Reply directly to this email to respond to {{from_name}} at {{from_email}}

This message was sent from your portfolio contact form.
```

**Important Settings:**
- Set "Reply-To" field to: {{reply_to}}
- This allows you to reply directly to the sender

4. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `user_abcdef123456`)

## Step 5: Update Your Code

In `app.js`, replace these placeholders:

```javascript
// Replace this line:
emailjs.init("YOUR_PUBLIC_KEY");
// With your actual public key:
emailjs.init("user_abcdef123456");

// Replace these lines:
emailjs.send('service_nb0asub', 'YOUR_TEMPLATE_ID', templateParams)
// With your actual IDs:
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## Step 6: Test Your Form

1. Open your contact page
2. Fill out the form with test data
3. Submit the form
4. Check your email inbox for the message

## Alternative: Keep Using Formspree

If you prefer to stick with Formspree (which you already have configured), I can revert the changes and just improve the form handling. Formspree is also a great option for static sites.

## Troubleshooting

- **Emails not sending**: Check browser console for errors
- **Wrong email format**: Verify your template variables match
- **Rate limiting**: EmailJS free plan has monthly limits
- **Spam folder**: Check if emails are going to spam
- **Can't see sender's email**: Make sure your template includes {{from_email}} and {{from_name}} variables
- **Can't reply directly**: Set the "Reply-To" field in your template to {{reply_to}}

## Current Configuration

Your form is currently set to send emails to: `mustafahusaini754@gmail.com`

The template parameters being sent include:
- `from_name`: Sender's full name
- `from_email`: Sender's email address  
- `reply_to`: Same as sender's email for direct replies
- `subject`: Selected subject from dropdown
- `message`: The actual message content
- `sender_info`: Combined name and email for easy viewing

## Security Note

Your EmailJS public key is safe to expose in client-side code - it's designed for this purpose. However, consider setting up domain restrictions in your EmailJS dashboard for added security.