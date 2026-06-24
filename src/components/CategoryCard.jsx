import React from 'react'
import { motion } from 'framer-motion'

function CategoryCard({ image, label, gridClass = '', onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative rounded-[2rem] overflow-hidden border border-white/5 bg-brand-dark group flex items-center justify-center min-h-[130px] md:min-h-[150px] aspect-square md:aspect-auto lg:h-full interactive-card cursor-pointer ${gridClass}`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src={image}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Faded/Dark Overlay (lightens on hover) */}
        <div className="absolute inset-0 bg-black/70 transition-colors duration-500 group-hover:bg-black/45 pointer-events-none" />
      </div>

      {/* Centered Category Text */}
      <span className="relative z-10 text-[#F2F0EB] font-semibold text-xs md:text-sm tracking-widest uppercase transition-transform duration-300 group-hover:scale-105">
        {label}
      </span>
    </motion.div>
  )
}

export default CategoryCard
