import { ILoginUser } from "../interfaces/ILoginUser";

interface IUser {
    correoElectronico: string;
    contrasena: string;
    rol?: 'admin' | 'user';
}

export const login = (user: IUser): boolean  => {

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
        
        const adminResponse = {
            rol: validAdmin.rol, 
            correoElectronico: validAdmin.correoElectronico}
        
            localStorage.setItem('__redux__user__', JSON.stringify(adminResponse));
        return true;
    }

    if (user.correoElectronico === validUser.correoElectronico && user.contrasena === validUser.contrasena) {
        
        const userResponse = {
            rol:validUser.rol,
            correoElectronico: validUser.correoElectronico
        }

        localStorage.setItem('__redux__user__', JSON.stringify(userResponse));
        return true;

    } else {
        localStorage.removeItem('__redux__user__');
        return false;
    }    
};

export const userHasRole = (roles: string[]) => {
    const user = localStorage.getItem('__redux__user__');
    if (user) {
        const userResponse: ILoginUser = JSON.parse(user);
        return roles.some(role => userResponse.rol?.includes(role));
    }
    return false;
};
