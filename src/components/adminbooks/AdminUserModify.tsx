/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { configuracion } from '../../config/appConfiguration';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../styles/admin-user-modify.css'

type UserData = {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correoElectronico: string;
};

const AdminUserModify = () => {
    const { idUsuario } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState<UserData>({
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correoElectronico: '',
        /* contrasena: '' */
    });

    const [initialData, setInitialData] = useState<UserData>({
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correoElectronico: '',
    });

    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');

    // Cargar los datos actuales del usuario
    useEffect(() => {
        const fetchUser = async () => {
            const url = configuracion.urlJsonServerBackendUsers.toString().concat(`/${idUsuario}`);
            console.log(url);
            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser.token}`
                }
            });
            if (result.ok) {
                const data = await result.json();
                setUserData(data);
                setInitialData(data);
            }
        };
        fetchUser();
    }, [idUsuario]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedFields: {
            nombres?: string;
            apellidoPaterno?: string;
            apellidoMaterno?: string;
            correoElectronico?: string;
        } = {};

        if (userData.nombres !== initialData.nombres) updatedFields.nombres = userData.nombres;
        if (userData.apellidoPaterno !== initialData.apellidoPaterno) updatedFields.apellidoPaterno = userData.apellidoPaterno;
        if (userData.apellidoMaterno !== initialData.apellidoMaterno) updatedFields.apellidoMaterno = userData.apellidoMaterno;
        if (userData.correoElectronico !== initialData.correoElectronico) updatedFields.correoElectronico = userData.correoElectronico;

        if (Object.keys(updatedFields).length === 0) {
            alert("No se detectaron cambios para guardar.");
            return;
        }

        const url = configuracion.urlJsonServerBackendUsers.toString().concat(`/${idUsuario}/admin`);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loggedInUser.token}`
            },
            body: JSON.stringify(updatedFields)
        });

        if (response.ok) {
            setShowModal(true); // Mostrar el modal de éxito
        } else {
            alert("Ocurrió un error al actualizar los datos del usuario.");
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/admin/userslist'); // Redirigir al cerrar el modal
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Container className="modify-user-container">
            <h3>Modifica los datos del usuario</h3>

            <Row className='d-flex justify-content-center align-content-center'>
                <Col lg={5} className='modify-user-form'>
                    <Form onSubmit={handleEdit}>
                        <Form.Group className="mb-3">
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

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="apellidoPaterno">Apellido Paterno</Form.Label>
                            <Form.Control
                                type="text"
                                id="apellidoPaterno"
                                name="apellidoPaterno"
                                value={userData.apellidoPaterno}
                                onChange={handleChange}
                                placeholder={userData.apellidoPaterno}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
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

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="correoElectronico">Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                id="correoElectronico"
                                name="correoElectronico"
                                value={userData.correoElectronico}
                                onChange={handleChange}
                                placeholder={userData.correoElectronico}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Col className="d-flex justify-content-center">
                                <Button variant='primary' size='lg' type="submit">Guardar Cambios
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM17.3349 4.92307C17.8447 4.92307 18.258 5.33635 18.258 5.84615V9.50382C18.2655 9.6997 18.2109 9.89951 18.0889 10.0719C17.9686 10.2417 17.8015 10.3586 17.6174 10.4175C17.5618 10.4354 17.5039 10.4481 17.4442 10.4551C17.4038 10.4599 17.363 10.4621 17.3221 10.4615H13.6426C13.1328 10.4615 12.7195 10.0483 12.7195 9.53846C12.7195 9.02866 13.1328 8.61538 13.6426 8.61538H14.4889C13.987 8.31663 13.4966 8.11309 12.9701 8.03903C12.1113 7.9182 11.2365 8.07973 10.4773 8.49931C9.71834 8.91889 9.11619 9.57381 8.76174 10.3652C8.4073 11.1567 8.31969 12.042 8.51213 12.8876C8.70457 13.7332 9.16662 14.4933 9.82873 15.0535C10.4909 15.6137 11.3171 15.9436 12.1828 15.9934C13.0488 16.0432 13.9074 15.8103 14.6294 15.3298C15.3513 14.8493 15.8977 14.147 16.1859 13.3292C16.3553 12.8483 16.8824 12.5959 17.3632 12.7653C17.8441 12.9348 18.0965 13.4619 17.9271 13.9427C17.5059 15.1381 16.7074 16.1644 15.6524 16.8666C14.5972 17.5689 13.3423 17.9093 12.0768 17.8365C10.8114 17.7637 9.60387 17.2816 8.63625 16.4628C7.66865 15.6441 6.99328 14.5332 6.712 13.2973C6.43074 12.0614 6.5588 10.7675 7.07684 9.61065C7.5949 8.4539 8.47494 7.49677 9.58422 6.88356C10.6936 6.2704 11.9721 6.03428 13.2273 6.21088C14.2604 6.35622 15.1204 6.80506 15.8599 7.29889C16.0486 7.42494 16.2328 7.55625 16.4118 7.68825V5.84615C16.4118 5.33635 16.8251 4.92307 17.3349 4.92307Z" fill="currentColor" />
                                    </svg>
                                </Button>
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
            </Row >

            {/* Modal de éxito */}
            <Modal className="successful-change-modal-admin" show={showModal} onHide={handleModalClose} centered>
                <Modal.Header className="custom-modal-header" closeButton>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                    <p className="title-modal-product-edit">Cambios Guardados</p>
                    <p className="detail-modal-product-edit">Los cambios se realizaron con éxito.</p>
                </Modal.Body>
            </Modal>
        </Container >
    );
};

export default AdminUserModify;
