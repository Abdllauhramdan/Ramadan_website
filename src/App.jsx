import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import { useContent } from './context/ContentContext.jsx'
import { useLang } from './context/LanguageContext.jsx'

function LoadingScreen() {
  const { t } = useLang()
  return (
    <div className="loading-screen">
      <div className="loading-spinner" />
      <p>{t('loading')}</p>
    </div>
  )
}

export default function App() {
  const { loading } = useContent()
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (loading) return <LoadingScreen />

  return (
    <>
      <ScrollToTop />
      {!isDashboard && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </>
  )
}
