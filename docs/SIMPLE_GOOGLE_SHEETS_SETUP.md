# 🚀 Simple Google Sheets Setup (5 Minutes)

This is the **easiest way** to get your waitlist emails into Google Sheets without any coding!

## 🎯 **Method 1: Google Forms (Recommended - 2 minutes)**

### **Step 1: Create Google Form**
1. **Go to [forms.google.com](https://forms.google.com)**
2. **Click "Blank"** to create a new form
3. **Title it:** "Reform Waitlist"
4. **Add one question:**
   - Question: "Email Address"
   - Type: "Short answer"
   - Make it required ✅

### **Step 2: Get the Form URL**
1. **Click "Send"** in the top right
2. **Click the link icon** (🔗)
3. **Copy the form URL** - it looks like: `https://docs.google.com/forms/d/1ABC123XYZ456/viewform`

### **Step 3: Update Your Landing Page**
Replace the form in your `index.html` with this:

```html
<div class="waitlist-form-container">
    <iframe 
        src="YOUR_GOOGLE_FORM_URL" 
        width="100%" 
        height="500" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0">
        Loading...
    </iframe>
</div>
```

### **Step 4: Get Your Spreadsheet**
1. **In your Google Form, click "Responses" tab**
2. **Click the green Sheets icon** to create a linked spreadsheet
3. **Your emails will appear here automatically!**

---

## 🎯 **Method 2: Direct Google Sheets (Advanced - 5 minutes)**

If you want to keep your custom form design:

### **Step 1: Create Google Spreadsheet**
1. **Go to [sheets.google.com](https://sheets.google.com)**
2. **Create new spreadsheet** named "Reform Waitlist"
3. **Add headers:** Email | Timestamp | Source
4. **Copy the spreadsheet ID** from the URL

### **Step 2: Create Google Apps Script**
1. **Go to [script.google.com](https://script.google.com)**
2. **New project** → Delete default code
3. **Paste this code:**

```javascript
function doPost(e) {
  const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
  const sheet = spreadsheet.getActiveSheet();
  
  const data = JSON.parse(e.postData.contents);
  const email = data.email;
  const timestamp = new Date();
  
  sheet.appendRow([email, timestamp, 'landing_page']);
  
  return ContentService.createTextOutput('Success');
}
```

4. **Replace `YOUR_SPREADSHEET_ID`** with your actual ID
5. **Save** → **Deploy** → **Web App** → **Anyone** → **Deploy**
6. **Copy the Web App URL**

### **Step 3: Update Your Code**
In `script.js`, replace:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```
With your actual Web App URL.

---

## 🎯 **Method 3: Email Collection Service (Easiest)**

Use a service like **Formspree** or **Getform**:

### **Formspree Setup:**
1. **Go to [formspree.io](https://formspree.io)**
2. **Sign up** (free)
3. **Create new form**
4. **Get your form endpoint** (like `https://formspree.io/f/YOUR_FORM_ID`)
5. **Update your form action:**

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="email" name="email" required>
    <button type="submit">Join Waitlist</button>
</form>
```

---

## 🚀 **Quick Start (Recommended)**

**Use Method 1 (Google Forms)** - it's the fastest:

1. **Create Google Form** (2 minutes)
2. **Get the form URL**
3. **Replace your form with iframe**
4. **Done!** Emails go directly to Google Sheets

## 📊 **What You'll Get**

Your Google Spreadsheet will show:
| Timestamp | Email Address |
|-----------|---------------|
| 2024/01/15 10:30:00 | user@example.com |
| 2024/01/15 11:45:00 | user2@example.com |

## ✅ **Benefits**

- **Real-time data** - see signups instantly
- **No coding required** - just copy/paste
- **Mobile friendly** - works on all devices
- **Free forever** - no costs
- **Easy to manage** - sort, filter, export

---

**Choose Method 1 for the fastest setup! 🚀**
