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
import  '../../styles/admin-user-modify.css'

const AdminCreateUser = () => {
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
                const response = await fetch(configuracion.urlJsonServerBackendSignUp, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    const data = await response.json();
                    setModalTitle('Usuario creado con éxito');
                    setModalMessage('Serás redirigido al panel de administración al cerrar este mensaje.');
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
                    setModalTitle('Algo salió mal');
                    setModalMessage(errorData.error.message);
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
            navigate('/admin'); // Redirige solo si el estado lo indica
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Container className="create-user-container">

            <h3>Crear usuario</h3>

            <Row className='d-flex justify-content-center align-content-center'>
                <Col lg={5} className='create-user-form'>
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
                                <Button variant='primary' size='lg' type="submit">Crear usuario</Button>
                            </Col>
                            <Col className="cancel-user-modify">
                                <Button variant='secondary' size='lg' onClick={() => handleNavigation("/admin/userslist")}>
                                    Cancelar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM17.9882 6.42421C18.3487 6.7847 18.3487 7.36916 17.9882 7.72964L13.7178 12L17.9882 16.2704C18.3487 16.6309 18.3487 17.2153 17.9882 17.5758C17.6277 17.9363 17.0432 17.9363 16.6828 17.5758L12.4124 13.3054L8.14205 17.5758C7.78156 17.9363 7.1971 17.9363 6.83662 17.5758C6.47614 17.2153 6.47614 16.6309 6.83662 16.2704L11.107 12L6.83662 7.72964C6.47613 7.36916 6.47614 6.7847 6.83662 6.42421C7.1971 6.06373 7.78156 6.06373 8.14205 6.42421L12.4124 10.6946L16.6828 6.42421C17.0433 6.06373 17.6277 6.06373 17.9882 6.42421Z" fill="currentColor" />
                                    </svg>
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Modal className='admin-user-register-modal' show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <p className="id-user-admin-userList">{modalTitle}</p>
                    <p className="nombre-user-admin-userList">{modalMessage}</p>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminCreateUser;