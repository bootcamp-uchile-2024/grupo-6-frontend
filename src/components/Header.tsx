import iconoUsuario from '../assets/images/icono_usuario.png'
import iconoCarrito from '../assets/images/icono_carrito.png'
import '../styles/header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
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

  return (
    <>
      <header id="encabezado-home">
        <Link to="/">
          <h1 className="titulo-header">Páginas Selectas</h1>
        </Link>
        <div className="caja-botones-accion">
          <Link to='login'>
            <img src={iconoUsuario} className="icono usuario" alt="Icono de iniciar sesión" />
          </Link>

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