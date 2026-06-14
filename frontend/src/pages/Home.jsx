import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Icon from '../components/Icon.jsx'

export default function Home() {
  const { content } = useContent()
  const { t, pick } = useLang()
  const { hero, stats = [], services = [], projects = [], about, whyUs = [] } = content

  const featuredProjects = projects.slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section
        className="hero"
        style={{ backgroundImage: `var(--hero-overlay), url(${hero.image})` }}
      >
        <div className="container hero-inner reveal">
          <span className="hero-badge">{pick(hero.badge)}</span>
          <h1 className="hero-title">{pick(hero.title)}</h1>
          <p className="hero-subtitle">{pick(hero.subtitle)}</p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              {pick(hero.ctaPrimary)} <Icon name="arrow" size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline hero-outline">
              {pick(hero.ctaSecondary)}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
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

      {/* ABOUT PREVIEW */}
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
            <Link to="/about" className="btn btn-ghost">
              {t('learn_more')} <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-soft">
        <div className="container">
          <SectionTitle
            center
            eyebrow={t('our_services')}
            title={t('our_services')}
          />
          <div className="grid grid-3" style={{ marginTop: 40 }}>
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section">
        <div className="container">
          <div className="row-between">
            <SectionTitle eyebrow={t('our_projects')} title={t('our_projects')} />
            <Link to="/projects" className="btn btn-outline view-all-btn">
              {t('view_all')} <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="grid grid-3" style={{ marginTop: 30 }}>
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section section-soft">
        <div className="container">
          <SectionTitle center eyebrow={t('why_us')} title={t('why_us')} />
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

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-inner">
          <h2>{pick(content.contact.title)}</h2>
          <p>{pick(content.contact.subtitle)}</p>
          <Link to="/contact" className="btn btn-primary">
            {t('get_in_touch')} <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
