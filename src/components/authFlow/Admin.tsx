import { Link, useNavigate } from 'react-router-dom';
import '../../styles/admin.css';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../states/authSlice';
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const AdminPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/');
    };

    return (
        <Container className=" adminAccount-container mt-4">
            <div className="adminAccount-header">
                <h1 className='title-adminAccount'>Bienvenido/a, Admin</h1>
                <Button variant="none" className="logout-button" onClick={handleLogout}> Cerrar sesión</Button>
            </div>

            <div className='adminAccount-info-container'>
                <Row className="admin-historial-pedidos mb-4">
                    <Col md={4} clas>
                        <Card className='card-admin-historialPedidos'>
                            <Card.Header className="title-card-admin-historialPedidos">Historial de pedidos</Card.Header>
                            <Card.Body className="container-card-admin-historialPedido">
                                <div className="detalle-card-admin-historialPedido">
                                    <ul>
                                        <li>Se han cambiado los datos del ISBN 123456</li>
                                        <li>Se despachó el pedido 2401234</li>
                                        <li>Se ha cambiado la información de un usuario</li>
                                    </ul>
                                </div>
                                <div className="button-admin-historialPedido text-center mt-3">
                                    <Button variant="none" >
                                        Revisar el historial completo
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM17.3349 4.92307C17.8447 4.92307 18.258 5.33635 18.258 5.84615V9.50382C18.2655 9.6997 18.2109 9.89951 18.0889 10.0719C17.9686 10.2417 17.8015 10.3586 17.6174 10.4175C17.5618 10.4354 17.5039 10.4481 17.4442 10.4551C17.4038 10.4599 17.363 10.4621 17.3221 10.4615H13.6426C13.1328 10.4615 12.7195 10.0483 12.7195 9.53846C12.7195 9.02866 13.1328 8.61538 13.6426 8.61538H14.4889C13.987 8.31663 13.4966 8.11309 12.9701 8.03903C12.1113 7.9182 11.2365 8.07973 10.4773 8.49931C9.71834 8.91889 9.11619 9.57381 8.76174 10.3652C8.4073 11.1567 8.31969 12.042 8.51213 12.8876C8.70457 13.7332 9.16662 14.4933 9.82873 15.0535C10.4909 15.6137 11.3171 15.9436 12.1828 15.9934C13.0488 16.0432 13.9074 15.8103 14.6294 15.3298C15.3513 14.8493 15.8977 14.147 16.1859 13.3292C16.3553 12.8483 16.8824 12.5959 17.3632 12.7653C17.8441 12.9348 18.0965 13.4619 17.9271 13.9427C17.5059 15.1381 16.7074 16.1644 15.6524 16.8666C14.5972 17.5689 13.3423 17.9093 12.0768 17.8365C10.8114 17.7637 9.60387 17.2816 8.63625 16.4628C7.66865 15.6441 6.99328 14.5332 6.712 13.2973C6.43074 12.0614 6.5588 10.7675 7.07684 9.61065C7.5949 8.4539 8.47494 7.49677 9.58422 6.88356C10.6936 6.2704 11.9721 6.03428 13.2273 6.21088C14.2604 6.35622 15.1204 6.80506 15.8599 7.29889C16.0486 7.42494 16.2328 7.55625 16.4118 7.68825V5.84615C16.4118 5.33635 16.8251 4.92307 17.3349 4.92307Z" fill="currentColor" />
                                        </svg>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className='card-admin-datosCuenta'>
                            <Card.Header className="title-card-admin-datosCuenta">Datos de la cuenta</Card.Header>
                            <Card.Body className="container-card-admin-datosCuenta">
                                <div className="detalle-card-admin-datosCuenta">
                                    <p><b>Nombre completo:</b> Admin</p>
                                    <p><b>Correo electrónico:</b> Admin@paginasselectas.cl</p>
                                    <p><b>Dirección de despacho actual:</b> una dirección, Chile</p>
                                </div>
                                <div className="button-admin-datosCuenta text-center mt-3">
                                    <Button variant="none">
                                        Editar datos de administrador
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.017 0.270363C18.6565 -0.090121 18.072 -0.090121 17.7115 0.270363L13.8187 4.16322C13.8129 4.16868 13.8072 4.17423 13.8016 4.17986C13.796 4.1855 13.7904 4.19119 13.785 4.19693L0.770363 17.2115C0.597252 17.3847 0.5 17.6194 0.5 17.8643V23.0769C0.5 23.5867 0.913276 24 1.42308 24H6.63575C6.88056 24 7.11535 23.9027 7.28846 23.7296L24.2296 6.78846C24.5901 6.42798 24.5901 5.84352 24.2296 5.48303L19.017 0.270363ZM14.4545 6.13822L2.34615 18.2466V22.1538H6.2534L18.3618 10.0455L14.4545 6.13822ZM19.6672 8.74003L22.2715 6.13575L18.3643 2.22851L15.76 4.83279L19.6672 8.74003Z" fill="currentColor" />
                                        </svg>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className='card-admin-administracion'>
                            <Card.Header className="title-card-admin-administracion">Administración</Card.Header>
                            <Card.Body className="container-card-admin-administracion">
                                <div className="buttons-admin-administracion text-center mt-3">
                                    <Button variant="none" className='button-users-administracion'>
                                        <Link to="/admin/userslist">
                                            Usuarios
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0 12C0 5.37259 5.37259 0 12 0C18.6275 0 24 5.37259 24 12C24 18.6275 18.6275 24 12 24C5.37259 24 0 18.6275 0 12ZM12 1.84615C6.39219 1.84615 1.84615 6.39219 1.84615 12C1.84615 14.3805 2.6653 16.5696 4.03709 18.3009C4.23562 17.7294 4.51608 17.1773 4.86848 16.6876C5.62448 15.6371 6.79695 14.7692 8.30769 14.7692H15.6923C17.2031 14.7692 18.3755 15.6371 19.1315 16.6876C19.4839 17.1773 19.7644 17.7294 19.9629 18.3009C21.3347 16.5696 22.1538 14.3805 22.1538 12C22.1538 6.39219 17.6079 1.84615 12 1.84615ZM18.4378 19.8525C18.3578 19.1511 18.0775 18.3836 17.6331 17.766C17.1054 17.0328 16.4318 16.6154 15.6923 16.6154H8.30769C7.56824 16.6154 6.89456 17.0328 6.36695 17.766C5.92246 18.3836 5.64219 19.1511 5.56217 19.8525C7.31429 21.2906 9.55634 22.1538 12 22.1538C14.4437 22.1538 16.6857 21.2906 18.4378 19.8525ZM7.38462 8.30769C7.38462 5.7587 9.45093 3.69231 12 3.69231C14.5491 3.69231 16.6154 5.7587 16.6154 8.30769C16.6154 10.8568 14.5491 12.9231 12 12.9231C9.45094 12.9231 7.38462 10.8568 7.38462 8.30769ZM12 5.53846C10.4705 5.53846 9.23077 6.77828 9.23077 8.30769C9.23077 9.83715 10.4705 11.0769 12 11.0769C13.5295 11.0769 14.7692 9.83715 14.7692 8.30769C14.7692 6.77828 13.5295 5.53846 12 5.53846Z" fill="#455B73" />
                                            </svg>
                                        </Link>
                                    </Button>
                                    <Button variant="none">
                                        <Link to="/admin/product">
                                            Productos
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2 4.8C2 2.14904 4.14904 0 6.8 0H17.6C19.5883 0 21.2 1.61179 21.2 3.6V22.8C21.2 23.4627 20.6627 24 20 24H5.6C3.61179 24 2 22.3883 2 20.4V4.8ZM4.4 17.0048V4.8C4.4 3.47452 5.47452 2.4 6.8 2.4H17.6C18.2628 2.4 18.8 2.93725 18.8 3.6V16.8H5.6C5.17924 16.8 4.77534 16.8722 4.4 17.0048ZM18.8 19.2H5.6C4.93725 19.2 4.4 19.7372 4.4 20.4C4.4 21.0628 4.93725 21.6 5.6 21.6H18.8V19.2ZM8 7.2C8 6.53726 8.53726 6 9.2 6H14C14.6627 6 15.2 6.53726 15.2 7.2C15.2 7.86274 14.6627 8.4 14 8.4H9.2C8.53726 8.4 8 7.86274 8 7.2Z" fill="#455B73" />
                                            </svg>
                                        </Link>
                                    </Button>
                                    <Button variant="none">
                                        Inventario
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M3.03262 0C2.78398 0.0490058 2.60463 0.279119 2.60871 0.545455V15.2727H0.521754C0.505449 15.2727 0.489145 15.2727 0.472841 15.2727C0.203819 15.2983 -0.00202291 15.5348 1.50008e-05 15.8182V18C1.50008e-05 18.3004 0.23439 18.5455 0.521754 18.5455H2.08697V22.6364C2.08697 23.3821 2.678 24 3.39132 24C4.10463 24 4.69566 23.3821 4.69566 22.6364V18.5455H19.3044V22.6364C19.3044 23.3821 19.8954 24 20.6087 24C21.322 24 21.913 23.3821 21.913 22.6364V18.5455H23.4783C23.7656 18.5455 24 18.3004 24 18V15.8182C24 15.5178 23.7656 15.2727 23.4783 15.2727H21.8478C21.8621 15.2003 21.8621 15.1236 21.8478 15.0511L19.2065 3.375C19.1495 3.09375 18.8927 2.90625 18.6196 2.94886C18.6094 2.95313 18.5971 2.95952 18.587 2.96591L16.0435 3.59659C15.8499 3.64347 15.697 3.80327 15.6522 4.00568V3.81818C15.6522 3.51776 15.4178 3.27273 15.1304 3.27273H12V0.545455C12 0.245029 11.7656 0 11.4783 0H7.33697C7.32678 0 7.31455 0 7.30436 0H3.13045C3.11414 0 3.09784 0 3.08153 0C3.06523 0 3.04893 0 3.03262 0ZM3.65219 1.09091H6.78262V15.2727H3.65219V1.09091ZM7.8261 1.09091H10.9565V3.76705C10.9565 3.78409 10.9565 3.80114 10.9565 3.81818V15.2727H7.8261V1.09091ZM4.54892 2.18182C4.26156 2.22443 4.05979 2.50355 4.10056 2.80398C4.14132 3.1044 4.4083 3.31534 4.69566 3.27273H5.73914C5.92664 3.27486 6.10191 3.17259 6.1977 3.00213C6.29145 2.83168 6.29145 2.62287 6.1977 2.45241C6.10191 2.28196 5.92664 2.17969 5.73914 2.18182H4.69566C4.67936 2.18182 4.66305 2.18182 4.64675 2.18182C4.63045 2.18182 4.61414 2.18182 4.59784 2.18182C4.58153 2.18182 4.56523 2.18182 4.54892 2.18182ZM8.72283 2.18182C8.43547 2.22443 8.2337 2.50355 8.27447 2.80398C8.31523 3.1044 8.58221 3.31534 8.86957 3.27273H9.91305C10.1006 3.27486 10.2758 3.17259 10.3716 3.00213C10.4654 2.83168 10.4654 2.62287 10.3716 2.45241C10.2758 2.28196 10.1006 2.17969 9.91305 2.18182H8.86957C8.85327 2.18182 8.83697 2.18182 8.82066 2.18182C8.80436 2.18182 8.78805 2.18182 8.77175 2.18182C8.75544 2.18182 8.73914 2.18182 8.72283 2.18182ZM18.3098 4.14205L18.6359 5.60795C18.5258 5.40128 18.3037 5.29261 18.0815 5.33523C18.0652 5.33949 18.0489 5.34588 18.0326 5.35227L17.5272 5.47159C17.3152 5.50994 17.1481 5.67827 17.1033 5.89773L16.7935 4.51705L18.3098 4.14205ZM15.6522 4.24432L18.1467 15.2727H15.6522V4.24432ZM12 4.36364H14.6087V15.2727H12V4.36364ZM12.8967 5.45455C12.6094 5.49716 12.4076 5.77628 12.4484 6.0767C12.4891 6.37713 12.7561 6.58807 13.0435 6.54545H13.5652C13.7527 6.54759 13.928 6.44531 14.0238 6.27486C14.1175 6.1044 14.1175 5.8956 14.0238 5.72514C13.928 5.55469 13.7527 5.45241 13.5652 5.45455H13.0435C13.0272 5.45455 13.0109 5.45455 12.9946 5.45455C12.9783 5.45455 12.962 5.45455 12.9457 5.45455C12.9294 5.45455 12.913 5.45455 12.8967 5.45455ZM18.7011 5.91477L20.2826 12.9205C20.1664 12.7884 19.9952 12.7266 19.8261 12.75C19.7976 12.7543 19.7711 12.7585 19.7446 12.767C19.7344 12.7713 19.7221 12.7777 19.712 12.7841L19.2065 12.9034C18.9946 12.9418 18.8274 13.1101 18.7826 13.3295L17.2174 6.375C17.356 6.53693 17.5741 6.59659 17.7717 6.52841L18.2772 6.40909C18.5095 6.36222 18.6827 6.1598 18.7011 5.91477ZM4.54892 13.0909C4.26156 13.1335 4.05979 13.4126 4.10056 13.7131C4.14132 14.0135 4.4083 14.2244 4.69566 14.1818H5.73914C5.92664 14.1839 6.10191 14.0817 6.1977 13.9112C6.29145 13.7408 6.29145 13.532 6.1977 13.3615C6.10191 13.1911 5.92664 13.0888 5.73914 13.0909H4.69566C4.67936 13.0909 4.66305 13.0909 4.64675 13.0909C4.63045 13.0909 4.61414 13.0909 4.59784 13.0909C4.58153 13.0909 4.56523 13.0909 4.54892 13.0909ZM8.72283 13.0909C8.43547 13.1335 8.2337 13.4126 8.27447 13.7131C8.31523 14.0135 8.58221 14.2244 8.86957 14.1818H9.91305C10.1006 14.1839 10.2758 14.0817 10.3716 13.9112C10.4654 13.7408 10.4654 13.532 10.3716 13.3615C10.2758 13.1911 10.1006 13.0888 9.91305 13.0909H8.86957C8.85327 13.0909 8.83697 13.0909 8.82066 13.0909C8.80436 13.0909 8.78805 13.0909 8.77175 13.0909C8.75544 13.0909 8.73914 13.0909 8.72283 13.0909ZM12.8967 13.0909C12.6094 13.1335 12.4076 13.4126 12.4484 13.7131C12.4891 14.0135 12.7561 14.2244 13.0435 14.1818H13.5652C13.7527 14.1839 13.928 14.0817 14.0238 13.9112C14.1175 13.7408 14.1175 13.532 14.0238 13.3615C13.928 13.1911 13.7527 13.0888 13.5652 13.0909H13.0435C13.0272 13.0909 13.0109 13.0909 12.9946 13.0909C12.9783 13.0909 12.962 13.0909 12.9457 13.0909C12.9294 13.0909 12.913 13.0909 12.8967 13.0909ZM20.3967 13.4318L20.7065 14.7614L19.1902 15.1364L18.8967 13.8068C19.0353 13.9688 19.2534 14.0284 19.4511 13.9602L19.9565 13.8409C20.1685 13.8111 20.3438 13.6491 20.3967 13.4318ZM1.04349 16.3636H22.9565V17.4545H1.04349V16.3636ZM3.13045 18.5455H3.65219V22.6364C3.65219 22.7919 3.54009 22.9091 3.39132 22.9091C3.24254 22.9091 3.13045 22.7919 3.13045 22.6364V18.5455ZM20.3478 18.5455H20.8696V22.6364C20.8696 22.7919 20.7575 22.9091 20.6087 22.9091C20.4599 22.9091 20.3478 22.7919 20.3478 22.6364V18.5455Z" fill="#455B73" />
                                        </svg>
                                    </Button>
                                    <Button variant="none">
                                        Proveedores
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M10 6H5C3.89543 6 3 6.89543 3 8V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V8C21 6.89543 20.1046 6 19 6H14M10 6V5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5V6M10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6M9 14C10.1046 14 11 13.1046 11 12C11 10.8954 10.1046 10 9 10C7.89543 10 7 10.8954 7 12C7 13.1046 7.89543 14 9 14ZM9 14C10.3062 14 11.4174 14.8348 11.8292 16M9 14C7.69378 14 6.58249 14.8348 6.17065 16M15 11H18M15 15H17" stroke="#455B73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Button>
                                    <Button variant="none">
                                        Pedidos
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M20 13V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V13M20 13V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V13M20 13H17.4142C17.149 13 16.8946 13.1054 16.7071 13.2929L14.2929 15.7071C14.1054 15.8946 13.851 16 13.5858 16H10.4142C10.149 16 9.89464 15.8946 9.70711 15.7071L7.29289 13.2929C7.10536 13.1054 6.851 13 6.58579 13H4" stroke="#455B73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

        </Container>
    );
};

export default AdminPage;