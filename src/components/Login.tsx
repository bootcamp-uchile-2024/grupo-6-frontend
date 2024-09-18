import { Link } from 'react-router-dom'
import '../styles/login.css'
const Login = () => {
    return (
        <div className="caja-login">
            <p>¡Bienvenido de nuevo!</p>
            <h3>Inicia sesión</h3>
            <form className="form-login">
                <label htmlFor="correo">Correo electrónico</label>
                <input type="email" id='correo' placeholder="Ej: tuemail@gmail.com" required/>

                <label htmlFor="contrasena">Contraseña</label>
                <input type="password" id='contrasena' placeholder="Ingresa tu contraseña" required/>

                <button type="submit">Enviar</button>
            </form>

            <div className="crear-cuenta">
                <Link to="/register">Crea una cuenta</Link>
            </div>
        </div>
    )
}

export default Login