import { useDispatch } from "react-redux";
import { ShoppingCartEntrada } from "../interfaces/ShoppingCartEntrada";
import { addProductToCart } from "../states/productSlice";
import { useState } from "react";
import iconoCarritoBoton from "../assets/images/icono-carrito-boton.png"

const ButtonAddToCart = ({ libro }: { libro: ShoppingCartEntrada | null }) => {
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
            dispatch(addProductToCart(mapBookToCart(libro)));

            console.log("Producto agregado al carrito:", producto);
        } else {
            console.error("Producto no disponible para agregar al carrito.");
        }
    }

    function mapBookToCart(libro: ShoppingCartEntrada) {

        producto.nombre = libro.nombre;
        producto.autor = libro.autor;
        producto.precio = libro.precio;
        producto.isbn = libro.isbn;
        producto.cantidad = 1;
        producto.correoElectronico = "";
        console.log(producto);
        return producto;
    }

    return(
        <button className="boton-comprar" onClick={handleAddToCart}>
            <img src={iconoCarritoBoton} alt="" />
        </button>
    )
}

export default ButtonAddToCart;