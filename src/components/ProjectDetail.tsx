import { useEffect, useRef, useState } from 'react'
import './ProjectDetail.css'

const projectData = {
  title: '林间茶室',
  subtitle: 'Tea House Brand Identity',
  client: '林间茶室有限公司',
  year: '2024',
  role: '品牌设计师 · 视觉设计',
  duration: '3 个月',
  tags: ['品牌视觉', 'Logo设计', '包装设计', '视觉规范'],
  overview: '林间茶室是一家主打有机抹茶的小众茶室，创立于杭州，追求「一期一会」的日式茶道精神。品牌定位于 25-40 岁的都市文艺人群，强调自然、品质与生活仪式感。',
  challenge: '在竞争激烈的茶饮市场中，如何让一个新兴品牌既保持东方美学的底蕴，又具有现代感？团队希望在「古法」与「当代」之间找到独特的平衡点。',
  solution: '从「侘寂（Wabi-Sabi）」哲学出发，以枯山水的意境为核心视觉语言。以低饱和的抹茶绿为主色调，搭配大地色系。Logo 提取了茶道中「弧」的意象，字体采用现代衬线体与中文书法笔触的融合。整体视觉系统延伸到包装、空间导视与数字端。',
  awards: [
    '2024 站酷年度优秀品牌设计',
    'Behance Design Excellence Award',
  ],
  color: '#c9a96e',
}

const galleryImages = [
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&q=80&fit=crop',
  'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=900&q=80&fit=crop',
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return [ref, visible]
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useScrollReveal(delay)
  return (
    <div ref={ref} className={`reveal reveal--from-left ${visible ? 'reveal--visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

function FolderReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={`reveal reveal--folder ${visible ? 'reveal--visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default function ProjectDetail() {
  const [activeImg, setActiveImg] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [bodyVisible, setBodyVisible] = useState(false)

  useEffect(() => {
    const setup = (el: HTMLElement | null, setter: (v: boolean) => void) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect() } },
        { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
      )
      obs.observe(el)
      return obs
    }
    const obs1 = setup(headerRef.current, setHeaderVisible)
    const obs2 = setup(heroRef.current, setHeroVisible)
    const obs3 = setup(bodyRef.current, setBodyVisible)
    return () => { obs1?.disconnect(); obs2?.disconnect(); obs3?.disconnect() }
  }, [])

  return (
    <section className="detail" id="detail">
      <div className="container">
        <div
          ref={headerRef}
          className={`detail__header ${headerVisible ? 'detail__header--visible' : ''}`}
        >
          <div className="detail__header-left">
            <p className="tag-mono">项目详情</p>
            <h2 className="detail__title">{projectData.title}</h2>
            <p className="detail__subtitle">{projectData.subtitle}</p>
          </div>
          <div className="detail__meta">
            {[
              { label: '客户', value: projectData.client },
              { label: '年份', value: projectData.year },
              { label: '角色', value: projectData.role },
              { label: '周期', value: projectData.duration },
            ].map(item => (
              <div key={item.label} className="detail__meta-item">
                <span className="detail__meta-label">{item.label}</span>
                <span className="detail__meta-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={heroRef}
          className={`detail__hero ${heroVisible ? 'detail__hero--visible' : ''}`}
        >
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85&fit=crop"
            alt={projectData.title}
            className="detail__hero-img"
          />
          <div className="detail__tags">
            {projectData.tags.map(tag => (
              <span key={tag} className="detail__tag">{tag}</span>
            ))}
          </div>
        </div>

        <div
          ref={bodyRef}
          className={`detail__body ${bodyVisible ? 'detail__body--visible' : ''}`}
        >
          <div className="detail__col-left">
            <Reveal delay={0}>
              <div className="detail__block">
                <h3 className="detail__block-title">项目概述</h3>
                <p className="detail__block-text">{projectData.overview}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="detail__block">
                <h3 className="detail__block-title">面临挑战</h3>
                <p className="detail__block-text">{projectData.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="detail__block">
                <h3 className="detail__block-title">解决方案</h3>
                <p className="detail__block-text">{projectData.solution}</p>
              </div>
            </Reveal>
            {projectData.awards.length > 0 && (
              <Reveal delay={360}>
                <div className="detail__awards">
                  <h4 className="detail__awards-title">荣誉</h4>
                  <ul className="detail__awards-list">
                    {projectData.awards.map(award => (
                      <li key={award} className="detail__award-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          <div className="detail__col-right">
            <FolderReveal delay={80}>
              <div className="detail__gallery">
                <div className="detail__gallery-main">
                  <img src={galleryImages[activeImg]} alt="Gallery" className="detail__gallery-img" />
                </div>
                <div className="detail__gallery-thumbs">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      className={`detail__gallery-thumb ${i === activeImg ? 'detail__gallery-thumb--active' : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt={`Gallery ${i + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </FolderReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
