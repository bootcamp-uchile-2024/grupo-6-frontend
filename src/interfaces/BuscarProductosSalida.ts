import { CrearProductoEntrada } from "./CrearProductoEntrada";

interface BuscarProductosSalida {
    success: boolean;                  // Indica si la búsqueda fue exitosa
    products: CrearProductoEntrada[];  // Lista de productos que coinciden con la búsqueda
    message?: string;                  // Mensaje opcional (Ej: No se encontraron productos)
}

export type{BuscarProductosSalida}