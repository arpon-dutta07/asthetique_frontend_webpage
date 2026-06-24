import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

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
    phase: 'CONCEPT & INCEPTION',
    desc: 'Defining goals, analyzing spatial functionality, designing moodboards, and aligning on project scope.'
  },
  {
    step: '02',
    phase: 'DESIGN DEVELOPMENT',
    desc: 'Translating concepts into accurate floorplans, 3D photorealistic renderings, finish samples, and primary furniture curation.'
  },
  {
    step: '03',
    phase: 'TECHNICAL ARCHITECTURE',
    desc: 'Developing full execution drawings, lighting directories, custom joinery details, plumbing guidelines, and coordinate documentation.'
  },
  {
    step: '04',
    phase: 'TURNKEY EXECUTION',
    desc: 'Managing contractor schedules, fit-out inspections, bespoke installations, final styling, lighting calibration, and handovers.'
  }
]

const GALLERY_DATA = [
  {
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    title: 'Tribeca Loft',
    location: 'NEW YORK, NY'
  },
  {
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
    title: 'Penthouse Noir',
    location: 'LONDON, UK'
  },
  {
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
    title: 'Japandi Haven',
    location: 'KYOTO, JP'
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    title: 'Verde Studio',
    location: 'SOHO, NY'
  }
]

const TESTIMONIALS_DATA = [
  {
    quote: "AESTHETIQUE transformed our home into a serene sanctuary. Their detailed custom millwork planning and execution are completely unmatched. They listen carefully and deliver pure artistic elegance.",
    author: "Sarah & David K.",
    project: "Casa Noir Residence"
  },
  {
    quote: "They understood our brand values instantly. Our boutique studio space has drastically improved team collaboration, client impressions, and day-to-day creative energy.",
    author: "Marcus V.",
    project: "CEO, Verde Studio"
  },
  {
    quote: "A masterclass in spatial choreography. The lighting plans alone completely reinvent the atmosphere of our penthouse from morning to night. Highly recommended.",
    author: "Elena R.",
    project: "Aurora Living"
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
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

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

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS_DATA.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)
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

  return (
    <div className="flex flex-col gap-32 w-full mt-24 pb-20">
      
      {/* ----------------- SERVICES SECTION (Carousel Showcase with 3D Stacked Cards) ----------------- */}
      <section id="services" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-brand-gray/80 font-bold font-sans text-left">
            01 // SERVICES SHOWCASE
          </h2>
          <span className="text-[10px] text-brand-gray/40 font-mono hidden md:inline">
            INTERACTIVE EXPERIENCE
          </span>
        </div>

        <div className="relative flex flex-col lg:flex-row min-h-[720px] w-full">
          {/* Left Column: Vertical sliding timeline */}
          <div className="w-full lg:w-[45%] min-h-[380px] md:min-h-[480px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 bg-transparent py-8">
            
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


      {/* ----------------- PROCESS SECTION (Interactive Progress Timeline with Viewport Trigger) ----------------- */}
      <section id="process" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-brand-gray/80 font-bold font-sans text-left">
            02 // CREATIVE JOURNEY
          </h2>
          <span className="text-[10px] text-brand-gray/40 font-mono hidden md:inline">
            STAGGERED TIMELINE
          </span>
        </div>

        {/* Scroll Linked Animation Wrapper */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
        >
          {PROCESS_DATA.map((proc, index) => (
            <motion.div 
              key={proc.step} 
              className="flex flex-col gap-6 relative group"
              variants={scrollRevealVariants}
            >
              {/* Step counter and progress line */}
              <div className="flex items-baseline justify-between border-b border-black/10 pb-4 relative overflow-hidden">
                <span className="font-serif italic text-4xl text-brand-white group-hover:text-brand-gray transition-colors duration-300">
                  {proc.step}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-brand-gray/40 font-bold">
                  STAGE {proc.step}
                </span>
                
                {/* Horizontal sliding underline on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#161513] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </div>

              {/* Step content */}
              <div className="flex flex-col gap-3 pt-2">
                <h3 className="text-xs font-bold tracking-widest text-brand-white uppercase">
                  {proc.phase}
                </h3>
                <p className="text-brand-gray/95 text-xs md:text-sm font-light leading-relaxed">
                  {proc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* ----------------- PROJECTS GALLERY SECTION (Art-Book Offset Layout) ----------------- */}
      <section id="gallery" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-brand-gray/80 font-bold font-sans">
            03 // EDITORIAL ARCHIVE
          </h2>
          <span className="text-[10px] text-brand-gray/40 font-mono hidden md:inline">
            ART-PORTFOLIO GRID
          </span>
        </div>

        {/* Staggered offsets for high-end gallery feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          
          {/* Left Column (Left shifted) */}
          <div className="flex flex-col gap-16 md:gap-24">
            
            {/* Project 1 */}
            <motion.div 
              className="flex flex-col gap-4 text-left group cursor-pointer"
              onClick={() => onOpenDetail('tribeca-loft')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
            >
              {/* Outer image holder with scale overflow-hidden */}
              <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-brand-dark relative shadow-[0_20px_50px_rgba(22,21,19,0.05)] border border-black/5">
                <img
                  src={GALLERY_DATA[0].image}
                  alt={GALLERY_DATA[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none z-10" />
              </div>
              <div className="flex justify-between items-center px-4 pt-1">
                {/* Text letters breathe/expand on card hover */}
                <h3 className="text-lg md:text-xl font-medium text-brand-white font-serif tracking-normal group-hover:tracking-wide transition-all duration-500">
                  {GALLERY_DATA[0].title}
                </h3>
                <span className="text-[9px] font-mono tracking-widest text-brand-gray/50 uppercase">{GALLERY_DATA[0].location}</span>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div 
              className="flex flex-col gap-4 text-left group md:mt-16 cursor-pointer"
              onClick={() => onOpenDetail('japandi-haven')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
            >
              <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-brand-dark relative shadow-[0_20px_50px_rgba(22,21,19,0.05)] border border-black/5">
                <img
                  src={GALLERY_DATA[2].image}
                  alt={GALLERY_DATA[2].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none z-10" />
              </div>
              <div className="flex justify-between items-center px-4 pt-1">
                <h3 className="text-lg md:text-xl font-medium text-brand-white font-serif tracking-normal group-hover:tracking-wide transition-all duration-500">
                  {GALLERY_DATA[2].title}
                </h3>
                <span className="text-[9px] font-mono tracking-widest text-brand-gray/50 uppercase">{GALLERY_DATA[2].location}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Right shifted downwards on desktop) */}
          <div className="flex flex-col gap-16 md:gap-24 md:pt-32">
            
            {/* Project 2 */}
            <motion.div 
              className="flex flex-col gap-4 text-left group cursor-pointer"
              onClick={() => onOpenDetail('penthouse-noir')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
            >
              <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-brand-dark relative shadow-[0_20px_50px_rgba(22,21,19,0.05)] border border-black/5">
                <img
                  src={GALLERY_DATA[1].image}
                  alt={GALLERY_DATA[1].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none z-10" />
              </div>
              <div className="flex justify-between items-center px-4 pt-1">
                <h3 className="text-lg md:text-xl font-medium text-brand-white font-serif tracking-normal group-hover:tracking-wide transition-all duration-500">
                  {GALLERY_DATA[1].title}
                </h3>
                <span className="text-[9px] font-mono tracking-widest text-brand-gray/50 uppercase">{GALLERY_DATA[1].location}</span>
              </div>
            </motion.div>

            {/* Project 4 */}
            <motion.div 
              className="flex flex-col gap-4 text-left group md:mt-16 cursor-pointer"
              onClick={() => onOpenDetail('verde-studio')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
            >
              <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] bg-brand-dark relative shadow-[0_20px_50px_rgba(22,21,19,0.05)] border border-black/5">
                <img
                  src={GALLERY_DATA[3].image}
                  alt={GALLERY_DATA[3].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none z-10" />
              </div>
              <div className="flex justify-between items-center px-4 pt-1">
                <h3 className="text-lg md:text-xl font-medium text-brand-white font-serif tracking-normal group-hover:tracking-wide transition-all duration-500">
                  {GALLERY_DATA[3].title}
                </h3>
                <span className="text-[9px] font-mono tracking-widest text-brand-gray/50 uppercase">{GALLERY_DATA[3].location}</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>


      {/* ----------------- TESTIMONIALS SECTION (Cinematic Quote Slider with Progress Bar) ----------------- */}
      <section id="testimonials" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <h2 className="text-xs uppercase tracking-[0.25em] text-brand-gray/80 font-bold font-sans text-left mb-2">
          04 // CLIENT VOICES
        </h2>

        {/* Carousel Quotes */}
        <div className="relative min-h-[340px] flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-6 w-full overflow-hidden">
          
          {/* Subtle Watermark Quote Icon in background */}
          <span className="font-serif text-[18rem] text-black/[0.015] absolute -top-16 left-6 select-none pointer-events-none">
            “
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8 z-10"
            >
              {/* Quote Body */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic text-brand-white leading-relaxed font-light">
                "{TESTIMONIALS_DATA[activeTestimonial].quote}"
              </blockquote>

              {/* Author & Project info */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-brand-white font-sans">
                  {TESTIMONIALS_DATA[activeTestimonial].author}
                </span>
                <span className="text-[10px] md:text-xs text-brand-gray/50 font-light tracking-wide">
                  {TESTIMONIALS_DATA[activeTestimonial].project}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left/Right Control Arrows + Horizontal Progress Track */}
          <div className="flex items-center gap-8 mt-14 z-10">
            <button 
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-full border border-black/10 hover:border-brand-white flex items-center justify-center text-brand-gray hover:text-brand-white transition-all duration-300 outline-none focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            {/* Custom slider progress line */}
            <div className="w-24 bg-black/10 h-[2px] rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-brand-white transition-all duration-500 ease-out"
                style={{ width: `${((activeTestimonial + 1) / TESTIMONIALS_DATA.length) * 100}%` }}
              />
            </div>

            <button 
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-full border border-black/10 hover:border-brand-white flex items-center justify-center text-brand-gray hover:text-brand-white transition-all duration-300 outline-none focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </section>


      {/* ----------------- CONTACT & FOOTER SECTION (Split Underline Input Form) ----------------- */}
      <section id="contact" className="flex flex-col gap-12 w-full border-t border-black/5 pt-20">
        <h2 className="text-xs uppercase tracking-[0.25em] text-brand-gray/80 font-bold font-sans text-left">
          05 // COLLABORATE
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start text-left">
          
          {/* Left Details column */}
          <div className="lg:col-span-5 flex flex-col gap-12 relative">
            <div className="flex flex-col gap-5 z-10">
              <h3 className="text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-brand-white leading-[1.1] font-serif">
                Let's construct <br />something timeless
              </h3>
              <p className="text-brand-gray text-sm md:text-base font-light leading-relaxed max-w-sm">
                Reach out to schedule an initial consultation. Our team will review your objectives and map out a tailored spatial blueprint for your home or workplace.
              </p>
            </div>

            {/* Direct details info list */}
            <div className="flex flex-col gap-6 border-t border-black/5 pt-8 z-10">
              <div className="flex flex-col gap-1.5 group">
                <span className="text-[9px] text-brand-gray/40 font-bold tracking-widest font-sans uppercase">studio email</span>
                <a href="mailto:hello@aesthetique.com" className="text-sm font-semibold text-brand-white hover:text-brand-gray tracking-wide transition-all duration-300">
                  hello@aesthetique.com
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-brand-gray/40 font-bold tracking-widest font-sans uppercase">office phone</span>
                <a href="tel:+12125550192" className="text-sm font-semibold text-brand-white hover:text-brand-gray tracking-wide transition-all duration-300">
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
          </div>

          {/* Right minimal form column */}
          <div className="lg:col-span-7 w-full">
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center gap-5 bg-brand-dark/30 border border-black/5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(22,21,19,0.04)]"
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-12 w-full">
                
                {/* Minimal underline input 1 */}
                <div className="flex flex-col gap-2 relative group">
                  <label className="text-[10px] text-brand-gray/50 font-bold uppercase tracking-widest transition-colors duration-300 group-focus-within:text-brand-white">
                    01 // What is your name?
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name..." 
                    className="w-full bg-transparent border-b border-black/10 py-3 text-sm text-brand-white placeholder-brand-gray/45 outline-none transition-all duration-300 focus:placeholder-transparent"
                  />
                  {/* Expanding accent underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#161513] scale-x-0 origin-center transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
                </div>

                {/* Minimal underline input 2 */}
                <div className="flex flex-col gap-2 relative group">
                  <label className="text-[10px] text-brand-gray/50 font-bold uppercase tracking-widest transition-colors duration-300 group-focus-within:text-brand-white">
                    02 // What is your email address?
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email..." 
                    className="w-full bg-transparent border-b border-black/10 py-3 text-sm text-brand-white placeholder-brand-gray/45 outline-none transition-all duration-300 focus:placeholder-transparent"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#161513] scale-x-0 origin-center transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
                </div>

                {/* Minimal underline input 3 */}
                <div className="flex flex-col gap-2 relative group">
                  <label className="text-[10px] text-brand-gray/50 font-bold uppercase tracking-widest transition-colors duration-300 group-focus-within:text-brand-white">
                    03 // Tell us about your project.
                  </label>
                  <textarea 
                    name="message"
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Briefly describe your space, goals, or schedule..." 
                    className="w-full bg-transparent border-b border-black/10 py-3 text-sm text-brand-white placeholder-brand-gray/45 outline-none transition-all duration-300 focus:placeholder-transparent resize-none"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#161513] scale-x-0 origin-center transition-transform duration-500 ease-out group-focus-within:scale-x-100" />
                </div>

                {/* Submit button with sliding mask hover effect */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="relative overflow-hidden inline-flex items-center justify-center px-10 py-4 rounded-full border border-[#161513] bg-[#161513] text-[#F2F0EB] text-xs font-semibold tracking-widest transition-all duration-300 hover:bg-[#F2F0EB] hover:text-[#161513] uppercase group"
                  >
                    Submit Details
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer bottom signature row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/5 pt-12 mt-16 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#161513] border border-black/5 rounded-xl flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#F2F0EB]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3L5 13H12L10 21L20 11H13L19 3Z" />
              </svg>
            </div>
            <span className="text-brand-white font-bold tracking-widest text-xs uppercase">
              AESTHETIQUE
            </span>
          </div>
          
          <p className="text-[9px] text-brand-gray/40 font-light tracking-widest uppercase">
            © {new Date().getFullYear()} AESTHETIQUE STUDIO. ALL RIGHTS RESERVED. / PRIVACY POLICY / TERMS OF USE
          </p>
        </div>
      </section>

    </div>
  )
}

export default BentoSections
