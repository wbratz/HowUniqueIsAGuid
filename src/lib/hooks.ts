import { useState, useEffect } from 'react'

/**
 * Hook to detect user's reduced motion preference
 * Returns true if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Check on initial render (SSR-safe)
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Returns animation props that respect reduced motion preference
 * Use this to wrap Framer Motion animation props
 */
export function useAnimationProps() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return {
    // Standard fade-in animation
    fadeIn: prefersReducedMotion
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
        },

    // Staggered animation for lists
    staggeredFadeIn: (index: number) =>
      prefersReducedMotion
        ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
        : {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: index * 0.05 },
          },

    // Get animation duration (returns 0 for reduced motion)
    getDuration: (normalDuration: number) => (prefersReducedMotion ? 0 : normalDuration),

    // Check if we should animate
    shouldAnimate: !prefersReducedMotion,
  }
}

/**
 * Trigger haptic feedback on supported devices
 * Respects reduced motion preference
 */
export function useHaptic() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const haptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
    if (prefersReducedMotion) return
    if (!('vibrate' in navigator)) return

    const duration = { light: 10, medium: 20, heavy: 40 }[style]
    navigator.vibrate(duration)
  }

  return haptic
}
