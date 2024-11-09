interface IDireccion {
    calle: string,
    numeroCalle: string,
    comuna: string,
    region: string,
    numeroDepartamento?: string,
    informacionAdicional?: string
    tipoDireccion: 'Envio' | 'Facturacion';
}

export type {IDireccion};