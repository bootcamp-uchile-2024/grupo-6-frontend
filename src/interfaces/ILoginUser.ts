interface ILoginUser {
    correoElectronico: string;
    contrasena: string;
}

export type { ILoginUser };

interface ILoginResponse {
    idUsuario: number,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    correoElectronico: string,
    rol: 'USER' | 'ADMIN',
    token: string
}

export type { ILoginResponse };