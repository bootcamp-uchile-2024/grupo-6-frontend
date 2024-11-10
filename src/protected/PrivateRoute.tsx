import { ReactNode } from "react";
import { isAuth, userHasRole } from "../services/loginService"; // Importamos los servicios
import { AdminAccessDeniedPage } from "../pages/AdminAccessDeniedPage";

interface PrivateRouteProps {
    children: ReactNode;
    roles: string[];
}

export const PrivateRoute = (props: PrivateRouteProps) => {
    const auth = isAuth(); // Verificamos si el usuario está autenticado
    const hasRole = userHasRole(props.roles); // Obtenemos el usuario almacenado

    return (
        <>
            {auth && hasRole ? (
                props.children
            ) : (
                <AdminAccessDeniedPage></AdminAccessDeniedPage>
            )}
        </>
    );
};