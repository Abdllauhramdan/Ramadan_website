export default function SectionTitle({ eyebrow, title, subtitle, center }) {
  return (
    <div className={`section-head ${center ? 'text-center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
