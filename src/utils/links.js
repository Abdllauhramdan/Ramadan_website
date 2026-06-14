// Build a WhatsApp click-to-chat link with a prefilled message.
export function waLink(number, message = '') {
  const clean = (number || '').replace(/[^\d]/g, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${clean}${text}`
}

// Build a mailto link with subject and body.
export function mailLink(email, subject = '', body = '') {
  const params = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${email}${params.length ? '?' + params.join('&') : ''}`
}
