interface BuscarProductosEntrada {
    query: string;                // Término de búsqueda (Ej: nombre, autor o ISBN)
    priceMin?: number;            // Precio mínimo
    priceMax?: number;            // Precio máximo
    sortBy?: string;              // Propiedad para ordenar (Ej:"precio")
    autor?: string;               // Nombre del autor
    rating?: number;              // Rating del libro (0-5)
    encuadernacion?: 'Tapa dura' | 'Tapa blanda' | 'Encuadernación en espiral';  // Encuadernación
    agnoPublicacionMin?: number;  // Año mínimo de publicación
    agnoPublicacionMax?: number;  // Año máximo de publicación
    idioma?: 'Español' | 'Inglés' | 'Francés' | 'Alemán' | 'Portugués' | 'Italiano';  // Idioma
    editorial?: string;             // Editorial del libro
    genero?: 'Thriller' | 'Novela histórica' | 'Romance' | 'Ciencia ficción' | 'Distópia' | 'Aventura' | 'Fantasía' | 'Contemporáneo' | 'Terror' | 'Paranormal' | 'Poesía' | 'Juvenil' | 'Infantil' | 'Novela' | 'Clásico' | 'Autoayuda' | 'Salud y deporte' | 'Técnicos y especializados' | 'Biografías y autobiografías' | 'Cocina' | 'Viajes' | 'Arte' | 'Ciencia y matemáticas' | 'Computación' | 'Derecho y política' | 'Economía y finanzas' | 'Historia' | 'Filosofía y religión' | 'Educación';  // Género del libro
    offset?: number;              // Posición de inicio para la paginación
    limit?: number;               // Número máximo de productos a devolver
}

export type {BuscarProductosEntrada};