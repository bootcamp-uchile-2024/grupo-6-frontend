import iconoUsuario from '../assets/images/icono_usuario.png'
import iconoCarrito from '../assets/images/icono_carrito.png'
import '../styles/header.css'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from "../auth/useAuth";
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../states/productSlice';

function Header() {
  const { isAuthenticated, user } = useAuth();

  // Para obtener la cantidad de productos del carrito
  const itemCount = useSelector(selectCartItemCount);

  console.log('Is Authenticated:', isAuthenticated);
  console.log('User Info:', user);

  const navigate = useNavigate();

  const handleUserClick = () => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirige a la página de inicio de sesión
      return;
    }

    // Redirige según el rol del usuario
    if (user?.correoElectronico === 'admin@gmail.com' && user?.contrasena === 'admin') {
      navigate('/admin'); // Redirige al perfil del administrador
    } else if (user?.correoElectronico === 'usuario@gmail.com' && user?.contrasena === 'usuario') {
      navigate('/user'); // Redirige al perfil del usuario
    } else {
      navigate('/login'); // Redirige a la página de inicio de sesión si las credenciales no coinciden
    }
  }

  const handleCartClick = () => {
    if (itemCount > 0) {
      navigate('/carrito'); // Si el carrito tiene productos, redirige al detalle de la página de carrito 
    } else {
      navigate('/empty-cart') // Si el carrito esta vacío, redirige a esa página 'carrito vacío'
    }
  }

  return (
    <>
      <header id="encabezado-home">
        <Link to="/">
          <h1 className="titulo-header">Páginas Selectas</h1>
        </Link>
        <div className="caja-botones-accion">
          <img src={iconoUsuario} className="icono usuario" alt="Icono de iniciar sesión" onClick={handleUserClick} />
          
            <div className='icono-carrito' onClick={handleCartClick}>
              <img src={iconoCarrito} className="icono carrito" alt="Icono de carro de compras" />
              {itemCount > 0 && <span className="cantidad-articulos">{itemCount}</span>}
            </div>
        </div>
      </header>
    </>
  );
};

export default Header;