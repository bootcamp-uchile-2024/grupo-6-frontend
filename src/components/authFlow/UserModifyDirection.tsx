import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MainLayout } from '../../layouts/MainLayout';

interface UserModifyDirectionProps {
    title: string;
}

export const UserModifyDirection = (props: UserModifyDirectionProps) => {

    document.title = props.title;

    return (
        <MainLayout>
            <Container>
                <Row>
                    <Col>
                    <p>Tus direcciones</p>
                    </Col>
                    <Col>
                    <p>Selecciona una dirección</p>
                    </Col>
                    <Col>
                    <input type="radio" />
                    <label htmlFor="">Los Olmos 666, Macul, XIII Metropolitana de Santiago</label>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}