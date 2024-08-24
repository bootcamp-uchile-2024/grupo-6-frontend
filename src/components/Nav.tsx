import icono_lupa from '../assets/images/icono_lupa.png'
import '../styles/estilos_home.css'

function Nav() {

  return (
    <>
    <nav className="navbar">
        <ul className="menu">
            <li><a href="#home">Nosotros</a></li>
            <li><a href="#service">Categorías</a></li>
            <li><a href="#partner">Novedades</a></li>
            <li><a href="#about">Mystery Boxes</a></li>
            <li><a href="#contact">Contacto</a></li>
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
