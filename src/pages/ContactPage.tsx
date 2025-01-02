import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';import { MainLayout } from "../layouts/MainLayout";
import '../styles/user_modify_address.css'

interface ContactPageProps {
    title: string;
}

const ContactPage = (props: ContactPageProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <Container style={{marginBottom: '60px'}}>
                <Row className='d-flex justify-content-center align-content-center'>
                    <Col lg={5}>

                    <h1 className='user-mod-dir-title'>Contacto</h1>

                        <Form className='user-mod-dir-form'>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='correoElectronico'>Correo electrónico</Form.Label>
                                <Form.Control type="text" name='correoElectronico' placeholder='Escribe tu correo electrónico'/>
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

                        </Form>
                    </Col>
                </Row>

            </Container>
        </MainLayout>
    )
}

export default ContactPage;