import { RootType } from "../../states/store";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import '../../styles/resumen_shopping_cart.css'
import { useDispatch, useSelector } from "react-redux";
import iconoMercadoPago from '../../assets/images/logo-mercadopago29.png'
import iconoPayPal from '../../assets/images/Paypal_2014_logo.png'
import iconoWebpay from '../../assets/images/logo-webpay-plus-3-2.png'
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../../states/productSlice";
import { configuracion } from "../../config/appConfiguration";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";

function ResumenShoppingCart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const shoppingCartProduct = useSelector((state: RootType) => state.productReducer.cart.items);

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

    const handleSubmit = async () => {
        //event.preventDefault();


        const response = await fetch(configuracion.urlJsonServerBackendShoppingCart, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(shoppingCartProduct)
        });

        if (response.status === 200) {
            alert("¡Compra exitosa!");
            navigate('/');
            dispatch(clearCart());

        } else {
            alert("No se se pudo realizar la compra.");
        }
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
            </Container>
        </div>
    );
};

export default ResumenShoppingCart;