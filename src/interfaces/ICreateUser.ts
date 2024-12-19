import { IDireccion } from "./IDireccion";

export interface ICreateUser {
    nombres: string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    correoElectronico: string,
    contrasena: string,
    direccion?: IDireccion;
    token?: string;
}

export interface ICreateUserResponse extends ICreateUser {
    idUsuario: number
}