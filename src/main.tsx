import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import CategoriasPage from './pages/CategoriasPage.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { NovedadesPage } from './pages/NovedadesPage.tsx'
import { ProductDetailPage } from './pages/ProductDetailPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { CrearCuentaPage } from './pages/CrearCuentaPage.tsx'
import { CrearProductoPage } from './pages/CrearProductoPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage title={'Páginas Selectas'}/>}/>
        <Route path="/categorias" element={<CategoriasPage title='Categorías'/>}/>
        <Route path="/about" element={<AboutPage title={'Nosotros'} body={'This is the about page'}/>}/>
        <Route path='/novedades' element={<NovedadesPage title={'Novedades'}/>}/>
        <Route path='/product-detail/:isbn' element={<ProductDetailPage/>}/>
        <Route path='/login' element={<LoginPage title='Iniciar Sesión'/>}/>
        <Route path='/register' element={<CrearCuentaPage title='Crear Cuenta'/>}/>
        <Route path='/create/product' element={<CrearProductoPage title='Crear Producto'/>}/>
        <Route path="*" element={<NotFoundPage title='Página No Encontrada'/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)