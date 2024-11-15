# Servicios
En esta sección, se detallan las diferentes interfaces que se crearon para los componentes asociados a productos y el carrito de compras.

## Crear un Producto

__Propósito__: Permite crear un nuevo producto.<br>
__Ruta Request__: `src/interfaces/ILibro.ts`<br>
__Ruta Response__: `src/interfaces/CrearProductoSalida.ts`<br>
__Url__: ...<br>
__Metodo HTTP__: POST <br>

### RequestDTO
```typescript
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
```

### ResponseDTO
```typescript
interface CrearProductoSalida {
    success: boolean;  // Indica si creación del producto fue exitosa
    mensaje?: string;  // Mensaje opcional (Ej: Producto creado exitosamente)
}
```

### ResponseDTO Error

__Propósito__: Esta interface permite obtener los errores de cada uno de los campos en caso de que exista.<br>
__Ruta Response__: `src/interfaces/IErrorsLibro.ts`<br>

```typescript
interface IErrorsLibro {
    isbn: string,
    nombre: string,
    autor: string,
    precio: string,
    stockLibro: string,
    genero: string,
    editorial: string,
    idioma: string,
    encuadernacion: string,
    agnoPublicacion: string,
    numeroPaginas: string,
    descuento: string,
    caratula: string,
    dimensiones: string,
    ean: string,
    resumen: string
}
```

## Paginación

__Propósito__: Permite implementar lógica de paginación.<br>
__Ruta Request__: `src/interfaces/ILibroPaginado.tsx`<br>
__Url__: ...<br>
__Metodo HTTP__: POST <br>

```typescript
interface ILibroPaginado {
    nroPagina: number;            
    totalPaginas: number;   
    totalProductos: number;      
    productos: ILibro[];
}
```

## Crear cuenta

### RequestDTO
__Propósito__: Permite a un usuario crear una cuenta.<br>
__Ruta Request__: `src/interfaces/ICreateUser.ts`<br>
__Url__: ...<br>
__Metodo HTTP__: POST <br>

```typescript
interface ICreateUser {
    nombres: string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    correoElectronico: string,
    contrasena: string,
    direccion?: IDireccion;
}
```

### ResponseDTO
__Propósito__: Permite al administrador modificar una cuenta.<br>
__Ruta Request__: `src/interfaces/ICreateUser.ts`<br>
__Url__: ...<br>
__Metodo HTTP__: PUT <br>

```typescript
interface ICreateUserResponse extends ICreateUser {
    idUsuario: number
}
```


## Dirección

### RequestDTO
__Propósito__: Permite a un usuario ingresar su dirección.<br>
__Ruta Request__: `src/interfaces/IDireccion.ts`<br>
__Url__: ...<br>
__Metodo HTTP__: POST <br>

```typescript
interface IDireccion {
    idDireccion: number,
    calle: string,
    numeroCalle: string,
    comuna: string,
    region: string,
    numeroDepartamento?: string,
    informacionAdicional?: string
}
```

## Iniciar sesión

### RequestDTO
__Propósito__: Permite a un usuario iniciar sesión.<br>
__Ruta Request__: `src/interfaces/ILoginUser.ts`<br>
__Url__: ...<br>
__Metodo HTTP__: POST <br>

```typescript
interface ILoginUser {
    correoElectronico: string;
    contrasena: string;
}
```

## Obtener un Producto por ISBN

__Propósito__: Permite obtener la información de un producto específico usando el ISBN.<br>
__Ruta Request__: `src/interfaces/ILibro.ts`<br>
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
    producto: ILibro;  // Información del producto, si fue encontrado
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
    products: ILibro[];  // Lista de productos que coincidan con filtros aplicados
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
    products: ILibro[];  // Lista de productos que coinciden con la búsqueda
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
    nombre: string;                 // Nombre del libro
    autor: string[];                // Autor del libro (array de strings)
    precio: number;                 // Precio del libro
    isbn: string;                   // ISBN del libro
    cantidad: number;               // Cantidad del ítem en el carrito
    correoElectronico: string;      // Correo electrónico
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