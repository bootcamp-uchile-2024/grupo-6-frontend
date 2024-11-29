import { ILoginUser } from "../interfaces/ILoginUser";


export const login = (user: ILoginUser): boolean => {
    const validAdmin = {
        correoElectronico: 'admin@gmail.com',
        contrasena: 'admin',
        rol: 'admin'
    };

    const validUser = {
        correoElectronico: 'usuario@gmail.com',
        contrasena: 'usuario',
        rol: 'user'
    };

    if (user.correoElectronico === validAdmin.correoElectronico && user.contrasena === validAdmin.contrasena) {
        const adminResponse = { rol: validAdmin.rol, correoElectronico: validAdmin.correoElectronico };
        console.log('Guardando en localStorage (admin):', adminResponse); // Depuración
        localStorage.setItem('__redux__user__', JSON.stringify(adminResponse));
        return true;
    }

    if (user.correoElectronico === validUser.correoElectronico && user.contrasena === validUser.contrasena) {
        const userResponse = { rol: validUser.rol, correoElectronico: validUser.correoElectronico };
        console.log('Guardando en localStorage (usuario):', userResponse); // Depuración
        localStorage.setItem('__redux__user__', JSON.stringify(userResponse));
        return true;
    }

    console.log('Credenciales incorrectas, eliminando localStorage');
    localStorage.removeItem('__redux__user__');
    return false;
};


export const userHasRole = (roles: string[]): boolean => {
    const storedData = localStorage.getItem('__redux__user__');
    console.log('Contenido de localStorage:', storedData); // Depuración

    if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Asegúrate de acceder al "rol" dentro de la propiedad "user"
        const userRole = parsedData?.user?.rol;

        console.log('Rol obtenido:', userRole); // Depuración

        // Verifica si el rol existe y coincide con alguno de los roles permitidos
        const hasRole = roles.includes(userRole || '');
        console.log('¿Tiene el rol adecuado?', hasRole); // Depuración
        return hasRole;
    }

    console.log('No se encontró un usuario en localStorage');
    return false;
};

