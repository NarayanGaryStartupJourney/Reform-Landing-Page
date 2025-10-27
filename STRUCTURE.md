# Project Structure Guide

This document explains the organized structure of the Reform Landing Page project.

## 📂 Root Directory

### Main Application Files
- `index.html` - Main landing page
- `styles.css` - All styles and responsive design
- `script.js` - JavaScript functionality and form handling
- `success.html` - Success page shown after waitlist signup
- `package.json` - Project configuration and npm scripts
- `site.webmanifest` - Progressive Web App manifest

### Deployment Configuration Files
- `netlify.toml` - Netlify deployment configuration
- `vercel.json` - Vercel deployment configuration  
- `render.yaml` - Render.com deployment configuration

### Documentation
- `README.md` - Main project documentation and setup guide
- `STRUCTURE.md` - This file (project organization guide)

## 📁 Folders

### `/scripts` - Backend Scripts and Build Tools
Contains all server-side code, build scripts, and APIs.

- `google-apps-script.js` - **Main waitlist backend**
  - Handles form submissions
  - Stores emails in Google Sheets
  - **NEW: Includes cleanup utilities!**
    - `previewCleanup()` - Preview what will be removed
    - `cleanupWaitlist()` - Remove duplicates and test entries
  
- `build.js` - Build script for production deployment
  - Minifies CSS and JavaScript
  - Creates optimized production files

- `api/` - API endpoints
  - `submit.js` - Serverless function for form submissions

### `/docs` - Documentation
All setup guides, troubleshooting docs, and deployment instructions.

**Setup Guides:**
- `QUICK_SETUP.md` - Quick start guide
- `GOOGLE_SHEETS_SETUP.md` - Google Sheets integration setup
- `SIMPLE_GOOGLE_SHEETS_SETUP.md` - Simplified setup version
- `EMAIL_SETUP.md` - Email service configuration

**Deployment Guides:**
- `DEPLOYMENT.md` - General deployment guide
- `RENDER_DEPLOYMENT.md` - Render.com specific instructions

**Troubleshooting:**
- `DEBUG_EMAIL_NOT_APPEARING.md` - Email submission issues
- `DEBUG_GOOGLE_SHEETS.md` - Google Sheets debugging
- `GOOGLE_SHEETS_FIXED.md` - Fixed issues documentation
- `MOBILE_FIX_INSTRUCTIONS.md` - Mobile-specific fixes
- `IOS_FIX_SUMMARY.md` - iOS issue fixes
- `IN_APP_BROWSER_FIX.md` - In-app browser handling
- `TWITTER_IOS_FIX.md` - Twitter iOS browser fixes
- `TWITTER_IOS_STATUS.md` - Twitter iOS implementation status
- `CORS_FIX.md` - CORS issue resolution

### `/archive` - Archived Test Files
Old test and debug files kept for reference. **Can be safely deleted if not needed.**

**Test HTML Files:**
- `debug-mobile.html` - Mobile debugging
- `mobile-test.html` - Mobile form testing
- `simple-test.html` - Basic form testing
- `test-google-script.html` - Google Script testing
- `test-netlify-api.html` - Netlify API testing
- `twitter-debug.html` - Twitter browser debugging
- `twitter-ios-test.html` - Twitter iOS testing
- `twitter-ios-final-test.html` - Final Twitter iOS test
- `working-form.html` - Working form reference
- `index-form-redirect.html` - Form redirect test

**Old Script Versions:**
- `google-apps-script.js` - Original version
- `google-apps-script-simple.js` - Simplified version
- `simple-google-apps-script.js` - Another simple version
- `working-google-apps-script.js` - Working version reference
- `debug-google-apps-script.js` - Debug version

## 🚀 Quick Start

1. **Development:**
   ```bash
   npm start
   # Opens dev server at http://localhost:8000
   ```

2. **Production Build:**
   ```bash
   npm run build
   # Runs scripts/build.js to create optimized files
   ```

3. **Google Apps Script Setup:**
   - Open `scripts/google-apps-script.js`
   - Follow instructions in `docs/GOOGLE_SHEETS_SETUP.md`
   - Use the built-in cleanup utilities to manage your waitlist

4. **Deployment:**
   - See `docs/DEPLOYMENT.md` for detailed instructions
   - Config files are already in root for all major platforms

## 🧹 Cleanup Utilities

The Google Apps Script (`scripts/google-apps-script.js`) now includes:

- **`previewCleanup()`** - See what will be removed (no changes made)
- **`cleanupWaitlist()`** - Remove duplicates, invalid entries, and test emails

Run these from the Google Apps Script editor to maintain a clean waitlist!

## 📝 Notes

- All active files are in the root or `/scripts` folder
- Documentation is organized in `/docs`
- Archive folder can be deleted if you don't need reference files
- Deployment configs must stay in root (required by hosting platforms)

---

**Last Updated:** October 27, 2024

