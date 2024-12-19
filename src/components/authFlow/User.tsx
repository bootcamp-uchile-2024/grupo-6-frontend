import { Link, useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../states/authSlice';
import { Row, Col, Button, Card } from "react-bootstrap";
import { ICreateUserResponse } from '../../interfaces/ICreateUser';
import { jwtDecode } from 'jwt-decode';
import { configuracion } from '../../config/appConfiguration';
import {  useFetchGetAddressEnvioFacturacion, useFetchGeUser } from '../../hooks/useFetchUser';
import { IDireccion } from '../../interfaces/IDireccion';

const UserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/');
    }
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
    const decodedToken = jwtDecode<{ idUsuario: number; rol: string; exp: number }>(loggedInUser.token);

    const { data: userData, loading: loadingUser, error: errorUser } = useFetchGeUser<ICreateUserResponse>(configuracion.urlJsonServerBackendUsers, decodedToken.idUsuario);
    const { dataEnvio: addressesEnvio, dataFacturacion: addressesFacturacion, loading: loadingAddress, error: errorAddress } = useFetchGetAddressEnvioFacturacion<IDireccion[]>(configuracion.urlJsonServerBackendUsers, decodedToken.idUsuario);

    if (loadingUser) return <p>Cargando datos del usuario...</p>
    if (errorUser) return <p>Error en la consulta de datos del usuario {errorUser}</p>

    if (loadingAddress) return <p>Cargando datos de las direcciones del usuario...</p>
    if (errorAddress) return <p>Error en la consulta de las direcciones del usuario {errorAddress}</p>

    return (
        <>
            <div className="userPage-container p-4">
                <div className="account-header-user">
                    <h1 className='title-user'>Bienvenido/a de vuelta C:</h1>
                    <Button variant="none" className="logout-button" onClick={handleLogout}> Cerrar sesión</Button>
                </div>

                <div className="account-user-content">
                    <Row className="account-user-cuenta-direccion">
                        <Col md={5}>
                            <Card className="datos-cuenta">
                                <h2 className="mb-3">Datos de la cuenta</h2>
                                {userData ? (
                                    <>
                                        <p><b>Nombre completo:</b> {userData.nombres} {userData.apellidoPaterno} {userData.apellidoMaterno} </p>
                                        <p><b>Correo electrónico:</b> {userData.correoElectronico}</p>

                                    </>
                                ) : (
                                    <div>No se encontraron datos del usuario.</div>
                                )}
                            </Card>
                        </Col>
                        <Col md={1}></Col>
                        <Col md={2}>
                            <div className="d-flex flex-column gap-2">
                                <Button variant="none" className='edit-dato-button'>
                                    Editar datos
                                </Button>
                            </div>
                        </Col>
                        <Col md={4}></Col>

                    </Row>

                    <Row className="account-user-cuenta-direccion">
                        <Col md={5}>
                            <Card className="datos-cuenta">
                                <h2 className="mb-3">Tus direcciones</h2>

                                <p><b>Dirección de despacho actual:</b></p>
                                {addressesEnvio ? (addressesEnvio.map((item) => (
                                    <>
                                        <><p>{item.calle} {item.numeroCalle}, {item.ciudad}, {item.comuna}, {item.region}.</p></>

                                    </>
                                ))) :
                                    (
                                        <><p>No existen direcciones de envio.</p></>
                                    )}

                                <p><b>Dirección de facturacion:</b></p>
                                {addressesFacturacion ? (addressesFacturacion.map((itemF) => (
                                    <>
                                        <p>{itemF.calle} {itemF.numeroCalle}, {itemF.ciudad}, {itemF.comuna}, {itemF.region}.</p>

                                    </>
                                ))) :
                                    (
                                        <><p>No existen direcciones de facturación.</p></>
                                    )}

                            </Card>
                        </Col>
                        <Col md={1}></Col>
                        <Col md={2}>
                            <div className="d-flex flex-column gap-2">
                                <Link to={`/user/address`}>

                                    <Button variant="none" className='direcciones-button'>
                                        Gestionar direcciones

                                    </Button>
                                </Link>
                            </div>
                        </Col>
                        <Col md={4}></Col>

                    </Row>
                </div>

            </div>
        </>
    );
};

export default UserPage;