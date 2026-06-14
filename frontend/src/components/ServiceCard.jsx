import Icon from './Icon.jsx'
import { useLang } from '../context/LanguageContext.jsx'

export default function ServiceCard({ service }) {
  const { pick } = useLang()
  return (
    <article className="card service-card">
      <div className="service-icon">
        <Icon name={service.icon} size={30} />
      </div>
      <h3>{pick(service.title)}</h3>
      <p>{pick(service.description)}</p>
    </article>
  )
}
