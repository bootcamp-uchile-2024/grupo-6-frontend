interface CrearProductoEntrada {
    isbn: string;                // ISBN del libro
    nombre: string;              // Nombre del libro
    autor: string[];             // Autor del libro (array de strings)
    stockLibro: number;          // Cantidad en stock
    precio: number;              // Precio del libro
    genero: string[];            // Géneros del libro (array de strings)
    editorial: string;           // Editorial del libro
    idioma: string;              // Idioma del libro
    encuadernacion: string;      // Tipo de encuadernación (Ej: Tapa dura, Tapa blanda)
    agnoPublicacion: string;     // Año de publicación
    numeroPaginas: number;       // Número de páginas
    descuento: number;           // Descuento aplicado al libro
    caratula: string;            // URL de la carátula del libro
}

export type {CrearProductoEntrada}