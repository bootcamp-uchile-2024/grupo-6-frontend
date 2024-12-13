import { configuracion } from "../config/appConfiguration";
import { ILoginUser } from "../interfaces/ILoginUser";

export const login = async (user: ILoginUser): Promise<boolean> => {
    try {
        const response = await fetch(configuracion.urlJsonServerBackendLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        // Verifica si respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('Credenciales incorrectas o error en el servidor');
        }

        // Guardamos datos de la respuesta
        const data = await response.json();

        // Guardamos datos importantes en localStorage
        localStorage.setItem('__redux__user__', JSON.stringify({
            idUsuario: data.idUsuario,
            nombres: data.nombres,
            apellidoPaterno: data.apellidoPaterno,
            apellidoMaterno: data.apellidoMaterno,
            correoElectronico: data.correoElectronico,
            rol: data.rol,
            token: data.token
        }));

        console.log('Usuario logueado correctamente:', data);
        return true;

    } catch (error) {
        console.error('Error al autenticar al usuario:', error);
        return false;
    }
};

// Verificamos rol de usuario
export const userHasRole = (roles: string[]): boolean => {
    const storedData = localStorage.getItem('__redux__user__');
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        const userRole = parsedData.rol;

        // Verifica si el rol del usuario está en la lista de roles permitidos
        return roles.includes(userRole);
    }
    return false;
};