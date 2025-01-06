import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MainLayout } from "../layouts/MainLayout";
import '../styles/user_modify_address.css'

interface ContactPageProps {
    title: string;
}

const ContactPage = (props: ContactPageProps) => {
    document.title = props.title;

    const navigate = useNavigate();

    const handleRedirectHome = () => {
        navigate('/');
    };

    return (
        <MainLayout>
            <Container style={{ marginBottom: '60px' }}>
                <Row className='d-flex justify-content-center align-content-center'>
                    <Col lg={5}>

                        <h1 className='user-mod-dir-title'>Contacto</h1>

                        <Form className='user-mod-dir-form'>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='correoElectronico'>Correo electrónico</Form.Label>
                                <Form.Control type="text" name='correoElectronico' placeholder='Escribe tu correo electrónico' />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='nombres'>Nombres</Form.Label>
                                <Form.Control type="text" name='nombres' />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='apellidoPaterno'>Apellido paterno</Form.Label>
                                <Form.Control type="text" name='apellidoPaterno' />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='apellidoMaterno'>Apellido materno</Form.Label>
                                <Form.Control type="text" name='apellidoMaterno' />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="comentario">Tipo de comentario</Form.Label>
                                <Form.Select
                                    aria-label="Tipo de comentario"
                                    name="tipoComentario" >
                                    <option value="felicitaciones">Felicitaciones</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='comentario'>Comentario</Form.Label>
                                <Form.Control type="text" name='comentario' />
                            </Form.Group>

                            <Form.Group>
                                <Col className="d-flex justify-content-center">
                                    <Button variant='primary' size='lg' type="submit" onClick={handleRedirectHome} className="send-mail-contact-button">
                                        Enviar
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.15385 3C1.55391 3 1.01249 3.23102 0.625111 3.59713L0.625075 3.59716C0.238003 3.96303 0 4.46766 0 5.02041V18.9796C0 20.0811 0.948993 21 2.15385 21H21.8462C23.051 21 24 20.0811 24 18.9796V5.02041C24 4.47435 23.7677 3.97515 23.3887 3.61033C23.3805 3.60223 23.3721 3.59424 23.3634 3.58637C23.3628 3.5858 23.3622 3.58524 23.3616 3.58468C22.9752 3.22583 22.4393 3 21.8462 3H2.15385ZM20.876 4.71429H3.12415L3.2133 4.79854L20.7868 4.7986L20.876 4.71429ZM20.7868 4.79862L3.21333 4.79858L10.918 12.0806L10.918 12.0807C11.5175 12.6473 12.4827 12.6473 13.0821 12.0807L13.0822 12.0806L20.7868 4.79862ZM1.84615 5.95249V18.9796C1.84615 19.163 1.99924 19.2857 2.15385 19.2857H21.8462C22.0008 19.2857 22.1538 19.163 22.1538 18.9796V5.95266L14.3992 13.282C13.0762 14.5326 10.9241 14.5326 9.60108 13.282L9.60104 13.282L1.84615 5.95249Z" fill="currentColor" />
                                        </svg>
                                    </Button>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Col>

                </Row>

            </Container>
        </MainLayout>
    )
}

export default ContactPage;