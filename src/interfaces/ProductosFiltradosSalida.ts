import { ILibro } from "./ILibro.ts";

interface ProductosFiltradosSalida {
    success: boolean;                  // Indica si la búsqueda fue exitosa
    products: ILibro[];  // Lista de productos que coincidan con filtros aplicados
    message?: string;                  // Mensaje opcional (Ej: No se encontraron productos)
}

export type {ProductosFiltradosSalida};