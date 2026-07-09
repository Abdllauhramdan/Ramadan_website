import { createContext, useContext } from 'react'
import content from '../content.js'

/*
 * Static site: all content lives in src/content.js and is bundled at build
 * time. Edit that file to change any text, image or project on the site.
 */
const ContentContext = createContext(content)

export function ContentProvider({ children }) {
  return <ContentContext.Provider value={{ content }}>{children}</ContentContext.Provider>
}

export const useContent = () => useContext(ContentContext)
