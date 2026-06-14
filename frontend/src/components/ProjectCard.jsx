import { useLang } from '../context/LanguageContext.jsx'

export default function ProjectCard({ project }) {
  const { pick, t } = useLang()
  const catLabel = t(`cat_${project.category}`)
  return (
    <article className="card project-card">
      <div className="project-media">
        <img src={project.image} alt={pick(project.title)} loading="lazy" />
        <span className="project-cat">{catLabel}</span>
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
