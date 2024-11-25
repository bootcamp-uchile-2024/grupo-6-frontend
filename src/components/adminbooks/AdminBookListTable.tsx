import '../../styles/shopping_cart.css'
import { Link } from "react-router-dom";
import { useFetchGet } from "../../hooks/useFetch";
import ButtonProductModify from './ButtonProductModify';
import { ILibroPaginado } from '../../interfaces/ILibroPaginado';
import ButtonProductDelete from './ButtonProductDelete';
import { configuracion } from '../../config/appConfiguration';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function AdminBookListTable() {

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
                            <h2>Libros Disponibles</h2>
                        </Col>
                        <Col md="4"></Col>
                        <Col md="2">
                            <div className="shoppingcart-button-options">
                                <Link to={`/create/product`}>
                                    <p className='shoppingcart-to-product'>Crear nuevo libro</p>
                                </Link>
                            </div>
                        </Col>
                    </div>

                </Row>
                {bookList?.productos.length ? (
                    <div className='shoppingcart-items'>


                        <Table className="shoppingcart-items-table" hover size="sm">
                            <thead>

                                <tr className="shoppingcart-item-detail-tr">
                                    <th className="shoppingcart-item-detail-th" colSpan={2} scope="col">
                                        Libro
                                    </th>
                                    <div className='d-flex justify-content-evenly'>

                                    <th className="shoppingcart-item-detail-th" colSpan={1} scope="col">
                                        Editar
                                    </th>
                                    <th className="shoppingcart-item-detail-th" colSpan={1} scope="col">
                                        Eliminar
                                    </th>
                                    </div>
                                </tr>
                            </thead>
                            {bookList.productos.map((item) => (

                                <>

                                    <tbody className='shoppingcart-item-detail'>
                                        <tr className="shoppingcart-item-detail-tr">
                                            <td className="shoppingcart-item-detail-td-image p-2">
                                                <img src='https://placehold.co/800@3x.png' alt={item.nombre} />
                                            </td>
                                            <td className="shoppingcart-item-detail-td-data align-items-between p-4">
                                                <Container>
                                                    <Row>
                                                        <Col md="2">
                                                            <label htmlFor="nombre-libro">Nombre: </label>
                                                        </Col>
                                                        <Col>
                                                            <p className='shoppingcart-item-detail'>{item.nombre}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="2">
                                                            <label htmlFor="autor-libro">Autor: </label>
                                                        </Col>
                                                        <Col>
                                                            <p className='shoppingcart-item-detail'>{item.autor}</p>
                                                        </Col>
                                                    </Row>

                                                </Container>
                                            </td>
                                            <div className='d-flex justify-content-evenly'>
                                                <td className="shoppingcart-item-detail p-2" >
                                                    <div className="shoppingcart-item-detail-td-quantity-1">
                                                        <ButtonProductModify libro={item} />
                                                    </div>
                                                </td>


                                                <td className="shoppingcart-item-detail p-2">
                                                    <ButtonProductDelete libro={item} />
                                                </td>
                                            </div>

                                        </tr>
                                    </tbody>

                                </>
                            ))}
                        </Table>
                    </div>
                ) : (
                    <div>No existen libros en el backend.</div>
                )}

                <div className="shoppingcart-item-top-footer">
                    <h2>Total Libros: {bookList?.totalProductos}</h2>
                </div>
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

export default AdminBookListTable;
