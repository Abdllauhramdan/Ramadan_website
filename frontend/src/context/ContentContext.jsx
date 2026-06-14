import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '../api/client.js'

/*
 * Public content is loaded from the Laravel API: GET /api/content.
 * The dashboard mutates content via authenticated endpoints and then calls
 * refresh() so the public pages reflect the latest data.
 */
const ContentContext = createContext()

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const data = await api.get('/content')
      setContent(data)
      setError(false)
    } catch (e) {
      console.error('Failed to load content', e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <ContentContext.Provider value={{ content, loading, error, refresh }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
