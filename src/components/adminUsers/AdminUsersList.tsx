/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { configuracion } from "../../config/appConfiguration";
import { IUser } from "../../interfaces/IUser";
import '../../styles/admin_users_list.css'

const AdminUsersList = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState<IUser[]>([]); // Lista de usuarios
    const [paginaActual, setPaginaActual] = useState<number>(1); // Página actual
    const [cantidad, setCantidad] = useState<number>(10); // Cantidad por página
    const [totalPaginas, setTotalPaginas] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(true); // Indicador de carga
    const [showModal, setShowModal] = useState(false); // Control del modal
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null); // Usuario seleccionado
    const [shouldFetch, setShouldFetch] = useState<boolean>(true); // Controla cuándo obtener la lista de usuarios

    const userData = JSON.parse(localStorage.getItem('__redux__user__') || "{}");
    const adminToken = userData?.token;
    if (!adminToken) {
        console.error("Token de administrador no disponible.");
        return <p>Falta el token de administrador.</p>;
    }

    // Obtener usuarios desde el backend
    useEffect(() => {
        async function getUsuarios() {
            try {
                setLoading(true); // Activa el indicador de carga
                const result = await fetch(
                    `${configuracion.urlJsonServerBackendUsers}/${paginaActual}/${cantidad}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${adminToken}`,
                        },
                    }
                );
                if (result.ok) {
                    const usersResponse = await result.json();
                    setUsers(usersResponse.usuarios);
                    console.log(usersResponse);
                    setTotalPaginas(usersResponse.totalPaginas);
                } else {
                    console.error("Error al obtener usuarios");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false); // Desactiva el indicador de carga
                setShouldFetch(false); // Desactiva la recarga hasta la próxima acción
            }
        };

        getUsuarios();
    }, [shouldFetch, paginaActual, cantidad]);

    /* Handles Paginación */
    const handlePaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const handlePaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    const handleFirstPage = () => {
        setPaginaActual(1);
    }

    const handleLastPage = () => {
        setPaginaActual(totalPaginas);
    }

    const handleSeleccionPagina = (pagina: number) => {
        setPaginaActual(pagina);
    };

    /* Cantidad de botones a mostrar */
    const generarRangoPaginas = (): number[] => {
        const rango: number[] = [];
        const maxVisible = 4; // Número máximo de páginas visibles en el rango
        let inicio = Math.max(1, paginaActual - 1); // Comienza con 1 o una página antes de la actual
        const fin = Math.min(totalPaginas, inicio + maxVisible - 1); // Calcula el final del rango

        if (fin - inicio + 1 < maxVisible) {
            inicio = Math.max(1, fin - maxVisible + 1);
        }

        for (let i = inicio; i <= fin; i++) {
            rango.push(i);
        }
        return rango;
    };

    const handleOpenModal = (user: IUser) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleDelete = async (idUsuario: number) => {
        const url = configuracion.urlJsonServerBackendUsers.toString().concat(`/${idUsuario}`);
        console.log("URL para eliminar:", url);

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${adminToken}`,
            },
        });

        if (response.ok) {
            alert(`Usuario con ID ${idUsuario} eliminado correctamente.`);
            setShouldFetch(true); // Activa la recarga de datos
            handleCloseModal(); // Cierra el modal
        } else {
            console.error("Error eliminando el usuario.");
            alert("Error al eliminar el usuario.");
        }
    };

    if (loading) return <p>Cargando datos...</p>;

    return (
        <Container className="userList-admin-container mt-4">
            <Row className="userList-admin-header">
                <Col xs={12} md={8} className="text-start">
                    <h1 className="title-admin-userList">Usuarios</h1>
                </Col>

                <Col xs={12} md={4} className="text-end">
                    <Button variant="none" className="button-admin-createUser" onClick={() => handleNavigation("/admin/createuser")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 12C0 5.37259 5.37259 0 12 0C18.6275 0 24 5.37259 24 12C24 18.6275 18.6275 24 12 24C5.37259 24 0 18.6275 0 12ZM12 1.84615C6.39219 1.84615 1.84615 6.39219 1.84615 12C1.84615 14.3805 2.6653 16.5696 4.03709 18.3009C4.23562 17.7294 4.51608 17.1773 4.86848 16.6876C5.62448 15.6371 6.79695 14.7692 8.30769 14.7692H15.6923C17.2031 14.7692 18.3755 15.6371 19.1315 16.6876C19.4839 17.1773 19.7644 17.7294 19.9629 18.3009C21.3347 16.5696 22.1538 14.3805 22.1538 12C22.1538 6.39219 17.6079 1.84615 12 1.84615ZM18.4378 19.8525C18.3578 19.1511 18.0775 18.3836 17.6331 17.766C17.1054 17.0328 16.4318 16.6154 15.6923 16.6154H8.30769C7.56824 16.6154 6.89456 17.0328 6.36695 17.766C5.92246 18.3836 5.64219 19.1511 5.56217 19.8525C7.31429 21.2906 9.55634 22.1538 12 22.1538C14.4437 22.1538 16.6857 21.2906 18.4378 19.8525ZM7.38462 8.30769C7.38462 5.7587 9.45093 3.69231 12 3.69231C14.5491 3.69231 16.6154 5.7587 16.6154 8.30769C16.6154 10.8568 14.5491 12.9231 12 12.9231C9.45094 12.9231 7.38462 10.8568 7.38462 8.30769ZM12 5.53846C10.4705 5.53846 9.23077 6.77828 9.23077 8.30769C9.23077 9.83715 10.4705 11.0769 12 11.0769C13.5295 11.0769 14.7692 9.83715 14.7692 8.30769C14.7692 6.77828 13.5295 5.53846 12 5.53846Z" fill="currentColor" />
                            </svg>
                            Crear usuario
                    </Button>
                </Col>
            </Row>

            <div className="users-pagination">
                <label htmlFor="cantidad" className='text-pagination-users'>Estás visualizando </label>
                <select
                    className='select-pagination-users'
                    id="cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}> {/* Number(e.target.value) convierte el string a un número */}
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </select>
                <p className='text-pagination-users'>productos</p>
            </div>

            <Row>
                <Col xs={12}>
                    {users.length > 0 ? (
                        <Table className="table-userList">
                            <thead className="description-table-userList">
                                <tr>
                                    <th className="id-table-userList">ID</th>
                                    <th>Nombre De Usuario</th>
                                    <th>Correo Electrónico</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.idUsuario}>
                                        <td>{user.idUsuario}</td>
                                        <td>{`${user.nombres} ${user.apellidoPaterno} ${user.apellidoMaterno}`}</td>
                                        <td>{user.correoElectronico}</td>
                                        <td>
                                            <Button variant="none" size="sm" onClick={() => handleOpenModal(user)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M9.99992 16.6666C9.54159 16.6666 9.14936 16.5035 8.82325 16.1774C8.49659 15.8508 8.33325 15.4583 8.33325 14.9999C8.33325 14.5416 8.49659 14.1491 8.82325 13.8224C9.14936 13.4963 9.54159 13.3333 9.99992 13.3333C10.4583 13.3333 10.8508 13.4963 11.1774 13.8224C11.5035 14.1491 11.6666 14.5416 11.6666 14.9999C11.6666 15.4583 11.5035 15.8508 11.1774 16.1774C10.8508 16.5035 10.4583 16.6666 9.99992 16.6666ZM9.99992 11.6666C9.54159 11.6666 9.14936 11.5033 8.82325 11.1766C8.49659 10.8505 8.33325 10.4583 8.33325 9.99992C8.33325 9.54158 8.49659 9.14909 8.82325 8.82242C9.14936 8.49631 9.54159 8.33325 9.99992 8.33325C10.4583 8.33325 10.8508 8.49631 11.1774 8.82242C11.5035 9.14909 11.6666 9.54158 11.6666 9.99992C11.6666 10.4583 11.5035 10.8505 11.1774 11.1766C10.8508 11.5033 10.4583 11.6666 9.99992 11.6666ZM9.99992 6.66659C9.54159 6.66659 9.14936 6.50325 8.82325 6.17659C8.49659 5.85047 8.33325 5.45825 8.33325 4.99992C8.33325 4.54159 8.49659 4.14936 8.82325 3.82325C9.14936 3.49659 9.54159 3.33325 9.99992 3.33325C10.4583 3.33325 10.8508 3.49659 11.1774 3.82325C11.5035 4.14936 11.6666 4.54159 11.6666 4.99992C11.6666 5.45825 11.5035 5.85047 11.1774 6.17659C10.8508 6.50325 10.4583 6.66659 9.99992 6.66659Z" fill="#1D2433" fill-opacity="0.8" />
                                                </svg>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div>No existen usuarios en el backend.</div>
                    )}
                </Col>
            </Row>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header style={{ backgroundColor: '#F5FAFF' }} closeButton>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#F5FAFF' }}>
                    <div className="d-flex align-items-center flex-column ">
                        <p className="id-user-admin-userList">{selectedUser?.idUsuario}</p>
                        <p className="nombre-user-admin-userList">{`${selectedUser?.nombres} ${selectedUser?.apellidoPaterno} ${selectedUser?.apellidoMaterno}`}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-around" style={{ backgroundColor: '#F5FAFF' }}>
                    <Button className="button-delete-admin-usersList" variant="secondary" onClick={() => selectedUser && handleDelete(selectedUser.idUsuario)} style={{ backgroundColor: '#D4E7FA', color: '#455B73' }}>
                        Eliminar Producto
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.1775 0C8.22434 0 6.6125 1.56452 6.6125 3.52941V3.9095H3.565H0.92C0.411898 3.9095 0 4.32278 0 4.83258C0 5.34238 0.411898 5.75565 0.92 5.75565H2.645V20.4706C2.645 22.4355 4.25685 24 6.21 24H16.79C18.7432 24 20.355 22.4355 20.355 20.4706V5.75565H22.08C22.5881 5.75565 23 5.34238 23 4.83258C23 4.32278 22.5881 3.9095 22.08 3.9095H19.435H16.3875V3.52941C16.3875 1.56453 14.7757 0 12.8225 0H10.1775ZM15.4649 5.75565C15.4658 5.75566 15.4666 5.75566 15.4675 5.75566C15.4684 5.75566 15.4692 5.75566 15.4701 5.75565H18.515V20.4706C18.515 21.3846 17.7585 22.1538 16.79 22.1538H6.21C5.24156 22.1538 4.485 21.3846 4.485 20.4706V5.75565H7.52993C7.53079 5.75566 7.53164 5.75566 7.5325 5.75566C7.53336 5.75566 7.53421 5.75566 7.53507 5.75565H15.4649ZM14.5475 3.9095V3.52941C14.5475 2.61541 13.791 1.84615 12.8225 1.84615H10.1775C9.20907 1.84615 8.4525 2.61542 8.4525 3.52941V3.9095H14.5475ZM8.855 9.12218C9.3631 9.12218 9.775 9.53545 9.775 10.0453V17.8643C9.775 18.3741 9.3631 18.7873 8.855 18.7873C8.3469 18.7873 7.935 18.3741 7.935 17.8643V10.0453C7.935 9.53545 8.3469 9.12218 8.855 9.12218ZM14.145 9.12218C14.6531 9.12218 15.065 9.53545 15.065 10.0453V17.8643C15.065 18.3741 14.6531 18.7873 14.145 18.7873C13.6369 18.7873 13.225 18.3741 13.225 17.8643V10.0453C13.225 9.53545 13.6369 9.12218 14.145 9.12218Z" fill="#455B73" />
                        </svg>
                    </Button>
                    <Link to={`/admin/edit-user/${selectedUser?.idUsuario}`}>
                        <Button className="button-modify-admin-usersList" variant="primary" style={{ backgroundColor: '#455B73' }}>
                            Modificar Producto
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.517 0.270363C18.1565 -0.090121 17.572 -0.090121 17.2115 0.270363L13.3187 4.16322C13.3129 4.16868 13.3072 4.17423 13.3016 4.17986C13.296 4.1855 13.2904 4.19119 13.285 4.19693L0.270363 17.2115C0.0972524 17.3847 0 17.6194 0 17.8643V23.0769C0 23.5867 0.413276 24 0.923077 24H6.13575C6.38056 24 6.61535 23.9027 6.78846 23.7296L23.7296 6.78846C24.0901 6.42798 24.0901 5.84352 23.7296 5.48303L18.517 0.270363ZM13.9545 6.13822L1.84615 18.2466V22.1538H5.7534L17.8618 10.0455L13.9545 6.13822ZM19.1672 8.74003L21.7715 6.13575L17.8643 2.22851L15.26 4.83279L19.1672 8.74003Z" fill="currentColor" />
                            </svg>
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>

            <div className="users-pagination">

                <button className='boton-paginacion-users' onClick={handleFirstPage} disabled={paginaActual === 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L5.41421 12L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289ZM19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L11.2929 12.7071C10.9024 12.3166 10.9024 11.6834 11.2929 11.2929L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289Z" fill="currentColor" />
                    </svg>
                </button>

                <button className='boton-paginacion-users' onClick={handlePaginaAnterior} disabled={paginaActual === 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.502111 11.1431C-0.16737 11.8531 -0.16737 13.0043 0.502111 13.7144L8.21652 21.8962C8.886 22.6062 9.97145 22.6062 10.6409 21.8962C11.3104 21.1861 11.3104 20.0349 10.6409 19.3249L5.85303 14.2469H22.2857C23.2325 14.2469 24 13.4329 24 12.4287C24 11.4246 23.2325 10.6105 22.2857 10.6105H5.85303L10.6409 5.53254C11.3104 4.8225 11.3104 3.67129 10.6409 2.96124C9.97145 2.2512 8.886 2.2512 8.21652 2.96124L0.502111 11.1431Z" fill="currentColor" />
                    </svg>
                </button>

                {generarRangoPaginas().map(pagina => (
                    <button
                        key={pagina}
                        className={`boton-paginacion-users ${pagina === paginaActual ? 'activo' : ''}`}
                        onClick={() => handleSeleccionPagina(pagina)}
                    >
                        {pagina}
                    </button>
                ))}

                <button className='boton-paginacion-users' onClick={handlePaginaSiguiente} disabled={paginaActual === totalPaginas}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clip-rule="evenodd" d="M23.4979 13.7141C24.1674 13.0041 24.1674 11.8529 23.4979 11.1428L15.7837 2.961C15.1142 2.25096 14.0288 2.25096 13.3593 2.961C12.6899 3.67104 12.6899 4.82225 13.3593 5.5323L18.1471 10.6103H1.71427C0.767504 10.6103 0 11.4243 0 12.4285C0 13.4326 0.767504 14.2466 1.71427 14.2466H18.1471L13.3593 19.3246C12.6899 20.0347 12.6899 21.1859 13.3593 21.8959C14.0288 22.606 15.1142 22.606 15.7837 21.8959L23.4979 13.7141Z" fill="currentColor" />
                    </svg>
                </button>

                <button className='boton-paginacion-users' onClick={handleLastPage} disabled={paginaActual === totalPaginas}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                        <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </button>
            </div>

        </Container>
    );
};

export default AdminUsersList;