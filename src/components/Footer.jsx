import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { useContent } from '../context/ContentContext.jsx'
import Icon from './Icon.jsx'

export default function Footer() {
  const { t, pick } = useLang()
  const { content } = useContent()
  const site = content?.site || {}
  const year = new Date().getFullYear()

  const socials = [
    { key: 'facebook', label: 'Facebook' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'x', label: 'X' },
  ].filter((s) => site.social?.[s.key])

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <Link to="/" className="brand">
            <img src={site.logo} alt="RAMADAN" className="brand-logo" />
            <span className="brand-name">{pick(site.name)}</span>
          </Link>
          <p className="footer-about">{t('footer_about')}</p>
        </div>

        <div className="footer-col">
          <h4>{t('quick_links')}</h4>
          <ul className="footer-links">
            <li><Link to="/about">{t('nav_about')}</Link></li>
            <li><Link to="/services">{t('nav_services')}</Link></li>
            <li><Link to="/projects">{t('nav_projects')}</Link></li>
            <li><Link to="/contact">{t('nav_contact')}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t('contact_info')}</h4>
          <ul className="footer-contact">
            {site.phone && (
              <li><Icon name="phone" size={18} /> <span dir="ltr">{site.phone}</span></li>
            )}
            {site.email && (
              <li><Icon name="mail" size={18} /> <span>{site.email}</span></li>
            )}
            {site.address && (
              <li><Icon name="pin" size={18} /> <span>{pick(site.address)}</span></li>
            )}
          </ul>
          {socials.length > 0 && (
            <div className="footer-social">
              {socials.map((s) => (
                <a key={s.key} href={site.social[s.key]} target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {year} {pick(site.name)} — {t('rights')}.
        </div>
      </div>
    </footer>
  )
}
