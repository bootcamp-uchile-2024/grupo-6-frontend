import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ILibro } from '../interfaces/ILibro';
import '../styles/product_detail.css'
import ButtonAddToCart from './shoppingcart/ButtonAddToCart';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';
import QuantityButtons from './shoppingcart/QuantityButtons';
import { configuracion } from '../config/appConfiguration.ts';
import { Container, Row, Col, Card } from "react-bootstrap";
import libroBeatles from '../assets/images/Libros/libro beatles.webp'
import libroInvitadoDracula from '../assets/images/Libros/invitado-dracula.webp'
import libroDibujoFacil from '../assets/images/Libros/libro dibujo facil.webp'
import libroTreeHouses from '../assets/images/Libros/tree-houses.webp'

const recomendaciones = [
    {
        title: "The Beatles on the road",
        author: "Harry Benson",
        image: libroBeatles,
    },
    {
        title: "Tree houses",
        author: "Philip Jodidio",
        image: libroTreeHouses,
    },
    {
        title: "Dibujo fácil",
        author: "Chelsea Ward",
        image: libroDibujoFacil,
    },
    {
        title: "El invitado de Drácula",
        author: "Dram Stoker",
        image: libroInvitadoDracula,
    }
];

const ProductDetail: React.FC = () => {
    const { isbn } = useParams<{ isbn: string }>();
    const [libro, setLibro] = useState<ILibro | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [producto, setProducto] = useState<ShoppingCartEntrada>({
        nombre: '',
        autor: "",
        precio: 0,
        isbn: "",
        cantidad: 1,
        correoElectronico: "",
        caratula: "",

    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${configuracion.urlJsonServerBackendDetailsSearch}${isbn}`, { method: 'GET' });

                if (!response.ok) {
                    throw new Error('No pudimos obtener los detalles del libro');
                }

                const productData: ILibro = await response.json();
                setLibro(productData);

                setProducto({
                    nombre: productData?.nombre || '',
                    autor: productData?.autor || "",
                    precio: productData?.precio || 0,
                    isbn: productData?.isbn || "",
                    cantidad: 1,
                    correoElectronico: "",
                    caratula: productData?.caratula || '',

                });

            } catch (error) {
                setError(error instanceof Error ? error.message : 'Ha ocurrido un error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [isbn]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    const url = configuracion.urlJsonServerBackendCover.toString();

    const isOutOfStock = libro?.stockLibro === 0;

    return (
        <Container className="product-detail-container">
            {libro ? (
                <>
                    <Row className="product-detail">
                        {/* Imagen del libro */}
                        <Col md={4} className="product-image">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={`${url}${libro.caratula}`} alt={`imagen del libro ${libro.nombre}`}
                                /* alt={libro.nombre} */
                                />
                            </Card>
                        </Col>

                        {/* Información del libro */}
                        <Col md={8} className="productDeteil-info">
                            <h1 className='productDetail-title-info'>{libro.nombre}</h1>
                            <h3 className="autor-info">{libro.autor.join(", ")}</h3>
                            <p className="price">${libro.precio.toLocaleString()}</p>

                            {/* Estrellas de calificación */}
                            <div className="rating-stars">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" fill="none">
                                    <path d="M4.5 0C2.01473 0 0 2.01473 0 4.5V19.5C0 21.9853 2.01473 24 4.5 24H17C17.5523 24 18 23.5523 18 23V22C18 21.4477 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V19C3 18.4477 3.44772 18 4 18H17C17.5523 18 18 17.5523 18 17V1C18 0.447716 17.5523 0 17 0H4.5Z" fill="#545454" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" fill="none">
                                    <path d="M4.5 0C2.01473 0 0 2.01473 0 4.5V19.5C0 21.9853 2.01473 24 4.5 24H17C17.5523 24 18 23.5523 18 23V22C18 21.4477 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V19C3 18.4477 3.44772 18 4 18H17C17.5523 18 18 17.5523 18 17V1C18 0.447716 17.5523 0 17 0H4.5Z" fill="#545454" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" fill="none">
                                    <path d="M4.5 0C2.01473 0 0 2.01473 0 4.5V19.5C0 21.9853 2.01473 24 4.5 24H17C17.5523 24 18 23.5523 18 23V22C18 21.4477 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V19C3 18.4477 3.44772 18 4 18H17C17.5523 18 18 17.5523 18 17V1C18 0.447716 17.5523 0 17 0H4.5Z" fill="#545454" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" fill="none">
                                    <path d="M4.5 0C2.01473 0 0 2.01473 0 4.5V19.5C0 21.9853 2.01473 24 4.5 24H17C17.5523 24 18 23.5523 18 23V22C18 21.4477 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V19C3 18.4477 3.44772 18 4 18H17C17.5523 18 18 17.5523 18 17V1C18 0.447716 17.5523 0 17 0H4.5Z" fill="#545454" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" fill="none">
                                    <path d="M4.5 0C2.01473 0 0 2.01473 0 4.5V19.5C0 21.9853 2.01473 24 4.5 24H17C17.5523 24 18 23.5523 18 23V22C18 21.4477 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V19C3 18.4477 3.44772 18 4 18H17C17.5523 18 18 17.5523 18 17V1C18 0.447716 17.5523 0 17 0H4.5Z" fill="#D4D4D4" />
                                </svg>
                            </div>

                            {/* Botones de cantidad y compra */}
                            <div className="d-flex align-items-center my-3">
                                <div className={`detail-buttons-container ${isOutOfStock ? 'out-of-stock' : ''}`}>
                                    <div className={`quantity-section ${isOutOfStock ? 'disabled' : ''}`}>
                                        {isbn && <QuantityButtons isbn={isbn} disabled={isOutOfStock} />}
                                    </div>
                                    <ButtonAddToCart libro={producto} showIcon={false} />
                                </div>
                            </div>

                            {/* Información adicional */}
                            <ul className="productDetail-specs">
                                <li>
                                    Editorial: {libro.editorial}
                                </li>
                                <li>
                                    Encuadernación: {libro.encuadernacion}
                                </li>
                                <li>
                                    Idioma: {libro.idioma}
                                </li>
                                <li>
                                    Páginas: {libro.numeroPaginas}
                                </li>
                                <li>
                                    Dimensiones: {libro.dimensiones}
                                </li>
                            </ul>
                        </Col>
                    </Row>

                    {/* Argumento */}
                    <Row className="productDetail-argumento-container">
                        <Col>
                            <h3>Argumento</h3>
                            <p>{libro.resumen}</p>
                        </Col>
                    </Row>

                    {/* Recomendaciones */}
                    <Row className="productDetail-container-recomendaciones">
                        <Col className='productDetail-col-recomendaciones'>
                            <h3 className='productDetail-title-recomendaciones'>Recomendaciones</h3>
                            <div className='productDetail-container-recomendaciones-card'>
                                {recomendaciones.map((rec, index) => (
                                    <div key={index} className='productDetail-recomendaciones-card'>
                                        <Card>
                                            <Card.Img
                                                variant="top"
                                                src={rec.image}
                                                alt={rec.title}
                                            />
                                            <Card.Body className='productDetail-recomendaciones-info'>
                                                <Card.Title>{rec.title}</Card.Title>
                                                <Card.Text>{rec.author}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </>
            ) : (
                <div>No se encontró el producto</div>
            )}
        </Container>
    );
};

export default ProductDetail;