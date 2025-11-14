# Reform Landing Page

A React landing page for Reform - AI-powered exercise form analysis.

## 🚀 Quick Start

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── App.jsx                    # Main application component
├── App.css                    # Application styles
├── index.jsx                  # React entry point
├── components/
│   ├── Logo.jsx               # Reform logo component
│   ├── PoseEstimation.jsx     # Pose estimation figures
│   └── PoseEstimation.css     # Pose estimation styles
└── scripts/
    └── google-apps-script/
        └── google-apps-script.js  # Google Apps Script for form submissions
```

## 🎯 Features

- **Email Waitlist**: Collect email signups via Google Sheets
- **Twitter iOS Compatible**: Form submissions work in restricted browsers
- **Pose Estimation Visuals**: Animated wireframe figures showcasing exercise analysis
- **Responsive Design**: Works on all devices

## 🔧 Setup Google Sheets

1. Copy code from `src/scripts/google-apps-script/google-apps-script.js`
2. Paste into [Google Apps Script](https://script.google.com)
3. Deploy as Web App with "Anyone" access (important for CORS)
4. Update `GOOGLE_SCRIPT_URL` in `src/App.jsx` with your deployment URL

## 🚀 Deploy

### Build

```bash
npm run build
```

Creates optimized production build in `build/` folder.

### Deploy to Render

The project includes `render.yaml` for automatic deployment to Render. The build command and publish directory are configured automatically.

## 🛠️ Tech Stack

- **React** (Create React App)
- **Google Apps Script** (Backend for form submissions)
- **Render** (Hosting)

## 📝 Development

- Edit `src/App.jsx` to modify the landing page content
- Edit `src/App.css` to change styles
- Edit `src/components/PoseEstimation.jsx` to modify pose figures
