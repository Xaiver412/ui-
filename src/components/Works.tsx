import { useEffect, useRef, useState } from 'react'
import { usePage } from '../context/PageContext'
import './Works.css'

const categories = [
  {
    id: '01',
    title: '原创网页设计',
    subtitle: 'Web Design',
    description: '品牌官网、电商平台、SaaS 产品界面，聚焦体验与视觉的统一。',
    tag: '网页 / App / 品牌站',
    color: '#c4883a',
    bgColor: 'rgba(196, 136, 58, 0.06)',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&fit=crop',
    page: 'web-design' as const,
  },
  {
    id: '02',
    title: '游戏界面设计',
    subtitle: 'Game UI Design',
    description: '游戏 HUD、关卡界面、角色面板，用视觉语言讲述游戏故事。',
    tag: '3A / 手游 / 独立游戏',
    color: '#e8623a',
    bgColor: 'rgba(232, 98, 58, 0.06)',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80&fit=crop',
    page: 'game-ui' as const,
  },
  {
    id: '03',
    title: '界面动效设计',
    subtitle: 'Motion Design',
    description: '转场、反馈、微交互，用动效赋予界面生命力与节奏感。',
    tag: 'UI 动效 / 插页动画 / 图标动效',
    color: '#6b9b73',
    bgColor: 'rgba(107, 155, 115, 0.06)',
    image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=900&q=80&fit=crop',
    page: 'motion-design' as const,
  },
]

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
      { threshold: 0.1 }
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

export default function Works() {
  const { navigate } = usePage()
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="works" id="works">
      <div className="container">
        <div
          ref={headerRef}
          className={`works__header ${headerVisible ? 'works__header--visible' : ''}`}
        >
          <div className="works__header-left">
            <span className="works__header-label">Portfolio</span>
          </div>
          <div className="works__header-right">
            <h2 className="works__heading">
              我的<br />
              <em>作品</em>
            </h2>
            <p className="works__heading-desc">
              从网页到游戏界面，从静态视觉到动态体验，这里记录着我的设计探索之路。
            </p>
          </div>
        </div>

        <div className="works__categories">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 120}>
              <button
                className="works__category-card"
                onClick={() => navigate(cat.page)}
                style={
                  {
                    '--cat-color': cat.color,
                    '--cat-bg': cat.bgColor,
                  } as React.CSSProperties
                }
              >
                <div className="works__cat-image">
                  <img src={cat.image} alt={cat.title} />
                </div>
                <div className="works__cat-content">
                  <div className="works__cat-top">
                    <span className="works__cat-num">{cat.id}</span>
                    <span className="works__cat-tag">{cat.tag}</span>
                  </div>
                  <div className="works__cat-body">
                    <h3 className="works__cat-title">{cat.title}</h3>
                    <p className="works__cat-subtitle">{cat.subtitle}</p>
                    <p className="works__cat-desc">{cat.description}</p>
                  </div>
                  <div className="works__cat-cta">
                    进入查看
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
