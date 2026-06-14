import { useState, useEffect, useCallback } from 'react'
import { api } from '../../api/client.js'

// Load + save a singleton section (settings, hero, about, contact-settings).
export function useSingleton(path) {
  const [draft, setDraft] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let active = true
    api
      .get(path, true)
      .then((d) => active && setDraft(d))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [path])

  const setField = (key, value) => setDraft((d) => ({ ...d, [key]: value }))

  const save = async () => {
    setSaving(true)
    try {
      const updated = await api.put(path, draft, true)
      setDraft(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  return { draft, setField, loading, saving, saved, save }
}

// Load + CRUD a collection section (services, projects, stats, why-us).
export function useCollection(path) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)

  useEffect(() => {
    let active = true
    api
      .get(path, true)
      .then((d) => active && setItems(d))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [path])

  // Local-only edit of one item's field
  const patch = useCallback((id, changes) => {
    setItems((list) => list.map((it) => (it.id === id ? { ...it, ...changes } : it)))
  }, [])

  const saveItem = async (item) => {
    setSavingId(item.id)
    try {
      const updated = await api.put(`${path}/${item.id}`, item, true)
      setItems((list) => list.map((it) => (it.id === item.id ? updated : it)))
    } finally {
      setSavingId(null)
    }
  }

  const add = async (template) => {
    const created = await api.post(path, template, true)
    setItems((list) => [...list, created])
  }

  const remove = async (id) => {
    await api.del(`${path}/${id}`, true)
    setItems((list) => list.filter((it) => it.id !== id))
  }

  return { items, loading, savingId, patch, saveItem, add, remove }
}
