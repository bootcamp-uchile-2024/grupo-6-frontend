import { useDispatch } from "react-redux";
import { addProductToCart } from "../../states/productSlice";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";

const ButtonAddToShoppingCart = ({ libro }: { libro: ShoppingCartEntrada | null }) => {
    //const productCount = useSelector((state: RootType) => state.productReducer.cart.items);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (libro) { // Verificar si product no es null
            dispatch(addProductToCart(libro));
        } else {
            console.error("Producto no disponible para agregar al carrito.");
        }
    }

    return (
        <button className="shoppingcart-button" onClick={handleAddToCart}>
            +
        </button>
    )
}

export default ButtonAddToShoppingCart;