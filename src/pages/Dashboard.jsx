import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useContent } from '../context/ContentContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import Icon from '../components/Icon.jsx'

/* ---------- small editing helpers ---------- */
function Text({ label, value, onChange, type = 'text', dir }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input type={type} value={value ?? ''} dir={dir} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
function Area({ label, value, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
// Bilingual pair (Arabic + English) for a { ar, en } object.
function Bi({ label, value, onChange, area }) {
  const { t } = useLang()
  const Field = area ? Area : Text
  return (
    <div className="bi-field">
      <span className="bi-label">{label}</span>
      <div className="grid grid-2">
        <Field label={t('dash_arabic')} value={value?.ar} onChange={(v) => onChange({ ...value, ar: v })} />
        <Field label={t('dash_english')} value={value?.en} onChange={(v) => onChange({ ...value, en: v })} />
      </div>
    </div>
  )
}

const SECTIONS = [
  { id: 'site', icon: 'pin' },
  { id: 'hero', icon: 'spark' },
  { id: 'about', icon: 'users' },
  { id: 'stats', icon: 'chart' },
  { id: 'services', icon: 'ruler' },
  { id: 'projects', icon: 'brush' },
  { id: 'whyus', icon: 'shield' },
  { id: 'account', icon: 'shield' },
]
const uid = () => Math.random().toString(36).slice(2, 9)

/* ---------- login gate ---------- */
function Login() {
  const { login } = useAuth()
  const { t } = useLang()
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!login(pass)) setError(true)
  }
  return (
    <div className="login-wrap">
      <form className="card login-card" onSubmit={submit}>
        <img src="./logo.svg" alt="RAMADAN" className="login-logo" />
        <h2>{t('dash_login_title')}</h2>
        <div className="field">
          <label>{t('dash_password')}</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setError(false) }}
            autoFocus
          />
        </div>
        {error && <p className="form-error">{t('dash_wrong_pass')}</p>}
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          {t('dash_login')}
        </button>
        <Link to="/" className="back-link">{t('back_home')}</Link>
      </form>
    </div>
  )
}

/* ---------- main dashboard ---------- */
export default function Dashboard() {
  const { isAuthed, logout, changePassword } = useAuth()
  const { content, saveContent, resetContent, hasLocalEdits } = useContent()
  const { t, toggleLang, pick } = useLang()
  const { theme, toggleTheme } = useTheme()
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(content)))
  const [active, setActive] = useState('site')
  const [savedMsg, setSavedMsg] = useState(false)
  const fileRef = useRef(null)

  if (!isAuthed) return <Login />

  /* immutable updates on the draft */
  const setPath = (mutator) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      mutator(next)
      return next
    })
  }
  const updateList = (key, index, patch) =>
    setPath((d) => { d[key][index] = { ...d[key][index], ...patch } })
  const addItem = (key, item) => setPath((d) => { d[key] = [...(d[key] || []), item] })
  const removeItem = (key, index) => setPath((d) => { d[key].splice(index, 1) })

  const save = () => {
    saveContent(draft)
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2000)
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.json'
    a.click()
    URL.revokeObjectURL(url)
  }
  const importJson = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        setDraft(data)
        saveContent(data)
      } catch {
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }
  const reset = async () => {
    if (!confirm(t('dash_reset_confirm'))) return
    await resetContent()
    window.location.reload()
  }

  return (
    <div className="dash">
      {/* top bar */}
      <header className="dash-top">
        <div className="dash-top-left">
          <Link to="/" className="brand">
            <img src={draft.site.logo} alt="RAMADAN" className="brand-logo" />
            <strong>{t('dash_title')}</strong>
          </Link>
          {hasLocalEdits && <span className="local-badge">● {t('dash_local_badge')}</span>}
        </div>
        <div className="dash-top-actions">
          <button className="icon-btn" onClick={toggleTheme} title="theme">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>
          <button className="lang-btn" onClick={toggleLang}>{t('switch_lang')}</button>
          <button className="btn btn-ghost" onClick={logout}>{t('dash_logout')}</button>
        </div>
      </header>

      <div className="dash-body">
        {/* sidebar */}
        <aside className="dash-side">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`side-link ${active === s.id ? 'active' : ''}`}
              onClick={() => setActive(s.id)}
            >
              <Icon name={s.icon} size={18} /> {t(`sec_${s.id}`)}
            </button>
          ))}
        </aside>

        {/* content */}
        <main className="dash-main">
          <p className="dash-intro">{t('dash_intro')}</p>

          {/* ---- SITE ---- */}
          {active === 'site' && (
            <section className="panel">
              <h2>{t('sec_site')}</h2>
              <Bi label={t('your_name')} value={draft.site.name} onChange={(v) => setPath((d) => { d.site.name = v })} />
              <Bi label="Tagline" value={draft.site.tagline} onChange={(v) => setPath((d) => { d.site.tagline = v })} />
              <Text label="Logo (path/URL)" value={draft.site.logo} dir="ltr" onChange={(v) => setPath((d) => { d.site.logo = v })} />
              <div className="grid grid-2">
                <Text label={t('phone')} value={draft.site.phone} dir="ltr" onChange={(v) => setPath((d) => { d.site.phone = v })} />
                <Text label="WhatsApp (digits)" value={draft.site.whatsapp} dir="ltr" onChange={(v) => setPath((d) => { d.site.whatsapp = v })} />
              </div>
              <Text label={t('email')} value={draft.site.email} dir="ltr" onChange={(v) => setPath((d) => { d.site.email = v })} />
              <Bi label={t('address')} value={draft.site.address} onChange={(v) => setPath((d) => { d.site.address = v })} />
              <Bi label={t('working_hours')} value={draft.site.workingHours} onChange={(v) => setPath((d) => { d.site.workingHours = v })} />
              <h3 className="sub-h">{t('follow_us')}</h3>
              <div className="grid grid-2">
                <Text label="Facebook" value={draft.site.social?.facebook} dir="ltr" onChange={(v) => setPath((d) => { d.site.social.facebook = v })} />
                <Text label="Instagram" value={draft.site.social?.instagram} dir="ltr" onChange={(v) => setPath((d) => { d.site.social.instagram = v })} />
                <Text label="LinkedIn" value={draft.site.social?.linkedin} dir="ltr" onChange={(v) => setPath((d) => { d.site.social.linkedin = v })} />
                <Text label="X" value={draft.site.social?.x} dir="ltr" onChange={(v) => setPath((d) => { d.site.social.x = v })} />
              </div>
            </section>
          )}

          {/* ---- HERO ---- */}
          {active === 'hero' && (
            <section className="panel">
              <h2>{t('sec_hero')}</h2>
              <Bi label="Badge" value={draft.hero.badge} onChange={(v) => setPath((d) => { d.hero.badge = v })} />
              <Bi label="Title" value={draft.hero.title} onChange={(v) => setPath((d) => { d.hero.title = v })} />
              <Bi label="Subtitle" area value={draft.hero.subtitle} onChange={(v) => setPath((d) => { d.hero.subtitle = v })} />
              <Text label="Background image (URL)" value={draft.hero.image} dir="ltr" onChange={(v) => setPath((d) => { d.hero.image = v })} />
              <div className="grid grid-2">
                <Bi label="Primary button" value={draft.hero.ctaPrimary} onChange={(v) => setPath((d) => { d.hero.ctaPrimary = v })} />
                <Bi label="Secondary button" value={draft.hero.ctaSecondary} onChange={(v) => setPath((d) => { d.hero.ctaSecondary = v })} />
              </div>
            </section>
          )}

          {/* ---- ABOUT ---- */}
          {active === 'about' && (
            <section className="panel">
              <h2>{t('sec_about')}</h2>
              <Bi label="Title" value={draft.about.title} onChange={(v) => setPath((d) => { d.about.title = v })} />
              <Bi label="Lead" value={draft.about.lead} onChange={(v) => setPath((d) => { d.about.lead = v })} />
              <Bi label="Body" area value={draft.about.body} onChange={(v) => setPath((d) => { d.about.body = v })} />
              <Text label="Image (URL)" value={draft.about.image} dir="ltr" onChange={(v) => setPath((d) => { d.about.image = v })} />
              <h3 className="sub-h">Points</h3>
              {draft.about.points?.map((p, i) => (
                <div key={p.id} className="list-item">
                  <Bi label={`#${i + 1}`} value={p} onChange={(v) => setPath((d) => { d.about.points[i] = { ...d.about.points[i], ...v } })} />
                  <button className="del-btn" onClick={() => setPath((d) => { d.about.points.splice(i, 1) })}>
                    <Icon name="check" size={16} /> {t('dash_delete')}
                  </button>
                </div>
              ))}
              <button className="btn btn-ghost" onClick={() => setPath((d) => { d.about.points = [...(d.about.points || []), { id: uid(), ar: '', en: '' }] })}>
                + {t('dash_add')}
              </button>
            </section>
          )}

          {/* ---- STATS ---- */}
          {active === 'stats' && (
            <section className="panel">
              <h2>{t('sec_stats')}</h2>
              {draft.stats?.map((s, i) => (
                <div key={s.id} className="list-item">
                  <Text label="Value" value={s.value} onChange={(v) => updateList('stats', i, { value: v })} />
                  <Bi label="Label" value={s.label} onChange={(v) => updateList('stats', i, { label: v })} />
                  <button className="del-btn" onClick={() => removeItem('stats', i)}>{t('dash_delete')}</button>
                </div>
              ))}
              <button className="btn btn-ghost" onClick={() => addItem('stats', { id: uid(), value: '', label: { ar: '', en: '' } })}>
                + {t('dash_add')}
              </button>
            </section>
          )}

          {/* ---- SERVICES ---- */}
          {active === 'services' && (
            <section className="panel">
              <h2>{t('sec_services')}</h2>
              {draft.services?.map((s, i) => (
                <div key={s.id} className="list-item">
                  <Text label="Icon (ruler/chart/brush/shield/clock/users/spark)" value={s.icon} dir="ltr" onChange={(v) => updateList('services', i, { icon: v })} />
                  <Bi label="Title" value={s.title} onChange={(v) => updateList('services', i, { title: v })} />
                  <Bi label="Description" area value={s.description} onChange={(v) => updateList('services', i, { description: v })} />
                  <button className="del-btn" onClick={() => removeItem('services', i)}>{t('dash_delete')}</button>
                </div>
              ))}
              <button className="btn btn-ghost" onClick={() => addItem('services', { id: uid(), icon: 'ruler', title: { ar: '', en: '' }, description: { ar: '', en: '' } })}>
                + {t('dash_add')}
              </button>
            </section>
          )}

          {/* ---- PROJECTS ---- */}
          {active === 'projects' && (
            <section className="panel">
              <h2>{t('sec_projects')}</h2>
              {draft.projects?.map((p, i) => (
                <div key={p.id} className="list-item project-edit">
                  {p.image && <img src={p.image} alt="" className="edit-thumb" />}
                  <Bi label="Title" value={p.title} onChange={(v) => updateList('projects', i, { title: v })} />
                  <div className="grid grid-2">
                    <div className="field">
                      <label>Category</label>
                      <select value={p.category} onChange={(e) => updateList('projects', i, { category: e.target.value })}>
                        <option value="buildings">{t('cat_buildings')}</option>
                        <option value="decor">{t('cat_decor')}</option>
                        <option value="designs">{t('cat_designs')}</option>
                      </select>
                    </div>
                    <Text label="Year" value={p.year} dir="ltr" onChange={(v) => updateList('projects', i, { year: v })} />
                  </div>
                  <Text label="Image (URL)" value={p.image} dir="ltr" onChange={(v) => updateList('projects', i, { image: v })} />
                  <Bi label={t('address')} value={p.location} onChange={(v) => updateList('projects', i, { location: v })} />
                  <Bi label="Description" area value={p.description} onChange={(v) => updateList('projects', i, { description: v })} />
                  <button className="del-btn" onClick={() => removeItem('projects', i)}>{t('dash_delete')}</button>
                </div>
              ))}
              <button className="btn btn-ghost" onClick={() => addItem('projects', { id: uid(), title: { ar: '', en: '' }, category: 'buildings', image: '', year: '', location: { ar: '', en: '' }, description: { ar: '', en: '' } })}>
                + {t('dash_add')}
              </button>
            </section>
          )}

          {/* ---- WHY US ---- */}
          {active === 'whyus' && (
            <section className="panel">
              <h2>{t('sec_whyus')}</h2>
              {draft.whyUs?.map((w, i) => (
                <div key={w.id} className="list-item">
                  <Text label="Icon" value={w.icon} dir="ltr" onChange={(v) => updateList('whyUs', i, { icon: v })} />
                  <Bi label="Title" value={w.title} onChange={(v) => updateList('whyUs', i, { title: v })} />
                  <Bi label="Text" area value={w.text} onChange={(v) => updateList('whyUs', i, { text: v })} />
                  <button className="del-btn" onClick={() => removeItem('whyUs', i)}>{t('dash_delete')}</button>
                </div>
              ))}
              <button className="btn btn-ghost" onClick={() => addItem('whyUs', { id: uid(), icon: 'shield', title: { ar: '', en: '' }, text: { ar: '', en: '' } })}>
                + {t('dash_add')}
              </button>
            </section>
          )}

          {/* ---- ACCOUNT ---- */}
          {active === 'account' && <AccountPanel changePassword={changePassword} />}
        </main>
      </div>

      {/* sticky action bar */}
      <div className="dash-actions">
        <button className="btn btn-primary" onClick={save}>
          {savedMsg ? t('dash_saved') : t('dash_save')}
        </button>
        <button className="btn btn-outline" onClick={exportJson}>
          <Icon name="arrow" size={16} style={{ transform: 'rotate(90deg)' }} /> {t('dash_export')}
        </button>
        <button className="btn btn-ghost" onClick={() => fileRef.current?.click()}>{t('dash_import')}</button>
        <input ref={fileRef} type="file" accept="application/json" hidden onChange={importJson} />
        {hasLocalEdits && <button className="btn btn-ghost danger" onClick={reset}>{t('dash_reset')}</button>}
      </div>
    </div>
  )
}

function AccountPanel({ changePassword }) {
  const { t } = useLang()
  const [oldP, setOldP] = useState('')
  const [newP, setNewP] = useState('')
  const [msg, setMsg] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    if (changePassword(oldP, newP) && newP) {
      setMsg({ ok: true, text: t('dash_pass_changed') })
      setOldP(''); setNewP('')
    } else {
      setMsg({ ok: false, text: t('dash_pass_error') })
    }
  }
  return (
    <section className="panel">
      <h2>{t('sec_account')}</h2>
      <form onSubmit={submit} style={{ maxWidth: 420 }}>
        <Text label={t('dash_old_pass')} type="password" value={oldP} onChange={setOldP} />
        <Text label={t('dash_new_pass')} type="password" value={newP} onChange={setNewP} />
        {msg && <p className={msg.ok ? 'form-ok' : 'form-error'}>{msg.text}</p>}
        <button className="btn btn-primary">{t('dash_change_pass')}</button>
      </form>
    </section>
  )
}
