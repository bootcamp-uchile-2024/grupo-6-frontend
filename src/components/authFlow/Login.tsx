import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ILoginUser } from '../../interfaces/ILoginUser';
import { login } from '../../services/loginService';
import '../../styles/login.css';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../states/authSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState<boolean>(false);
    const [validCredential, setValidCredential] = useState<boolean>(true);
    const [form, setForm] = useState<ILoginUser>({
        correoElectronico: '',
        contrasena: ''
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // validación de campos vacíos
        if (form.correoElectronico === '' || form.contrasena === '') {
            setError(true);
            return;
        }

        // Llama a loginService y esperamos su respuesta
        const isValidLogin = await login(form);

        if (isValidLogin) {
            alert("Inicio de sesión exitoso.");

            // Extrae el token de localStorage
            const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
            const decodedToken = jwtDecode<{ idUsuario: number; rol: string; exp: number }>(loggedInUser.token);

            // Actualizamos estado del store con datos extraídos del token
            dispatch(loginAction({
                idUsuario: loggedInUser.idUsuario,
                rol: decodedToken.rol,
                token: loggedInUser.token,
            }));

            // Redirigimos según el rol del usuario
            if (loggedInUser.rol === 'ADMIN') {
                navigate('/admin');
            } else if (loggedInUser.rol === 'USER') {
                navigate('/user');
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
        <Container className="login-container">
            <h3>Inicio de sesión</h3>

            <Row className='d-flex justify-content-center align-content-center'>
                <Col lg={5} className='login-form'>
                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="correoElectronico">Introduce tu correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                id='correoElectronico'
                                name='correoElectronico'
                                value={form.correoElectronico}
                                onChange={handleChange}
                                placeholder='Correo electrónico'
                                isInvalid={error || !validCredential}
                                required />
                            <Form.Control.Feedback type="invalid">
                                {error ? "Complete todos los campos." : "Nombre de usuario o contraseña incorrecta."}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="contrasena">Introduce tu contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                id='contrasena'
                                name='contrasena'
                                value={form.contrasena}
                                onChange={handleChange}
                                placeholder='Contraseña'
                                isInvalid={error || !validCredential}
                                required />
                            <Form.Control.Feedback type="invalid">
                                {error ? "Complete todos los campos." : "Nombre de usuario o contraseña incorrecta."}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Col className="d-flex justify-content-center link-olvidaste-contrasena">
                                <a href="#" onClick={(e) => e.preventDefault()}>¿Olvidaste tu contraseña?</a>
                            </Col>
                        </Form.Group>

                        <Form.Group>
                            <Col className="d-flex justify-content-center">
                                <Button variant="primary" size='lg' type="submit">
                                    Iniciar sesión
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>

                    <div className="d-flex justify-content-center link-crear-cuenta">
                        <Link to="/register">Crear cuenta</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;