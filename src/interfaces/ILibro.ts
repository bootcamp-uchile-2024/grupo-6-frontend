import { IErrorsLibro } from "./IErrorsLibro";

interface ILibro {
    id: number;          // identificador
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


export function validateValues(formValues: ILibro , errors: IErrorsLibro) {

    if (formValues.isbn.length > 14 || formValues.isbn.length < 10 || formValues.isbn.trim() === "" || !formValues.isbn) {
        errors.isbn = true;

    } else {
        errors.isbn = false;
    }

    if (formValues.nombre.trim() === "" || !formValues.nombre) {
        errors.nombre = true;

    } else {
        errors.nombre = false;
    }

    if (formValues.autor.length <= 0 || formValues.autor[0].trim() === "" || !formValues.autor) {
        errors.autor  = true;

    } else {
        errors.autor = false;
    }

    if (!formValues.precio || formValues.precio < 1000) {
        errors.precio = true;

    } else {
        errors.precio = false;
    }

    if (!formValues.stockLibro || formValues.stockLibro < 1) {
        errors.stockLibro = true;

    } else {
        errors.stockLibro = false;
    }

    if (!formValues.caratula || formValues.caratula.trim() === "") {
        errors.caratula = true;

    } else {
        errors.caratula = false;
    }

    if (formValues.ean.length < 13 || formValues.ean.length > 13 || formValues.ean.trim() === "" || !formValues.ean) {
        errors.ean = true;

    } else {
        errors.ean = false;
    }

    if (formValues.genero.length <= 0 || formValues.genero[0].trim() === "" || !formValues.genero) {
        errors.genero = true;

    } else {
        errors.genero = false;
    }

    if (!formValues.descuento || formValues.descuento <= -1) {
        errors.descuento = true;

    } else {
        errors.descuento = false;
    }

    if (!formValues.dimensiones || formValues.dimensiones.trim() === "") {
        errors.dimensiones = true;

    } else {
        errors.dimensiones = false;
    }

    if (!formValues.editorial || formValues.editorial.trim() === "") {
        errors.editorial = true;

    } else {
        errors.editorial = false;
    }

    if (!formValues.encuadernacion || formValues.encuadernacion.trim() === "") {
        errors.encuadernacion = true;

    } else {
        errors.encuadernacion = false;
    }

    if (!formValues.idioma || formValues.idioma.trim() === "") {
        errors.idioma = true;

    } else {
        errors.idioma = false;
    }

    if (!formValues.agnoPublicacion ) {
        errors.agnoPublicacion = true;

    } else {
        errors.agnoPublicacion = false;
    }

    if (!formValues.resumen || formValues.resumen.trim() === "") {
        errors.resumen = true;

    } else {
        errors.resumen = false;
    }

    if (!formValues.numeroPaginas || formValues.numeroPaginas < 1) {
        errors.numeroPaginas = true;

    } else {
        errors.numeroPaginas = false;
    }

    return errors;
};

export type { ILibro };

