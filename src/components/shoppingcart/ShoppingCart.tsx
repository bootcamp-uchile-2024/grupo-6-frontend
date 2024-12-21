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

    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
    const isLoggedIn = loggedInUser && loggedInUser.idUsuario;

    return (
        <Container>
            <div className='shoppingcart'>
                <Row>
                    <Col lg={8}>
                        <h2 className='fw-bold'>Carrito de Compras</h2>
                    </Col>
                    <Col className="clear-cart-button" lg={2}>
                        <ButtonClearCart></ButtonClearCart>
                    </Col>
                    <Col className="seguir-comprando-button" lg={2}>
                        <Link to={`/categorias`}>
                            <Button variant='none' className='md-2'>
                                Seguir comprando
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </div>

            {shoppingCartProduct.length ? (
                <div className='shoppingcart-items'>
                    {shoppingCartProduct.map((item) => (
                        <Row key={item.isbn} className="mb-3">
                            <Col>
                                <Image src={`${url}${item.caratula}`} alt={`imagen del libro ${item.nombre}`} style={{ width: '160px', height: '240px' }} fluid></Image>
                            </Col>

                            <Col className="cart-product-info">
                                <p>{item.nombre}</p>
                                <p >{item.autor}</p>
                                <p>${item.precio.toLocaleString()}</p>
                            </Col>

                            <Col className="d-flex align-items-center justify-content-center">
                                <div className="shoppingcart-item-detail-td-quantity-1">
                                    <QuantityButtons isbn={item.isbn} disabled={false} />
                                    <ButtonDeleteToCart libro={item}></ButtonDeleteToCart>
                                </div>
                            </Col>

                            <Col className="d-flex align-items-center justify-content-center cart-product-info">
                                <p>${calculateTotalProduct(item).toLocaleString()}</p>
                            </Col>
                        </Row>

                    ))}
                </div>

            ) : (
                <div>No existen productos en el carrito de compras.</div>
            )}

            <div className="shoppingcart-item-top-footer">
                <Row >
                    <Col className="cart-action-button" lg={12}>
                        {/* Si el usuario está logeado, mostramos el botón de "Resumen compra", si no, el de "Iniciar sesión" */}
                        {loggedInUser && isLoggedIn ? (
                            <Link to={`/shoppingcart-resume/`}>
                                <Button>
                                    Resumen compra
                                </Button>
                            </Link>
                        ) : (
                            <Link to={`/login`}>
                                <Button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12C0 5.37259 5.37259 0 12 0C18.6275 0 24 5.37259 24 12C24 18.6275 18.6275 24 12 24C5.37259 24 0 18.6275 0 12ZM12 1.84615C6.39219 1.84615 1.84615 6.39219 1.84615 12C1.84615 14.3805 2.6653 16.5696 4.03709 18.3009C4.23562 17.7294 4.51608 17.1773 4.86848 16.6876C5.62448 15.6371 6.79695 14.7692 8.30769 14.7692H15.6923C17.2031 14.7692 18.3755 15.6371 19.1315 16.6876C19.4839 17.1773 19.7644 17.7294 19.9629 18.3009C21.3347 16.5696 22.1538 14.3805 22.1538 12C22.1538 6.39219 17.6079 1.84615 12 1.84615ZM18.4378 19.8525C18.3578 19.1511 18.0775 18.3836 17.6331 17.766C17.1054 17.0328 16.4318 16.6154 15.6923 16.6154H8.30769C7.56824 16.6154 6.89456 17.0328 6.36695 17.766C5.92246 18.3836 5.64219 19.1511 5.56217 19.8525C7.31429 21.2906 9.55634 22.1538 12 22.1538C14.4437 22.1538 16.6857 21.2906 18.4378 19.8525ZM7.38462 8.30769C7.38462 5.7587 9.45093 3.69231 12 3.69231C14.5491 3.69231 16.6154 5.7587 16.6154 8.30769C16.6154 10.8568 14.5491 12.9231 12 12.9231C9.45094 12.9231 7.38462 10.8568 7.38462 8.30769ZM12 5.53846C10.4705 5.53846 9.23077 6.77828 9.23077 8.30769C9.23077 9.83715 10.4705 11.0769 12 11.0769C13.5295 11.0769 14.7692 9.83715 14.7692 8.30769C14.7692 6.77828 13.5295 5.53846 12 5.53846Z" fill="#FBFBFB" />
                                    </svg>
                                    Iniciar sesión
                                </Button>
                            </Link>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col className="cart-total-pagar" lg={12}>
                        <h2>Total a Pagar: ${calculateTotal(shoppingCartProduct).toLocaleString()}</h2>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ShoppingCart;