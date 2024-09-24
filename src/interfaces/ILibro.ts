import { IErrorsLibro } from "./IErrorsLibro";

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


export function validateValues(formValues: ILibro , errors: IErrorsLibro) {

    if (formValues.isbn.length > 14 || formValues.isbn.length < 10 || formValues.isbn.trim() === "" || !formValues.isbn) {
        errors.isbn = "ISBN no debe estar vacio y debe tener entre 10 y 13 caracteres.";

    } else {
        errors.isbn = null;
    }

    if (formValues.nombre.trim() === "" || !formValues.nombre) {
        errors.nombre = "El nombre del libro no debe ser vacio.";

    } else {
        errors.nombre = null;
    }

    if (formValues.autor.lenght <= 0 || formValues.autor[0].trim() === "" || !formValues.autor) {
        errors.autor = "El autor del libro no debe ser vacio.";

    } else {
        errors.autor = null;
    }

    if (!formValues.precio || formValues.precio < 1000) {
        errors.precio = "La precio minimo son 1000.";

    } else {
        errors.precio = null;
    }

    if (!formValues.stockLibro || formValues.stockLibro < 1) {
        errors.stockLibro = "El stock minimo es 1 libro.";

    } else {
        errors.stockLibro = null;
    }

    if (!formValues.caratula || formValues.caratula.trim() === "") {
        errors.caratula = "La url debe tener un formato valido.";

    } else {
        errors.caratula = null;
    }

    if (formValues.ean.length < 13 || formValues.ean.length > 13 || formValues.ean.trim() === "" || !formValues.ean) {
        errors.ean = "El EAN no debe estar vacio y debe tener un largo de 13 caracteres.";

    } else {
        errors.ean = null;
    }

    if (formValues.genero.lenght <= 0 || formValues.genero[0].trim() === "" || !formValues.genero) {
        errors.genero = "El genero del libro no debe ser vacio.";

    } else {
        errors.genero = null;
    }

    if (!formValues.descuento || formValues.descuento <= -1) {
        errors.descuento = "El descuento no puede ser menor a 0.";

    } else {
        errors.descuento = null;
    }

    if (!formValues.dimensiones || formValues.dimensiones.trim() === "") {
        errors.dimensiones = "Las dimensiones no pueden estar vacias.";

    } else {
        errors.dimensiones = null;
    }

    if (!formValues.editorial || formValues.editorial.trim() === "") {
        errors.editorial = "La editorial no puede estar vacias.";

    } else {
        errors.editorial = null;
    }

    if (!formValues.encuadernacion || formValues.encuadernacion.trim() === "") {
        errors.encuadernacion = "La encuadernacion no puede estar vacias.";

    } else {
        errors.encuadernacion = null;
    }

    if (!formValues.idioma || formValues.idioma.trim() === "") {
        errors.idioma = "El idioma no puede estar vacias.";

    } else {
        errors.idioma = null;
    }

    if (!formValues.agnoPublicacion || formValues.agnoPublicacion.trim() === "") {
        errors.agnoPublicacion = "El año de publicacion no puede estar vacio.";

    } else {
        errors.agnoPublicacion = null;
    }

    if (!formValues.resumen || formValues.resumen.trim() === "") {
        errors.resumen = "El resumen no puede estar vacio.";

    } else {
        errors.resumen = null;
    }

    if (!formValues.numeroPaginas || formValues.numeroPaginas < 1) {
        errors.numeroPaginas = "El numero de paginas no puede estar vacio o ser menor a 1.";

    } else {
        errors.numeroPaginas = null;
    }

    return errors;
};

export type { ILibro }

