import React, { useState } from 'react'
import HeroBento from './components/HeroBento'
import BentoSections from './components/BentoSections'
import NavigationMenu from './components/NavigationMenu'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-gray/30 selection:text-brand-white overflow-x-hidden font-sans">
      
      {/* Ambient Blurred Background (Light editorial design) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.06] blur-[40px] scale-105 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200')` 
        }}
      />
      {/* Vignette & Radial Glow (Light) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5)_0%,rgba(242,240,235,0.9)_100%)] pointer-events-none" />

      {/* Full-Screen Page Container */}
      <main className="relative z-10 w-full min-h-screen p-4 md:p-6 lg:p-8 flex flex-col items-center justify-start">
        {/* Responsive Bento Grid */}
        <div className="w-full max-w-none flex flex-col gap-6">
          <HeroBento onOpenMenu={() => setIsMenuOpen(true)} />
          <BentoSections />
        </div>
      </main>

      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default App
