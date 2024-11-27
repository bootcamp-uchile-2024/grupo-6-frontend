import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ICreateUser } from '../../interfaces/ICreateUser';
import { configuracion } from '../../config/appConfiguration';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../styles/login.css'

const CrearCuenta = () => {
    const navigate = useNavigate();

    const [errorNombres, setErrorNombres] = useState<boolean>(false);
    const [errorApellidoPaterno, setErrorApellidoPaterno] = useState<boolean>(false);
    const [errorApellidoMaterno, setErrorApellidoMaterno] = useState<boolean>(false);
    const [errorCorreo, setErrorCorreo] = useState<boolean>(false);
    const [errorContrasena, setErrorContrasena] = useState<boolean>(false);

    // Estados para el modal
    const [showModal, setShowModal] = useState(false); //cambiar a true mientras trabajas el css
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [shouldNavigate, setShouldNavigate] = useState(false);

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
                    setModalTitle('Te has registrado con éxito :D');
                    setModalMessage('Serás redirigido a la pantalla de inicio al cerrar este mensaje.');
                    setShowModal(true);
                    console.log('Usuario creado:', data);
                    setForm({
                        nombres: '',
                        apellidoMaterno: '',
                        apellidoPaterno: '',
                        correoElectronico: '',
                        contrasena: '',
                    });
                    setShouldNavigate(true); // Indica que se debe redirigir después de cerrar el modal
                } else {
                    const errorData = await response.json();
                    setModalTitle('Error');
                    setModalMessage(errorData.error);
                    setShowModal(true);
                    console.log(errorData.error); // Esto muestra el error del backend
                }
            } catch (error) {
                console.error('Error al crear el usuario:', error);
                setModalTitle('Error');
                setModalMessage('Hubo un error al crear la cuenta. Por favor, intenta de nuevo.');
                setShowModal(true);
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

    const handleCloseModal = () => {
        setShowModal(false);
        if (shouldNavigate) {
            navigate('/'); // Redirige solo si el estado lo indica
        }
    };

    return (
        <Container className="registration-container">

            <h3>¡Se parte de nuestra comunidad!</h3>

            <Row className='d-flex justify-content-center align-content-center'>
                <Col lg={5} className='registration-form'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='nombres'>
                                Nombres
                            </Form.Label>
                            <Form.Control type="text" onChange={handleChange} id='nombres' name='nombres' placeholder='Julian Idilio' />
                            {errorNombres && <p className="error">Ingrese nombres.</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='apellidoPaterno'>
                                Apellido paterno
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" onChange={handleChange} id='apellidoPaterno' name='apellidoPaterno' placeholder='Pérez' />
                                {errorApellidoPaterno && <p className="error">Ingrese apellido paterno.</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="apellidoMaterno">
                                Apellido materno
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" onChange={handleChange} id='apellidoMaterno' name='apellidoMaterno' placeholder='Martínez' />
                                {errorApellidoMaterno && <p className="error">Ingrese apellido materno.</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="correoElectronico">
                                Correo electrónico
                            </Form.Label>
                            <Col>
                                <Form.Control type="email" onChange={handleChange} id='correoElectronico' name='correoElectronico' placeholder='eljuancho@undominio.cl' />
                                {errorCorreo && <p className="error">Ingrese correo electrónico válido.</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="contrasena">
                                Contraseña
                            </Form.Label>
                            <Col>
                                <Form.Control type="password" onChange={handleChange} id='contrasena' name='contrasena' placeholder='Crea una contraseña segura' />
                                {errorContrasena && <p className="error">Cree una contraseña.</p>}
                            </Col>
                        </Form.Group>

                        <Form.Group>
                            <Col className="d-flex justify-content-center">
                                <Button variant='primary' size='lg' type="submit">Crear cuenta</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Modal className='user-register-modal' show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalMessage}</p>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default CrearCuenta;