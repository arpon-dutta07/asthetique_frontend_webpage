import React from 'react'
import HeroBento from './components/HeroBento'
import BentoSections from './components/BentoSections'

function App() {
  return (
    <div className="relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-gray/30 selection:text-brand-white overflow-x-hidden font-sans">
      
      {/* Ambient Blurred Background (Dark luxury design) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.12] blur-[40px] scale-105 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200')` 
        }}
      />
      {/* Vignette & Radial Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(26,26,26,0.3)_0%,rgba(14,14,14,0.9)_100%)] pointer-events-none" />

      {/* Full-Screen Page Container */}
      <main className="relative z-10 w-full min-h-screen p-4 md:p-6 lg:p-8 flex flex-col items-center justify-start">
        {/* Responsive Bento Grid */}
        <div className="w-full max-w-none flex flex-col gap-6">
          <HeroBento />
          <BentoSections />
        </div>
      </main>
      
    </div>
  )
}

export default App
