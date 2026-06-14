import { createContext, useContext, useEffect, useState } from 'react'

/*
 * Lightweight client-side auth for the content dashboard.
 * NOTE: This is NOT real security — it only gates the local editing UI.
 * Nothing sensitive is exposed; published content is the exported JSON file.
 * Change the default password below (or from the dashboard) before going live.
 */
const AuthContext = createContext()
const SESSION_KEY = 'ramadan_admin_session'
const PASS_KEY = 'ramadan_admin_pass'
const DEFAULT_PASSWORD = 'ramadan2026'

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  )

  useEffect(() => {
    if (!localStorage.getItem(PASS_KEY)) {
      localStorage.setItem(PASS_KEY, DEFAULT_PASSWORD)
    }
  }, [])

  const login = (password) => {
    const current = localStorage.getItem(PASS_KEY) || DEFAULT_PASSWORD
    if (password === current) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setIsAuthed(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthed(false)
  }

  const changePassword = (oldPass, newPass) => {
    const current = localStorage.getItem(PASS_KEY) || DEFAULT_PASSWORD
    if (oldPass !== current) return false
    localStorage.setItem(PASS_KEY, newPass)
    return true
  }

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
