import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import Icon from '../components/Icon.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function About() {
  const { content } = useContent()
  const { t, pick } = useLang()
  const { about, stats = [], whyUs = [] } = content

  return (
    <>
      <PageHeader title={pick(about.title)} subtitle={pick(about.lead)} />

      <section className="section">
        <div className="container about-preview">
          <div className="about-media">
            <img src={about.image} alt={pick(about.title)} loading="lazy" />
          </div>
          <div className="about-text">
            <p className="eyebrow">{pick(about.title)}</p>
            <h2 className="section-title">{pick(about.lead)}</h2>
            <p className="section-subtitle">{pick(about.body)}</p>
            <ul className="about-points">
              {about.points?.map((p) => (
                <li key={p.id}>
                  <Icon name="check" size={20} /> {pick(p)}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary">
              {t('get_in_touch')} <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container grid grid-4">
          {stats.map((s) => (
            <div key={s.id} className="stat">
              <span className="stat-value gold-text">{s.value}</span>
              <span className="stat-label">{pick(s.label)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="text-center section-head">
            <p className="eyebrow">{t('why_us')}</p>
            <h2 className="section-title">{t('why_us')}</h2>
          </div>
          <div className="grid grid-4" style={{ marginTop: 40 }}>
            {whyUs.map((w) => (
              <div key={w.id} className="card feature-card">
                <div className="feature-icon">
                  <Icon name={w.icon} size={26} />
                </div>
                <h3>{pick(w.title)}</h3>
                <p>{pick(w.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
