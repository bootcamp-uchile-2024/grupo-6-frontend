import { useDispatch, useSelector } from "react-redux";

import { decrementProductQuantity } from "../../states/productSlice";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";

const ButtonRemoveToCart = ({ libro } : { libro: ShoppingCartEntrada | null }) => {
    //const productCount = useSelector((state: RootType) => state.productReducer.cart.items);
    const dispatch = useDispatch();

    const handleRemoveToCart = () => {
        if (libro) { // Verificar si product no es null
            dispatch(decrementProductQuantity(libro));
        } else {
            console.error("Producto no disponible para agregar al carrito.");
        }
    }
    

    return(
        <button className="shoppingcart-button" onClick={handleRemoveToCart}>
            -
        </button>
    )
}

export default  ButtonRemoveToCart;