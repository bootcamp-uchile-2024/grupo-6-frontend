import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import CategoriasPage from './pages/CategoriasPage.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { NovedadesPage } from './pages/NovedadesPage.tsx'
import { ProductDetailPage } from './pages/ProductDetailPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { CrearCuentaPage } from './pages/CrearCuentaPage.tsx'
import { CrearProductoPage } from './pages/CrearProductoPage.tsx'
import { AdminPage } from './pages/AdminPage.tsx'
import { UserPage } from './pages/UserPage.tsx'
import './styles/global.css'
import { Provider } from 'react-redux'
import { store } from './states/store.ts'
import { ShoppingCartPage } from './pages/ShoppingCartPage.tsx'
import { ResumenShoppingCartPage } from './pages/ResumenShoppingCartPage.tsx'
import { EmptyCartPage } from './pages/EmptyCartPage.tsx'
import { AdminBookListPage } from './pages/AdminBookListPage.tsx'
import { BookProductModifyPage } from './pages/BookProductModifyPage.tsx'
import { PrivateRoute } from './protected/PrivateRoute.tsx'
import AdminUserModifyPage from './pages/AdminUserModifyPage.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage title={'Páginas Selectas'} />} />
          <Route path="/categorias" element={<CategoriasPage title='Categorías' />} />
          <Route path="/about" element={<AboutPage title={'Nosotros'} body={'This is the about page'} />} />
          <Route path='/novedades' element={<NovedadesPage title={'Novedades'} />} />
          <Route path='/product-detail/:isbn' element={<ProductDetailPage />} />
          <Route path='/login' element={<LoginPage title='Iniciar Sesión' />} />
          <Route path='/register' element={<CrearCuentaPage title='Crear Cuenta' />} />
          <Route path='/create/product' element={<PrivateRoute roles={['admin']}><CrearProductoPage title='Crear Producto' /></PrivateRoute>} />
          <Route path='/admin/product' element={<PrivateRoute roles={['admin']}><AdminBookListPage title='Lista admin Producto' /></PrivateRoute>} />
          <Route path='/admin/update/product' element={<PrivateRoute roles={['admin']}><BookProductModifyPage title='Actualizar Producto'  /></PrivateRoute>} />
          <Route path='/admin/edit-user/:idUsuario' element={<PrivateRoute roles={['admin']}><AdminUserModifyPage title='Editor de usuarios' /></PrivateRoute>} />
          <Route path='/admin' element={<PrivateRoute roles={['admin']}><AdminPage title='Panel de administración' /></PrivateRoute>} />
          <Route path='/user' element={<PrivateRoute roles={['user']}><UserPage title='Cuenta' /></PrivateRoute>} />
          <Route path="/carrito" element={<ShoppingCartPage title='Carrito Compras' />} />
          <Route path="/empty-cart" element={<EmptyCartPage title='Carrito Vacío' />} />
          <Route path='/shoppingcart-resume/' element={<ResumenShoppingCartPage title='Resumen carrito de compras' />}></Route>
          <Route path="*" element={<NotFoundPage title='Página No Encontrada' />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);