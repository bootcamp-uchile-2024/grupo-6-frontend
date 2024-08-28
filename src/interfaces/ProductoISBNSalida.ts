import { CrearProductoEntrada } from "./CrearProductoEntrada";

interface ProductoISBNSalida {    
    success: boolean;              // Indica si la obtención del producto fue exitosa
    producto: CrearProductoEntrada;    // Información del producto, si fue encontrado
    mensaje?: string;              // Mensaje opcional, (Ej: Producto no encontrado)
}

export type {ProductoISBNSalida}