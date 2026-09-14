import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// self-hosted fonts (same families and axes as the previous Google Fonts
// embed: Archivo wdth 62-125 / wght 100-900, Instrument Sans variable,
// Instrument Serif regular + italic)
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/instrument-sans'
import '@fontsource/instrument-serif'
import '@fontsource/instrument-serif/400-italic.css'
import './styles/global.css'
import App from './App.tsx'
import { initAnalytics } from './lib/tracking.ts'

initAnalytics()

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
