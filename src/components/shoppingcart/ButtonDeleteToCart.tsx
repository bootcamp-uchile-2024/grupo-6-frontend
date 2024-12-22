import { useDispatch } from "react-redux";
import { removeProduct } from "../../states/productSlice";
import { ShoppingCartEntrada } from "../../interfaces/ShoppingCartEntrada";

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
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5095 0C8.55637 0 6.94453 1.56452 6.94453 3.52941V3.9095H3.89703H1.25203C0.743929 3.9095 0.332031 4.32278 0.332031 4.83258C0.332031 5.34238 0.743929 5.75565 1.25203 5.75565H2.97703V20.4706C2.97703 22.4355 4.58888 24 6.54203 24H17.122C19.0752 24 20.687 22.4355 20.687 20.4706V5.75565H22.412C22.9201 5.75565 23.332 5.34238 23.332 4.83258C23.332 4.32278 22.9201 3.9095 22.412 3.9095H19.767H16.7195V3.52941C16.7195 1.56453 15.1077 0 13.1545 0H10.5095ZM15.797 5.75565C15.7978 5.75566 15.7987 5.75566 15.7995 5.75566C15.8004 5.75566 15.8012 5.75566 15.8021 5.75565H18.847V20.4706C18.847 21.3846 18.0905 22.1538 17.122 22.1538H6.54203C5.57359 22.1538 4.81703 21.3846 4.81703 20.4706V5.75565H7.86196C7.86282 5.75566 7.86368 5.75566 7.86453 5.75566C7.86539 5.75566 7.86624 5.75566 7.8671 5.75565H15.797ZM14.8795 3.9095V3.52941C14.8795 2.61541 14.123 1.84615 13.1545 1.84615H10.5095C9.5411 1.84615 8.78453 2.61542 8.78453 3.52941V3.9095H14.8795ZM9.18703 9.12218C9.69513 9.12218 10.107 9.53545 10.107 10.0453V17.8643C10.107 18.3741 9.69513 18.7873 9.18703 18.7873C8.67893 18.7873 8.26703 18.3741 8.26703 17.8643V10.0453C8.26703 9.53545 8.67893 9.12218 9.18703 9.12218ZM14.477 9.12218C14.9851 9.12218 15.397 9.53545 15.397 10.0453V17.8643C15.397 18.3741 14.9851 18.7873 14.477 18.7873C13.9689 18.7873 13.557 18.3741 13.557 17.8643V10.0453C13.557 9.53545 13.9689 9.12218 14.477 9.12218Z" fill="#975C4C" />
            </svg>
        </button>
    )
}

export default ButtonDeleteToCart;