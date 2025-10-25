# 🚀 Deploy Reform to Render (Fast & Private Repository Support)

## Why Render?
- ✅ **Works with private repositories** (perfect for team-only visibility)
- ✅ **Free tier** with automatic deployments
- ✅ **Super fast** setup (2-3 minutes)
- ✅ **Automatic HTTPS** and custom domains
- ✅ **GitHub integration** - auto-deploys on every push
- ✅ **No credit card required** for free tier

---

## 📋 Quick Setup Guide (2 Minutes)

### **Step 1: Create Render Account**
1. Go to [https://render.com/](https://render.com/)
2. Click **"Get Started for Free"**
3. Sign up with your GitHub account
4. Authorize Render to access your repositories

### **Step 2: Create New Static Site**
1. After logging in, click **"New +"** button
2. Select **"Static Site"**
3. Connect your repository:
   - Search for: `NarayanGaryStartupJourney/ProFormance-Landing-Page`
   - Click **"Connect"**

### **Step 3: Configure Deployment**
Fill in the following settings:

- **Name**: `reform-landing-page` (or any name you prefer)
- **Branch**: `main`
- **Root Directory**: (leave blank)
- **Build Command**: `npm run build` (or leave blank if no build needed)
- **Publish Directory**: `.` (current directory)

Click **"Create Static Site"**

### **Step 4: Wait for Deployment** ⏱️
- Render will automatically build and deploy your site
- First deployment takes ~2-3 minutes
- You'll get a URL like: `https://reform-landing-page.onrender.com`

---

## 🎉 That's It!

Your landing page is now live with:
- ✅ Automatic deployments on every `git push`
- ✅ HTTPS enabled by default
- ✅ Private repository (only your team can see the code)
- ✅ Google Sheets waitlist integration fully functional

---

## 🔧 Optional: Custom Domain

### To add your own domain (e.g., reform.app):
1. In Render dashboard, go to your site
2. Click **"Settings"**
3. Scroll to **"Custom Domain"**
4. Add your domain
5. Update your DNS records as instructed

---

## 🚨 Troubleshooting

### If the site doesn't load:
1. Check the **"Logs"** tab in Render dashboard
2. Verify the **Publish Directory** is set correctly (`.` for root)
3. Make sure all files are pushed to GitHub

### If Google Sheets integration doesn't work:
1. Verify your Google Apps Script URL is correct in `script.js`
2. Check the Google Apps Script is deployed as a web app
3. Test using the `test-google-script.html` page locally

---

## 📊 Deployment Status

Check your deployment at:
- **Dashboard**: https://dashboard.render.com/
- **Live Site**: https://reform-landing-page.onrender.com (or your custom domain)

---

## 🔄 Automatic Deployments

Every time you push to the `main` branch:
```bash
git add .
git commit -m "Update landing page"
git push origin main
```

Render will automatically:
1. Detect the changes
2. Build your site
3. Deploy the new version
4. Usually takes 1-2 minutes

---

## 💰 Pricing

- **Free Tier**: Perfect for landing pages
  - Unlimited static sites
  - 100 GB bandwidth/month
  - Automatic HTTPS
  - Custom domains
  - No credit card required

- **Paid Plans**: Only if you need more bandwidth or advanced features

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs/static-sites)
- [Custom Domains Guide](https://render.com/docs/custom-domains)
- [GitHub Integration](https://render.com/docs/github)

---

**Need Help?** 
Contact the team or check the [Render Community](https://community.render.com/)

