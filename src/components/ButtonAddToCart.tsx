import { useDispatch } from "react-redux";
import { ShoppingCartEntrada } from "../interfaces/ShoppingCartEntrada";
import { addProductToCart } from "../states/productSlice";
import { useState } from "react";
import iconoCarritoBoton from "../assets/images/icono-carrito-boton.png"
import Button from "react-bootstrap/esm/Button";

const ButtonAddToCart = ({ libro }: { libro: ShoppingCartEntrada | null }) => {
    const [producto] = useState<ShoppingCartEntrada>({
        nombre: '',
        autor: [""],
        precio: 0,
        isbn: "",
        cantidad: 1,
        correoElectronico: "",
        caratula: "",

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
        producto.caratula = libro.caratula;

        console.log(producto);
        return producto;
    }

    return(

        <Button variant="none" className="boton-comprar" onClick={handleAddToCart} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Button>   
    )
}

export default ButtonAddToCart;