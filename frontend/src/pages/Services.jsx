import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Icon from '../components/Icon.jsx'

const VIDEO_SRC = `${import.meta.env.BASE_URL}ramadan-services.mp4`

export default function Services() {
  const { content } = useContent()
  const { t, pick } = useLang()
  const { services = [] } = content

  const steps = [
    { icon: 'chart', title: t('step_consult'), text: t('step_consult_d') },
    { icon: 'ruler', title: t('step_design'), text: t('step_design_d') },
    { icon: 'factory', title: t('step_execute'), text: t('step_execute_d') },
    { icon: 'check', title: t('step_deliver'), text: t('step_deliver_d') },
  ]

  return (
    <>
      <PageHeader title={t('our_services')} subtitle={t('services_lead')} />

      {/* Intro + services list */}
      <section className="section">
        <div className="container text-center">
          <p className="section-subtitle" style={{ marginInline: 'auto', fontSize: '1.1rem' }}>
            {t('services_intro')}
          </p>
        </div>

        <div className="container">
          <div className="services-list" style={{ marginTop: 40 }}>
            {services.map((s, i) => (
              <article key={s.id} className={`service-row ${i % 2 ? 'reverse' : ''}`}>
                <div className="service-row-icon">
                  <Icon name={s.icon} size={46} />
                  <span className="service-no">{String(i + 1).padStart(2, '0')}</span>
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

      {/* Video showcase */}
      <section className="section section-soft">
        <div className="container">
          <SectionTitle center eyebrow={t('our_projects')} title={t('video_heading')} subtitle={t('video_sub')} />
          <div className="video-wrap" style={{ marginTop: 36 }}>
            <video
              src={VIDEO_SRC}
              controls
              playsInline
              preload="metadata"
              poster={content?.hero?.image}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <SectionTitle center eyebrow={t('our_process')} title={t('our_process')} subtitle={t('our_process_sub')} />
          <div className="grid grid-4 process-grid" style={{ marginTop: 40 }}>
            {steps.map((s, i) => (
              <div key={i} className="card feature-card process-step">
                <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="feature-icon">
                  <Icon name={s.icon} size={26} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
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
