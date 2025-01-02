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

        <Container>
            <Row lg={12} className="d-flex justify-content-between item-top-resumen">
                <Col lg={9}>
                    <h2 >Pagar pedido</h2>
                </Col>

                <Col className="back-to-resume ms-auto" lg={3}>
                    <Link to={`/shoppingcart-resume/`}>
                        <Button >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.92308 0C0.413277 0 0 0.435305 0 0.972282C0 1.50926 0.413277 1.94456 0.92308 1.94456H3.03749L3.25473 3.54629C3.25634 3.56037 3.25824 3.57435 3.26042 3.58824L4.75384 14.5994C4.75546 14.6136 4.75738 14.6277 4.75958 14.6418L5.25626 18.3038C5.32123 18.7828 5.71069 19.1386 6.17006 19.1386H6.53517C6.09668 19.6546 5.83005 20.3361 5.83005 21.0832C5.83005 22.6941 7.06989 24 8.59929 24C10.1287 24 11.3685 22.6941 11.3685 21.0832C11.3685 20.3361 11.1019 19.6546 10.6634 19.1386H15.7656C15.3271 19.6546 15.0605 20.3361 15.0605 21.0832C15.0605 22.6941 16.3003 24 17.8297 24C19.3592 24 20.599 22.6941 20.599 21.0832C20.599 20.0188 20.0578 19.0876 19.2494 18.5783C19.305 18.4532 19.3361 18.3136 19.3361 18.1663C19.3361 17.6293 18.9228 17.194 18.413 17.194H6.97065L6.73467 15.4542H19.5789C19.9762 15.4542 20.329 15.1864 20.4546 14.7893L23.9526 3.73604C24.0465 3.43954 23.9993 3.11362 23.8258 2.86007C23.6523 2.60653 23.3736 2.4563 23.0769 2.4563H4.9718L4.75187 0.83478C4.68691 0.355787 4.29744 0 3.83807 0H0.92308ZM5.23553 4.40086L6.47093 13.5096H18.9136L21.7962 4.40086H5.23553ZM8.59929 19.8206C7.9373 19.8206 7.40066 20.3859 7.40066 21.0832C7.40066 21.7804 7.9373 22.3457 8.59929 22.3457C9.2613 22.3457 9.79792 21.7805 9.79792 21.0832C9.79792 20.3859 9.2613 19.8206 8.59929 19.8206ZM16.6311 21.0832C16.6311 20.3859 17.1677 19.8206 17.8297 19.8206C18.4917 19.8206 19.0283 20.3859 19.0283 21.0832C19.0283 21.7805 18.4917 22.3457 17.8297 22.3457C17.1677 22.3457 16.6311 21.7805 16.6311 21.0832Z" fill="#806259" />
                            </svg>
                            Volver al resumen
                        </Button>
                    </Link>
                </Col>
            </Row>

            <div>
                <Row>
                    <Col>
                        <h3 className="metodos-pago-total">Total a Pagar: ${calculateTotal(shoppingCartProduct)}</h3>
                    </Col>
                </Row>
            </div>

            {shoppingCartProduct.length ? (
                <div className='shoppingcart-items'>
                    <Row md="12" className='center'>
                        <Col md="4">
                        </Col>
                        <Col md="4">
                            <h4 className='metodo-pago-medio'>Elige un medio de pago</h4>
                        </Col>
                        <Col md="4">
                        </Col>
                    </Row>
                    <div className="metodos-de-pago">
                        <Row key='despacho' className='d-flex align-items-center justify-content-between fw-bold' md="12" style={{ height: '9rem', marginTop: '72px', color: '#545454' }}>
                            <Col md="3">
                                <Button id="boton-transferencia-bancaria" className='d-flex align-items-center justify-content-betweens' style={{ borderRadius: '24px', backgroundColor: 'white', color: '#545454', borderWidth: "8px", borderColor: '#975C4C', width: '320px', height: '160px' }} onClick={handleSubmit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="38" viewBox="0 0 56 38" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16 14.0007C16 11.9756 17.5153 10.334 19.3846 10.334H36.6154C38.4847 10.334 40 11.9756 40 14.0007V16.6673V24.6673C40 26.6924 38.4847 28.334 36.6154 28.334H19.3846C17.5154 28.334 16 26.6924 16 24.6673V16.6673V14.0007ZM38.1538 14.0007V15.6673H17.8462V14.0007C17.8462 13.0802 18.5349 12.334 19.3846 12.334H36.6154C37.4651 12.334 38.1538 13.0802 38.1538 14.0007ZM38.1538 17.6673H17.8462V24.6673C17.8462 25.5878 18.5349 26.334 19.3846 26.334H36.6154C37.4651 26.334 38.1538 25.5878 38.1538 24.6673V17.6673ZM20.6154 22.334C20.1056 22.334 19.6923 22.7817 19.6923 23.334C19.6923 23.8863 20.1056 24.334 20.6154 24.334H25.5385C26.0483 24.334 26.4615 23.8863 26.4615 23.334C26.4615 22.7817 26.0483 22.334 25.5385 22.334H20.6154Z" fill="#545454" />
                                    </svg>
                                    Transferencia Bancaria
                                </Button>
                            </Col>
                            <Col md="3">
                                <Button id="boton-tu-banco" style={{ borderRadius: '24px', backgroundColor: 'white', color: '#545454', borderWidth: "8px", borderColor: '#975C4C', width: '320px', height: '160px' }} onClick={handleSubmit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="38" viewBox="0 0 56 38" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16 14.0007C16 11.9756 17.5153 10.334 19.3846 10.334H36.6154C38.4847 10.334 40 11.9756 40 14.0007V16.6673V24.6673C40 26.6924 38.4847 28.334 36.6154 28.334H19.3846C17.5154 28.334 16 26.6924 16 24.6673V16.6673V14.0007ZM38.1538 14.0007V15.6673H17.8462V14.0007C17.8462 13.0802 18.5349 12.334 19.3846 12.334H36.6154C37.4651 12.334 38.1538 13.0802 38.1538 14.0007ZM38.1538 17.6673H17.8462V24.6673C17.8462 25.5878 18.5349 26.334 19.3846 26.334H36.6154C37.4651 26.334 38.1538 25.5878 38.1538 24.6673V17.6673ZM20.6154 22.334C20.1056 22.334 19.6923 22.7817 19.6923 23.334C19.6923 23.8863 20.1056 24.334 20.6154 24.334H25.5385C26.0483 24.334 26.4615 23.8863 26.4615 23.334C26.4615 22.7817 26.0483 22.334 25.5385 22.334H20.6154Z" fill="#545454" />
                                    </svg>
                                    Paga con tu banco
                                </Button>
                            </Col>
                            <Col md="3">
                                <Button id="boton-web-pay" style={{ borderRadius: '24px', backgroundColor: 'white', color: '#545454', borderWidth: "8px", borderColor: '#975C4C', width: '320px', height: '160px' }} onClick={handleSubmit}>
                                    <img src={iconoWebpay} alt="WebPay" style={{ height: 'auto', width: '160px' }} ></img>
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
    );
};

export default MedioDePagoShoppingCart;