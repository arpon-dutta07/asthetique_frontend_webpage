import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

function BentoSections() {
  const [activeService, setActiveService] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

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
      
      {/* ----------------- SERVICES SECTION (Interactive Split Screen Layout) ----------------- */}
      <section id="services" className="flex flex-col gap-10 w-full border-t border-black/5 pt-20">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-brand-gray/80 font-bold font-sans">
            01 // SERVICES SHOWCASE
          </h2>
          <span className="text-[10px] text-brand-gray/40 font-mono hidden md:inline">
            INTERACTIVE EXPERIENCE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Typographic Services list */}
          <div className="lg:col-span-6 flex flex-col w-full border-b border-black/5 lg:border-b-0">
            {SERVICES_DATA.map((service, index) => (
              <button
                key={service.id}
                onMouseEnter={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
                className={`py-8 text-left border-t border-black/5 flex flex-col gap-2 transition-all duration-500 w-full outline-none focus:outline-none relative group`}
              >
                {/* Horizontal sliding underline on hover */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#161513] origin-left transition-transform duration-500 ease-out ${
                    activeService === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                  }`} 
                />

                <div className="flex items-center justify-between w-full pr-4">
                  <div className={`flex flex-col gap-2 transition-transform duration-500 ${
                    activeService === index ? 'translate-x-3' : 'translate-x-0'
                  }`}>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-brand-gray/50">{service.id}</span>
                      <span className={`text-[9px] tracking-widest uppercase font-bold transition-colors duration-500 ${
                        activeService === index ? 'text-brand-white' : 'text-brand-gray/40'
                      }`}>
                        {service.category}
                      </span>
                    </div>
                    <h3 className={`text-xl md:text-3xl font-medium tracking-normal font-serif transition-colors duration-500 ${
                      activeService === index ? 'text-brand-white' : 'text-brand-white/40'
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Animated luxury arrow sliding in */}
                  <div className="overflow-hidden h-6 w-8 relative shrink-0">
                    <motion.div
                      animate={{ 
                        x: activeService === index ? 0 : -20,
                        opacity: activeService === index ? 1 : 0
                      }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      className="text-brand-white absolute right-0"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Premium Image Mask Reveal & Details */}
          <div className="lg:col-span-6 flex flex-col gap-8 relative lg:sticky lg:top-12 w-full">
            {/* Image Container with Inset Mask ClipPath */}
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-video md:aspect-[16/10] bg-brand-dark shadow-[0_25px_60px_rgba(22,21,19,0.08)] border border-black/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService}
                  src={SERVICES_DATA[activeService].image}
                  alt={SERVICES_DATA[activeService].title}
                  initial={{ clipPath: 'inset(12% 12% 12% 12% rounded 2.5rem)', opacity: 0, scale: 1.05 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0% rounded 2.5rem)', opacity: 1, scale: 1 }}
                  exit={{ clipPath: 'inset(12% 12% 12% 12% rounded 2.5rem)', opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
            </div>

            {/* Dynamic Text Details */}
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col gap-5 text-left px-4"
            >
              <p className="text-brand-gray text-sm md:text-base font-light leading-relaxed">
                {SERVICES_DATA[activeService].description}
              </p>
              
              {/* Highlights tags staggered */}
              <div className="flex flex-wrap gap-2 pt-2">
                {SERVICES_DATA[activeService].highlights.map((tag, i) => (
                  <motion.span 
                    key={tag} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                    className="text-[9px] tracking-widest text-brand-white bg-black/5 border border-black/10 px-4 py-2 rounded-full uppercase font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
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
              className="flex flex-col gap-4 text-left group cursor-none"
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
              className="flex flex-col gap-4 text-left group md:mt-16"
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
              className="flex flex-col gap-4 text-left group"
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
              className="flex flex-col gap-4 text-left group md:mt-16"
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
