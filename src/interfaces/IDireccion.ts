export interface IDireccion {
    idDireccion: number;
    calle: string;
    numeroCalle: string;
    numeroDepartamento?: string;
    comuna: string;
    ciudad: string;
    region: string;
    informacionAdicional?: string;
    tipoDireccion: string[]
}