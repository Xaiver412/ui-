import { useEffect, useRef, useState } from 'react'
import { usePage } from '../context/PageContext'
import '../styles/showcase.css'

const projects = [
  {
    id: '01',
    title: 'JOJO的奇妙冒险 官网',
    subtitle: 'JOJO Official Website Redesign',
    year: '2026',
    tags: ['网页设计', '品牌官网', '日式风格'],
    description: '为《JOJO的奇妙冒险》重设计的日式官网，还原原作的独特美学与视觉张力，融合暗紫+金黄的标志性配色体系。',
    url: '/网页设计/jojo-index.html',
    color: '#D4337A',
    img: '/jojo-cover.png',
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

export default function WebDesign() {
  const { navigate } = usePage()

  return (
    <div className="showcase">
      <div className="showcase__topbar">
        <button onClick={() => navigate('home')} className="showcase__back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回作品集
        </button>
      </div>

      <Reveal>
        <header className="showcase__header">
          <p className="tag-mono">01 / 原创网页设计</p>
          <h1 className="showcase__title">网页设计</h1>
          <p className="showcase__subtitle">Web Design</p>
        </header>
      </Reveal>

      <div className="showcase__grid">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 80}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="showcase__card"
              style={{ '--card-color': project.color } as React.CSSProperties}
            >
              <div className="showcase__card-inner">
                <div className="showcase__card-image">
                  <img src={project.img} alt={project.title} />
                </div>
                <div className="showcase__card-content">
                  <div className="showcase__card-top">
                    <span className="showcase__card-num">{project.id}</span>
                    <span className="showcase__card-year">{project.year}</span>
                  </div>
                  <div className="showcase__card-body">
                    <h3 className="showcase__card-title">{project.title}</h3>
                    <p className="showcase__card-subtitle">{project.subtitle}</p>
                    <p className="showcase__card-desc">{project.description}</p>
                    <div className="showcase__card-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="showcase__card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="showcase__card-cta">
                    查看网页
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
