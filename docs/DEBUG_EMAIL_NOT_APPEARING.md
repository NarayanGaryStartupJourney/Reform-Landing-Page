# 🔍 Debug: Email Not Appearing in Spreadsheet

Let's debug why your email isn't showing up in the Google Spreadsheet. I've created tools to help identify the issue.

## 🧪 **Step 1: Test Your Google Apps Script (2 minutes)**

### **Test the API Connection**
1. **Go to your local test page:** `http://localhost:8000/test-google-script.html`
2. **Click "Test API Connection"** - you should see "✅ API is working!"
3. **If you see an error**, your Google Apps Script isn't deployed correctly

### **Test Email Submission**
1. **On the same test page**, enter your email: `nmanivan97@gmail.com`
2. **Click "Submit Test Email"** - you should see "✅ Submission successful!"
3. **Check your spreadsheet** - the email should appear

## 🔧 **Step 2: Update Your Google Apps Script (3 minutes)**

If the tests fail, update your Google Apps Script:

1. **Go to [script.google.com](https://script.google.com)**
2. **Open your existing project**
3. **Replace ALL the code** with the content from `debug-google-apps-script.js`
4. **Save** (Ctrl+S)
5. **Deploy** → **Manage Deployments** → **Edit** → **Deploy**

## 🔍 **Step 3: Check Google Apps Script Logs (2 minutes)**

1. **In Google Apps Script**, go to **Executions** tab
2. **Look for recent executions** - you should see your form submissions
3. **Click on an execution** to see the logs
4. **Look for errors** like:
   - "No email provided"
   - "Spreadsheet access denied"
   - "Sheet not found"

## 📊 **Step 4: Verify Your Spreadsheet (1 minute)**

1. **Go to your spreadsheet:** [https://docs.google.com/spreadsheets/d/1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8/edit](https://docs.google.com/spreadsheets/d/1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8/edit)
2. **Check if the sheet is named "Waitlist"** or if it's "Sheet1"
3. **Look for headers** in row 1: Email | Timestamp | Source | Status
4. **Check if there are any rows** with data

## 🚨 **Common Issues & Solutions**

### **Issue 1: "API is not working"**
- **Problem:** Google Apps Script not deployed correctly
- **Solution:** 
  1. Go to Google Apps Script
  2. Deploy → Manage Deployments → Edit
  3. Make sure "Who has access" is set to "Anyone"
  4. Redeploy

### **Issue 2: "Submission failed"**
- **Problem:** CORS or permission issues
- **Solution:** Use the direct form submission test instead

### **Issue 3: "No email provided" in logs**
- **Problem:** Form data not reaching the script
- **Solution:** Check the form submission method in your main site

### **Issue 4: "Spreadsheet access denied"**
- **Problem:** Google Apps Script doesn't have permission
- **Solution:** 
  1. In Google Apps Script, go to "Resources" → "Advanced Google Services"
  2. Enable Google Sheets API
  3. Grant necessary permissions

### **Issue 5: "Sheet not found"**
- **Problem:** Sheet name mismatch
- **Solution:** 
  1. Check if your sheet is named "Waitlist" or "Sheet1"
  2. Update the script to use the correct sheet name

## 🧪 **Step 5: Test Your Live Site (2 minutes)**

1. **Go to your live site:** [https://useproformance.netlify.app/](https://useproformance.netlify.app/)
2. **Open browser developer tools** (F12) → **Console tab**
3. **Submit your email** (nmanivan97@gmail.com)
4. **Check the console** for any errors
5. **Check your spreadsheet** - the email should appear

## 📋 **Debugging Checklist**

- [ ] Google Apps Script is deployed and accessible
- [ ] API test shows "✅ API is working!"
- [ ] Email submission test shows "✅ Submission successful!"
- [ ] Google Apps Script logs show successful execution
- [ ] Spreadsheet has correct headers in row 1
- [ ] Sheet name matches what's in the script
- [ ] No permission errors in Google Apps Script logs

## 🎯 **Expected Results**

After fixing, your spreadsheet should show:
| Email | Timestamp | Source | Status |
|-------|-----------|--------|--------|
| nmanivan97@gmail.com | 2024-01-15 10:30:00 | landing_page | Active |

## 🚀 **Quick Test Commands**

### **Test API directly:**
```bash
curl "https://script.google.com/macros/s/AKfycbxEaT2n4_nqocKjhdLr6p2xbO54h8g76JVIJAI2E38XtthkGIonsmgVFe8-BGFirAuU/exec"
```

### **Test form submission:**
```bash
curl -X POST "https://script.google.com/macros/s/AKfycbxEaT2n4_nqocKjhdLr6p2xbO54h8g76JVIJAI2E38XtthkGIonsmgVFe8-BGFirAuU/exec" \
  -d "email=test@example.com&source=test&timestamp=2024-01-15T10:30:00.000Z"
```

---

**Start with Step 1 - test your API connection. This will tell us exactly where the problem is!** 🔍
