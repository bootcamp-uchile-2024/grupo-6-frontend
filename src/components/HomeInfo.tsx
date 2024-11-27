import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Carousel } from 'react-bootstrap';
import '../styles/home_info.css'
import libroManga from '../assets/images/Libros/100-manga.webp'
import libroPasos from '../assets/images/Libros/12-pasos.webp'
import libroManual from '../assets/images/Libros/Manual-del-fotografo.webp'
import libroAnimals from '../assets/images/Libros/animals.webp'
import libroArbolSaliva from '../assets/images/Libros/arbol-de-saliva.webp'
import libroIliada from '../assets/images/Libros/iliada.webp'
import libroInvitadoDracula from '../assets/images/Libros/invitado-dracula.webp'
import libroAsia from '../assets/images/Libros/libro asia.webp'
import libroBeatles from '../assets/images/Libros/libro beatles.webp'
import libroDibujoFacil from '../assets/images/Libros/libro dibujo facil.webp'
import libroDiseñoHistoria from '../assets/images/Libros/libro diseño historia.webp'
import libroDiseño from '../assets/images/Libros/libro diseño.webp'
import libroMotos from '../assets/images/Libros/libro motos.webp'
import libroZapatillas from '../assets/images/Libros/libro zapatillas.webp'
import libroTreeHouses from '../assets/images/Libros/tree-houses.webp'
import esoterismo from '../assets/images/esoterismo.png'
import autoAyuda from '../assets/images/autoayuda.png'
import ciencias from '../assets/images/ciencias.png'

interface IProductCards {
    isbn: string;
    nombre: string;
    autor: string[];
    precio: number;
    stockLibro: number;
    caratula: string;
}

const HomeInfo = () => {
    const [products, setProducts] = useState<{
        destacados: IProductCards[];
        novedades: IProductCards[];
        tendencias: IProductCards[];
    }>({
        destacados: [],
        novedades: [],
        tendencias: [],
    });

    useEffect(() => {
        // Simula datos con la estructura de ILibro
        setProducts({
            destacados: [
                {
                    isbn: '100',
                    nombre: 'The ultimate sneaker book',
                    autor: ['Simon "woody" Wood'],
                    precio: 30990,
                    stockLibro: 5,
                    caratula: libroZapatillas,
                },
                {
                    isbn: '101',
                    nombre: 'Animals',
                    autor: ['Steve McCurry'],
                    precio: 18990,
                    stockLibro: 3,
                    caratula: libroAnimals,
                },
                {
                    isbn: '102',
                    nombre: 'Diseño, toda la historia',
                    autor: ['Elizabeth Wilhide'],
                    precio: 15990,
                    stockLibro: 10,
                    caratula: libroDiseñoHistoria,
                },
                {
                    isbn: '103',
                    nombre: 'Motorcycles',
                    autor: ['Charlotte & Peter Fiell'],
                    precio: 27990,
                    stockLibro: 5,
                    caratula: libroMotos,
                },
                {
                    isbn: '104',
                    nombre: 'El árbol de saliva',
                    autor: ['Brian Aldiss'],
                    precio: 12990,
                    stockLibro: 5,
                    caratula: libroArbolSaliva,
                }
            ],
            novedades: [
                {
                    isbn: '105',
                    nombre: 'Living in asia',
                    autor: ['Sunil Sethi'],
                    precio: 18990,
                    stockLibro: 3,
                    caratula: libroAsia,
                },
                {
                    isbn: '106',
                    nombre: 'Manual del fotógrafo',
                    autor: ['Michael Freeman'],
                    precio: 15990,
                    stockLibro: 9,
                    caratula: libroManual,
                },
                {
                    isbn: '107',
                    nombre: 'Diseño escandinavo',
                    autor: ['Charlotte & Peter Fiell'],
                    precio: 25990,
                    stockLibro: 7,
                    caratula: libroDiseño,
                },
                {
                    isbn: '108',
                    nombre: '100 manga artist',
                    autor: ['Julius Wideman'],
                    precio: 18990,
                    stockLibro: 15,
                    caratula: libroManga,
                },
                {
                    isbn: '109',
                    nombre: 'Los 12 pasos',
                    autor: ['Kikan Massara'],
                    precio: 13990,
                    stockLibro: 6,
                    caratula: libroPasos,
                }
            ],
            tendencias: [
                {
                    isbn: '110',
                    nombre: 'The Beatles on the road',
                    autor: ['Harry Benson'],
                    precio: 25990,
                    stockLibro: 15,
                    caratula: libroBeatles,
                },
                {
                    isbn: '111',
                    nombre: 'Tree houses',
                    autor: ['Philip Jodidio'],
                    precio: 21990,
                    stockLibro: 10,
                    caratula: libroTreeHouses,
                },
                {
                    isbn: '112',
                    nombre: 'Dibujo fácil',
                    autor: ['Chelsea Ward'],
                    precio: 13990,
                    stockLibro: 5,
                    caratula: libroDibujoFacil,
                },
                {
                    isbn: '113',
                    nombre: 'El invitado de drácula',
                    autor: ['Dram Stoker'],
                    precio: 18990,
                    stockLibro: 5,
                    caratula: libroInvitadoDracula,
                },
                {
                    isbn: '114',
                    nombre: 'Iliada',
                    autor: ['Homero'],
                    precio: 15990,
                    stockLibro: 5,
                    caratula: libroIliada,
                },
            ],
        });
    }, []);

    return (
        <main>
            {/* Slider */}
            <Container className="carousel-container">
                <Carousel className="custom-carousel" interval={5000} indicators controls>
                    {/* Slice 1 */}
                    <Carousel.Item>
                        <div className="carousel-slide">
                            <div className="text-section">
                                <h2 className="main-title">¡Bienvenido a Páginas Selectas!</h2>
                                <p className="sub-title">
                                    El lugar ideal para encontrar <br />
                                    tu próxima lectura
                                </p>
                            </div>
                            <div
                                className="image-section"
                                style={{ backgroundImage: `url(${esoterismo})` }}>
                            </div>
                        </div>
                    </Carousel.Item>

                    {/* Slice 2 */}
                    <Carousel.Item>
                        <div className="carousel-slide">
                            <div className="text-section">
                                <h2 className="main-title">¿Buscas mejorar tus hábitos?</h2>
                                <p className="sub-title">¡Haz click en esta sección!</p>
                            </div>
                            <div
                                className="image-section"
                                style={{ backgroundImage: `url(${autoAyuda})` }}>
                            </div>
                        </div>
                    </Carousel.Item>

                    {/* Slice 3 */}
                    <Carousel.Item>
                        <div className="carousel-slide">
                            <div className="text-section">
                                <h2 className="main-title">¡Encuentra la respuesta a todas tus preguntas!</h2>
                                <p className="sub-title">Expándete, explora, conócete.</p>
                            </div>
                            <div
                                className="image-section"
                                style={{ backgroundImage: `url(${ciencias})` }}>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </Container>

            {/* Sección de destacados */}
            <section className="products-section destacados-section">
                <Container className="centered-container">
                    <div className="section-header">
                        <h3>Productos destacados</h3>
                    </div>
                    <div className="row-custom">
                        {products.destacados.map(product => (
                            <div key={product.isbn} className="col-custom">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Sección de novedades */}
            <section className="products-section novedades-section">
                <Container className="centered-container">
                    <div className="section-header">
                        <h3>Novedades</h3>
                    </div>
                    <div className="row-custom">
                        {products.novedades.map(product => (
                            <div key={product.isbn} className="col-custom">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Sección de tendencias */}
            <section className="products-section tendencias-section">
                <Container className="centered-container">
                    <div className="section-header">
                        <h3>Tendencias</h3>
                    </div>
                    <div className="row-custom">
                        {products.tendencias.map(product => (
                            <div key={product.isbn} className="col-custom">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    );
};

// Componente de tarjeta de producto
const ProductCard: React.FC<{ product: IProductCards }> = ({ product }) => (
    <Card className="product-card">
        <Card.Img
            variant="top"
            src={product.caratula}
            alt={product.nombre}
        />
        <Card.Body>
            <Card.Title>{product.nombre}</Card.Title>
            <Card.Text className='autor-card'>{product.autor.join(", ")}</Card.Text>
            <p className="precio-card">${product.precio.toLocaleString()}</p>
            <div className="product-actions">
                <Button variant="outline-secondary">-</Button>
                <span>1</span>
                <Button variant="outline-secondary">+</Button>
                <Button variant="none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none" className="icon-shoppingCart-button">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.923085 0.571411C0.413279 0.571411 0 1.0309 0 1.59771C0 2.16452 0.413279 2.62401 0.923085 2.62401H3.0375L3.25474 4.31471C3.25636 4.32957 3.25825 4.34434 3.26043 4.359L4.75386 15.9819C4.75549 15.9969 4.7574 16.0118 4.75961 16.0266L5.25629 19.8921C5.32125 20.3977 5.71072 20.7733 6.17009 20.7733H6.52868C6.09407 21.2884 5.83008 21.9668 5.83008 22.7101C5.83008 24.3211 7.06992 25.627 8.59933 25.627C10.1288 25.627 11.3686 24.3211 11.3686 22.7101C11.3686 21.9668 11.1046 21.2884 10.67 20.7733H15.7591C15.3245 21.2884 15.0605 21.9668 15.0605 22.7101C15.0605 24.3211 16.3004 25.627 17.8298 25.627C19.3592 25.627 20.5991 24.3211 20.5991 22.7101C20.5991 21.6423 20.0543 20.7085 19.2415 20.2002C19.3021 20.0635 19.3362 19.9097 19.3362 19.747C19.3362 19.1802 18.9229 18.7207 18.4131 18.7207H6.97068L6.73471 16.8841H19.579C19.9763 16.8841 20.3291 16.6015 20.4547 16.1824L23.9527 4.51501C24.0466 4.20204 23.9994 3.858 23.8259 3.59038C23.6524 3.32275 23.3738 3.16417 23.077 3.16417H4.97182L4.7519 1.45257C4.68693 0.946964 4.29746 0.571411 3.83809 0.571411H0.923085ZM5.23556 5.21676L6.47097 14.8315H18.9137L21.7963 5.21676H5.23556ZM8.59933 21.4476C7.93734 21.4476 7.4007 22.0128 7.4007 22.7101C7.4007 23.4074 7.93734 23.9726 8.59933 23.9726C9.26135 23.9726 9.79797 23.4074 9.79797 22.7101C9.79797 22.0128 9.26135 21.4476 8.59933 21.4476ZM16.6312 22.7101C16.6312 22.0128 17.1678 21.4476 17.8298 21.4476C18.4918 21.4476 19.0284 22.0128 19.0284 22.7101C19.0284 23.4074 18.4918 23.9726 17.8298 23.9726C17.1678 23.9726 16.6312 23.4074 16.6312 22.7101Z" fill="currentColor" />
                    </svg>
                </Button>
            </div>
        </Card.Body>
    </Card>
);

export default HomeInfo;
