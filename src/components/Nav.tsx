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
            <li><Link to="/categorias">Categorias</Link></li>
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
