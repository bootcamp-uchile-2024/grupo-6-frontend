import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { MainLayout } from "../layouts/MainLayout";
import { NotFound } from "../components/NotFound";

export const NotFoundPage = () => {
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
            <NotFound/>
        </MainLayout>
    );
};