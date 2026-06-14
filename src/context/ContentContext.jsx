import { createContext, useContext, useEffect, useState, useCallback } from 'react'

/*
 * Content flow (static-friendly):
 *  - Public site loads /content.json (the published file on the host).
 *  - If the admin has made local edits, an override is kept in localStorage
 *    and takes precedence while editing in this browser.
 *  - The dashboard exports a content.json that the owner re-uploads to the
 *    host root to publish changes for everyone.
 */
const ContentContext = createContext()
const STORAGE_KEY = 'ramadan_content_override'

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasLocalEdits, setHasLocalEdits] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      const override = localStorage.getItem(STORAGE_KEY)
      if (override) {
        try {
          if (active) {
            setContent(JSON.parse(override))
            setHasLocalEdits(true)
            setLoading(false)
            return
          }
        } catch {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}content.json`, {
          cache: 'no-store',
        })
        const data = await res.json()
        if (active) setContent(data)
      } catch (e) {
        console.error('Failed to load content.json', e)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  // Save edited content locally (used by the dashboard)
  const saveContent = useCallback((next) => {
    setContent(next)
    setHasLocalEdits(true)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  // Drop local edits and reload the published file
  const resetContent = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY)
    setHasLocalEdits(false)
    const res = await fetch(`${import.meta.env.BASE_URL}content.json`, {
      cache: 'no-store',
    })
    setContent(await res.json())
  }, [])

  return (
    <ContentContext.Provider
      value={{ content, loading, hasLocalEdits, saveContent, resetContent }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
