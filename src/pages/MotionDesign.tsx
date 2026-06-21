import { useEffect, useRef, useState } from 'react'
import { usePage } from '../context/PageContext'
import '../styles/showcase.css'

const videos = [
  { id: '01', title: '动效 01', duration: '', videoUrl: '/videos/动效1.mp4' },
  { id: '02', title: '动效 02', duration: '', videoUrl: '/videos/动效2.mp4' },
  { id: '03', title: '动效 03', duration: '', videoUrl: '/videos/动效3.mp4' },
  { id: '04', title: '动效 04', duration: '', videoUrl: '/videos/动效4.mp4' },
  { id: '05', title: '动效 05', duration: '', videoUrl: '/videos/动效5.mp4' },
  { id: '06', title: '动效 06', duration: '', videoUrl: '/videos/动效6.mp4' },
  { id: '07', title: '动效 07', duration: '', videoUrl: '/videos/动效7.mp4' },
  { id: '08', title: '动效 08', duration: '', videoUrl: '/videos/动效8.mp4' },
  { id: '09', title: '动效 09', duration: '', videoUrl: '/videos/动效9.mp4' },
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

export default function MotionDesign() {
  const { navigate } = usePage()
  const [lightbox, setLightbox] = useState<number | null>(null)

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
          <p className="tag-mono">03 / 界面动效设计</p>
          <h1 className="showcase__title">界面动效</h1>
          <p className="showcase__subtitle">Motion Design</p>
        </header>
      </Reveal>

      <Reveal>
        <div className="motion__grid">
          {videos.map((video, i) => (
            <button
              key={video.id}
              className="motion__card"
              onClick={() => setLightbox(i)}
            >
              <div className="motion__card-thumb">
                <video
                  src={video.videoUrl}
                  muted
                  preload="auto"
                  playsInline
                  className="motion__card-thumb-video"
                />
                <div className="motion__card-play">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="motion__card-info">
                <span className="motion__card-num">{video.id}</span>
                <span className="motion__card-title">{video.title}</span>
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      {lightbox !== null && (
        <div className="motion__lightbox" onClick={() => setLightbox(null)}>
          <div className="motion__lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="motion__lightbox-close" onClick={() => setLightbox(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <video
              src={videos[lightbox].videoUrl}
              controls
              autoPlay
              className="motion__lightbox-video"
            />
          </div>
        </div>
      )}
    </div>
  )
}
