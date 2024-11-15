import iconoUsuario from '../assets/images/icono_usuario.png'
import iconoCarrito from '../assets/images/icono_carrito.png'
import '../styles/header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootType } from '../states/store';
import { selectCartItemCount } from '../states/productSlice';

function Header() {

  const navigate = useNavigate();

  // Para obtener la cantidad de productos del carrito
  const itemCount = useSelector(selectCartItemCount);

  const handleCartClick = () => {
    if (itemCount > 0) {
      navigate('/carrito'); // Si el carrito tiene productos, redirige al detalle de la página de carrito 
    } else {
      navigate('/empty-cart') // Si el carrito esta vacío, redirige a esa página 'carrito vacío'
    }
  }

  const isAuthenticated = useSelector((state: RootType) => state.authReducer.isAuthenticated);
  const user = useSelector((state: RootType) => state.authReducer.user);

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.rol === 'admin') {
      navigate('/admin');
    } else if (user?.rol === 'user') {
      navigate('/user');
    }
  };

  return (
    <>
      <header id="encabezado-home">
        <Link to="/">
          <h1 className="titulo-header">Páginas Selectas</h1>
        </Link>

        <div className="caja-botones-accion">
          <button className='boton-icono-usuario' onClick={handleUserIconClick}>
            <img src={iconoUsuario} alt="Icono de iniciar sesión" />
          </button>

          <div className='icono-carrito' onClick={handleCartClick}>
            <img src={iconoCarrito} alt="Icono de carro de compras" />
            {itemCount > 0 && <span className="cantidad-articulos">{itemCount}</span>}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;