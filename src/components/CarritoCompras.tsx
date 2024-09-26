import React, { useEffect, useState } from 'react';
import { ShoppingCartSalida } from '../interfaces/ShoppingCartSalida.ts';

const ShoppingCart: React.FC = () => {
    const [cart, setCart] = useState<ShoppingCartSalida | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/shoppingcart')
            .then(response => {
                if (response.ok) {
                    return response.json(); // Convierte la respuesta a JSON
                } else {
                    throw new Error('No se puede obtener el carrito de compras');
                }
            })
            .then(data => {
                setCart(data); // Establece el carrito con los datos obtenidos
            })
            .catch(error => {
                console.error('Error al obtener el carrito', error);
                setError(error.message); // Establece el mensaje de error para mostrar
            });
    }, []);

    return (
        <div>
            {error ? (
                <p>{error}</p> // Muestra el mensaje de error si hay un problema
            ) : cart ? (
                <ul>
                    {cart.items.map(item => (
                        <li key={item.id}>
                            <h3>{item.datos.editorial}</h3>
                            <p>Precio: {item.datos.precio}</p>
                            <p>Cantidad: {item.cantidad}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Cargando carrito de compras...</p> // Mensaje mientras se carga el carrito
            )}
        </div>
    );
};

export default ShoppingCart;