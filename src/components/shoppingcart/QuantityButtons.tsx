import { useDispatch, useSelector } from "react-redux";
import { incrementProductQuantity, decrementProductQuantity, removeProduct } from "../../states/productSlice";
import { RootType } from "../../states/store";

const QuantityButtons = ({ isbn }: { isbn: string }) => {
    const dispatch = useDispatch();
    const item = useSelector((state: RootType) =>
        state.productReducer.cart.items.find((item) => item.isbn === isbn)
    );

    const handleIncrement = () => {
        dispatch(incrementProductQuantity(isbn))
    };

    const handleDecrement = () => {
        if (item) {
            if (item && item.cantidad > 1) {
                dispatch(decrementProductQuantity(isbn));
            }
            else {
                dispatch(removeProduct(item))
            }
        }
    };

    return (
        <div className="quantity-buttons d-flex justify-content-around">
            <button onClick={handleDecrement}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 12H6" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <span>{item ? item.cantidad : 0}</span>
            <button onClick={handleIncrement}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default QuantityButtons;