import { RootType } from "../../states/store";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import '../../styles/resumen_shopping_cart.css'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { useState } from "react";
import { configuracion } from "../../config/appConfiguration";

function ResumenShoppingCart() {
    const shoppingCartProduct = useSelector((state: RootType) => state.productReducer.cart.items);
    const [selectedAddress, setSelectedAddress] = useState("Los Olmos 666, Macul, RM");
    const url = configuracion.urlJsonServerBackendCover.toString();

    const addresses = [
        "Los Olmos 666, Macul, RM",
        "Avenida Siempre Viva 742, Springfield",
        "Calle Falsa 123, Villa Real, RM",
    ];

    const handleSelectAddress = (address: string | null) => {
        if (address !== null) {
            setSelectedAddress(address); // Aseguramos que `address` no es nulo
        }
    };

    // Calcula el total del carrito de compras
    const calculateTotal = (items: ShoppingCartEntrada[]) => {
        let initialTotal = 0;
        items.forEach(item => {
            initialTotal = initialTotal + item.precio * item.cantidad;
        });
        return initialTotal;
    }

    //Calcula el total de cada producto basado en la cantidad
    const calculateTotalProduct = (item: ShoppingCartEntrada) => {
        return item.precio * item.cantidad;
    }

    return (
        <div className='resumen-shopping-cart'>

            <Container fluid>
                <div className="item-top-resumen">
                    <Row md="12" style={{ height: '4rem', width: '75.25rem', margin: '1.5rem' }}>
                        <Col md="5">
                            <h2 className='fw-bold'>Resumen de compra</h2>
                        </Col>
                        <Col md="3"></Col>
                        <Col md="2">
                            <div className="back-to-carrito">
                                <Link to={`/carrito`}>
                                    <Button style={{ backgroundColor: '#E1D5CA', color: '#975C4C', border: '#E1D5CA' }} >
                                        Volver a carrito
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                        <Col md="2">

                            <Link to={`/shoppingcart-payment`}>
                                <Button className="button-shoppingcart-resume" style={{ backgroundColor: '#975C4C', color: '#FBFBFB', border: '#E1D5CA' }}>
                                    Pagar el pedido
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row md="12" style={{ height: '4rem', width: '75.25rem', margin: '1.5rem' }}>
                        <Col md="5">
                            <h3 className='fw-bold'>Total a Pagar: ${calculateTotal(shoppingCartProduct)}</h3>
                        </Col>
                        <Col md="7">
                        </Col>
                    </Row>
                </div>

                {shoppingCartProduct.length ? (
                    <div className='shoppingcart-items'>
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
                                    <Image src={`${url}${item.caratula}`} alt={`imagen del libro ${item.nombre}`} style={{width: '160px', height: '240px'}} fluid></Image>
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
                                            <p>{item.cantidad}</p>
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
                    </div>

                ) : (
                    <div>No existen productos en el carrito de compras.</div>
                )}

                <div className="'shoppingcart-items">
                        <Row md="12" style={{ height: '4rem', width: '75.25rem', margin: '1.5rem' }}>
                            <Col md="6">
                                <h4 className="d-flex  fw-bold">Despacho a domicilio</h4>
                            </Col>
                            <Col md="4">
                                <Dropdown onSelect={(e) => handleSelectAddress(e)}   style={{ color:  '#FBFBFB', borderColor:  '#975C4C'}}>
                                    <Dropdown.Toggle variant="outline-primary" id="dropdown-direcciones">
                                        {selectedAddress || "Seleccionar dirección"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {addresses.map((address, index) => (
                                            <Dropdown.Item key={index} eventKey={address}>
                                                {address}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col md="1" >
                            </Col>
                            <Col md="1" className="d-flex align-items-center justify-content-center" style={{ height: '3.18rem', width: '1rem' }}>
                                <p className="fw-bold">$5000</p>
                            </Col>
                        </Row>
                    </div>
            </Container>
        </div>
    );
};

export default ResumenShoppingCart;