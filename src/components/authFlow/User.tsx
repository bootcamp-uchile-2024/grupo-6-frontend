import { Link, useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../states/authSlice';
import { Row, Col, Button, Card } from "react-bootstrap";
import { ICreateUserResponse } from '../../interfaces/ICreateUser';
import { jwtDecode } from 'jwt-decode';
import { configuracion } from '../../config/appConfiguration';
import { useFetchGetAddressEnvioFacturacion, useFetchGeUser } from '../../hooks/useFetchUser';
import { IDireccion } from '../../interfaces/IDireccion';

const UserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    if (loadingUser) return <p>Cargando datos del usuario...</p>
    if (errorUser) return <p>Error en la consulta de datos del usuario {errorUser}</p>

    if (loadingAddress) return <p>Cargando datos de las direcciones del usuario...</p>
    if (errorAddress) return <p>Error en la consulta de las direcciones del usuario {errorAddress}</p>

    return (
        <>
            <div className="userPage-container p-4">
                <div className="account-header-user">
                    <h1 className='title-user'>Bienvenido/a de vuelta</h1>
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
                                <Button variant="none" className='edit-dato-button' onClick={() => handleNavigation("/user/edit/${idUsuario}")}>
                                    Editar datos
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.517 0.270363C18.1565 -0.090121 17.572 -0.090121 17.2115 0.270363L13.3187 4.16322C13.3129 4.16868 13.3072 4.17423 13.3016 4.17986C13.296 4.1855 13.2904 4.19119 13.285 4.19693L0.270363 17.2115C0.0972524 17.3847 0 17.6194 0 17.8643V23.0769C0 23.5867 0.413276 24 0.923077 24H6.13575C6.38056 24 6.61535 23.9027 6.78846 23.7296L23.7296 6.78846C24.0901 6.42798 24.0901 5.84352 23.7296 5.48303L18.517 0.270363ZM13.9545 6.13822L1.84615 18.2466V22.1538H5.7534L17.8618 10.0455L13.9545 6.13822ZM19.1672 8.74003L21.7715 6.13575L17.8643 2.22851L15.26 4.83279L19.1672 8.74003Z" fill="currentColor" />
                                    </svg>
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
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" className='image-icon'>
                                            <path d="M9 21H4C3.44772 21 3 20.5523 3 20V12.4142C3 12.149 3.10536 11.8946 3.29289 11.7071L11.2929 3.70711C11.6834 3.31658 12.3166 3.31658 12.7071 3.70711L20.7071 11.7071C20.8946 11.8946 21 12.149 21 12.4142V20C21 20.5523 20.5523 21 20 21H15M9 21H15M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21" stroke="#ffffff" stroke-linejoin="round" />
                                        </svg>
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