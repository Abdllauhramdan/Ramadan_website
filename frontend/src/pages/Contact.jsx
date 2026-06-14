import { useState } from 'react'
import { useContent } from '../context/ContentContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icon.jsx'
import { waLink, mailLink } from '../utils/links.js'
import { api } from '../api/client.js'

export default function Contact() {
  const { content } = useContent()
  const { t, pick } = useLang()
  const site = content?.site || {}
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Store the submission in the database (appears in the dashboard Messages).
  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await api.post('/contact-messages', form)
      setSent(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    } catch {
      /* network error — fall back to WhatsApp below */
      window.open(waLink(site.whatsapp, buildMessage()), '_blank')
    } finally {
      setBusy(false)
    }
  }

  const buildMessage = () => {
    const lines = [
      `${t('your_name')}: ${form.name}`,
      form.email && `${t('email')}: ${form.email}`,
      form.phone && `${t('phone')}: ${form.phone}`,
      form.subject && `${t('subject')}: ${form.subject}`,
      '',
      form.message,
    ].filter(Boolean)
    return lines.join('\n')
  }

  const sendWhatsApp = (e) => {
    e.preventDefault()
    window.open(waLink(site.whatsapp, buildMessage()), '_blank')
  }

  const infoItems = [
    { icon: 'phone', label: t('phone'), value: site.phone, ltr: true, href: `tel:${(site.phone || '').replace(/\s/g, '')}` },
    { icon: 'mail', label: t('email'), value: site.email, href: `mailto:${site.email}` },
    { icon: 'pin', label: t('address'), value: pick(site.address) },
    { icon: 'clock', label: t('working_hours'), value: pick(site.workingHours) },
  ].filter((i) => i.value)

  return (
    <>
      <PageHeader title={pick(content.contact.title)} subtitle={pick(content.contact.subtitle)} />

      <section className="section">
        <div className="container contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2 className="section-title" style={{ fontSize: '1.6rem' }}>{t('contact_info')}</h2>
            <ul className="contact-list">
              {infoItems.map((it) => (
                <li key={it.label}>
                  <span className="ci-icon"><Icon name={it.icon} size={20} /></span>
                  <div>
                    <small>{it.label}</small>
                    {it.href ? (
                      <a href={it.href} dir={it.ltr ? 'ltr' : undefined}>{it.value}</a>
                    ) : (
                      <span dir={it.ltr ? 'ltr' : undefined}>{it.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact-direct">
              {site.whatsapp && (
                <a href={waLink(site.whatsapp)} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <Icon name="whatsapp" size={20} fill /> {t('send_whatsapp')}
                </a>
              )}
              {site.email && (
                <a href={mailLink(site.email)} className="btn btn-outline">
                  <Icon name="mail" size={20} /> {t('send_email')}
                </a>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form card">
            <p className="form-hint">{t('contact_form_hint')}</p>
            <form onSubmit={submit}>
              <div className="grid grid-2">
                <div className="field">
                  <label>{t('your_name')}</label>
                  <input value={form.name} onChange={update('name')} required />
                </div>
                <div className="field">
                  <label>{t('your_phone')}</label>
                  <input value={form.phone} onChange={update('phone')} dir="ltr" />
                </div>
              </div>
              <div className="grid grid-2">
                <div className="field">
                  <label>{t('your_email')}</label>
                  <input type="email" value={form.email} onChange={update('email')} dir="ltr" />
                </div>
                <div className="field">
                  <label>{t('subject')}</label>
                  <input value={form.subject} onChange={update('subject')} />
                </div>
              </div>
              <div className="field">
                <label>{t('message')}</label>
                <textarea value={form.message} onChange={update('message')} required />
              </div>
              {sent && <p className="form-ok">{t('msg_sent')}</p>}
              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={busy}>
                  <Icon name="arrow" size={18} /> {busy ? '…' : t('send')}
                </button>
                <button className="btn btn-outline" type="button" onClick={sendWhatsApp}>
                  <Icon name="whatsapp" size={20} fill /> {t('send_whatsapp')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
