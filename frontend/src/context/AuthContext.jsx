import { createContext, useContext, useEffect, useState } from 'react'
import { api, getToken, setToken, clearToken } from '../api/client.js'

/*
 * Real authentication backed by the Laravel API (Sanctum tokens).
 * The token is stored in localStorage and sent as a Bearer header.
 */
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  // On load, if a token exists, verify it via /me.
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setReady(true)
      return
    }
    api
      .get('/me', true)
      .then((u) => setUser(u))
      .catch(() => clearToken())
      .finally(() => setReady(true))
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password })
    setToken(res.token)
    setUser(res.user)
    return res.user
  }

  const logout = async () => {
    try {
      await api.post('/logout', {}, true)
    } catch {
      /* ignore network/401 on logout */
    }
    clearToken()
    setUser(null)
  }

  const changePassword = (current_password, new_password) =>
    api.post('/change-password', { current_password, new_password }, true)

  return (
    <AuthContext.Provider
      value={{ user, isAuthed: !!user, ready, login, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
