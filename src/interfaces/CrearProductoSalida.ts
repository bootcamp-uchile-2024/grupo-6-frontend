import { ILibro } from "./ILibro";

interface BuscarProductosSalida {
    success: boolean;                  // Indica si la búsqueda fue exitosa
    products: ILibro[];  // Lista de productos que coinciden con la búsqueda
    message?: string;                  // Mensaje opcional (Ej: No se encontraron productos)
}

export type{BuscarProductosSalida}