# 📊 Google Sheets Integration for Reform Waitlist

This guide will help you set up automatic waitlist submissions to a Google Spreadsheet.

## 🎯 **What This Does**

- ✅ **Automatically adds emails** to your Google Spreadsheet
- ✅ **Real-time data** - see submissions instantly
- ✅ **Easy data management** - sort, filter, export
- ✅ **No coding required** - just follow the steps
- ✅ **Free solution** - uses Google Apps Script

## 📋 **Step-by-Step Setup**

### **Step 1: Create Google Spreadsheet**

1. **Go to [sheets.google.com](https://sheets.google.com)**
2. **Create a new spreadsheet**
3. **Name it "Reform Waitlist"**
4. **Add these column headers in row 1:**
   - A1: `Email`
   - B1: `Timestamp`
   - C1: `Source`
   - D1: `Status`

### **Step 2: Get Your Spreadsheet ID**

1. **Copy the URL** of your spreadsheet
2. **The ID is the long string** between `/d/` and `/edit`
3. **Example:** `https://docs.google.com/spreadsheets/d/1ABC123XYZ456/edit`
4. **Your ID is:** `1ABC123XYZ456`

### **Step 3: Create Google Apps Script**

1. **Go to [script.google.com](https://script.google.com)**
2. **Click "New Project"**
3. **Delete the default code** and paste the code from `google-apps-script.js`
4. **Replace `YOUR_SPREADSHEET_ID`** with your actual spreadsheet ID
5. **Save the project** (Ctrl+S)
6. **Name it "Reform Waitlist Handler"**

### **Step 4: Deploy the Script**

1. **Click "Deploy" → "New Deployment"**
2. **Type:** "Web App"
3. **Execute as:** "Me"
4. **Who has access:** "Anyone"
5. **Click "Deploy"**
6. **Copy the Web App URL** (you'll need this)

### **Step 5: Update Your Landing Page**

1. **Open `script.js`**
2. **Find this line:**
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. **Replace with your Web App URL:**
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

### **Step 6: Test the Integration**

1. **Deploy your updated site**
2. **Visit your landing page**
3. **Submit a test email**
4. **Check your Google Spreadsheet** - you should see the entry!

## 🔧 **Advanced Configuration**

### **Add More Data Fields**

To collect additional information, update the form and script:

**In your HTML:**
```html
<input type="text" name="name" placeholder="Your name (optional)">
<select name="fitness_level">
    <option value="">Fitness level (optional)</option>
    <option value="beginner">Beginner</option>
    <option value="intermediate">Intermediate</option>
    <option value="advanced">Advanced</option>
</select>
```

**In the Google Apps Script:**
```javascript
const name = data.name || '';
const fitnessLevel = data.fitness_level || '';
const newRow = [email, timestamp, source, 'Active', name, fitnessLevel];
```

### **Set Up Email Notifications**

Add this to your Google Apps Script to get email alerts:

```javascript
function doPost(e) {
  try {
    // ... existing code ...
    
    // Send email notification
    MailApp.sendEmail({
      to: 'your-email@gmail.com',
      subject: 'New Reform Waitlist Signup! 🎉',
      body: `New signup: ${email}\nTime: ${timestamp}\nTotal signups: ${sheet.getLastRow() - 1}`
    });
    
    // ... rest of code ...
  } catch (error) {
    // ... error handling ...
  }
}
```

## 📊 **Managing Your Waitlist Data**

### **Viewing Submissions**
- **Real-time updates** - see new signups instantly
- **Sort by date** - click the Timestamp column
- **Filter data** - use Google Sheets filters
- **Export to CSV** - File → Download → CSV

### **Useful Formulas**
Add these to your spreadsheet for insights:

**Total signups:**
```excel
=COUNTA(A:A)-1
```

**Signups today:**
```excel
=COUNTIF(B:B,">="&TODAY())
```

**Signups this week:**
```excel
=COUNTIF(B:B,">="&TODAY()-7)
```

## 🚀 **Deployment Checklist**

- [ ] Google Spreadsheet created with headers
- [ ] Google Apps Script deployed and URL copied
- [ ] Landing page updated with script URL
- [ ] Test submission completed successfully
- [ ] Data appears in spreadsheet
- [ ] Email notifications working (optional)

## 🔒 **Security & Privacy**

- ✅ **HTTPS encryption** - all data transmitted securely
- ✅ **Google's security** - enterprise-grade protection
- ✅ **Access control** - only you can see the data
- ✅ **GDPR compliant** - easy to export/delete data

## 📈 **Analytics & Insights**

### **Track Growth**
- **Daily signups** - use the formulas above
- **Growth rate** - compare week over week
- **Peak times** - analyze timestamp data
- **Source tracking** - see where signups come from

### **Export Data**
- **CSV export** for external analysis
- **Google Analytics** integration
- **Email marketing** tools (Mailchimp, ConvertKit)

## 🆘 **Troubleshooting**

### **Common Issues:**

**"Script not found" error:**
- Check the Web App URL is correct
- Ensure the script is deployed as "Anyone"

**"Permission denied":**
- Make sure the spreadsheet is accessible
- Check the spreadsheet ID is correct

**Data not appearing:**
- Check the script logs in Google Apps Script
- Verify the sheet name matches "Waitlist"

### **Testing Steps:**
1. **Test the script directly** in Google Apps Script
2. **Check the execution log** for errors
3. **Verify spreadsheet permissions**
4. **Test with a simple email submission**

## 🎯 **Next Steps After Setup**

1. **Monitor daily** for the first week
2. **Set up email notifications** for new signups
3. **Create data visualizations** with charts
4. **Export data weekly** for analysis
5. **Set up automated reports**

---

**Your Reform waitlist is now connected to Google Sheets! 📊**

Every signup will automatically appear in your spreadsheet, giving you real-time visibility into your growing user base.
