import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute: React.FC<{children : React.ReactNode}> = ({children}) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated){
        // Va a redirigir al login si no está autenticado
        return <Navigate to="/login" />;
    }

    return <>{children}</>; // Va a mostrar si esta autenticado
};

export default ProtectedRoute;