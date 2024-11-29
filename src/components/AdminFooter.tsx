import '../styles/admin_footer.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';

function AdminFooter() {

    return (
        <footer id="footer">

            <div className="footer-top-admin">
                <Container>
                    <Row className="align-items-center">

                        <Col md={6} className="d-flex align-items-center">

                            <div className="input-group">
                                <Form.Control type="email" placeholder="Inscríbete a nuestro Newsletter ;D" className="form-input" />
                                <span className="input-group-text bg-white border-0">
                                    <FaEnvelope className="text-muted" />
                                </span>
                            </div>

                            <Button variant="none" className="newsletter-button-admin ms-3">Recibe ofertas</Button>
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

            <div className="footer-bottom-admin">
                <Container>
                    <Row className=" align-items-center">

                        <Col md={8} className="text-center text-md-start">
                            <p className="mb-0 footer-text-admin">¿Necesitas ayuda o soporte técnico? ¡Comunícate con nosotros a través de nuestras redes!</p>
                        </Col>

                        <Col md={4} className="container-button-footer-bottom-admin text-center text-md-end">
                            <Button variant="none" className="footer-icon-admin" href='https://www.whatsapp.com/?lang=es_LA'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.72727 22.6649C9.92662 23.0535 10.6652 23.1919 12 23.1919C18.6274 23.1919 24 18.0002 24 11.596C24 5.1917 18.6274 0 12 0C5.37259 0 0 5.1917 0 11.596C0 14.9448 0.923509 17.3855 3.27273 19.5023V21.8889C3.27273 23.4562 4.97959 24.4756 6.43029 23.7747L8.72727 22.6649ZM4.76067 17.9603L5.45455 18.5855V21.8889L8.56197 20.3875L9.42104 20.6659C10.4204 20.9898 10.9247 21.0836 12 21.0836C17.4225 21.0836 21.8182 16.8359 21.8182 11.596C21.8182 6.35611 17.4225 2.10836 12 2.10836C6.57757 2.10836 2.18182 6.35611 2.18182 11.596C2.18182 14.4772 2.93549 16.3157 4.76067 17.9603ZM7.89216 5.28189C6.87531 5.13822 5.59403 6.43302 5.46938 7.38572C5.46829 7.39403 5.46714 7.40237 5.46597 7.4108C5.45022 7.52466 5.43208 7.65585 5.54174 7.9675C7.63592 15.0431 14.1556 17.4855 15.7678 17.86C16.6908 18.0745 17.9624 17.019 18.402 16.2185C18.6516 15.7641 18.5671 15.3341 18.2068 15.0431C17.4855 14.4335 16.7055 13.892 15.8775 13.426C15.3231 13.1351 14.7597 13.3112 14.5312 13.606C14.4711 13.6792 14.4091 13.7658 14.3445 13.8559C14.071 14.2374 13.7516 14.6829 13.3409 14.4535C11.9996 13.7043 9.27229 11.0689 9.04257 10.3135C8.92445 9.92499 9.42898 9.53795 9.81733 9.24004C9.85379 9.21208 9.88922 9.1849 9.92301 9.15857C10.2149 8.929 10.4182 8.38496 10.1052 7.848C10.0429 7.74356 9.97372 7.62108 9.89816 7.48722C9.43827 6.67255 8.74047 5.4364 7.89053 5.28032L7.89216 5.28189Z" fill="currentColor" />
                                </svg>
                            </Button>

                            <Button variant="none" className="footer-icon-admin" href='https://www.instagram.com'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.713411 3.57388C0 4.97403 0 6.80694 0 10.4727V13.5273C0 17.1931 0 19.026 0.713411 20.4261C1.34095 21.6577 2.34227 22.6591 3.57388 23.2865C4.97403 24 6.80693 24 10.4727 24H10.4727H13.5273H13.5273C17.1931 24 19.026 24 20.4261 23.2865C21.6577 22.6591 22.6591 21.6577 23.2865 20.4261C24 19.026 24 17.1931 24 13.5273V13.5273V10.4727V10.4727C24 6.80693 24 4.97403 23.2865 3.57388C22.6591 2.34227 21.6577 1.34095 20.4261 0.713411C19.026 0 17.1931 0 13.5273 0H10.4727C6.80694 0 4.97403 0 3.57388 0.713411C2.34227 1.34095 1.34095 2.34227 0.713411 3.57388ZM13.5273 2.18182H10.4727C8.60383 2.18182 7.33336 2.18352 6.35136 2.26375C5.39481 2.3419 4.90564 2.48355 4.56441 2.65742C3.74333 3.07579 3.07579 3.74333 2.65742 4.56441C2.48355 4.90564 2.3419 5.39481 2.26375 6.35136C2.18352 7.33336 2.18182 8.60383 2.18182 10.4727V13.5273C2.18182 15.3962 2.18352 16.6666 2.26375 17.6486C2.3419 18.6052 2.48355 19.0944 2.65742 19.4356C3.07579 20.2567 3.74333 20.9242 4.56441 21.3425C4.90564 21.5164 5.39481 21.6581 6.35136 21.7363C7.33336 21.8164 8.60383 21.8182 10.4727 21.8182H13.5273C15.3962 21.8182 16.6666 21.8164 17.6486 21.7363C18.6052 21.6581 19.0944 21.5164 19.4356 21.3425C20.2567 20.9242 20.9242 20.2567 21.3425 19.4356C21.5164 19.0944 21.6581 18.6052 21.7363 17.6486C21.8164 16.6666 21.8182 15.3962 21.8182 13.5273V10.4727C21.8182 8.60383 21.8164 7.33336 21.7363 6.35136C21.6581 5.39481 21.5164 4.90564 21.3425 4.56441C20.9242 3.74333 20.2567 3.07579 19.4356 2.65742C19.0944 2.48355 18.6052 2.3419 17.6486 2.26375C16.6666 2.18352 15.3962 2.18182 13.5273 2.18182ZM11.9996 18.5455C15.6145 18.5455 18.545 15.6149 18.545 12C18.545 8.38504 15.6145 5.45454 11.9996 5.45454C8.3846 5.45454 5.4541 8.38504 5.4541 12C5.4541 15.6149 8.3846 18.5455 11.9996 18.5455ZM11.9996 16.3636C14.4095 16.3636 16.3632 14.4099 16.3632 12C16.3632 9.59003 14.4095 7.63636 11.9996 7.63636C9.58959 7.63636 7.63592 9.59003 7.63592 12C7.63592 14.4099 9.58959 16.3636 11.9996 16.3636ZM17.4541 5.45455C17.4541 4.85206 17.9425 4.36364 18.545 4.36364C19.1475 4.36364 19.6359 4.85206 19.6359 5.45455C19.6359 6.05704 19.1475 6.54546 18.545 6.54546C17.9425 6.54546 17.4541 6.05704 17.4541 5.45455Z" fill="currentColor" />
                                </svg>
                            </Button>

                            <Button variant="none" className="footer-icon-admin" href='https://www.tiktok.com'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12.605 0.0200094C14.1127 7.60314e-08 15.6094 0.0104049 17.1052 0C17.1549 1.62556 17.9138 3.08864 19.1213 4.17235L19.1195 4.17075C20.419 5.18802 22.11 5.84753 23.9742 5.95958L24 5.96118V9.99186C22.239 9.95344 20.583 9.60048 19.09 8.9938L19.1655 9.02101C18.4434 8.71927 17.8328 8.40952 17.2525 8.06376L17.3004 8.09098C17.2894 11.0115 17.3115 13.9321 17.2774 16.8423C17.1825 18.3254 16.6152 19.678 15.7052 20.8073L15.7236 20.7825C14.2021 22.6762 11.7374 23.9192 8.93472 23.9928H8.92182C8.80854 23.9976 8.67499 24 8.54052 24C6.94714 24 5.45783 23.6142 4.18865 22.9443L4.22549 22.9627C1.91555 21.755 0.322169 19.6884 0.0274391 17.2849L0.023755 17.2521C0.000729274 16.7518 -0.0103232 16.2516 0.0127026 15.7618C0.464007 11.9368 4.15181 8.97779 8.63446 8.97779C9.13827 8.97779 9.63194 9.01541 10.1118 9.08664L10.0602 9.08024C10.0832 10.5601 10.0142 12.0408 10.0142 13.5207C9.62457 13.3983 9.17511 13.327 8.7063 13.327C6.98582 13.327 5.5223 14.2827 4.98074 15.6169L4.97245 15.6409C4.84995 15.9827 4.77903 16.3756 4.77903 16.7822C4.77903 16.9471 4.79101 17.1104 4.81311 17.2705L4.81127 17.2513C5.11705 18.8888 6.73254 20.1246 8.68051 20.1246C8.7367 20.1246 8.79196 20.1238 8.84722 20.1214H8.83893C10.1864 20.0862 11.3561 19.4563 12.0174 18.5254L12.0266 18.511C12.2725 18.2133 12.4411 17.8531 12.4973 17.4617L12.4982 17.4505C12.6133 15.6601 12.5673 13.8801 12.5783 12.0896C12.5894 8.05896 12.5673 4.03788 12.6013 0.0176083L12.605 0.0200094Z" fill="currentColor" />
                                </svg>
                            </Button>

                            <Button variant="none" className="footer-icon-admin" href='https://gmail.com/'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.15385 3C1.55391 3 1.01249 3.23102 0.625111 3.59713L0.625075 3.59716C0.238003 3.96303 0 4.46766 0 5.02041V18.9796C0 20.0811 0.948993 21 2.15385 21H21.8462C23.051 21 24 20.0811 24 18.9796V5.02041C24 4.47435 23.7677 3.97515 23.3887 3.61033C23.3805 3.60223 23.3721 3.59424 23.3634 3.58637C23.3628 3.5858 23.3622 3.58524 23.3616 3.58468C22.9752 3.22583 22.4393 3 21.8462 3H2.15385ZM20.876 4.71429H3.12415L3.2133 4.79854L20.7868 4.7986L20.876 4.71429ZM20.7868 4.79862L3.21333 4.79858L10.918 12.0806L10.918 12.0807C11.5175 12.6473 12.4827 12.6473 13.0821 12.0807L13.0822 12.0806L20.7868 4.79862ZM1.84615 5.95249V18.9796C1.84615 19.163 1.99924 19.2857 2.15385 19.2857H21.8462C22.0008 19.2857 22.1538 19.163 22.1538 18.9796V5.95266L14.3992 13.282C13.0762 14.5326 10.9241 14.5326 9.60108 13.282L9.60104 13.282L1.84615 5.95249Z" fill="currentColor" />
                                </svg>
                            </Button>
                        </Col>

                    </Row>
                </Container>
            </div>

        </footer>
    );
};

export default AdminFooter;