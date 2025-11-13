function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-svg"
    >
      {/* Barbell bar */}
      <rect x="4" y="12" width="24" height="2" fill="#1e293b" rx="1" />
      
      {/* Left weight plate */}
      <circle cx="6" cy="13" r="3.5" fill="#1e293b" />
      <circle cx="6" cy="13" r="2" fill="#6366f1" />
      
      {/* Right weight plate */}
      <circle cx="26" cy="13" r="3.5" fill="#1e293b" />
      <circle cx="26" cy="13" r="2" fill="#6366f1" />
      
      {/* Person - Head */}
      <circle cx="16" cy="7" r="3" fill="#6366f1" stroke="#1e293b" strokeWidth="1.5" />
      
      {/* Person - Torso */}
      <rect x="14" y="10" width="4" height="8" fill="#6366f1" stroke="#1e293b" strokeWidth="1.5" rx="1" />
      
      {/* Arms holding barbell */}
      <line x1="16" y1="12" x2="6" y2="13" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="12" x2="26" y2="13" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      
      {/* Legs in squat position */}
      <path
        d="M 16 18 L 11 26"
        stroke="#1e293b"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 16 18 L 21 26"
        stroke="#1e293b"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Feet */}
      <ellipse cx="11" cy="27.5" rx="2.5" ry="1.5" fill="#1e293b" />
      <ellipse cx="21" cy="27.5" rx="2.5" ry="1.5" fill="#1e293b" />
    </svg>
  )
}

export default Logo
