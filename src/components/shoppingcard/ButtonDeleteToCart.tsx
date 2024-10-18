import { useDispatch } from "react-redux";

import { removeProduct } from "../../states/productSlice";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";

const ButtonDeleteToCart = ({ libro } : { libro: ShoppingCartEntrada | null }) => {
    const dispatch = useDispatch();

    const handleDeleteItemToCart = () => {
        if (libro) { // Verificar si product no es null
             dispatch(removeProduct(libro));
        } else {
            console.error("Producto no disponible para agregar al carrito.");
        }
    }
    

    return(
        <button className="shoppingcart-button-delete" onClick={handleDeleteItemToCart}>eliminar</button>
    )
}

export default  ButtonDeleteToCart;