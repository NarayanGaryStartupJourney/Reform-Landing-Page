import './PoseEstimation.css'

// Person squatting with pose estimation - deep squat position
const SquattingPerson = ({ className }) => {
  // Keypoints: head, neck, shoulders, elbows, wrists, hips, knees, ankles
  const keypoints = {
    head: { x: 100, y: 35 },
    neck: { x: 100, y: 65 },
    leftShoulder: { x: 85, y: 85 },
    rightShoulder: { x: 115, y: 85 },
    leftElbow: { x: 75, y: 110 },
    rightElbow: { x: 125, y: 110 },
    leftWrist: { x: 70, y: 130 },
    rightWrist: { x: 130, y: 130 },
    leftHip: { x: 90, y: 140 },
    rightHip: { x: 110, y: 140 },
    leftKnee: { x: 85, y: 190 },
    rightKnee: { x: 115, y: 190 },
    leftAnkle: { x: 80, y: 250 },
    rightAnkle: { x: 120, y: 250 }
  }

  return (
    <div className={`pose-figure ${className}`}>
      <svg viewBox="0 0 200 300" className="pose-svg">
        {/* Body silhouette - deep squat */}
        <g className="pose-silhouette">
          <ellipse cx="100" cy="50" rx="25" ry="30" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="85" y="80" width="30" height="60" rx="15" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="75" y="140" width="20" height="50" rx="10" fill="rgba(30, 41, 59, 0.5)" transform="rotate(-30 85 165)" />
          <rect x="105" y="140" width="20" height="50" rx="10" fill="rgba(30, 41, 59, 0.5)" transform="rotate(30 115 165)" />
          <rect x="70" y="190" width="15" height="40" rx="7" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="115" y="190" width="15" height="40" rx="7" fill="rgba(30, 41, 59, 0.5)" />
        </g>
        {/* Pose estimation wireframe - proper skeleton */}
        <g className="pose-wireframe">
          {/* Skeleton connections */}
          <line x1={keypoints.head.x} y1={keypoints.head.y} x2={keypoints.neck.x} y2={keypoints.neck.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.leftShoulder.x} y2={keypoints.leftShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.rightShoulder.x} y2={keypoints.rightShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftShoulder.x} y1={keypoints.leftShoulder.y} x2={keypoints.leftElbow.x} y2={keypoints.leftElbow.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightShoulder.x} y1={keypoints.rightShoulder.y} x2={keypoints.rightElbow.x} y2={keypoints.rightElbow.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftElbow.x} y1={keypoints.leftElbow.y} x2={keypoints.leftWrist.x} y2={keypoints.leftWrist.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightElbow.x} y1={keypoints.rightElbow.y} x2={keypoints.rightWrist.x} y2={keypoints.rightWrist.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.leftHip.x} y2={keypoints.leftHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.rightHip.x} y2={keypoints.rightHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftHip.x} y1={keypoints.leftHip.y} x2={keypoints.leftKnee.x} y2={keypoints.leftKnee.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightHip.x} y1={keypoints.rightHip.y} x2={keypoints.rightKnee.x} y2={keypoints.rightKnee.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftKnee.x} y1={keypoints.leftKnee.y} x2={keypoints.leftAnkle.x} y2={keypoints.leftAnkle.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightKnee.x} y1={keypoints.rightKnee.y} x2={keypoints.rightAnkle.x} y2={keypoints.rightAnkle.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftShoulder.x} y1={keypoints.leftShoulder.y} x2={keypoints.rightShoulder.x} y2={keypoints.rightShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftHip.x} y1={keypoints.leftHip.y} x2={keypoints.rightHip.x} y2={keypoints.rightHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          
          {/* Joints - all 13 keypoints */}
          <circle cx={keypoints.head.x} cy={keypoints.head.y} r="6" fill="#3b82f6" opacity="1">
            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={keypoints.neck.x} cy={keypoints.neck.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftShoulder.x} cy={keypoints.leftShoulder.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightShoulder.x} cy={keypoints.rightShoulder.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftElbow.x} cy={keypoints.leftElbow.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightElbow.x} cy={keypoints.rightElbow.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftWrist.x} cy={keypoints.leftWrist.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightWrist.x} cy={keypoints.rightWrist.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftHip.x} cy={keypoints.leftHip.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightHip.x} cy={keypoints.rightHip.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftKnee.x} cy={keypoints.leftKnee.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightKnee.x} cy={keypoints.rightKnee.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftAnkle.x} cy={keypoints.leftAnkle.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightAnkle.x} cy={keypoints.rightAnkle.y} r="5" fill="#3b82f6" opacity="1" />
        </g>
      </svg>
    </div>
  )
}

// Person shooting basketball with pose estimation - clear shooting motion
const BasketballPerson = ({ className }) => {
  // Keypoints: head, neck, shoulders, elbows, wrists, hips, knees, ankles
  const keypoints = {
    head: { x: 100, y: 35 },
    neck: { x: 100, y: 65 },
    leftShoulder: { x: 85, y: 85 },
    rightShoulder: { x: 115, y: 85 },
    leftElbow: { x: 70, y: 110 },
    rightElbow: { x: 125, y: 120 },
    leftWrist: { x: 50, y: 105 }, // Shooting hand with ball
    rightWrist: { x: 130, y: 140 },
    leftHip: { x: 90, y: 150 },
    rightHip: { x: 110, y: 150 },
    leftKnee: { x: 85, y: 200 },
    rightKnee: { x: 115, y: 200 },
    leftAnkle: { x: 90, y: 260 },
    rightAnkle: { x: 110, y: 260 }
  }

  return (
    <div className={`pose-figure ${className}`}>
      <svg viewBox="0 0 200 300" className="pose-svg">
        {/* Body silhouette */}
        <g className="pose-silhouette">
          <ellipse cx="100" cy="50" rx="25" ry="30" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="85" y="80" width="30" height="80" rx="15" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="60" y="90" width="25" height="80" rx="12" fill="rgba(30, 41, 59, 0.5)" transform="rotate(-60 72.5 130)" />
          <rect x="115" y="120" width="25" height="60" rx="12" fill="rgba(30, 41, 59, 0.5)" transform="rotate(20 127.5 150)" />
          <rect x="75" y="160" width="20" height="60" rx="10" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="105" y="160" width="20" height="60" rx="10" fill="rgba(30, 41, 59, 0.5)" />
          {/* Basketball - near shooting hand */}
          <circle cx="50" cy="105" r="16" fill="rgba(30, 41, 59, 0.7)" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" />
          <line x1="40" y1="105" x2="60" y2="105" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1.5" />
          <line x1="50" y1="95" x2="50" y2="115" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1.5" />
        </g>
        {/* Pose estimation wireframe - proper skeleton */}
        <g className="pose-wireframe">
          {/* Skeleton connections */}
          <line x1={keypoints.head.x} y1={keypoints.head.y} x2={keypoints.neck.x} y2={keypoints.neck.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.leftShoulder.x} y2={keypoints.leftShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.rightShoulder.x} y2={keypoints.rightShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftShoulder.x} y1={keypoints.leftShoulder.y} x2={keypoints.leftElbow.x} y2={keypoints.leftElbow.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightShoulder.x} y1={keypoints.rightShoulder.y} x2={keypoints.rightElbow.x} y2={keypoints.rightElbow.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftElbow.x} y1={keypoints.leftElbow.y} x2={keypoints.leftWrist.x} y2={keypoints.leftWrist.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightElbow.x} y1={keypoints.rightElbow.y} x2={keypoints.rightWrist.x} y2={keypoints.rightWrist.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.leftHip.x} y2={keypoints.leftHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.rightHip.x} y2={keypoints.rightHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftHip.x} y1={keypoints.leftHip.y} x2={keypoints.leftKnee.x} y2={keypoints.leftKnee.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightHip.x} y1={keypoints.rightHip.y} x2={keypoints.rightKnee.x} y2={keypoints.rightKnee.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftKnee.x} y1={keypoints.leftKnee.y} x2={keypoints.leftAnkle.x} y2={keypoints.leftAnkle.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightKnee.x} y1={keypoints.rightKnee.y} x2={keypoints.rightAnkle.x} y2={keypoints.rightAnkle.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftShoulder.x} y1={keypoints.leftShoulder.y} x2={keypoints.rightShoulder.x} y2={keypoints.rightShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftHip.x} y1={keypoints.leftHip.y} x2={keypoints.rightHip.x} y2={keypoints.rightHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          
          {/* Joints - all 13 keypoints */}
          <circle cx={keypoints.head.x} cy={keypoints.head.y} r="6" fill="#3b82f6" opacity="1">
            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={keypoints.neck.x} cy={keypoints.neck.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftShoulder.x} cy={keypoints.leftShoulder.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightShoulder.x} cy={keypoints.rightShoulder.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftElbow.x} cy={keypoints.leftElbow.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightElbow.x} cy={keypoints.rightElbow.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftWrist.x} cy={keypoints.leftWrist.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightWrist.x} cy={keypoints.rightWrist.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftHip.x} cy={keypoints.leftHip.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightHip.x} cy={keypoints.rightHip.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftKnee.x} cy={keypoints.leftKnee.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightKnee.x} cy={keypoints.rightKnee.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftAnkle.x} cy={keypoints.leftAnkle.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightAnkle.x} cy={keypoints.rightAnkle.y} r="5" fill="#3b82f6" opacity="1" />
        </g>
      </svg>
    </div>
  )
}

// Person walking with pose estimation - clear walking motion
const WalkingPerson = ({ className }) => {
  // Keypoints: head, neck, shoulders, elbows, wrists, hips, knees, ankles
  const keypoints = {
    head: { x: 100, y: 35 },
    neck: { x: 100, y: 65 },
    leftShoulder: { x: 85, y: 85 },
    rightShoulder: { x: 115, y: 85 },
    leftElbow: { x: 75, y: 115 },
    rightElbow: { x: 125, y: 115 },
    leftWrist: { x: 70, y: 140 },
    rightWrist: { x: 130, y: 140 },
    leftHip: { x: 90, y: 150 },
    rightHip: { x: 110, y: 150 },
    leftKnee: { x: 85, y: 200 },
    rightKnee: { x: 115, y: 200 },
    leftAnkle: { x: 75, y: 260 },
    rightAnkle: { x: 125, y: 260 }
  }

  return (
    <div className={`pose-figure ${className}`}>
      <svg viewBox="0 0 200 300" className="pose-svg">
        {/* Body silhouette - walking stride */}
        <g className="pose-silhouette">
          <ellipse cx="100" cy="50" rx="25" ry="30" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="85" y="80" width="30" height="80" rx="15" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="70" y="100" width="25" height="60" rx="12" fill="rgba(30, 41, 59, 0.5)" transform="rotate(20 82.5 130)" />
          <rect x="105" y="100" width="25" height="60" rx="12" fill="rgba(30, 41, 59, 0.5)" transform="rotate(-20 117.5 130)" />
          <rect x="75" y="160" width="20" height="60" rx="10" fill="rgba(30, 41, 59, 0.5)" transform="rotate(-15 85 190)" />
          <rect x="105" y="160" width="20" height="60" rx="10" fill="rgba(30, 41, 59, 0.5)" transform="rotate(15 115 190)" />
          <rect x="70" y="220" width="15" height="40" rx="7" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="115" y="220" width="15" height="40" rx="7" fill="rgba(30, 41, 59, 0.5)" />
        </g>
        {/* Pose estimation wireframe - proper skeleton */}
        <g className="pose-wireframe">
          {/* Skeleton connections */}
          <line x1={keypoints.head.x} y1={keypoints.head.y} x2={keypoints.neck.x} y2={keypoints.neck.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.leftShoulder.x} y2={keypoints.leftShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.rightShoulder.x} y2={keypoints.rightShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftShoulder.x} y1={keypoints.leftShoulder.y} x2={keypoints.leftElbow.x} y2={keypoints.leftElbow.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightShoulder.x} y1={keypoints.rightShoulder.y} x2={keypoints.rightElbow.x} y2={keypoints.rightElbow.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftElbow.x} y1={keypoints.leftElbow.y} x2={keypoints.leftWrist.x} y2={keypoints.leftWrist.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightElbow.x} y1={keypoints.rightElbow.y} x2={keypoints.rightWrist.x} y2={keypoints.rightWrist.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.leftHip.x} y2={keypoints.leftHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.rightHip.x} y2={keypoints.rightHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftHip.x} y1={keypoints.leftHip.y} x2={keypoints.leftKnee.x} y2={keypoints.leftKnee.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightHip.x} y1={keypoints.rightHip.y} x2={keypoints.rightKnee.x} y2={keypoints.rightKnee.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftKnee.x} y1={keypoints.leftKnee.y} x2={keypoints.leftAnkle.x} y2={keypoints.leftAnkle.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightKnee.x} y1={keypoints.rightKnee.y} x2={keypoints.rightAnkle.x} y2={keypoints.rightAnkle.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftShoulder.x} y1={keypoints.leftShoulder.y} x2={keypoints.rightShoulder.x} y2={keypoints.rightShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftHip.x} y1={keypoints.leftHip.y} x2={keypoints.rightHip.x} y2={keypoints.rightHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          
          {/* Joints - all 13 keypoints */}
          <circle cx={keypoints.head.x} cy={keypoints.head.y} r="6" fill="#3b82f6" opacity="1">
            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={keypoints.neck.x} cy={keypoints.neck.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftShoulder.x} cy={keypoints.leftShoulder.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightShoulder.x} cy={keypoints.rightShoulder.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftElbow.x} cy={keypoints.leftElbow.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightElbow.x} cy={keypoints.rightElbow.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftWrist.x} cy={keypoints.leftWrist.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightWrist.x} cy={keypoints.rightWrist.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftHip.x} cy={keypoints.leftHip.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightHip.x} cy={keypoints.rightHip.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftKnee.x} cy={keypoints.leftKnee.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightKnee.x} cy={keypoints.rightKnee.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftAnkle.x} cy={keypoints.leftAnkle.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightAnkle.x} cy={keypoints.rightAnkle.y} r="5" fill="#3b82f6" opacity="1" />
        </g>
      </svg>
    </div>
  )
}

// Person lifting leg with pose estimation - basic leg lift movement
const LegLiftPerson = ({ className }) => {
  // Keypoints: head, neck, shoulders, elbows, wrists, hips, knees, ankles
  const keypoints = {
    head: { x: 100, y: 35 },
    neck: { x: 100, y: 65 },
    leftShoulder: { x: 85, y: 85 },
    rightShoulder: { x: 115, y: 85 },
    leftElbow: { x: 80, y: 110 },
    rightElbow: { x: 120, y: 110 },
    leftWrist: { x: 75, y: 130 },
    rightWrist: { x: 125, y: 130 },
    leftHip: { x: 90, y: 150 },
    rightHip: { x: 110, y: 150 },
    leftKnee: { x: 85, y: 200 },
    rightKnee: { x: 110, y: 170 }, // Lifted leg - knee higher
    leftAnkle: { x: 90, y: 260 },
    rightAnkle: { x: 115, y: 140 } // Lifted leg - ankle much higher
  }

  return (
    <div className={`pose-figure ${className}`}>
      <svg viewBox="0 0 200 300" className="pose-svg">
        {/* Body silhouette - leg lift */}
        <g className="pose-silhouette">
          <ellipse cx="100" cy="50" rx="25" ry="30" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="85" y="80" width="30" height="80" rx="15" fill="rgba(30, 41, 59, 0.5)" />
          {/* Arms at sides */}
          <rect x="75" y="100" width="20" height="50" rx="10" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="105" y="100" width="20" height="50" rx="10" fill="rgba(30, 41, 59, 0.5)" />
          {/* Standing leg */}
          <rect x="80" y="160" width="20" height="70" rx="10" fill="rgba(30, 41, 59, 0.5)" />
          {/* Lifted leg */}
          <rect x="105" y="150" width="20" height="50" rx="10" fill="rgba(30, 41, 59, 0.5)" transform="rotate(45 115 175)" />
          <rect x="85" y="230" width="15" height="40" rx="7" fill="rgba(30, 41, 59, 0.5)" />
          <rect x="110" y="135" width="15" height="30" rx="7" fill="rgba(30, 41, 59, 0.5)" />
        </g>
        {/* Pose estimation wireframe - proper skeleton */}
        <g className="pose-wireframe">
          {/* Skeleton connections */}
          <line x1={keypoints.head.x} y1={keypoints.head.y} x2={keypoints.neck.x} y2={keypoints.neck.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.leftShoulder.x} y2={keypoints.leftShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.rightShoulder.x} y2={keypoints.rightShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftShoulder.x} y1={keypoints.leftShoulder.y} x2={keypoints.leftElbow.x} y2={keypoints.leftElbow.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightShoulder.x} y1={keypoints.rightShoulder.y} x2={keypoints.rightElbow.x} y2={keypoints.rightElbow.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftElbow.x} y1={keypoints.leftElbow.y} x2={keypoints.leftWrist.x} y2={keypoints.leftWrist.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightElbow.x} y1={keypoints.rightElbow.y} x2={keypoints.rightWrist.x} y2={keypoints.rightWrist.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.leftHip.x} y2={keypoints.leftHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.neck.x} y1={keypoints.neck.y} x2={keypoints.rightHip.x} y2={keypoints.rightHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftHip.x} y1={keypoints.leftHip.y} x2={keypoints.leftKnee.x} y2={keypoints.leftKnee.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightHip.x} y1={keypoints.rightHip.y} x2={keypoints.rightKnee.x} y2={keypoints.rightKnee.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftKnee.x} y1={keypoints.leftKnee.y} x2={keypoints.leftAnkle.x} y2={keypoints.leftAnkle.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.rightKnee.x} y1={keypoints.rightKnee.y} x2={keypoints.rightAnkle.x} y2={keypoints.rightAnkle.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftShoulder.x} y1={keypoints.leftShoulder.y} x2={keypoints.rightShoulder.x} y2={keypoints.rightShoulder.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          <line x1={keypoints.leftHip.x} y1={keypoints.leftHip.y} x2={keypoints.rightHip.x} y2={keypoints.rightHip.y} stroke="#60a5fa" strokeWidth="2.5" opacity="1" />
          
          {/* Joints - all 13 keypoints */}
          <circle cx={keypoints.head.x} cy={keypoints.head.y} r="6" fill="#3b82f6" opacity="1">
            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={keypoints.neck.x} cy={keypoints.neck.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftShoulder.x} cy={keypoints.leftShoulder.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightShoulder.x} cy={keypoints.rightShoulder.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftElbow.x} cy={keypoints.leftElbow.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightElbow.x} cy={keypoints.rightElbow.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftWrist.x} cy={keypoints.leftWrist.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightWrist.x} cy={keypoints.rightWrist.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftHip.x} cy={keypoints.leftHip.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightHip.x} cy={keypoints.rightHip.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftKnee.x} cy={keypoints.leftKnee.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightKnee.x} cy={keypoints.rightKnee.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.leftAnkle.x} cy={keypoints.leftAnkle.y} r="5" fill="#3b82f6" opacity="1" />
          <circle cx={keypoints.rightAnkle.x} cy={keypoints.rightAnkle.y} r="5" fill="#3b82f6" opacity="1" />
        </g>
      </svg>
    </div>
  )
}


export default function PoseEstimation() {
  return (
    <div className="pose-estimation-background">
      <SquattingPerson className="pose-1" />
      <BasketballPerson className="pose-2" />
      <WalkingPerson className="pose-3" />
      <LegLiftPerson className="pose-4" />
    </div>
  )
}

