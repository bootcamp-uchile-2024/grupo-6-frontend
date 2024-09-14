import { Link } from 'react-router-dom'
import '../styles/login.css'
const Login = () => {
    return (
        <div className="caja-login">
            <p>¡Bienvenido de nuevo!</p>
            <h3>Inicia sesión</h3>
            <form className="form-login">
                <label htmlFor=""></label>
                <input type="text" placeholder=" Correo electrónico"/>
                <label htmlFor=""></label>
                <input type="password" placeholder=" Contraseña"/>
                <label htmlFor=""></label>
                <button type="submit">Enviar</button>
            </form>

            <div className="crear-cuenta">
                <Link to="/register">Crea una cuenta</Link>
            </div>
        </div>
    )
}

export default Login