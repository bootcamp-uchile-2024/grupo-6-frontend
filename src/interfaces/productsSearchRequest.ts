interface productSearchRequest {
    nombre?: string;
    autor?: string;
    isbn?: number;
    precioMinimo?: number;
    precioMaximo?: string;
    rating?: number;
    encuadernacion?: string;
    anioPublicacionMinimo?: number;
    anioPublicacionMaximo?: number;
    idioma?: string;
    editorial?: string;
    genero?: string;
}

export type { productSearchRequest };