import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();

    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');

    const [correoError, setCorreoError] = useState<boolean>(false);
    const [contrasenaError, setContrasenaError] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Simular autenticación
        if (correoElectronico === 'admin@gmail.com' && contrasena === 'admin') {
            console.log("Envío exitoso del formulario")
            navigate('/ruta-admin'); // Cambiar ruta
        }
        else {
            setCorreoError(true);
        }

        if (correoElectronico === 'usuario@gmail.com' && contrasena === 'usuario') {
            navigate('/ruta-usuario'); // Cambiar ruta
            console.log("Envío exitoso del formulario")
        }
        else {
            setContrasenaError(true);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        if (id === 'correoElectronico') {
            setCorreoElectronico(value);
            setCorreoError(false);
        } else if (id === 'contrasena') {
            setContrasena(value);
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
                    value={correoElectronico}
                    onChange={handleChange}
                    placeholder="Ej: tuemail@gmail.com"
                    required
                />
                {correoError && <p className="error">Correo inválido</p>}

                <label htmlFor="contrasena">Contraseña</label>
                <input
                    type="password"
                    id='contrasena'
                    value={contrasena}
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