import { useEffect, useRef } from 'react'

export default function ParallaxStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight
    let raf = 0

    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.6 + 0.4,
    }))

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const root = document.documentElement
      const x = getComputedStyle(root).getPropertyValue('--x') || '50%'
      const y = getComputedStyle(root).getPropertyValue('--y') || '50%'
      canvas.style.backgroundImage = `radial-gradient(600px circle at ${x} ${y}, rgba(124,58,237,0.08), transparent 40%)`

      for (const s of stars) {
        const size = s.z * 1.2
        ctx.fillStyle = `rgba(255,255,255,${0.3 + s.z * 0.7})`
        ctx.fillRect(s.x, s.y, size, size)
        s.y += s.z * 0.1
        if (s.y > height) { s.y = 0; s.x = Math.random() * width }
      }
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const root = document.documentElement
      root.style.setProperty('--x', `${e.clientX}px`)
      root.style.setProperty('--y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden />
}
