import { useRef, useState } from 'react'
import { useLang } from '../../context/LanguageContext.jsx'
import { api } from '../../api/client.js'

// Single text input
export function Text({ label, value, onChange, type = 'text', dir }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      <input type={type} value={value ?? ''} dir={dir} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

// Multi-line input
export function Area({ label, value, onChange }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

// Image field: upload a file (returns a URL) or paste a URL manually, with preview.
export function ImageInput({ label, value, onChange, folder = 'images' }) {
  const { t } = useLang()
  const fileRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)

  const pick = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setError(false)
    try {
      const { url } = await api.upload(file, folder)
      onChange(url)
    } catch {
      setError(true)
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  return (
    <div className="image-input">
      {label && <label>{label}</label>}
      <div className="image-input-row">
        {value ? (
          <img src={value} alt="" className="image-input-preview" />
        ) : (
          <div className="image-input-preview empty">—</div>
        )}
        <div className="image-input-controls">
          <input type="text" value={value ?? ''} dir="ltr" placeholder="https://… / URL"
            onChange={(e) => onChange(e.target.value)} />
          <div className="image-input-actions">
            <button type="button" className="btn btn-ghost btn-sm" disabled={busy}
              onClick={() => fileRef.current?.click()}>
              {busy ? '…' : t('upload_image')}
            </button>
            {value && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange('')}>
                {t('remove_image')}
              </button>
            )}
          </div>
          {error && <p className="form-error">{t('upload_failed')}</p>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={pick} />
      </div>
    </div>
  )
}

// Bilingual (Arabic + English) pair for a { ar, en } object
export function Bi({ label, value, onChange, area }) {
  const { t } = useLang()
  const Field = area ? Area : Text
  return (
    <div className="bi-field">
      {label && <span className="bi-label">{label}</span>}
      <div className="grid grid-2">
        <Field label={t('dash_arabic')} value={value?.ar} onChange={(v) => onChange({ ...(value || {}), ar: v })} />
        <Field label={t('dash_english')} value={value?.en} onChange={(v) => onChange({ ...(value || {}), en: v })} />
      </div>
    </div>
  )
}
