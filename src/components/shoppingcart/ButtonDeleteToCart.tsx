import { useDispatch } from "react-redux";
import { removeProduct } from "../../states/productSlice";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";
import iconoBasurero from '../../assets/images/icono_basurero.png'

const ButtonDeleteToCart = ({ libro }: { libro: ShoppingCartEntrada | null }) => {
    const dispatch = useDispatch();

    const handleDeleteItemToCart = () => {
        if (libro) { // Verificar si product no es null
            dispatch(removeProduct(libro)); // Eliminar el producto del carrito
        } else {
            console.error("Producto no disponible para agregar al carrito.");
        }
    }


    return (
        <button className="shoppingcart-button-delete" onClick={handleDeleteItemToCart}>
            <img src={iconoBasurero} alt="Eliminar producto" className="icono-basurero" />
        </button>
    )
}

export default ButtonDeleteToCart;