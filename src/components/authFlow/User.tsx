import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../states/authSlice';
import { Row, Col, Button, Card, Modal } from "react-bootstrap";
import { ICreateUserResponse } from '../../interfaces/ICreateUser';
import { jwtDecode } from 'jwt-decode';
import { configuracion } from '../../config/appConfiguration';
import { useFetchGetAddressEnvioFacturacion, useFetchGeUser } from '../../hooks/useFetchUser';
import { IDireccion } from '../../interfaces/IDireccion';
import useFetchGetOrders from '../../hooks/useFetchGetOrders';
import { IPedido } from '../../interfaces/IPedido';

const UserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleOpenModal = () => setShowDeleteModal(true);
    const handleCloseModal = () => setShowDeleteModal(false);

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/');
    }

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
    const decodedToken = jwtDecode<{ idUsuario: number; rol: string; exp: number }>(loggedInUser.token);

    const { data: userData, loading: loadingUser, error: errorUser } = useFetchGeUser<ICreateUserResponse>(configuracion.urlJsonServerBackendUsers, decodedToken.idUsuario);
    const { dataEnvio: addressesEnvio, dataFacturacion: addressesFacturacion, loading: loadingAddress, error: errorAddress } = useFetchGetAddressEnvioFacturacion<IDireccion[]>(configuracion.urlJsonServerBackendUsers, decodedToken.idUsuario);
    const { pedidos, loading: loadingOrders, error: errorOrders } = useFetchGetOrders<IPedido[]>(configuracion.urlJsonServerBackendPurchases, loggedInUser.token);

    const handleDeleteAccount = async () => {
        const url = configuracion.urlJsonServerBackendUsers.toString().concat(`/${decodedToken.idUsuario}`);
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${loggedInUser.token}`,
                },
            });

            if (response.ok) {
                alert("Tu cuenta ha sido eliminada exitosamente.");
                localStorage.removeItem("__redux__user__");
                dispatch(logoutAction());
                navigate("/");
            } else {
                alert("Hubo un problema al eliminar tu cuenta. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error eliminando la cuenta:", error);
            alert("Ocurrió un error inesperado.");
        } finally {
            handleCloseModal();
        }
    };

    if (loadingUser) return <p>Cargando datos del usuario...</p>
    if (errorUser) return <p>Error en la consulta de datos del usuario {errorUser}</p>

    if (loadingAddress) return <p>Cargando datos de las direcciones del usuario...</p>
    if (errorAddress) return <p>Error en la consulta de las direcciones del usuario {errorAddress}</p>

    if (loadingOrders) return <p>Cargando historial de pedidos...</p>;
    if (errorOrders) return <p>Error en la carga de pedidos: {errorOrders}</p>;

    return (
        <>
            <div className="userPage-container p-4">
                <div className="account-header-user">
                    <h1 className='title-user'>Bienvenido/a de vuelta</h1>
                    <Button variant="none" className="logout-button" onClick={handleLogout}>
                        Cerrar sesión
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM17.9882 6.42421C18.3487 6.7847 18.3487 7.36916 17.9882 7.72964L13.7178 12L17.9882 16.2704C18.3487 16.6309 18.3487 17.2153 17.9882 17.5758C17.6277 17.9363 17.0432 17.9363 16.6828 17.5758L12.4124 13.3054L8.14205 17.5758C7.78156 17.9363 7.1971 17.9363 6.83662 17.5758C6.47614 17.2153 6.47614 16.6309 6.83662 16.2704L11.107 12L6.83662 7.72964C6.47613 7.36916 6.47614 6.7847 6.83662 6.42421C7.1971 6.06373 7.78156 6.06373 8.14205 6.42421L12.4124 10.6946L16.6828 6.42421C17.0433 6.06373 17.6277 6.06373 17.9882 6.42421Z" fill="currentColor" />
                        </svg>
                    </Button>
                </div>

                <Row className="account-user-cuenta-direccion">
                    <Col md={5}>
                        <Card className="datos-cuenta">
                            <h2 className="mb-3 title-detail-user">Datos de la cuenta</h2>
                            {userData ? (
                                <>
                                    <p className="detail-text-user"><b>Nombre completo:</b> {userData.nombres} {userData.apellidoPaterno} {userData.apellidoMaterno} </p>
                                    <p className="detail-text-user"><b>Correo electrónico:</b> {userData.correoElectronico}</p>

                                </>
                            ) : (
                                <div>No se encontraron datos del usuario.</div>
                            )}
                        </Card>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={2}>
                        <Button variant="none" className='edit-datos-button' onClick={() => handleNavigation("/user/edit/${idUsuario}")}>
                            Editar datos
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.517 0.270363C18.1565 -0.090121 17.572 -0.090121 17.2115 0.270363L13.3187 4.16322C13.3129 4.16868 13.3072 4.17423 13.3016 4.17986C13.296 4.1855 13.2904 4.19119 13.285 4.19693L0.270363 17.2115C0.0972524 17.3847 0 17.6194 0 17.8643V23.0769C0 23.5867 0.413276 24 0.923077 24H6.13575C6.38056 24 6.61535 23.9027 6.78846 23.7296L23.7296 6.78846C24.0901 6.42798 24.0901 5.84352 23.7296 5.48303L18.517 0.270363ZM13.9545 6.13822L1.84615 18.2466V22.1538H5.7534L17.8618 10.0455L13.9545 6.13822ZM19.1672 8.74003L21.7715 6.13575L17.8643 2.22851L15.26 4.83279L19.1672 8.74003Z" fill="currentColor" />
                            </svg>
                        </Button>
                    </Col>
                    <Col md={4}></Col>
                </Row>

                <Row className="account-user-cuenta-direccion">
                    <Col md={5}>
                        <Card className="datos-cuenta">
                            <h2 className="mb-3 title-detail-user">Tus direcciones</h2>

                            <p className="detail-text-user"><b>Dirección de despacho actual:</b></p>
                            {addressesEnvio && addressesEnvio.length > 0 ? (
                                addressesEnvio.map((item) => (
                                    <p key={item.idDireccion}>
                                        {item.calle} {item.numeroCalle}, {item.ciudad}, {item.comuna}, {item.region}.
                                    </p>
                                ))
                            ) : (
                                <div>
                                    <p className="detail-text-user">No tienes una dirección de envío registrada.</p>
                                </div>
                            )}

                            <p className="detail-text-user"><b>Dirección de facturación:</b></p>
                            {addressesFacturacion && addressesFacturacion.length > 0 ? (
                                addressesFacturacion.map((itemF) => (
                                    <p key={itemF.idDireccion}>
                                        {itemF.calle} {itemF.numeroCalle}, {itemF.ciudad}, {itemF.comuna}, {itemF.region}.
                                    </p>
                                ))
                            ) : (
                                <div>
                                    <p className="detail-text-user">No tienes una dirección de facturación registrada.</p>
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={2}>
                        <div className="d-flex flex-column gap-2">
                            <Link to={`/user/address`}>
                                <Button variant="none" className="gestionar-direcciones-button">
                                    Gestionar direcciones
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.3643 0.22807C11.7336 -0.0760233 12.2665 -0.0760232 12.6357 0.22807L23.6357 9.28689C23.8664 9.47685 24 9.76001 24 10.0588V23C24 23.5523 23.5523 24 23 24H16.125C15.5727 24 15.125 23.5523 15.125 23V17.8235C15.125 17.0794 14.8114 16.3524 14.2314 15.8065C13.6494 15.2587 12.8476 14.9412 12 14.9412C11.1523 14.9412 10.3506 15.2587 9.76855 15.8065C9.18856 16.3524 8.87501 17.0793 8.87501 17.8235V23C8.87501 23.5523 8.42729 24 7.87501 24H1.00001C0.447729 24 1.43647e-05 23.5523 1.37687e-05 23L0 10.0588C-3.57627e-07 9.76001 0.133629 9.47685 0.364293 9.28689L11.3643 0.22807ZM2 10.5307L2.00001 22H6.87501V17.8235C6.87501 16.5083 7.43066 15.2604 8.39784 14.3501L8.39784 14.3501C9.36295 13.4418 10.6596 12.9412 12 12.9412C13.3403 12.9412 14.6371 13.4418 15.6022 14.3501C16.5693 15.2604 17.125 16.5085 17.125 17.8235V22H22V10.5307L12 2.29545L2 10.5307Z" fill="currentColor" />
                                    </svg>
                                </Button>
                            </Link>
                        </div>
                    </Col>
                    <Col md={4}></Col>
                </Row>

                <Row>
                    <Col md={5} className="account-user-privacidad">
                        <h2 className="mb-3 title-detail-user">Privacidad</h2>
                        <p className="detail-text-user"><b>Contraseña:</b></p>
                        <p className="detail-text-user">************</p>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={2}>
                        <div className="d-flex flex-column gap-2">
                            <Button variant="none" className='gestionar-privacidad-button' onClick={() => handleNavigation("/user/edit/${idUsuario}")}>
                                Gestionar privacidad
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 6V4M12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10M12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10M6 18C7.10457 18 8 17.1046 8 16C8 14.8954 7.10457 14 6 14M6 18C4.89543 18 4 17.1046 4 16C4 14.8954 4.89543 14 6 14M6 18V20M6 14V4M12 10V20M18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14M18 18C16.8954 18 16 17.1046 16 16C16 14.8954 16.8954 14 18 14M18 18V20M18 14V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>
                        </div>
                    </Col>
                    <Col md={4}></Col>
                </Row>

                {/* <<<<<<<<<<<<<<< HISTORIAL DE PEDIDOS >>>>>>>>>>>>>>> */}

                <Row style={{ marginTop: '56px' }}>
                    <Col md={5} className="account-user-privacidad">
                        <h2 className="mb-3 title-detail-user">Historial de pedidos</h2>
                        {pedidos && pedidos.length > 0 ? (
                            pedidos.map((pedido) => (
                                <div key={pedido.id}>
                                    <p className="detail-text-user"><b>Pedido N°{pedido.id}:</b></p>
                                    <p className="detail-text-user"><b>Estado:</b> {pedido.estatusCompra}</p>
                                    <p className="detail-text-user"><b>Fecha de compra:</b> {new Date(pedido.fechaCompra).toLocaleDateString()}</p>
                                    <p className="detail-text-user"><b>Fecha de entrega:</b> {new Date(pedido.fechaEntrega).toLocaleDateString()}</p>
                                    <p className="detail-text-user"><b>Dirección de entrega:</b> {pedido.direccion.calle} {pedido.direccion.numero_calle}, {pedido.direccion.nombre_ciudad}, {pedido.direccion.nombre_region}</p>
                                    <p className="detail-text-user"><b>Libros:</b></p>
                                    <ul>
                                        {pedido.libroCompra.map((libro, index) => (
                                            <li className="detail-text-user" style={{ marginLeft: '40px' }} key={index}>{libro.cantidad} x ISBN {libro.isbn} - ${libro.precioFinal.toLocaleString()}</li>
                                        ))}
                                    </ul>
                                    <p className="detail-text-user"><b>Total pedido:</b> ${pedido.total.toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="detail-text-user">No tienes pedidos recientes.</p>
                        )}

                    </Col>
                    <Col md={1}></Col>
                    <Col md={2}>
                        <div className="d-flex flex-column gap-2">
                            <Button variant="none" className='gestionar-privacidad-button'>
                                Gestionar pedidos
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 6V4M12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10M12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10M6 18C7.10457 18 8 17.1046 8 16C8 14.8954 7.10457 14 6 14M6 18C4.89543 18 4 17.1046 4 16C4 14.8954 4.89543 14 6 14M6 18V20M6 14V4M12 10V20M18 18C19.1046 18 20 17.1046 20 16C20 14.8954 19.1046 14 18 14M18 18C16.8954 18 16 17.1046 16 16C16 14.8954 16.8954 14 18 14M18 18V20M18 14V4" stroke="#FBFBFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>
                        </div>
                    </Col>
                    <Col md={4}></Col>
                </Row>

                <Row style={{ marginTop: '24px' }}>
                    <Col md={5} className="account-user-delete-account">
                        <Button className="delete-account-user" onClick={handleOpenModal}>
                            Eliminar cuenta
                        </Button>
                    </Col>
                </Row>

                {/* Modal de confirmación para eliminar cuenta*/}
                <Modal show={showDeleteModal} onHide={handleCloseModal} centered className="custom-modal">
                    <Modal.Header closeButton className="custom-modal-header"/>
                    <Modal.Body className="custom-modal-body">
                        <div className="d-flex flex-column align-items-center">
                            <p className="title-modal-user-account">¿Estás seguro de que deseas eliminar tu cuenta?</p>
                            <p className="detail-modal-user-account">Esta acción no se puede deshacer.</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="custom-modal-footer">
                        <Button onClick={handleCloseModal} className="cancel-delete-account-user-button">
                            Cancelar
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604M18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604M18.364 18.364L5.63604 5.63604" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                        <Button onClick={handleDeleteAccount} className="confirm-delete-account-user-button">
                            Eliminar cuenta
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1775 0C8.22434 0 6.6125 1.56452 6.6125 3.52941V3.9095H3.565H0.92C0.411898 3.9095 0 4.32278 0 4.83258C0 5.34238 0.411898 5.75565 0.92 5.75565H2.645V20.4706C2.645 22.4355 4.25685 24 6.21 24H16.79C18.7432 24 20.355 22.4355 20.355 20.4706V5.75565H22.08C22.5881 5.75565 23 5.34238 23 4.83258C23 4.32278 22.5881 3.9095 22.08 3.9095H19.435H16.3875V3.52941C16.3875 1.56453 14.7757 0 12.8225 0H10.1775ZM15.4649 5.75565C15.4658 5.75566 15.4666 5.75566 15.4675 5.75566C15.4684 5.75566 15.4692 5.75566 15.4701 5.75565H18.515V20.4706C18.515 21.3846 17.7585 22.1538 16.79 22.1538H6.21C5.24156 22.1538 4.485 21.3846 4.485 20.4706V5.75565H7.52993C7.53079 5.75566 7.53164 5.75566 7.5325 5.75566C7.53336 5.75566 7.53421 5.75566 7.53507 5.75565H15.4649ZM14.5475 3.9095V3.52941C14.5475 2.61541 13.791 1.84615 12.8225 1.84615H10.1775C9.20907 1.84615 8.4525 2.61542 8.4525 3.52941V3.9095H14.5475ZM8.855 9.12218C9.3631 9.12218 9.775 9.53545 9.775 10.0453V17.8643C9.775 18.3741 9.3631 18.7873 8.855 18.7873C8.3469 18.7873 7.935 18.3741 7.935 17.8643V10.0453C7.935 9.53545 8.3469 9.12218 8.855 9.12218ZM14.145 9.12218C14.6531 9.12218 15.065 9.53545 15.065 10.0453V17.8643C15.065 18.3741 14.6531 18.7873 14.145 18.7873C13.6369 18.7873 13.225 18.3741 13.225 17.8643V10.0453C13.225 9.53545 13.6369 9.12218 14.145 9.12218Z" fill="currentColor" />
                            </svg>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default UserPage;