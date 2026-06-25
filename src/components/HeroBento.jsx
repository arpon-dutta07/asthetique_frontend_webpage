import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RotatingBadge from './RotatingBadge'
import ProjectCard from './ProjectCard'
import CategoryCard from './CategoryCard'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

function HeroBento({ onOpenMenu, isDarkTheme, toggleTheme, onOpenDetail }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMuted, setIsMuted] = useState(false)
  const soundAllowedRef = useRef(false)

  // Parallax scroll effect for Hero image (subtle ~25px drift)
  const { scrollY } = useScroll()
  const heroImageY = useTransform(scrollY, [0, 800], [0, -25])

  // Track size of Hero Card to calculate the curved cutout path dynamically
  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })

    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  const { width, height } = dimensions

  // Autoplay with full audio (unmuting on first interaction/reload, muting on scroll, keeping video running)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Attempt unmuted play first
    video.muted = false
    video.volume = 1.0

    video.play()
      .then(() => {
        // Unmuted play succeeded (browser allowed it or reload/refresh permitted)
        soundAllowedRef.current = true
        setIsMuted(false)
      })
      .catch(() => {
        // Unmuted play blocked (autoplay policy) -> play muted
        video.muted = true
        setIsMuted(true)
        video.play().catch(err => console.log("Muted autoplay failed:", err))
      })

    const handleUserInteraction = () => {
      if (!soundAllowedRef.current) {
        soundAllowedRef.current = true
        const scrollPos = window.scrollY
        const heroHeight = containerRef.current ? containerRef.current.offsetHeight : 450
        if (scrollPos <= heroHeight) {
          video.muted = false
          setIsMuted(false)
          video.volume = 1.0
          if (video.paused) {
            video.play().catch(err => console.log("Play on interaction failed:", err))
          }
        }
      }
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
    }

    window.addEventListener('click', handleUserInteraction)
    window.addEventListener('touchstart', handleUserInteraction)

    const handleScroll = () => {
      const scrollPos = window.scrollY
      const heroHeight = containerRef.current ? containerRef.current.offsetHeight : 450

      if (scrollPos > heroHeight) {
        // Just crossed hero section: mute only, do NOT pause
        video.muted = true
        setIsMuted(true)
      } else {
        // Back in hero section: unmute if sound is allowed
        if (soundAllowedRef.current) {
          video.muted = false
          setIsMuted(false)
          video.volume = 1.0
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isMobile = width < 768

  // Cutout Sizes
  const L = 80  // Logo Cutout Size (80x80px)
  const M = 80  // Menu Cutout Size (80x80px)
  const R = 28  // Corner Radius
  const B = 55  // Rotating Badge Cutout Radius (110px diameter)

  // Generate SVG Path dynamically based on measured width and height
  let pathD = ''
  if (width && height) {
    if (isMobile) {
      // Standard rounded rectangle on mobile
      pathD = `
        M ${R},0
        L ${width - R},0
        A ${R},${R} 0 0 1 ${width},${R}
        L ${width},${height - R}
        A ${R},${R} 0 0 1 ${width - R},${height}
        L ${R},${height}
        A ${R},${R} 0 0 1 0,${height - R}
        L 0,${R}
        A ${R},${R} 0 0 1 ${R},0
        Z
      `.replace(/\s+/g, ' ').trim()
    } else {
      // Precision paths with logo, menu, and badge cutouts
      pathD = `
        M ${L + R},0
        L ${width - M - R},0
        A ${R},${R} 0 0 1 ${width - M},${R}
        L ${width - M},${M - R}
        A ${R},${R} 0 0 0 ${width - M + R},${M}
        L ${width - R},${M}
        A ${R},${R} 0 0 1 ${width},${M + R}
        L ${width},${height - R}
        A ${R},${R} 0 0 1 ${width - R},${height}
        L ${width / 2 + B + R},${height}
        A ${R},${R} 0 0 0 ${width / 2 + B},${height - R}
        A ${B},${B} 0 0 0 ${width / 2 - B},${height - R}
        A ${R},${R} 0 0 0 ${width / 2 - B - R},${height}
        L ${R},${height}
        A ${R},${R} 0 0 1 0,${height - R}
        L 0,${L + R}
        A ${R},${R} 0 0 1 ${R},${L}
        L ${L - R},${L}
        A ${R},${R} 0 0 0 ${L},${L - R}
        L ${L},${R}
        A ${R},${R} 0 0 1 ${L + R},0
        Z
      `.replace(/\s+/g, ' ').trim()
    }
  }

  // Framer Motion staggered child variants for entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18
      }
    }
  }

  const socialVariants = {
    hover: { y: -2 }
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* SVG ClipPath Definition injected into DOM */}
      {width > 0 && (
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <clipPath id="hero-clip-path" clipPathUnits="userSpaceOnUse">
              <path d={pathD} />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* UNIFIED HERO CONTAINER (Spans all 12 columns, houses Logo, Menu, Badge, and Masked Photo) */}
      <motion.div 
        ref={containerRef}
        className="col-span-1 md:col-span-2 lg:col-span-12 relative h-[380px] md:h-[460px] lg:h-[500px] overflow-visible z-20 group"
        variants={cardVariants}
      >
        {/* Theme Toggle Button */}
        <AnimatedThemeToggler
          isDark={isDarkTheme}
          onToggleTheme={toggleTheme}
          className={`absolute z-30 flex items-center justify-center rounded-full border transition-all duration-300 ${
            isMobile 
              ? 'top-4 right-20 w-12 h-12 bg-[#161513]/10 border-black/5 text-[#161513] p-0' 
              : 'top-4 right-28 w-12 h-12 bg-brand-dark border-black/5 text-brand-white hover:bg-brand-white hover:text-brand-black p-0'
          }`}
        />
        {/* Logo Card (Positions absolutely in the top-left pocket) */}
        <div 
          className={`absolute flex items-center justify-center transition-all duration-500 border z-30 ${
            isDarkTheme ? 'bg-[#161513] border-white/5' : 'bg-brand-dark border-black/5'
          } ${
            isMobile 
              ? 'top-4 left-4 w-12 h-12 rounded-xl' 
              : 'top-0 left-0 w-20 h-20 rounded-3xl'
          }`}
        >
          <div className={`flex items-center justify-center shadow-inner transition-colors duration-500 border ${
            isDarkTheme ? 'bg-[#22201C] border-white/5 text-[#F2F0EB]' : 'bg-brand-black border-black/5 text-[#161513]'
          } ${
            isMobile ? 'w-8 h-8 rounded-lg' : 'w-12 h-12 rounded-xl'
          }`}>
            <svg 
              className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} fill-current`} 
              viewBox="0 0 24 24"
            >
              <path d="M11.9 2L4 21h3.3l2.1-5.1h5.2l2.1 5.1h3.3L12.1 2h-.2zm-1.5 11.2L12 9.2l1.6 4h-3.2z" />
            </svg>
          </div>
        </div>

        {/* Hamburger Menu (Positions absolutely in the top-right pocket) */}
        <div 
          className={`absolute flex items-center justify-center transition-all duration-500 border z-30 ${
            isDarkTheme ? 'bg-[#161513] border-white/5' : 'bg-brand-dark border-black/5'
          } ${
            isMobile 
              ? 'top-4 right-4 w-12 h-12 rounded-xl' 
              : 'top-0 right-0 w-20 h-20 rounded-3xl'
          }`}
        >
          <button 
            onClick={onOpenMenu}
            aria-label="Menu"
            className={`rounded-full flex items-center justify-center transition-all duration-300 border ${
              isDarkTheme 
                ? 'bg-[#22201C] border-white/5 text-[#F2F0EB] hover:bg-[#F2F0EB] hover:text-[#161513] hover:border-[#F2F0EB]' 
                : 'bg-brand-black border-black/5 text-[#161513] hover:bg-[#161513] hover:text-[#F2F0EB] hover:border-[#161513]'
            } ${
              isMobile ? 'w-8 h-8' : 'w-12 h-12'
            }`}
          >
            <svg 
              className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* The Masked Photo Div */}
        <div 
          className="absolute inset-0 w-full h-full z-10 transition-transform duration-300"
          style={width > 0 ? { clipPath: 'url(#hero-clip-path)' } : { borderRadius: '2rem' }}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Parallax Looping Video */}
            <motion.video
              ref={videoRef}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="absolute inset-0 w-full h-full object-cover origin-center scale-105"
              style={{ y: heroImageY }}
            >
              <source 
                src="/vidssave.com Lehem Interiors _ Interior Design Firm _ Nairobi Kenya _ AD 1080P.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </motion.video>
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 via-transparent to-brand-black/45 pointer-events-none" />
          </div>
        </div>

        {/* Dynamic Curved Outline/Border Overlay - Soft dark concrete color */}
        {width > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <path 
              d={pathD} 
              fill="none" 
              stroke="rgba(22,21,19,0.08)" 
              strokeWidth="1.5" 
            />
          </svg>
        )}

        {/* Floating Rotating Badge (Centered at bottom cutout) */}
        {!isMobile && <RotatingBadge />}
      </motion.div>


      {/* BOTTOM SECTION (12-column sub-layout inside desktop) */}
      
      {/* 3. HEADING + CTA CARD */}
      <motion.div 
        className="col-span-1 md:col-span-2 lg:col-span-5 lg:row-span-2 bg-brand-dark border border-black/5 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between gap-8 h-full shadow-[0_15px_40px_rgba(22,21,19,0.05)]"
        variants={cardVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-col gap-5">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-[2.65rem] font-medium text-brand-white tracking-normal leading-[1.15] font-serif text-left">
            Designing spaces <br />
            that feel timeless
          </h1>
          {/* Subtext */}
          <p className="text-brand-gray text-sm md:text-base leading-relaxed font-light text-left">
            We create calm, functional, and emotionally engaging interiors tailored for modern lifestyles.
          </p>
        </div>

        {/* CTA Button and Social Icons */}
        <div className="flex flex-col gap-8">
          <div>
            <button className="relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[#161513] bg-[#161513] text-[#F2F0EB] text-xs font-semibold tracking-wider transition-all duration-300 hover:bg-[#F2F0EB] hover:text-[#161513] uppercase">
              BOOK CONSULTATION
            </button>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-3 border-t border-black/5 pt-6">
            {/* Instagram */}
            <motion.a 
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-black/5 bg-brand-black flex items-center justify-center text-brand-gray transition-colors duration-300 hover:text-brand-white hover:border-black/10"
              variants={socialVariants}
              whileHover="hover"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </motion.a>

            {/* X (Twitter) */}
            <motion.a 
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-black/5 bg-brand-black flex items-center justify-center text-brand-gray transition-colors duration-300 hover:text-brand-white hover:border-black/10"
              variants={socialVariants}
              whileHover="hover"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>

            {/* Facebook */}
            <motion.a 
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-black/5 bg-brand-black flex items-center justify-center text-brand-gray transition-colors duration-300 hover:text-brand-white hover:border-black/10"
              variants={socialVariants}
              whileHover="hover"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>

      
      {/* 4. PROJECT CARD 1 (Casa Noir) */}
      <ProjectCard
        image="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800"
        title="Casa Noir Residence"
        gridClass="col-span-1 lg:col-span-7"
        onClick={() => onOpenDetail('casa-noir')}
      />


      {/* 5. CATEGORY TAGS ROW (3 square cards nested) */}
      <motion.div 
        className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-3 gap-3"
        variants={cardVariants}
      >
        <CategoryCard 
          image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400"
          label="Commercial"
          onClick={() => onOpenDetail('commercial')}
        />
        <CategoryCard 
          image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
          label="Residential"
          onClick={() => onOpenDetail('residential')}
        />
        <CategoryCard 
          image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
          label="Recreation"
          onClick={() => onOpenDetail('recreation')}
        />
      </motion.div>


      {/* 6. PROJECT CARD 2 (Aurora Living) */}
      <ProjectCard
        image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
        title="Aurora Living"
        gridClass="col-span-1 lg:col-span-4"
        onClick={() => onOpenDetail('aurora-living')}
      />

    </motion.div>
  )
}

export default HeroBento
