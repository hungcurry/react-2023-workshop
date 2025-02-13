// import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'

// main.ts
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import 'virtual:uno.css'
import '@/assets/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>,
  // </React.StrictMode>
)
