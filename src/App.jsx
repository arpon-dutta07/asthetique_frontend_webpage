import React, { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import HeroBento from './components/HeroBento'
import BentoSections from './components/BentoSections'
import NavigationMenu from './components/NavigationMenu'
import DetailOverlay from './components/DetailOverlay'
import Footer from './components/Footer'

const DETAIL_DATA = {
  'casa-noir': {
    type: 'project',
    title: 'Casa Noir Residence',
    location: 'SOHO, NY',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800',
    description: 'A study in dark luxury, spatial masterplanning, and rare textures. Features bespoke black marble millwork, curvilinear custom cabinetry, and ambient lighting arrays.',
    highlights: ['Spatial Masterplanning', 'Rare Travertine Stone', 'Integrated Plaster Systems', 'Smart Lighting Channels'],
    specs: { year: '2025', area: '4,200 SQ. FT.', location: 'Soho, New York', team: 'L. Vance' }
  },
  'aurora-living': {
    type: 'project',
    title: 'Aurora Living',
    location: 'LONDON, UK',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    description: 'A light-flooded modern penthouse emphasizing organic forms, fluid spatial pathways, and curved plaster structures, establishing an atmospheric retreat.',
    highlights: ['Curved Plaster Architecture', 'Organic Linen Drapery', 'FF&E Custom Procurement', 'Electric Blind Pathways'],
    specs: { year: '2024', area: '3,100 SQ. FT.', location: 'London, United Kingdom', team: 'R. Klay' }
  },
  'tribeca-loft': {
    type: 'project',
    title: 'Tribeca Loft',
    location: 'NEW YORK, NY',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    description: 'An open-plan loft conversion maintaining exposed brick, high-timber beams, and industrial frameworks, paired with sophisticated modern marble joinery.',
    highlights: ['Industrial Brick Integration', 'Timber Wood Polish', 'Concrete Custom Washroom', 'Frameless Glass Divisions'],
    specs: { year: '2023', area: '5,500 SQ. FT.', location: 'Manhattan, New York', team: 'S. Patel' }
  },
  'penthouse-noir': {
    type: 'project',
    title: 'Penthouse Noir',
    location: 'LONDON, UK',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
    description: 'A high-contrast duplex residence with floating custom steel steps, travertine stone fireplace arrays, and sprawling views of the cityscape.',
    highlights: ['Steel Floating Staircase', 'Travertine Stone Hearth', 'Trailing Overhead Tracks', 'Vapor Fireplace Fitment'],
    specs: { year: '2025', area: '2,800 SQ. FT.', location: 'London, United Kingdom', team: 'A. Miller' }
  },
  'japandi-haven': {
    type: 'project',
    title: 'Japandi Haven',
    location: 'KYOTO, JP',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
    description: 'A serene zen residency combining Scandinavian warm functionality with traditional Japanese oak partitions, shoji screens, and tatami details.',
    highlights: ['Scandinavian Oak Millwork', 'Kyoto Tatami Integration', 'Shoji Custom Panels', 'Rock Garden Entryway'],
    specs: { year: '2024', area: '1,900 SQ. FT.', location: 'Kyoto, Japan', team: 'H. Sato' }
  },
  'verde-studio': {
    type: 'project',
    title: 'Verde Studio',
    location: 'SOHO, NY',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    description: 'A biophilic creative office space focusing on natural acoustic systems, reclaimed cedar workspace counters, and air-purification structures.',
    highlights: ['Biophilic Moss Walling', 'Reclaimed Cedar Tables', 'Acoustic Wool Baffles', 'Smart Automation Paths'],
    specs: { year: '2025', area: '6,200 SQ. FT.', location: 'Soho, New York', team: 'K. Holmes' }
  },
  'commercial': {
    type: 'category',
    title: 'Commercial Spaces',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
    description: 'Aesthetically compelling workplace strategies and corporate spatial concepts aimed at boosting collaboration, wellness, and corporate identity integration.',
    highlights: ['Branded Spatial Identity', 'Workplace Ergonomics', 'Acoustic Calibration', 'Smart Automation Schemes'],
    projects: ['Verde Studio', 'Manhattan Office HQ', 'Mercer Showroom']
  },
  'residential': {
    type: 'category',
    title: 'Residential Spaces',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    description: 'Bespoke private estates, lofts, and villas designed around the intimate daily rituals of our clients, combining spatial logic and tactile material richness.',
    highlights: ['Spatial Masterplanning', 'Bespoke Cabinet Detailing', 'FF&E Sourcing & Curation', 'Electrical & Automation pathways'],
    projects: ['Casa Noir Residence', 'Aurora Living', 'Tribeca Loft', 'Japandi Haven']
  },
  'recreation': {
    type: 'category',
    title: 'Recreation & Leisure',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
    description: 'Sanctuaries, spas, boutique hospitality lobbies, and sensory settings designed for rest, recovery, and cultural engagement.',
    highlights: ['Acoustic Treatments', 'Daylight Path Controls', 'Atmospheric Lighting', 'FF&E Material Sourcing'],
    projects: ['Kyoto Spa', 'Mercer Gallery Lobby', 'Central Club']
  }
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
    }
    return true;
  })
  const [activeDetail, setActiveDetail] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
    document.documentElement.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme])

  const toggleTheme = (event) => {
    if (!document.startViewTransition) {
      setIsDarkTheme(prev => {
        const next = !prev;
        localStorage.setItem("theme", next ? "dark" : "light");
        return next;
      });
      return;
    }

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    // Check if toggled by an event click
    if (event && event.clientX !== undefined && event.clientY !== undefined) {
      centerX = event.clientX;
      centerY = event.clientY;
    } else {
      const button = document.querySelector('[aria-label="Toggle Theme"]');
      if (button) {
        const rect = button.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkTheme(prev => {
          const next = !prev;
          localStorage.setItem("theme", next ? "dark" : "light");
          return next;
        });
      });
    });

    transition.ready.then(() => {
      const maxDistance = Math.hypot(
        Math.max(centerX, window.innerWidth - centerX),
        Math.max(centerY, window.innerHeight - centerY)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${centerX}px ${centerY}px)`,
            `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };
  const handleOpenDetail = (key) => setActiveDetail(DETAIL_DATA[key])

  return (
    <div className={`relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-gray/30 selection:text-brand-white font-sans transition-colors duration-500 ${isDarkTheme ? 'dark-theme' : ''}`}>
      
      {/* Ambient Blurred Background & Vignette Wrapper (prevents vertical scale overflow) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Ambient Blurred Background (Light/Dark editorial design) */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 blur-[40px] scale-105"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200')`,
            opacity: isDarkTheme ? 0.12 : 0.06
          }}
        />
        {/* Vignette & Radial Glow (Dynamic Light/Dark) */}
        <div 
          className={`absolute inset-0 transition-all duration-700 ${
            isDarkTheme 
              ? 'bg-[radial-gradient(circle_at_center,rgba(26,26,26,0.35)_0%,rgba(14,14,14,0.95)_100%)]' 
              : 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5)_0%,rgba(242,240,235,0.9)_100%)]'
          }`} 
        />
      </div>

      {/* Full-Screen Page Container */}
      <main id="hero" className="main-reveal-mask relative z-10 w-full min-h-screen p-4 md:p-6 lg:p-8 flex flex-col items-center justify-start bg-brand-black transition-colors duration-500">
        {/* Responsive Bento Grid */}
        <div className="w-full max-w-none flex flex-col gap-6">
          <HeroBento 
            onOpenMenu={() => setIsMenuOpen(true)} 
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
            onOpenDetail={handleOpenDetail}
          />
          <BentoSections onOpenDetail={handleOpenDetail} />
        </div>
      </main>

      <Footer />

      <NavigationMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
      />

      <DetailOverlay 
        item={activeDetail} 
        onClose={() => setActiveDetail(null)} 
        isDarkTheme={isDarkTheme} 
      />
    </div>
  )
}

export default App
