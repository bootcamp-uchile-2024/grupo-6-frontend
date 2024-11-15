import { RootType } from "../../states/store";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import '../../styles/resumen_shopping_cart.css'
import { useDispatch, useSelector } from "react-redux";
import iconoMercadoPago from '../../assets/images/logo-mercadopago29.png'
import iconoPayPal from '../../assets/images/Paypal_2014_logo.png'
import iconoWebpay from '../../assets/images/logo-webpay-plus-3-2.png'
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../../states/productSlice";
import { configuracion } from "../../config/appConfiguration";

function ResumenShoppingCart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const shoppingCartProduct = useSelector((state: RootType) => state.productReducer.cart.items);

    // Calcula el total del carrito de compras
    const calculateTotal = (items: ShoppingCartEntrada[]) => {
        let initialTotal = 0;
        items.forEach(item => {
            initialTotal = initialTotal + item.precio * item.cantidad;
        });
        return initialTotal;
    }

    //Calcula el total de cada producto basado en la cantidad
    const calculateTotalProduct = (item: ShoppingCartEntrada) => {
        return item.precio * item.cantidad;
    }

    const handleSubmit = async () => {
        //event.preventDefault();


        const response = await fetch(configuracion.urlJsonServerBackendShoppingCart, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(shoppingCartProduct)
        });

        if (response.status === 200) {
            alert("¡Compra exitosa!");
            navigate('/');
            dispatch(clearCart());

        } else {
            alert("No se se pudo realizar la compra.");
        }
    }

    return (
        <div className='resumen-shopping-cart'>
            <div className="item-top-resumen">
                <h2>Resumen de compra</h2>
                <div className="back-to-carrito">
                    <Link to={`/carrito`}>
                        <p className='resumen-to-shoppingcart'>Volver a carrito de compras</p>
                    </Link>
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
                                            </div>
                                            <div className="shoppingcart-item-detail-td-autor">
                                                <label htmlFor="autor-libro">Autor: </label>
                                                <p className='shoppingcart-item-detail'>{item.autor}</p>
                                            </div>
                                        </td>
                                        <td className="shoppingcart-item-detail-td-quantity">
                                            <div className="shoppingcart-item-detail-td-quantity-1">
                                                <p className='shoppingcart-item-quantity'>{item.cantidad}</p>
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
            <h3>Total: ${calculateTotal(shoppingCartProduct)}</h3>
            <div className="metodos-de-pago">
                <h3>Formas de pago</h3>
                <p>Puedes pagar usando los siguientes métodos:</p>
                <div className="formas-de-pago">
                    <div className="imagenes-metodos-pago">
                        <label>
                            <input type="radio" name="metodo-pago" value="mercadopago" />
                            <img src={iconoMercadoPago} alt="Mercado Pago" />
                        </label>
                        <label>
                            <input type="radio" name="metodo-pago" value="paypal" />
                            <img src={iconoPayPal} alt="PayPal" />
                        </label>
                        <label>
                            <input type="radio" name="metodo-pago" value="webpay" />
                            <img src={iconoWebpay} alt="WebPay" />
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <button type='button' onClick={handleSubmit}>Finalizar compra</button>
            </div>

        </div>
    );
};

export default ResumenShoppingCart;