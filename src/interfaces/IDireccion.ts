interface IDireccion {
    idDireccion: number,
    calle: string,
    numeroCalle: string,
    comuna: string,
    region: string,
    numeroDepartamento?: string,
    informacionAdicional?: string
}

export type {IDireccion};