import React, { useState } from 'react';
import { ShoppingCartEntrada } from '../interfaces/ShoppingCartEntrada';

const AddToCart: React.FC = () => {
    const [book] = useState<ShoppingCartEntrada>({
        precio: 16000,
        genero: ["Fantasía"],
        editorial: "Salvat",
        encuadernacion: "Tapa Dura",
        descuento: 10,
        caratula: "src/products/images/9788445009598.webp"
    });

    const addToCart = async () => {
        try {
            const response = await fetch('/shoppingcart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book),
            });

            if (response.ok && response.status === 201) {
                alert('Producto agregado al carrito de compras');
            } else {
                console.error('Error al agregar al carrito:', response.statusText);
            }
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };

    return (
        <div>
            <button onClick={addToCart}>Agregar al Carrito</button>
        </div>
    );
};

export default AddToCart;