import { ShoppingCartEntrada } from "./ShoppingCartEntrada";

export interface ShoppingCartItem {
    id: number;
    cantidad: number;
    datos: ShoppingCartEntrada;
}

export interface ShoppingCartSalida {
    items: ShoppingCartItem[];
}