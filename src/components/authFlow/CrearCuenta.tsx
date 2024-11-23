import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ICreateUser } from '../../interfaces/ICreateUser';
import { configuracion } from '../../config/appConfiguration';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../styles/login.css'

const CrearCuenta = () => {
    const navigate = useNavigate();

    const [errorNombres, setErrorNombres] = useState<boolean>(false);
    const [errorApellidoPaterno, setErrorApellidoPaterno] = useState<boolean>(false);
    const [errorApellidoMaterno, setErrorApellidoMaterno] = useState<boolean>(false);
    const [errorCorreo, setErrorCorreo] = useState<boolean>(false);
    const [errorContrasena, setErrorContrasena] = useState<boolean>(false);

    const [form, setForm] = useState<ICreateUser>({
        nombres: '',
        apellidoMaterno: '',
        apellidoPaterno: '',
        correoElectronico: '',
        contrasena: ''
    });

    const validaForm = () => {
        let formValido = true;

        setErrorNombres(false);
        setErrorApellidoPaterno(false);
        setErrorApellidoMaterno(false);
        setErrorCorreo(false);
        setErrorContrasena(false);

        if (form.nombres === "") {
            setErrorNombres(true);
            formValido = false;
        }
        if (form.apellidoPaterno === "") {
            setErrorApellidoPaterno(true);
            formValido = false;
        }
        if (form.apellidoMaterno === "") {
            setErrorApellidoMaterno(true);
            formValido = false;
        }
        if (form.correoElectronico === "" || !form.correoElectronico.includes("@")) {
            setErrorCorreo(true);
            formValido = false;
        }
        if (form.contrasena === "") {
            setErrorContrasena(true);
            formValido = false;
        }

        return formValido;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validaForm()) {
            try {
                const response = await fetch(configuracion.urlJsonServerBackendUsers, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert("Cuenta de usuario ha sido creada con éxito.");
                    console.log('Usuario creado:', data);
                    setForm({
                        nombres: '',
                        apellidoMaterno: '',
                        apellidoPaterno: '',
                        correoElectronico: '',
                        contrasena: '',
                    });
                    navigate('/');
                } else {
                    const errorData = await response.json();
                    alert(errorData.error); // Esto muestra el error del backend
                }
            } catch (error) {
                console.error('Error al crear el usuario:', error);
                alert('Hubo un error al crear la cuenta. Por favor, intenta de nuevo.');
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target as HTMLInputElement;

        setErrorNombres(false);
        setErrorApellidoPaterno(false);
        setErrorApellidoMaterno(false);
        setErrorCorreo(false);
        setErrorContrasena(false);

        if (name in form) {
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    return (
        <Container className="registration-container">

            <h3>Registro de Usuario</h3>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col lg={10} className='registration-welcome text-center'>
                    <p>Estás a un paso de ser parte de la gran comunidad
                        de <b>Páginas Selectas</b>, el mejor lugar para encontrar
                        tu próxima lectura. Completa tus datos, verifica tu cuenta
                        y ya estarás registrado.</p>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-content-center'>
                <Col lg={10} className='registration-form'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} htmlFor='nombres'>
                                Nombres
                            </Form.Label>
                            <Col lg={{span:8, offset:2}}>
                                <Form.Control type="text" onChange={handleChange} id='nombres' name='nombres' />
                                {errorNombres && <p className="error">Ingrese nombres.</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} htmlFor='apellidoPaterno'>
                                Apellido Paterno
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" onChange={handleChange} id='apellidoPaterno' name='apellidoPaterno' />
                                {errorApellidoPaterno && <p className="error">Ingrese apellido paterno.</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} htmlFor="apellidoMaterno">
                                Apellido Materno
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" onChange={handleChange} id='apellidoMaterno' name='apellidoMaterno' />
                                {errorApellidoMaterno && <p className="error">Ingrese apellido materno.</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} htmlFor="correoElectronico">
                                Correo Electrónico
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" onChange={handleChange} id='correoElectronico' name='correoElectronico'/>
                                {errorCorreo && <p className="error">Ingrese correo electrónico válido.</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} htmlFor="contrasena">
                                Contraseña
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="password" onChange={handleChange} id='contrasena' name='contrasena' />
                                {errorContrasena && <p className="error">Cree una contraseña.</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button variant='primary' size='lg' type="submit">Registrar</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CrearCuenta;