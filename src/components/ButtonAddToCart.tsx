import { useDispatch } from "react-redux";
import { ShoppingCartEntrada } from "../interfaces/ShoppingCartEntrada";
import { addProductToCart } from "../states/productSlice";

const ButtonAddToCart = ({ product } : { product: ShoppingCartEntrada | null }) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (product) { // Verificar si product no es null
            dispatch(addProductToCart(product));
        } else {
            console.error("Producto no disponible para agregar al carrito.");
        }
    }

    return(
        <button className="button-add-to-cart" onClick={handleAddToCart}>
            Añadir al carro
        </button>
    )
}

export default  ButtonAddToCart;