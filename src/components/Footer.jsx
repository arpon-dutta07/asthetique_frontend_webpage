import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [time, setTime] = useState(new Date())

  // Dynamic live timezone clocks
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getLocalTime = (timeZone) => {
    return time.toLocaleTimeString('en-US', {
      timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3500)
    }
  }

  const footerLinks = {
    pages: [
      { label: 'STUDIO', href: '#hero' },
      { label: 'SERVICES', href: '#services' },
      { label: 'PROJECTS', href: '#gallery' },
      { label: 'JOURNEY', href: '#process' },
      { label: 'CONTACT', href: '#contact' }
    ],
    socials: [
      { label: 'INSTAGRAM', href: 'https://instagram.com' },
      { label: 'DRIBBBLE', href: 'https://dribbble.com' },
      { label: 'BEHANCE', href: 'https://behance.net' },
      { label: 'X.COM', href: 'https://x.com' }
    ]
  }

  const brandName = "AESTHETIQUE"

  // Stagger reveal animation variants similar to testimonials section
  const revealVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)"
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.12,
        duration: 0.5,
        type: "spring",
        stiffness: 140,
        damping: 18
      }
    })
  }

  // Stagger blur-reveal for the large branding letters
  const letterRevealVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: "blur(12px)",
      scale: 0.9
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        delay: 0.2 + i * 0.04,
        duration: 0.6,
        type: "spring",
        stiffness: 140,
        damping: 18
      }
    })
  }

  return (
    <footer className="footer-reveal-container w-full text-brand-white bg-brand-black flex flex-col justify-between overflow-hidden p-4 lg:p-6 lg:pb-3 max-w-none">
      
      {/* Bento Cards Container with 3D perspective */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 [perspective:1200px]">
        
        {/* Cell 1: Newsletter Subscribe */}
        <motion.div 
          custom={0}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
          whileHover={{ 
            y: -8, 
            scale: 1.018, 
            rotateX: -2, 
            rotateY: 1,
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)" 
          }}
          className="lg:col-span-6 min-h-[250px] lg:min-h-[210px] bg-white/80 dark:bg-[#1A1A1A]/35 border border-black/20 dark:border-white/10 rounded-[2rem] p-8 lg:p-6 xl:p-8 flex flex-col justify-between transition-colors duration-500 relative overflow-hidden text-left cursor-default hover:border-brand-white/40 dark:hover:border-brand-white/40 group"
        >
          <div className="flex flex-col gap-1 relative z-10">
            <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray font-semibold">
              01 // INDEXED NEWSLETTER
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-serif tracking-tight mt-1 leading-[1.1] uppercase">
              Stay inside <br />the framework
            </h3>
          </div>

          <div className="mt-6 relative z-10 w-full">
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs uppercase tracking-wider text-brand-white font-semibold flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-brand-white rounded-full animate-ping" />
                Subscription registered successfully
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center w-full">
                <input
                  type="email"
                  required
                  placeholder="ENTER EMAIL ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-black/15 dark:border-white/15 focus:border-brand-white dark:focus:border-brand-white py-2.5 text-xs tracking-wider outline-none transition-all duration-300 font-mono pr-12 text-brand-white placeholder-brand-gray/50"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-0 p-2 text-brand-gray/60 hover:text-brand-white transition-colors duration-300 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Cell 2: Quick Links */}
        <motion.div 
          custom={1}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
          whileHover={{ 
            y: -8, 
            scale: 1.018, 
            rotateX: -2, 
            rotateY: -1,
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)" 
          }}
          className="lg:col-span-3 min-h-[250px] lg:min-h-[210px] bg-white/80 dark:bg-[#1A1A1A]/35 border border-black/20 dark:border-white/10 rounded-[2rem] p-8 lg:p-6 xl:p-8 flex flex-col justify-between transition-colors duration-500 relative overflow-hidden text-left cursor-default hover:border-brand-white/40 dark:hover:border-brand-white/40 group"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray font-semibold">
            02 // NAVIGATION
          </span>

          <ul className="flex flex-col gap-2.5 mt-4 lg:mt-2">
            {footerLinks.pages.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-block text-xs font-semibold tracking-widest text-brand-white/70 hover:text-brand-white dark:text-brand-white/70 dark:hover:text-brand-white transition-all duration-300 hover:translate-x-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Cell 3: Social Links */}
        <motion.div 
          custom={2}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
          whileHover={{ 
            y: -8, 
            scale: 1.018, 
            rotateX: -2, 
            rotateY: -1,
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)" 
          }}
          className="lg:col-span-3 min-h-[250px] lg:min-h-[210px] bg-white/80 dark:bg-[#1A1A1A]/35 border border-black/20 dark:border-white/10 rounded-[2rem] p-8 lg:p-6 xl:p-8 flex flex-col justify-between transition-colors duration-500 relative overflow-hidden text-left cursor-default hover:border-brand-white/40 dark:hover:border-brand-white/40 group"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray font-semibold">
            03 // DIRECT NETWORK
          </span>

          <ul className="flex flex-col gap-2.5 mt-4 lg:mt-2">
            {footerLinks.socials.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-semibold tracking-widest text-brand-white/70 hover:text-brand-white dark:text-brand-white/70 dark:hover:text-brand-white transition-all duration-300 hover:translate-x-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4 [perspective:1200px]">
        
        {/* Cell 4: Live Timezones Clocks */}
        <motion.div 
          custom={3}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
          whileHover={{ 
            y: -8, 
            scale: 1.015, 
            rotateX: -1, 
            rotateY: 1,
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)" 
          }}
          className="lg:col-span-6 min-h-[200px] lg:min-h-[160px] bg-white/80 dark:bg-[#1A1A1A]/35 border border-black/20 dark:border-white/10 rounded-[2rem] p-8 lg:p-6 xl:p-8 flex flex-col justify-between transition-colors duration-500 relative overflow-hidden text-left cursor-default hover:border-brand-white/40 dark:hover:border-brand-white/40 group"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray font-semibold">
            04 // STUDIO TIMEZONES
          </span>

          <div className="grid grid-cols-3 gap-4 mt-4 lg:mt-2">
            {/* NYC */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-brand-gray/60 uppercase tracking-widest">SOHO, NY</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm md:text-base lg:text-sm xl:text-base tracking-wider font-semibold">
                  {getLocalTime('America/New_York')}
                </span>
                <div className="w-1.5 h-1.5 bg-brand-white rounded-full animate-pulse shadow-[0_0_8px_var(--color-brand-white)]" />
              </div>
            </div>
            
            {/* LDN */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-brand-gray/60 uppercase tracking-widest">LONDON, UK</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm md:text-base lg:text-sm xl:text-base tracking-wider font-semibold">
                  {getLocalTime('Europe/London')}
                </span>
                <div className="w-1.5 h-1.5 bg-brand-white rounded-full animate-pulse shadow-[0_0_8px_var(--color-brand-white)]" />
              </div>
            </div>

            {/* KYO */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-brand-gray/60 uppercase tracking-widest">KYOTO, JP</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm md:text-base lg:text-sm xl:text-base tracking-wider font-semibold">
                  {getLocalTime('Asia/Tokyo')}
                </span>
                <div className="w-1.5 h-1.5 bg-brand-white rounded-full animate-pulse shadow-[0_0_8px_var(--color-brand-white)]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cell 5: Studio Address & Direct Call */}
        <motion.div 
          custom={4}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
          whileHover={{ 
            y: -8, 
            scale: 1.015, 
            rotateX: -1, 
            rotateY: -1,
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)" 
          }}
          className="lg:col-span-6 min-h-[200px] lg:min-h-[160px] bg-white/80 dark:bg-[#1A1A1A]/35 border border-black/20 dark:border-white/10 rounded-[2rem] p-8 lg:p-6 xl:p-8 flex flex-col justify-between transition-colors duration-500 relative overflow-hidden text-left cursor-default hover:border-brand-white/40 dark:hover:border-brand-white/40 group"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray font-semibold">
            05 // DIRECTORY
          </span>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4 lg:mt-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-brand-gray/60 uppercase tracking-widest">HQ STUDIO</span>
              <p className="text-xs font-semibold tracking-wider uppercase leading-relaxed max-w-xs mt-0.5">
                42 MERCER ST, SOHO, <br />
                NEW YORK, NY 10013
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-brand-gray/60 uppercase tracking-widest">TELEPHONE</span>
              <a href="tel:+12125550192" className="text-xs font-semibold tracking-widest text-brand-white/80 hover:text-brand-white dark:hover:text-brand-white transition-colors duration-300">
                +1 (212) 555-0192
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Row 3: Huge Brand Signature & Legal Footnotes */}
      <div className="flex flex-col items-center justify-between p-8 lg:p-3 xl:p-5 gap-4 lg:gap-3 xl:gap-5 bg-transparent text-center overflow-hidden">
        
        {/* Huge Animated Letter-Bounce Brand Text (No Copyright symbol) */}
        <div className="w-full flex items-center justify-center py-2 select-none relative overflow-hidden">
          <h2 className="font-serif font-black tracking-tighter uppercase text-[2.5rem] sm:text-[4.75rem] md:text-[6.5rem] lg:text-[7.8rem] xl:text-[9.2rem] leading-none flex gap-1 justify-center w-full">
            {brandName.split("").map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.05 }}
                className="inline-block text-brand-white/12 dark:text-brand-white/12 [-webkit-text-stroke:1.3px_rgba(22,21,19,0.55)] dark:[-webkit-text-stroke:1px_rgba(242,240,235,0.45)] cursor-pointer select-none"
                whileHover={{
                  color: "var(--color-brand-white)",
                  scale: 1.15,
                  y: -14,
                  WebkitTextStroke: "1px var(--color-brand-white)",
                  transition: { type: "spring", stiffness: 450, damping: 9 }
                }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Legal footnote row */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-black/5 dark:border-white/5 pt-3 text-[9px] tracking-[0.2em] font-mono text-brand-gray/50 gap-4 uppercase font-semibold">
          <p>© {new Date().getFullYear()} AESTHETIQUE DESIGN STUDIO INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-brand-white transition-colors duration-300">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-brand-white transition-colors duration-300">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
