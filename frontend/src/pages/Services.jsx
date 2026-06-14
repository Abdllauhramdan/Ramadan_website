import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icon.jsx'

export default function Services() {
  const { content } = useContent()
  const { t, pick } = useLang()
  const { services = [] } = content

  return (
    <>
      <PageHeader title={t('our_services')} subtitle={pick(content.hero.subtitle)} />

      <section className="section">
        <div className="container">
          <div className="services-list">
            {services.map((s, i) => (
              <article key={s.id} className={`service-row ${i % 2 ? 'reverse' : ''}`}>
                <div className="service-row-icon">
                  <Icon name={s.icon} size={46} />
                  <span className="service-no">0{i + 1}</span>
                </div>
                <div className="service-row-text">
                  <h2>{pick(s.title)}</h2>
                  <p>{pick(s.description)}</p>
                  <Link to="/contact" className="link-arrow">
                    {t('get_in_touch')} <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
