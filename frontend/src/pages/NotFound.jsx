import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'

export default function NotFound() {
  const { t } = useLang()
  return (
    <section className="section notfound">
      <div className="container text-center">
        <h1 className="gold-text" style={{ fontSize: '5rem' }}>404</h1>
        <p className="section-subtitle" style={{ marginInline: 'auto' }}>{t('not_found')}</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>
          {t('back_home')}
        </Link>
      </div>
    </section>
  )
}
