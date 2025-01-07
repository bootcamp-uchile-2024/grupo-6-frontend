import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { MainLayout } from "../layouts/MainLayout";
import { Col, Container, Row } from "react-bootstrap";
import '../styles/not_found.css'

export const AdminAccessDeniedPage = () => {

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // temporizador de 3 segundos
        const timer = setTimeout(() => {
            setRedirect(true);
        }, 3000);

        // limpia temporizador si componente se desmonta antes de que se ejecute
        return () => clearTimeout(timer);
    }, []);

    // después de 3 segundos se vuelve al home
    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <MainLayout>      
            <Container>
                <Row className="container-not-found-header">
                    <Col lg={8}>
                        <h2 className="title-not-found">Lo sentimos, no tienes permiso para acceder a esta página.</h2>
                        <p className="info-not-found">Redirigiendo a página principal...</p>
                    </Col>
                    <div className="separador-not-found"></div>
                </Row>
            </Container>
        </MainLayout>
    );
};