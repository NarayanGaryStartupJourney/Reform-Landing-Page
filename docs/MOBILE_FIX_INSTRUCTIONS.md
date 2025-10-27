# 📱 Mobile Form Submission Fix

## Problem
The waitlist form wasn't working on mobile devices due to how the Google Apps Script was handling form data.

## Solution
Updated the Google Apps Script to handle **both** JSON and traditional form-encoded data, ensuring compatibility with both desktop and mobile browsers.

---

## 🔧 How to Apply the Fix

### Step 1: Update Your Google Apps Script

1. **Open your Google Apps Script**:
   - Go to: https://script.google.com
   - Open your existing "Reform Waitlist" project

2. **Replace the code**:
   - Select all the existing code in `Code.gs`
   - Delete it
   - Copy the **entire contents** of `updated-google-apps-script.js` from this repository
   - Paste it into `Code.gs`

3. **Save the script**:
   - Click the **💾 Save** icon (or press `Cmd+S` / `Ctrl+S`)

4. **Deploy as Web App**:
   - Click **Deploy** → **Manage deployments**
   - Click the **✏️ Edit** icon (pencil) next to your existing deployment
   - Under "Version", select **New version**
   - Click **Deploy**
   - Copy the new web app URL (it should be the same as before)

### Step 2: Verify the Fix

After deploying, test on **both** desktop and mobile:

#### Desktop Test:
1. Go to: https://reform-landing-page.onrender.com/
2. Enter your email
3. Click "Join Waitlist"
4. Check your Google Sheet

#### Mobile Test (Recommended):
1. Open `mobile-test.html` on your mobile device:
   - Option A: Deploy it to your Render site
   - Option B: Use localhost with your phone on same network
   - Option C: Use a mobile browser emulator
2. Enter your email
3. Click "Join Waitlist"
4. Watch the debug log for details
5. Check your Google Sheet

---

## 🔍 What Changed?

### Before (Only handled JSON):
```javascript
const data = JSON.parse(e.postData.contents);
const email = data.email;
```

### After (Handles both JSON and form data):
```javascript
let email, source;

if (e.postData && e.postData.type === 'application/json') {
  // JSON data from fetch
  const data = JSON.parse(e.postData.contents);
  email = data.email;
  source = data.source || 'landing_page';
} else {
  // Form data from traditional form submission
  email = e.parameter.email || e.parameters.email;
  source = e.parameter.source || e.parameters.source || 'landing_page';
}
```

---

## ✅ Expected Results

After applying this fix:

- ✅ **Desktop submissions** continue to work perfectly
- ✅ **Mobile submissions** now work properly
- ✅ **All emails** are saved to your Google Sheet
- ✅ **No CORS errors** on any device
- ✅ **Better error handling** for debugging

---

## 🐛 Troubleshooting

### Issue: "Email is required" error
**Solution**: The script now validates emails. Make sure your form is sending the `email` field correctly.

### Issue: Still not working on mobile
**Solution**: 
1. Make sure you deployed a **new version** (not just saved)
2. Check the Google Apps Script **Executions** tab for error logs
3. Use the `mobile-test.html` page to see detailed debug logs

### Issue: Working on some mobile browsers but not others
**Solution**: This is normal - the iframe approach has slight differences across browsers. The updated script adds a 3-second timeout fallback for mobile browsers that don't trigger iframe `onload` events reliably.

---

## 📊 How to Monitor Submissions

1. **Google Sheet**:
   - https://docs.google.com/spreadsheets/d/1-7LrlSC1cC9lv9yPyD6HziJAr2eLob2tiUITjV6ukz8/edit

2. **Google Apps Script Logs**:
   - Go to script.google.com
   - Open your project
   - Click **Executions** tab (left sidebar)
   - View real-time logs when forms are submitted

---

## 💡 Testing Tips

1. **Use different emails** for each test to ensure it's working
2. **Check the "Source" column** in your Google Sheet:
   - `landing_page` = production submissions
   - `mobile_test` = test page submissions
3. **Monitor the debug log** in `mobile-test.html` when testing

---

## 🎯 Next Steps

Once you've verified the fix works on both desktop and mobile:

1. ✅ Test with your own email on mobile
2. ✅ Test with a friend's mobile device (iOS and Android if possible)
3. ✅ Monitor your Google Sheet for the next few real submissions
4. ✅ Remove or hide `mobile-test.html` from production (it's just for testing)

---

**Questions?** Check the Google Apps Script execution logs for detailed error messages.

