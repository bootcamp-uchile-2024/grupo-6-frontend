/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { configuracion } from '../config/appConfiguration';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/user_modify.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correoElectronico: '',
        contrasena: '',
    });
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');

    // Cargar los datos actuales del usuario
    useEffect(() => {
        const fetchUser = async () => {
            const url = `${configuracion.urlJsonServerBackendUsers}/${loggedInUser.idUsuario}`;
            try {
                const result = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loggedInUser.token}`,
                    },
                });

                if (result.ok) {
                    const data = await result.json();
                    setUserData(data);
                    console.log(data);
                } else {
                    console.error('Error al obtener los datos del usuario');
                }
            } catch (error) {
                console.error('Error al conectarse con el backend:', error);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Solo pasamos los datos necesarios, sin el idUsuario
        const { contrasena, nombres, apellidoPaterno, apellidoMaterno } = userData;

        // Si la contraseña está vacía, no la enviamos
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bodyData: any = {
            nombres,
            apellidoPaterno,
            apellidoMaterno,
        };

        if (contrasena) {
            bodyData.contrasena = contrasena;
        }

        const url = `${configuracion.urlJsonServerBackendUsers}`;
        try {
            const result = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser.token}`,
                },
                body: JSON.stringify(bodyData),
            });

            if (result.ok) {
                console.log('Datos del usuario actualizados');
                navigate('/user'); // Redirige a la página del perfil
            } else {
                console.error('Error al actualizar los datos del usuario');
            }
        } catch (error) {
            console.error('Error al conectarse con el backend:', error);
        }
    };


    return (
        <Container className="py-5">
            <h2 className="title-user-modify">Editar Perfil</h2>
            <Form onSubmit={handleEdit}>
                <Row className="mb-3">
                    <Col md={6} className="form-user-modify">
                        <Form.Group>
                            <Form.Label htmlFor="nombres">Nombres</Form.Label>
                            <Form.Control
                                type="text"
                                id="nombres"
                                name="nombres"
                                value={userData.nombres}
                                onChange={handleChange}
                                placeholder={userData.nombres}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6} className="form-user-modify">
                        <Form.Group>
                            <Form.Label htmlFor="apellidoPaterno">Apellido paterno</Form.Label>
                            <Form.Control
                                type="text"
                                id="apellidoPaterno"
                                name="apellidoPaterno"
                                value={userData.apellidoPaterno}
                                onChange={handleChange}
                                placeholder={userData.apellidoPaterno}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6} className="form-user-modify">
                        <Form.Group>
                            <Form.Label htmlFor="apellidoMaterno">Apellido Materno</Form.Label>
                            <Form.Control
                                type="text"
                                id="apellidoMaterno"
                                name="apellidoMaterno"
                                value={userData.apellidoMaterno}
                                onChange={handleChange}
                                placeholder={userData.apellidoMaterno}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6} className="form-user-modify">
                        <Form.Group>
                            <Form.Label htmlFor="correoElectronico">Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                id="correoElectronico"
                                name="correoElectronico"
                                value={userData.correoElectronico}
                                placeholder={userData.correoElectronico}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="container-buttons-account-modify">
                        <Button className="delete-account-user-modify">
                            Eliminar cuenta
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.1775 0C8.22434 0 6.6125 1.56452 6.6125 3.52941V3.9095H3.565H0.92C0.411898 3.9095 0 4.32278 0 4.83258C0 5.34238 0.411898 5.75565 0.92 5.75565H2.645V20.4706C2.645 22.4355 4.25685 24 6.21 24H16.79C18.7432 24 20.355 22.4355 20.355 20.4706V5.75565H22.08C22.5881 5.75565 23 5.34238 23 4.83258C23 4.32278 22.5881 3.9095 22.08 3.9095H19.435H16.3875V3.52941C16.3875 1.56453 14.7757 0 12.8225 0H10.1775ZM15.4649 5.75565C15.4658 5.75566 15.4666 5.75566 15.4675 5.75566C15.4684 5.75566 15.4692 5.75566 15.4701 5.75565H18.515V20.4706C18.515 21.3846 17.7585 22.1538 16.79 22.1538H6.21C5.24156 22.1538 4.485 21.3846 4.485 20.4706V5.75565H7.52993C7.53079 5.75566 7.53164 5.75566 7.5325 5.75566C7.53336 5.75566 7.53421 5.75566 7.53507 5.75565H15.4649ZM14.5475 3.9095V3.52941C14.5475 2.61541 13.791 1.84615 12.8225 1.84615H10.1775C9.20907 1.84615 8.4525 2.61542 8.4525 3.52941V3.9095H14.5475ZM8.855 9.12218C9.3631 9.12218 9.775 9.53545 9.775 10.0453V17.8643C9.775 18.3741 9.3631 18.7873 8.855 18.7873C8.3469 18.7873 7.935 18.3741 7.935 17.8643V10.0453C7.935 9.53545 8.3469 9.12218 8.855 9.12218ZM14.145 9.12218C14.6531 9.12218 15.065 9.53545 15.065 10.0453V17.8643C15.065 18.3741 14.6531 18.7873 14.145 18.7873C13.6369 18.7873 13.225 18.3741 13.225 17.8643V10.0453C13.225 9.53545 13.6369 9.12218 14.145 9.12218Z" fill="currentColor" />
                            </svg>
                        </Button>
                        <Button className="change-password-user-modify">
                            Cambiar contraseña
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.517 0.270363C18.1565 -0.090121 17.572 -0.090121 17.2115 0.270363L13.3187 4.16322C13.3129 4.16868 13.3072 4.17423 13.3016 4.17986C13.296 4.1855 13.2904 4.19119 13.285 4.19693L0.270363 17.2115C0.0972524 17.3847 0 17.6194 0 17.8643V23.0769C0 23.5867 0.413276 24 0.923077 24H6.13575C6.38056 24 6.61535 23.9027 6.78846 23.7296L23.7296 6.78846C24.0901 6.42798 24.0901 5.84352 23.7296 5.48303L18.517 0.270363ZM13.9545 6.13822L1.84615 18.2466V22.1538H5.7534L17.8618 10.0455L13.9545 6.13822ZM19.1672 8.74003L21.7715 6.13575L17.8643 2.22851L15.26 4.83279L19.1672 8.74003Z" fill="currentColor" />
                            </svg>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="d-flex container-buttons-action-user-modify">
                        <Button variant="outline-secondary" onClick={() => navigate('/user')} className="cancelar-user-modify">
                            Cancelar
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM17.9882 6.42421C18.3487 6.7847 18.3487 7.36916 17.9882 7.72964L13.7178 12L17.9882 16.2704C18.3487 16.6309 18.3487 17.2153 17.9882 17.5758C17.6277 17.9363 17.0432 17.9363 16.6828 17.5758L12.4124 13.3054L8.14205 17.5758C7.78156 17.9363 7.1971 17.9363 6.83662 17.5758C6.47614 17.2153 6.47614 16.6309 6.83662 16.2704L11.107 12L6.83662 7.72964C6.47613 7.36916 6.47614 6.7847 6.83662 6.42421C7.1971 6.06373 7.78156 6.06373 8.14205 6.42421L12.4124 10.6946L16.6828 6.42421C17.0433 6.06373 17.6277 6.06373 17.9882 6.42421Z" fill="currentColor" />
                            </svg>
                        </Button>
                        <Button
                            onClick={handleEdit}
                            variant="primary"
                            type="submit"
                            className="change-cambios-user-modify">
                            Guardar cambios
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM19.2184 8.96041C19.5789 8.59992 19.5789 8.01546 19.2184 7.65498C18.858 7.2945 18.2735 7.29449 17.913 7.65498L9.95032 15.6177L6.91067 12.5781C6.55019 12.2176 5.96573 12.2176 5.60524 12.5781C5.24476 12.9385 5.24477 13.523 5.60525 13.8835L9.29761 17.5758C9.65809 17.9363 10.2425 17.9363 10.603 17.5758L19.2184 8.96041Z" fill="currentColor" />
                            </svg>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default UserProfile;
