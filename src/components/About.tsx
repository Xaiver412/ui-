import { useEffect, useRef, useState } from 'react'
import './About.css'

const stats = [
  { value: '2+', label: '年学习积累' },
  { value: '8+', label: '课程作品' },
  { value: '3', label: '设计方向' },
]

const categories = [
  { num: '01', label: '网页设计', en: 'Web Design' },
  { num: '02', label: '游戏UI', en: 'Game UI' },
  { num: '03', label: '界面动效', en: 'Motion Design' },
]

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`reveal reveal--from-bottom ${visible ? 'reveal--visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__single-col">
          <RevealSection delay={0}>
            <p className="tag-mono">关于我</p>
          </RevealSection>

          <RevealSection delay={80}>
            <div className="about__identity">
              <h2 className="about__heading">
                <em className="about__heading-light">做有意图的</em>
                <br />
                <span className="about__heading-bold">设计</span>
              </h2>
              <p className="about__sub">叶晓璐 · 大三 · 界面与动效方向</p>
            </div>
          </RevealSection>

          <RevealSection delay={160}>
            <div className="about__bio">
              <p>
                杭州电子科技大学大三学生，数字媒体技术专业。专注网页设计、游戏UI、界面动效三大方向——兼顾视觉美感与交互逻辑，注重静态界面与动态体验的统一。
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={240}>
            <div className="about__stats">
              {stats.map(stat => (
                <div key={stat.label} className="about__stat">
                  <span className="about__stat-value">{stat.value}</span>
                  <span className="about__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={320}>
            <div className="about__categories">
              {categories.map(cat => (
                <div key={cat.num} className="about__cat-item">
                  <span className="about__cat-num">{cat.num}</span>
                  <span className="about__cat-label">{cat.label}</span>
                  <span className="about__cat-en">{cat.en}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
