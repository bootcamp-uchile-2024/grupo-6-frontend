import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ILoginUser } from '../interfaces/ILoginUser';
import { login } from '../services/loginService'; // Importamos el servicio de login
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<boolean>(false);
    const [validCredential, setValidCredential] = useState<boolean>(true);
    const [form, setForm] = useState<ILoginUser>({
        correoElectronico: '',
        contrasena: ''
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // validación de campos vacíos
        if (form.correoElectronico === '' || form.contrasena === '') {
            setError(true);
            return;
        }

        // loginService para validar credenciales
        if (login(form)) {
            alert("Inicio de sesión exitoso.");
            console.log("Inicio de sesión exitoso.");

            const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');

            // Redirigir dependiendo del tipo de usuario
            if (loggedInUser?.rol === 'admin') {
                navigate('/admin'); // Redirigir al panel de administración
            } else if (loggedInUser?.rol === 'user') {
                navigate('/user'); // Redirigir al panel de usuario
            }

        } else {
            setValidCredential(false);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setError(false);
        setValidCredential(true);
        setForm({
            ...form,
            [name]: value
        });
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
                    value={form.correoElectronico}
                    onChange={handleChange}
                    placeholder="Ej: tuemail@gmail.com"
                    required
                />

                <label htmlFor="contrasena">Contraseña</label>
                <input
                    type="password"
                    id='contrasena'
                    name='contrasena'
                    value={form.contrasena}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    required
                />

                {error && <p className="error">Complete todos los campos.</p>}
                {!validCredential && <div>Nombre de usuario o contraseña incorrecta.</div>}

                <button type="submit">Enviar</button>
            </form>

            <div className="crear-cuenta">
                <Link to="/register">Crea una cuenta</Link>
            </div>
        </div>
    );
};

export default Login;