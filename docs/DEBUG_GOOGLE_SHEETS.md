# 🔧 Debug Google Sheets Integration

I found the issue! The problem is with CORS (Cross-Origin Resource Sharing) settings. Here's how to fix it:

## 🚨 **The Problem**

Your Google Apps Script is deployed, but the browser can't read the response because of CORS restrictions. The `no-cors` mode prevents you from seeing if the request actually succeeded.

## ✅ **Step 1: Update Your Google Apps Script (2 minutes)**

1. **Go to [script.google.com](https://script.google.com)**
2. **Open your existing project** (the one with URL ending in `/exec`)
3. **Replace ALL the code** with the content from `updated-google-apps-script.js`
4. **Save** (Ctrl+S)
5. **Deploy** → **Manage Deployments** → **Edit** → **Deploy**

## ✅ **Step 2: Test Your Script Directly (1 minute)**

1. **In Google Apps Script** → **Run** → **checkSpreadsheetAccess**
2. **Check the logs** - you should see:
   ```
   Spreadsheet name: ProFormance Waitlist
   Sheet name: Waitlist (or Sheet1)
   Last row: 1
   Access successful!
   ```

## ✅ **Step 3: Test the API Endpoint (1 minute)**

1. **Open your browser** and go to your Google Apps Script URL:
   ```
   https://script.google.com/macros/s/AKfycbxEaT2n4_nqocKjhdLr6p2xbO54h8g76JVIJAI2E38XtthkGIonsmgVFe8-BGFirAuU/exec
   ```
2. **You should see:**
   ```json
   {
     "message": "ProFormance Waitlist API is running!",
     "timestamp": "2024-01-15T10:30:00.000Z",
     "status": "active"
   }
   ```

## ✅ **Step 4: Test Form Submission (2 minutes)**

1. **Go to your live site:** [https://useproformance.netlify.app/](https://useproformance.netlify.app/)
2. **Open browser developer tools** (F12)
3. **Go to Console tab**
4. **Submit your email** (nmanivan97@gmail.com)
5. **Check the console** - you should see:
   ```
   Response status: 200
   Success response: {success: true, message: "Email added to waitlist", ...}
   ```

## 🔍 **What to Look For**

### **If you see errors in console:**
- **CORS error:** Update your Google Apps Script with the new code
- **404 error:** Check your Google Apps Script URL
- **500 error:** Check your spreadsheet permissions

### **If the form shows success but no data in spreadsheet:**
- **Check spreadsheet permissions** - make sure the script can access it
- **Check sheet name** - should be "Waitlist" or "Sheet1"
- **Run the test function** in Google Apps Script

## 🧪 **Quick Test Commands**

### **Test 1: Check API is running**
```bash
curl "https://script.google.com/macros/s/AKfycbxEaT2n4_nqocKjhdLr6p2xbO54h8g76JVIJAI2E38XtthkGIonsmgVFe8-BGFirAuU/exec"
```

### **Test 2: Test form submission**
```bash
curl -X POST "https://script.google.com/macros/s/AKfycbxEaT2n4_nqocKjhdLr6p2xbO54h8g76JVIJAI2E38XtthkGIonsmgVFe8-BGFirAuU/exec" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"test","timestamp":"2024-01-15T10:30:00.000Z"}'
```

## 📊 **Expected Results**

After fixing, your spreadsheet should show:
| Email | Timestamp | Source | Status |
|-------|-----------|--------|--------|
| nmanivan97@gmail.com | 2024-01-15 10:30:00 | landing_page | Active |

## 🚨 **Common Issues & Solutions**

### **Issue 1: "Access denied" error**
- **Solution:** Make sure your Google Apps Script has permission to access the spreadsheet
- **Fix:** In Google Apps Script, go to "Resources" → "Advanced Google Services" → Enable Google Sheets API

### **Issue 2: "Sheet not found" error**
- **Solution:** Check if your sheet is named "Waitlist" or rename it to "Sheet1"
- **Fix:** The script will use the active sheet if "Waitlist" doesn't exist

### **Issue 3: CORS errors in browser**
- **Solution:** Update your Google Apps Script with the new code that handles CORS properly
- **Fix:** The updated script includes proper CORS headers

## 🎯 **Next Steps**

1. **Update your Google Apps Script** with the new code
2. **Test the API endpoint** directly
3. **Submit a test email** from your live site
4. **Check your spreadsheet** - you should see the entry!

---

**The main issue was CORS - your script is working, but the browser couldn't read the response. The updated code fixes this!** 🚀
