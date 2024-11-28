import { useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { IUserPaginado } from "../../interfaces/IUserPaginado";
import '../../styles/admin_users_list.css'
import { useFetchUsersList } from "../../hooks/useFetchUsersList"; 
import { configuracion } from "../../config/appConfiguration";

const AdminUsersListPage = () => {

    const [paginaActual, setPaginaActual] = useState<number>(1);
    const cantidad = 10; //Cantidad de usuarios por página

    // Se usa hooks para obtener datos
    const { data: userList, loading, error } = useFetchUsersList<IUserPaginado>(configuracion.urlJsonServerBackendUsers, paginaActual, cantidad);

    const handlePaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const handlePaginaSiguiente = () => {
        const totalPaginas = userList ? userList.totalPaginas : 1;

        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    if (loading) {return <p>Cargando datos...</p>;}
    if (error) {return <p>Error al cargar usuarios: {error}</p>;}

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Usuarios</h1>
                </Col>
                <Col className="text-right">
                    <Button variant="primary">
                        Cerrar sesión
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button variant="success" className="mb-3">
                        Crear usuario
                    </Button>
                </Col>
            </Row>

            {userList?.usuarios && userList.usuarios.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre De Usuario</th>
                            <th>Correo Electrónico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.usuarios.map((user) => (
                            <tr key={user.idUsuario}>
                                <td>{user.idUsuario}</td>
                                <td>{`${user.nombres} ${user.apellidoPaterno} ${user.apellidoMaterno}`}</td>
                                <td>{user.correoElectronico}</td>
                                <td>
                                    <Button variant="danger" size="sm" className="mr-2">
                                        Eliminar
                                    </Button>
                                    <Button variant="warning" size="sm">
                                        Editar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div>No existen usuarios en el backend.</div>
            )}

            <div className="paginacion">
                <button
                    className="boton-paginacion"
                    onClick={handlePaginaAnterior}
                    disabled={paginaActual === 1}
                >
                    &#8592;
                </button>
                <span>
                    Página {paginaActual} de {userList?.totalPaginas}
                </span>
                <button
                    className="boton-paginacion"
                    onClick={handlePaginaSiguiente}
                    disabled={paginaActual === userList?.totalPaginas}
                >
                    &#8594;
                </button>
            </div>
        </Container>
    );
};

export default AdminUsersListPage;