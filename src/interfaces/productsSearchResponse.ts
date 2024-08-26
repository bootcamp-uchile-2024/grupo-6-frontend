interface productSearchResponse {
    isbn: number,
    nombre: string,
    autor: string,
    stockLibro: number,
    precio: number,
    genero: string[],
    editorial: string,
    idioma: string,
    encuadernacion: string,
    agnoPublicacion: string,
    numeroPaginas: number,
    descuento: number,
    caratula: string
}

export type { productSearchResponse };