# 🚀 Deployment Guide for ProFormance Landing Page

This guide will help you deploy your ProFormance landing page to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] Update all placeholder URLs in the code
- [ ] Add your analytics tracking code
- [ ] Configure your backend API endpoints
- [ ] Test the waitlist form functionality
- [ ] Optimize images (if any are added later)
- [ ] Set up your domain (optional)

## 🌐 Deployment Options

### 1. Netlify (Recommended)

**Easiest deployment option with automatic builds**

1. **Connect to Git Repository:**
   ```bash
   # Push your code to GitHub/GitLab/Bitbucket
   git remote add origin https://github.com/yourusername/proformance-landing-page.git
   git push -u origin main
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Build settings: Leave default (no build command needed)
   - Publish directory: `/` (root)
   - Click "Deploy site"

3. **Configure Custom Domain (Optional):**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Configure DNS settings

### 2. Vercel

**Great for developers with automatic deployments**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Or connect via GitHub:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Deploy automatically

### 3. GitHub Pages

**Free hosting for public repositories**

1. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

2. **Your site will be available at:**
   `https://yourusername.github.io/proformance-landing-page`

### 4. AWS S3 + CloudFront

**For enterprise deployments**

1. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://your-proformance-site
   ```

2. **Upload files:**
   ```bash
   aws s3 sync . s3://your-proformance-site --delete
   ```

3. **Configure static website hosting:**
   - Enable static website hosting
   - Set index document: `index.html`
   - Set error document: `index.html`

4. **Set up CloudFront distribution:**
   - Create CloudFront distribution
   - Set origin to your S3 bucket
   - Configure caching behaviors

## 🔧 Configuration Updates

### Update Analytics

Replace the placeholder analytics code in `script.js`:

```javascript
// Replace this section with your actual analytics
function trackWaitlistSignup(email) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'waitlist_signup', {
            'event_category': 'conversion',
            'event_label': 'email_signup'
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
    }
    
    // Your custom analytics
    // analytics.track('Waitlist Signup', { email: email });
}
```

### Update Backend API

Update the form submission in `script.js`:

```javascript
function submitWaitlistForm(email) {
    fetch('/api/waitlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            email: email,
            source: 'landing_page',
            timestamp: new Date().toISOString()
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccess('Welcome to the waitlist!');
        } else {
            showError('Something went wrong. Please try again.');
        }
    })
    .catch(error => {
        showError('Network error. Please try again.');
    });
}
```

### Update Meta Tags

Update the Open Graph and Twitter card URLs in `index.html`:

```html
<!-- Replace these URLs with your actual domain -->
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:image" content="https://yourdomain.com/og-image.jpg">
<meta property="twitter:url" content="https://yourdomain.com/">
<meta property="twitter:image" content="https://yourdomain.com/og-image.jpg">
```

## 📊 Performance Optimization

### Build for Production

```bash
# Minify files for production
npm run build

# Test the minified version
npm run serve
```

### Image Optimization

If you add images later:
- Use WebP format for better compression
- Optimize images with tools like TinyPNG
- Use responsive images with `srcset`

### CDN Configuration

For better global performance:
- Enable CDN on your hosting platform
- Configure caching headers
- Use a CDN service like Cloudflare

## 🔒 Security Configuration

### HTTPS
- Most hosting platforms provide HTTPS by default
- Ensure your domain has SSL certificate
- Redirect HTTP to HTTPS

### Security Headers
The deployment configs include security headers:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📈 Monitoring and Analytics

### Set Up Monitoring

1. **Google Analytics 4:**
   ```html
   <!-- Add to <head> section -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **Google Search Console:**
   - Verify your domain
   - Submit sitemap
   - Monitor search performance

3. **Uptime Monitoring:**
   - Set up uptime monitoring with services like UptimeRobot
   - Monitor page load times
   - Set up alerts for downtime

## 🚀 Launch Checklist

### Pre-Launch
- [ ] Test all functionality on different devices
- [ ] Verify all links work correctly
- [ ] Test waitlist form submission
- [ ] Check mobile responsiveness
- [ ] Validate HTML and CSS
- [ ] Test page load speed
- [ ] Verify analytics tracking

### Post-Launch
- [ ] Monitor analytics data
- [ ] Track conversion rates
- [ ] Monitor server performance
- [ ] Collect user feedback
- [ ] A/B test different elements

## 🔄 Updates and Maintenance

### Regular Updates
- Monitor analytics for insights
- A/B test different headlines and CTAs
- Update content based on user feedback
- Optimize based on performance data

### Version Control
```bash
# Make changes
git add .
git commit -m "Update landing page content"
git push origin main

# Deploy automatically (if connected to hosting platform)
```

## 📞 Support

If you need help with deployment:
1. Check the hosting platform's documentation
2. Review the README.md file
3. Test locally with `npm start`
4. Check browser console for errors

---

**Your ProFormance landing page is now ready to capture early users! 🎉**
