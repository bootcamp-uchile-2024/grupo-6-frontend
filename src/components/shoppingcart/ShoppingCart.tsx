import { RootType } from "../../states/store";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import '../../styles/shopping_cart.css'
import ButtonDeleteToCart from "./ButtonDeleteToCart";
import { useDispatch, useSelector } from "react-redux";
import ButtonClearCart from "./ButtonClearCart";
import { Link, useNavigate } from "react-router-dom";
import QuantityButtons from "./QuantityButtons";
import { useEffect } from "react";

const fetchShoppingCart = async () => {
    try {
        const response = await fetch('http://localhost:3000/shoppingcart');
        if (!response.ok) throw new Error('Error fetching cart');
        return await response.json();
    }

    catch (error) {
        console.error("Error fetching shopping cart:", error);
    }
}

const addToCart = async (product: ShoppingCartEntrada) => {
    try {
        const response = await fetch('http://localhost:3000/shoppingcart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok)
            throw new Error('Error al añadir producto al carrito');
        return await response.json();
    } catch (error) {
        console.error("Error al añadir producto al carrito:", error);
    }
}

const updateCart = async (isbn: string, quantity: number) => {
    try {
        const response = await fetch(`http://localhost:3000/shoppingcart`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isbn, quantity }),
        });
        if (!response.ok) throw new Error('Error updating cart');
        return await response.json();
    } catch (error) {
        console.error("Error updating cart:", error);
    }
}

const deleteFromCart = async (isbn: string) => {
    try {
        const response = await fetch(`http://localhost:3000/shoppingcart/${isbn}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error deleting product from cart');
        return await response.json();
    } catch (error) {
        console.error("Error deleting product from cart:", error);
    }
}

function ShoppingCart() {
    const shoppingCartProduct = useSelector((state: RootType) => state.productReducer.cart.items);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const calculateTotal = (items: ShoppingCartEntrada[]) => {
        let initialTotal = 0;
        items.forEach(item => {
            initialTotal = initialTotal + item.precio * item.cantidad;
        });
        return initialTotal;
    }

    const calculateTotalProduct = (item: ShoppingCartEntrada) => {
        return item.precio * item.cantidad;
    }

    const handleUpdateQuantity = async (isbn: string, quantity: number) => {
        await updateCart(isbn, quantity);
    }

    useEffect(() => {
        if (shoppingCartProduct.length === 0) {
            navigate('/empty-cart'); // Redirige a la página de carrito vacío
        }
    }, [shoppingCartProduct, navigate])

    return (
        <div className='shoppingcart'>
            <div className="shoppingcart-item-top-footer">
                <h2>Carro de Compras</h2>
                <div className="shoppingcart-button-options">
                    <Link to={`/categorias`}>
                        <p className='shoppingcart-to-product'>Seguir comprando</p>
                    </Link>
                    <div className="shoppingcart-clear">
                        <ButtonClearCart></ButtonClearCart>
                    </div>
                </div>
            </div>
            {shoppingCartProduct.length ? (
                <div className='shoppingcart-items'>
                    <table className="shoppingcart-items-table">
                        <thead>
                            <tr className="shoppingcart-item-detail-tr">
                                <th className="shoppingcart-item-detail-th" colSpan={2} scope="col">
                                    Producto
                                </th>
                                <th className="shoppingcart-item-detail-th" colSpan={1} scope="col">
                                    Cantidad
                                </th>
                                <th className="shoppingcart-item-detail-th" colSpan={1} scope="col">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        {shoppingCartProduct.map((item) => (

                            <>

                                <tbody className='shoppingcart-item-detail'>
                                    <tr className="shoppingcart-item-detail-tr">
                                        <td className="shoppingcart-item-detail-td-image">
                                            <img src='https://placehold.co/800@3x.png' alt={item.nombre} />
                                        </td>
                                        <td className="shoppingcart-item-detail-td-data">
                                            <div className="shoppingcart-item-detail-td-nombre">
                                                <label htmlFor="nombre-libro">Nombre: </label>
                                                <p>{item.nombre}</p>
                                                <p className='shoppingcart-item-detail'>{item.autor}</p>
                                            </div>
                                            <div className="shoppingcart-item-detail-td-autor">
                                                <label htmlFor="autor-libro">Autor: </label>
                                                <p className='shoppingcart-item-detail'>{item.autor}</p>
                                            </div>
                                        </td>
                                        <td className="shoppingcart-item-detail-td-quantity">
                                            <div className="shoppingcart-item-detail-td-quantity-1">
                                                <QuantityButtons isbn={item.isbn} />
                                                <ButtonDeleteToCart libro={item}></ButtonDeleteToCart>
                                            </div>
                                        </td>

                                        <td className="shoppingcart-item-detail-td-total">
                                            <p className='shoppingcart-item-total'>{calculateTotalProduct(item)}</p>
                                        </td>
                                    </tr>
                                </tbody>

                            </>
                        ))}
                    </table>
                </div>
            ) : (
                <div>No existen productos en el carrito de compras.</div>
            )}

            <div className="shoppingcart-item-top-footer">
                <h2>Total: ${calculateTotal(shoppingCartProduct)}</h2>
                <Link to={`/shoppingcart-resume/`}>
                    <button className="button-shoppingcart-resume">Pagar pedido</button>
                </Link>
            </div>

        </div>
    );
};

export default ShoppingCart;
