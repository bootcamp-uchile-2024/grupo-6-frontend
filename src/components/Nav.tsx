import { Link } from 'react-router-dom'
import icono_lupa from '../assets/images/icono_lupa.png'
import '../styles/estilos_home.css'

function Nav() {

  return (
    <>
    <nav className="navbar">
        <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Nosotros</Link></li>
            <li className='categorias'>
              <Link to="/categorias">Categorías</Link>              
              <div className='caja-categoria-desplegable'>
                <ul className='columna-categoria-1'>
                  <li><Link to="/categorias">Aventura</Link></li>
                  <li><Link to="/categorias">Arte</Link></li>
                  <li><Link to="/categorias">Biografías y autobiografías</Link></li>
                  <li><Link to="/categorias">Ciencia ficción</Link></li>
                  <li><Link to="/categorias">Ciencia y matemáticas</Link></li>
                  <li><Link to="/categorias">Clásico</Link></li>
                  <li><Link to="/categorias">Cocina</Link></li>
                </ul>
                <ul className='columna-categoria-2'>
                  <li><Link to="/categorias">Computación</Link></li>
                  <li><Link to="/categorias">Contemporáneo</Link></li>
                  <li><Link to="/categorias">Derecho y política</Link></li>
                  <li><Link to="/categorias">Distópia</Link></li>
                  <li><Link to="/categorias">Economía y finanzas</Link></li>
                  <li><Link to="/categorias">Educación</Link></li>
                  <li><Link to="/categorias">Fantasía</Link></li>
                </ul>
                <ul className='columna-categoria-3'>
                  <li><Link to="/categorias">Filosofía y religión</Link></li>
                  <li><Link to="/categorias">Infantil</Link></li>
                  <li><Link to="/categorias">Historia</Link></li>
                  <li><Link to="/categorias">Juvenil</Link></li>
                  <li><Link to="/categorias">Novela</Link></li>
                  <li><Link to="/categorias">Novela histórica</Link></li>
                  <li><Link to="/categorias">Paranormal</Link></li>
                </ul>
                <ul className='columna-categoria-4'>
                  <li><Link to="/categorias">Poesía</Link></li>
                  <li><Link to="/categorias">Romance</Link></li>
                  <li><Link to="/categorias">Salud y deporte</Link></li>
                  <li><Link to="/categorias">Técnicos y especializados</Link></li>
                  <li><Link to="/categorias">Terror</Link></li>
                  <li><Link to="/categorias">Thriller</Link></li>
                  <li><Link to="/categorias">Viajes</Link></li>
                </ul>
              </div>

            </li>
            <li><Link to={`/novedades`}>Novedades</Link></li>
            <li><Link to="/mistery-boxes">Mystery Boxes</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
        </ul>
        <label htmlFor="buscar"></label>
        <input type="search" name="input_buscar" id="buscar" placeholder=" Busca por título o autor"/>
        <button className="botonBuscar">
            <img src={icono_lupa} alt="lupa buscar"/>
        </button>
    </nav>
    </>
  )
}

export default Nav