import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementProductQuantity, removeProduct } from "../../states/productSlice";
import { RootType } from "../../states/store";

interface QuantityButtonsProps {
    isbn: string;
    disabled: boolean;
    onQuantityChange?: (isbn: string, quantity: number) => void;
}

const CatalogQuantityButtons = ({ isbn, disabled, onQuantityChange }: QuantityButtonsProps) => {
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const item = useSelector((state: RootType) =>
        state.productReducer.cart.items.find((item) => item.isbn === isbn)
    );

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange?.(isbn, newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange?.(isbn, newQuantity);
        }

        if (!disabled && item && item.cantidad > 1) {
            dispatch(decrementProductQuantity(isbn));
        } else if (!disabled && item) {
            dispatch(removeProduct(item));
        }
    };

    return (
        <div className="quantity-buttons d-flex justify-content-around">
            <button disabled={disabled} onClick={handleDecrease}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 12H6" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <span>{quantity}</span>
            <button disabled={disabled} onClick={handleIncrease}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default CatalogQuantityButtons;