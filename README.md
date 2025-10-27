# ProFormance Landing Page

A modern, responsive landing page for ProFormance - an AI-powered exercise form analysis app. This landing page is designed to capture early users through a waitlist signup.

## 🚀 Features

- **Modern Design**: Clean, professional design with gradient accents and smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Waitlist Signup**: Email capture form with validation and success feedback
- **Interactive Elements**: Smooth scrolling, hover effects, and scroll-triggered animations
- **Performance Optimized**: Fast loading with minimal dependencies
- **SEO Ready**: Proper meta tags and semantic HTML structure

## 📁 Project Structure

```
reform-landing-page/
├── index.html              # Main landing page
├── styles.css              # Styles and responsive design
├── script.js               # JavaScript functionality
├── success.html            # Success page after waitlist signup
├── package.json            # Project configuration
├── site.webmanifest        # PWA manifest
├── netlify.toml            # Netlify deployment config
├── vercel.json             # Vercel deployment config
├── render.yaml             # Render deployment config
├── README.md               # This file
│
├── scripts/                # Scripts and backend code
│   ├── google-apps-script.js   # Google Apps Script for waitlist
│   ├── build.js                # Build script
│   └── api/                    # API endpoints
│       └── submit.js           # Form submission handler
│
├── docs/                   # Documentation
│   ├── DEPLOYMENT.md       # Deployment guides
│   ├── GOOGLE_SHEETS_SETUP.md
│   ├── EMAIL_SETUP.md
│   ├── QUICK_SETUP.md
│   └── ...                 # Various setup guides
│
└── archive/                # Old test/debug files (for reference)
    ├── debug-mobile.html
    ├── twitter-ios-test.html
    └── ...                 # Other archived files
```

## 🗂️ What's Where

- **Main Files**: `index.html`, `styles.css`, `script.js` - Core landing page files
- **Google Apps Script**: `scripts/google-apps-script.js` - Backend for waitlist (includes cleanup utilities!)
- **Documentation**: `docs/` - All setup guides and troubleshooting docs
- **Archive**: `archive/` - Old test files kept for reference (can be deleted if not needed)
- **Deployment Configs**: Root directory - Platform-specific config files

## 🛠️ Setup and Development

### Prerequisites
- Python 3.x (for local development server)
- Modern web browser

### Local Development

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd proformance-landing-page
   ```

2. **Start the development server**
   ```bash
   npm start
   # or
   python -m http.server 8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

### Alternative Development Servers

If you don't have Python, you can use any of these alternatives:

**Node.js (if you have it installed):**
```bash
npx http-server
```

**PHP (if you have it installed):**
```bash
php -S localhost:8000
```

## 🎨 Customization

### Colors and Branding
Edit the CSS variables in `styles.css` to match your brand:

```css
/* Primary gradient colors */
background: linear-gradient(135deg, #6366f1, #8b5cf6);

/* Text colors */
color: #1e293b; /* Dark text */
color: #64748b; /* Muted text */
```

### Content Updates
- **Hero Section**: Update the main headline and description in `index.html`
- **Features**: Modify the feature cards in the features section
- **Waitlist Form**: The form is ready to connect to your backend API

### Analytics Integration
The JavaScript includes placeholder functions for analytics. Update these in `script.js`:

```javascript
// Replace with your analytics tracking
function trackWaitlistSignup(email) {
    // Your analytics code here
}
```

## 🚀 Deployment

This is a static website that can be deployed to any static hosting service:

### Recommended Platforms:
- **Netlify**: Drag and drop deployment
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: For enterprise deployments

### Deployment Steps:
1. Upload all files to your hosting service
2. Configure your domain (optional)
3. Set up form handling (see Backend Integration below)

## 🔧 Backend Integration

### Waitlist Form Backend
The waitlist form currently simulates submission. To connect to a real backend:

1. **Update the form submission in `script.js`:**
```javascript
function submitWaitlistForm(email) {
    fetch('/api/waitlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        // Handle success
        showSuccessMessage();
    })
    .catch(error => {
        // Handle error
        showError('Something went wrong. Please try again.');
    });
}
```

2. **Create your backend endpoint** to handle the POST request and store emails

### Email Service Integration
Consider integrating with email services like:
- **Mailchimp**: For email marketing
- **ConvertKit**: For lead nurturing
- **SendGrid**: For transactional emails

## 📊 Analytics Setup

### Google Analytics
Add your Google Analytics tracking code to the `<head>` section of `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Other Analytics
The JavaScript includes tracking for:
- Button clicks
- Form submissions
- Scroll events

## 🎯 Conversion Optimization

### A/B Testing Ideas:
- Test different headlines in the hero section
- Try different CTA button colors and text
- Experiment with form placement and design
- Test different value propositions

### Performance Tips:
- Optimize images (use WebP format)
- Minify CSS and JavaScript for production
- Enable gzip compression on your server
- Use a CDN for faster global loading

## 📱 Mobile Optimization

The landing page is fully responsive and includes:
- Mobile-first design
- Touch-friendly buttons and forms
- Optimized typography for mobile screens
- Fast loading on mobile networks

## 🔒 Privacy and Compliance

- The form includes privacy messaging
- No cookies are set by default
- GDPR-compliant email collection
- Clear unsubscribe messaging

## 📈 Success Metrics

Track these metrics to measure landing page success:
- **Conversion Rate**: Percentage of visitors who sign up
- **Bounce Rate**: Visitors who leave without engaging
- **Time on Page**: How long visitors stay
- **Mobile vs Desktop**: Performance across devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you need help with customization or deployment:
1. Check the documentation above
2. Review the code comments
3. Open an issue in the repository

---

**Ready to launch your fitness app?** 🏋️‍♂️

This landing page is designed to convert visitors into waitlist signups. Customize the content, connect your backend, and start acquiring early users for ProFormance!
