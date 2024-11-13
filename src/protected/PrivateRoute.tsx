import { ReactNode } from "react";
import { useSelector } from 'react-redux';
import { RootType } from "../states/store";
import { AdminAccessDeniedPage } from "../pages/AdminAccessDeniedPage";

interface PrivateRouteProps {
    children: ReactNode;
    roles: string[];
}

export const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
    const isAuthenticated = useSelector((state: RootType) => state.authReducer.isAuthenticated);
    const userRole = useSelector((state: RootType) => state.authReducer.user?.rol);
    const hasRole = roles.includes(userRole || "");

    return (
        <>
            {isAuthenticated && hasRole ? children : <AdminAccessDeniedPage />}
        </>
    );
};