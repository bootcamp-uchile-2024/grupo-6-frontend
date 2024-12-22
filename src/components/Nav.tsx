import { Link } from 'react-router-dom';
import iconoLupa from '../assets/images/icono_lupa.png';
import '../styles/nav.css';
import { useSelector } from 'react-redux';
import { RootType } from '../states/store';

function Nav() {
  const user = useSelector((state: RootType) => state.authReducer.user)

  return (
    <nav className="navbar">
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">Nosotros</Link></li>
        <li className='categorias'>
          <Link to={`/carrito`}>Catálogo</Link>
          <div className='caja-categoria-desplegable'>
            <ul className='columna-categoria-1'>
              <li><Link to={`/carrito`}>Aventura</Link></li>
              <li><Link to={`/carrito`}>Arte</Link></li>
              <li><Link to={`/carrito`}>Biografías y autobiografías</Link></li>
              <li><Link to={`/carrito`}>Ciencia ficción</Link></li>
              <li><Link to={`/carrito`}>Ciencia y matemáticas</Link></li>
              <li><Link to={`/carrito`}>Clásico</Link></li>
              <li><Link to={`/carrito`}>Cocina</Link></li>
            </ul>
            <ul className='columna-categoria-2'>
              <li><Link to={`/carrito`}>Computación</Link></li>
              <li><Link to={`/carrito`}>Contemporáneo</Link></li>
              <li><Link to={`/carrito`}>Derecho y política</Link></li>
              <li><Link to={`/carrito`}>Distópia</Link></li>
              <li><Link to={`/carrito`}>Economía y finanzas</Link></li>
              <li><Link to={`/carrito`}>Educación</Link></li>
              <li><Link to={`/carrito`}>Fantasía</Link></li>
            </ul>
            <ul className='columna-categoria-3'>
              <li><Link to={`/carrito`}>Filosofía y religión</Link></li>
              <li><Link to={`/carrito`}>Infantil</Link></li>
              <li><Link to={`/carrito`}>Historia</Link></li>
              <li><Link to={`/carrito`}>Juvenil</Link></li>
              <li><Link to={`/carrito`}>Novela</Link></li>
              <li><Link to={`/carrito`}>Novela histórica</Link></li>
              <li><Link to={`/carrito`}>Paranormal</Link></li>
            </ul>
            <ul className='columna-categoria-4'>
              <li><Link to={`/carrito`}>Poesía</Link></li>
              <li><Link to={`/carrito`}>Romance</Link></li>
              <li><Link to={`/carrito`}>Salud y deporte</Link></li>
              <li><Link to={`/carrito`}>Técnicos y especializados</Link></li>
              <li><Link to={`/carrito`}>Terror</Link></li>
              <li><Link to={`/carrito`}>Thriller</Link></li>
              <li><Link to={`/carrito`}>Viajes</Link></li>
            </ul>
          </div>

        </li>
        <li><Link to={`/novedades`}>Novedades</Link></li>
        <li><Link to="/mystery-box">Mystery Boxes</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>

        {/* Mostrar esta página solo si el usuario es admin */}
        {user?.rol === 'admin' && (
          <>
            <li><Link to="/create/product">Crear Producto</Link></li>
            <li><Link to="/admin/product">Modificar Productos</Link></li>
          </>
        )}
      </ul>

      <label htmlFor="buscar"></label>
      <input type="search" name="input_buscar" id="buscar" placeholder="Busca por título o autor" />
      <button className="boton-buscar-nav">
        <img src={iconoLupa} alt="lupa buscar" />
      </button>
    </nav>
  );
};

export default Nav;