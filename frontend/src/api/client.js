// Fetch-based API client for the Laravel backend.
// The API wraps every response in { status, message, data }; this client
// unwraps and returns the inner `data` so callers work with plain payloads.
const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')
const TOKEN_KEY = 'ramadan_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

function unwrap(body) {
  // Standard envelope { status, message, data } → return data
  if (body && typeof body === 'object' && 'status' in body && 'data' in body) {
    return body.data
  }
  return body
}

async function parse(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

async function request(method, path, body, auth = false) {
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  const data = await parse(res)

  if (!res.ok) {
    const error = new Error(data?.message || `Request failed (${res.status})`)
    error.status = res.status
    error.data = data
    throw error
  }
  return unwrap(data)
}

export const api = {
  get: (path, auth = false) => request('GET', path, undefined, auth),
  post: (path, body, auth = false) => request('POST', path, body, auth),
  put: (path, body, auth = false) => request('PUT', path, body, auth),
  del: (path, auth = false) => request('DELETE', path, undefined, auth),

  // Multipart image upload → returns { url }
  async upload(file, folder = 'images') {
    const form = new FormData()
    form.append('image', file)
    form.append('folder', folder)
    const headers = { Accept: 'application/json' }
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(`${BASE}/uploads`, { method: 'POST', headers, body: form })
    const data = await parse(res)
    if (!res.ok) {
      const error = new Error(data?.message || `Upload failed (${res.status})`)
      error.status = res.status
      error.data = data
      throw error
    }
    return unwrap(data)
  },
}
