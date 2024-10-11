import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { CookiesProvider } from 'react-cookie'
import { RouteConfig } from './Router'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <CookiesProvider defaultSetOptions={{ path: '/' }}> */}
      <RouteConfig></RouteConfig>
      {/* </CookiesProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
)
