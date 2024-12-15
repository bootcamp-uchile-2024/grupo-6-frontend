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

function MedioDePagoShoppingCart() {

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
            navigate('/successful-purchase');
            dispatch(clearCart());

        } else {
            alert("No se se pudo realizar la compra.");
        }
    }

    return (
        <div className='resumen-shopping-cart'>

            <Container fluid>
                <div className="item-top-resumen">
                    <Row md="12" style={{ height: '2rem', width: '75.25rem', margin: '1.5rem' }}>
                        <Col md="5">
                            <h2 className='fw-bold'>Pagar pedido</h2>
                        </Col>
                        <Col md="5"></Col>
                        <Col md="2">
                            <div className="back-to-resume">
                                <Link to={`/shoppingcart-resume/`}>
                                    <Button  style={{ backgroundColor: '#E1D5CA', color: '#975C4C', border: '#E1D5CA' }} >
                                        Volver al resumen
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row md="12" style={{ height: '2rem', width: '75.25rem', margin: '1.5rem' }}>
                        <Col md="5">
                            <h3 className='fw-bold'>Total a Pagar: ${calculateTotal(shoppingCartProduct)}</h3>
                        </Col>
                        <Col md="7">
                        </Col>
                    </Row>
                </div>

                {shoppingCartProduct.length ? (
                    <div className='shoppingcart-items'>
                        <Row md="12" className='center' style={{ height: '2rem', width: '75.25rem', margin: '1.5rem' }}>
                            <Col md="4">
                            </Col>
                            <Col md="4">
                                <h4 className='fw-bold'>Elige un medio de pago</h4>
                            </Col>
                            <Col md="4">
                            </Col>
                        </Row>
                        <div className="metodos-de-pago">
                            <Row key='despacho' className='d-flex align-items-center justify-content-between fw-bold' md="12" style={{ height: '9rem', width: '75.25rem', margin: '1.5rem', color: '#545454' }}>
                                    <Col  md="3">
                                        <Button id="boton-transferencia-bancaria" className='d-flex align-items-center justify-content-between fw-bold' style={{ backgroundColor: 'white', color: '#545454', borderWidth: "8px",borderColor: '#975C4C',   height: '8.5rem', width: '18.5rem'}} onClick={handleSubmit}>
                                        <img src={iconoMercadoPago} alt="Mercado Pago"  style={{   height: '2.34rem', width: '3.5rem'}} ></img>
                                        Transferencia Bancaria      
                                        </Button>                                
                                    </Col>
                                    <Col   md="3">
                                        <Button id="boton-tu-banco" style={{ backgroundColor: 'white', color: '#545454', borderWidth: "8px",borderColor: '#975C4C',   height: '8.5rem', width: '18.5rem'}} onClick={handleSubmit}>
                                            <img src={iconoPayPal} alt="PayPal" style={{   height: '2.34rem', width: '3.5rem'}} ></img>
                                            Paga con tu banco
                                        </Button>                                
                                    </Col>
                                    <Col  md="3">
                                        <Button id="boton-web-pay" style={{ backgroundColor: 'white', color: '#545454', borderWidth: "8px",borderColor: '#975C4C',   height: '8.5rem', width: '18.5rem'}}  onClick={handleSubmit}>
                                            <img src={iconoWebpay} alt="WebPay" style={{   height: '2.34rem', width: '3.5rem'}} ></img>
                                            Webpay
                                        </Button>                                
                                    </Col>
                            </Row>
                        </div>
                    </div>

                ) : (
                    <div>No existen productos en el carrito de compras.</div>
                )}
            </Container>
        </div>
    );
};

export default MedioDePagoShoppingCart;