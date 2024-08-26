# Servicios

## Búsqueda de productos

__Propósito__: Permite buscar y encontrar el producto deseado. <br>
__Ruta Request__: `src/interfaces/productsSearchRequest.ts` <br>
__Ruta Response__: `src/interfaces/productsSearchResponse.ts` <br>
__Url__: https://github.com/Joaoamestica/ayudantia/blob/main/script.js <br>

### RequestDTO

```typescript
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
```

### ResponseDTO

```typescript
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
```