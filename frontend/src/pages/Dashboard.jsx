import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import Icon from '../components/Icon.jsx'
import { Text, Bi, ImageInput, MultiImageInput } from '../components/dashboard/fields.jsx'
import { useSingleton, useCollection } from '../components/dashboard/hooks.js'

const SECTIONS = [
  { id: 'site', icon: 'pin' },
  { id: 'hero', icon: 'spark' },
  { id: 'about', icon: 'users' },
  { id: 'contact', icon: 'mail' },
  { id: 'stats', icon: 'chart' },
  { id: 'services', icon: 'ruler' },
  { id: 'projects', icon: 'brush' },
  { id: 'whyus', icon: 'shield' },
  { id: 'messages', icon: 'mail' },
  { id: 'account', icon: 'shield' },
]

/* ---------- reusable save button ---------- */
function SaveBar({ onSave, saving, saved }) {
  const { t } = useLang()
  return (
    <div className="panel-actions">
      <button className="btn btn-primary" onClick={onSave} disabled={saving}>
        {saved ? t('dash_saved') : saving ? '…' : t('dash_save')}
      </button>
    </div>
  )
}

/* ---------- login ---------- */
function Login() {
  const { login } = useAuth()
  const { t } = useLang()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(false)
    try {
      await login(email, password)
    } catch {
      setError(true)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="login-wrap">
      <form className="card login-card" onSubmit={submit}>
        <img src="/logo.svg" alt="RAMADAN" className="login-logo" />
        <h2>{t('dash_login_title')}</h2>
        <div className="field">
          <label>{t('email')}</label>
          <input type="email" value={email} dir="ltr" autoFocus
            onChange={(e) => { setEmail(e.target.value); setError(false) }} />
        </div>
        <div className="field">
          <label>{t('dash_password')}</label>
          <input type="password" value={password} dir="ltr"
            onChange={(e) => { setPassword(e.target.value); setError(false) }} />
        </div>
        {error && <p className="form-error">{t('dash_wrong_pass')}</p>}
        <button className="btn btn-primary" disabled={busy}
          style={{ width: '100%', justifyContent: 'center' }}>
          {busy ? '…' : t('dash_login')}
        </button>
        <Link to="/" className="back-link">{t('back_home')}</Link>
      </form>
    </div>
  )
}

function Loading() {
  const { t } = useLang()
  return <div className="panel"><p className="muted">{t('loading')}</p></div>
}

/* ---------- singleton sections ---------- */
function SettingsSection() {
  const { t } = useLang()
  const { draft, setField, loading, saving, saved, save } = useSingleton('/settings')
  if (loading || !draft) return <Loading />
  const social = draft.social || {}
  const setSocial = (k, v) => setField('social', { ...social, [k]: v })
  return (
    <section className="panel">
      <h2>{t('sec_site')}</h2>
      <Bi label={t('your_name')} value={draft.name} onChange={(v) => setField('name', v)} />
      <Bi label="Tagline" value={draft.tagline} onChange={(v) => setField('tagline', v)} />
      <ImageInput label="Logo" value={draft.logo} folder="logo" onChange={(v) => setField('logo', v)} />
      <div className="grid grid-2">
        <Text label={t('phone')} value={draft.phone} dir="ltr" onChange={(v) => setField('phone', v)} />
        <Text label="WhatsApp (digits)" value={draft.whatsapp} dir="ltr" onChange={(v) => setField('whatsapp', v)} />
      </div>
      <Text label={t('email')} value={draft.email} dir="ltr" onChange={(v) => setField('email', v)} />
      <Bi label={t('address')} value={draft.address} onChange={(v) => setField('address', v)} />
      <Bi label={t('working_hours')} value={draft.working_hours} onChange={(v) => setField('working_hours', v)} />
      <h3 className="sub-h">{t('follow_us')}</h3>
      <div className="grid grid-2">
        <Text label="Facebook" value={social.facebook} dir="ltr" onChange={(v) => setSocial('facebook', v)} />
        <Text label="Instagram" value={social.instagram} dir="ltr" onChange={(v) => setSocial('instagram', v)} />
        <Text label="LinkedIn" value={social.linkedin} dir="ltr" onChange={(v) => setSocial('linkedin', v)} />
        <Text label="X" value={social.x} dir="ltr" onChange={(v) => setSocial('x', v)} />
      </div>
      <SaveBar onSave={save} saving={saving} saved={saved} />
    </section>
  )
}

function HeroSection() {
  const { t } = useLang()
  const { draft, setField, loading, saving, saved, save } = useSingleton('/hero')
  if (loading || !draft) return <Loading />
  return (
    <section className="panel">
      <h2>{t('sec_hero')}</h2>
      <Bi label="Badge" value={draft.badge} onChange={(v) => setField('badge', v)} />
      <Bi label="Title" value={draft.title} onChange={(v) => setField('title', v)} />
      <Bi label="Subtitle" area value={draft.subtitle} onChange={(v) => setField('subtitle', v)} />
      <ImageInput label="Background image" value={draft.image} folder="hero" onChange={(v) => setField('image', v)} />
      <div className="grid grid-2">
        <Bi label="Primary button" value={draft.cta_primary} onChange={(v) => setField('cta_primary', v)} />
        <Bi label="Secondary button" value={draft.cta_secondary} onChange={(v) => setField('cta_secondary', v)} />
      </div>
      <SaveBar onSave={save} saving={saving} saved={saved} />
    </section>
  )
}

function AboutSection() {
  const { t } = useLang()
  const { draft, setField, loading, saving, saved, save } = useSingleton('/about')
  if (loading || !draft) return <Loading />
  const points = draft.points || []
  const setPoint = (i, v) => setField('points', points.map((p, idx) => (idx === i ? { ...p, ...v } : p)))
  return (
    <section className="panel">
      <h2>{t('sec_about')}</h2>
      <Bi label="Title" value={draft.title} onChange={(v) => setField('title', v)} />
      <Bi label="Lead" value={draft.lead} onChange={(v) => setField('lead', v)} />
      <Bi label="Body" area value={draft.body} onChange={(v) => setField('body', v)} />
      <ImageInput label="Image" value={draft.image} folder="about" onChange={(v) => setField('image', v)} />
      <h3 className="sub-h">Points</h3>
      {points.map((p, i) => (
        <div key={p.id || i} className="list-item">
          <Bi label={`#${i + 1}`} value={p} onChange={(v) => setPoint(i, v)} />
          <button className="del-btn" onClick={() => setField('points', points.filter((_, idx) => idx !== i))}>
            {t('dash_delete')}
          </button>
        </div>
      ))}
      <button className="btn btn-ghost" onClick={() => setField('points', [...points, { id: `p${Date.now()}`, ar: '', en: '' }])}>
        + {t('dash_add')}
      </button>
      <SaveBar onSave={save} saving={saving} saved={saved} />
    </section>
  )
}

function ContactSection() {
  const { t } = useLang()
  const { draft, setField, loading, saving, saved, save } = useSingleton('/contact-settings')
  if (loading || !draft) return <Loading />
  return (
    <section className="panel">
      <h2>{t('sec_contact')}</h2>
      <Bi label="Title" value={draft.title} onChange={(v) => setField('title', v)} />
      <Bi label="Subtitle" area value={draft.subtitle} onChange={(v) => setField('subtitle', v)} />
      <SaveBar onSave={save} saving={saving} saved={saved} />
    </section>
  )
}

/* ---------- collection sections ---------- */
function CollectionItem({ children, onSave, onDelete, saving }) {
  const { t } = useLang()
  return (
    <div className="list-item">
      {children}
      <div className="item-actions">
        <button className="btn btn-primary btn-sm" onClick={onSave} disabled={saving}>{t('dash_save')}</button>
        <button className="del-btn" onClick={onDelete}>{t('dash_delete')}</button>
      </div>
    </div>
  )
}

function ServicesSection() {
  const { t } = useLang()
  const { items, loading, savingId, patch, saveItem, add, remove } = useCollection('/services')
  if (loading) return <Loading />
  return (
    <section className="panel">
      <h2>{t('sec_services')}</h2>
      {items.map((s) => (
        <CollectionItem key={s.id} onSave={() => saveItem(s)} onDelete={() => remove(s.id)} saving={savingId === s.id}>
          <Text label="Icon (ruler/chart/brush/shield/clock/users/spark)" value={s.icon} dir="ltr" onChange={(v) => patch(s.id, { icon: v })} />
          <Bi label="Title" value={s.title} onChange={(v) => patch(s.id, { title: v })} />
          <Bi label="Description" area value={s.description} onChange={(v) => patch(s.id, { description: v })} />
        </CollectionItem>
      ))}
      <button className="btn btn-ghost" onClick={() => add({ icon: 'ruler', title: { ar: '', en: '' }, description: { ar: '', en: '' } })}>
        + {t('dash_add')}
      </button>
    </section>
  )
}

function ProjectsSection() {
  const { t } = useLang()
  const { items, loading, savingId, patch, saveItem, add, remove } = useCollection('/projects')
  if (loading) return <Loading />
  return (
    <section className="panel">
      <h2>{t('sec_projects')}</h2>
      {items.map((p) => (
        <CollectionItem key={p.id} onSave={() => saveItem(p)} onDelete={() => remove(p.id)} saving={savingId === p.id}>
          <Bi label="Title" value={p.title} onChange={(v) => patch(p.id, { title: v })} />
          <div className="grid grid-2">
            <div className="field">
              <label>Category</label>
              <select value={p.category} onChange={(e) => patch(p.id, { category: e.target.value })}>
                <option value="buildings">{t('cat_buildings')}</option>
                <option value="decor">{t('cat_decor')}</option>
                <option value="designs">{t('cat_designs')}</option>
              </select>
            </div>
            <Text label="Year" value={p.year} dir="ltr" onChange={(v) => patch(p.id, { year: v })} />
          </div>
          <MultiImageInput
            label="Gallery (first = cover)"
            value={p.images}
            folder="projects"
            onChange={(imgs) => patch(p.id, { images: imgs, image: imgs[0] || '' })}
          />
          <Bi label={t('address')} value={p.location} onChange={(v) => patch(p.id, { location: v })} />
          <Bi label="Description" area value={p.description} onChange={(v) => patch(p.id, { description: v })} />
        </CollectionItem>
      ))}
      <button className="btn btn-ghost" onClick={() => add({ title: { ar: '', en: '' }, category: 'decor', image: '', images: [], year: '', location: { ar: '', en: '' }, description: { ar: '', en: '' } })}>
        + {t('dash_add')}
      </button>
    </section>
  )
}

function StatsSection() {
  const { t } = useLang()
  const { items, loading, savingId, patch, saveItem, add, remove } = useCollection('/stats')
  if (loading) return <Loading />
  return (
    <section className="panel">
      <h2>{t('sec_stats')}</h2>
      {items.map((s) => (
        <CollectionItem key={s.id} onSave={() => saveItem(s)} onDelete={() => remove(s.id)} saving={savingId === s.id}>
          <Text label="Value" value={s.value} onChange={(v) => patch(s.id, { value: v })} />
          <Bi label="Label" value={s.label} onChange={(v) => patch(s.id, { label: v })} />
        </CollectionItem>
      ))}
      <button className="btn btn-ghost" onClick={() => add({ value: '', label: { ar: '', en: '' } })}>
        + {t('dash_add')}
      </button>
    </section>
  )
}

function WhyUsSection() {
  const { t } = useLang()
  const { items, loading, savingId, patch, saveItem, add, remove } = useCollection('/why-us')
  if (loading) return <Loading />
  return (
    <section className="panel">
      <h2>{t('sec_whyus')}</h2>
      {items.map((w) => (
        <CollectionItem key={w.id} onSave={() => saveItem(w)} onDelete={() => remove(w.id)} saving={savingId === w.id}>
          <Text label="Icon" value={w.icon} dir="ltr" onChange={(v) => patch(w.id, { icon: v })} />
          <Bi label="Title" value={w.title} onChange={(v) => patch(w.id, { title: v })} />
          <Bi label="Text" area value={w.text} onChange={(v) => patch(w.id, { text: v })} />
        </CollectionItem>
      ))}
      <button className="btn btn-ghost" onClick={() => add({ icon: 'shield', title: { ar: '', en: '' }, text: { ar: '', en: '' } })}>
        + {t('dash_add')}
      </button>
    </section>
  )
}

/* ---------- messages ---------- */
function MessagesSection() {
  const { t } = useLang()
  const { items, loading, saveItem, remove } = useCollection('/contact-messages')
  if (loading) return <Loading />
  return (
    <section className="panel">
      <h2>{t('sec_messages')}</h2>
      {items.length === 0 && <p className="muted">{t('msg_empty')}</p>}
      {items.map((m) => (
        <div key={m.id} className={`message-row ${m.is_read ? 'read' : 'unread'}`}>
          <div className="message-head">
            <strong>{m.name}</strong>
            <span className="muted" dir="ltr">{new Date(m.created_at).toLocaleString()}</span>
          </div>
          <div className="message-meta muted" dir="ltr">
            {[m.email, m.phone, m.subject].filter(Boolean).join(' • ')}
          </div>
          <p className="message-body">{m.message}</p>
          <div className="item-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => saveItem({ ...m, is_read: !m.is_read })}>
              {m.is_read ? t('msg_unread') : t('msg_read')}
            </button>
            <button className="del-btn" onClick={() => remove(m.id)}>{t('dash_delete')}</button>
          </div>
        </div>
      ))}
    </section>
  )
}

/* ---------- account ---------- */
function AccountSection() {
  const { t } = useLang()
  const { changePassword } = useAuth()
  const [oldP, setOldP] = useState('')
  const [newP, setNewP] = useState('')
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try {
      await changePassword(oldP, newP)
      setMsg({ ok: true, text: t('dash_pass_changed') })
      setOldP(''); setNewP('')
    } catch {
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

const SECTION_COMPONENTS = {
  site: SettingsSection,
  hero: HeroSection,
  about: AboutSection,
  contact: ContactSection,
  stats: StatsSection,
  services: ServicesSection,
  projects: ProjectsSection,
  whyus: WhyUsSection,
  messages: MessagesSection,
  account: AccountSection,
}

/* ---------- main ---------- */
export default function Dashboard() {
  const { isAuthed, ready, logout } = useAuth()
  const { t, toggleLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const [active, setActive] = useState('site')

  if (!ready) return <div className="login-wrap"><p className="muted">{t('loading')}</p></div>
  if (!isAuthed) return <Login />

  const ActiveSection = SECTION_COMPONENTS[active]

  return (
    <div className="dash">
      <header className="dash-top">
        <div className="dash-top-left">
          <Link to="/" className="brand">
            <img src="/logo.svg" alt="RAMADAN" className="brand-logo" />
            <strong>{t('dash_title')}</strong>
          </Link>
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
        <aside className="dash-side">
          {SECTIONS.map((s) => (
            <button key={s.id}
              className={`side-link ${active === s.id ? 'active' : ''}`}
              onClick={() => setActive(s.id)}>
              <Icon name={s.icon} size={18} /> {t(`sec_${s.id}`)}
            </button>
          ))}
        </aside>

        <main className="dash-main">
          <p className="dash-intro">{t('dash_intro')}</p>
          <ActiveSection />
        </main>
      </div>
    </div>
  )
}
