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
    const cantidad = 6; // Número de productos por página, se puede cambiar

    const { data: bookList, loading, error } = useFetchGet<ILibroPaginado>(configuracion.urlJsonServerBackendCatalog, paginaActual, cantidad);

    if (loading) return <p>Cargando datos...</p>
    if (error) return <p>Error en la consulta de datos {error}</p>

    /* Paginación */
    const handlePaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const handlePaginaSiguiente = () => {
        const totalPaginas = bookList ? bookList.totalPaginas : 1;

        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
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
            <div className="categorias-paginacion">
                <button className='boton-paginacion' onClick={handlePaginaAnterior} disabled={paginaActual === 1}>&#8592;</button>
                <span>Página {paginaActual} de {bookList?.totalPaginas}</span>
                <button className='boton-paginacion' onClick={handlePaginaSiguiente} disabled={paginaActual === bookList?.totalPaginas}>&#8594;</button>
            </div>
        </Row>
    </Container>
    );
};

export default AdminBookListTableUx;
