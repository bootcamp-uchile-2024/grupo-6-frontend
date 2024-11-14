import { IDireccion } from "./IDireccion";

export interface ICreateUser {
    idUsuario?: number,
    nombres: string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    correoElectronico: string,
    contrasena: string,
    direccion?: IDireccion;
}