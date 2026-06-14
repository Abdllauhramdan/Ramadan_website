import { useState, useEffect } from 'react'
import Icon from './Icon.jsx'

// Floating "back to top" button that appears after scrolling down.
export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      className="to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="back to top"
    >
      <Icon name="arrow" size={22} style={{ transform: 'rotate(-90deg)' }} />
    </button>
  )
}
