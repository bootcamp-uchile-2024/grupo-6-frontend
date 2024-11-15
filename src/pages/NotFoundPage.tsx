import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { MainLayout } from "../layouts/MainLayout";
import imagen404NotFound from "../assets/images/imagen_404_Not_Found.png"
import '../styles/not_found.css'

interface NotFoundPageProps {
    title: string
}

export const NotFoundPage = (props: NotFoundPageProps) => {
    document.title = props.title;

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
            <div className="caja-not-found">
                <img src={imagen404NotFound} alt="Página no encontrada" />
                <p>Lo sentimos, esta página aún no está disponible</p>
                <p>Redirigiendo a página principal...</p>
            </div>
        </MainLayout>
    );
};