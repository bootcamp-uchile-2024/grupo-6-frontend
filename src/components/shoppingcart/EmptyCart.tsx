import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../states/productSlice";
import '../../styles/empty_cart.css';

const EmptyCart = () => {
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <Container>
            <Row className="container-empty-cart-header">
                <Col lg={8}>
                    <h2 className="title-empty-cart">Carrito de Compras</h2>
                </Col>
                <Col className="clear-cart-button-empty-cart" lg={2}>
                    <Button onClick={handleClearCart} disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.1775 0C8.22434 0 6.6125 1.56452 6.6125 3.52941V3.9095H3.565H0.92C0.411898 3.9095 0 4.32278 0 4.83258C0 5.34238 0.411898 5.75565 0.92 5.75565H2.645V20.4706C2.645 22.4355 4.25685 24 6.21 24H16.79C18.7432 24 20.355 22.4355 20.355 20.4706V5.75565H22.08C22.5881 5.75565 23 5.34238 23 4.83258C23 4.32278 22.5881 3.9095 22.08 3.9095H19.435H16.3875V3.52941C16.3875 1.56453 14.7757 0 12.8225 0H10.1775ZM15.4649 5.75565C15.4658 5.75566 15.4666 5.75566 15.4675 5.75566C15.4684 5.75566 15.4692 5.75566 15.4701 5.75565H18.515V20.4706C18.515 21.3846 17.7585 22.1538 16.79 22.1538H6.21C5.24156 22.1538 4.485 21.3846 4.485 20.4706V5.75565H7.52993C7.53079 5.75566 7.53164 5.75566 7.5325 5.75566C7.53336 5.75566 7.53421 5.75566 7.53507 5.75565H15.4649ZM14.5475 3.9095V3.52941C14.5475 2.61541 13.791 1.84615 12.8225 1.84615H10.1775C9.20907 1.84615 8.4525 2.61542 8.4525 3.52941V3.9095H14.5475ZM8.855 9.12218C9.3631 9.12218 9.775 9.53545 9.775 10.0453V17.8643C9.775 18.3741 9.3631 18.7873 8.855 18.7873C8.3469 18.7873 7.935 18.3741 7.935 17.8643V10.0453C7.935 9.53545 8.3469 9.12218 8.855 9.12218ZM14.145 9.12218C14.6531 9.12218 15.065 9.53545 15.065 10.0453V17.8643C15.065 18.3741 14.6531 18.7873 14.145 18.7873C13.6369 18.7873 13.225 18.3741 13.225 17.8643V10.0453C13.225 9.53545 13.6369 9.12218 14.145 9.12218Z" fill="currentColor" />
                        </svg>
                        Vaciar carrito
                    </Button>
                </Col>
                <Col className="seguir-comprando-button" lg={2}>
                    <Link to={`/categorias`}>
                        <Button variant="none" className="md-2">
                            Seguir comprando
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <p className="info-empty-cart">No has añadido nada a tu carrito.</p>
                </Col>
                <div className="separador-empty-cart"></div>
            </Row>
        </Container>
    );
};

export default EmptyCart;