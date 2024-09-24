import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ILoginUser } from '../interfaces/ILoginUser';
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();

    const [correoError, setCorreoError] = useState<boolean>(false);
    const [contrasenaError, setContrasenaError] = useState<boolean>(false);

    const [user, setUser] = useState<ILoginUser>({
        correoElectronico: '',
        contrasena: ''
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Simular autenticación
        if (user.correoElectronico === 'admin@gmail.com' && user.contrasena === 'admin') {
            alert("Inicio de sesión de admin exitoso.")
            console.log("Inicio de sesión de admin exitoso.")
            navigate('/ruta-admin'); // Cambiar ruta
        }
        else {
            setCorreoError(true);
        }

        if (user.correoElectronico === 'usuario@gmail.com' && user.contrasena === 'usuario') {
            alert("Inicio de sesión de usuario exitoso.")
            console.log("Inicio de sesión de usuario exitoso.")
            navigate('/ruta-usuario'); // Cambiar ruta
        }
        else {
            setContrasenaError(true);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setCorreoError(false);
        setContrasenaError(false);

        setUser({
            ...user,
            [name]: value
        })
        
        if (name === 'correoElectronico') {
            setCorreoError(false);
        } else if (name === 'contrasena') {
            setContrasenaError(false);
        }
    }

    return (
        <div className="caja-login">
            <p>¡Bienvenido de nuevo!</p>
            <h3>Inicia sesión</h3>
            <form className="form-login" onSubmit={handleSubmit}>
                <label htmlFor="correoElectronico">Correo electrónico</label>
                <input
                    type="email"
                    id='correoElectronico'
                    name='correoElectronico'
                    value={user.correoElectronico}
                    onChange={handleChange}
                    placeholder="Ej: tuemail@gmail.com"
                    required
                />
                {correoError && <p className="error">Correo inválido</p>}

                <label htmlFor="contrasena">Contraseña</label>
                <input
                    type="password"
                    id='contrasena'
                    name='contrasena'
                    value={user.contrasena}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    required
                />

                {contrasenaError && <p className="error">Contraseña inválida</p>}

                <button type="submit">Enviar</button>
            </form>

            <div className="crear-cuenta">
                <Link to="/register">Crea una cuenta</Link>
            </div>
        </div>
    );
};

export default Login;