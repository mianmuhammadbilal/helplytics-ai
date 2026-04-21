import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Backend warm karo — cold start prevent
fetch('https://helplytics-ai-a3hz.vercel.app/ping').catch(() => {});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)