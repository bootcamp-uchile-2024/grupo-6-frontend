import { RootType } from "../../states/store";
import ButtonAddToShoppingCart from "./ButtonAddToShoppingCart";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import ButtonRemoveToCart from "./ButtonRemoveToCart";
import '../../styles/shopping_cart.css'
import ButtonDeleteToCart from "./ButtonDeleteToCart";
import { useSelector } from "react-redux";

function ShoppingCart() {
    const shoppingCartProduct = useSelector((state: RootType) => state.productReducer.cart.items);

    const calculateTotal = (items: ShoppingCartEntrada[])  => {
        let initialTotal = 0;
        items.forEach(item => {
            initialTotal = initialTotal + item.precio * item.cantidad;
        });
        return initialTotal;
    }

    const calculateTotalProduct = (item: ShoppingCartEntrada) => {
        return item.precio * item.cantidad;
    }
    return (
        <div className='shoppingcart'>
            <h2>Carro de Compras</h2>
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
                                            </div>
                                            <div className="shoppingcart-item-detail-td-autor">
                                                <label htmlFor="autor-libro">Autor: </label>
                                                <p className='shoppingcart-item-detail'>{item.autor}</p>
                                            </div>
                                        </td>
                                        <td className="shoppingcart-item-detail-td-quantity">
                                            <div className="shoppingcart-item-detail-td-quantity-1">
                                                <ButtonRemoveToCart libro={item}></ButtonRemoveToCart>
                                                <p className='shoppingcart-item-quantity'>{item.cantidad}</p>
                                                <ButtonAddToShoppingCart libro={item}></ButtonAddToShoppingCart>
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
            <h2>Total: ${calculateTotal(shoppingCartProduct)}</h2>
        </div>
    );
};

export default ShoppingCart;
