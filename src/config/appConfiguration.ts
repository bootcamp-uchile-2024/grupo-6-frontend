export const configuracion = {
    urlEndpointPokemon: {
        baseUrl: 'https://pokeapi.co/api/v2'
    },
    urlJsonServerBackendCategories: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PRODUCTS_CATEGORIES,
    urlJsonServerBackendCatalog: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PRODUCTS_CATALOG,
    urlJsonServerBackendDetailsSearch: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PRODUCTS_DETAILS_SEARCH,
    urlJsonServerBackendProducts: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PRODUCTS,
    urlJsonServerBackendUsers: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_USERS,
    urlJsonServerBackendShoppingCart: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_SHOPPINGCART
    
} as const;
