export const configuracion = {
    urlEndpointPokemon: {
        baseUrl: 'https://pokeapi.co/api/v2'
    },
    urlJsonServerBackendCategories: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PRODUCTS_CATEGORIES,
    urlJsonServerBackendCatalog: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PRODUCTS_CATALOG,
    urlJsonServerBackendDetailsSearch: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PRODUCTS_DETAILS_SEARCH,
    urlJsonServerBackendProducts: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PRODUCTS,
    urlJsonServerBackendUsers: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_USERS,
    urlJsonServerBackendSignUp: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_SIGN_UP,
    urlJsonServerBackendLogin: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_LOGIN,
    urlJsonServerBackendShoppingCart: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_SHOPPINGCART,
    urlJsonServerBackendCover: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_COVER,
    urlJsonServerBackendGenres: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_GENRES,    
    urlJsonServerBackendPublishers: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PUBLISHERS,
    urlJsonServerBackendPurchases: import.meta.env.VITE_BACKEND_GRUPO6_ENDPOINT_PURCHASES

} as const;