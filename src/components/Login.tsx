import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ILoginUser } from '../interfaces/ILoginUser';
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Esto permite tener la función del login del contexto

    const [correoError, setCorreoError] = useState<boolean>(false);
    const [contrasenaError, setContrasenaError] = useState<boolean>(false);

    const [user, setUser] = useState<ILoginUser>({
        correoElectronico: '',
        contrasena: ''
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (user.correoElectronico === 'admin@gmail.com' && user.contrasena === 'admin') {
            alert("Inicio de sesión de admin exitoso.")
            console.log("Inicio de sesión de admin exitoso.")
            login({correoElectronico: user.correoElectronico, contrasena: user.contrasena}); // Para llamar a la función de login
            navigate('/admin'); // Ruta perfil de admin
        } 

        else if (user.correoElectronico === 'usuario@gmail.com' && user.contrasena === 'usuario') {
            alert("Inicio de sesión de usuario exitoso.")
            console.log("Inicio de sesión de usuario exitoso.")
            login({correoElectronico: user.correoElectronico, contrasena: user.contrasena}); // Para llamar a la función de login
            navigate('/user'); // Cambiar ruta /ruta-usuario
        }

        else {
            setCorreoError(true);
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
    };

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