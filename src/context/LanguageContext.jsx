import { createContext, useContext, useEffect, useState } from 'react'
import { ui } from '../i18n/translations.js'

const LanguageContext = createContext()
const STORAGE_KEY = 'ramadan_lang'

function getInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'ar' || saved === 'en') return saved
  return 'ar' // default language: Arabic
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', dir)
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'))

  // Static UI string translator
  const t = (key) => ui[lang]?.[key] ?? ui.en[key] ?? key

  // Pick the right value from a { ar, en } content object
  const pick = (obj) => {
    if (obj == null) return ''
    if (typeof obj === 'string') return obj
    return obj[lang] ?? obj.en ?? obj.ar ?? ''
  }

  const isRTL = lang === 'ar'

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, pick, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
