import { useState, useEffect } from 'react'
import './Hero.css'

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 60)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      setScrollProgress(Math.min(scrollY / docHeight, 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img src="/hero-cover.png" alt="" className="hero__bg-img" />
        <div className="hero__bg-overlay" />
      </div>
      {/* Nav */}
      <nav className={`hero__nav ${scrolled ? 'hero__nav--scrolled' : ''}`}>
        <div className="hero__nav-inner">
          <div className="hero__nav-left">
            <a href="#hero" className="hero__logo">WILDLIN</a>
            <span className="hero__nav-divider" />
            <span className="hero__nav-tagline">UI 设计师</span>
          </div>
          <div className="hero__nav-right">
            <ul className="hero__nav-links">
              <li><a href="#about" className="hero__nav-link">关于</a></li>
              <li><a href="#works" className="hero__nav-link">作品</a></li>
              <li><a href="#detail" className="hero__nav-link">详情</a></li>
            </ul>
            <a href="#contact" className="hero__nav-cta">联系</a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero__content">
        <div className="hero__content-inner">
          <div className="hero__text-block">
            <p className="hero__collection-label">
              <span className="hero__collection-line" />
              视觉设计作品集
            </p>

            <div className="hero__divider" />

            <p className="hero__desc">
              以森系美学重塑数字体验，将自然的宁静融入现代界面设计。
            </p>

            <div className="hero__ctas">
              <a href="#works" className="hero__cta-primary">
                查看作品
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#contact" className="hero__cta-ghost">
                联系我
              </a>
            </div>
          </div>

          <div className="hero__side-info">
            <span className="hero__location">
              <span className="hero__location-dot" />
              上海 · 中国
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-track">
          <div
            className="hero__scroll-progress"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className="hero__scroll-label">滚动</span>
        <span className="hero__scroll-num">
          {Math.floor(scrollProgress * 100).toString().padStart(2, '0')} / 100
        </span>
      </div>
    </section>
  )
}
