import { useState } from 'react'
import { useContent } from '../context/ContentContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Lightbox from '../components/Lightbox.jsx'

const ORDER = ['buildings', 'decor', 'designs']

export default function Projects() {
  const { content } = useContent()
  const { t, pick } = useLang()
  const { projects = [] } = content
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  // Only show filter buttons for categories that actually have projects.
  const present = ORDER.filter((c) => projects.some((p) => p.category === c))
  const categories = present.length > 1 ? ['all', ...present] : present

  const shown =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <PageHeader title={t('our_projects')} subtitle={pick(content.about.lead)} />

      <section className="section">
        <div className="container">
          {categories.length > 1 && (
            <div className="filters">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-btn ${filter === c ? 'active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  {c === 'all' ? t('filter_all') : t(`cat_${c}`)}
                </button>
              ))}
            </div>
          )}

          {shown.length === 0 ? (
            <p className="text-center" style={{ color: 'var(--text-soft)' }}>—</p>
          ) : (
            <div className="grid grid-3" style={{ marginTop: 30 }}>
              {shown.map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </>
  )
}

