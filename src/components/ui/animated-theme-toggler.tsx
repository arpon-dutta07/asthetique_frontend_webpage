"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { flushSync } from "react-dom"

import { Moon, Sun } from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

type AnimatedThemeTogglerProps = {
  className?: string
  isDark?: boolean
  onToggleTheme?: () => void
}

export const AnimatedThemeToggler = ({ className, isDark, onToggleTheme }: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  // Uncontrolled state (default)
  const [localDarkMode, setLocalDarkMode] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  )

  // Determine active mode (controlled vs uncontrolled)
  const isControlled = isDark !== undefined
  const darkMode = isControlled ? isDark : localDarkMode

  useEffect(() => {
    if (isControlled) return
    const syncTheme = () =>
      setLocalDarkMode(document.documentElement.classList.contains("dark"))

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [isControlled])

  const onToggle = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    // Safe view transitions fallback check
    // @ts-ignore
    if (!document.startViewTransition) {
      if (isControlled && onToggleTheme) {
        onToggleTheme()
      } else {
        const toggled = !darkMode
        setLocalDarkMode(toggled)
        document.documentElement.classList.toggle("dark", toggled)
        localStorage.setItem("theme", toggled ? "dark" : "light")
      }
      return
    }

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const maxDistance = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    )

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        if (isControlled && onToggleTheme) {
          onToggleTheme()
        } else {
          const toggled = !darkMode
          setLocalDarkMode(toggled)
          document.documentElement.classList.toggle("dark", toggled)
          localStorage.setItem("theme", toggled ? "dark" : "light")
        }
      })
    })

    await transition.ready

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
    )
  }, [darkMode, isControlled, onToggleTheme])

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label="Toggle Theme"
      className={cn(
        "relative rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={darkMode ? "dark" : "light"}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {darkMode ? (
            <Moon className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
          ) : (
            <Sun className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
