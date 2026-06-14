import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useContent } from '../context/ContentContext.jsx'
import Icon from './Icon.jsx'

export default function Navbar() {
  const { t, toggleLang, lang, pick } = useLang()
  const { theme, toggleTheme } = useTheme()
  const { content } = useContent()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/services', label: t('nav_services') },
    { to: '/projects', label: t('nav_projects') },
    { to: '/contact', label: t('nav_contact') },
  ]

  const close = () => setOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={close}>
          <img src={content?.site?.logo} alt="RAMADAN" className="brand-logo" />
          <span className="brand-name">{pick(content?.site?.name)}</span>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={close}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary nav-cta" onClick={close}>
            {t('get_in_touch')}
          </Link>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('light_mode') : t('dark_mode')}
            title={theme === 'dark' ? t('light_mode') : t('dark_mode')}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
          </button>
          <button className="lang-btn" onClick={toggleLang} aria-label="switch language">
            {t('switch_lang')}
          </button>
          <button
            className="icon-btn menu-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="menu"
          >
            <span className={`burger ${open ? 'x' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  )
}
