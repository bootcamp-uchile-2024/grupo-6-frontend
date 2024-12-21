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
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Form from "react-bootstrap/esm/Form";

function ResumenShoppingCart() {
    const shoppingCartProduct = useSelector((state: RootType) => state.productReducer.cart.items);
    const [selectedAddress, setSelectedAddress] = useState("Los Olmos 666, Macul, RM");
    const [despacho] = useState(5000);

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

    // Calcula el total del carrito de compras + despacho
    const calculateTotalConDespacho = (items: ShoppingCartEntrada[]) => {
        let initialTotal = 0;
        items.forEach(item => {
            initialTotal = initialTotal + item.precio * item.cantidad;
        });
        return initialTotal + despacho;
    }

    //Calcula el total de cada producto basado en la cantidad
    const calculateTotalProduct = (item: ShoppingCartEntrada) => {
        return item.precio * item.cantidad;
    }

    return (
        <div className='resumen-shopping-cart'>
            <Container>
                <div className='shoppingcart'>
                    <Row>
                        <Col lg={8}>
                            <h2 className='fw-bold'>Resumen de compra</h2>
                        </Col>
                        <Col className="clear-cart-button" lg={2}>
                            <Link to={`/carrito`}>
                                <Button style={{ backgroundColor: '#E1D5CA', color: '#975C4C', border: '#E1D5CA' }} >
                                    Volver a carrito
                                </Button>
                            </Link>
                        </Col>
                        <Col className="seguir-comprando-button" lg={2}>
                            <Link to={`/categorias`}>
                                <Button variant='none' className='md-2'>
                                    Pagar el pedido
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row md="12" style={{ height: '4rem', width: '75.25rem' }}>
                        <Col md="5">
                            <h3 className='fw-bold'>Total a Pagar: ${calculateTotalConDespacho(shoppingCartProduct).toLocaleString()}</h3>
                        </Col>
                        <Col md="7">
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row md="12" style={{ height: '4rem', width: '75.25rem' }}>
                        <Col md="6">
                        </Col>
                        <Col md="3">
                            <h5 className='fw-bold'>Total carrito: ${calculateTotal(shoppingCartProduct).toLocaleString()}</h5>
                            <h5 className='fw-bold'>Valor del despacho: ${despacho.toLocaleString()}</h5>
                        </Col>
                        <Col md="3">
                        </Col>
                    </Row>
                </div>

                {shoppingCartProduct.length ? (
                    <div className='shoppingcart-items'>
                        {shoppingCartProduct.map((item) => (
                            <Row key={item.isbn} className="mb-3">
                                <Col md="3"></Col>
                                <Col md="2">
                                    <Image src={`${url}${item.caratula}`} alt={`imagen del libro ${item.nombre}`} style={{ width: '160px', height: '240px' }} fluid></Image>
                                </Col>

                                <Col className="d-flex align-items-center justify-content-center cart-product-info" md="2">
                                    <p>{item.nombre}</p>
                                </Col>

                                <Col className="d-flex align-items-center justify-content-center cart-product-info" md="2">
                                    <p>${calculateTotalProduct(item).toLocaleString()}</p>
                                </Col>
                                <Col md="3"></Col>
                            </Row>
                        ))}
                    </div>

                ) : (
                    <div>No existen productos en el carrito de compras.</div>
                )}

                <div className="d-flex align-items-center p-3 border rounded">
                    {/* Seleccionar dirección */}
                    <Row md="12" style={{ height: '4rem', width: '75.25rem' }}>
                    <Form.Group className="flex-grow-1 me-3 d-flex align-items-center">
                        <Col md="2"></Col>
                        <Col md="4">
                            <Form.Label>Seleccionar tu dirección</Form.Label>
                        </Col>
                        <Col md="4">
                        <DropdownButton
                            id="dropdown-address-selector"
                            title={selectedAddress || 'Seleccionar dirección'}
                            onSelect={handleSelectAddress}
                            variant="outline-secondary"

                        >
                            {addresses.length > 0 ? (
                                addresses.map((address, index) => (
                                    <Dropdown.Item key={index} eventKey={address}>
                                        {address}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled>No hay direcciones disponibles</Dropdown.Item>
                            )}
                        </DropdownButton>
                        </Col>
                        <Col md="2"></Col>
                    </Form.Group>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default ResumenShoppingCart;