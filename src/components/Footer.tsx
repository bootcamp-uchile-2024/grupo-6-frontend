import '../styles/footer.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaInstagram, FaTiktok, FaEnvelope } from 'react-icons/fa';

function Footer() {

    return (
        <footer id="footer">

            <div className="footer-top">
                <Container>
                    <Row className="align-items-center">

                        <Col md={6} className="d-flex align-items-center">

                            <div className="input-group">
                                <Form.Control type="email" placeholder="Inscríbete a nuestro Newsletter ;D" className="form-input" />
                                <span className="input-group-text bg-white border-0">
                                    <FaEnvelope className="text-muted" />
                                </span>
                            </div>

                            <Button variant="none" className="newsletter-button ms-3">Recibe ofertas</Button>
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

            <div className="footer-bottom">
                <Container>
                    <Row className="align-items-center">

                        <Col md={8} className="text-center text-md-start">
                            <p className="mb-0 footer-text">¿Necesitas ayuda o soporte técnico? ¡Comunícate con nosotros a través de nuestras redes!</p>
                        </Col>

                        <Col md={4} className="text-center text-md-end">
                            <a href="https://www.instagram.com" className="footer-icon">
                                <FaInstagram size={20} />
                            </a>

                            <a href="https://www.tiktok.com" className="footer-icon">
                                <FaTiktok size={20} />
                            </a>

                            <a href="" className="footer-icon">
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