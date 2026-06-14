import { useLang } from '../../context/LanguageContext.jsx'

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
