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
import { MedioDePagoPage } from './pages/MedioDePagoPage.tsx'
import { AdminUsersListPage } from './pages/AdminUserListPage.tsx';
import { AdminCreateUserPage } from './pages/AdminCreateUserPage.tsx'
import { MysteryBoxPage } from './pages/MysteryBoxPage.tsx'
import { CompraExitosa } from './components/shoppingcart/CompraExitosa.tsx'
import { UserModifyAddressPage } from './pages/UserModifyAddress.tsx'
import { UserListAddressPage } from './pages/UserListAddress.tsx'
import { UserCreateAddressPage } from './pages/UserCreateAddressPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage title={'Páginas Selectas'} />} />
          <Route path="/categorias" element={<CategoriasPage title='Catálogo' />} />
          <Route path="/about" element={<AboutPage title={'Nosotros'} body={'This is the about page'} />} />
          <Route path='/novedades' element={<NovedadesPage title={'Novedades'} />} />
          <Route path='/product-detail/:isbn' element={<ProductDetailPage />} />
          <Route path='/login' element={<LoginPage title='Iniciar Sesión' />} />
          <Route path='/register' element={<CrearCuentaPage title='Crear Cuenta' />} />
          <Route path='/create/product' element={<PrivateRoute roles={['ADMIN']}><CrearProductoPage title='Crear Producto' /></PrivateRoute>} />
          <Route path='/admin/product' element={<PrivateRoute roles={['ADMIN']}><AdminBookListPage title='Lista admin Producto' /></PrivateRoute>} />
          <Route path='/admin/update/product' element={<PrivateRoute roles={['ADMIN']}><BookProductModifyPage title='Actualizar Producto'  /></PrivateRoute>} />
          <Route path='/admin/edit-user/:idUsuario' element={<PrivateRoute roles={['ADMIN']}><AdminUserModifyPage title='Editor de usuarios' /></PrivateRoute>} />
          <Route path='/admin/userslist' element={<PrivateRoute roles={['ADMIN']}><AdminUsersListPage title='Lista de usuarios' /></PrivateRoute>} />
          <Route path='/admin/createuser' element={<PrivateRoute roles={['ADMIN']}><AdminCreateUserPage title='Lista de usuarios' /></PrivateRoute>} />
          <Route path='/admin' element={<PrivateRoute roles={['ADMIN']}><AdminPage title='Panel de administración' /></PrivateRoute>} />
          <Route path='/user' element={<PrivateRoute roles={['USER']}><UserPage title='Cuenta' /></PrivateRoute>} />
          <Route path='/user/settings/address' element={<PrivateRoute roles={['USER']}><UserModifyAddressPage title='Edita tu dirección' /></PrivateRoute>} />
          <Route path='/user/address' element={<PrivateRoute roles={['USER']}><UserListAddressPage title='Tus direcciones' /></PrivateRoute>} />
          <Route path='/user/address/add' element={<PrivateRoute roles={['USER']}><UserCreateAddressPage title='Crear direccion' /></PrivateRoute>} />
          <Route path="/carrito" element={<ShoppingCartPage title='Carrito Compras' />} />
          <Route path="/empty-cart" element={<EmptyCartPage title='Carrito Vacío' />} />
          <Route path='/shoppingcart-resume/' element={<ResumenShoppingCartPage title='Resumen carrito de compras' />}></Route>
          <Route path='/shoppingcart-payment/' element={<MedioDePagoPage title='Pagar pedido' />}></Route>
          <Route path='/successful-purchase' element={<CompraExitosa title='Compra exitosa' />}></Route>
          <Route path='/mystery-box' element={<MysteryBoxPage title='Mystery box' />}></Route>
          <Route path="*" element={<NotFoundPage title='Página No Encontrada' />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);