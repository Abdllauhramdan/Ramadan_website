import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ContentProvider } from './context/ContentContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import './styles/layout.css'
import './styles/dashboard.css'

// HashRouter keeps deep links working on static/shared hosting
// without needing server-side rewrite rules.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <ContentProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ContentProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
)
