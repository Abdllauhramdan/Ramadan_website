import { useLang } from '../context/LanguageContext.jsx'
import Icon from './Icon.jsx'

export default function ProjectCard({ project, onOpen }) {
  const { pick, t } = useLang()
  const catLabel = t(`cat_${project.category}`)
  const count = project.images?.length || (project.image ? 1 : 0)
  const clickable = typeof onOpen === 'function'

  return (
    <article
      className={`card project-card ${clickable ? 'clickable' : ''}`}
      onClick={clickable ? onOpen : undefined}
    >
      <div className="project-media">
        <img src={project.image} alt={pick(project.title)} loading="lazy" />
        <span className="project-cat">{catLabel}</span>
        {count > 1 && (
          <span className="project-count"><Icon name="play" size={14} fill /> {count}</span>
        )}
      </div>
      <div className="project-body">
        <h3>{pick(project.title)}</h3>
        <p className="project-meta">
          {pick(project.location)}{project.location && project.year ? ' • ' : ''}{project.year}
        </p>
        <p className="project-desc">{pick(project.description)}</p>
      </div>
    </article>
  )
}
