import { useEffect, useRef, type CSSProperties } from 'react'
import lottie, { type AnimationItem } from 'lottie-web'
import styles from './AnimatedIcon.module.css'

type Props = {
  src: string | object
  trigger?: 'hover' | 'loop'
  size?: number
}

export const AnimatedIcon = ({ src, trigger = 'loop', size = 32 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: trigger === 'loop',
      autoplay: trigger === 'loop',
      animationData: src,
    })
    animRef.current = anim

    const handleEnter = () => anim.play()
    const handleLeave = () => anim.stop()

    if (trigger === 'hover') {
      container.addEventListener('mouseenter', handleEnter)
      container.addEventListener('mouseleave', handleLeave)
    }

    return () => {
      if (trigger === 'hover') {
        container.removeEventListener('mouseenter', handleEnter)
        container.removeEventListener('mouseleave', handleLeave)
      }
      anim.destroy()
    }
  }, [src, trigger])

  const dynamicStyle = {
    '--icon-size': `${size}px`,
    '--icon-cursor': trigger === 'hover' ? 'pointer' : 'default',
  } as CSSProperties

  return (
    <div
      ref={containerRef}
      className={styles.icon}
      style={dynamicStyle}
    />
  )
}
