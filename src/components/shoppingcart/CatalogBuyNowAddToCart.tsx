import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../states/productSlice";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";

interface ButtonAddToCartProps {
    libro: ShoppingCartEntrada | null;
    onClick?: () => void;
}

const CatalogBuyNowAddToCart = ({ libro, onClick }: ButtonAddToCartProps) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (libro && libro.cantidad > 0) {
            dispatch(addProductToCart(libro));
            console.log("Producto agregado al carrito:", libro);
            if (onClick) {
                onClick();
            }
        } else {
            console.error("Cantidad no válida o producto no disponible.");
        }
    };

    return (
        <Button variant="none" className="buy-now" onClick={handleAddToCart}>
            Comprar ahora
        </Button>
    );
};

export default CatalogBuyNowAddToCart;