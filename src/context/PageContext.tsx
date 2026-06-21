import { createContext, useContext, useState } from 'react'

export type Page = 'home' | 'web-design' | 'game-ui' | 'motion-design'

interface PageContextValue {
  page: Page
  navigate: (page: Page) => void
}

const PageContext = createContext<PageContextValue>({
  page: 'home',
  navigate: () => {},
})

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageContext.Provider value={{ page, navigate }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePage() {
  return useContext(PageContext)
}
