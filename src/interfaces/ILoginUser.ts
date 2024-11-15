interface ILoginUser {
    correoElectronico: string;
    contrasena: string;
    rol?: 'admin' | 'user';
}

export type { ILoginUser };