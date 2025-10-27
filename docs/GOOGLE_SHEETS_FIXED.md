# 🔧 Fix Google Sheets Integration - Step by Step

Your form is already configured to work with Google Sheets! Here's how to set it up:

## ✅ **What's Already Done**

- ✅ Form is configured to submit to Google Apps Script
- ✅ JavaScript is set up to handle submissions
- ✅ Success/error handling is implemented
- ✅ Mobile responsive design

## 🚀 **Step 1: Create Google Spreadsheet (2 minutes)**

1. **Go to [sheets.google.com](https://sheets.google.com)**
2. **Create new spreadsheet** → Name it "ProFormance Waitlist"
3. **Add headers in row 1:**
   - A1: `Email`
   - B1: `Timestamp`
   - C1: `Source`
   - D1: `Status`
4. **Copy the spreadsheet ID** from the URL (the long string between `/d/` and `/edit`)

## 🚀 **Step 2: Create Google Apps Script (3 minutes)**

1. **Go to [script.google.com](https://script.google.com)**
2. **Click "New Project"**
3. **Delete the default code** and paste the code from `working-google-apps-script.js`
4. **Replace `YOUR_SPREADSHEET_ID`** with your actual spreadsheet ID
5. **Save** (Ctrl+S) → Name it "ProFormance Waitlist Handler"

## 🚀 **Step 3: Deploy the Script (2 minutes)**

1. **Click "Deploy" → "New Deployment"**
2. **Type:** "Web App"
3. **Execute as:** "Me"
4. **Who has access:** "Anyone"
5. **Click "Deploy"**
6. **Copy the Web App URL** (starts with `https://script.google.com/macros/s/...`)

## 🚀 **Step 4: Update Your Code (1 minute)**

1. **Open `script.js`** in your project
2. **Find this line:**
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx1xwXFNpcDEyXPyW1yKoeOZSps3PV54VBfArcGdHGCt4SNvDNkkOjMl5vRYTRS9uR6/exec';
   ```
3. **Replace with your actual Web App URL:**
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
   ```

## 🚀 **Step 5: Test and Deploy (1 minute)**

1. **Test locally:**
   ```bash
   npx http-server -p 8000 -o
   ```
2. **Submit a test email**
3. **Check your Google Spreadsheet** - you should see the entry!
4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update Google Apps Script URL"
   git push origin main
   ```

## 📊 **What You'll See in Your Spreadsheet**

| Email | Timestamp | Source | Status |
|-------|-----------|--------|--------|
| user@example.com | 2024-01-15 10:30:00 | landing_page | Active |
| user2@example.com | 2024-01-15 11:45:00 | landing_page | Active |

## 🎯 **Benefits**

- ✅ **Real-time data** - see signups instantly
- ✅ **Easy management** - sort, filter, export
- ✅ **Mobile access** - check from anywhere
- ✅ **Free forever** - no additional costs
- ✅ **Secure** - Google's enterprise security

## 🔧 **Troubleshooting**

### **If emails don't appear:**
1. **Check the spreadsheet ID** is correct
2. **Verify the script is deployed** as "Anyone"
3. **Check the script logs** in Google Apps Script
4. **Test the script directly** using the test function

### **If you get errors:**
1. **Make sure the spreadsheet is accessible**
2. **Check the sheet name** matches "Waitlist"
3. **Verify the script has permission** to access the spreadsheet

## 🚀 **Quick Test**

To test your script directly:
1. **In Google Apps Script** → **Run** → **testAddEntry**
2. **Check your spreadsheet** - you should see a test entry
3. **If it works, your script is ready!**

---

**Your ProFormance waitlist will now collect emails directly into Google Sheets! 📊**

Every signup will appear instantly in your spreadsheet, giving you real-time visibility into your growing user base.
