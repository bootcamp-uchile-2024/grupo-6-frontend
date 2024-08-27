import { CrearProductoEntrada } from "./CrearProductoEntrada";

interface ProductosFiltradosSalida {
    success: boolean;                  // Indica si la búsqueda fue exitosa
    products: CrearProductoEntrada[];  // Lista de productos que coincidan con filtros aplicados
    message?: string;                  // Mensaje opcional (Ej: No se encontraron productos)
}

export type {ProductosFiltradosSalida}