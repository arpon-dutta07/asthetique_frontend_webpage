import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MENU_ITEMS = [
  { id: 'services', label: 'Services', num: '01' },
  { id: 'process', label: 'Creative Journey', num: '02' },
  { id: 'gallery', label: 'Editorial Archive', num: '03' },
  { id: 'testimonials', label: 'Client Voices', num: '04' },
  { id: 'contact', label: 'Collaborate', num: '05' }
]

function NavigationMenu({ isOpen, onClose, isDarkTheme, toggleTheme }) {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault()
    onClose()
    
    // Smooth scroll after menu animations complete
    setTimeout(() => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 450)
  }

  // Animation variants (semi-transparent backgrounds for glassmorphism)
  const menuVariants = {
    hidden: { 
      opacity: 0,
      clipPath: 'circle(40px at 95% 5%)',
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    },
    visible: { 
      opacity: 1,
      clipPath: 'circle(150% at 95% 5%)',
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0,
      clipPath: 'circle(40px at 95% 5%)',
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
    exit: { 
      y: -15, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-12 lg:p-16 select-none backdrop-blur-2xl transition-colors duration-500 ${
            isDarkTheme 
              ? 'bg-[#161513]/85 text-[#F2F0EB]' 
              : 'bg-[#F2F0EB]/85 text-[#161513]'
          }`}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Subtle Radial Glow */}
          <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            isDarkTheme 
              ? 'bg-[radial-gradient(circle_at_top_right,rgba(242,240,235,0.04)_0%,transparent_70%)]' 
              : 'bg-[radial-gradient(circle_at_top_right,rgba(22,21,19,0.04)_0%,transparent_70%)]'
          }`} />

          {/* Header */}
          <div className="flex items-center justify-between w-full z-10">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                isDarkTheme ? 'bg-[#22201C] border border-white/5 text-[#F2F0EB]' : 'bg-[#E5E2DA] border border-black/5 text-[#161513]'
              }`}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3L5 13H12L10 21L20 11H13L19 3Z" />
                </svg>
              </div>
              <span className={`font-bold tracking-widest text-xs uppercase transition-colors duration-500 ${
                isDarkTheme ? 'text-[#F2F0EB]' : 'text-[#161513]'
              }`}>
                AESTHETIQUE
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button 
                onClick={toggleTheme}
                className={`w-12 h-12 rounded-full border transition-all duration-300 outline-none focus:outline-none flex items-center justify-center ${
                  isDarkTheme 
                    ? 'border-white/10 text-[#F2F0EB] hover:bg-[#F2F0EB] hover:text-[#161513] hover:border-[#F2F0EB]' 
                    : 'border-black/10 text-[#161513] hover:bg-[#161513] hover:text-[#F2F0EB] hover:border-[#161513]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Theme"
              >
                {isDarkTheme ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>

              {/* Close Button */}
              <motion.button 
                onClick={onClose}
                className={`w-12 h-12 rounded-full border transition-all duration-300 outline-none focus:outline-none flex items-center justify-center ${
                  isDarkTheme 
                    ? 'border-white/10 text-[#F2F0EB] hover:bg-[#F2F0EB] hover:text-[#161513] hover:border-[#F2F0EB]' 
                    : 'border-black/10 text-[#161513] hover:bg-[#161513] hover:text-[#F2F0EB] hover:border-[#161513]'
                }`}
                whileHover={{ rotate: 90, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Links Middle Area */}
          <motion.div 
            className="flex flex-col text-left max-w-2xl mx-auto md:mx-0 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {MENU_ITEMS.map((item) => (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                className="overflow-hidden py-3"
              >
                <a 
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`group inline-flex items-baseline gap-4 md:gap-8 text-4xl md:text-6xl lg:text-7xl font-serif transition-colors duration-300 ${
                    isDarkTheme ? 'text-[#C5C0B8] hover:text-[#F2F0EB]' : 'text-[#5E5B55] hover:text-[#161513]'
                  }`}
                >
                  <span className={`font-sans font-bold text-xs md:text-sm tracking-widest transition-colors duration-300 ${
                    isDarkTheme ? 'text-[#F2F0EB]/30 group-hover:text-[#F2F0EB]' : 'text-[#161513]/30 group-hover:text-[#161513]'
                  }`}>
                    {item.num}
                  </span>
                  <span className="group-hover:italic group-hover:translate-x-3 transition-all duration-300 inline-block origin-left">
                    {item.label}
                  </span>
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer Direct Details Info */}
          <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 w-full z-10 text-[9px] md:text-xs tracking-widest uppercase font-sans transition-colors duration-500 ${
            isDarkTheme ? 'border-t border-white/5 text-[#C5C0B8]/60' : 'border-t border-black/5 text-[#5E5B55]/70'
          }`}>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <a 
                href="mailto:hello@aesthetique.com" 
                className={`transition-colors duration-300 ${isDarkTheme ? 'hover:text-[#F2F0EB]' : 'hover:text-[#161513]'}`}
              >
                hello@aesthetique.com
              </a>
              <a 
                href="tel:+12125550192" 
                className={`transition-colors duration-300 ${isDarkTheme ? 'hover:text-[#F2F0EB]' : 'hover:text-[#161513]'}`}
              >
                +1 (212) 555-0192
              </a>
            </div>
            <p>© {new Date().getFullYear()} AESTHETIQUE STUDIO</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NavigationMenu
