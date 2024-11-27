import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated){
        return <Navigate to={"/login"} />;
    }

    if (isAdmin && user?.isAdmin !== true){
        return <Navigate to={"/"} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;