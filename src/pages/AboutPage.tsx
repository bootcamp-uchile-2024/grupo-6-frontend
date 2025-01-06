import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MainLayout } from "../layouts/MainLayout";
import '../styles/about.css'
import ale from '../assets/images/foto-ale.png'
import anto from '../assets/images/foto-anto.png'
import dani from '../assets/images/foto-dani.png'
import enzo from '../assets/images/foto-enzo.png'
import vice from '../assets/images/foto-vice.png'
import yasna from '../assets/images/foto-yasna.png'
import silv from '../assets/images/foto-silv.png'
import seba from '../assets/images/foto-seba.png'
import nico from '../assets/images/foto-nico.png'


interface AboutProps {
    title: string;
}

export const AboutPage = (props: AboutProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <Container className='about-container'>
                <Row>
                    <Col>
                        <p className='about-title'>Nosotros</p>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginBottom: '24px' }}>
                        <p className='about-text'>Páginas Selectas nació por el gusto de la lectura, nos unimos para crear este espacio dedicado exclusivamente a la lectura
                            y poder entregar un servicio exclusivo y personalizado a quien quiere volver a leer,
                            a quienes les encanta la lectura y a todo aquel
                            que desee comprar un libro.
                        </p>
                        <p className='about-text'>Nuestro equipo está dividido en Front End, UX-UI y Backend, sin este maravilloso equipo,
                            Páginas Selectas no sería posible.</p>
                    </Col>
                </Row>

                <Row>
                    <Col className='d-flex justify-content-center'>
                        <img style={{ marginRight: '6px', marginLeft: '6px' }} src={ale} alt="fotografía de integrante" />
                        <img style={{ marginRight: '6px', marginLeft: '6px' }} src={anto} alt="fotografía de integrante" />
                        <img style={{ marginRight: '6px', marginLeft: '6px' }} src={dani} alt="fotografía de integrante" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='about-names'>Alexandra Pávez - Antonia Horta- Daniela Gajardo</p>
                    </Col>
                </Row>

                <Row>
                    <Col className='d-flex justify-content-center'>
                        <img style={{ marginRight: '6px', marginLeft: '6px' }} src={enzo} alt="fotografía de integrante" />
                        <img style={{ marginRight: '6px', marginLeft: '6px' }} src={vice} alt="fotografía de integrante" />
                        <img style={{ marginRight: '6px', marginLeft: '6px' }} src={yasna} alt="fotografía de integrante" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='about-names'>Enzo Toledo - Vicente Naranjo - Yasna Cárdenas</p>
                    </Col>
                </Row>

                <Row>
                    <Col className='d-flex justify-content-center'>
                        <img style={{ marginRight: '6px', marginLeft: '6px' }} src={silv} alt="fotografía de integrante" />
                        <img style={{ marginRight: '6px', marginLeft: '6px' }} src={seba} alt="fotografía de integrante" />
                        <img style={{ marginRight: '6px', marginLeft: '6px' }} src={nico} alt="fotografía de integrante" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='about-names'>José Martínez - Sebastián Flores - Nicole Carvajal</p>
                    </Col>
                </Row>

            </Container>
        </MainLayout>
    );
};