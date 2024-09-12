interface ILibro {
    isbn: string;                // Si - ISBN del libro  
    nombre: string;              // Si - Nombre del libro
    autor: string[];             // Si - Autor del libro (array de strings)
    precio: number;              // Si -  Precio del libro
    stockLibro: number;          // Si - Cantidad en stock
    genero: string[];            // Si - Géneros del libro (array de strings)
    editorial: string;           // Si - Editorial del libro
    idioma: string;              // Si - Idioma del libro
    encuadernacion: string;      // Si - Tipo de encuadernación (Ej: Tapa dura, Tapa blanda)
    agnoPublicacion: string;     // Si - Año de publicación
    numeroPaginas: number;       //Si -  Número de páginas
    descuento: number;           // Si - Descuento aplicado al libro
    caratula: string;            // Si - URL de la carátula del libro
    dimensiones: string;    // Agregar para vista de productos
    ean: string;    // Agregar para vista de productos - Corresponde al codigo de barra
    resumen: string //Agregar para vista de productos
    calificacion: number // Agregar para vista de productos
}

export type {ILibro}