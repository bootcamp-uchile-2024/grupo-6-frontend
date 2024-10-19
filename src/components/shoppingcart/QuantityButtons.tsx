import { useDispatch, useSelector } from "react-redux";
import { incrementProductQuantity, decrementProductQuantity } from "../../states/productSlice";
import { RootType } from "../../states/store";

const QuantityButtons = ({ isbn }: { isbn: string }) => {
    const dispatch = useDispatch();
    const item = useSelector((state: RootType) =>
        state.productReducer.cart.items.find((item) => item.isbn === isbn)
    );

    const handleIncrement = () => {
        dispatch(incrementProductQuantity(isbn));
    };

    const handleDecrement = () => {
        if (item && item.cantidad > 1) {
            dispatch(decrementProductQuantity(isbn));
        }
    };

    return (
        <div className="quantity-buttons">
            <button onClick={handleDecrement}>-</button>
            <span>{item ? item.cantidad : 0}</span>
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

export default QuantityButtons;