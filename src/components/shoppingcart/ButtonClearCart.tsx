import { useDispatch } from "react-redux";
import { clearCart } from "../../states/productSlice";
import Button from "react-bootstrap/esm/Button";
/* import iconoBasurero from '../../assets/images/icono_basurero.png'; */

const ButtonClearCart = () => {
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
            <Button style={{backgroundColor: '#E1D5CA', color: '#975C4C', border: '#E1D5CA'}} onClick={handleClearCart}>
                Vaciar carrito
             </Button>
    );
};

export default ButtonClearCart;