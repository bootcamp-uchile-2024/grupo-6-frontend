/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootType } from "../../states/store";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import '../../styles/shopping_cart.css'
import ButtonDeleteToCart from "./ButtonDeleteToCart";
import { useSelector } from "react-redux";
import ButtonClearCart from "./ButtonClearCart";
import { Link, useNavigate } from "react-router-dom";
import QuantityButtons from "./QuantityButtons";
import { useEffect } from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";


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

    return (

        <>
            <Container fluid>
                <div className='shoppingcart'>
                    <Row md="12" style={{ height: '4rem', width: '75.25rem', margin: '1.5rem' }}>
                        <Col md="5">
                            <h2 className='fw-bold'>Carrito de Compras</h2>
                        </Col>
                        <Col md="3"></Col>
                        <Col md="2">
                            <ButtonClearCart></ButtonClearCart>
                        </Col>
                        <Col md="2">
                        <Link to={`/categorias`}>
                                <Button style={{ backgroundColor: '#975C4C', color: '#FBFBFB', border: '#E1D5CA' }} >
                                    Seguir comprando
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Container>
            <div className='shoppingcart'>
                <Container fluid>
                    {shoppingCartProduct.length ? (
                        <div className='shoppingcart-items'>
                            <Row key='header' md="12" style={{ height: '4rem', width: '75.25rem', margin: '1.5rem', color: '#545454' }}>
                                <Col md="6">
                                    <p className='fw-bold'>Productos</p>
                                </Col>
                                <Col md="1">
                                </Col>
                                <Col md="2">
                                    <p className='d-flex align-items-center justify-content-center fw-bold'>Cantidad</p>
                                </Col>
                                <Col md="1">
                                </Col>
                                <Col md="2">
                                    <p className='d-flex align-items-center justify-content-center fw-bold'>Precio</p>
                                </Col>
                            </Row>
                            {shoppingCartProduct.map((item) => (
                                <Row key={item.isbn} md="12" style={{ height: '15rem', width: '75.25rem', margin: '1.5rem', color: '#545454' }}>
                                    <Col md="2">
                                        <Image src='https://placehold.co/800@3x.png' fluid></Image>
                                    </Col>
                                    <Col md="1">
                                    </Col>
                                    <Col md="3" style={{ height: '9.18rem', width: '15.94rem', margin: '1.5rem' }}>
                                        <p>{item.nombre}</p>
                                        <p >{item.autor}</p>
                                        <p >${item.precio}</p>

                                    </Col>
                                    <Col md="1">
                                    </Col>
                                    <Col md="2" className="d-flex align-items-center justify-content-center" style={{ height: '3rem', width: '14.688rem' }}>
                                        <div className="shoppingcart-item-detail-td-quantity-1">
                                            <QuantityButtons isbn={item.isbn} />
                                            <ButtonDeleteToCart libro={item}></ButtonDeleteToCart>
                                        </div>
                                    </Col>
                                    <Col md="1">
                                    </Col>
                                    <Col md="2" className="d-flex align-items-center justify-content-center" style={{ height: '3.18rem', width: '8.75rem' }}>
                                        <p className='fw-bold'>${calculateTotalProduct(item)}</p>
                                    </Col>
                                </Row>

                            ))}
                        </div>
                    ) : (
                        <div>No existen productos en el carrito de compras.</div>
                    )}
                    <div className="shoppingcart-item-top-footer">
                        <Row md="12" style={{ height: '4rem', width: '75.25rem', margin: '1.5rem' }}>
                            <Col md="5">
                                <h2 className='fw-bold'>Total a Pagar: ${calculateTotal(shoppingCartProduct)}</h2>
                            </Col>
                            <Col md="5"></Col>

                            <Col md="2">
                                <Link to={`/shoppingcart-resume/`}>
                                    <Button  style={{ backgroundColor: '#975C4C', color: '#FBFBFB', border: '#E1D5CA' }} >
                                        Comprar Ahora
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default ShoppingCart;
