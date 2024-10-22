import { useDispatch } from "react-redux";
import { clearCart } from "../../states/productSlice";
/* import iconoBasurero from '../../assets/images/icono_basurero.png'; */

const ButtonClearCart = () => {
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <button className="shoppingcart-button-clear" onClick={handleClearCart}>Vaciar carrito
        </button>
    );
};

export default ButtonClearCart;