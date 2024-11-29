interface IUser {
    id: number,
    nombre: string,
    segundo_nombre: string | null,
    apellido_materno: string,
    apellido_paterno: string,
    correo_electronico: string,
}

export type { IUser };