import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'

// Inner-page hero banner with a breadcrumb-style title.
export default function PageHeader({ title, subtitle }) {
  const { t } = useLang()
  return (
    <section className="page-header">
      <div className="container">
        <nav className="crumbs">
          <Link to="/">{t('nav_home')}</Link>
          <span>/</span>
          <span>{title}</span>
        </nav>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}
