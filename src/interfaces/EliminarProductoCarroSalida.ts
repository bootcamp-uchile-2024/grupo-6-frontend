interface EliminarProductoCarroSalida {
    success: boolean;  // Indica si producto fue eliminado exitosamente
    message?: string;  // Mensaje opcional (Ej: Producto eliminado del carrito)
}

export type {EliminarProductoCarroSalida};