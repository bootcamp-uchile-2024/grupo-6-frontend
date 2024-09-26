import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    isAdmin?: boolean; // Esto para verificar si se necesita el perfil de admin
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin }) => {
    const { isAuthenticated, user } = useAuth();

    //Si no está autenticado, redirige al login
    if (!isAuthenticated){
        return <Navigate to={"/login"} />;
    }

    // Si tienes que ser 'admin' y el usuario no lo es, redirige a la página principal
    if (isAdmin && user?.isAdmin !== true){
        return <Navigate to={"/"} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;