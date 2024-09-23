import { IDireccion } from "./IDireccion"

interface ICreateUser {
    nombres: string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    correoElectronico: string,
    contrasena: string,
    direccion: IDireccion[],
    tipoCliente: 'Premium' | 'Estandar';
    estado: 'Activo' | 'Baneado';
}

export type {ICreateUser}