import { RootType } from "../../states/store";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import '../../styles/shopping_cart.css'
import ButtonDeleteToCart from "./ButtonDeleteToCart";
import { useSelector } from "react-redux";
import ButtonClearCart from "./ButtonClearCart";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import { configuracion } from "../../config/appConfiguration";
import QuantityButtons from "./QuantityButtons";

function ShoppingCart() {
    const shoppingCartProduct = useSelector((state: RootType) => state.productReducer.cart.items);
    const navigate = useNavigate();

    const calculateTotal = (items: ShoppingCartEntrada[]) => {
        let initialTotal = 0;
        items.forEach(item => {
            initialTotal = initialTotal + item.precio * item.cantidad;
        });
        return initialTotal;
    }

    const calculateTotalProduct = (item: ShoppingCartEntrada) => {
        return item.precio * item.cantidad;
    }


    useEffect(() => {
        if (shoppingCartProduct.length === 0) {
            navigate('/empty-cart'); // Redirige a la página de carrito vacío
        }
    }, [shoppingCartProduct, navigate])

    const url = configuracion.urlJsonServerBackendCover.toString();

    return (

        <>
            <Container fluid>
                <div className='shoppingcart'>
                    <Row>
                        <Col>
                            <h2 className='fw-bold'>Carrito de Compras</h2>
                        </Col>
                        <Col className="clear-cart-button">
                            <ButtonClearCart></ButtonClearCart>
                        </Col>
                        <Col className="seguir-comprando-button">
                            <Link to={`/categorias`}>
                                <Button variant='none' className='md-2'>
                                    Seguir comprando
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <div className='shoppingcart'>
                    {shoppingCartProduct.length ? (
                        <div className='shoppingcart-items'>

                            {shoppingCartProduct.map((item) => (
                                <Row key={item.isbn} md="12" style={{ height: '15rem', margin: '1.5rem', color: '#545454' }}>
                                    <Col>
                                        <Image src={`${url}${item.caratula}`} alt={`imagen del libro ${item.nombre}`} style={{ width: '160px', height: '240px' }} fluid></Image>
                                    </Col>
                                    <Col>
                                    </Col>
                                    <Col>
                                        <p>{item.nombre}</p>
                                        <p >{item.autor}</p>
                                        <p >${item.precio}</p>

                                    </Col>
                                    <Col className="d-flex align-items-center justify-content-center" style={{ height: '3rem', width: '14.688rem' }}>
                                        <div className="shoppingcart-item-detail-td-quantity-1">
                                            <QuantityButtons isbn={item.isbn} disabled={false} />
                                            <ButtonDeleteToCart libro={item}></ButtonDeleteToCart>
                                        </div>
                                    </Col>
                                    <Col className="d-flex align-items-center justify-content-center" style={{ height: '3.18rem', width: '8.75rem' }}>
                                        <p className='fw-bold'>${calculateTotalProduct(item)}</p>
                                    </Col>
                                </Row>

                            ))}
                        </div>

                    ) : (
                        <div>No existen productos en el carrito de compras.</div>
                    )}

                    <div className="shoppingcart-item-top-footer">
                        <Row>
                            <Col>
                                <h2>Total a Pagar: ${calculateTotal(shoppingCartProduct)}</h2>
                            </Col>
                            <Col></Col>

                            <Col className="iniciar-sesion-button">
                                <Link to={`/login`}>
                                    <Button>
                                        Iniciar sesión
                                    </Button>
                                </Link>
                                <Link to={`/shoppingcart-resume/`}>
                                    <Button>
                                        Resumen compra
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ShoppingCart;