import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import Contact from './components/Contact'
import WebDesign from './pages/WebDesign'
import GameUI from './pages/GameUI'
import MotionDesign from './pages/MotionDesign'
import { PageProvider, usePage } from './context/PageContext'

function AppContent() {
  const { page } = usePage()

  if (page !== 'home') {
    return (
      <>
        {page === 'web-design' && <WebDesign />}
        {page === 'game-ui' && <GameUI />}
        {page === 'motion-design' && <MotionDesign />}
      </>
    )
  }

  return (
    <main>
      <Hero />
      <About />
      <Works />
      <Contact />
    </main>
  )
}

function App() {
  return (
    <PageProvider>
      <AppContent />
    </PageProvider>
  )
}

export default App
