import { Link } from 'react-router-dom'
import '../styles/login.css'
const CrearCuenta = () => {
    return (
        <div className="caja-crear-cuenta">
            <p>¡Se parte de nuestra familia de lectores!</p>
            <h3>Crea una cuenta</h3>
            <form className="form-crear-cuenta">
                <label htmlFor="nombres">Nombres</label>
                <input type="text" id='nombres' placeholder="Ej: Roberto Andrés" required/>

                <label htmlFor="apellido-paterno">Apellido Paterno</label>
                <input type="text" id='apellido-paterno' placeholder="Ej: Gonzáles" required/>

                <label htmlFor="apellido-materno">Apellido Materno</label>
                <input type="text" id='apellido-materno' placeholder="Ej: Ramírez" required/> 

                <label htmlFor="correo">Correo electrónico</label>
                <input type="email" id='correo' placeholder="Ej: tuemail@gmail.com" required/>

                <label htmlFor="constrasena">Contraseña</label>
                <input type="password" id='constrasena' placeholder="Crea una contraseña segura" required/>  

                <button type="submit">Crear Cuenta</button>
            </form>
        </div>
    )
}

export default CrearCuenta