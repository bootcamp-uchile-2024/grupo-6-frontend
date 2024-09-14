import icono_usuario from '../assets/images/icono_usuario.png'
import icono_carrito from '../assets/images/icono_carrito.png'
import '../styles/estilos_home.css'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <>
      <header id="encabezadoHome">
        <h1 id="tituloHeader">Páginas Selectas</h1>
        <div className="botonesHome">
          <Link to="/login">
            <img src={icono_usuario} className="icono usuario" alt="Icono Usuario" />
          </Link>
          <a href="" target="_blank">
            <img src={icono_carrito} className="icono carrito" alt="Icono Carrito" />
          </a>
        </div>
      </header>

    </>
  )
}

export default Header
