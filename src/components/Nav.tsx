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
            <li>
              <Link to="/categorias">Categorías</Link>              
              <div className='caja-categoria-desplegable'>
                <ul className='columna-categoria-1'>
                  <li>Aventura</li>
                  <li>Arte</li>
                  <li>Biografías y autobiografías</li>
                  <li>Ciencia ficción</li>
                  <li>Ciencia y matemáticas</li>
                  <li>Clásico</li>
                  <li>Cocina</li>
                </ul>
                <ul className='columna-categoria-2'>
                  <li>Computación</li>
                  <li>Contemporáneo</li>
                  <li>Derecho y política</li>
                  <li>Distópia</li>
                  <li>Economía y finanzas</li>
                  <li>Educación</li>
                  <li>Fantasía</li>
                </ul>
                <ul className='columna-categoria-2'>
                  <li>Filosofía y religión</li>
                  <li>Infantil</li>
                  <li>Historia</li>
                  <li>Juvenil</li>
                  <li>Novela</li>
                  <li>Novela histórica</li>
                  <li>Paranormal</li>
                </ul>
                <ul className='columna-categoria-2'>
                  <li>Poesía</li>
                  <li>Romance</li>
                  <li>Salud y deporte</li>
                  <li>Técnicos y especializados</li>
                  <li>Terror</li>
                  <li>Thriller</li>
                  <li>Viajes</li>
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