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
        <Container fluid>

            <div className='shoppingcart'>
                <Row md="10">
                    <div className="shoppingcart-item-top-footer">
                        <Col md="4">
                            <h2>Productos</h2>
                        </Col>
                        <Col md="4"></Col>
                        <Col md="2">
                            <div className="shoppingcart-button-options">
                                <Link to={`/create/product`}>
                                <Button className="button-shoppingcart-resume" style={{ backgroundColor: '#455B73', color: '#F5FAFF', border: '#455B73' }}>
                                    Crear Producto
                                </Button>
                            </Link>
                            </div>
                        </Col>
                    </div>

                </Row>
                {bookList?.productos.length ? (
                    <div className="left" style={{maxWidth: '50%' }} >
                        <Container style={{alignSelf: 'flex-start'}} >
                            {/* Encabezado */}
                            <Row className="d-flex align-items-center justify-content-between" style={{ backgroundColor: '#F1F3F9' }}>
                                <Col xs={3}>
                                    <strong>ISBN</strong>
                                </Col>
                                <Col xs={4}>
                                    <strong>Título</strong>
                                </Col>
                                <Col xs={4}>
                                    <strong>Autor</strong>
                                </Col>
                                <Col xs={1}>
                                    <strong>Modificar</strong>
                                </Col>
                            </Row>

                            {/* Filas de libros */}
                            {bookList.productos.map((item) => (
                                <Row
                                    key={item.isbn}
                                    className="d-flex align-items-center justify-content-between py-2"
                                    style={{ borderBottom: '1px solid #ddd' }}
                                >
                                    <Col xs={3}>
                                        <p>{item.isbn}</p>
                                    </Col>
                                    <Col xs={4}>
                                        <p>{item.nombre}</p>
                                    </Col>
                                    <Col xs={4}>
                                        <p>{item.autor}</p>
                                    </Col>
                                    <Col xs={1}>
                                        <ButtonProductModify libro={item} />
                                    </Col>
                                </Row>
                            ))}
                        </Container>
                    </div>
                ) : (
                    <div>No existen libros en el backend.</div>
                )}

                {/* Controles de paginación */}
                <div className="categorias-paginacion">
                    <button className='boton-paginacion' onClick={handlePaginaAnterior} disabled={paginaActual === 1}>&#8592;</button>
                    <span>Página {paginaActual} de {bookList?.totalPaginas}</span>
                    <button className='boton-paginacion' onClick={handlePaginaSiguiente} disabled={paginaActual === bookList?.totalPaginas}>&#8594;</button>
                </div>
            </div>
        </Container>
    );
};

export default AdminBookListTableUx;
