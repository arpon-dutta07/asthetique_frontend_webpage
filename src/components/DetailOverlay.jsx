import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function DetailOverlay({ item, onClose, isDarkTheme }) {
  if (!item) return null

  // Check if item is a category or a project
  const isCategory = item.type === 'category'

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } }
  }

  const modalVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 100, damping: 16 } 
    },
    exit: { 
      y: 40, 
      opacity: 0, 
      transition: { duration: 0.3, ease: 'easeInOut' } 
    }
  }

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-brand-black select-none flex flex-col justify-start w-full min-h-screen"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Subtle Radial Glow */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isDarkTheme 
              ? 'bg-[radial-gradient(circle_at_center,rgba(26,26,26,0.3)_0%,rgba(14,14,14,0.95)_100%)]' 
              : 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,rgba(242,240,235,0.9)_100%)]'
          }`} />

          {/* Sticky/Absolute Header */}
          <div className="sticky top-0 z-40 w-full flex items-center justify-between p-6 md:p-8 backdrop-blur-md bg-brand-black/40 border-b border-black/5">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                isDarkTheme ? 'bg-[#22201C] border-white/5 text-[#F2F0EB]' : 'bg-[#FFFFFF] border-black/5 text-[#161513]'
              }`}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3L5 13H12L10 21L20 11H13L19 3Z" />
                </svg>
              </div>
              <span className="font-bold tracking-widest text-xs uppercase text-brand-white">
                AESTHETIQUE / {isCategory ? 'CATEGORY' : 'PROJECT'}
              </span>
            </div>
            
            <motion.button 
              onClick={onClose}
              className={`w-12 h-12 rounded-full border transition-all duration-300 outline-none focus:outline-none flex items-center justify-center ${
                isDarkTheme 
                  ? 'border-white/10 text-[#F2F0EB] hover:bg-[#F2F0EB] hover:text-[#161513] hover:border-[#F2F0EB]' 
                  : 'border-black/10 text-[#161513] hover:bg-[#161513] hover:text-[#F2F0EB] hover:border-[#161513]'
              }`}
              whileHover={{ rotate: 90, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close details"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Main Modal Wrapper (staggered contents) */}
          <motion.div 
            className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 md:py-12 flex flex-col gap-10 text-left"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Cover Image Banner */}
            <div className="rounded-[2.5rem] overflow-hidden aspect-[21/9] md:aspect-[21/8] w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/5">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col gap-2">
                <span className="text-[10px] tracking-[0.2em] text-[#F2F0EB]/60 font-bold uppercase font-sans">
                  {isCategory ? 'DESIGN CLASSIFICATION' : item.location}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#F2F0EB] leading-none">
                  {item.title}
                </h1>
              </div>
            </div>

            {/* Split Details Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start mt-4">
              
              {/* Left Column: Description & Metadata */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-[10px] tracking-[0.2em] text-brand-gray/60 font-bold uppercase font-sans">
                    Design Narrative
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-brand-white font-light font-serif italic">
                    "{item.description}"
                  </p>
                </div>

                {!isCategory && (
                  <div className="flex flex-col gap-4 border-t border-black/10 pt-6">
                    <h2 className="text-[10px] tracking-[0.2em] text-brand-gray/60 font-bold uppercase font-sans">
                      Technical Specifications
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm font-sans pt-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-brand-gray/50 uppercase text-[9px] font-bold">Year Completed</span>
                        <span className="text-brand-white font-medium">{item.specs.year}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-brand-gray/50 uppercase text-[9px] font-bold">Total Area</span>
                        <span className="text-brand-white font-medium">{item.specs.area}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-brand-gray/50 uppercase text-[9px] font-bold">Project Location</span>
                        <span className="text-brand-white font-medium">{item.specs.location}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-brand-gray/50 uppercase text-[9px] font-bold">Lead Designer</span>
                        <span className="text-brand-white font-medium">{item.specs.team}</span>
                      </div>
                    </div>
                  </div>
                )}

                {isCategory && (
                  <div className="flex flex-col gap-4 border-t border-black/10 pt-6">
                    <h2 className="text-[10px] tracking-[0.2em] text-brand-gray/60 font-bold uppercase font-sans">
                      Selected Projects in {item.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.projects.map((proj) => (
                        <span 
                          key={proj}
                          className={`text-xs px-4 py-2 rounded-full border ${
                            isDarkTheme ? 'bg-white/5 border-white/10 text-[#F2F0EB]' : 'bg-black/5 border-black/10 text-[#161513]'
                          }`}
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Highlights & Images */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-[10px] tracking-[0.2em] text-brand-gray/60 font-bold uppercase font-sans">
                    Spatial Highlights
                  </h2>
                  <div className="flex flex-col gap-3 font-sans pt-1">
                    {item.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3 py-1 border-b border-black/5">
                        <span className="font-mono text-xs text-brand-gray/40">0{index + 1}</span>
                        <span className="text-sm font-semibold text-brand-white">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub Image Illustration */}
                <div className="rounded-3xl overflow-hidden aspect-video relative border border-black/5 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"
                    alt="Interior detailed capture"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DetailOverlay
