// Los campos pueden ser opcionales en caso de que no se quiera actualizar

interface IUpdateUser {
    nombres?: string,
    apellidoMaterno?: string,
    apellidoPaterno?: string,
    correoElectronico?: string,
    contrasena?: string,
}

export type { IUpdateUser };