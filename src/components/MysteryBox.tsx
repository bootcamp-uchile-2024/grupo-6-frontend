import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import mysteryBoxMujer from '../assets/images/mystery-box-mujer.png'
import '../styles/mystery_box.css'
import { useState, useEffect } from 'react';
import { configuracion } from '../config/appConfiguration';
import ButtonAddToCart from './shoppingcart/ButtonAddToCart';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';

export const MysteryBox = () => {

    const [genres, setGenres] = useState<string[]>([]);  // Estado de los géneros
    const [boxes, setBoxes] = useState<ShoppingCartEntrada[]>([]); // Estado de los productos (Mystery Boxes)
    const [selectedBox, setSelectedBox] = useState<ShoppingCartEntrada | null>(null); // Estado para el libro seleccionado

    useEffect(() => {
        // Fetch para los géneros
        fetch(configuracion.urlJsonServerBackendGenres)
            .then((response) => response.json())
            .then((data) => {
                setGenres(data);
            })
            .catch((error) => console.error('Error al cargar los géneros:', error));

        // Fetch para Mystery Boxes
        fetch(`${configuracion.urlJsonServerBackendDetailsSearch}?query=mystery`)
            .then((response) => response.json())
            .then((data) => {
                console.log(`La data es: ${data}`)
                setBoxes(data.productos);
            })
            .catch((error) => console.error('Error al cargar los productos:', error));
    }, []);

    const url = configuracion.urlJsonServerBackendCover.toString();

    const handleRadioChange = (isbn: string) => {
        const selectedProduct = boxes.find((product) => product.isbn === isbn);
        setSelectedBox(selectedProduct || null);
    };

    return (
        <Container className='mystery-container'>
            <Row>
                <Col lg={12} className='d-flex justify-content-center align-items-center'>
                    <h1>Mystery Box</h1>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-items-center mystery-info'>
                <Col lg={2}>
                    <img src={mysteryBoxMujer} alt="" />
                </Col>
                <Col lg={6}>
                    <p>Estás a punto de adquirir tu Mystery Box, la que recibirás mes a mes. Sigue los pasos y comienza esta ¡nueva experiencia de lectura!</p>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center mystery-form'>
                <Col lg={4}>
                    <p>Selecciona el género literario que te gusta</p>
                </Col>
                <Col lg={3}>
                        <select className='mystery-select' required>
                            {/* Mostrar los géneros */}
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-items-center mystery-text'>
                <Col lg={12}>
                    <p>¿Qué Mystery Box quieres recibir?</p>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center mystery-card-container'>
                {/* Mostrar Mystery Boxes */}
                {boxes.map((product) => (
                    <Col lg={3} key={product.isbn}>
                        <div className={`mystery-card ${product.nombre.toLowerCase().replace(" ", "-")}`}>
                            <img src={`${url}${product.caratula}`} alt={product.nombre} />
                            <div className="radio-container">
                                <input type="radio"
                                    name="mystery-box"
                                    id={product.isbn} 
                                    value={product.isbn}
                                    onChange={() => handleRadioChange(product.isbn)}
                                    required/>
                                <label htmlFor={product.isbn}>{product.nombre}</label>
                            </div>
                            <p>1 Libro</p>
                            <p>1 Marca Páginas</p>
                            {product.nombre === "Mystery Box Supreme" && (
                                <>
                                    <p>Artículo Booker</p>
                                    <p>Club de Lectura</p>
                                </>
                            )}
                            <p className='precio'>${product.precio.toLocaleString()}</p>
                        </div>
                    </Col>
                ))}
            </Row>

            <Row className='d-flex justify-content-center align-items-center mystery-checkbox'>
                <Col lg={3}>
                    <input type="checkbox" name="regalo" id="regalo"/>
                    <label htmlFor="regalo">Es un regalo uwu</label>
                </Col>
                <Col lg={3}>
                    <input type="checkbox" name="suscripcion" id="suscripcion"/>
                    <label htmlFor="suscripcion">Es una suscripción</label>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center align-items-center mystery-button'>
                <Col lg={12} className='d-flex justify-content-center align-items-center'>
                    <ButtonAddToCart libro={selectedBox} showIcon={false} />
                </Col>
            </Row>

        </Container>
    )
}