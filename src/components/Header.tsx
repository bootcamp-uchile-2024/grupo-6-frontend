import iconoUsuario from '../assets/images/icono_usuario.png'
import iconoCarrito from '../assets/images/icono_carrito.png'
import '../styles/header.css'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from "../auth/useAuth";

function Header() {
  const { isAuthenticated, user } = useAuth(); // Aquí se usa el hook correctamente

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

  return (
    <>
      <header id="encabezado-home">
        <Link to="/">
          <h1 className="titulo-header">Páginas Selectas</h1>
        </Link>
        <div className="caja-botones-accion">
          <img src={iconoUsuario} className="icono usuario" alt="Icono de iniciar sesión" onClick={handleUserClick} />
          <Link to="/carrito">
            <img src={iconoCarrito} className="icono carrito" alt="Icono de carro de compras" />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;