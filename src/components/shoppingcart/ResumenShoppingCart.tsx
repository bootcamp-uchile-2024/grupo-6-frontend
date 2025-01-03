import { RootType } from "../../states/store";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import '../../styles/resumen_shopping_cart.css'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { useFetchGetAddress } from "../../hooks/useFetchUser";
import { IDireccion } from "../../interfaces/IDireccion";
import { jwtDecode } from "jwt-decode";

function ResumenShoppingCart() {
    const shoppingCartProduct = useSelector((state: RootType) => state.productReducer.cart.items);
    const [despacho] = useState(5000);
    const navigate = useNavigate();

    const url = configuracion.urlJsonServerBackendCover.toString();
    const urlShoppingCart = configuracion.urlJsonServerBackendShoppingCart.toString();

    // HANDLE PARA CAMBIAR DIRECCIÓN SEGÚN INPUR RADIO

    const [selectedAddress, setSelectedAddress] = useState<IDireccion | null>(null);
    const [selectedAddressString, setSelectedAddressString] = useState<string | null>("Editar dirección");
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
    const decodedToken = jwtDecode<{ idUsuario: number; rol: string; exp: number }>(loggedInUser.token);

    const { data: addresses, loading: loadingAddress, error: errorAddress } = useFetchGetAddress<IDireccion[]>(configuracion.urlJsonServerBackendUsers, decodedToken.idUsuario);


    if (loadingAddress) return <p>Cargando datos de las direcciones del usuario...</p>
    if (errorAddress) return <p>Error en la consulta de las direcciones del usuario {errorAddress}</p>


    // HANDLE PARA CAMBIAR DIRECCIÓN SEGÚN INPUR RADIO
    const handleSelectAddress = (addressId: number) => {
        const selected = addresses?.find((addr) => addr.idDireccion === addressId);
        console.log("Direcciones anterior seleccionada:", selectedAddress?.calle, selectedAddress?.numeroCalle, selectedAddress?.comuna, selectedAddress?.ciudad, selectedAddress?.region);
        console.log("Direccion actual seleccionada:", selected);

        if (selected) {
            setSelectedAddress(selected);
            setSelectedAddressString(`${selected.calle} ${selected.numeroCalle}, ${selected.comuna}, ${selected.ciudad}, ${selected.region}.`);
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


    const handleSentToBackendShoppingCart = async (items: ShoppingCartEntrada[]) => {
        // Mapeo del carrito en el formato requerido
        const shoppingCart = items.map((item) => ({
          isbn: item.isbn,
          cantidad: item.cantidad,
          precio: calculateTotalProduct(item),
          descuento: 0, // Puedes ajustar el descuento según sea necesario
        }));
      
        // Construcción del objeto final
        const payload = {
          fechaCompra: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
          precioTotal: calculateTotalConDespacho(items),
          shoppingCart,
        };
      
        try {
          // Realizar el POST al backend
          const urlRequest = `${urlShoppingCart}/bulk`;
          const response = await fetch(urlRequest, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${loggedInUser.token}`

            },
            body: JSON.stringify(payload),
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log('Compra enviada correctamente:', result);
            // Redirigir a la página de confirmación
            navigate('/shoppingcart-payment/');

          } else {
            console.error('Error al enviar el carrito:', response.statusText);
          }
        } catch (error) {
          console.error('Error de red al enviar el carrito:', error);
        }
      };

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
                                <Button variant='none' className='md-2' onClick={() => handleSentToBackendShoppingCart(shoppingCartProduct)}>
                                    Pagar el pedido
                                </Button>
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row md="12" className="shoppingcart-price">
                        <Col md="5">
                            <h3 className='fw-bold'>Total a Pagar: ${calculateTotalConDespacho(shoppingCartProduct).toLocaleString()}</h3>
                        </Col>
                        <Col md="7">
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row md="12">
                        <Col md="6">
                        </Col>
                        <Col md="3" className="shoppingcart-price">
                            <h5 className='fw-bold'>Total carrito: ${calculateTotal(shoppingCartProduct).toLocaleString()}</h5>
                        </Col>
                        <Col md="3">
                        </Col>
                    </Row>
                    <Row md="12">
                        <Col md="6">
                        </Col>
                        <Col md="3" className="shoppingcart-price">
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

                <div className="d-flex align-items-center p-3">
                    {/* Seleccionar dirección */}
                    <Row md="12" style={{ height: '4rem', width: '75.25rem' }}>
                        <Form.Group className="container-direccion">
                            <Col md="2"></Col>
                            <Col md="4">
                                <Form.Label>Seleccionar tu dirección</Form.Label>
                            </Col>
                            <Col md="4">
                                <DropdownButton
                                    id="dropdown-address-selector"
                                    title={`${selectedAddressString}` || 'Seleccionar dirección'}
                                    onSelect={(eventKey) => { if (eventKey) handleSelectAddress(parseInt(eventKey)); }}
                                    variant="outline-secondary"
                                    disabled={!addresses || addresses.length === 0}
                                   style={{ width: '400px' }}
                                >
                                    {addresses && addresses.length > 0 ? (
                                        addresses.map((address) => (
                                            <Dropdown.Item key={address.idDireccion} eventKey={address.idDireccion}>
                                                {address.calle} {address.numeroCalle}, {address.comuna}, {address.ciudad}, {address.region}
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