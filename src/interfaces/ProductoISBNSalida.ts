import { ILibro } from "./ILibro.ts";

interface ProductoISBNSalida {    
    success: boolean;              // Indica si la obtención del producto fue exitosa
    producto: ILibro;    // Información del producto, si fue encontrado
    mensaje?: string;              // Mensaje opcional, (Ej: Producto no encontrado)
}

export type {ProductoISBNSalida}