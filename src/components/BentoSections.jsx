import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion'
import ClientFeedback from './ui/testimonial'

function AnimatedCounter({ value, duration = 1.5 }) {
  const numericPart = parseInt(value, 10);
  const suffix = value.replace(numericPart.toString(), '');
  
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeProgress * numericPart));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, numericPart, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const SERVICES_DATA = [
  {
    id: '01',
    category: 'PRIVATE RESIDENCES',
    title: 'Residential Architecture',
    description: 'Villas, penthouses, and bespoke private estates. We craft tailored living environments that balance daily functionality with elevated, serene aesthetics.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
    highlights: ['Spatial Masterplanning', 'Material Sourcing', 'Custom Interior Detailing', 'Art Curation']
  },
  {
    id: '02',
    category: 'BRANDED ENVIRONMENTS',
    title: 'Commercial & Hospitality',
    description: 'Boutique offices, luxury retail storefronts, and premium hospitality spaces designed to align with corporate brand values and optimize sensory user experiences.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800',
    highlights: ['Branded Spatial Identity', 'Workplace Ergonomics', 'Lighting Integration', 'FF&E Procurement']
  },
  {
    id: '03',
    category: 'TAILORED DETAILS',
    title: 'Bespoke Millwork & Styling',
    description: 'In-house custom cabinetry, unique millwork systems, custom integrated kitchens, wardrobes, and curated furniture selection tailored specifically for the architecture.',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800',
    highlights: ['Technical Cabinet Drawings', 'Joinery Architecture', 'Material Consultations', 'Prototyping Coordination']
  },
  {
    id: '04',
    category: 'SENSORY SPACES',
    title: 'Atmospheric & Lighting Design',
    description: 'Comprehensive electrical layouts, custom ceiling lighting systems, natural daylight calibration, acoustic absorption treatments, and smart automated environmental controls.',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800',
    highlights: ['Luminance Calculations', 'Acoustic Panel Selection', 'Automation Programming', 'Daylight Path Analysis']
  }
]

const PROCESS_DATA = [
  {
    step: '01',
    phase: 'DISCOVERY CALL',
    desc: 'An initial consultation to discuss your vision, spatial requirements, budget, and project timeline.'
  },
  {
    step: '02',
    phase: 'SITE VISIT & BRIEF',
    desc: 'In-person inspection of the site to capture accurate measurements and align on the design brief.'
  },
  {
    step: '03',
    phase: 'CONCEPT DEVELOPMENT',
    desc: 'Translating concepts into moodboards, spatial layouts, materiality palettes, and preliminary 3D renderings.'
  },
  {
    step: '04',
    phase: 'PROCUREMENT & BUILD',
    desc: 'Sourcing rare finishes, custom millwork curation, and managing build schedules with general contractors.'
  },
  {
    step: '05',
    phase: 'REVEAL & HANDOVER',
    desc: 'Final styling, lighting calibration, and the ultimate turnkey walkthrough of your newly designed sanctuary.'
  }
]

const GALLERY_DATA = [
  {
    id: 'tribeca-loft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    title: 'Tribeca Loft',
    location: 'NEW YORK, NY'
  },
  {
    id: 'penthouse-noir',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
    title: 'Penthouse Noir',
    location: 'LONDON, UK'
  },
  {
    id: 'japandi-haven',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
    title: 'Japandi Haven',
    location: 'KYOTO, JP'
  },
  {
    id: 'verde-studio',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    title: 'Verde Studio',
    location: 'SOHO, NY'
  }
]



const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ServiceIcon({ iconId, isActive }) {
  const strokeClass = isActive ? "stroke-[2.5]" : "stroke-2";
  if (iconId === '01') {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" className={strokeClass} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    );
  }
  if (iconId === '02') {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" className={strokeClass} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }
  if (iconId === '03') {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" className={strokeClass} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" className={strokeClass} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function BentoSections({ onOpenDetail }) {
  const [step, setStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [expandedProject, setExpandedProject] = useState(2) // Default to index 2 (Japandi Haven)
  const [isMobile, setIsMobile] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const timelineRef = useRef(null)
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.15 })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const currentIndex = ((step % SERVICES_DATA.length) + SERVICES_DATA.length) % SERVICES_DATA.length

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextStep, 3500)
    return () => clearInterval(interval)
  }, [nextStep, isPaused])

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = SERVICES_DATA.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formState.name && formState.email && formState.message) {
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setFormState({ name: '', email: '', message: '' })
      }, 3000)
    }
  }



  // Common Viewport Motion Setup
  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 60,
        damping: 18,
        duration: 0.8
      }
    }
  }

  const processCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      rotateX: 18, 
      rotateY: -6,
      filter: "blur(6px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      rotateY: 0,
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        stiffness: 70,
        damping: 14,
        duration: 0.85
      }
    }
  }

  return (
    <div className="flex flex-col gap-32 w-full mt-24 pb-20">
      
      {/* ----------------- SERVICES SECTION (Carousel Showcase with 3D Stacked Cards) ----------------- */}
      <section id="services" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-6 text-left">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl md:text-5xl lg:text-6xl text-[#C9B99A] font-light">01</span>
            <span className="text-brand-gray/40 text-xl md:text-2xl font-light">/</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-brand-white uppercase">
              SERVICES SHOWCASE
            </h2>
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray/50 uppercase hidden md:inline">
            INTERACTIVE EXPERIENCE
          </span>
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-center min-h-[720px] w-full">
          {/* Left Column: Vertical sliding timeline */}
          <div className="w-full lg:w-[45%] min-h-[380px] md:min-h-[480px] relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 bg-transparent py-8">
            
            <div className="relative w-full h-[440px] z-10">
              {SERVICES_DATA.map((service, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(-2, 2, distance);

                return (
                  <motion.div
                    key={service.id}
                    style={{
                      height: 96,
                      width: "100%",
                      top: "50%",
                    }}
                    animate={{
                      y: -48 + (wrappedDistance * 98),
                      opacity: 1 - Math.abs(wrappedDistance) * 0.35,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className="absolute flex items-center justify-start left-0 w-full"
                  >
                    <button
                      onClick={() => {
                        const diff = (index - currentIndex + SERVICES_DATA.length) % SERVICES_DATA.length;
                        if (diff > 0) setStep((s) => s + diff);
                      }}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={`relative flex items-center gap-5 px-8 py-5 rounded-[2rem] transition-all duration-700 text-left group border w-full md:w-[95%] lg:w-full outline-none focus:outline-none cursor-pointer ${
                        isActive
                          ? "bg-brand-white text-brand-black border-brand-white z-10 shadow-xl scale-[1.02]"
                          : "bg-transparent text-brand-white/40 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:text-brand-white"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center transition-colors duration-500 w-10 h-10 rounded-full ${
                          isActive ? "text-brand-black bg-brand-black/5" : "text-brand-white/30 bg-transparent"
                        }`}
                      >
                        <ServiceIcon iconId={service.id} isActive={isActive} />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono tracking-widest opacity-60 uppercase">
                          SERVICE {service.id}
                        </span>
                        <span className="font-serif text-base md:text-lg font-medium tracking-wide uppercase">
                          {service.title}
                        </span>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Stacked Cards */}
          <div className="flex-1 min-h-[580px] lg:h-full relative flex items-center justify-center py-16 px-6 md:px-16 overflow-hidden">
            <div className="relative w-full max-w-[500px] aspect-[4/5] flex items-center justify-center h-[90%] lg:h-[95%]">
              {SERVICES_DATA.map((service, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={service.id}
                    initial={false}
                    animate={{
                      x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.88 : 0.75,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                      rotate: isPrev ? -4 : isNext ? 4 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    whileHover={isActive ? { scale: 1.03, y: -8, transition: { duration: 0.3 } } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 24,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-6 border-brand-black bg-brand-black origin-center shadow-2xl cursor-pointer"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isActive
                          ? "grayscale-0 blur-0 scale-100"
                          : "grayscale blur-[2px] brightness-75 scale-105"
                      }`}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none z-10" />

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end text-left pointer-events-none z-20"
                        >
                          <div className="bg-[#F2F0EB] text-[#161513] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] w-fit shadow-md mb-4 border border-white/10">
                            {service.category}
                          </div>
                          <h3 className="text-white font-serif text-2xl md:text-3xl font-normal leading-tight mb-3 tracking-wide uppercase">
                            {service.title}
                          </h3>
                          <p className="text-white/85 font-light text-xs md:text-sm leading-relaxed mb-6 max-w-md">
                            {service.description}
                          </p>
                          
                          {/* Highlights tags */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {service.highlights.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-[9px] tracking-widest text-white/90 bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full uppercase font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Premium Live Indicator tag */}
                    <div
                      className={`absolute top-8 left-8 flex items-center gap-2 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white] animate-pulse" />
                      <span className="text-white/70 text-[9px] font-normal uppercase tracking-[0.25em] font-mono">
                        Studio Space {service.id}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ----------------- SECTION 2 — STATS BAR ----------------- */}
      <section id="stats" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-2 text-left">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl md:text-5xl lg:text-6xl text-[#C9B99A] font-light">02</span>
            <span className="text-brand-gray/40 text-xl md:text-2xl font-light">/</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-brand-white uppercase">
              STUDIO STATS
            </h2>
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray/50 uppercase hidden md:inline">
            METRICS & INFLUENCE
          </span>
        </div>

        <div className="w-full border-t border-b border-black/10 dark:border-white/10 bg-[#F7F5F0] dark:bg-[#161616]/90 py-12 px-6 md:px-8 select-none transition-colors duration-500 rounded-[2rem] shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center md:border-r border-black/10 dark:border-white/10">
              <span className="font-sans font-bold tracking-tight text-brand-white text-[36px] md:text-[clamp(36px,5vw,58px)] leading-none mb-2">
                <AnimatedCounter value="84+" />
              </span>
              <span className="text-[13px] text-brand-gray tracking-wider uppercase font-medium">
                Projects completed
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center md:border-r border-black/10 dark:border-white/10">
              <span className="font-sans font-bold tracking-tight text-brand-white text-[36px] md:text-[clamp(36px,5vw,58px)] leading-none mb-2">
                <AnimatedCounter value="14" />
              </span>
              <span className="text-[13px] text-brand-gray tracking-wider uppercase font-medium">
                Countries worked in
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center md:border-r border-black/10 dark:border-white/10">
              <span className="font-sans font-bold tracking-tight text-brand-white text-[36px] md:text-[clamp(36px,5vw,58px)] leading-none mb-2">
                <AnimatedCounter value="97%" />
              </span>
              <span className="text-[13px] text-brand-gray tracking-wider uppercase font-medium">
                Patrons return / refer
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-sans font-bold tracking-tight text-brand-white text-[36px] md:text-[clamp(36px,5vw,58px)] leading-none mb-2">
                <AnimatedCounter value="8yr" />
              </span>
              <span className="text-[13px] text-brand-gray tracking-wider uppercase font-medium">
                Studio practice
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- SECTION 3 — PROCESS TIMELINE ----------------- */}
      <section id="process" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-6 text-left">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl md:text-5xl lg:text-6xl text-[#C9B99A] font-light">03</span>
            <span className="text-brand-gray/40 text-xl md:text-2xl font-light">/</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-brand-white uppercase">
              CREATIVE PROCESS
            </h2>
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray/50 uppercase hidden md:inline">
            5-STAGE PIPELINE
          </span>
        </div>

        {/* Timeline Stagger Container */}
        <div ref={timelineRef} className="relative w-full py-6">
          


          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 text-left [perspective:1200px] relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {PROCESS_DATA.map((proc, index) => (
              <motion.div 
                key={proc.step} 
                className="relative flex flex-col gap-6 p-6 rounded-[2rem] bg-brand-white/5 border border-black/5 dark:border-white/5 hover:border-[#C9B99A]/30 hover:bg-brand-white/10 transition-all duration-500 ease-out group overflow-hidden cursor-pointer"
                variants={processCardVariants}
                whileHover={{
                  y: -12,
                  rotateX: 3,
                  rotateY: -4,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
                }}
              >
                {/* Giant Parallax Background Step Number */}
                <span className="absolute bottom-2 right-4 font-display text-[7rem] font-bold text-brand-white/[0.03] group-hover:text-[#C9B99A]/[0.08] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-700 pointer-events-none select-none">
                  {proc.step}
                </span>

                {/* Connecting vertical line on mobile */}
                <div className="absolute left-[33px] top-[50px] bottom-0 w-[1.5px] bg-[#C9B99A]/15 z-0 lg:hidden group-last:hidden" />

                {/* Header Row: Dot & Step badge */}
                <div className="flex items-center gap-3 relative z-10">
                  {/* Circle Dot Marker */}
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-[#C9B99A] bg-transparent flex items-center justify-center transition-all duration-500 z-10 group-hover:scale-125 group-hover:bg-[#C9B99A] group-hover:shadow-[0_0_12px_#C9B99A]">
                    <div className="w-[4px] h-[4px] rounded-full bg-[#C9B99A] group-hover:bg-brand-black transition-colors duration-300" />
                  </div>

                  {/* Step Code */}
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#C9B99A] font-mono font-bold">
                    STEP {proc.step}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-col gap-2.5 relative z-10 text-left">
                  <h4 className="text-base font-semibold tracking-wide text-brand-white uppercase font-sans">
                    {proc.phase}
                  </h4>
                  <p className="text-brand-gray text-[13px] font-light leading-[1.65] max-w-sm">
                    {proc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ----------------- PROJECTS GALLERY SECTION (Expandable Stacking Accordion) ----------------- */}
      <section id="gallery" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-6 text-left">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl md:text-5xl lg:text-6xl text-[#C9B99A] font-light">04</span>
            <span className="text-brand-gray/40 text-xl md:text-2xl font-light">/</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-brand-white uppercase">
              EDITORIAL ARCHIVE
            </h2>
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray/50 uppercase hidden md:inline">
            ACCORDION PORTFOLIO
          </span>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-5 items-stretch mt-8 select-none">
          {GALLERY_DATA.map((project, idx) => {
            const isActive = idx === expandedProject;

            return (
              <motion.div
                key={project.id}
                onMouseEnter={() => setExpandedProject(idx)}
                onClick={() => setExpandedProject(idx)}
                className="relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-brand-dark transition-all duration-500 ease-in-out shadow-2xl border border-black/5 dark:border-white/5"
                animate={{
                  flexGrow: isActive ? 4.5 : 1,
                  height: isMobile ? (isActive ? 340 : 110) : 540,
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                  mass: 0.9,
                }}
              >
                <img
                  className={`w-full h-full object-cover absolute inset-0 z-0 transition-all duration-1000 ease-out ${
                    isActive ? "grayscale-0 blur-0 scale-100" : "grayscale blur-[1.5px] brightness-75 scale-[1.03]"
                  }`}
                  src={project.image}
                  alt={project.title}
                />
                
                {/* Dark gradient overlay inside card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />

                {/* Vertical title metadata for inactive cards (visible on desktop) */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5, transition: { delay: 0.1 } }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 hidden lg:flex"
                    >
                      <span className="font-serif text-sm text-white tracking-[0.25em] uppercase origin-center rotate-90 whitespace-nowrap">
                        0{idx + 1} / {project.title}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Full metadata description overlay for the active card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end text-left z-20"
                    >
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full pointer-events-none">
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-mono tracking-widest text-[#F2F0EB]/60 uppercase">
                            PROJECT 0{idx + 1} // {project.location}
                          </span>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white uppercase tracking-wide">
                            {project.title}
                          </h3>
                        </div>

                        {/* Clickable Explore Space Action button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDetail(project.id);
                          }}
                          className="flex items-center justify-center gap-2 bg-[#F2F0EB] text-[#161513] px-6 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#161513] hover:text-white hover:scale-105 pointer-events-auto cursor-pointer"
                        >
                          <span>Explore Space</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* ----------------- TESTIMONIALS SECTION (Client Feedback Grid) ----------------- */}
      <section id="testimonials" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-6 text-left">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl md:text-5xl lg:text-6xl text-[#C9B99A] font-light">05</span>
            <span className="text-brand-gray/40 text-xl md:text-2xl font-light">/</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-brand-white uppercase">
              CLIENT VOICES
            </h2>
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray/50 uppercase hidden md:inline">
            CLIENT FEEDBACK
          </span>
        </div>
        <ClientFeedback />
      </section>


      {/* ----------------- CONTACT & FOOTER SECTION (Split Underline Input Form) ----------------- */}
      <section id="contact" className="flex flex-col gap-12 w-full border-t border-black/5 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 dark:border-white/10 pb-6 mb-6 text-left">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl md:text-5xl lg:text-6xl text-[#C9B99A] font-light">06</span>
            <span className="text-brand-gray/40 text-xl md:text-2xl font-light">/</span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-brand-white uppercase">
              COLLABORATE
            </h2>
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-gray/50 uppercase hidden md:inline">
            GET IN TOUCH
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Left Details column wrapped in premium bento card */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between gap-12 relative p-8 md:p-10 rounded-[2.5rem] bg-brand-white/[0.02] border border-brand-white/5 cursor-default"
            whileHover={{
              y: -8,
              rotateX: 1,
              rotateY: 2,
              boxShadow: "0 25px 50px rgba(0,0,0,0.03)"
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className="flex flex-col gap-5 z-10">
              <h3 className="text-4xl md:text-5xl lg:text-[3rem] font-medium tracking-tight text-brand-white leading-[1.1] font-serif uppercase">
                Let's construct <br />something timeless
              </h3>
              <p className="text-brand-gray text-sm md:text-base font-light leading-relaxed max-w-sm">
                Reach out to schedule an initial consultation. Our team will review your objectives and map out a tailored spatial blueprint for your home or workplace.
              </p>
            </div>

            {/* Direct details info list */}
            <div className="flex flex-col gap-6 border-t border-brand-white/5 pt-8 z-10">
              <div className="flex flex-col gap-1.5 group">
                <span className="text-[9px] text-brand-gray/40 font-bold tracking-widest font-sans uppercase">studio email</span>
                <a href="mailto:hello@aesthetique.com" className="text-sm font-semibold text-brand-white hover:text-[#C9B99A] tracking-wide transition-all duration-300">
                  hello@aesthetique.com
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-brand-gray/40 font-bold tracking-widest font-sans uppercase">office phone</span>
                <a href="tel:+12125550192" className="text-sm font-semibold text-brand-white hover:text-[#C9B99A] tracking-wide transition-all duration-300">
                  +1 (212) 555-0192
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-brand-gray/40 font-bold tracking-widest font-sans uppercase">locations</span>
                <p className="text-sm font-semibold text-brand-white/90 tracking-wide">
                  42 Mercer St, Soho, New York, NY 10013
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Form column wrapped in premium bento card with 3D hover */}
          <motion.div 
            className="lg:col-span-7 w-full p-8 md:p-10 rounded-[2.5rem] bg-brand-white/[0.02] border border-brand-white/5 relative overflow-hidden cursor-default flex flex-col justify-center"
            whileHover={{
              y: -8,
              rotateX: 1,
              rotateY: -2,
              boxShadow: "0 25px 50px rgba(0,0,0,0.05)"
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center gap-5 bg-brand-dark/30 border border-black/5 rounded-[2.5rem]"
              >
                <div className="w-14 h-14 bg-brand-white/10 rounded-full flex items-center justify-center text-brand-white border border-brand-white/20">
                  <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-sm font-bold text-brand-white uppercase tracking-widest">Inquiry Successfully Received</h4>
                <p className="text-brand-gray text-xs md:text-sm font-light max-w-sm px-6 leading-relaxed">
                  Thank you for aligning with our studio. A design lead from our Soho office will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                
                {/* Minimal input 1 */}
                <div className="flex flex-col gap-2 relative group text-left">
                  <div className={`relative rounded-2xl border transition-all duration-300 px-5 py-3.5 ${
                    focusedField === 'name' 
                      ? 'border-[#C9B99A] bg-brand-white/[0.04] shadow-[0_0_12px_rgba(201,185,154,0.15)]' 
                      : 'border-brand-white/10 bg-brand-white/[0.02] hover:border-brand-white/20'
                  }`}>
                    <label className={`absolute left-5 transition-all duration-300 pointer-events-none uppercase font-mono tracking-wider ${
                      focusedField === 'name' || formState.name 
                        ? 'top-2 text-[9px] text-[#C9B99A] font-bold' 
                        : 'top-1/2 -translate-y-1/2 text-xs text-brand-gray/60'
                    }`}>
                      01 // What is your name?
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formState.name}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      onChange={handleInputChange}
                      className="w-full bg-transparent text-sm text-brand-white outline-none pt-4 pb-0 font-sans"
                    />
                  </div>
                </div>

                {/* Minimal input 2 */}
                <div className="flex flex-col gap-2 relative group text-left">
                  <div className={`relative rounded-2xl border transition-all duration-300 px-5 py-3.5 ${
                    focusedField === 'email' 
                      ? 'border-[#C9B99A] bg-brand-white/[0.04] shadow-[0_0_12px_rgba(201,185,154,0.15)]' 
                      : 'border-brand-white/10 bg-brand-white/[0.02] hover:border-brand-white/20'
                  }`}>
                    <label className={`absolute left-5 transition-all duration-300 pointer-events-none uppercase font-mono tracking-wider ${
                      focusedField === 'email' || formState.email 
                        ? 'top-2 text-[9px] text-[#C9B99A] font-bold' 
                        : 'top-1/2 -translate-y-1/2 text-xs text-brand-gray/60'
                    }`}>
                      02 // What is your email address?
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formState.email}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      onChange={handleInputChange}
                      className="w-full bg-transparent text-sm text-brand-white outline-none pt-4 pb-0 font-sans"
                    />
                  </div>
                </div>

                {/* Minimal input 3 */}
                <div className="flex flex-col gap-2 relative group text-left">
                  <div className={`relative rounded-2xl border transition-all duration-300 px-5 py-3.5 ${
                    focusedField === 'message' 
                      ? 'border-[#C9B99A] bg-brand-white/[0.04] shadow-[0_0_12px_rgba(201,185,154,0.15)]' 
                      : 'border-brand-white/10 bg-brand-white/[0.02] hover:border-brand-white/20'
                  }`}>
                    <label className={`absolute left-5 transition-all duration-300 pointer-events-none uppercase font-mono tracking-wider ${
                      focusedField === 'message' || formState.message 
                        ? 'top-2 text-[9px] text-[#C9B99A] font-bold' 
                        : 'top-5 text-xs text-brand-gray/60'
                    }`}>
                      03 // Tell us about your project.
                    </label>
                    <textarea 
                      name="message"
                      required
                      value={formState.message}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-transparent text-sm text-brand-white outline-none pt-4 pb-0 font-sans resize-none"
                    />
                  </div>
                </div>

                {/* Submit button with sliding mask hover effect */}
                <div className="pt-2 text-left">
                  <button 
                    type="submit"
                    className="relative overflow-hidden inline-flex items-center justify-center px-10 py-4 rounded-full border border-[#161513] dark:border-[#F2F0EB] bg-[#161513] dark:bg-[#F2F0EB] text-[#F2F0EB] dark:text-[#161513] text-xs font-semibold tracking-widest transition-all duration-300 hover:bg-transparent dark:hover:bg-transparent hover:text-[#161513] dark:hover:text-[#F2F0EB] uppercase group cursor-pointer"
                  >
                    Submit Details
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

      </section>

    </div>
  )
}

export default BentoSections
