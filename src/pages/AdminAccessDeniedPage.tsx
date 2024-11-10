import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { MainLayout } from "../layouts/MainLayout";
import accessDenied from "../assets/images/icono_access_denied.png"
import '../styles/admin_access_denied.css'

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
            <div className="caja-acces-denied">
                <img src={accessDenied} alt="Página no encontrada" />
                <p>Lo sentimos, no tienes permiso para acceder a esta página.</p>
                <p>Redirigiendo a página principal...</p>
            </div>        
        </MainLayout>
    );
};