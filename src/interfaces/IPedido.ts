export interface ICompraLibro {
    isbn: string;
    cantidad: number;
    precioFinal: number;
}

export interface IDireccion {
    id: number,
    id_usuario: number,
    calle: string,
    numero_calle: string,
    numero_departamento: null,
    informacion_adicional: null,
    nombre_comuna: string,
    nombre_ciudad: string,
    nombre_region: string,
    estado: "ACTIVO"
}

export interface IPedido {
    id: number;
    estatusCompra: string;
    fechaCompra: string;
    fechaEntrega: string;
    direccion: IDireccion;
    libroCompra: ICompraLibro[];
    total: number;
}