# Reform Landing Page

A simple, clean React landing page for Reform.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── App.jsx              # Everything is here! (the whole app)
├── App.css              # Styles
├── main.jsx             # Starts the app
├── index.css            # Global styles
└── scripts/             # Google Apps Script (for backend)
    └── google-apps-script/
```

That's it! Super simple.

## 🎯 How It Works

1. User sees: **"Reform your physique. Reform your journey."**
2. User clicks **"Sign Up"** → email form appears
3. User enters email → clicks **"Submit"**
4. Email is saved to Google Sheets
5. Success message shows

## 🔧 Setup Google Sheets

1. Copy code from `src/scripts/google-apps-script/google-apps-script.js`
2. Paste into [script.google.com](https://script.google.com)
3. Deploy as Web App with "Anyone" access
4. Update `GOOGLE_SCRIPT_URL` in `src/App.jsx` with your deployment URL

## 🚀 Deploy

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting service.

## 📝 Customize

Edit `src/App.jsx` to change:
- The headline text
- Button text
- Colors (in `src/App.css`)

That's it! Super simple.
