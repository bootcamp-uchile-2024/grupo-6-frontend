import icono_usuario from '../assets/images/icono_usuario.png'
import icono_carrito from '../assets/images/icono_carrito.png'
import '../styles/header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

function Header() {
  const { isAuthenticated, user } = useAuth(); // Para obtener la info del usuario autenticado

  console.log('Is Authenticated:', isAuthenticated);
  console.log('User Info:', user);

  const navigate = useNavigate();

  const handleUserClick = () => {
    if (!isAuthenticated) {
      navigate('/login'); // Te lleva al login si no está autenticado
      return;
    }

    //condiciones respecto al usuario
    if (user?.correoElectronico === 'admin@gmail.com' && user?.contrasena === 'admin') {
      navigate('/admin'); // Para ir al perfil del admin
    }

    else if (user?.correoElectronico === 'usuario@gmail.com' && user?.contrasena === 'usuario') {
      navigate('/user'); // Para ir al perfil del usuario
    }

    else {
      navigate('/login'); // Redirige a crear una cuenta nueva
    }
  }

  return (
    <>
      <header id="encabezado-home">
        <Link to="/">
          <h1 className="titulo-header">Páginas Selectas</h1>
        </Link>
        <div className="caja-botones-accion">
          <img src={icono_usuario} className="icono usuario" alt="Icono de iniciar sesión" onClick={handleUserClick} />
          <Link to="/carrito">
            <img src={icono_carrito} className="icono carrito" alt="Icono de carro de compras" />
          </Link>
        </div>
      </header>
    </>
  )
}

export default Header
