import { RootType } from "../../states/store";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import '../../styles/resumen_shopping_cart.css'
import { useDispatch, useSelector } from "react-redux";
import iconoWebpay from '../../assets/images/webpay-one-click.png'
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
    const idDireccion = useSelector((state: RootType) => state.addressReducer.idDireccionEntrega);
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');


    // Calcula el total del carrito de compras
    const calculateTotal = (items: ShoppingCartEntrada[]) => {
        let initialTotal = 0;
        items.forEach(item => {
            initialTotal = initialTotal + item.precio * item.cantidad;
        });
        return initialTotal;
    }

    // Método para manejar el pago y enviar el tipo de pago
    const handleSubmit = async (metodoPago: string) => {
        const payload = {
            idDireccionEntrega: idDireccion,
            metodoPago: metodoPago,
        };

        try {
            const response = await fetch(configuracion.urlJsonServerBackendPurchases, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser.token}`

                },
                body: JSON.stringify(payload)
            });

            if (response.status === 201) {
                /* alert(`¡Compra exitosa con ${metodoPago}!`); */
                navigate('/successful-purchase');
                dispatch(clearCart());
            } else {
                alert("No se pudo realizar la compra.");
            }
        } catch (error) {
            console.error("Error en la compra:", error);
            alert("Ocurrió un error al procesar la compra.");
        }
    }

    return (
        <Container>
            <Row lg={12} className="d-flex justify-content-between item-top-resumen">
                <Col lg={9}>
                    <h2>Pagar pedido</h2>
                </Col>
                <Col className="back-to-resume ms-auto" lg={3}>
                    <Link to={`/shoppingcart-resume/`}>
                        <Button>
                            Volver al resumen
                        </Button>
                    </Link>
                </Col>
            </Row>

            <div>
                <Row>
                    <Col>
                        <h3 className="metodos-pago-total">Total a Pagar: ${calculateTotal(shoppingCartProduct).toLocaleString()}</h3>
                    </Col>
                </Row>
            </div>

            {shoppingCartProduct.length ? (
                <div className='shoppingcart-items'>
                    <Row md="12" className='center'>
                        <Col md="4"></Col>
                        <Col md="4">
                            <h4 className='metodo-pago-medio'>Elige un medio de pago</h4>
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                    <div className="metodos-de-pago">
                        <Row className='d-flex align-items-center justify-content-between fw-bold' md="12" style={{ height: '9rem', marginTop: '72px', color: '#545454' }}>
                            {/* Transferencia Bancaria */}
                            <Col md="3">
                                <Button
                                    id="boton-transferencia-bancaria"
                                    className='d-flex align-items-center justify-content-betweens'
                                    style={{ borderRadius: '24px', backgroundColor: 'white', color: '#545454', borderWidth: "8px", borderColor: '#975C4C', width: '320px', height: '160px' }}
                                    onClick={() => handleSubmit("Transferencia bancaria")}
                                >
                                    Transferencia Bancaria
                                </Button>
                            </Col>

                            {/* Paga con tu banco */}
                            <Col md="3">
                                <Button
                                    id="boton-tu-banco"
                                    style={{ borderRadius: '24px', backgroundColor: 'white', color: '#545454', borderWidth: "8px", borderColor: '#975C4C', width: '320px', height: '160px' }}
                                    onClick={() => handleSubmit("Tarjeta débito/crédito")}
                                >
                                    Paga con tu banco
                                </Button>
                            </Col>

                            {/* WebPay */}
                            <Col md="3">
                                <Button
                                    id="boton-web-pay"
                                    style={{ borderRadius: '24px', backgroundColor: 'white', color: '#545454', borderWidth: "8px", borderColor: '#975C4C', width: '320px', height: '160px' }}
                                    onClick={() => handleSubmit("Webpay")}
                                >
                                    <img src={iconoWebpay} alt="Webpay" style={{ height: 'auto', width: '160px' }} />
                                    WebPay
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div>No existen productos en el carrito de compras.</div>
            )}
        </Container>
    );
}

export default MedioDePagoShoppingCart;
