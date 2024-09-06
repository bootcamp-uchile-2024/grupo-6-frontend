# Servicios
En esta sección, se detallan las diferentes interfaces que se crearon para los componentes asociados a productos y el carrito de compras.

## Crear un Producto

__Propósito__: Permite crear un nuevo producto.<br>
__Ruta Request__: `src/interfaces/CrearProductoEntrada.ts`<br>
__Ruta Response__: `src/interfaces/CrearProductoSalida.ts`<br>
__Url__: ...<br>

### RequestDTO
```typescript
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
```

### ResponseDTO
```typescript
interface CrearProductoSalida {
    success: boolean;  // Indica si creación del producto fue exitosa
    mensaje?: string;  // Mensaje opcional (Ej: Producto creado exitosamente)
}
```



## Obtener un Producto por ISBN

__Propósito__: Permite obtener la información de un producto específico usando el ISBN.<br>
__Ruta Request__: `src/interfaces/CrearProductoEntrada.ts`<br>
__Ruta Response__: `src/interfaces/CrearProductoSalida.ts`<br>
__Url__: ...<br>

### RequestDTO
```typescript
interface ProductoISBNEntrada {
    isbn: string;  // ISBN del libro
}
```

### ResponseDTO
```typescript
interface ProductoISBNSalida {    
    success: boolean;                // Indica si la obtención del producto fue exitosa
    producto: CrearProductoEntrada;  // Información del producto, si fue encontrado
    mensaje?: string;                // Mensaje opcional, (Ej: Producto no encontrado)
}
```



## Obtener Productos Filtrados

__Propósito__: Permite obtener lista de productos según filtros aplicados.<br>
__Ruta Request__: `src/interfaces/ProductoFiltradoEntrada.ts`<br>
__Ruta Response__: `src/interfaces/ProductosFiltradosSalida.ts`<br>
__Url__: ...<br>

### RequestDTO
```typescript
interface ProductosFiltradosEntrada {
    priceMin?: number;            // Precio mínimo
    priceMax?: number;            // Precio máximo
    sortBy?: string;              // Propiedad para ordenar (Ej: "precio")
    autor?: string;               // Nombre del autor
    nombre?: string;              // Título del libro
    rating?: number;              // Rating del libro (0-5)
    isbn?: string;                // ISBN del libro
    encuadernacion?: 'Tapa dura' | 'Tapa blanda' | 'Encuadernación en espiral';  // Encuadernación
    agnoPublicacionMin?: number;  // Año mínimo de publicación
    agnoPublicacionMax?: number;  // Año máximo de publicación
    idioma?: 'Español' | 'Inglés' | 'Francés' | 'Alemán' | 'Portugués' | 'Italiano';  // Idioma
    editorial?: string;           // Editorial del libro
    genero?: 'Thriller' | 'Novela histórica' | 'Romance' | 'Ciencia ficción' | 'Distópia' | 'Aventura' | 'Fantasía' | 'Contemporáneo' | 'Terror' | 'Paranormal' | 'Poesía' | 'Juvenil' | 'Infantil' | 'Novela' | 'Clásico' | 'Autoayuda' | 'Salud y deporte' | 'Técnicos y especializados' | 'Biografías y autobiografías' | 'Cocina' | 'Viajes' | 'Arte' | 'Ciencia y matemáticas' | 'Computación' | 'Derecho y política' | 'Economía y finanzas' | 'Historia' | 'Filosofía y religión' | 'Educación';  // Género del libro
    offset?: number;              // Posición de inicio para la paginación
    limit?: number;               // Número máximo de productos a devolver
}
```

### ResponseDTO
```typescript
interface ProductosFiltradosSalida {
    success: boolean;                  // Indica si la búsqueda fue exitosa
    products: CrearProductoEntrada[];  // Lista de productos que coincidan con filtros aplicados
    message?: string;                  // Mensaje opcional (Ej: No se encontraron productos)
}
```



## Buscar productos

__Propósito__: Permite buscar productos según un término de búsqueda y filtros opcionales.<br>
__Ruta Request__: `src/interfaces/BuscarProductosEntrada.ts`<br>
__Ruta Response__: `src/interfaces/BuscarProductosSalida.ts`<br>
__Url__: ...<br>

### RequestDTO
```typescript
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
```

### ResponseDTO
```typescript
interface BuscarProductosSalida {
    success: boolean;                  // Indica si la búsqueda fue exitosa
    products: CrearProductoEntrada[];  // Lista de productos que coinciden con la búsqueda
    message?: string;                  // Mensaje opcional (Ej: No se encontraron productos)
}
```



## Agregar productos al Carrito de Compras

__Propósito__: Permite agregar un producto al carrito de compras.<br>
__Ruta Request__: `src/interfaces/ShoppingCartEntrada.ts`<br>
__Ruta Response__: `src/interfaces/ShoppingCartSalida.ts`<br>
__Url__: ...<br>

### RequestDTO
```typescript
interface ShoppingCartEntrada {
precio: number;                 // Precio del producto 
genero: string[];               // Género del producto
editorial: string;              // Editorial del producto 
encuadernacion: string;         // Tipo de encuadernación del producto
descuento: number;              // Descuento aplicable al producto
caratula: string;               // Ruta de la imagen del producto
}
```
### ResponseDTO
```typescript
interface ShoppingCartSalida {
    items: ShoppingCartItem[];      // Lista de ítems en el carrito
}

interface ShoppingCartItem {
    id: number;                     // Identificador único del ítem en el carrito, en este caso puede ser el número de compra
    cantidad: number;               // Cantidad del ítem en el carrito
    datos: ShoppingCartEntrada;     // Datos del producto en el carrito
}
```



## Eliminar Producto del Carrito de Compras

__Propósito__: Permite eliminar un producto del carrito de compras.<br>
__Ruta Request__: `src/interfaces/EliminarProductoCarroEntrada.ts`<br>
__Ruta Response__: `src/interfaces/EliminarProductoCarroSalida.ts`<br>
__Url__: ...<br>

### RequestDTO
```typescript
interface EliminarProductoCarroEntrada {
    item: number;  // Identificador del ítem a eliminar
}
```

### ResponseDTO
```typescript
interface EliminarProductoCarroSalida {
    success: boolean;  // Indica si producto fue eliminado exitosamente
    message?: string;  // Mensaje opcional (Ej: Producto eliminado del carrito)
}
```