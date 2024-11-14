import { IDireccion } from "./IDireccion"

interface ICreateUser {
    idUsuario?: number,
    nombres: string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    correoElectronico: string,
    contrasena: string,
    direccion?: IDireccion;
}

export type {ICreateUser};