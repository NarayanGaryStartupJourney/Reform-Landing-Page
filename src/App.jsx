import { useState } from 'react'
import Logo from './components/Logo'
import PoseEstimation from './components/PoseEstimation'
import './App.css'

// Google Sheets URL - update this with your deployed Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_NwzIbLuY2kUNa-nN2DV7crUwJt4my-mBZEQtvjUlJBYADCta7dttvUByKP9Q3nLh/exec'

function App() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // When user submits the email form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Build the URL with parameters
    const params = new URLSearchParams({
      email: email,
      source: 'landing_page'
    })
    const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`

    // Submit using image beacon (works reliably with Twitter iOS and restricted browsers)
    // Server returns a 1x1 transparent PNG, so onload fires on success
    try {
      const img = document.createElement('img')
      img.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;top:-9999px;'
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        console.log('✅ Form submitted successfully')
      }
      img.onerror = () => {
        console.log('⚠️ Image beacon error (request may have still succeeded)')
      }
      img.src = url + '&_=' + Date.now() // Cache buster
      document.body.appendChild(img)
      
      // Clean up after 5 seconds
      setTimeout(() => {
        if (img.parentNode) {
          document.body.removeChild(img)
        }
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    }

    // Show success feedback immediately (optimistic UI)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail('')
    }, 300)
    
    // Reset success message after a few seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="app">
      {/* Pose Estimation Background */}
      <PoseEstimation />
      
      {/* Header */}
      <header className="header">
        <div className="logo">
          <Logo />
          <span className="logo-text">Reform</span>
        </div>
        <a href="https://meetings-na2.hubspot.com/narayan-manivannan" target="_blank" rel="noopener noreferrer" className="header-cta">
          Join Waitlist
        </a>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1>
          Exercise
          <br />
          <span className="gradient">Technique Analyzer</span>
        </h1>
        
        <p className="description">
          Real-time feedback for walking, squats, basketball, and more. Improve technique, prevent injury, and reform your lifestyle.
        </p>
        <div className="form-container" id="waitlist-form">
          <form onSubmit={handleSubmit} className="email-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading} className="submit-btn">
              <span className="icon">→</span>
              {isLoading ? 'Submitting...' : isSubmitted ? '✓ Submitted!' : 'Join Waitlist'}
            </button>
          </form>
          {isSubmitted && (
            <p className="success-message" style={{ color: '#60a5fa', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
              Thanks! We'll be in touch soon.
            </p>
          )}
          <p className="privacy">
            <span className="lock-icon">🔒</span>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <Logo />
          <span className="logo-text">Reform</span>
        </div>
        <p className="copyright">© 2025 Reform. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
