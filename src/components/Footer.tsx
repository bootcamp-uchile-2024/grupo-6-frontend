import '../styles/footer.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaInstagram, FaTiktok, FaEnvelope } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootType } from '../states/store';

function Footer() {
    const userRole = useSelector((state: RootType) => state.authReducer.user?.rol);

    return (
        <footer id="footer">

            <div className={`${userRole == 'admin' ? 'footer-top-admin' : 'footer-top'}`}>
                <Container>
                    <Row className="align-items-center">

                        <Col md={6} className="d-flex align-items-center">

                            <div className="input-group">
                                <Form.Control type="email" placeholder="Inscríbete a nuestro Newsletter ;D" className="form-input" />
                                <span className="input-group-text bg-white border-0">
                                    <FaEnvelope className="text-muted" />
                                </span>
                            </div>

                            <Button variant="none" className={`ms-3 ${userRole == 'admin' ? 'newsletter-button-admin' : 'newsletter-button'}`} >Recibe ofertas</Button>
                        </Col>

                        <Col md={3} className="text-center">
                            <a href="" className="footer-link">Publica con nosotros</a>
                        </Col>

                        <Col md={3} className="text-center">
                            <a href="" className="footer-link">Preguntas frecuentes</a>
                        </Col>

                    </Row>
                </Container>
            </div>

            <div  className={`${userRole == 'admin' ? 'footer-bottom-admin' : 'footer-bottom '}`}>
                <Container>
                    <Row className="align-items-center">

                        <Col md={8} className="text-center text-md-start">
                            <p  className={`mb-0 ${userRole == 'admin' ? 'footer-text-admin' : 'footer-text'}`}>¿Necesitas ayuda o soporte técnico? ¡Comunícate con nosotros a través de nuestras redes!</p>
                        </Col>

                        <Col md={4} className="text-center text-md-end">
                            <a href="https://www.instagram.com" className={`${userRole == 'admin' ? 'footer-icon-admin' : 'footer-icon'}`}>
                                <FaInstagram size={20} />
                            </a>

                            <a href="https://www.tiktok.com" className={`${userRole == 'admin' ? 'footer-icon-admin' : 'footer-icon'}`}>
                                <FaTiktok size={20} />
                            </a>

                            <a href="" className={`${userRole == 'admin' ? 'footer-icon-admin' : 'footer-icon'}`}>
                                <FaEnvelope size={20} />
                            </a>

                        </Col>

                    </Row>
                </Container>
            </div>

        </footer>
    );
};

export default Footer;