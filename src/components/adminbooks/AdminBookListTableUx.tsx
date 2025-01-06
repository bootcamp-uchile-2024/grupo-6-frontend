import { useNavigate } from "react-router-dom";
import { useFetchGet } from "../../hooks/useFetch";
import ButtonProductModify from './ButtonProductModify';
import { ILibroPaginado } from '../../interfaces/ILibroPaginado';
import { configuracion } from '../../config/appConfiguration';
import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import '../../styles/admin_product_list.css'

function AdminBookListTableUx() {

    const navigate = useNavigate();

    const [paginaActual, setPaginaActual] = useState<number>(1);
    const [cantidad, setCantidad] = useState<number>(6); // Número de productos por página, se puede cambiar
    const [totalPaginas, setTotalPaginas] = useState<number>(5);

    const { data: bookList, loading, error } = useFetchGet<ILibroPaginado>(configuracion.urlJsonServerBackendCatalog, paginaActual, cantidad);

    if (loading) return <p>Cargando datos...</p>
    if (error) return <p>Error en la consulta de datos {error}</p>

    /* Paginación */
    const handlePaginaAnterior = () => {
        const totalPaginasResponse = bookList ? bookList.totalPaginas : 1;
        setTotalPaginas(totalPaginasResponse);
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const handlePaginaSiguiente = () => {
        const totalPaginasResponse = bookList ? bookList.totalPaginas : 1;
        setTotalPaginas(totalPaginasResponse);
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    const handleFirstPage = () => {
        setPaginaActual(1);
    }

    const handleLastPage = () => {
        const totalPaginasResponse = bookList ? bookList.totalPaginas : 1;
        setTotalPaginas(totalPaginasResponse);
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

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (

        <Container className="productList-admin-container mt-4">
            <Row className="productList-admin-header">
                <Col xs={12} md={8} className="text-start">
                    <h1 className="title-admin-productList">Productos</h1>
                </Col>
                <Col xs={12} md={4} className="text-end create-product-admin">
                    <Button variant="primary" onClick={() => handleNavigation("/create/product")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.4C6.69807 2.4 2.4 6.69807 2.4 12C2.4 17.3019 6.69807 21.6 12 21.6C17.3019 21.6 21.6 17.3019 21.6 12C21.6 6.69807 17.3019 2.4 12 2.4ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM12 7.2C12.6627 7.2 13.2 7.73726 13.2 8.4V10.8H15.6C16.2627 10.8 16.8 11.3373 16.8 12C16.8 12.6627 16.2627 13.2 15.6 13.2H13.2V15.6C13.2 16.2627 12.6627 16.8 12 16.8C11.3373 16.8 10.8 16.2627 10.8 15.6V13.2H8.4C7.73726 13.2 7.2 12.6627 7.2 12C7.2 11.3373 7.73726 10.8 8.4 10.8H10.8V8.4C10.8 7.73726 11.3373 7.2 12 7.2Z" fill="currentColor" />
                        </svg>
                        Crear Producto
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
                    {bookList?.productos.length ? (
                        <Table className="table-productList">
                            <thead className="description-table-productList">
                                <tr>
                                    <th className="head-table-product">ISBN</th>
                                    <th className="head-table-product">Título</th>
                                    <th className="head-table-product">Autor</th>
                                    <th className="head-table-product">Opciones</th>
                                </tr>
                            </thead>
                            <tbody className="body-table-productList">
                                {bookList.productos.map((item) => (
                                    <tr key={item.isbn}>
                                        <td>{item.isbn}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.autor}</td>
                                        <td>
                                            <ButtonProductModify libro={item} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    ) : (
                        <div>No existen libros en el backend.</div>
                    )}
                </Col>

                {/* Controles de paginación */}
                <div className="users-pagination">

                    <Button className='boton-paginacion-users' size="sm" onClick={handleFirstPage} disabled={paginaActual === 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.99992 16.6666C9.54159 16.6666 9.14936 16.5035 8.82325 16.1774C8.49659 15.8508 8.33325 15.4583 8.33325 14.9999C8.33325 14.5416 8.49659 14.1491 8.82325 13.8224C9.14936 13.4963 9.54159 13.3333 9.99992 13.3333C10.4583 13.3333 10.8508 13.4963 11.1774 13.8224C11.5035 14.1491 11.6666 14.5416 11.6666 14.9999C11.6666 15.4583 11.5035 15.8508 11.1774 16.1774C10.8508 16.5035 10.4583 16.6666 9.99992 16.6666ZM9.99992 11.6666C9.54159 11.6666 9.14936 11.5033 8.82325 11.1766C8.49659 10.8505 8.33325 10.4583 8.33325 9.99992C8.33325 9.54158 8.49659 9.14909 8.82325 8.82242C9.14936 8.49631 9.54159 8.33325 9.99992 8.33325C10.4583 8.33325 10.8508 8.49631 11.1774 8.82242C11.5035 9.14909 11.6666 9.54158 11.6666 9.99992C11.6666 10.4583 11.5035 10.8505 11.1774 11.1766C10.8508 11.5033 10.4583 11.6666 9.99992 11.6666ZM9.99992 6.66659C9.54159 6.66659 9.14936 6.50325 8.82325 6.17659C8.49659 5.85047 8.33325 5.45825 8.33325 4.99992C8.33325 4.54159 8.49659 4.14936 8.82325 3.82325C9.14936 3.49659 9.54159 3.33325 9.99992 3.33325C10.4583 3.33325 10.8508 3.49659 11.1774 3.82325C11.5035 4.14936 11.6666 4.54159 11.6666 4.99992C11.6666 5.45825 11.5035 5.85047 11.1774 6.17659C10.8508 6.50325 10.4583 6.66659 9.99992 6.66659Z" fill="#1D2433" fill-opacity="0.8" />
                        </svg>
                    </Button>

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
                            <path fillRule="evenodd" clipRule="evenodd" d="M23.4979 13.7141C24.1674 13.0041 24.1674 11.8529 23.4979 11.1428L15.7837 2.961C15.1142 2.25096 14.0288 2.25096 13.3593 2.961C12.6899 3.67104 12.6899 4.82225 13.3593 5.5323L18.1471 10.6103H1.71427C0.767504 10.6103 0 11.4243 0 12.4285C0 13.4326 0.767504 14.2466 1.71427 14.2466H18.1471L13.3593 19.3246C12.6899 20.0347 12.6899 21.1859 13.3593 21.8959C14.0288 22.606 15.1142 22.606 15.7837 21.8959L23.4979 13.7141Z" fill="currentColor" />
                        </svg>
                    </button>

                    <button className='boton-paginacion-users' onClick={handleLastPage} disabled={paginaActual === totalPaginas}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>
                </div>
            </Row>
        </Container>
    );
};

export default AdminBookListTableUx;
