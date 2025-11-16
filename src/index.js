import React from 'react'
// ⚠️ CHANGED: Import createRoot from 'react-dom/client' for React v18+
import {createRoot} from 'react-dom/client' 
import {BrowserRouter} from 'react-router-dom'

import App from './App'

// ⚠️ CHANGED: Use the createRoot API
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)