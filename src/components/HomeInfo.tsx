import { useState, useEffect } from 'react';
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
                    nombre: 'The ultimate sneak...',
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
                    nombre: 'The Beatles on the...',
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
                <Container className="container-cards">
                    <div className="section-header">
                        <h3>Productos destacados</h3>
                    </div>
                    <div className="row-custom">{products.destacados.map(product => (
                        <div key={product.isbn} className="col-custom">
                            <div className="product-card">
                                <Card.Img
                                    variant="top"
                                    src={product.caratula}
                                    alt={product.nombre}
                                    className="card-image"
                                />
                                <Card.Body className="container-info-card">
                                    <Card.Title className="card-title">{product.nombre}</Card.Title>
                                    <Card.Text className="autor-card">{product.autor.join(', ')}</Card.Text>
                                    <p className="precio-card">${product.precio.toLocaleString()}</p>
                                    <div className="product-actions">
                                        <div className="button-cantidad-carrito">
                                            <Button variant="outline-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M18 12H6" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                            <span>1</span>
                                            <Button variant="outline-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                        </div>
                                        <Button variant="none" className="shopping-cart-button-cards">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Button>
                                    </div>
                                </Card.Body>
                            </div>
                        </div>
                    ))}
                    </div>
                </Container>
            </section>

            {/* Sección de novedades */}
            <section className="products-section novedades-section">
                <Container className="container-cards">
                    <div className="section-header">
                        <h3>Novedades</h3>
                    </div>
                    <div className="row-custom">
                        {products.novedades.map(product => (
                            <div key={product.isbn} className="col-custom">
                                <div className="product-card">
                                    <Card.Img
                                        variant="top"
                                        src={product.caratula}
                                        alt={product.nombre}
                                        className="card-image"
                                    />
                                    <Card.Body className="container-info-card">
                                        <Card.Title className="card-title">{product.nombre}</Card.Title>
                                        <Card.Text className="autor-card">{product.autor.join(', ')}</Card.Text>
                                        <p className="precio-card">${product.precio.toLocaleString()}</p>
                                        <div className="product-actions">
                                            <div className="button-cantidad-carrito">
                                                <Button variant="outline-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M18 12H6" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Button>
                                                <span>1</span>
                                                <Button variant="outline-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Button>
                                            </div>
                                            <Button variant="none" className="shopping-cart-button-cards">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Sección de tendencias */}
            <section className="products-section tendencias-section">
                <Container className="container-cards">
                    <div className="section-header">
                        <h3>Tendencias</h3>
                    </div>
                    <div className="row-custom">
                        {products.tendencias.map(product => (
                            <div key={product.isbn} className="col-custom">
                                <div className="product-card">
                                    <Card.Img
                                        variant="top"
                                        src={product.caratula}
                                        alt={product.nombre}
                                        className="card-image"
                                    />
                                    <Card.Body className="container-info-card">
                                        <Card.Title className="card-title">{product.nombre}</Card.Title>
                                        <Card.Text className="autor-card">{product.autor.join(', ')}</Card.Text>
                                        <p className="precio-card">${product.precio.toLocaleString()}</p>
                                        <div className="product-actions">
                                            <div className="button-cantidad-carrito">
                                                <Button variant="outline-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M18 12H6" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Button>
                                                <span>1</span>
                                                <Button variant="outline-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Button>
                                            </div>
                                            <Button variant="none" className="shopping-cart-button-cards">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    );
};

export default HomeInfo;
