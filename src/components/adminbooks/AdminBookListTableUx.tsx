import { Link } from "react-router-dom";
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


    return (

        
        <Container className="productList-admin-container mt-4">
            <Row className="productList-admin-header">
                <Col xs={12} md={8} className="text-start">
                    <h1 className="title-admin-productList">Productos</h1>
                </Col>
                <Col xs={12} md={4} className="text-end">

                    <Button className="button-shoppingcart-resume" variant="none" style={{ backgroundColor: '#455B73', color: '#F5FAFF', border: '#455B73' }}>
                        <Link to={`/create/product`}>
                            Crear Producto
                        </Link>
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
                                    <th className="head-table-product"><strong>ISBN</strong></th>
                                    <th className="head-table-product"><strong>Título</strong></th>
                                    <th className="head-table-product"><strong>Autor</strong></th>
                                    <th className="head-table-product"><strong>Opciones</strong></th>
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
