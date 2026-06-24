import React from 'react'

function RotatingBadge() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 hidden md:block">
      {/* Central dark circle container */}
      <div className="relative w-[110px] h-[110px] bg-brand-black border border-white/10 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)] group">
        
        {/* Rotating SVG Text */}
        <svg 
          viewBox="0 0 120 120" 
          className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none"
        >
          <defs>
            <path
              id="textPath"
              d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            />
          </defs>
          <text className="font-serif text-[9.5px] uppercase tracking-[0.16em] fill-brand-gray/90 font-medium">
            <textPath href="#textPath" startOffset="0%">
              • View our work • View our work 
            </textPath>
          </text>
        </svg>

        {/* Center Diagonal Arrow Icon */}
        <div className="w-[46px] h-[46px] bg-brand-dark border border-white/5 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-white group-hover:border-brand-white">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            stroke="currentColor" 
            className="w-5 h-5 text-brand-white transition-all duration-300 group-hover:text-brand-black group-hover:rotate-45"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default RotatingBadge
