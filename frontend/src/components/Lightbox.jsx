import { useState, useEffect, useCallback } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import Icon from './Icon.jsx'

// Fullscreen image gallery for a project (multiple shots) with prev/next.
export default function Lightbox({ project, onClose }) {
  const { pick, isRTL } = useLang()
  const images = project?.images?.length ? project.images : project?.image ? [project.image] : []
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') isRTL ? prev() : next()
      else if (e.key === 'ArrowLeft') isRTL ? next() : prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, next, prev, onClose, isRTL])

  if (!project) return null

  return (
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="close">✕</button>

      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button className="lb-nav lb-prev" onClick={prev} aria-label="previous">
            <Icon name={isRTL ? 'arrow' : 'arrowL'} size={26} />
          </button>
        )}

        <figure className="lb-figure">
          <img src={images[index]} alt={pick(project.title)} />
          <figcaption>
            <strong>{pick(project.title)}</strong>
            <span>{index + 1} / {images.length}</span>
          </figcaption>
        </figure>

        {images.length > 1 && (
          <button className="lb-nav lb-next" onClick={next} aria-label="next">
            <Icon name={isRTL ? 'arrowL' : 'arrow'} size={26} />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
          {images.map((src, i) => (
            <button
              key={i}
              className={`lb-thumb ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
