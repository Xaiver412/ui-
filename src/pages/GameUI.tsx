import { useEffect, useRef, useState } from 'react'
import { usePage } from '../context/PageContext'
import '../styles/showcase.css'

function useScrollReveal(delay = 0): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return [ref, visible]
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useScrollReveal(delay)
  return (
    <div ref={ref} className={`reveal reveal--from-bottom ${visible ? 'reveal--visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default function GameUI() {
  const { navigate } = usePage()

  return (
    <div className="showcase">
      {/* Back nav */}
      <div className="showcase__topbar">
        <button onClick={() => navigate('home')} className="showcase__back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回作品集
        </button>
      </div>

      {/* Header */}
      <Reveal>
        <header className="showcase__header">
          <p className="tag-mono">02 / 游戏界面设计</p>
          <h1 className="showcase__title">游戏界面设计</h1>
          <p className="showcase__subtitle">Game UI Design</p>
        </header>
      </Reveal>

      {/* Long panoramic image */}
      <Reveal>
        <div className="gameui__panorama">
          <p className="tag-mono gameui__panorama-label">长图展示 · 上下滚动查看全部</p>
          <div className="gameui__panorama-scroll">
            <img
              src="/gameui-cover.jpg"
              alt="Game UI Long Image"
              className="gameui__panorama-img"
            />
          </div>
        </div>
      </Reveal>
    </div>
  )
}
