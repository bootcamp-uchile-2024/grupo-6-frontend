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
import Collapse from 'react-bootstrap/esm/Collapse';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/esm/Form';
import ListGroup from 'react-bootstrap/esm/ListGroup';

function AdminBookList() {

    const [paginaActual, setPaginaActual] = useState<number>(1);
    const cantidad = 2; // Número de productos por página, se puede cambiar
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isCollapsed, setIsCollapsed] = useState(false);
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
        <>
            <Container>
                <Row key="product-card-filter" md="12" className='p-4'>
                    <ListGroup horizontal >
                        <Col md="3" >
                            <ListGroup.Item style={{ backgroundColor: '#D4E7FA' }}>Filtros</ListGroup.Item>
                        </Col>

                        <Col md="3" >
                            <ListGroup.Item style={{ backgroundColor: '#D4E7FA' }}>Título</ListGroup.Item>
                        </Col>

                        <Col md="3" >
                            <ListGroup.Item style={{ backgroundColor: '#D4E7FA' }}>Autor</ListGroup.Item>
                        </Col>

                        <Col md="3" >
                            <ListGroup.Item style={{ backgroundColor: '#D4E7FA' }}>Editorial</ListGroup.Item>
                        </Col>
                    </ListGroup>

                </Row>
                <Row key="product-card-search" md="12">
                    <Form >
                        <Row className="pb-4">
                            <Col md="3" ></Col>
                            <Col md="7" >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    className=" mr-sm-2"
                                />
                            </Col>
                            <Col md="2">
                                <Button type="submit">Buscar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row key="product-card-title">
                    <div className="shoppingcart-item-top-footer">
                        <h2>Ultimos Agregados: </h2>
                    </div>
                </Row>
                <Row md="12" key="product-card-list">

                    {bookList?.productos.length ? (
                        <div className='shoppingcart-items'>
                            {bookList.productos.map((item) => (
                                <Col key={item.isbn} md="6">
                                    <Card className="mb-4"
                                        key={item.isbn}
                                        text={'dark'}
                                        style={{ width: '641px', height: '423px', padding: '24px', margin: '30px', backgroundColor: '#B5D1F0' }}
                                    >

                                        <Collapse in={!isCollapsed}>
                                            <div>
                                                <Card.Body className='d-flex align-items-between'>
                                                    <div>
                                                        <Image src='https://es.web.img3.acsta.net/medias/nmedia/18/89/67/45/20061512.jpg'
                                                            width={200}
                                                            height={260}
                                                            className="me-2 rounded-4"
                                                        ></Image>
                                                    </div>
                                                    <div >

                                                        <Card.Text style={{ width: '37px', height: '260px' }}>
                                                        </Card.Text>
                                                    </div>
                                                    <div >
                                                        <div className="d-flex align-items-between">
                                                            <Card.Text className="d-flex p-2 fw-bold">Título</Card.Text>
                                                            <Card.Text className="d-flex p-2">:</Card.Text>
                                                            <Card.Text className="d-flex p-2">{item.nombre}</Card.Text>
                                                        </div>

                                                        <div className="d-flex align-items-between">
                                                            <Card.Text className="d-flex p-2 fw-bold">Autor:</Card.Text>
                                                            <Card.Text className="d-flex p-2">:</Card.Text>
                                                            <Card.Text className="d-flex p-2">{item.autor}</Card.Text>

                                                        </div>


                                                        <div className="d-flex align-items-between">
                                                            <Card.Text className="d-flex p-2 fw-bold">Editorial:</Card.Text>
                                                            <Card.Text className="d-flex p-2">:</Card.Text>
                                                            <Card.Text className="d-flex p-2">{item.editorial}</Card.Text>
                                                        </div>

                                                        <div className="d-flex align-items-between">
                                                            <Card.Text className="d-flex p-2 fw-bold">Inventario:</Card.Text>
                                                            <Card.Text className="d-flex p-2">:</Card.Text>
                                                            <Card.Text className="d-flex p-2">{item.stockLibro}</Card.Text>
                                                        </div>
                                                    </div>

                                                </Card.Body>
                                                <Card.Footer className="d-flex justify-content-between" style={{ backgroundColor: '#B5D1F0' }}>
                                                    <ButtonProductModify libro={item} />

                                                    <ButtonProductDelete libro={item} />
                                                </Card.Footer>
                                            </div>
                                        </Collapse>
                                    </Card>
                                </Col>

                            ))}
                        </div>
                    ) : (
                        <div>No existen libros en el backend.</div>
                    )}
                    <Col key='first' md="5"></Col>

                </Row>

            </Container>

            {/* Controles de paginación */}
            <div className="categorias-paginacion">
                <button className='boton-paginacion' onClick={handlePaginaAnterior} disabled={paginaActual === 1}>&#8592;</button>
                <span>Página {paginaActual} de {bookList?.totalPaginas}</span>
                <button className='boton-paginacion' onClick={handlePaginaSiguiente} disabled={paginaActual === bookList?.totalPaginas}>&#8594;</button>
            </div>
        </>
    );
};

export default AdminBookList;
