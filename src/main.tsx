import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './Header.tsx'
import Nav from './Nav.tsx'
import CajaMain from './CajaMain.tsx'
import LibrosHome from './LibrosHome.tsx'

//import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header/>
    <Nav/>
    <CajaMain/>
    <LibrosHome/>
  </StrictMode>,
)
