import React, { useState } from 'react'
import HeroBento from './components/HeroBento'
import BentoSections from './components/BentoSections'
import NavigationMenu from './components/NavigationMenu'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const toggleTheme = () => setIsDarkTheme(prev => !prev)

  return (
    <div className={`relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-gray/30 selection:text-brand-white overflow-x-hidden font-sans transition-colors duration-500 ${isDarkTheme ? 'dark-theme' : ''}`}>
      
      {/* Ambient Blurred Background (Light/Dark editorial design) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-500 blur-[40px] scale-105 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200')`,
          opacity: isDarkTheme ? 0.12 : 0.06
        }}
      />
      {/* Vignette & Radial Glow (Dynamic Light/Dark) */}
      <div 
        className={`absolute inset-0 z-0 pointer-events-none transition-all duration-700 ${
          isDarkTheme 
            ? 'bg-[radial-gradient(circle_at_center,rgba(26,26,26,0.35)_0%,rgba(14,14,14,0.95)_100%)]' 
            : 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5)_0%,rgba(242,240,235,0.9)_100%)]'
        }`} 
      />

      {/* Full-Screen Page Container */}
      <main className="relative z-10 w-full min-h-screen p-4 md:p-6 lg:p-8 flex flex-col items-center justify-start">
        {/* Responsive Bento Grid */}
        <div className="w-full max-w-none flex flex-col gap-6">
          <HeroBento 
            onOpenMenu={() => setIsMenuOpen(true)} 
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
          />
          <BentoSections />
        </div>
      </main>

      <NavigationMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
      />
    </div>
  )
}

export default App
