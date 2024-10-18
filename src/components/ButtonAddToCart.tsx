import { useDispatch } from "react-redux";
import { ShoppingCartEntrada } from "../interfaces/ShoppingCartEntrada";
import { addProductToCart } from "../states/productSlice";
import { ILibro } from "../interfaces/ILibro";
import { useState } from "react";

const ButtonAddToCart = ({ libro }: { libro: ILibro | null }) => {
    const [producto] = useState<ShoppingCartEntrada>({
        nombre: '',
        autor: [""],
        precio: 0,
        isbn: "",
        cantidad: 1,
        correoElectronico: "",
    });
    //const productCount = useSelector((state: RootType) => state.productReducer.cart.items);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (libro) { // Verificar si product no es null
            console.log(libro);
            console.log(mapBookToCart(libro));
            dispatch(addProductToCart(mapBookToCart(libro)));
        } else {
            console.error("Producto no disponible para agregar al carrito.");
        }
    }

    function mapBookToCart(libro: ILibro) {

        producto.nombre = libro.nombre;
        producto.autor = libro.autor;
        producto.precio = libro.precio;
        producto.isbn = libro.isbn;
        producto.cantidad = 1;
        producto.correoElectronico = "";
        console.log(producto);
        return producto;
    }

    return (
        <button className="button-add-to-cart" onClick={handleAddToCart}>
            Añadir al carro
        </button>
    )
}

export default ButtonAddToCart;