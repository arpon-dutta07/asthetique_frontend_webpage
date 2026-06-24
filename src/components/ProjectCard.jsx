import React from 'react'
import { motion } from 'framer-motion'

function ProjectCard({ image, title, gridClass = '' }) {
  return (
    <motion.div
      className={`relative rounded-[2rem] overflow-hidden border border-white/5 bg-brand-dark group h-full flex flex-col justify-end p-6 min-h-[220px] md:min-h-[240px] interactive-card ${gridClass}`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Image Container with Overflow Hidden */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Project Image */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Dark Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex justify-between items-center w-full">
        {/* Left: Project Title */}
        <p className="text-[#F2F0EB] font-medium text-sm md:text-base leading-none transition-transform duration-300 group-hover:-translate-y-1">
          {title}
        </p>

        {/* Right: View Project Pill */}
        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-[#F2F0EB] border border-white/10 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 group-hover:bg-[#F2F0EB] group-hover:text-[#161513] group-hover:border-[#F2F0EB]">
          <span>View Project</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2.5" 
            stroke="currentColor" 
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
